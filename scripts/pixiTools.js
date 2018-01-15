const t_rect = PIXI.Texture.fromImage("assets/square.png");
const t_clear = PIXI.Texture.fromImage("assets/clear.png");

function hideIt(app, thing) {
	if (thing.alpha == 1) {
		app.ticker.add(function(delta) {
			thing.alpha -= 0.1 * delta;
		});
	}
}

function cMap(val) {
	return PIXI.utils.rgb2hex([
		chr(val)._rgb[0] / 255,
		chr(val)._rgb[1] / 255,
		chr(val)._rgb[2] / 255
	]);
}

const chr = chroma.scale("viridis");
