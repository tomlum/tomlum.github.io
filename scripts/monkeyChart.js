function shapeBrightData(d) {
	return [
		{
			z: d.x,
			y: d.y,
			x: d.z,
			mode: "markers",
			hoverinfo: "text",
			hoverlabel: {
				bgcolor: "#bbb"
			},
			marker: {
				size: 2,
				color: d.colors,
				line: {
					color: d.colors,
					width: 0.5
				},
				opacity: 1
			},
			type: "scatter3d"
		}
	];
}

function shapeColorData(d) {
	d.colors = d.rs.map((x, i) => {
		return `rgb(${d.rs[i]},${d.gs[i]},${d.bs[i]})`;
	});
	return [
		{
			x: d.rs,
			y: d.gs,
			z: d.bs,
			mode: "markers",
			hoverinfo: "text",
			hoverlabel: {
				bgcolor: "#bbb"
			},
			marker: {
				size: 4,
				color: d.colors,
				line: {
					color: d.colors,
					width: 0.5
				},
				opacity: 1
			},
			type: "scatter3d"
		}
	];
}

const bLayout = {
	autosize: true,
	margin: {
		l: 0,
		r: 0,
		b: 0,
		t: 0,
		pad: 0,
		autoexpand: true
	},
	paper_bgcolor: "rgba(0,0,0,0)",
	scene: {
		camera: {
			eye: {
				x: 2,
				y: 0,
				z: 0
			}
		},
		xaxis: {
			showtitle: false,
			title: "",
			titlefont: { family: "Futura", size: 1 },
			showspikes: false,
			zeroline: true,
			tickmode: "auto",
			nticks: 10,
			range: [0, 1],
			showticklabels: false
		},
		yaxis: {
			visible: false
		},
		zaxis: {
			visible: false
		}
	}
};

const layout = {
	autosize: true,
	margin: {
		l: 0,
		r: 0,
		b: 0,
		t: 0,
		pad: 0,
		autoexpand: true
	},
	paper_bgcolor: "rgba(0,0,0,0)",
	scene: {
		camera: {
			eye: {
				x: 2.2,
				y: 0.5,
				z: 0.5
			}
		},
		xaxis: {
			title: "",
			showtitle: false,
			color: "#f00",
			titlefont: { family: "Futura", size: 20 },
			tickfont: { family: "Futura", size: 10 },
			range: [0, 255],
			showspikes: false,
			zeroline: true,
			ticks: "inside"
		},
		yaxis: {
			title: "",
			showtitle: false,
			color: "#0f0",
			titlefont: { family: "Futura", size: 20 },
			tickfont: { family: "Futura", size: 10 },
			range: [0, 255],
			showspikes: false,
			zeroline: true,
			ticks: "inside"
		},
		zaxis: {
			title: "",
			showtitle: false,
			color: "#00f",
			titlefont: { family: "Futura", size: 20 },
			tickfont: { family: "Futura", size: 10 },
			range: [0, 255],
			showspikes: false,
			zeroline: true,
			ticks: "inside"
		}
	}
};

Plotly.newPlot("blueChart", shapeColorData(cData.blue), layout, {
	
});
Plotly.newPlot("randomChart", shapeColorData(cData.random), layout, {
	
});
Plotly.newPlot("pollockChart", shapeColorData(cData.pollock), layout, {
	
});
Plotly.newPlot("obamaChart", shapeColorData(cData.obama), layout, {
	
});

Plotly.newPlot("blueChart2", shapeBrightData(bData.blue), bLayout, {
	
});
Plotly.newPlot("randomChart2", shapeBrightData(bData.random), bLayout, {
	
});
Plotly.newPlot("pollockChart2", shapeBrightData(bData.pollock), bLayout, {
	
});
Plotly.newPlot("obamaChart2", shapeBrightData(bData.obama), bLayout, {
	
});

let spinT = 0;
let spinT2 = 0;
const spinterval = Math.PI / 180;

function resetCharts() {
	resetChart("obamaChart");
	resetChart("randomChart");
	resetChart("pollockChart");
}

function resetCharts2() {
	resetChart2("obamaChart2");
	resetChart2("randomChart2");
	resetChart2("pollockChart2");
}

function resetChart(chart) {
	const scene = document.getElementById(chart)._fullLayout["scene"]._scene;
	const camera = scene.getCamera();

	camera.eye = {
		x: 2.2,
		y: 0.5,
		z: 0.5
	};

	scene.setCamera(camera);
	spinT = 100000;
}
function resetChart2(chart) {
	const scene = document.getElementById(chart)._fullLayout["scene"]._scene;
	const camera = scene.getCamera();

	camera.eye = {
		x: 2,
		y: 0,
		z: 0
	};

	scene.setCamera(camera);
	spinT2 = 100000;
}

function spinCharts() {
	document.getElementById("spinButton").disabled = true;
	rotate("obamaChart", spinterval);
	rotate("randomChart", spinterval);
	rotate("pollockChart", spinterval);
	spinT += spinterval;
	if (spinT < Math.PI * 2) {
		requestAnimationFrame(spinCharts);
	} else {
		document.getElementById("spinButton").disabled = false;
		spinT = 0;
	}
}

function spinCharts2() {
	document.getElementById("spinButton2").disabled = true;
	rotate("obamaChart2", spinterval);
	rotate("randomChart2", spinterval);
	rotate("pollockChart2", spinterval);
	spinT2 += spinterval;
	if (spinT2 < Math.PI * 2) {
		requestAnimationFrame(spinCharts2);
	} else {
		spinT2 = 0;
		document.getElementById("spinButton2").disabled = false;
	}
}

function rotate(chart, angle) {
	const scene = document.getElementById(chart)._fullLayout["scene"]._scene;
	const camera = scene.getCamera();

	const rtz = xyz2rtz(camera.eye);

	rtz.t += angle;

	camera.eye = rtz2xyz(rtz);

	scene.setCamera(camera);
}

function xyz2rtz(xyz) {
	return {
		r: Math.sqrt(xyz.x * xyz.x + xyz.y * xyz.y),
		t: Math.atan2(xyz.y, xyz.x),
		z: xyz.z
	};
}

function rtz2xyz(rtz) {
	return {
		x: rtz.r * Math.cos(rtz.t),
		y: rtz.r * Math.sin(rtz.t),
		z: rtz.z
	};
}
