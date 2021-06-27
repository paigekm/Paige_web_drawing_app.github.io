console.log("main js is called")

// receives the parameters from control object
var C = new ControlObject(400,20,360,550);
//var D = new Dot(20,colArray[0][4]);
//var St = new Star(450,100, 50, 10, colArray[0][4]);
//var S = new Swatch(100,250,50,50,colArray[0][0],colArray[0][2],colArray[0][4],colArray[0][4]);
//var S2 = new Swatch(100,300,50,50,colArray[0][0],colArray[0][3],colArray[0][4],colArray[0][4]);

// list that contains the core shapes that have a new button each
var button_name_list = ["Rectangle", "Ellipse", "Polygon", "Star", "Brush"]
var button_list = []
// x and y variables for the different buttons and sub-button sets on the canvas, outside of drawing page
var x = 100;
var y = 80;
var w = 150;
var h = 50;
var xG = 50;
var yG = 350;
var wS = 35;
var hS = 35;
var xOp = 270;
var yOp = 200;
var wOp = 20;
var hOp = 20;
var xOp2 = 270;
var yOp2 = 250;
var wOp2 = 20;
var hOp2 = 20;
var xU = 50;
var yU = 500;
var xB = 270; 
var yB = 300;
var r = 15;

// creating a new button for every type of shape in the core button list
for (var i=0; i<button_name_list.length; i++){
    button_list.push(new Button(x,y+i*h,w,h,button_name_list[i],colArray[0][0],colArray[0][1],colArray[0][2]))
}

// circle buttons for brush stroke
var brushstroke_name_list = ["L", "M", "S"]
var brushstroke_list = []
for (var i=0; i<brushstroke_name_list.length; i++){
    var temp = new CircleButton(xB+3*(i*r),yB,r,brushstroke_name_list[i],colArray[0][0],colArray[0][1],colArray[0][2], colArray[0][3])
    brushstroke_list.push(temp);
    if(i==0){
        temp.setClicked();
    }
}

 //buttons for clear and undo
 var clear_undo_name_list = ["Clear", "Undo"]
 var clear_undo_list = []
 for (var i=0; i<clear_undo_name_list.length; i++){
     clear_undo_list.push(new Button(xU+i*w,yU,w,h,clear_undo_name_list[i],colArray[0][0],colArray[0][1],colArray[0][2]))
 }

// subbuttons for number of polygon side lengths
var option_name_list = ["4", "5", "6"]
var option_list = []
for (var i=0; i<option_name_list.length; i++){
    option_list.push(new OptionGroup(xOp+i*wOp,yOp,wOp,hOp,option_name_list[i],colArray[0][0],colArray[0][1],colArray[0][2]))
    if(i==0){
        option_list[0].setClickedPoly();
    }
}

// subbuttons for number of points in a star
var option_name_list2 = ["5", "6", "20"]
var option_list2 = []
for (var i=0; i<option_name_list2.length; i++){
    option_list2.push(new OptionGroup2(xOp2+i*wOp2,yOp2,wOp2,hOp2,option_name_list2[i],colArray[0][0],colArray[0][1],colArray[0][2]))
    if(i==0){
        option_list2[0].setClickedStar();
    }
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
   // D.update();
    for (var i=0; i<button_list.length; i++){
        button_list[i].update();
    }

    for(i=0; i<swatch_list.length; i++){
        swatch_list[i].update();
    }

    for(i=0; i<option_list.length; i++){
        option_list[i].update();
    }

    for(i=0; i<option_list2.length; i++){
        option_list2[i].update();
    }
    for(i=0; i<clear_undo_list.length; i++){
        clear_undo_list[i].update();
    }
    for(i=0; i<brushstroke_list.length; i++){
        brushstroke_list[i].update();
    }
    
   


    window.requestAnimationFrame(animate);
}

animate();

