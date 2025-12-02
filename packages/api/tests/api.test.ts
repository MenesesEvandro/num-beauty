import app from '../src/index';

describe('API Edge', () => {
    test('GET / returns welcome message', async () => {
        const res = await app.request('/');
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body).toEqual({ message: 'Num-Beauty API' });
    });

    test('GET /format formats number', async () => {
        const res = await app.request('/format?value=1000');
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body).toEqual({ result: '1,000.00' });
    });

    test('GET /format respects options', async () => {
        const res = await app.request('/format?value=1000&currency=USD');
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body).toEqual({ result: '$1,000.00' });
    });

    test('POST /format formats number', async () => {
        const res = await app.request('/format', {
            method: 'POST',
            body: JSON.stringify({ value: 1234.56, options: { locale: 'pt-BR' } }),
            headers: { 'Content-Type': 'application/json' },
        });
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body).toEqual({ result: '1.234,56' });
    });

    test('POST /format handles invalid input', async () => {
        const res = await app.request('/format', {
            method: 'POST',
            body: JSON.stringify({ value: 'invalid' }),
            headers: { 'Content-Type': 'application/json' },
        });
        expect(res.status).toBe(400);
    });
});
