function partition(arr, low, high) {
    let pivot = arr[high]
    let i = low
    for (let j = low; j < high; j++) {
        if (arr[j] > pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            i++
        }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]]

    return i
}

arr = [1, 3, 4, 2]
// partition(arr, 0, arr.length - 1)
// console.log(arr);

function quickSort(arr, low, high) {
    let Index = partition(arr, low, high)
    partition(arr, low, Index - 1)
    partition(arr, Index + 1, high)
    return arr
}
console.log(quickSort(arr, 0, arr.length - 1));
