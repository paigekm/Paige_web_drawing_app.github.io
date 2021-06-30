console.log(" control object js is called ");

// function to create the control object/canvas page
class ControlObject {
	constructor(x, y, w, h) {

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
		this.objectSet = [];

		// listeners set up for the mouse
		this.element = canvas;
		this.element.addEventListener('mousedown', this.mDown.bind(this));
		this.element.addEventListener('mousemove', this.mMove.bind(this));
		this.element.addEventListener('mouseup', this.mUp.bind(this));

		this.inBounds = false;

	}

	// when the mouse is clicked down
	mDown(e) {
		// mouse position should return the same 
		// as the coordinates of the canvas
		// mouse goes down and stays down (dragging)

		this.xMouseStart = e.offsetX;
		this.yMouseStart = e.offsetY;
		this.mouseDown = true;
		this.inBounds = this.inBoundsCheck(this.xMouseStart, this.yMouseStart, this.x, this.y, this.box_width, this.box_height);

		// creates the brush (loop of dots being pushed) 
		// size of brush width depending on which sub button selected on the canvas
		if (this.inBounds == true && Button.shape == "Brush") {
		    var temp;

			if (CircleButton.shape == "L") {
				temp = new Dot(20, Swatch.selected);
				this.objectSet.push(temp);
			} else if (CircleButton.shape == "M") {
				temp = new Dot(13, Swatch.selected);
				this.objectSet.push(temp);
			} else if (CircleButton.shape == "S") {
				temp = new Dot(7, Swatch.selected);
				this.objectSet.push(temp);
			}
		}


	}

	// when the mouse moves it's location, x and y variables, on the canvas
	mMove(e) {
		// determines postion of mouse when it clicks down
		// registers when the mouse is moving
		// when the mouse is moving...
		this.xMouse = e.offsetX;
		this.yMouse = e.offsetY;
	}

	// when the mouse is released after clicking down
	mUp(e) {
		// mouse position when mouse unclicks
		this.mouseDown = false;
		if (this.inBounds == true) {
			// create a new shape object
			// this has the dimensions from the draw guide
			if (this.w != 0 && this.h != 0) {
			    var temp;
				if (Button.shape == "Rectangle") {
					 temp = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, Swatch.selected);
				} else if (Button.shape == "Ellipse") {
					 temp = new Ellipse(this.xMouseStart, this.yMouseStart, this.w, this.h, Swatch.selected);
				} else if (Button.shape == "Spinning Ellipse") {
					 temp = new SpinEllipse(this.xMouseStart, this.yMouseStart, this.w, this.h, Swatch.selected);
				} else if (Button.shape == "Polygon") {
					 temp = new Polygon(this.xMouseStart + this.w / 2, this.yMouseStart + this.h / 2, this.w / 2, OptionGroup.value, Swatch.selected);
				} else if (Button.shape == "Star") {
					 temp = new Star(this.xMouseStart + this.w / 2, this.yMouseStart + this.h / 2, this.w / 2, OptionGroup2.value, Swatch.selected);
				}
				// add new shape to the object list
				if (temp) {
					this.objectSet.push(temp);
				}
			}
		}
	}

	// check for boundaries of control object/canvas, return true if inside or false if outside boundaries
	inBoundsCheck(xM, yM, x, y, w, h) {
		if (xM > x && xM < x + w && yM > y && yM < y + h) {
			return true;
		} else {
			return false;
		}
	}

	// update function which updates regularly while the program is running
	update() {
		// clearing the canvas
		if (Button.shape == "Clear") {
			this.objectSet = [];
			Button.shape = "";
		}
		//undoing what was last made on the canvas
		else if (Button.shape == "Undo") {
			this.objectSet.pop();
			Button.shape = "";
		}

		// creates the drawing page rectangle
		// for user to draw shapes on
		// create drawing page
		ctx.save();
		this.drawRect(this.x, this.y, this.box_width, this.box_height);
		ctx.clip();
			// event of the mouse staying down after you've clicked it
			//to update the items in list
		for (var i = 0; i < this.objectSet.length; i++) {
			this.objectSet[i].update();
		}
		// save, clip and restore brings the canvas back to the front so that shapes appear 'cut off' if drawn outside of the drawing page
		ctx.restore();

		// ensures a guide box follows the mouse where it drags around when creating every shape 
		// except brush (because that is free flowing)
		// this helps the user to see what size the shape will be if placed down at that moment
		if (this.mouseDown == true && this.inBounds == true && Button.shape != "Brush") {
			this.drawGuide();
		}

	}

	// creates a guide box to inform the user while they are placing objects
	// it will show a rectangular outline from the position clicked down, to the current mouse position it's been dragged to
	drawGuide() {
		this.w = this.xMouse - this.xMouseStart;
		this.h = this.yMouse - this.yMouseStart;
		this.drawRect(this.xMouseStart, this.yMouseStart, this.w, this.h, "rgb(0,0,255)");

	}

	// rectangle function to create the rectangular guide box which is called in the drawGuide function
	drawRect(x, y, w, h) {
		ctx.beginPath();
		ctx.rect(x, y, w, h);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "colArray[0][3]";
		ctx.stroke();
	}



}