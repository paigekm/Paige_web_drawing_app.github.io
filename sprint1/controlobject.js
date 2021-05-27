console.log(" control object js is called ")

class ControlObject{
    constructor(){

        // sets the mouse position variables to be 0
        // these are then adapted later in the program
        this.xMouse = 0;
        this.yMouse = 0;
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        // sets mouse down to be false, so it only becomes true when the user clicks down
        this.mouseDown = false;

        // sets the width and height of rectangle to 0
        // this is also adapted later in the program when the rectangle is drawn
        this.w = 0;
        this.h = 0;

        // create an empty list
        this.objectSet = []

        // listeners set up for the mouse
        this.element = canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));

    }

    mDown(e){
        // mouse position should return the same 
        // as the coordinates of the canvas
        // mouse goes down and stays down (dragging)
        this.xMouseStart = e.offsetX;
        this.yMouseStart = e.offsetY;
        this.mouseDown = true;
        // single event of the mouse clicking down
        this.draw();
        // checks mouse down action has registered
        console.log("mouse down")

    }

    mMove(e){
        // determines postion of mouse when it clicks down
        // registers when the mouse is moving
        this.xMouse=e.offsetX;
        this.yMouse=e.offsetY;
        // testing has registered
        //console.log("mouse move")
        var mouse_position = "x:" + this.xMouse + "  y:" + this.yMouse
        //test
        console.log(mouse_position)
    }

    mUp(e){
        // mouse position when mouse unclicks
        this.mouseDown = false;
        var temporary = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, "rgb(10,60,120")
        this.objectSet.push(temporary);
        // test
        console.log("mouse up")
    }

    update(){
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        // event of the mouse staying down after you've clicked it
        if(this.mouseDown){
            this.draw();
        }

        //to update the items in list
        for(var i=0; i<this.objectSet.length; i++){
            this.objectSet[i].update()
        }
    }

    draw(){
        this.drawRect(this.xMouseStart, this.yMouseStart, this.w, this.h);

    }

    drawRect(x,y,w,h){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "colArray[0][3]";
        ctx.stroke();
    }


}