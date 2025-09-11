function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // 获取分区索引
        const pivotIndex = partition(arr, low, high);  // [3, 1, 4, 2] 经过循环=》 [1, 2, 4, 3]  pivotIndex = 1

        // 递归排序基准值左右两部分
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

// 分区函数：Lomuto 分区方案（以最后一个元素为基准）
function partition(arr, low, high) {
    const pivot = arr[high];  // 选择最后一个元素为基准
    let i = low           // 较小元素的索引

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换
            i++;

        }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]]; // 将基准放到正确位置
    return i
}