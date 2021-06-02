console.log("main js is called")
// receives the parameters from control object
var C = new ControlObject(400,20,360,550);

var button_name_list = ["Rectangle", "Ellipse"]
var button_list = []
var x = 100;
var y = 100;
var w = 200;
var h = 50;
for (var i=0; i<button_name_list.length; i++){
    button_list.push(new Button(x,y+i*h,w,h,button_name_list[i],colArray[0][0],colArray[0][1],colArray[0][2]))
}
var E = new Ellipse(0,0,300, 150 , "rgb(200,0,0)")
// receives the parameters from rectangle class
function animate(){
    ctx.clearRect(0,0,width,height);
    C.update();
    for (var i=0; i<button_list.length; i++){
        button_list[i].update();
    }
// play area ------
/*
ctx.beginPath();
ctx.ellipse(400,300,300, 150 ,0, 0, 2*Math.PI);
ctx.fill();
*/
// E.update()
// -------------


    window.requestAnimationFrame(animate);
}

animate();