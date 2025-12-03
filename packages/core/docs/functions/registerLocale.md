[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / registerLocale

# Function: registerLocale()

> **registerLocale**(`code`, `config`): `void`

Defined in: [locales/index.ts:197](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/locales/index.ts#L197)

Register a custom locale or override an existing one

## Parameters

### code

`string`

Locale code (e.g., 'ja-JP', 'zh-CN')

### config

Locale configuration

#### currencies?

`Record`\<`string`, [`CurrencyConfig`](../interfaces/CurrencyConfig.md)\>

#### masks?

`Record`\<`string`, `string`\>

#### speech?

\{ `currency?`: `Record`\<`string`, readonly \[`string`, `string`\]\>; `currencyJoiner?`: `string`; `hundredOneExact?`: `string`; `hundredsWords?`: readonly `string`[]; `minus?`: `string`; `point?`: `string`; `rules?`: \{ `hundredsJoiner?`: `string`; `hundredSuffix?`: `string`; `tensHyphenate?`: `boolean`; `tensJoiner?`: `string`; \}; `small?`: readonly `string`[]; `tens?`: readonly `string`[]; `units?`: readonly readonly \[`string`, `string`\][]; \}

#### speech.currency?

`Record`\<`string`, readonly \[`string`, `string`\]\>

#### speech.currencyJoiner?

`string`

#### speech.hundredOneExact?

`string`

#### speech.hundredsWords?

readonly `string`[]

#### speech.minus?

`string`

#### speech.point?

`string`

#### speech.rules?

\{ `hundredsJoiner?`: `string`; `hundredSuffix?`: `string`; `tensHyphenate?`: `boolean`; `tensJoiner?`: `string`; \}

#### speech.rules.hundredsJoiner?

`string`

#### speech.rules.hundredSuffix?

`string`

#### speech.rules.tensHyphenate?

`boolean`

#### speech.rules.tensJoiner?

`string`

#### speech.small?

readonly `string`[]

#### speech.tens?

readonly `string`[]

#### speech.units?

readonly readonly \[`string`, `string`\][]

#### units?

readonly readonly \[`string`, `string`\][]

## Returns

`void`

## Example

```typescript
import { registerLocale } from 'num-beauty';

// Register Japanese locale
registerLocale('ja-JP', {
  masks: {
    phone: '###-####-####',
    postal: '###-####'
  },
  currencies: {
    JPY: { symbol: '¥', position: 'before' }
  },
  units: [
    ['', ''],
    ['千', '千'],
    ['万', '万'],
    ['億', '億']
  ]
});

// Use the registered locale
beautify(1234.56, { locale: 'ja-JP' });
```
