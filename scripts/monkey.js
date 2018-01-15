const pScale2 = 10;
const dimX = 32;
const dimY = Math.floor(dimX * 1.3);
const portWidth = dimX * pScale2;
const portHeight = dimY * pScale2;
const seedLength = 10;
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const history = [];
const MAXHISTORY = 25

// 1 Monkey Application
var monkeyApp = new PIXI.Application(portWidth, portHeight + 100, {
	transparent: true
});
document.getElementById("1Monkey").appendChild(monkeyApp.view);
document.getElementById("monkeySeed").maxLength = seedLength;

var clickMe2 = new PIXI.Text("Click Me!", { font: "20px Futura" });
clickMe2.style.fill = cMap(1);
clickMe2.anchor.x = 0.5;
clickMe2.anchor.y = 0.5;
clickMe2.x = portWidth / 2;
clickMe2.y = 100;

var textBack = new PIXI.Sprite(t_rect);
textBack.scale.x = 100;
textBack.scale.y = 60;
textBack.x = portWidth / 2 - 100 / 2;
textBack.y = 100 - 60 / 2;
textBack.tint = "#000";

let t_colorButton = PIXI.Texture.fromImage("https://s3.us-east-2.amazonaws.com/tomlum/colorIcon.png");
let t_grayButton = PIXI.Texture.fromImage("https://s3.us-east-2.amazonaws.com/tomlum/grayIcon.png");

let colorMode = true;

let bigButton = new PIXI.Sprite(t_clear);
bigButton.interactive = true;
bigButton.on("click", function() {
	randomizeMonkey();
	hideIt(monkeyApp, clickMe2);
	hideIt(monkeyApp, textBack);
});
bigButton.cursor = "pointer";
bigButton.scale.x = portWidth;
bigButton.scale.y = portHeight;
bigButton.alpha = 0;

let colorButton = new PIXI.Sprite(t_colorButton);
colorButton.interactive = true;
colorButton.on("click", swapColorMode);
colorButton.cursor = "pointer";
colorButton.scale.x = 1;
colorButton.scale.y = 1;
colorButton.anchor.x = 0.5;
colorButton.anchor.y = 0.5;
colorButton.x = portWidth / 2;
colorButton.y = 460;

monkeyApp.squares = [];
for (i = 0; i < dimX; i++) {
	for (j = 0; j < dimY; j++) {
		var sqr = new PIXI.Sprite(t_rect);
		sqr.scale.y = pScale2;
		sqr.x = i * pScale2;
		sqr.y = j * pScale2;

		// if (i === 0) {
		// 	sqr.scale.x = -110;
		// 	sqr.x = i * pScale2 + 500 / 2 - portWidth/2 + 10;
		// } else if (i === dimX - 1) {
		// 	sqr.scale.x = 100;
		// } else {
		sqr.scale.x = pScale2;
		// }

		sqr.tint = rgb(255, 0, 0);
		monkeyApp.stage.addChild(sqr);
		monkeyApp.squares[i + dimY * j] = sqr;
	}
}
changeMonkey();
monkeyApp.stage.addChild(textBack);
monkeyApp.stage.addChild(clickMe2);
monkeyApp.stage.addChild(colorButton);
monkeyApp.stage.addChild(bigButton);

function randomizeMonkey() {
	let newSeed = "";
	const rand = new Alea(document.getElementById("monkeySeed").value);
	const newSeedLength = Math.floor(rand() * seedLength) + 1;
	for (let i = 0; i < Math.min(newSeedLength, seedLength); i++) {
		newSeed += chars.charAt(Math.floor(rand() * chars.length));
	}
	document.getElementById("monkeySeed").value = newSeed;
	changeMonkey();
}

// monkeyApp.view.onclick = function() {
// 	randomizeMonkey();
// 	hideIt(monkeyApp, clickMe2);
// 	hideIt(monkeyApp, textBack);
// };

function changeMonkey(see) {
	const seed = see? see : document.getElementById("monkeySeed").value;
	let seedNumber1 = -2147483647;
	let seedNumber2 = 0;
	for (let i = 0; i < Math.min(seed.length, 8); i++) {
		seedNumber1 += seed.charCodeAt(i) * chars.length ** i;
	}
	for (let i = 8; i < seed.length; i++) {
		seedNumber2 += seed.charCodeAt(i) * chars.length ** (i - 8);
	}
	let rand = new Alea(seedNumber1);
	rand = new Alea(seedNumber2 + rand());
	for (j = 0; j < dimY; j++) {
		for (i = 0; i < dimX; i++) {
			const r = rand();
			const g = rand();
			const b = rand();
			const gray = (r + g + b) / 3;
			const index = i + dimY * j;
			monkeyApp.squares[index].colorTint = rgb(r, g, b);
			monkeyApp.squares[index].grayTint = rgb(gray, gray, gray);
			if (colorMode) {
				monkeyApp.squares[index].tint =
					monkeyApp.squares[index].colorTint;
			} else {
				monkeyApp.squares[index].tint =
					monkeyApp.squares[index].grayTint;
			}
		}
	}
}

let firstTime = true
function setHistory(s1, s2, seed) {
	if (firstTime) {
		let history = this.state.history.concat([[s1, s2, seed]]);
		if (history.length > MAXHISTORY) {
			history = history.slice(
				history.length - MAXHISTORY,
				history.length
			);
		}
	} else {
		firstTime--;
	}
};

function getHistory() {
	if (this.state.history.length > 0) {
		const seeds = this.state.history.pop();
		changeMonkey(seeds[2])
		document.getElementById("monkeySeed").value = seeds[2]
	}
};

function swapColorMode() {
	colorMode = !colorMode;
	if (colorMode) {
		for (i = 0; i < dimX; i++) {
			for (j = 0; j < dimY; j++) {
				monkeyApp.squares[i + dimY * j].tint = monkeyApp.squares[
					i + dimY * j
				].tint =
					monkeyApp.squares[i + dimY * j].colorTint;
				colorButton.texture = t_colorButton;
			}
		}
	} else {
		for (i = 0; i < dimX; i++) {
			for (j = 0; j < dimY; j++) {
				monkeyApp.squares[i + dimY * j].tint = monkeyApp.squares[
					i + dimY * j
				].tint =
					monkeyApp.squares[i + dimY * j].grayTint;
				colorButton.texture = t_grayButton;
			}
		}
	}
}

function rgb(r, g, b) {
	return PIXI.utils.rgb2hex([r, g, b]);
}
