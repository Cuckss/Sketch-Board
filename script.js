let toolsContainer=document.querySelector('.tool-container');
let pencil=document.getElementById('pencil');
let eraser=document.getElementById('eraser');
let pencilToolsCont=document.querySelector('.pencil-tool-cont');
let eraserToolsCont=document.querySelector('.eraser-tool-cont');
let stickyNotes=document.getElementById('sticky-note');
//conditional variables...
let isPencilOpen=false;
let isEraserOpen=false;

pencil.addEventListener('click',()=>{
    if(isPencilOpen===false){
        pencilToolsCont.style.display='block';
        eraserToolsCont.style.display='none';
        isEraserOpen=false;

        isPencilOpen=true;
    }else{
        pencilToolsCont.style.display='none';
        isPencilOpen=false;
    }
})


eraser.addEventListener('click',()=>{
    if(isEraserOpen===false){
        eraserToolsCont.style.display='block';
        pencilToolsCont.style.display='none';
        isPencilOpen=false;
        isEraserOpen=true;
    }else{
        eraserToolsCont.style.display='none';
        isEraserOpen=false;
    }
})

stickyNotes.addEventListener('click',()=>{
    
    
    stickyElement=`
   
        <div class="header-cont">
            <div class="minimise"></div>
            <div class="remove"></div>
        </div>
        <div class="notes-cont">
            <textarea></textarea>
        </div>
    
    `
    const stickyContainer=document.createElement('div');
    stickyContainer.setAttribute('class','sticky-cont');
    stickyContainer.innerHTML=stickyElement
    document.body.append(stickyContainer);
    let minimise=stickyContainer.querySelector('.minimise');
    let remove=stickyContainer.querySelector('.remove');
    remove.addEventListener('click',()=>{
        stickyContainer.remove();
    })
    minimise.addEventListener('click',()=>{
     let noteCont=stickyContainer.querySelector('.notes-cont');
     if(noteCont.style.display==='none'){
        noteCont.style.display='block';
     }else{
        noteCont.style.display='none';
     }
     
    })
    stickyContainer.onmousedown = function(event) {
        // needs to be discussed
        let shiftX= event.clientX-stickyContainer.getBoundingClientRect().left;
        let shiftY= event.clientY-stickyContainer.getBoundingClientRect().top;
        // (1) prepare to moving: make absolute and on top by z-index
        stickyContainer.style.position = 'absolute';
        stickyContainer.style.zIndex = 1000;
      
        // move it out of any current parents directly into body
        // to make it positioned relative to the body
      
        // centers the ball at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
            stickyContainer.style.left = pageX -shiftX + 'px';
            stickyContainer.style.top = pageY - shiftY + 'px';
        }
      
        // move our absolutely positioned ball under the pointer
        moveAt(event.pageX, event.pageY);
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // (2) move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // (3) drop the ball, remove unneeded handlers
        stickyContainer.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          stickyContainer.onmouseup = null;
        };
      
      };

      stickyContainer.dragstart=function(){
        return false;
      }
})