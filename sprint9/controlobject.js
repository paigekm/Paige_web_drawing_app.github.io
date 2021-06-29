console.log(" control object js is called ")

class ControlObject{
    constructor(x,y,w,h){

        // sets the mouse position variables to be 0
        // these are then adapted later in the program
        this.xMouse = 0;
        this.yMouse = 0;
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        // sets mouse down to be false, so it only becomes true when the user clicks down
        this.mouseDown = false;

        // defining the rectangle x,y,w,h 
        this.x = x;
        this.y = y;
        this.box_width = w;
        this.box_height = h;

        this.w = 0;
        this.h = 0;

        // create an empty list
        this.objectSet = []

        // listeners set up for the mouse
        this.element = canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));

        this.inBounds = false;

    }

    mDown(e){
        // mouse position should return the same 
        // as the coordinates of the canvas
        // mouse goes down and stays down (dragging)
    
        this.xMouseStart = e.offsetX;
        this.yMouseStart = e.offsetY;
        this.mouseDown = true;
        this.inBounds = this.inBoundsCheck(this.xMouseStart, this.yMouseStart, this.x, this.y, this.box_width, this.box_height)
        // single event of the mouse clicking down
        //this.draw();
        // checks mouse down action has registered
        //console.log("mouse down")
        //console.log(this.inBounds)
       

        if(this.inBounds == true && Button.shape == "Brush"){
            console.log(CircleButton.shape)

            if(CircleButton.shape == "L"){
                console.log("L")
                var temp = new Dot(20, Swatch.selected);
                this.objectSet.push(temp);
            }else if(CircleButton.shape == "M"){
                console.log("M")
                var temp = new Dot(13, Swatch.selected);
                this.objectSet.push(temp);
            }else if(CircleButton.shape == "S"){
                console.log("S")
                var temp = new Dot(7, Swatch.selected);
                this.objectSet.push(temp);
        }
        }
    

    }

    mMove(e){
        // determines postion of mouse when it clicks down
        // registers when the mouse is moving
        // when the mouse is moving...
        this.xMouse=e.offsetX;
        this.yMouse=e.offsetY;
        // testing has registered
        //console.log("mouse move")
        // testing
        var mouse_position = "x:" + this.xMouse + "  y:" + this.yMouse;
        //console.log(mouse_position)
    }

    var = option_list = []

    mUp(e){
        // mouse position when mouse unclicks
        this.mouseDown = false;
        if(this.inBounds == true){
            // create a new shape object
            // this has the dimensions from the draw guide
            if(this.w != 0 && this.h != 0 ){
                if (Button.shape == "Rectangle"){
                    var temp = new Rectangle(this.xMouseStart, this.yMouseStart,this.w,this.h,Swatch.selected)
                }
                else if (Button.shape == "Ellipse"){
                    var temp = new Ellipse(this.xMouseStart, this.yMouseStart,this.w,this.h,Swatch.selected)
                }
                else if (Button.shape == "Polygon"){
                    var temp = new Polygon(this.xMouseStart+this.w/2,this.yMouseStart+this.h/2,this.w/2,OptionGroup.value,Swatch.selected);
                }
                else if (Button.shape == "Star"){
                    var temp = new Star(this.xMouseStart+this.w/2,this.yMouseStart+this.h/2,this.w/2,OptionGroup2.value,Swatch.selected);
                }
                else if (Button.shape == "Spinning Ellipse"){
                    var temp = new SpinEllipse(this.xMouseStart, this.yMouseStart,this.w,this.h,Swatch.selected);
                }
                // add new shape to the object list
                if(temp){
                this.objectSet.push(temp);
            }
                // test it has been added to the object list
                //console.log(this.objectSet)
            }
        //console.log("mouse up")
    }
}

    inBoundsCheck(xM, yM, x, y, w, h){
        // check for boundaries, return true if inside or false if outside boundaries
        if(xM > x && xM < x+w && yM > y && yM < y+h){
            return true;
        }else{
            return false;
        }
    }

    update(){
        // clearing the canvas
        if(Button.shape == "Clear"){
            this.objectSet = [];
            Button.shape = ""
        }
        //undoing what was last made on the canvas
        else if(Button.shape == "Undo"){
            this.objectSet.pop();
            Button.shape = ""
        }

        // creates the drawing page rectangle
        // for user to draw shapes on
        // create drawing page
        ctx.save();
        this.drawRect(this.x,this.y,this.box_width,this.box_height)
        ctx.clip()
        // event of the mouse staying down after you've clicked it
        //to update the items in list
        for(var i=0; i<this.objectSet.length; i++){
            this.objectSet[i].update()
        }
        ctx.restore();

        if(this.mouseDown == true && this.inBounds == true && Button.shape != "Brush"){
            this.drawGuide();
        }

    }

    drawGuide(){
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        this.drawRect(this.xMouseStart, this.yMouseStart, this.w, this.h, "rgb(0,0,255)");

    }

    drawRect(x,y,w,h){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "colArray[0][3]";
        ctx.stroke();
    }



}