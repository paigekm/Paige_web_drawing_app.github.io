console.log("main js is called")
// receives the parameters from control object
var C = new ControlObject();
// receives the parameters from rectangle class
function animate(){
    ctx.clearRect(0,0,width,height);
    C.update();
    window.requestAnimationFrame(animate);
}

animate();