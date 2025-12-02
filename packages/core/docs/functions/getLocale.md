[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / getLocale

# Function: getLocale()

> **getLocale**(`code`): \{ `currencies`: `Record`\<`string`, [`CurrencyConfig`](../interfaces/CurrencyConfig.md)\>; `masks`: `Record`\<`string`, `string`\>; `speech?`: \{ `currency?`: `Record`\<`string`, readonly \[`string`, `string`\]\>; `currencyJoiner?`: `string`; `hundredOneExact?`: `string`; `hundredsWords?`: readonly `string`[]; `minus?`: `string`; `point?`: `string`; `rules?`: \{ `hundredsJoiner?`: `string`; `hundredSuffix?`: `string`; `tensHyphenate?`: `boolean`; `tensJoiner?`: `string`; \}; `small?`: readonly `string`[]; `tens?`: readonly `string`[]; `units?`: readonly readonly \[`string`, `string`\][]; \}; `units`: readonly readonly \[`string`, `string`\][]; \} \| `undefined`

Defined in: [locales/index.ts:259](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/locales/index.ts#L259)

Get a registered locale configuration

## Parameters

### code

`string`

Locale code

## Returns

\{ `currencies`: `Record`\<`string`, [`CurrencyConfig`](../interfaces/CurrencyConfig.md)\>; `masks`: `Record`\<`string`, `string`\>; `speech?`: \{ `currency?`: `Record`\<`string`, readonly \[`string`, `string`\]\>; `currencyJoiner?`: `string`; `hundredOneExact?`: `string`; `hundredsWords?`: readonly `string`[]; `minus?`: `string`; `point?`: `string`; `rules?`: \{ `hundredsJoiner?`: `string`; `hundredSuffix?`: `string`; `tensHyphenate?`: `boolean`; `tensJoiner?`: `string`; \}; `small?`: readonly `string`[]; `tens?`: readonly `string`[]; `units?`: readonly readonly \[`string`, `string`\][]; \}; `units`: readonly readonly \[`string`, `string`\][]; \} \| `undefined`

Locale configuration or undefined if not found
