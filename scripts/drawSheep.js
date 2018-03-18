const drawApp = new PIXI.Application(pScale1 * size1, pScale1 * size1, {
	transparent: true
});
const responseApp = new PIXI.Application(pScale1 * size1, pScale1 * size1, {
	transparent: true
});

document.getElementById("CountDrawing").appendChild(drawApp.view);
document.getElementById("CountResponse").appendChild(responseApp.view);

drawApp.squares = [];
drawApp.input = new Float32Array(784);
for (i = 0; i < size1; i++) {
	for (j = 0; j < size1; j++) {
		if (
			Math.sqrt(Math.pow(i + 0.5 - 14, 2) + Math.pow(j + 0.5 - 14, 2)) <
			14
		) {
			let sqr = new PIXI.Sprite(t_rect);
			sqr.scale.x = pScale1;
			sqr.scale.y = pScale1;
			sqr.x = i * pScale1;
			sqr.y = j * pScale1;
			sqr.tint = cMap(0);
			drawApp.stage.addChild(sqr);
			drawApp.squares[i + size1 * j] = sqr;
		}
	}
}

responseApp.squares = [];
for (i = 0; i < size1; i++) {
	for (j = 0; j < size1; j++) {
		if (
			Math.sqrt(Math.pow(i + 0.5 - 14, 2) + Math.pow(j + 0.5 - 14, 2)) <
			14
		) {
			let sqr = new PIXI.Sprite(t_rect);
			sqr.scale.x = pScale1;
			sqr.scale.y = pScale1;
			sqr.x = i * pScale1;
			sqr.y = j * pScale1;
			sqr.tint = cMap(0);
			responseApp.stage.addChild(sqr);
			responseApp.squares[i + size1 * j] = sqr;
		}
	}
}


let mouseDown = false;
for (i = 0; i < size1; i++) {
	for (j = 0; j < size1; j++) {
		if (
			Math.sqrt(Math.pow(i + 0.5 - 14, 2) + Math.pow(j + 0.5 - 14, 2)) <
			14
		) {
			let sqr = new PIXI.Sprite(t_rect);
			sqr.scale.x = pScale1;
			sqr.scale.y = pScale1;
			sqr.x = i * pScale1;
			sqr.y = j * pScale1;
			sqr.interactive = true;
			sqr.cursor = "crosshair";
			sqr.on("pointerdown", mDown);
			sqr.on("pointerup", mUp);
			sqr.on("pointerupoutside", mUp);
			if ((i == 10) & (j == 10)) {
				sqr.on("pointermove", paint);
			}
			sqr.tint = cMap(0);
			drawApp.stage.addChild(sqr);
			drawApp.squares[i + size1 * j] = sqr;
		}
	}
}


let drawHere = new PIXI.Text("Draw Here!", { font: "25px Futura" });
drawHere.style.fill = cMap(1);
drawHere.anchor.x = 0.5;
drawHere.anchor.y = 0.5;
drawHere.x = pScale1 * 14;
drawHere.y = pScale1 * 14;
drawApp.stage.addChild(drawHere);

let resetDrawingButton = new PIXI.Sprite.fromImage("/assets/resetDrawing.png");
resetDrawingButton.interactive = true;
resetDrawingButton.on("pointerdown", resetDrawing);
resetDrawingButton.x = pScale1 * 28 - 40;
resetDrawingButton.y = pScale1 * 28 - 45;
resetDrawingButton.cursor = "pointer";
drawApp.stage.addChild(resetDrawingButton);

function mDown() {
	if (drawHere.alpha == 1) {
		drawApp.ticker.add(function(delta) {
			drawHere.alpha -= 0.1 * delta;
		});
	}
	mouseDown = true;
	this.tint = cMap(1);
	drawApp.input[
		Math.floor(this.x / pScale1) + size1 * Math.floor(this.y / pScale1)
	] = 1;
}

function mUp() {
	mouseDown = false;
	forwardPass(responseApp, drawApp.input);
}

const drawAppWidth = size1 * pScale1;
function paint(event) {
	if (
		mouseDown &
		(event.data.global.x > 0) &
		(event.data.global.x < drawAppWidth) &
		(event.data.global.y > 0) &
		(event.data.global.y < drawAppWidth)
	) {
		const pos =
			Math.floor(event.data.global.x / pScale1) +
			size1 * Math.floor(event.data.global.y / pScale1);
		if (drawApp.squares[pos] != undefined) {
			drawApp.input[pos] = 1;
			drawApp.squares[pos].tint = cMap(1);
		}
	}
}

function resetDrawing() {
	for (i = 0; i < size1; i++) {
		for (j = 0; j < size1; j++) {
			if (
				Math.sqrt(
					Math.pow(i + 0.5 - 14, 2) + Math.pow(j + 0.5 - 14, 2)
				) < 14
			) {
				drawApp.input[i + size1 * j] = 0;
				drawApp.squares[i + size1 * j].tint = cMap(0);
				responseApp.squares[i + size1 * j].tint = cMap(0);
			}
		}
	}
}