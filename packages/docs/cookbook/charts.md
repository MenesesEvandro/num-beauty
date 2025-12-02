# Charts Integration

`num-beauty` provides built-in adapters for popular charting libraries.

## Chart.js

Use `getChartJsCallback` to format ticks.

```javascript
import { Chart } from 'chart.js';
import { getChartJsCallback } from 'num-beauty';

const chart = new Chart(ctx, {
  type: 'bar',
  data: { /* ... */ },
  options: {
    scales: {
      y: {
        ticks: {
          // Format as USD currency
          callback: getChartJsCallback({ currency: 'USD', abbreviated: true })
        }
      }
    }
  }
});
```

## Recharts

Use `getRechartsFormatter` for axes or tooltips.

```jsx
import { YAxis, Tooltip } from 'recharts';
import { getRechartsFormatter } from 'num-beauty';

const formatter = getRechartsFormatter({ abbreviated: true });

<YAxis tickFormatter={formatter} />
<Tooltip formatter={formatter} />
```
