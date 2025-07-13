// const oldObj = {
//     name: '帅哥',
//     age: 18,
//     hobby: {
//         option1: '篮球',
//         option2: '足球',
//         option3: '乒乓球'
//     },
//     friend: [
//         {
//             name: '张三',
//             age: 18
//         },
//         {
//             name: '李四',
//             age: 19
//         }
//     ]
// }


const oldObj = {
    date: new Date(),
    regExp: /abc/gi,
    name: "Alice",
    self: null // 循环引用
};
function deepClone(obj = {}, hash = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (hash.has(obj)) return hash.get(obj);

    if (obj instanceof Date) {
        const result = new Date(obj)
        hash.set(obj, result)
        return result;
    }

    if (obj instanceof RegExp) {
        const result = new RegExp(obj)
        hash.set(obj, result)
        return result;
    }

    let result = Array.isArray(obj) ? [] : {}

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key])
        }
    }
    return result
}
const newObj = deepClone(oldObj)
// newObj.friend[1].name = '王五';
newObj.name = 'James'
console.log(newObj, oldObj);
