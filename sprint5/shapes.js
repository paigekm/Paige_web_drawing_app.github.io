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

    
 

    }
}

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
        /*
        make a variable n = 2*this.n
         run loop i<=n
        in the loop 
        if n%2 == 0
        var R = this.r
        else
        var R = this.r/2
        */
        for(var i=0; i<=this.n; i++){
            /*
            */
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