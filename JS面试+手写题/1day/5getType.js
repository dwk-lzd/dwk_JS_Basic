const getType = (data) => {
    const res = Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
    return res
}
console.log(getType(1));
console.log(getType('1234567890'));
console.log(getType(true));
console.log(getType(null));
console.log(getType(undefined));
console.log(getType([]));
console.log(getType({}));
console.log(getType(BigInt(1234567890)));
console.log(getType(Symbol()));
console.log(getType(new Date()));
console.log(getType(new Map()));
console.log(getType(new Set()));
console.log(getType(new WeakMap()));
console.log(getType(new RegExp()));
console.log(getType(function () { }));