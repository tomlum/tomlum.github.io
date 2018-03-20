const pScale2 = 4.5;
const dimX = 70;
const dimY = Math.floor(70 * 1.3);
const portWidth = Math.floor(dimX * pScale2);
const portHeight = Math.floor(dimY * pScale2);
const seedLength = 10;
const chars =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?., ";

let firstTime = 2;

let history = [];
const MAXHISTORY = 25;

let oldSeed;
let seed = "";

let playing = false;
let playInterval;

// 1 Monkey Application
var monkeyApp = new PIXI.Application(portWidth, portHeight + 100, {
	transparent: true
});
document.getElementById("1monkey").appendChild(monkeyApp.view);

document.getElementById("monkeySeed").maxLength = seedLength;

var clickMe2 = new PIXI.Text("Click Me!", { font: "20px Futura" });
clickMe2.style.fill = "#FF0"
clickMe2.anchor.x = 0.5;
clickMe2.anchor.y = 0.5;
clickMe2.x = portWidth / 2;
clickMe2.y = 150;

var textBack = new PIXI.Sprite(t_rect);
textBack.scale.x = 100;
textBack.scale.y = 60;
textBack.x = portWidth / 2 - 100 / 2;
textBack.y = 150 - 60 / 2;
textBack.tint = "#000";

let t_colorButton = PIXI.Texture.fromImage("/assets/colorIcon.png");
let t_grayButton = PIXI.Texture.fromImage("/assets/grayIcon.png");

let t_playButton = PIXI.Texture.fromImage("/assets/playIconOff.png");
let t_pauseButton = PIXI.Texture.fromImage("/assets/playIconOn.png");

let bigButton = new PIXI.Sprite(t_clear);
bigButton.interactive = true;
bigButton.on("pointerdown", function() {
	randomizeMonkey();
	hideIt(monkeyApp, clickMe2);
	hideIt(monkeyApp, textBack);
});
bigButton.cursor = "pointer";
bigButton.scale.x = portWidth;
bigButton.scale.y = portHeight;
bigButton.alpha = 0;

let colorMode = true;

const yOffset = 0;

let colorButton = new PIXI.Sprite(t_colorButton);
colorButton.interactive = true;
colorButton.on("pointerdown", swapColorMode);
colorButton.cursor = "pointer";
colorButton.scale.x = 1;
colorButton.scale.y = 1;
colorButton.anchor.x = 0.5;
colorButton.anchor.y = 0.5;
colorButton.x = portWidth / 2;
colorButton.y = 460 + yOffset;

let backButton = new PIXI.Sprite.fromImage("/assets/backIcon.png");
backButton.interactive = true;
backButton.on("pointerdown", getHistory);
backButton.cursor = "pointer";
backButton.scale.x = 1;
backButton.scale.y = 1;
backButton.anchor.x = 0.5;
backButton.anchor.y = 0.5;
backButton.x = portWidth / 2 - 100;
backButton.y = 460 + yOffset;

let backButtonEnd = new PIXI.Sprite.fromImage("/assets/backIconEnd.png");
backButtonEnd.interactive = true;
backButtonEnd.on("pointerdown", getHistory);
backButtonEnd.cursor = "pointer";
backButtonEnd.scale.x = 1;
backButtonEnd.scale.y = 1;
backButtonEnd.anchor.x = 0.5;
backButtonEnd.anchor.y = 0.5;
backButtonEnd.startX = portWidth / 2 - 100;
backButtonEnd.x = portWidth / 2 - 100;
backButtonEnd.y = 460 + yOffset;

let backButtonExtend = new PIXI.Sprite(t_rect);
backButtonExtend.interactive = true;
backButtonExtend.on("pointerdown", getHistory);
backButtonExtend.cursor = "pointer";
backButtonExtend.scale.startX = 6;
backButtonExtend.scale.x = 6;
backButtonExtend.scale.y = 6;
backButtonExtend.anchor.x = 0;
backButtonExtend.anchor.y = 0.5;
backButtonExtend.startX = portWidth / 2 - 92;
backButtonExtend.x = portWidth / 2 - 100;
backButtonExtend.y = 460 + yOffset + 20;

let playButton = new PIXI.Sprite(t_playButton);
playButton.interactive = true;
playButton.on("pointerdown", togglePlay);
playButton.cursor = "pointer";
playButton.scale.x = 1;
playButton.scale.y = 1;
playButton.anchor.x = 0.5;
playButton.anchor.y = 0.5;
playButton.x = portWidth / 2 + 100;
playButton.y = 460 + yOffset;

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
setMonkey();
monkeyApp.stage.addChild(textBack);
monkeyApp.stage.addChild(clickMe2);
monkeyApp.stage.addChild(bigButton);
monkeyApp.stage.addChild(colorButton);
monkeyApp.stage.addChild(backButton);
monkeyApp.stage.addChild(backButtonEnd);
monkeyApp.stage.addChild(backButtonExtend);
monkeyApp.stage.addChild(playButton);

function randomizeMonkey() {
	setHistory(document.getElementById("monkeySeed").value);
	let newSeed = "";
	const rand = firstTime
		? new Alea(Math.random())
		: new Alea(document.getElementById("monkeySeed").value);

	for (let i = 0; i < seedLength; i++) {
		newSeed += chars.charAt(Math.floor(rand() * chars.length));
	}
	document.getElementById("monkeySeed").value = newSeed;
	setMonkey();
}

// monkeyApp.view.onclick = function() {
// 	randomizeMonkey();
// 	hideIt(monkeyApp, clickMe2);
// 	hideIt(monkeyApp, textBack);
// };

// Called when entering custom seed on form
function changeMonkey() {
	setHistory();
	setMonkey();
	
	hideIt(monkeyApp, textBack);
	hideIt(monkeyApp, clickMe2);
}

function setMonkey(see) {
	oldSeed = seed;
	seed = see ? see : document.getElementById("monkeySeed").value;

	let seedNumber1 = -2147483647;
	let seedNumber2 = -2147483647;
	for (let i = 0; i < Math.min(seed.length, 8); i++) {
		seedNumber1 += seed.charCodeAt(i) * chars.length ** i;
	}
	for (let i = 8; i < seed.length; i++) {
		seedNumber2 += seed.charCodeAt(i) * chars.length ** (i - 8);
	}
	const rand1 = new Alea(seedNumber1 + seedNumber2);
	let rand = new Alea(seedNumber2 + rand1());
	for (j = 0; j < dimY; j++) {
		rand = new Alea(seedNumber2 + rand1());
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

function setHistory() {
	if (firstTime <= 1) {
		history.push(seed);
		if (history.length > MAXHISTORY) {
			history = history.slice(
				history.length - MAXHISTORY,
				history.length
			);
		}
	} else {
		firstTime--;
	}
	backButtonEnd.x =
		backButtonEnd.startX - history.length * (33 / (MAXHISTORY + 1));
	backButtonExtend.x =
		backButtonExtend.startX - history.length * (33 / (MAXHISTORY + 1));
	backButtonExtend.scale.x =
		backButtonExtend.scale.startX +
		history.length * (33 / (MAXHISTORY + 1));
}

function getHistory() {
	if (history.length > 0) {
		const seed = history.pop();
		setMonkey(seed, true);
		document.getElementById("monkeySeed").value = seed;
	}
	backButtonEnd.x =
		backButtonEnd.startX - history.length * (33 / (MAXHISTORY + 1));
	backButtonExtend.x =
		backButtonExtend.startX - history.length * (33 / (MAXHISTORY + 1));
	backButtonExtend.scale.x =
		backButtonExtend.scale.startX +
		history.length * (33 / (MAXHISTORY + 1));
}

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

function togglePlay() {
	playing = !playing;
	hideIt(monkeyApp, textBack);
	hideIt(monkeyApp, clickMe2);
	if (playing) {
		playButton.texture = t_pauseButton;
		keepPlaying();
	} else {
		playButton.texture = t_playButton;
		clearInterval(playInterval);
	}
}

function keepPlaying() {
	if (playing) {
		randomizeMonkey();
		clearInterval(playInterval);
		playInterval = setInterval(keepPlaying, 1300);
	}
}

function rgb(r, g, b) {
	return PIXI.utils.rgb2hex([r, g, b]);
}
