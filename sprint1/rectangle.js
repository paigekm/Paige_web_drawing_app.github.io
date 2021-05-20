console.log(" rectangle js is called")

//creates a class for rectangle
// creates a new object class for the rectangle
class Rectangle{
    // passes the parameters for the rectangle through
    constructor(x,y,w,h,fillColour){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fillColour = fillColour;

    }

    // calls the draw rectangle function
    update(){
        this.draw(this.x,this.y,this.w,this.h,this.fillColour);
    }

    // function with the ctx commands to draw the rectangle
    draw(x,y,w,h,fillColour){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.fillStyle = fillColour;
        ctx.fill()
    }

}