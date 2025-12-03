# React Integration

Num-Beauty provides a dedicated package for React applications: `@num-beauty/react`.

## Installation

```bash
pnpm add @num-beauty/react num-beauty
```

## Usage

### Hooks

```tsx
import { useNumBeauty } from '@num-beauty/react';

function Price({ value }) {
  const { format } = useNumBeauty({ currency: 'USD' });
  return <span>{format(value)}</span>;
}
```

### Components

```tsx
import { NumDisplay } from '@num-beauty/react';

function App() {
  return <NumDisplay value={1000} currency="USD" />;
}
```
