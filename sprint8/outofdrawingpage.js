console.log("outofdrawingpage js called")

// class to create a new button
class Button{
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
        canvas.addEventListener('click',this.mClick.bind(this));
        canvas.addEventListener('mousemove',this.mMove.bind(this));


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
    // checks that the mouse is still within the boundaries of the drawing page
    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log(this.xMouse);
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);
        //console.log(this.inBounds);
    }

    // returns true or false of whether the mouse position is inside the boundaries of drawing page
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
    
    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);

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
        var myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(this.text,this.x+this.w/2,this.y+this.h/2);
    }

}
Button.clicked = ""
Button.shape = ""


// class for circle buttons
// used for stroke size of brush

class CircleButton{
    constructor(x,y,r,text,c_1,c_2,c_3,c_4){
        this.x = x;
        this.y = y;
        this.r = r;
        this.text = text;
        this.outline = c_1;
        this.fill = c_2;
        this.over = c_3;
        this.selected = c_4;
        canvas.addEventListener('click',this.mClick.bind(this));
        canvas.addEventListener('mousemove',this.mMove.bind(this));


        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
        this.stroke_outline = 1;
    }

    mClick(e){
        if(this.inBounds){
            CircleButton.clicked = this;
            CircleButton.shape = this.text;
            // deselect all of the square buttons first
            //CircleButton.selected = "";
        }

    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log(this.xMouse);
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.r);
        if(this.inBounds == true || CircleButton.clicked == this){
            this.stroke_outline = 2
        }else{
            this.stroke_outline = 1
        }

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

    update(){
        this.draw();
    }
    
    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.ellipse(this.x,this.y,Math.abs(this.r), Math.abs(this.r),0,0,2*Math.PI);

        if(this.inBounds || CircleButton.clicked == this){
            ctx.lineWidth = 2;
            ctx.fillStyle = this.over;
            ctx.fill();
            // set fill for text
            ctx.fillStyle = this.fill;
        } else{
            ctx.fillStyle = this.fill;
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fill();
            // set fill for text
            ctx.fillStyle = this.outline;
        }
        ctx.stroke();


        ctx.fillStyle = this.outline;
        var myFont = "20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(this.text,this.x,this.y);
    }

    setClicked(){
        CircleButton.clicked = this;
        CircleButton.shape = this.text;
        
    }

}
CircleButton.clicked = ""
CircleButton.shape = ""


// class for swatch
class Swatch{
    constructor(x,y,w,h,c_1,c_2,c_3,c_4){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.outline = c_1;
        this.fill = c_2;
        this.over = c_3;
        this.selected = c_4;
        /*
        console.log(c_1);
        console.log(c_2);
        console.log(c_3);
        console.log(c_4);
        */
        canvas.addEventListener('click',this.mClick.bind(this));
        canvas.addEventListener('mousemove',this.mMove.bind(this));


        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;

        this.stroke_outline = 1;
    }

    mClick(e){
        var Swatchcolour = this.fill;
        if(this.inBounds){
            console.log("am in the swatch")
            Swatch.clicked = this;
            
            Swatch.selected = Swatchcolour;
        
        }

    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log(this.xMouse);
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);
        //console.log(this.inBounds);

    }

    inBoundsCheck(xM,yM,x,y,w,h){
        if(xM > x && xM < x+w && yM > y && yM < y+h){
            return true;
        }else{
            return false;
        }
    }

    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = this.stroke_outline;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.stroke();
        ctx.fill();

    }

    update(){
        this.draw();
        if(this.inBounds == true || Swatch.clicked == this){
            this.stroke_outline = 3;
        }else{
            this.stroke_outline = 1;
        }
    }
    
}
Swatch.clicked = ""
//Swatch.colour = ""
Swatch.selected = ""



class OptionGroup{
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
        canvas.addEventListener('click',this.mClick.bind(this));
        canvas.addEventListener('mousemove',this.mMove.bind(this));


        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
    }

    mClick(e){
        if(this.inBounds){
            OptionGroup.clicked = this;
            OptionGroup.value = this.text;
        }

    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log(this.xMouse);
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);
        //console.log(this.inBounds);
    }

    inBoundsCheck(xM,yM,x,y,w,h){
        if(xM > x && xM < x+w && yM > y && yM < y+h){
            return true;
        }else{
            return false;
        }
    }

    update(){
        this.draw();
    }
    
    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);

        ctx.font = "15px Arial";
        ctx.fillStyle = this.outline;
        ctx.fillText("# of sides:", 300, 190);

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


        ctx.fillStyle = this.outline;
        var myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(this.text,this.x+this.w/2,this.y+this.h/2);
    }

    setClickedPoly(){
        OptionGroup.clicked = this;
        OptionGroup.value = this.text;
        
    }
}
OptionGroup.clicked = ""
OptionGroup.value = 5

class OptionGroup2{
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
        canvas.addEventListener('click',this.mClick.bind(this));
        canvas.addEventListener('mousemove',this.mMove.bind(this));


        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
    }

    mClick(e){
        if(this.inBounds){
            OptionGroup2.clicked = this;
            OptionGroup2.value = this.text;
        }

    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log(this.xMouse);
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);
        //console.log(this.inBounds);
    }

    inBoundsCheck(xM,yM,x,y,w,h){
        if(xM > x && xM < x+w && yM > y && yM < y+h){
            return true;
        }else{
            return false;
        }
    }

    update(){
        this.draw();
    }
    
    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);

        ctx.font = "15px Arial";
        ctx.fillStyle = this.outline;
        ctx.fillText("# of points:", 300, 238);

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


        ctx.fillStyle = this.outline;
        var myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(this.text,this.x+this.w/2,this.y+this.h/2);
    }
    setClickedStar(){
        OptionGroup2.clicked = this;
        OptionGroup2.value = this.text;
        
    }

}
OptionGroup2.clicked = ""
OptionGroup2.value = 5
