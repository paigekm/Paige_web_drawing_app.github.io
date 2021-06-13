console.log("main js is called")

// receives the parameters from control object
var C = new ControlObject(400,20,360,550);
//var S = new Swatch(100,250,50,50,colArray[0][0],colArray[0][2],colArray[0][4],colArray[0][4]);
//var S2 = new Swatch(100,300,50,50,colArray[0][0],colArray[0][3],colArray[0][4],colArray[0][4]);

var button_name_list = ["Rectangle", "Ellipse"]
var button_list = []
var x = 100;
var y = 100;
var w = 200;
var h = 50;
var xG = 50;
var yG = 350;
var wS = 35;
var hS = 35;


for (var i=0; i<button_name_list.length; i++){
    button_list.push(new Button(x,y+i*h,w,h,button_name_list[i],colArray[0][0],colArray[0][1],colArray[0][2]))
}


// empty the swatch list
var swatch_list = []

//running through the colArray and creating a new swatch for each
for (i=0; i<colArray.length; i++){
    //console.log(colArray=[i])
    for (j=0; j<colArray[i].length; j++){
        temp = new Swatch(xG+j*wS, yG+i*hS,wS,hS,colArray[0][0],colArray[i][j],colArray[0][4],colArray[0][4])
        swatch_list.push(temp);
    }
    
}

// var E = new Ellipse(0,0,300, 150 , "rgb(200,0,0)")
// receives the parameters from rectangle class
function animate(){
    ctx.clearRect(0,0,width,height);
    C.update();
    for (var i=0; i<button_list.length; i++){
        button_list[i].update();
    }

    for(i=0; i<swatch_list.length; i++){
        swatch_list[i].update();
    }

    window.requestAnimationFrame(animate);
}

animate();

