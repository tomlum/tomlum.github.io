let currentNum = zeroNum;
let lastNum = currentNum;


const sheepApp = new PIXI.Application(pScale1 * size1, pScale1 * size1, {
	transparent: true
});

//Add the canvas to the HTML documents
document.getElementById("CountSheep").appendChild(sheepApp.view);

let bigSheepButton = new PIXI.Sprite(t_clear);
bigSheepButton.interactive = true;
bigSheepButton.on("pointerdown", function() {
	hideIt(sheepApp, clickMe);
	forwardPass(sheepApp, currentNum, "history");
	show("backArrow", 0.1);
});

sheepApp.squares = [];
for (i = 0; i < size1; i++) {
	for (j = 0; j < size1; j++) {
		if (
			Math.sqrt(Math.pow(i + 0.5 - 14, 2) + Math.pow(j + 0.5 - 14, 2)) <
			14
		) {
			let sqr = new PIXI.Sprite(t_rect);
			sqr.scale.x = pScale1;
			sqr.scale.y = pScale1;
			sqr.interactive = true;
			sqr.cursor = "pointer";
			sqr.x = i * pScale1;
			sqr.y = j * pScale1;
			sqr.tint = cMap(0);
			sheepApp.stage.addChild(sqr);
			sheepApp.squares[i + size1 * j] = sqr;
		}
	}
}

bigSheepButton.cursor = "pointer";
bigSheepButton.scale.x = pScale1 * size1;
bigSheepButton.scale.y = pScale1 * size1;
bigSheepButton.alpha = 0;
sheepApp.stage.addChild(bigSheepButton);

let clickMe = new PIXI.Text("Click Me!", { font: "20px Futura" });
clickMe.style.fill = cMap(1);
clickMe.anchor.x = 0.5;
clickMe.anchor.y = 0.5;
clickMe.x = pScale1 * 14;
clickMe.y = 25;
sheepApp.stage.addChild(clickMe);

function sheepBack() {
	if (lastNum) {
		hide("backArrow", 0.1);
		currentNum = lastNum;
		drawNet(sheepApp, currentNum);
		lastNum = null;
	}
}

function sheepReset() {
	hide("backArrow", 0.1);
	lastNum = null;
	currentNum = zeroNum;
	drawNet(sheepApp, currentNum);
}

drawNet(sheepApp, currentNum);
