var currentSortID = 0;
document.querySelector('form').reset()

document.querySelector("#menu_icon").addEventListener("click",()=>{
    var main = document.querySelector("#main_left")
    main.classList.toggle('show')
})

var list = document.querySelector('#left_panel').querySelectorAll('li');
list.forEach((e)=>{
    e.addEventListener("click",()=>{
        var title = document.querySelector('#alg_title') 
        title.innerHTML = e.querySelector('.alg_name').textContent
        title.animate([
                { opacity: '0' },
                { opacity: '1' }
              ], {
                duration: 400,
              })
        for(var i=0;i<list.length;i++){
            if(list[i] == e){
                currentSortID = i;
                break;
            }
        }
    })
})
document.querySelector("#submit").addEventListener("click",(e)=>{
    e.preventDefault()
    if(document.getElementById('radio1').checked){
        var length = document.querySelector("#length").value
        var range = document.querySelector('#range').value
        var err_range = document.querySelector('#err_range')
        var err_length = document.querySelector('#err_length')
        if(parseInt(length) && length>0){
            err_length.innerHTML = ''
            if(parseInt(range)){
                err_range.innerHTML = ''
                let array = randomArray(length,range)
                if(document.querySelector("#sorted").checked){
                    array = array.sort((a,b)=>{return a-b})
                }
                else if(document.querySelector('#reverse_sorted').checked){
                    array = array.sort((a,b)=>{return b-a})
                }
                startSort(currentSortID,array)
            }
            else{
                err_range.innerHTML = "Wrong range value<br>"
            }
        }
        else{
            err_length.innerHTML = "Wrong length value<br>"
        }
    }
    else{
        var err_array = document.querySelector("#err_custom")
        var array = document.querySelector("#custom").value.split(',')
        try{
            for(var i=0;i<array.length;i++){
                if(!parseInt(array[i])){
                    throw "Incorrect custom array value";
                }
                else{
                    array[i] = parseInt(array[i])
                }
            }
            err_array.innerHTML = ''
            startSort(currentSortID,array)
        }
        catch(e){
            err_array.innerHTML = e+"<br>"
        }
    }
})

document.querySelector("#radio1").addEventListener("click",()=>{
    var r = document.querySelector('#radio2')
    if(r.checked){
        r.checked = false
        document.querySelector("#length").disabled = false;
        document.querySelector("#range").disabled = false;
        document.querySelector('#custom').disabled = true;
    }
})
document.querySelector("#radio2").addEventListener("click",()=>{
    var r = document.querySelector('#radio1')
    if(r.checked){
        r.checked = false
        document.querySelector("#length").disabled = true;
        document.querySelector("#range").disabled = true;
        document.querySelector('#custom').disabled = false;
    }
})
document.querySelector("#sorted").addEventListener("click",()=>{
    if(document.querySelector('#sorted').checked){
        document.querySelector('#reverse_sorted').checked = false;
    }
})
document.querySelector("#reverse_sorted").addEventListener("click",()=>{
    if(document.querySelector('#reverse_sorted').checked){
        document.querySelector('#sorted').checked = false;
    }
})
var range = document.querySelector('#range_input')
range.addEventListener("mouseup",()=>{
    animationDelay = range.value*10
})