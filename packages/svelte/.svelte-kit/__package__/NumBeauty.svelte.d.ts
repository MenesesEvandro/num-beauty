import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: number;
        locale?: string | undefined;
        decimals?: number | undefined;
        currency?: string | undefined;
        abbreviated?: boolean;
        bytes?: boolean;
        bytesBinary?: boolean;
        percentage?: boolean;
        percentageMultiply?: boolean;
        stripZeros?: boolean | undefined;
        mask?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type NumBeautyProps = typeof __propDef.props;
export type NumBeautyEvents = typeof __propDef.events;
export type NumBeautySlots = typeof __propDef.slots;
export default class NumBeauty extends SvelteComponent<NumBeautyProps, NumBeautyEvents, NumBeautySlots> {
}
export {};
