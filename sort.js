var results = document.querySelector('#results')
var run_button = document.querySelector('#run_anim')

function startSort(number,array){
    results.innerHTML = "Array before sorting ("+array.length+" elements): "+array
    if(run_button.checked){
        runAnimation(number,[...array])
        run_button.checked = false
        run_button.disabled = true
    }
    var startTime = performance.now();
    switch(number){
        case 0:
            array = bubbleSort(array)
            break;
        case 1:
            array = quickSort(array,0,array.length-1)
            break;
        case 2:
            array = selectionSort(array)
            break;
        case 3:
            array = mergeSort(array,array.length)
            break;
        case 4:
            array = bogoSort(array)
            break;
    }
    var endTime = performance.now();
    results.innerHTML = results.textContent+"<br><br> Array sorted in <span style='color:blue'>"+(endTime-startTime)+"</span> milliseconds"
    + "<br><br>Array after sorting: <br>"+array
}

function randomArray(length,range){
    var array = []
    for(var i = 0; i < length; i++){
        array[i] = Math.round(Math.random()*range)
    }
    return array;
}

function isSorted(array){
    for(var i = 0; i < array.length - 1; i++) {
        if(array[i] > array[i+1]) {
            return false;
        }
    }
    return true;
}

function bubbleSort(array){
    for(var i = 0; i < array.length-1; i++){
        for(var j=0; j < array.length-i-1; j++){
            if(array[j]>array[j+1]){
                var temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp
            }
        }
    }
    return array;
}

function selectionSort(array){
    for (var i = 0; i < array.length - 1; i++)  
    {
        var index = i
        for (var j = i + 1; j < array.length; j++){
            if (array[j] < array[index]){
                index = j
            }
        }
        var temp = array[index]
        array[index] = array[i]
        array[i] = temp
    }
    return array;
}

function mergeSort(array,n){
    if (n < 2) {
        return;
    }
    var mid = parseInt(n / 2);
    var arrayOne = new Array(mid);
    var arrayTwo = new Array(n - mid);
    for (var i = 0; i < mid; i++) {
        arrayOne[i] = array[i];
    }
    for (var i = mid; i < n; i++) {
        arrayTwo[i - mid] = array[i];
    }
    mergeSort(arrayOne, mid);
    mergeSort(arrayTwo, n - mid);
    merge(array, arrayOne, arrayTwo);
    return array;
}

function merge(array,arrayOne,arrayTwo){
    var i = 0, j = 0, k = 0;
    while (i < arrayOne.length && j < arrayTwo.length) {
        if (arrayOne[i] <= arrayTwo[j]) {
            array[k++] = arrayOne[i++];
        }
        else {
            array[k++] = arrayTwo[j++];
        }
    }
    while (i < arrayOne.length) {
        array[k++] = arrayOne[i++];
    }
    while (j < arrayTwo.length) {
        array[k++] = arrayTwo[j++];
    }
}

function quickSort(array,start,end){
    if (start < end) {
        var index = partition(array, start, end)
        quickSort(array, start, index-1)
        quickSort(array, index+1, end)
        return array;
    }
}

function partition(array,start,end){
    var pivot = array[end]
    var i = start - 1

    for (var j = start; j < end; j++) {
        if (array[j] <= pivot) {
            i++
            var temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }
    var temp = array[i+1]
    array[i+1] = array[end]
    array[end] = temp
    return i+1;
}

function bogoSort(array) {
    while(true){
        if(isSorted(array)) break;
        for(var i = 0; i < array.length; i++) {
            var index1 = Math.floor(Math.random() * array.length)
            var index2 = Math.floor(Math.random() * array.length)
            var temp = array[index1];
            array[index1] = array[index2];
            array[index2] = temp;
        }
    }
    return array
}


// --------------------ANIMATION ----------------------
// Maksymalnie można wyświetlić 850 kolumn
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

canvas.width = 850
canvas.height = 500
var cw = canvas.width
var ch = canvas.height

var width, heightMultiplier
var animationDelay = document.querySelector('#range_input').value*10;
ctx.fillRect(0,0,cw,ch)

function runAnimation(number,array){
    width = cw/array.length
    if(width<1){
        width = 1
        array = array.slice(0,cw)
    }
    var max = array[0];
    for(var i=1;i<array.length;i++){
        if(max<array[i]){
            max = array[i]
        }
    }
    heightMultiplier = ch/max
    switch(number){
        case 0:
            setTimeout(()=>{
                aBubbleSort(array).then(()=>{
                    endAnimation(array)
                })
            },0);
            break;
        case 1:
            setTimeout(()=>{
                aQuickSort(array,0,array.length-1).then(()=>{
                    endAnimation(array)
                })
            },0);
            break;
        case 2:
            setTimeout(()=>{
                aSelectionSort(array).then(()=>{
                    endAnimation(array)
                })
            },0);
            break;
        case 3:
            setTimeout(()=>{
                aMergeSort(array,array.length).then(()=>{
                    endAnimation(array)
                })
            },0);
            break;
        case 4:
            setTimeout(()=>{
                aBogoSort(array).then(()=>{
                    endAnimation(array)
                })
            },0);
            break;
    }
}

function drawChart(array,elements = []){
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,cw,ch)
    ctx.strokeStyle = "black"
    for(var i=0;i<cw;i++){
        ctx.fillStyle = "#1d641f"
        ctx.strokeRect(i*width,(ch-array[i]*heightMultiplier),width,array[i]*heightMultiplier)
        ctx.fillRect(i*width,(ch-array[i]*heightMultiplier),width,array[i]*heightMultiplier)
    }
    elements.forEach(e => {
        ctx.fillStyle = e.color
        ctx.strokeRect(e.index*width,(ch-array[e.index]*heightMultiplier),width,array[e.index]*heightMultiplier)
        ctx.fillRect(e.index*width,(ch-array[e.index]*heightMultiplier),width,array[e.index]*heightMultiplier)
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function aBubbleSort(array){
    for(var i = 0; i < array.length-1; i++){
        for(var j = 0; j < array.length-i-1; j++){
            if(array[j]>array[j+1]){
                var temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp
            }
            drawChart(array,[{index: j,color: '#e60000'},{index: j+1,color:'#e60000'}])
            await sleep(animationDelay)
        }
    }
}
async function aSelectionSort(array){
    for (var i = 0; i < array.length - 1; i++)  
    {
        var index = i
        for (var j = i + 1; j < array.length; j++){
            if (array[j] < array[index]){
                index = j
            }
            drawChart(array,[{index: j,color: '#e60000'},{index: index,color:'yellow'}])
            await sleep(animationDelay)
        }
        var temp = array[index]
        array[index] = array[i]
        array[i] = temp
    }
}

async function aMergeSort(array,n){
    if (n < 2) {
        return;
    }
    var mid = parseInt(n / 2);
    var arrayOne = new Array(mid)
    var arrayTwo = new Array(n - mid)
    for (var i = 0; i < mid; i++) {
        arrayOne[i] = array[i];
    }
    for (var i = mid; i < n; i++) {
        arrayTwo[i - mid] = array[i];
    }
    await aMergeSort(arrayOne, mid);
    await aMergeSort(arrayTwo, n - mid);
    await aMerge(array, arrayOne, arrayTwo);
    drawChart(array)
    await sleep(animationDelay)
}

async function aMerge(array,arrayOne,arrayTwo){
    var i = 0, j = 0, k = 0;
    while (i < arrayOne.length && j < arrayTwo.length) {
        if (arrayOne[i] <= arrayTwo[j]) {
            array[k++] = arrayOne[i++];
        }
        else {
            array[k++] = arrayTwo[j++];
        }
    }
    while (i < arrayOne.length) {
        array[k++] = arrayOne[i++];
    }
    while (j < arrayTwo.length) {
        array[k++] = arrayTwo[j++];
    }
}

async function aQuickSort(array,start,end){
    if (start < end) {
        var index = await aPartition(array, start, end)
        await aQuickSort(array, start, index-1)
        await aQuickSort(array, index+1, end)
    }
}

async function aPartition(array,start,end){
    var pivot = array[end]
    var i = start - 1

    for (var j = start; j < end; j++) {
        if (array[j] <= pivot) {
            i++
            var temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        await sleep(animationDelay)
        drawChart(array,[{index: j, color: 'red'},{index: i, color: 'red'},{index: start, color: 'yellow'},{index: end, color: 'lightblue'}])
    }
    var temp = array[i+1]
    array[i+1] = array[end]
    array[end] = temp
    return i+1;
}

async function aBogoSort(array) {
    while(true){
        if(isSorted(array)) break;
        for(var i = 0; i < array.length; i++) {
            var index1 = Math.floor(Math.random() * array.length)
            var index2 = Math.floor(Math.random() * array.length)
            var temp = array[index1];
            array[index1] = array[index2];
            array[index2] = temp;
            drawChart(array,[{index: index1, color: "red"},{index: index2, color: 'red'}])
            await sleep(animationDelay)
        }
    }
}

async function endAnimation(array){
    run_button.disabled = false
    run_button.checked = true
    var newArray = [];
    for(var i = 0;i<array.length;i++){
        newArray.push({index: i,color: '#3bcc40'})
        drawChart(array,newArray)
        await sleep(0)
    }
}