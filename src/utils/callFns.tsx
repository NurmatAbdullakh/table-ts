
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallFnsFunction = (...fns: ((...args: any[]) => void)[]) => (...args: any[]) => void;

export const callFns: CallFnsFunction = (...fns) => (...args) => {
    fns.forEach(fn => fn && fn(...args));
};