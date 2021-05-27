console.log("main js is called")
// receives the parameters from control object
var C = new ControlObject(400,20,360,550);
// receives the parameters from rectangle class
function animate(){
    ctx.clearRect(0,0,width,height);
    C.update();
    window.requestAnimationFrame(animate);
}

animate();