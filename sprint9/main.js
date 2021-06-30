console.log("main js is called")

// receives the parameters from control object
var C = new ControlObject(400,20,360,550);
//var Spin = new SpinEllipse(450,100,200,100,colArray[0][4])
//var D = new Dot(20,colArray[0][4]);
//var St = new Star(450,100, 50, 10, colArray[0][4]);
//var S = new Swatch(100,250,50,50,colArray[0][0],colArray[0][2],colArray[0][4],colArray[0][4]);
//var S2 = new Swatch(100,300,50,50,colArray[0][0],colArray[0][3],colArray[0][4],colArray[0][4]);

// list that contains the core shapes that have a new button each
var button_name_list = ["Rectangle", "Ellipse", "Spinning Ellipse", "Polygon", "Star", "Brush"]
var button_list = []
// x and y variables for the different buttons and sub-button sets on the canvas, outside of drawing page
var x = 30;
var y = 30;
var w = 150;
var h = 50;
var xG = 60;
var yG = 370;
var wS = 35;
var hS = 35;
var xOp = 190;
var yOp = 190;
var wOp = 30;
var hOp = 30;
var xOp2 = 190;
var yOp2 = 240;
var wOp2 = 30;
var hOp2 = 30;
var xU = 50;
var yU = 500;
var xB = 210; 
var yB = 305;
r = 15;

// creating a new button for every type of shape in the core button list
for (var i=0; i<button_name_list.length; i++){
    button_list.push(new Button(x,y+i*h,w,h,button_name_list[i],colArray[0][0],colArray[0][1],colArray[0][2]))
}

// circle subbuttons for width of brush stroke
var brushstroke_name_list = ["L", "M", "S"]
var brushstroke_list = []
var r_list = [20,15,10]
// pushes a new subbutton with a different sized radius, for each value of brush stroke width eg. Large,Medium,Small
for (var i=0; i<brushstroke_name_list.length; i++){
    var temp = new CircleButton(xB+3*(i*r),yB,r_list[i],brushstroke_name_list[i],colArray[0][0],colArray[0][1],colArray[0][2], colArray[0][3])
    brushstroke_list.push(temp);
    
    // sets a default subbutton for brush stroke width, appears 'selected' from the beginning
    if(i == 0){
       brushstroke_list[0].setClicked();
    }
}

 //buttons for clear and undo
 var clear_undo_name_list = ["Clear", "Undo"]
 var clear_undo_list = []
 // loop pushes new button for both and undo
 for (var i=0; i<clear_undo_name_list.length; i++){
     clear_undo_list.push(new Button(xU+i*w,yU,w,h,clear_undo_name_list[i],colArray[0][0],colArray[0][1],colArray[0][2]))
 }

// subbuttons for number of polygon side lengths
var option_name_list = ["4", "5", "6", "7", "8"]
var option_list = []
 // loop pushes new button for the different polygon/number of side length options
for (var i=0; i<option_name_list.length; i++){
    option_list.push(new OptionGroup(xOp+i*wOp,yOp,wOp,hOp,option_name_list[i],colArray[0][0],colArray[0][1],colArray[0][2]))
    // sets a default subbutton for number of polygon sides, appears 'selected' from the beginning
    if(i==0){
        option_list[0].setClicked();
    }
    
}

// subbuttons for number of points in a star
var option_name_list2 = ["4","5","10","20"]
var option_list2 = []
// loop pushes new button for the different number of star points options
for (var i=0; i<option_name_list2.length; i++){
    option_list2.push(new OptionGroup2(xOp2+i*wOp2,yOp2,wOp2,hOp2,option_name_list2[i],colArray[0][0],colArray[0][1],colArray[0][2]))
    // sets a default subbutton for number of points, appears 'selected' from the beginning
    if(i==0){
        option_list2[0].setClicked();
    }
}

// empty the swatch list
var swatch_list = []

//running through the colArray and creating a new swatch for each
for (i=0; i<colArray.length; i++){
    for (j=0; j<colArray[i].length; j++){
        temp = new Swatch(xG+j*wS, yG+i*hS,wS,hS,colArray[0][0],colArray[i][j],colArray[0][4],colArray[0][4])
        swatch_list.push(temp);
    }
    
}

// receives the parameters from rectangle class
// animate function where all of the things (buttons, drawing page/control object etc.) are instantiated
function animate(){
    ctx.clearRect(0,0,width,height);
    // calls control object to be instantiated so drawing page appears on the canvas
    C.update();
    // instantiates all the buttons
    // loop through all of the button lists and creates a new button/swatch for each
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

// calls the animate function
animate();

