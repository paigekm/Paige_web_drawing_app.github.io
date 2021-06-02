console.log(" objects js is called")

//creates a class for rectangle
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
        // draw ellipse line of reflection

    
 

    }
}