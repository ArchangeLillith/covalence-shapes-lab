document.addEventListener("DOMContentLoaded", () => {
	const rectangleButton = document.getElementById("add-rectangle");
	const circleButton = document.getElementById("add-circle");
	const squareButton = document.getElementById("add-square");
	const triangleButton = document.getElementById("add-triangle");
	const canvas = document.getElementById("canvas");

	rectangleButton.addEventListener("click", () => {
		const rectangleWidth = document.getElementById("rectangle-width").value;
		const rectangleHeight = document.getElementById("rectangle-height").value;
		new Rectangle(rectangleWidth, rectangleHeight);
	});
	squareButton.addEventListener("click", () => {
		const sideLength = document.getElementById("square-side-length").value;
		new Square(sideLength);
	});
	triangleButton.addEventListener("click", () => {
		const height = document.getElementById("triangle-height").value;
		new Triangle(height);
	});
	circleButton.addEventListener("click", () => {
		const circleRadius = document.getElementById("circle-radius").value;
		new Circle(circleRadius);
	});

	//Parent class
	class Shape {
		constructor() {
			this.div = document.createElement("div");
			this.div.style.position = "relative";
			//Put the shape in a random place on the screen
			//TODO handle the ones going off screen
			this.div.style.left = `${Math.floor(Math.random() * 600)}px`;
			this.div.style.top = `${Math.floor(Math.random() * 600)}px`;
			this.div.addEventListener("click", () => this.describe(this));
			this.div.addEventListener("dblclick", () => this.div.remove());
		}
		delete() {
			//Delete method shared by all shapes
		}
		describe(shape) {
			let name = document.getElementById("shape-name-display");
			let width = document.getElementById("width-display");
			let height = document.getElementById("height-display");
			let radius = document.getElementById("radius-display");
			let area = document.getElementById("area-display");
			let perimeter = document.getElementById("perimeter-display");
			name.value = shape.className;
			width.value = shape.width;
			height.value = shape.height;
			radius.value = shape.radius;
			area.value = shape.area;
			perimeter.value = shape.perimeter;
			//Method to show details of the shape clicked
		}
	}

	class Rectangle extends Shape {
		constructor(width, height) {
			super();
			this.width = width;
			this.height = height;
			this.className = "Rectangle";
			this.div.style.backgroundColor = "green";
			this.div.style.height = `${height}px`;
			this.div.style.width = `${width}px`;
			this.div.className = "Rectangle";
			this.area = parseInt(height) * parseInt(width);
			this.perimeter = (parseInt(height) + parseInt(width)) * 2;
			canvas.appendChild(this.div);
		}
	}

	class Circle extends Shape {
		constructor(radius) {
			super();
			this.radius = radius;
			this.className = "Circle";
			this.div.style.backgroundColor = "purple";
			this.div.style.height = `${parseInt(radius) * 2}px`;
			this.div.style.width = `${parseInt(radius) * 2}px`;
			this.div.style.borderRadius = "50%";
			this.div.className = "Circle";
			this.area = Math.PI * Math.pow(radius, 2);
			this.perimeter = 2 * Math.PI * radius;
			canvas.appendChild(this.div);
		}
	}

	class Triangle extends Shape {
		constructor(height) {
			super();
			this.height = height;
			this.className = "Triangle";
			this.div.style.height = `0px`;
			this.div.style.width = `0px`;
			this.div.style.borderBottom = `${parseInt(height)}px solid yellow`;
			this.div.style.borderRight = `${parseInt(height)}px solid transparent`;
			this.div.className = "Triangle";
			this.area = 0.5 * parseInt(height) * parseInt(height);
			this.perimeter = 2 * parseInt(height) + Math.sqrt(2) * parseInt(height);
			canvas.appendChild(this.div);
		}
	}

	class Square extends Rectangle {
		constructor(sideLength) {
			//This calls to the rectangle to reuse it's construction as we can piggy back off of it, yet assign this a different name as it's a square
			super(sideLength, sideLength);
			this.className = "Square";
			this.div.style.backgroundColor = "red";
			this.div.className = "Square";
		}
	}
});
