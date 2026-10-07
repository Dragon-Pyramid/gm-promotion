# GPR-008-A1 - source-map-js Security Remediation

## Objective

Remediate the high-severity `source-map-js` vulnerability affecting versions up to `1.2.1` without introducing unrelated dependency upgrades.

## Baseline

- Branch: `feature/gpr-008-a1-source-map-js-security`
- Baseline commit: `cc4f9eaced65649de7db6b1af66d12b5496b2839`

## Finding

`npm audit --omit=dev` reported:

- package: `source-map-js`
- affected range: `1.0.0 - 1.2.1`
- severity: high
- installed version: `1.2.1`

The package was introduced transitively through:

- `@tailwindcss/node`
- `postcss`
- `next`

## Remediation

Add an npm override:

```json
"overrides": {
  "source-map-js": "1.2.2"
}
```

Update the lockfile resolution from `1.2.1` to `1.2.2`.

## Validation

- `npm ci` PASS
- `npm ls source-map-js` resolves `1.2.2`
- `npm audit --omit=dev` returns `0 vulnerabilities`
- `npm run typecheck` PASS
- `npm run lint` PASS
- `npm run build` PASS
- `git diff --check` PASS

## Notes

The full dependency tree still reports development-tooling vulnerabilities.

Those issues are outside the scope of this ticket because automated remediation requires breaking dependency changes.

No `npm audit fix --force` was executed.

## Out of scope

This ticket does not:

- upgrade Next.js;
- downgrade or replace `eslint-config-next`;
- change application code;
- change runtime behavior;
- modify the RAG or Chat implementation.
