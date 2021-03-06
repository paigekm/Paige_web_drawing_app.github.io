console.log(" objects js is called")

//creates a class to draw a rectangle
class Rectangle{
    // passes the parameters for the rectangle through
    constructor(x,y,w,h,fillColour){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fillColour = fillColour;

    }

    update(){
        this.draw(this.x,this.y,this.w,this.h,this.fillColour);
    }

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
    constructor(x,y,w,h, fillColour){
        this.x = x + w/2;
        this.y = y +h/2;
        this.xR = Math.abs(w/2);
        this.yR = Math.abs(h/2);
        this.fillColour = fillColour;

    }

    update(){
        this.drawEllipse()
    }

    drawEllipse(){
        // draw ellipse
        ctx.fillStyle = this.fillColour;
        ctx.beginPath();
        ctx.ellipse(this.x,this.y,this.xR, this.yR, 0, 0, 2*Math.PI)
        ctx.fill();

    
 

    }
}

// creates a class to make a new polygon
class Polygon{
    constructor(Xc,Yc, r, n, S){
        console.log("Polygon");
        this.Xc = Xc
        this.Yc = Yc
        this.r = r
        this.n = n;
        //this.strokeStyle = strokeStyle;
        this.fillStyle = S;
    }

    update(){
        this.draw();
    }
    // function starts here
    draw(){
        var x = 0;
        var y = 0;

        ctx.beginPath();
        ctx.lineWidth = 5;
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
        //ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
     
        ctx.fill();
        //ctx.stroke();
    }

}

// creates a class to draw a new star
class Star{
    // set variables to use
    constructor(Xc,Yc, r, num, S){
        console.log("Star");
        this.Xc = Xc;
        this.Yc = Yc;
        this.r = r;
        this.n = num;
        //this.strokeStyle = strokeStyle;
        this.fillStyle = S;
    }

    update(){
        this.draw();
    }
    // function starts here
    draw(){
        var x = 0;
        var y = 0;
        var n = 2*this.n;
        var r_half = this.r/2;
        var r;

        ctx.beginPath();
        ctx.lineWidth = 5;
        
        for(var i=0; i<=n; i++){
            if (i%2 == 0){
                r = this.r;
            }
            else{
                r = r_half;
            }
            x = Math.round(this.Xc + (r*Math.cos(i*2*Math.PI/n)));
            y = Math.round(this.Yc + (r*Math.sin(i*2*Math.PI/n)));
            if (i == 0){
                //only begin a  path once
                ctx.moveTo(x, y);
            }
            else{
                ctx.lineTo(x,y);
            }
        }

        ctx.closePath();
        //ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        //ctx.stroke();
    }
}



// create a class for the brush stroke
class Dot{
    // set variables 
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
            console.log(Swatch.selected)
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