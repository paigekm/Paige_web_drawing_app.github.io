console.log("outofdrawingpage js called")
// contains of all the classes/functions for things which are outside of the drawing page
// all buttons, subbuttons, colour swatches etc.

// class to create a new button
class Button{
    // passes the parameters for the button through
    // x and y define the starting position on the canvas of the top left corner of the button box
    // w and h define the width and height of the button box
    // text defines the name of the button printed on it
    // c_1, c_2, c_3, c_4 define the colours of the button border and box dependent on whether the box is hovering over, selected, or unselected
    constructor(x,y,w,h,text,c_1,c_2,c_3,c_4){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.outline = c_1;
        this.fill = c_2;
        this.over = c_3;
        this.selected = c_4;
        // event listeners
        canvas.addEventListener('click',this.mClick.bind(this));
        canvas.addEventListener('mousemove',this.mMove.bind(this));

        // sets the mouse coordinates to 0 and out of button bounds to begin with
        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
    }

    // when the button is clicked on, it visually changes colour/border width to reflect it's change in state
    mClick(e){
        if(this.inBounds){
            Button.clicked = this;
            Button.shape = this.text;
        }

    }

    // when the mouse moves, the new x and y variables of it's position is updated
    // checks that the mouse is still within the boundaries of the button
    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);
    }

    // returns true or false of whether the mouse position is inside the boundaries of the button
    inBoundsCheck(xM,yM,x,y,w,h){
        if(xM > x && xM < x+w && yM > y && yM < y+h){
            return true;
        }else{
            return false;
        }
    }

    // update function calls draw
    update(){
        this.draw();
    }
    
    // creates the rectangle which appears like a button 
    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);

        // if the mouse position is inside the button, and clicked down
        // the button visually changes colour/border width to reflect it's change in state to be 'selected'
        if(this.inBounds || Button.clicked == this){
            ctx.lineWidth = 4;
            ctx.fillStyle = this.over;
            ctx.fill();
            // set fill for text
            ctx.fillStyle = this.fill;
        } else{
            ctx.fillStyle = this.fill;
            ctx.fill();
            // set fill for text
            ctx.fillStyle = this.outline;
        }
        ctx.stroke();

        ctx.fillStyle = this.outline;
        // formats the text (font, sizing etc.) on each button
        var myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        // prints the text on each new button
        ctx.fillText(this.text,this.x+this.w/2,this.y+this.h/2);
    }

}
// static variables to pass whether the button is selected or not, and which type of button has been selected
Button.clicked = ""
Button.shape = ""


// class for circle buttons
// used for stroke size of brush
class CircleButton{
    // passes the parameters for the circle button through
    // x and y define the starting position on the canvas of the centre point of the circle button
    // r defines the radius of the circle button
    // text defines the name of the circle button printed on it
    // c_1, c_2, c_3, c_4 define the colours of the button border and circle dependent on whether the mouse is hovering over, selected, or unselected the button
    constructor(x,y,r,text,c_1,c_2,c_3,c_4){
        this.x = x;
        this.y = y;
        this.r = r;
        this.text = text;
        this.outline = c_1;
        this.fill = c_2;
        this.over = c_3;
        this.selected = c_4;
        // event listeners
        canvas.addEventListener('click',this.mClick.bind(this));
        canvas.addEventListener('mousemove',this.mMove.bind(this));

        // sets the mouse coordinates to 0 and out of circle button bounds to begin with
        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
    }

    // when the mouse is pressed down
    mClick(e){
        if(this.inBounds){
            CircleButton.clicked = this;
            CircleButton.shape = this.text;
        }

    }

    // when the mouse moves locations on the canvas
    mMove(e){
        // updates mouse x and y variables with those of the new position
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        // calls inbounds check to see if mouse is inside the circle button
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.r);
    }

    // inBoundsCheck for a circle
    // pythagorus distance check
    // @ param x,y, positions of the mouse and of the dot circle and radius of the dot circle (number)
    // @ return boolean
    inBoundsCheck(xM,yM,x,y,r){
        var d = Math.sqrt(Math.pow(xM-x, 2) + Math.pow(yM-y,2));
        if(d<r){
            return true;
        }else{
            return false;
        }
    }

    // update function calls draw function
    update(){
        this.draw();
    }
    
    // creates the circle button
    draw(){
        // sets original circle button appearance
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        // prints an ellipse to make the button appear circular
        ctx.ellipse(this.x,this.y,Math.abs(this.r), Math.abs(this.r),0,0,2*Math.PI);

        // the button visually changes colour/border width to reflect it's change in state to be 'selected' or not
        if(this.inBounds || CircleButton.clicked == this){
            ctx.lineWidth = 3;
            ctx.fillStyle = this.over;
            ctx.fill();
            // set fill for text
            ctx.fillStyle = this.fill;
        } else{
            ctx.fillStyle = this.fill;
            ctx.fill();
            // set fill for text
            ctx.fillStyle = this.outline;
        }
        ctx.stroke();

        // formats the text (font, sizing etc.) on each button
        ctx.fillStyle = this.outline;
        var myFont = "15px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        // prints text L,M,S etc. on each of the buttons
        ctx.fillText(this.text,this.x,this.y);
    }

    // function to set a default circle button 
    // this is called in other parts of the program and reflects that one subbutton always has to be selected
    setClicked(){
        CircleButton.clicked = this;
        CircleButton.shape = this.text;
    }
  

}
// static variables for if the button is selected, and for the type of object (brush) that has been selected
CircleButton.clicked = ""
CircleButton.shape = ""


// class for swatch, this gives a grid of colour option 'swatches' for the user to select when drawing shapes
class Swatch{
    // passes the parameters for the swatch through
    // x and y define the starting position on the canvas of the top left corner of the swatch box
    // w and h define the width and height of the swatch box
    // c_1, c_2, c_3, c_4 define the colours of the swatch border and fill colour dependent on whether the mouse is hovering over, selected, or unselected the swatch
    constructor(x,y,w,h,c_1,c_2,c_3,c_4){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.outline = c_1;
        this.fill = c_2;
        this.over = c_3;
        this.selected = c_4;
        // event listeners
        canvas.addEventListener('click',this.mClick.bind(this));
        canvas.addEventListener('mousemove',this.mMove.bind(this));

        // sets the mouse coordinates to 0 and out of button bounds to begin with
        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;

        this.stroke_outline = 1;
    }

    // when the swatch is clicked on, it will associate that colour with the shape next drawn, and until another swatch is clicked on
    mClick(e){
        var Swatchcolour = this.fill;
        if(this.inBounds){
            Swatch.clicked = this;
            // sets the colour of the shape to be drawn, to be that of the swatch
            Swatch.selected = Swatchcolour;
        
        }

    }

    // when the mouse moves, the new x and y variables of it's position is updated
    // checks that the mouse is still within the boundaries of the swatch
    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);

    }

    // returns true or false of whether the mouse position is inside the boundaries of the swatch
    inBoundsCheck(xM,yM,x,y,w,h){
        if(xM > x && xM < x+w && yM > y && yM < y+h){
            return true;
        }else{
            return false;
        }
    }

    // creates the sqaure which appears like a swatch on the canvas
    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = this.stroke_outline;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.stroke();
        ctx.fill();

    }

     // update function calls draw
     // changes the border width of the swatch to reflect it's change in state to being 'selected'
    update(){
        this.draw();
        if(this.inBounds == true || Swatch.clicked == this){
            this.stroke_outline = 3;
        }else{
            this.stroke_outline = 1;
        }
    }
    
}
// static variables to pass whether the swatch is selected or not, and which colour swatch has been selected
Swatch.clicked = ""
Swatch.selected = ""


// function to create a set of sub-buttons for polgyon number of side lengths
class OptionGroup{
    // passes the parameters for the sidelength subbuttons through
    // x and y define the starting position on the canvas of the top left corner of the polygon sub button
    // w and h define the width and height of the sub button boxes
    // text defines the number of the sub button printed on it, reflecting number of sides for the polygon
    // c_1, c_2, c_3, c_4 define the colours of the button border and inner fill dependent on whether the mouse is hovering over, selected, or unselected the button
    constructor(x,y,w,h,text,c_1,c_2,c_3,c_4){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.outline = c_1;
        this.fill = c_2;
        this.over = c_3;
        this.selected = c_4;
        // event listeners
        canvas.addEventListener('click',this.mClick.bind(this));
        canvas.addEventListener('mousemove',this.mMove.bind(this));

        // sets the mouse coordinates to 0 and out of subbutton bounds to begin with
        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
    }

        // when the button is clicked on, stores the info that button has been clicked and which type of hexagon to draw until another button is selected
        mClick(e){
            if(this.inBounds){
                OptionGroup.clicked = this;
                OptionGroup.value = this.text;
        }

    }

    // when the mouse moves, the new x and y variables of it's position is updated
    // checks that the mouse is still within the boundaries of the subbuttons
    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);
    }

    // returns true or false of whether the mouse position is inside the boundaries of the subbuttons
    inBoundsCheck(xM,yM,x,y,w,h){
        if(xM > x && xM < x+w && yM > y && yM < y+h){
            return true;
        }else{
            return false;
        }
    }

    // update function calls draw
    update(){
        this.draw();
    }
    
    // creates the squares which appear like sub buttons on the canvas
    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);

        ctx.font = "15px Arial";
        ctx.fillStyle = this.outline;
        // prints a heading to explain what the sub-buttons do
        ctx.fillText("POLYGON : # of sides:", 270, 182);

        // the subbutton visually changes colour/border width to reflect it's change in state to be 'selected' or not
        if(this.inBounds || OptionGroup.clicked == this){
            ctx.lineWidth = 4;
            ctx.fillStyle = this.over;
            ctx.fill();
            // set fill for text
            ctx.fillStyle = this.fill;
        } else{
            ctx.fillStyle = this.fill;
            ctx.fill();
            // set fill for text
            ctx.fillStyle = this.outline;
        }
        ctx.stroke();


        // formats the text (font, sizing etc.) on each subbutton
        ctx.fillStyle = this.outline;
        var myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(this.text,this.x+this.w/2,this.y+this.h/2);
    }

    // function to set a default sub button for hexagon number of side lengths
    // this is called in other parts of the program and reflects that one subbutton always has to be selected
    setClicked(){
        OptionGroup.clicked = this;
        OptionGroup.value = this.text;
        
    }
    
}
// static variables to pass whether the subbutton is selected or not, and which button has been selected eg. how many side lengths the hexagon to be drawn should have
OptionGroup.clicked = ""
OptionGroup.value = 5



// function to create a set of sub-buttons for star number of points
class OptionGroup2{
    // passes the parameters for the number of points subbuttons through
    // x and y define the starting position on the canvas of the top left corner of the star sub button
    // w and h define the width and height of the sub button boxes
    // text defines the number of the sub button printed on it, reflecting number of points for the star
    // c_1, c_2, c_3, c_4 define the colours of the button border and inner fill dependent on whether the mouse is hovering over, selected, or unselected the button
    constructor(x,y,w,h,text,c_1,c_2,c_3,c_4){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.outline = c_1;
        this.fill = c_2;
        this.over = c_3;
        this.selected = c_4;
        // event listeners
        canvas.addEventListener('click',this.mClick.bind(this));
        canvas.addEventListener('mousemove',this.mMove.bind(this));

        // sets the mouse coordinates to 0 and out of subbutton bounds to begin with
        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
    }
    // when the button is clicked on, stores the info that button has been clicked and which type of pointed star to draw until another button is selected
    mClick(e){
        if(this.inBounds){
            OptionGroup2.clicked = this;
            OptionGroup2.value = this.text;
        }

    }

    // when the mouse moves, the new x and y variables of it's position is updated
    // checks that the mouse is still within the boundaries of the subbuttons
    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);
    }

    // returns true or false of whether the mouse position is inside the boundaries of the subbuttons
    inBoundsCheck(xM,yM,x,y,w,h){
        if(xM > x && xM < x+w && yM > y && yM < y+h){
            return true;
        }else{
            return false;
        }
    }

    // update function calls draw
    update(){
        this.draw();
    }
    
    // creates the squares which appear like sub buttons on the canvas
    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);

        ctx.font = "15px Arial";
        ctx.fillStyle = this.outline;
        // prints a heading to explain what the sub-buttons do
        ctx.fillText("STAR : # of points:", 255, 232);

        // the subbutton visually changes colour/border width to reflect it's change in state to be 'selected' or not
        if(this.inBounds || OptionGroup2.clicked == this){
            ctx.lineWidth = 4;
            ctx.fillStyle = this.over;
            ctx.fill();
            // set fill for text
            ctx.fillStyle = this.fill;
        } else{
            ctx.fillStyle = this.fill;
            ctx.fill();
            // set fill for text
            ctx.fillStyle = this.outline;
        }
        ctx.stroke();

        // formats the text (font, sizing etc.) on each subbutton
        ctx.fillStyle = this.outline;
        var myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(this.text,this.x+this.w/2,this.y+this.h/2);
    }

    // function to set a default sub button for star number of points
    // this is called in other parts of the program and reflects that one subbutton always has to be selected
    setClicked(){
        OptionGroup2.clicked = this;
        OptionGroup2.value = this.text;
        
    }
   
}
// static variables to pass whether the subbutton is selected or not, and which button has been selected eg. how many point the star to be drawn should have
// these are updated in other places in the program too
OptionGroup2.clicked = ""
OptionGroup2.value = 5
