import { parse } from '@babel/parser';
import MagicString from 'magic-string';
import { beautify, type NumBeautyOptions } from 'num-beauty';

export function transform(code: string, id: string): string | undefined {
    // Only transform JS/TS files
    if (!/\.(js|ts|jsx|tsx|mjs|cjs)$/.test(id)) {
        return undefined;
    }

    // Check if file contains 'beautify' to avoid unnecessary parsing
    if (!code.includes('beautify')) {
        return undefined;
    }

    const ast = parse(code, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
    });

    const s = new MagicString(code);
    let hasChanges = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    simpleWalk(ast.program, (node: any) => {
        if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'beautify') {
            const args = node.arguments;

            // Ensure we have arguments
            if (args.length === 0) return;

            // Check if first argument (number) is a literal
            const firstArg = args[0];
            let numberValue: number | undefined;

            if (firstArg.type === 'NumericLiteral') {
                numberValue = firstArg.value;
            } else if (firstArg.type === 'StringLiteral') {
                // Try to parse string as number if user passed "100"
                const parsed = parseFloat(firstArg.value);
                if (!isNaN(parsed)) {
                    numberValue = parsed;
                }
            }

            if (numberValue === undefined) {
                return; // Dynamic argument, skip
            }

            // Check second argument (options)
            let options: NumBeautyOptions = {};
            if (args.length > 1) {
                const secondArg = args[1];
                if (secondArg.type === 'ObjectExpression') {
                    // Try to extract static options
                    try {
                        options = extractOptions(secondArg);
                    } catch {
                        return; // Dynamic options, skip
                    }
                } else {
                    return; // Options is not an object literal, skip
                }
            }

            // Evaluate
            try {
                const result = beautify(numberValue, options);
                // Replace with string literal
                if (typeof node.start === 'number' && typeof node.end === 'number') {
                    s.overwrite(node.start, node.end, JSON.stringify(result));
                    hasChanges = true;
                }
            } catch {
                // Evaluation failed (e.g. invalid locale), skip
            }
        }
    });

    return hasChanges ? s.toString() : undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function simpleWalk(node: any, visitor: (node: any) => void) {
    if (!node) return;

    visitor(node);

    for (const key in node) {
        if (key === 'loc' || key === 'start' || key === 'end' || key === 'comments') continue;

        const child = node[key];
        if (Array.isArray(child)) {
            child.forEach(c => simpleWalk(c, visitor));
        } else if (child && typeof child === 'object' && typeof child.type === 'string') {
            simpleWalk(child, visitor);
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractOptions(node: any): NumBeautyOptions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {};

    for (const prop of node.properties) {
        if (prop.type !== 'ObjectProperty') {
            throw new Error('Spread properties not supported');
        }

        const key = prop.key.name || prop.key.value;
        const valueNode = prop.value;

        if (valueNode.type === 'StringLiteral') {
            options[key] = valueNode.value;
        } else if (valueNode.type === 'NumericLiteral') {
            options[key] = valueNode.value;
        } else if (valueNode.type === 'BooleanLiteral') {
            options[key] = valueNode.value;
        } else {
            throw new Error('Dynamic option value');
        }
    }

    return options;
}
