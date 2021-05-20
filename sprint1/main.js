console.log("main js is called")
// receives the parameters from control object
// calls the canvas
var C = new ControlObject();
function animate(){
    // clears canvas at the start
    ctx.clearRect(0,0,width,height);
    // updating with everything that happens in the control object
    C.update();
    window.requestAnimationFrame(animate);
}

// calls the animate function
// animate function is needed because we are dragging etc.
animate();