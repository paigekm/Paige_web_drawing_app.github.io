console.log(" shapes js is called")
// holds all the functions for shapes that can be drawn in the drawing page

//creates a class to draw a rectangle
class Rectangle{
    // passes the parameters for the rectangle through
    // x and y define the coordinates of the top left corner of the rectangle box
    // w and h define the width and height of the rectangle
    // fillColour defines the colour that the rectangle will be filled with when printed
    constructor(x,y,w,h,fillColour){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fillColour = fillColour;

    }

    // update function calls draw
    update(){
        this.draw(this.x,this.y,this.w,this.h,this.fillColour);
    }

    // creates the rectangle to be drawn on the drawing page
    draw(x,y,w,h,fillColour){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.fillStyle = fillColour;
        ctx.fill()
    }

}

//creates a class for ellipse
class Ellipse{
    // passes the parameters for the ellipse through
    // x and y define the coordinates of the centre point of the ellipse
    // w and h define the width and height of the ellipse 
    // xR and yR are found from width and height, and show the horizontal and vertical radii of the ellipse
    // fillColour defines the colour that the ellipse will be filled with when printed
    constructor(x,y,w,h, fillColour){
        this.x = x + w/2;
        this.y = y +h/2;
        this.xR = Math.abs(w/2);
        this.yR = Math.abs(h/2);
        this.fillColour = fillColour;

    }

    // update function calls draw
    update(){
        this.drawEllipse()
    }

    // creates the ellipse to be drawn on the drawing page
    drawEllipse(){
        // draw ellipse
        ctx.fillStyle = this.fillColour;
        ctx.beginPath();
        ctx.ellipse(this.x,this.y,this.xR, this.yR, 0, 0, 2*Math.PI)
        ctx.fill();
    }
}

//creates a class for spinning ellipse
class SpinEllipse{
    // passes the parameters for the ellipse through
    // x and y define the coordinates of the centre point of the ellipse
    // w and h define the width and height of the ellipse 
    // xR and yR are found from width and height, and show the horizontal and vertical radii of the ellipse
    // fillColour defines the colour that the ellipse will be filled with when printed
    constructor(x,y,w,h, fillColour){
        this.x = x + w/2;
        this.y = y +h/2;
        this.xR = Math.abs(w/2);
        this.yR = Math.abs(h/2);
        this.fillColour = fillColour;
        // creates a counter variable and sets to 0 at the start
        this.counter = 0;
    }

    // draw function to draw the rotating ellipse that will appear on the drawing page
    drawSpinEllipse(){
        // draw ellipse
        // rotates in a full circle
        ctx.rotate(Math.PI*2)
        ctx.fillStyle = this.fillColour;
        ctx.beginPath();
        ctx.ellipse(this.x,this.y,this.xR, this.yR, this.counter/50, 0, 2*Math.PI)
        ctx.fill();
    }

    // update function calls draw
    update(){
        // adds one to counter every full rotation
        this.counter += 1;
        this.drawSpinEllipse()
    }
}

// creates a class to make a new polygon
class Polygon{
    // Xc and Yc define the starting position on the canvas of the centre point of the polgyon
    // r defines the radius size of the polgyon
    // n defines the number of sides the polygon has
    // S defines the colour that the polygon will be printed with a fill colour as
    constructor(Xc,Yc, r, n, S){
        this.Xc = Xc
        this.Yc = Yc
        this.r = r
        this.n = n;
        //this.strokeStyle = strokeStyle;
        this.fillStyle = S;
    }

    // update function calls draw
    update(){
        this.draw();
    }

    // function starts here
    draw(){
        var x = 0;
        var y = 0;

        ctx.beginPath();
        ctx.lineWidth = 5;
        // sets the x and y points to be in the middle of the polygon
        for(var i=0; i<=this.n; i++){
            x = Math.round(this.Xc + (this.r*Math.cos(i*2*Math.PI/this.n)));
            y = Math.round(this.Yc + (this.r*Math.sin(i*2*Math.PI/this.n)));
            if (i == 0){
                //only begin a  path once
                ctx.moveTo(x, y);
            }
            else{
                ctx.lineTo(x,y);
            }
        }

        ctx.closePath();
        ctx.fillStyle = this.fillStyle;
     
        ctx.fill();
    }

}

// creates a class to draw a new star
class Star{
    // set variables to use
    // Xc and Yc define the starting position on the canvas of the centre point of the star
    // r defines the full radius size of the star
    // num defines the number of points the star has
    // S defines the colour that the star will be printed with a fill colour of
    constructor(Xc,Yc, r, num, S){
        this.Xc = Xc;
        this.Yc = Yc;
        this.r = r;
        this.n = num;
        this.fillStyle = S;
    }

    // update function calls draw
    update(){
        this.draw();
    }
    // function starts here
    draw(){
        var x = 0;
        var y = 0;
        // double as many dot points as there are star points (because one in between each point of the star)
        var n = 2*this.n;
        // small radius for in between star points
        var r_half = this.r/2;
        // full radius for each end of star point
        var r;

        ctx.beginPath();
        ctx.lineWidth = 5;
        
        // which radius is created as a point, alternating between full and half
        for(var i=0; i<=n; i++){
            if (i%2 == 0){
                r = this.r;
            }
            else{
                r = r_half;
            }
            // sets the x and y points to be in the middle of the star
            x = Math.round(this.Xc + (r*Math.cos(i*2*Math.PI/n)));
            y = Math.round(this.Yc + (r*Math.sin(i*2*Math.PI/n)));
            if (i == 0){
                //only begin a path once
                ctx.moveTo(x, y);
            }
            else{
                ctx.lineTo(x,y);
            }
        }

        ctx.closePath();
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
    }
}


// create a class for the brush stroke
class Dot{
    // set variables 
    // r defines the radius size of each dot that makes up the brush stroke
    // col defines the colour that the dot will be printed with a fill colour as
    constructor(r,col){
        this.r =r;
        this.col = col;
        // set mouse position to 0 to start
        this.xMouse = 0;
        this.yMouse = 0;
        this.dotSet = [];

        //listeners
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        this.mouseDown = true;
        this.finish = false;
    }

    mDown(e){
        // if the mouse is down, set mouse down to be true
        this.mouseDown = true;
    }

    mMove(e){
        // x and y variable is updated to be the current mouse position
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        if(this.finish == false){
            var temp = new Ellipse(this.xMouse, this.yMouse, this.r, this.r, Swatch.selected)
            this.dotSet.push(temp);
        }
    }

    mUp(e){
        // set mouse down to be false
        this.mouseDown = false;
        // as the mouse is now up, the stroke of dots needs to stop
        this.finish = true;
    }

    update(){
        // update all items in the dot set list
        for(var i=0; i<this.dotSet.length; i++){
            this.dotSet[i].update()
        }
    }

    // end the loop of new dots being drawn
    finish(){
        this.finish = true;
    }

    draw(){
        // change the fill colour/state if the mouse is over or the point is selected
        if(this.inBounds || PointerEvent.taken == this){
            ctx.fillStyle = this.over;
        }else{
            ctx.fillStyle = this.fill;
        }
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = 2;
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }

}