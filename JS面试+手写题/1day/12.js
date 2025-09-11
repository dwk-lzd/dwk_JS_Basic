function threeWayPartition(arr, low, high) {
    let pivot = arr[low]
    let lt = low
    let cur = low + 1
    let gt = high
    while (cur <= gt) {
        if (arr[cur] < pivot) {
            [arr[cur], arr[lt]] = [arr[lt], arr[cur]]
            cur++
            lt++
        } else if (arr[cur] > pivot) {
            [arr[cur], arr[gt]] = [arr[gt], arr[cur]]
            gt--
        } else {
            cur++
        }
    }

    return [lt, gt]
}

function quickSort(arr, low, high) {
    if (low >= high) return arr

    let [lt, gt] = threeWayPartition(arr, low, high)
    quickSort(arr, 0, lt - 1)
    quickSort(arr, gt + 1, high)

    return arr
}

let arr = [3, 1, 2, 3, 5, 4, 6]
console.log(quickSort(arr, 0, arr.length - 1));
