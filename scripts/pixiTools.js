const t_rect = PIXI.Texture.fromImage("/assets/square.png");
const t_clear = PIXI.Texture.fromImage("/assets/clear.png");

function hideIt(app, thing) {
	if (thing.alpha == 1) {
		app.ticker.add(function(delta) {
			thing.alpha -= 0.1 * delta;
		});
	}
}
