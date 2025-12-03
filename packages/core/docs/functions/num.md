[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / num

# Function: num()

> **num**(`value`): [`Num`](../classes/Num.md)

Defined in: fluent.ts:309

Create a new Num instance for fluent formatting

## Parameters

### value

`number`

The number to format

## Returns

[`Num`](../classes/Num.md)

A new Num instance

## Example

```typescript
import { Num } from 'num-beauty';

Num(1234.56).locale('pt-BR').format() // "1.234,56"
Num(1234.56).currency('USD').format() // "$1,234.56"
Num(0.5).percentage().format() // "50.00%"
```
