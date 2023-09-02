let canvas=document.querySelector('canvas');
let pencilWidth=document.querySelector('.pencil-width')
let colorContainer=document.querySelector('.pencil-color-cont');
let eraserWidth=document.querySelector('.eraser-width');
let blackColor=document.querySelector('.black');
let redColor=document.querySelector('.red');
let blueColor=document.querySelector('.blue');
let redo=document.getElementById('redo');
let undo=document.getElementById('undo');
let download=document.getElementById('download');
let upload=document.getElementById('upload');
let undoRedoCache=[canvas.toDataURL()];
let currentUrlIndex=0;
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
console.log(canvas);

let penTools=canvas.getContext('2d');
penTools.lineWidth=3;


let isMouseDown=false;
canvas.addEventListener('mousedown',(e)=>{
isMouseDown=true;
console.log(e);
let x=e.clientX+3;
let y=e.clientY-100;
penTools.beginPath();
penTools.moveTo(x,y);
})
canvas.addEventListener('mousemove',(e)=>{
    if(isMouseDown){
        penTools.lineTo(e.clientX+3,e.clientY-100);
        penTools.stroke();
    }
})
canvas.addEventListener('mouseup',()=>{
    isMouseDown=false;
})
pencilWidth.addEventListener('input',()=>{
    penTools.lineWidth=pencilWidth.value;
})
pencil.addEventListener('click',()=>{
    // isPencilOpen=true;
    // isEraserOpen=false;
    penTools.strokeStyle="black";
    penTools.lineWidth=3;

})

eraser.addEventListener('click',()=>{
//    isEraserOpen=true;
//    isPencilOpen=false;
    penTools.strokeStyle="white";
})
eraserWidth.addEventListener('input',()=>{
    penTools.lineWidth=eraserWidth.value;
})
blackColor.addEventListener('click',()=>{
    penTools.strokeStyle='black';
})
redColor.addEventListener('click',()=>{
    penTools.strokeStyle='red';
})
blueColor.addEventListener('click',()=>{
    penTools.strokeStyle='blue';
})
canvas.addEventListener('mouseup',(e)=>{
    isMouseDown=false;
    //convert my canvas to url
    let url=canvas.toDataURL();
    undoRedoCache.push(url);
    currentUrlIndex=undoRedoCache.length-1;
})
undo.addEventListener('click',()=>{
    if(currentUrlIndex>0){
        currentUrlIndex--;
    }
    renderUrlOnCanvas(undoRedoCache[currentUrlIndex]);
})
redo.addEventListener('click',()=>{
    if(currentUrlIndex<undoRedoCache.length-1){
        currentUrlIndex++;
    }
    renderUrlOnCanvas(undoRedoCache[currentUrlIndex]);
})
function renderUrlOnCanvas(url){
    let img=new Image;
    img.src=url;
    img.onload = (e) => {
        penTools.clearRect(0, 0, canvas.width, canvas.height);
        penTools.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}
download.addEventListener('click',()=>{
    const url=canvas.toDataURL();
    let a=document.createElement('a');
    a.href=url;
    a.download="canvas.jpg";
    a.click();
})
upload.addEventListener('click',()=>{
    let inputFile=document.createElement('input');
    inputFile.setAttribute('type','file');
    //it will act as clicked...
    inputFile.click();    
    inputFile.addEventListener('change',(event)=>{
    let file=inputFile.files[0];
    let url=URL.createObjectURL(file);
    renderUrlOnCanvas(url);
   })
})
