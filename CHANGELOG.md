# Changelog

All notable changes to this project will be documented here.

## [Unreleased]

### Added

- **New Locales** (Expanded from 3 to 41 supported locales):
  - **Core (original)**: `en-US`, `pt-BR`, `es-ES`
  - **Europe**: `de-DE`, `fr-FR`, `it-IT`, `nl-NL`, `pl-PL`, `tr-TR`, `sv-SE`, `da-DK`, `nb-NO`, `fi-FI`, `cs-CZ`, `hu-HU`, `ro-RO`, `sk-SK`, `bg-BG`, `hr-HR`, `el-GR`, `uk-UA`, `sl-SI`, `lt-LT`, `lv-LV`, `et-EE`, `sr-RS`, `pt-PT`, `ca-ES`, `is-IS`, `ga-IE`
  - **Asia & Middle East**: `ja-JP`, `zh-CN`, `ko-KR`, `hi-IN`, `ar-SA`, `ru-RU`, `vi-VN`, `th-TH`, `id-ID`, `ms-MY`, `he-IL`, `ar-EG`
  - **Africa & Oceania**: `en-ZA`, `en-NG`, `en-AU`, `en-NZ`, `mi-NZ`, `en-KE`, `sw-KE`, `pt-AO`
- **Fluent API**: New chainable `Num(value)` interface for intuitive formatting (e.g., `Num(1000).locale('pt-BR').currency('BRL').format()`).
- **Format to Parts**: Added `beautifyToParts()` for granular access to number components (integer, fraction, currency symbol, etc.), enabling custom styling.
- **Parsing**: Added `unbeautify()` to convert formatted strings (including currency, abbreviations, and percentages) back to numbers.
- **Accessibility**: Added `toAccessibleString()` to generate screen-reader-friendly descriptions (e.g., "1.2 million").
- **Bytes Formatting**: New `formatBytes()` support for binary (KiB, MiB) and decimal (KB, MB) units.
- **Percentage Formatting**: Dedicated `formatPercentage()` with automatic multiplication and symbol placement.
- **Enhanced Architecture**:
  - Lazy loading system to keep bundle size small while supporting 30+ locales.
  - Improved currency formatting engine with locale-specific spacing rules (e.g., correct spacing for Thai Baht and Indonesian Rupiah).
- **Plugin System**: Introduced `Num.extend()` plus the `NumPlugin` API so external wrappers can add fluent methods, reuse internal services and mutate the formatter state without forking core.

## [0.1.1] - 2025-05-19

### Fixed

- Package optimization: reduced final bundle size from 62.5kB to 7.0kB
- Fixed ESLint configuration for test files

## [0.1.0] - 2025-05-19

### Features

- First public release of num-beauty
- Number formatting with thousands and decimal separators
- Internationalization support: en-US, pt-BR, es-ES
- Customizable decimal precision
- Multiple rounding modes
- Predefined and custom masks per locale
- Large number abbreviation (e.g., 1,234,567 → 1.23M)
- Automated tests with high coverage
- Documentation and usage examples
- Perfomance tests
