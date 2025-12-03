import { useState } from 'react';
import { useNumBeauty } from '@num-beauty/react/hooks';
import { NumBeautyProvider } from '@num-beauty/react/context';

function Playground() {
    const [value, setValue] = useState(1234567.89);
    const [locale, setLocale] = useState('en-US');
    const [currency, setCurrency] = useState('');
    const [decimals, setDecimals] = useState(2);
    const [abbreviated, setAbbreviated] = useState(false);
    const [bytes, setBytes] = useState(false);
    const [percentage, setPercentage] = useState(false);
    const [mask, setMask] = useState('');

    const { formatted } = useNumBeauty(value, {
        locale,
        currency: currency || undefined,
        decimals,
        abbreviated,
        bytes,
        percentage,
        mask: mask || undefined,
    });

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Num Beauty Playground</h1>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: '2rem', textAlign: 'center' }}>
                    {formatted}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label>
                        Number Value
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(parseFloat(e.target.value))}
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </label>

                    <label>
                        Locale
                        <select
                            value={locale}
                            onChange={(e) => setLocale(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem' }}
                        >
                            <option value="en-US">en-US</option>
                            <option value="pt-BR">pt-BR</option>
                            <option value="de-DE">de-DE</option>
                            <option value="ja-JP">ja-JP</option>
                            <option value="fr-FR">fr-FR</option>
                        </select>
                    </label>

                    <label>
                        Decimals
                        <input
                            type="number"
                            value={decimals}
                            onChange={(e) => setDecimals(parseInt(e.target.value))}
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </label>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label>
                        Currency (e.g. USD, EUR, BRL)
                        <input
                            type="text"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            placeholder="None"
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </label>

                    <label>
                        Mask (e.g. phone, ssn)
                        <input
                            type="text"
                            value={mask}
                            onChange={(e) => setMask(e.target.value)}
                            placeholder="None"
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </label>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={abbreviated}
                                onChange={(e) => setAbbreviated(e.target.checked)}
                            /> Abbreviated
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={bytes}
                                onChange={(e) => setBytes(e.target.checked)}
                            /> Bytes
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={percentage}
                                onChange={(e) => setPercentage(e.target.checked)}
                            /> Percentage
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <NumBeautyProvider>
            <Playground />
        </NumBeautyProvider>
    );
}
