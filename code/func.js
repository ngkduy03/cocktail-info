//radix sort
function getMax(arr) {
    let obj = [];
    if(typeof arr[0] == "object") {
        obj = arr.map(item => item.name);
    } else {
        obj = arr; 
    }

    return obj.reduce((prev, cur) => prev.length > cur.length?
    prev.length:
    cur.length, 0);
}

function getCharAtString(i, pos, arr) {
    let obj = [];
    if(typeof arr[0] == "object") {
        obj = arr.map(item => item.name);
    } else {
        obj = arr;
    }

    if(pos < 0 || pos >= obj[i].length){
        return 0;
    }
    
    return obj[i][pos].charCodeAt(0);
}

function countingSort(arr, pos) {
    let count = new Array(257).fill(0);
    let len = arr.length;
    let output = new Array(len);
    
    for(let i = 0; i < arr.length;i++) {
        let ascii = getCharAtString(i, pos, arr);
        count[ascii + 1]++;
    }

    for(let i = 1; i <= 256; i++) {
        count[i] += count[i-1];
    }

    for(let i = 0; i < len; i++) {
        let ascii = getCharAtString(i, pos, arr);
        output[count[ascii]++] = arr[i];
    }

    for(let i = 0; i < len; i++) {
        arr[i] = output[i];
    }
}

function radixSort(arr) {
    let max = getMax(arr);
    for(let pos = max - 1; pos >= 0; pos--) {
        countingSort(arr, pos);
    }
}

// binary search
function binarySearch(arr, str) {
    let left = 0;
    let right = arr.length - 1;
    while(left <= right) {
        let mid = parseInt(left + (right - left)/2);
        if(str.localeCompare(arr[mid].name) == 0) {
            return mid;
        } else if(str.localeCompare(arr[mid].name) < 0) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}

function capital(str) {
    return str.replace(/\b(\w)/g, char => char.toUpperCase());
}