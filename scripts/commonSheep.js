const size1 = 28;
const pScale1 = 10;

const chr = chroma.scale("viridis");
function cMap(val) {
	return PIXI.utils.rgb2hex([
		chr(val)._rgb[0] / 255,
		chr(val)._rgb[1] / 255,
		chr(val)._rgb[2] / 255
	]);
}

const model = new KerasJS.Model({
	filepaths: {
		model: "/data/sheep_model.json",
		weights: "/data/sheep_model_weights.buf",
		metadata: "/data/sheep_model_metadata.json"
	},
	gpu: false
});

function forwardPass(app, input, history) {
	app = app ? app : sheepApp;
	input = input ? input : currentNum;
	model
		.ready()
		.then(() => {
			// input data object keyed by names of the input layers
			// or `input` for Sequential models
			// values are the flattened Float32Array data
			// (input tensor shapes are specified in the model config)
			const inputData = {
				input: input
			};

			// make predictions
			return model.predict(inputData);
		})
		.then(outputData => {
			drawNet(app, outputData.output);
			if (history) {
				lastNum = currentNum;
				currentNum = outputData.output;
			}
		})
		.catch(err => {
			// handle error
		});
}

function drawNet(app, data) {
	for (i = 0; i < size1; i++) {
		for (j = 0; j < size1; j++) {
			if (
				Math.sqrt(
					Math.pow(i + 0.5 - 14, 2) + Math.pow(j + 0.5 - 14, 2)
				) < 14
			) {
				const val = data[i + size1 * j];
				app.squares[i + size1 * j].tint = cMap(val);
			}
		}
	}
}
