import { Hono } from 'hono';
import { beautify, type NumBeautyOptions } from 'num-beauty';

const app = new Hono();

app.get('/', (c) => {
    return c.json({ message: 'Num-Beauty API' });
});

app.get('/format', (c) => {
    const value = c.req.query('value');
    if (!value) {
        return c.json({ error: 'Missing value query parameter' }, 400);
    }

    const num = parseFloat(value);
    if (isNaN(num)) {
        return c.json({ error: 'Invalid number' }, 400);
    }

    const options: NumBeautyOptions = {};

    const locale = c.req.query('locale');
    if (locale) options.locale = locale as any;

    const currency = c.req.query('currency');
    if (currency) options.currency = currency;

    const decimals = c.req.query('decimals');
    if (decimals) options.decimals = parseInt(decimals, 10);

    const abbreviated = c.req.query('abbreviated');
    if (abbreviated === 'true') options.abbreviated = true;

    const stripZeros = c.req.query('stripZeros');
    if (stripZeros === 'true') options.stripZeros = true;

    try {
        const result = beautify(num, options);
        return c.json({ result });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

app.post('/format', async (c) => {
    const body = await c.req.json();
    const { value, options } = body;

    if (value === undefined) {
        return c.json({ error: 'Missing value in body' }, 400);
    }

    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) {
        return c.json({ error: 'Invalid number' }, 400);
    }

    try {
        const result = beautify(num, options || {});
        return c.json({ result });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

export default app;
