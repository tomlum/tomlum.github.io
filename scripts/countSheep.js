const zeroNum = new Float32Array([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01960784, 0.0, 0.04313725, 0.0, 0.04705882, 0.0, 0.02745098, 0.02745098, 0.0, 0.01176471, 0.01568627, 0.0, 0.0, 0.01176471, 0.03921569, 0.01568627, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01960784, 0.0, 0.01568627, 0.01568627, 0.01568627, 0.0, 0.0, 0.00784314, 0.0, 0.0, 0.03529412, 0.01960784, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02352941, 0.0, 0.0, 0.0, 0.01176471, 0.05098039, 0.01568627, 0.0, 0.02745098, 0.07058824, 0.0, 0.0, 0.09019608, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02352941, 0.02352941, 0.02352941, 0.0, 0.0, 0.0, 0.01176471, 0.03137255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.04313725, 0.03921569, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01568627, 0.0, 0.0, 0.0, 0.05490196, 0.0, 0.0, 0.0, 0.04705882, 0.0, 0.04313725, 0.08235294, 0.0, 0.0, 0.01960784, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02352941, 0.0, 0.04705882, 0.18039216, 0.79607843, 1.0, 0.99607843, 0.5372549, 0.45490196, 0.10196078, 0.0, 0.03137255, 0.00392157, 0.00392157, 0.05490196, 0.02352941, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.34117647, 0.78039216, 1.0, 0.93333333, 0.94117647, 1.0, 0.97254902, 1.0, 0.90588235, 0.56078431, 0.19215686, 0.0, 0.0, 0.00392157, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4, 0.83529412, 1.0, 0.98823529, 0.99607843, 1.0, 0.98823529, 1.0, 0.96470588, 0.94901961, 1.0, 0.92156863, 0.3372549, 0.0, 0.01960784, 0.0, 0.0, 0.0, 0.0, 0.01960784, 0.0, 0.00392157, 0.01568627, 0.00392157, 0.0, 0.00784314, 0.01176471, 0.03529412, 0.85098039, 0.95294118, 0.99607843, 0.97254902, 0.99607843, 0.96862745, 1.0, 0.96470588, 1.0, 1.0, 0.97647059, 0.98431373, 0.82745098, 0.04705882, 0.02352941, 0.0, 0.0, 0.0, 0.0, 0.02352941, 0.0, 0.00784314, 0.00392157, 0.0, 0.0, 0.0, 0.0, 0.14509804, 0.87843137, 1.0, 1.0, 0.88235294, 0.6627451, 0.52156863, 0.5372549, 0.48627451, 0.49019608, 0.90588235, 1.0, 1.0, 0.92941176, 0.48627451, 0.01568627, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01176471, 0.0, 0.0, 0.01176471, 0.0, 0.08627451, 0.65490196, 0.97254902, 0.96470588, 0.86666667, 0.19607843, 0.01568627, 0.0, 0.02745098, 0.04313725, 0.01176471, 0.54509804, 1.0, 0.97647059, 1.0, 0.76862745, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.00784314, 0.0, 0.0, 0.03137255, 0.0, 0.20784314, 1.0, 1.0, 0.98431373, 0.9254902, 0.0, 0.0, 0.02745098, 0.0, 0.0, 0.0, 0.18039216, 0.9372549, 0.94901961, 1.0, 0.71764706, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01176471, 0.00784314, 0.0, 0.0, 0.00392157, 0.0, 0.31372549, 0.96078431, 0.94117647, 0.96078431, 0.77254902, 0.0, 0.01960784, 0.05490196, 0.0, 0.02745098, 0.02745098, 0.14901961, 0.91764706, 0.97647059, 1.0, 0.6745098, 0.01960784, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01176471, 0.0, 0.00392157, 0.0, 0.01176471, 0.0, 0.50196078, 1.0, 1.0, 0.98039216, 0.43137255, 0.04705882, 0.0, 0.0, 0.01568627, 0.0, 0.00392157, 0.3372549, 0.96470588, 1.0, 0.99215686, 0.69803922, 0.01176471, 0.0, 0.0, 0.0, 0.0, 0.0, 0.00392157, 0.0, 0.02352941, 0.0, 0.02352941, 0.01960784, 0.68627451, 0.94509804, 0.99607843, 0.96470588, 0.37647059, 0.03137255, 0.0, 0.0, 0.00784314, 0.0, 0.0, 0.4, 1.0, 1.0, 0.96862745, 0.54117647, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01960784, 0.01176471, 0.0, 0.02352941, 0.0, 0.0, 0.0, 0.7372549, 1.0, 1.0, 1.0, 0.59607843, 0.0, 0.04313725, 0.00392157, 0.0, 0.01960784, 0.02745098, 0.31764706, 1.0, 1.0, 0.97254902, 0.28627451, 0.01176471, 0.0, 0.0, 0.0, 0.0, 0.00392157, 0.0, 0.01960784, 0.0, 0.03529412, 0.00392157, 0.00784314, 0.42745098, 0.96862745, 0.98823529, 1.0, 0.78039216, 0.02352941, 0.0, 0.0, 0.05490196, 0.0, 0.05490196, 0.71372549, 0.98431373, 0.98039216, 1.0, 0.19215686, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02745098, 0.0, 0.02352941, 0.00392157, 0.0, 0.31372549, 0.98431373, 0.96862745, 0.99607843, 0.81960784, 0.10588235, 0.03921569, 0.03921569, 0.0, 0.24313725, 0.63529412, 1.0, 1.0, 1.0, 0.43921569, 0.03921569, 0.03137255, 0.0, 0.0, 0.0, 0.0, 0.00392157, 0.0, 0.03137255, 0.0, 0.00392157, 0.00784314, 0.0, 0.15294118, 0.94117647, 0.99215686, 0.98039216, 1.0, 0.41568627, 0.0, 0.01960784, 0.26666667, 0.87843137, 0.92156863, 1.0, 0.99607843, 0.7254902, 0.04705882, 0.01960784, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01176471, 0.0, 0.02352941, 0.00392157, 0.0, 0.01568627, 0.0, 0.03137255, 0.55294118, 0.99215686, 0.93333333, 1.0, 0.83921569, 0.10980392, 0.23137255, 0.90980392, 1.0, 1.0, 0.99607843, 0.95686275, 0.06666667, 0.01176471, 0.0, 0.01568627, 0.0, 0.0, 0.0, 0.0, 0.01568627, 0.0, 0.01568627, 0.0, 0.0, 0.01960784, 0.01568627, 0.0, 0.16862745, 1.0, 1.0, 0.92941176, 1.0, 0.63921569, 0.68235294, 1.0, 0.92941176, 1.0, 0.98039216, 0.2745098, 0.01960784, 0.0, 0.02352941, 0.0, 0.0, 0.0, 0.0, 0.0, 0.00784314, 0.0, 0.00392157, 0.0, 0.0, 0.01568627, 0.02352941, 0.0, 0.01960784, 0.82352941, 1.0, 0.95686275, 0.98823529, 0.97647059, 0.99215686, 0.92941176, 1.0, 0.89019608, 0.34117647, 0.0, 0.0, 0.07058824, 0.00392157, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01176471, 0.0, 0.0, 0.0, 0.00392157, 0.01568627, 0.0, 0.0, 0.30196078, 0.80784314, 1.0, 0.96078431, 1.0, 1.0, 0.98431373, 0.94117647, 0.41176471, 0.01960784, 0.0, 0.0, 0.0, 0.03921569, 0.03137255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02352941, 0.0, 0.0, 0.01176471, 0.0, 0.0, 0.00392157, 0.03137255, 0.0, 0.52941176, 1.0, 0.96862745, 0.97647059, 0.93333333, 0.99607843, 0.56470588, 0.04705882, 0.0, 0.07058824, 0.0, 0.01960784, 0.01176471, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.04313725, 0.0, 0.03921569, 0.42352941, 0.86666667, 0.96078431, 0.63529412, 0.25882353, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.00392157, 0.0, 0.0, 0.0, 0.0, 0.00784314, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02745098, 0.02352941, 0.01176471, 0.00392157, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01176471, 0.01960784, 0.01176471, 0.00392157, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0])
var currentNum = zeroNum
var lastNum = currentNum

const model = new KerasJS.Model({
	filepaths: {
		model: 'countSheep/model.json',
		weights: 'countSheep/model_weights.buf',
		metadata: 'countSheep/model_metadata.json'
	},
	gpu: true
})


var pScale = 10
var sheepApp = new PIXI.Application(pScale * 28, pScale * 28, { transparent: true });
var drawApp = new PIXI.Application(pScale * 28, pScale * 28, { transparent: true });
var responseApp = new PIXI.Application(pScale * 28, pScale * 28, { transparent: true });

//Add the canvas to the HTML documents
document.getElementById("CountSheep").appendChild(sheepApp.view);
document.getElementById("CountDrawing").appendChild(drawApp.view);
document.getElementById("CountResponse").appendChild(responseApp.view);

drawApp.squares = [];
drawApp.input = new Float32Array(784);
for (i = 0; i < 28; i++) {
	for (j = 0; j < 28; j++) {
		if (Math.sqrt(Math.pow(i + .5 - 14, 2) + Math.pow(j + .5 - 14, 2)) < 14) {
			var sqr = PIXI.Sprite.fromImage('assets/square.png');
			sqr.scale.x = pScale;
			sqr.scale.y = pScale;
			sqr.x = i * pScale;
			sqr.y = j * pScale;
			sqr.tint = rgb(0,0,0);
			drawApp.stage.addChild(sqr);
			drawApp.squares[(i+28*j)]=sqr;
		}
	}
}
sheepApp.squares = []
for (i = 0; i < 28; i++) {
	for (j = 0; j < 28; j++) {
		if (Math.sqrt(Math.pow(i + .5 - 14, 2) + Math.pow(j + .5 - 14, 2)) < 14) {
			var sqr = PIXI.Sprite.fromImage('assets/square.png');
			sqr.scale.x = pScale;
			sqr.scale.y = pScale;
			sqr.x = i * pScale;
			sqr.y = j * pScale;
			sqr.tint = rgb(0,0,0);
			sheepApp.stage.addChild(sqr);
			sheepApp.squares[(i+28*j)]=sqr;
		}
	}
}
responseApp.squares = []
for (i = 0; i < 28; i++) {
	for (j = 0; j < 28; j++) {
		if (Math.sqrt(Math.pow(i + .5 - 14, 2) + Math.pow(j + .5 - 14, 2)) < 14) {
			var sqr = PIXI.Sprite.fromImage('assets/square.png');
			sqr.scale.x = pScale;
			sqr.scale.y = pScale;
			sqr.x = i * pScale;
			sqr.y = j * pScale;
			sqr.tint = rgb(0,0,0);
			responseApp.stage.addChild(sqr);
			responseApp.squares[(i+28*j)]=sqr;
		}
	}
}

var mouseDown = false;
for (i = 0; i < 28; i++) {
	for (j = 0; j < 28; j++) {
		if (Math.sqrt(Math.pow(i + .5 - 14, 2) + Math.pow(j + .5 - 14, 2)) < 14) {
			var sqr = PIXI.Sprite.fromImage('assets/square.png');
			sqr.scale.x = pScale;
			sqr.scale.y = pScale;
			sqr.x = i * pScale;
			sqr.y = j * pScale;
			sqr.interactive = true;
			sqr.on('pointerdown', mDown);
			sqr.on('mouseup', mUp);
			sqr.on('mouseupoutside', mUp);
			sqr.on('mouseover', paint);
			sqr.tint = rgb(0, 0, 0);
			drawApp.stage.addChild(sqr);
			drawApp.squares[(i+28*j)]=sqr;
		}
	}
}

function mDown(){
	hide('drawHere');
	mouseDown = true;
	this.tint = rgb(1, 1, 1);
	drawApp.input[Math.floor(this.x/pScale)+28*Math.floor(this.y/pScale)] = 1;
}

function mUp(){
	mouseDown = false;
	forwardPass(responseApp,drawApp.input);
}

function paint() {
	if(mouseDown){
		this.tint = rgb(1, 1, 1);
		drawApp.input[Math.floor(this.x/pScale)+28*Math.floor(this.y/pScale)] = 1;
	}
}

function rgb(r, g, b) {
	return PIXI.utils.rgb2hex([r, g, b]);
}

function forwardPass(app,input) {
	app = app? app : sheepApp
	input = input? input : currentNum
	model.ready()
	.then(() => {
		// input data object keyed by names of the input layers
		// or `input` for Sequential models
		// values are the flattened Float32Array data
		// (input tensor shapes are specified in the model config)
		const inputData = {
			'input': input
		}

		// make predictions
		return model.predict(inputData)
	})
	.then(outputData => {
		drawNet(app, outputData.output);
		lastNum = currentNum;
		currentNum = outputData.output;
	})
	.catch(err => {
		console.log(err);
		// handle error
	})
}

function back() {
	if (lastNum) {
		hide("backArrow", .1);
		currentNum = lastNum
		drawNet(sheepApp, currentNum)
		lastNum = null
	}
}

function reset() {
	hide("backArrow", .1);
	lastNum = null;
	currentNum = zeroNum;
	drawNet(sheepApp, currentNum);
}

function resetDrawing() {
	for (i = 0; i < 28; i++) {
		for (j = 0; j < 28; j++) {
			if (Math.sqrt(Math.pow(i + .5 - 14, 2) + Math.pow(j + .5 - 14, 2)) < 14) {
				drawApp.input[(i+28*j)] = 0;
				drawApp.squares[(i+28*j)].tint = rgb(0, 0, 0);
				responseApp.squares[(i+28*j)].tint = rgb(0, 0, 0);
			}
		}
	}

}

function drawNet(app, data) {
	for (i = 0; i < 28; i++) {
		for (j = 0; j < 28; j++) {
			if (Math.sqrt(Math.pow(i + .5 - 14, 2) + Math.pow(j + .5 - 14, 2)) < 14) {
				const val = data[(i+28*j)]
				app.squares[(i+28*j)].tint = rgb(val, val, val);
			}
		}
	}
}

function hide(element, speed) {
	speed = speed ? (speed + "s") : (".5s");
	document.getElementById(element).style.transition = "all " + speed + " ease-in-out";
	document.getElementById(element).style.opacity = "0";
}

function show(element, speed) {
	speed = speed ? (speed + "s") : (".5s");
	document.getElementById(element).style.transition = "all " + speed + " ease-in-out";
	document.getElementById(element).style.opacity = "1";
}


drawNet(sheepApp, currentNum)

PIXI.utils.sayHello("Yo!")