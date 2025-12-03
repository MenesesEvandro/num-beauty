#!/usr/bin/env node
import { Command } from 'commander';
import { beautify, formatCurrency, formatBytes, formatPercentage, type NumBeautyOptions } from 'num-beauty';
import { createInterface } from 'readline';

const program = new Command();

program
    .name('num-beauty')
    .description('Format numbers from the command line')
    .version('0.1.0');

program
    .argument('[number]', 'Number to format')
    .option('-l, --locale <locale>', 'Locale to use', 'en-US')
    .option('-c, --currency <currency>', 'Format as currency (e.g. USD, EUR)')
    .option('-d, --decimals <number>', 'Number of decimal places', parseInt)
    .option('-a, --abbreviated', 'Abbreviate large numbers')
    .option('-b, --bytes', 'Format as bytes')
    .option('--binary', 'Use binary units for bytes (1024 base)', true)
    .option('--no-binary', 'Use decimal units for bytes (1000 base)')
    .option('-p, --percentage', 'Format as percentage')
    .option('--multiply', 'Multiply by 100 for percentage', true)
    .option('--no-multiply', 'Do not multiply by 100 for percentage')
    .option('-s, --strip-zeros', 'Strip trailing zeros')
    .option('-m, --mask <mask>', 'Apply mask')
    .action(async (numberArg, options) => {
        const processInput = (input: string) => {
            const num = parseFloat(input);
            if (isNaN(num)) {
                console.error(`Invalid number: ${input}`);
                process.exit(1);
            }

            let result: string;

            if (options.currency) {
                result = formatCurrency(num, options.locale, {
                    currency: options.currency,
                    decimals: options.decimals,
                    stripZeros: options.stripZeros,
                });
            } else if (options.bytes) {
                result = formatBytes(num, {
                    locale: options.locale,
                    binary: options.binary,
                    decimals: options.decimals,
                });
            } else if (options.percentage) {
                result = formatPercentage(num, {
                    locale: options.locale,
                    decimals: options.decimals,
                    multiply: options.multiply,
                    stripZeros: options.stripZeros,
                });
            } else {
                const beautifyOptions: NumBeautyOptions = {
                    locale: options.locale,
                    decimals: options.decimals,
                    abbreviated: options.abbreviated,
                    stripZeros: options.stripZeros,
                    mask: options.mask,
                };
                result = beautify(num, beautifyOptions);
            }

            console.log(result);
        };

        if (numberArg) {
            processInput(numberArg);
        } else {
            // Read from stdin
            const rl = createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false,
            });

            for await (const line of rl) {
                if (line.trim()) {
                    processInput(line.trim());
                }
            }
        }
    });

program.parse();
