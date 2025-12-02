# Runtime Compatibility

The `num-beauty` library is designed to work seamlessly across multiple JavaScript runtimes. This directory contains compatibility tests to ensure consistent behavior.

## Supported Runtimes

| Runtime | Versions Tested | Status |
|---------|----------------|--------|
| **Node.js** | 18.x, 20.x, 22.x | ✅ Fully Supported |
| **Deno** | 1.x, 2.x | ✅ Fully Supported |
| **Bun** | latest | ✅ Fully Supported |
| **Browsers** | Modern (ES2020+) | ✅ Fully Supported |

## Running Tests Locally

### Node.js
```bash
npm run test:runtime
```

### All Runtimes (requires Deno and Bun installed)
```bash
npm run test:runtime:all
```

### Individual Runtimes

**Deno:**
```bash
deno run --allow-read tests/runtime/test-runtime.mjs
```

**Bun:**
```bash
bun tests/runtime/test-runtime.mjs
```

## CI/CD Integration

Runtime compatibility tests run automatically on:
- Pull requests to `main` or `dev`
- Pushes to `main` or `dev`
- Changes to source files or runtime tests

See `.github/workflows/runtime-tests.yml` for configuration.

## Test Coverage

The runtime tests cover:

- ✅ Basic number formatting (20+ numbers)
- ✅ Multiple locales (en-US, pt-BR, es-ES, de-DE, fr-FR)
- ✅ Currency formatting (USD, BRL, EUR)
- ✅ Bytes formatting (binary and decimal)
- ✅ Percentage formatting
- ✅ All rounding modes (7 modes)
- ✅ Abbreviated numbers
- ✅ Edge cases (zero, negative, very large/small numbers)
- ✅ Dynamic locale loading

## ESM Compatibility

The library uses ES Modules with explicit `.js` extensions in import statements, ensuring compatibility with:
- Node.js (with `"type": "module"` in package.json)
- Deno (native ESM support)
- Bun (native ESM support)
- Modern bundlers (Webpack, Vite, Rollup, etc.)

## Known Limitations

- **Deno**: Requires `--allow-read` flag for dynamic locale loading
- **Internet Explorer**: Not supported (requires ES2020+)
- **Node.js < 14**: Not supported (requires ESM support)

## Troubleshooting

### Import Errors

If you encounter `ERR_MODULE_NOT_FOUND` errors:

1. Ensure you're using Node.js 14+ with `"type": "module"`
2. Check that `.js` extensions are included in imports
3. Verify the build output exists (`npm run build`)

### Locale Loading

If locale loading fails:

```typescript
import { loadLocale } from 'num-beauty/locales/loader';

// Ensure you await the load
await loadLocale('pt-BR');

// Then use it
beautify(1234.56, { locale: 'pt-BR' });
```

## Contributing

To add new runtime compatibility tests:

1. Add test cases to `test-runtime.mjs`
2. Ensure tests pass on all runtimes
3. Update this documentation if needed
