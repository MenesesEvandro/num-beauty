import 'reflect-metadata';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AutoFormat } from '../src/index';

class UserDto {
    @AutoFormat({ currency: 'USD' })
    balance: number;

    @AutoFormat({ abbreviated: true })
    followers: number;

    constructor(balance: number, followers: number) {
        this.balance = balance;
        this.followers = followers;
    }
}

describe('Backend Decorators', () => {
    test('formats properties during serialization', () => {
        const user = new UserDto(1000, 1500000);
        const plain = instanceToPlain(user);

        expect(plain).toEqual({
            balance: '$1,000.00',
            followers: '1.5m', // Assuming 'm' from previous phases
        });
    });

    test('handles null/undefined', () => {
        const user = new UserDto(null as any, undefined as any);
        const plain = instanceToPlain(user);

        expect(plain).toEqual({
            balance: null,
            followers: undefined,
        });
    });

    test('handles invalid numbers', () => {
        const user = new UserDto('invalid' as any, NaN);
        const plain = instanceToPlain(user);

        expect(plain).toEqual({
            balance: 'invalid',
            followers: NaN,
        });
    });
});
