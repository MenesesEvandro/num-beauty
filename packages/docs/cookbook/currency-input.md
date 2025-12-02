# Currency Input

Creating a currency input that formats on blur is a common requirement.

## React Example

```tsx
import { useState } from 'react';
import { beautify } from 'num-beauty';

export function CurrencyInput() {
  const [value, setValue] = useState('');

  const handleBlur = () => {
    if (!value) return;
    
    // Parse the value (remove non-numeric chars)
    const rawValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
    
    if (!isNaN(rawValue)) {
      // Format on blur
      setValue(beautify(rawValue, { currency: 'USD' }));
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Enter amount"
    />
  );
}
```
