import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import {createRequire} from "node:module";
import {fileURLToPath} from "node:url";

// I03H: execute the actual client TSX with offline widget/React stubs.
// No network, SMTP, OpenAI, Cloudflare credentials, or source mutation.
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

const equalDeps = (a, b) => a?.length === b?.length && a.every((value, i) => Object.is(value, b[i]));

function exercise(initialLocale) {
  const hooks = [];
  let cursor = 0;
  let renderCalls = 0;
  let removeCalls = 0;
  let resetCalls = 0;
  let fetchCalls = 0;
  const widgetHistory = [];
  const pendingEffects = [];
  const fakeWindow = {
    turnstile: {
      render(_element, options) {
        assert.ok(_element);
        assert.equal(options.sitekey, "offline-test-sitekey");
        assert.equal(options.action, "demo_request");
        assert.equal(typeof options.callback, "function");
        const id = `widget-${++renderCalls}`;
        widgetHistory.push({id, language: options.language});
        return id;
      },
      reset() {resetCalls++;},
      remove(id) {
        assert.equal(id, widgetHistory[widgetHistory.length - 1]?.id);
        removeCalls++;
      }
    },
    open() {throw new Error("WhatsApp should not be called in locale test");}
  };
  const stubReact = {
    useRef(initial) {
      const i = cursor++;
      if (!hooks[i]) hooks[i] = {current: initial};
      return hooks[i];
    },
    useState(initial) {
      const i = cursor++;
      if (!hooks[i]) hooks[i] = {value: initial};
      return [hooks[i].value, (next) => {
        hooks[i].value = typeof next === "function" ? next(hooks[i].value) : next;
      }];
    },
    useCallback(fn, deps) {
      const i = cursor++;
      if (!hooks[i] || !equalDeps(hooks[i].deps, deps)) hooks[i] = {deps, fn};
      return hooks[i].fn;
    },
    useEffect(effect, deps) {
      const i = cursor++;
      const last = hooks[i];
      if (!last || !equalDeps(last.deps, deps)) {
        hooks[i] = {deps, cleanup: last?.cleanup};
        pendingEffects.push(() => {
          last?.cleanup?.();
          hooks[i].cleanup = effect();
        });
      }
    }
  };
  const makeElement = (type, props) => ({type, props: props || {}});
  const scriptStub = function Script() {};
  const fakeRequire = (mod) => {
    if (mod === "react") return stubReact;
    if (mod === "react/jsx-runtime") return {jsx: makeElement, jsxs: makeElement, Fragment: "fragment"};
    if (mod === "next/script") return {__esModule: true, default: scriptStub};
    throw new Error(`Unexpected dependency: ${mod}`);
  };
  const fakeModule = {exports: {}};
  vm.runInNewContext(compiled.outputText, {
    module: fakeModule,
    exports: fakeModule.exports,
    require: fakeRequire,
    process: {env: {NEXT_PUBLIC_TURNSTILE_SITE_KEY: "offline-test-sitekey"}},
    window: fakeWindow,
    fetch: () => { fetchCalls++; throw new Error("Network not allowed"); }
  }, {filename: "DemoRequestForm.i03h.offline.cjs", timeout: 2500});
  const DemoRequestForm = fakeModule.exports.DemoRequestForm;
  assert.equal(typeof DemoRequestForm, "function");
  const labels = {verificationFailed: "Invalid token", verificationRequired: "Required"};
  function findScript(node) {
    if (!node || typeof node !== "object") return null;
    if (Array.isArray(node)) return node.map(findScript).find(Boolean) || null;
    if (node.type === scriptStub) return node;
    return findScript(node.props?.children);
  }
  function renderLocale(locale) {
    cursor = 0;
    const tree = DemoRequestForm({locale, labels});
    // The browser supplies the DOM element after the initial render.
    hooks[2].current = {};
    while (pendingEffects.length) pendingEffects.shift()();
    const script = findScript(tree);
    assert.ok(script && typeof script.props.onReady === "function");
    script.props.onReady();
    return tree;
  }
  renderLocale(initialLocale);
  assert.equal(renderCalls, 1, "First locale should render exactly one widget");
  assert.equal(widgetHistory[0].language, initialLocale, "Widget language must use route locale");
  renderLocale(initialLocale);
  assert.equal(renderCalls, 1, "Same-locale render must not duplicate widget");
  assert.equal(removeCalls, 0);
  const secondLocale = initialLocale === "es" ? "en" : "es";
  renderLocale(secondLocale);
  assert.equal(renderCalls, 2, "Locale switch must render the new widget");
  assert.equal(removeCalls, 1, "Locale switch must remove the previous widget");
  assert.equal(widgetHistory[1].language, secondLocale);
  renderLocale(initialLocale);
  assert.equal(renderCalls, 3, "Switch back must create localized widget");
  assert.equal(removeCalls, 2);
  assert.equal(widgetHistory[2].language, initialLocale);
  assert.equal(resetCalls, 0, "A locale switch must not simulate a submission");
  assert.equal(fetchCalls, 0, "Locale rendering must not access the backend");
  console.log(`PASS I03H locale ${initialLocale}->${secondLocale}->${initialLocale}, cleanup and no network`);
}

exercise("es");
exercise("en");
console.log("I03H LOCALE OFFLINE PASS: ES/EN initialization, SPA switches, cleanup, no network");
