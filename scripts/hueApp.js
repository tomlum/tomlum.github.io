
// Hue Application
var hueApp = new PIXI.Application(300, 50, {
	transparent: true
});
document.getElementById("hueApp").appendChild(hueApp.view);

let t_playButton2 = PIXI.Texture.fromImage("/assets/playIconOff.png");
let t_pauseButton2 = PIXI.Texture.fromImage("/assets/playIconOn.png");

let hueScreen = new PIXI.Sprite(t_rect);
hueScreen.interactive = true;
hueScreen.on("pointerdown", pauseHue);
hueScreen.cursor = "pointer";
hueScreen.x = 50;
hueScreen.scale.x = 300 - 100;
hueScreen.scale.y = 50;
hueScreen.tint = rgb(0, 0, 0);
hueApp.stage.addChild(hueScreen);

let huePlayButton = new PIXI.Sprite(t_playButton2);
huePlayButton.interactive = true;
huePlayButton.on("pointerdown", pauseHue);
huePlayButton.cursor = "pointer";
huePlayButton.scale.x = 0.5;
huePlayButton.scale.y = 0.5;
huePlayButton.anchor.x = 0;
huePlayButton.anchor.y = 0.5;
huePlayButton.x = 0;
huePlayButton.y = 25;
hueApp.stage.addChild(huePlayButton);

function rgbString(r, g, b) {
	return "rgb(" + r + "," + g + "," + b + ")";
}

function pauseHue() {
	huePause = !huePause;
	if (huePause) {
		huePlayButton.texture = t_pauseButton2;
	} else {
		huePlayButton.texture = t_playButton2;
	}
}

let huePause = false;
let hueR = 0;
let hueG = 0;
let hueB = 0;
let time = Date.now();

document.getElementById("hueTextR").style.color = rgbString(hueR, 0, 0);
document.getElementById("hueTextG").style.color = rgbString(0, hueG, 0);
document.getElementById("hueTextB").style.color = rgbString(0, 0, hueB);
let colorNumber = 1;
function updateColor() {
	if (huePause) {
		colorNumber += 1;
		hueB += 1;
		if (hueB >= 255) {
			hueB = 0;
			hueG += 1;
			time = Date.now();
		}
		if (hueG >= 255) {
			hueG = 0;
			hueR += 1;
		}
		if (hueR >= 255) {
			hueR = 0;
			hueG = 0;
			hueB = 0;
		}
		document.getElementById("hueTextR").innerHTML = String(hueR);
		document.getElementById("hueTextR").style.color = rgbString(hueR, 0, 0);
		document.getElementById("hueTextG").innerHTML = String(hueG);
		document.getElementById("hueTextG").style.color = rgbString(0, hueG, 0);
		document.getElementById("hueTextB").innerHTML = String(hueB);
		document.getElementById("hueTextB").style.color = rgbString(0, 0, hueB);
		document.getElementById("colorNumber").innerHTML = String(colorNumber);
		document.getElementById("colorNumber").style.color = rgbString(
			colorNumber / 16582375 * 255,
			colorNumber / 16582375 * 255,
			colorNumber / 16582375 * 255
		);
		hueScreen.tint = rgb(hueR / 255, hueG / 255, hueB / 255);
	}
}
hueApp.ticker.add(delta => updateColor(delta));