import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import {createRequire} from "node:module";
import {fileURLToPath} from "node:url";

// I03F-3R: execute the real TSX component with offline React/Turnstile/HTTP stubs.
// No browser, external network, environment credentials, SMTP, or production providers.
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fromRepo = createRequire(path.join(repo, "package.json"));
const ts = fromRepo("typescript");
const source = fs.readFileSync(path.join(repo, "src/components/demo/DemoRequestForm.tsx"), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    jsx: ts.JsxEmit.ReactJSX
  },
  fileName: "DemoRequestForm.tsx",
  reportDiagnostics: true
});
assert.equal((compiled.diagnostics || []).filter((d) => d.category === ts.DiagnosticCategory.Error).length, 0);

function runOfflineCase(locale) {
  const hooks = [];
  let hookCursor = 0;
  let widget;
  let opens = [];
  let fetchCalls = 0;
  let resetCalls = 0;
  let formResetCalls = 0;
  let serverError = "turnstile_unavailable";
  let tokenCounter = 0;
  const makeElement = (type, props) => ({type, props: props || {}});
  const reactStub = {
    useRef(initial) {
      const slot = hookCursor++;
      if (!hooks[slot]) hooks[slot] = {current: initial};
      return hooks[slot];
    },
    useState(initial) {
      const slot = hookCursor++;
      if (!hooks[slot]) hooks[slot] = {value: initial};
      return [hooks[slot].value, (next) => {
        hooks[slot].value = typeof next === "function" ? next(hooks[slot].value) : next;
      }];
    },
    useCallback(fn) { return fn; },
    useEffect() { /* lifecycle is deliberately not triggered in this isolated case */ }
  };
  const fakeWindow = {
    turnstile: {
      render(_el, options) {
        widget = options;
        return "widget-i03f3r";
      },
      reset(id) {
        assert.equal(id, "widget-i03f3r");
        resetCalls++;
        widget.callback(`fresh-token-${++tokenCounter}`);
      },
      remove() {}
    },
    open(url, target, options) { opens.push({url, target, options}); }
  };
  const inputValues = {
    website: "", name: "QA Test", gym: "Gym QA", email: "qa@example.com",
    phone: "123", city: "City", country: "Country", message: "QA"
  };
  class OfflineFormData {
    constructor(form) { assert.equal(form, fakeForm); }
    get(name) { return Object.prototype.hasOwnProperty.call(inputValues, name) ? inputValues[name] : null; }
  }
  const fakeForm = {
    reportValidity: () => true,
    reset() { formResetCalls++; }
  };
  const labels = {
    title: "Demo", body: "Test", name: "Name", namePlaceholder: "Name",
    gym: "Gym", gymPlaceholder: "Gym", email: "Email", emailPlaceholder: "Email",
    phone: "Phone", phonePlaceholder: "Phone", city: "City", cityPlaceholder: "City",
    country: "Country", countryPlaceholder: "Country", message: "Message", messagePlaceholder: "Message",
    submit: "Submit", sending: "Sending", success: "Success", error: "Generic error",
    whatsapp: "WhatsApp", verificationRequired: "Token missing", verificationFailed: "Rejected",
    verificationUnavailable: `Server unavailable (${locale})`
  };
  const scriptStub = function Script() {};
  const fakeRequire = (moduleName) => {
    if (moduleName === "react") return reactStub;
    if (moduleName === "react/jsx-runtime") return {jsx: makeElement, jsxs: makeElement, Fragment: "fragment"};
    if (moduleName === "next/script") return {__esModule: true, default: scriptStub};
    throw new Error(`Unexpected module: ${moduleName}`);
  };
  const fakeModule = {exports: {}};
  const context = {
    module: fakeModule,
    exports: fakeModule.exports,
    require: fakeRequire,
    process: {env: {NEXT_PUBLIC_TURNSTILE_SITE_KEY: "offline-public-test-key"}},
    window: fakeWindow,
    FormData: OfflineFormData,
    fetch: async (url, init) => {
      assert.equal(url, "/api/demo-request");
      const body = JSON.parse(init.body);
      assert.equal(body.email, "qa@example.com");
      assert.ok(body.turnstileToken.startsWith("fresh-token-"));
      fetchCalls++;
      if (serverError) return {ok: false, json: async () => ({error: serverError})};
      return {ok: true};
    },
    console: {log() {}, error() {}}
  };
  vm.runInNewContext(compiled.outputText, context, {filename: "DemoRequestForm.offline.cjs", timeout: 2500});
  const DemoRequestForm = fakeModule.exports.DemoRequestForm;
  assert.equal(typeof DemoRequestForm, "function");

  const render = () => {
    hookCursor = 0;
    return DemoRequestForm({labels, locale});
  };
  const visit = (node, predicate) => {
    if (Array.isArray(node)) {
      for (const entry of node) {
        const match = visit(entry, predicate);
        if (match) return match;
      }
      return null;
    }
    if (!node || typeof node !== "object") return null;
    if (predicate(node)) return node;
    return visit(node.props?.children, predicate);
  };
  const inspectAlert = (tree) => visit(tree, (n) => n.type === "p" && n.props.role === "alert");

  return (async () => {
    let tree = render();
    assert.equal(tree.type, "form");
    hooks[0].current = fakeForm;
    hooks[2].current = {};
    const script = visit(tree, (n) => n.type === scriptStub);
    assert.ok(script && typeof script.props.onReady === "function", "Turnstile script handler expected");
    script.props.onReady();
    assert.ok(widget && typeof widget.callback === "function", "Turnstile widget must register callbacks");
    widget.callback(`fresh-token-${++tokenCounter}`);

    const submit = () => render().props.onSubmit({preventDefault() {}});
    await submit();
    assert.equal(fetchCalls, 1, "one local HTTP mock call");
    assert.equal(resetCalls, 1, "widget reset must refresh the token after HTTP 503");
    tree = render();
    const errorAlert = inspectAlert(tree);
    assert.ok(errorAlert, `HTTP 503 error must remain visible in ${locale} after token refresh`);
    assert.equal(errorAlert.props.children, labels.verificationUnavailable,
      `HTTP 503 message must not disappear after Turnstile callback (${locale})`);
    assert.equal(formResetCalls, 0, "form values must remain after failed submission");

    // A deliberate retry clears the old error and can report success.
    serverError = "";
    await submit();
    assert.equal(fetchCalls, 2);
    tree = render();
    assert.equal(inspectAlert(tree), null, "old error disappears only on actual retry/success");
    assert.ok(visit(tree, (n) => n.type === "p" && n.props.role === "status" && n.props.children === labels.success));
    assert.equal(formResetCalls, 1);

    // WhatsApp remains a separate client-only path, without Turnstile/SMTP.
    const whatsapp = visit(tree, (n) => n.type === "button" && n.props["data-cta-intent"] === "whatsapp-demo-request");
    assert.ok(whatsapp);
    whatsapp.props.onClick();
    assert.equal(opens.length, 1);
    assert.ok(opens[0].url.startsWith("https://wa.me/"));
    assert.equal(opens[0].target, "_blank");
    assert.equal(fetchCalls, 2, "WhatsApp must not call the demo API");
    console.log(`PASS I03F3R ${locale}: HTTP 503 message persists after reset callback, retry and WhatsApp intact`);
  })();
}

await runOfflineCase("es");
await runOfflineCase("en");
console.log("I03F3R ERROR-PERSISTENCE OFFLINE PASS: ES/EN simulated HTTP 503, reset callback, retry, WhatsApp; no live requests");
