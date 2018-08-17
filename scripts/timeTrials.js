// Oh no, you're looking at the code.
// This was made for a game jam in less than a week,
// so it's just about the ugliest code you're ever going to see.
// Sorry about that ¯\_(ツ)_/¯

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

function add(app, child) {
	app.stage.addChild(child);
}

const mod = function(n, m) {
	var remain = n % m;
	return Math.floor(remain >= 0 ? remain : remain + m);
};

function between(x, min, max) {
	return Math.min(Math.max(x, min), max);
}

const pi2 = Math.PI * 2;
const piHour = pi2 / 24;
const width = 500;
const height = 281;

const dayTime = 0.01;

const dotColors = {
	red: PIXI.utils.rgb2hex([1, 0, 0]),
	green: PIXI.utils.rgb2hex([0, 1, 0]),
	gray: PIXI.utils.rgb2hex([0.25, 0.25, 0.25])
};

PIXI.settings.RESOLUTION = 3;

const t_on = PIXI.Texture.fromImage("/assets/timeTrials/onSwitch.png");
const t_off = PIXI.Texture.fromImage("/assets/timeTrials/offSwitch.png");
const t_go = PIXI.Texture.fromImage("/assets/timeTrials/go.png");
const t_stop = PIXI.Texture.fromImage("/assets/timeTrials/stop.png");
const t_person = PIXI.Texture.fromImage("/assets/timeTrials/person.png");
const t_square = PIXI.Texture.fromImage("/assets/square.png");
const t_drumUp = PIXI.Texture.fromImage("/assets/timeTrials/drumUp.png");
const t_drumDown = PIXI.Texture.fromImage("/assets/timeTrials/drumDown.png");
const t_lightSwitchOff = PIXI.Texture.fromImage(
	"/assets/timeTrials/lightSwitchOff.png"
);
const t_lightSwitchOn = PIXI.Texture.fromImage(
	"/assets/timeTrials/lightSwitchOn.png"
);
function init1() {
	const s_switch1 = new PIXI.Sprite(t_off);
	s_switch1.cursor = "pointer";
	s_switch1.anchor.x = 1;
	s_switch1.anchor.y = 0;
	s_switch1.scale.x = 1.5;
	s_switch1.scale.y = 1.5;
	s_switch1.x = width;
	s_switch1.y = 0;
	s_switch1.interactive = true;

	const s_person1 = new PIXI.Sprite(t_person);
	s_person1.anchor.x = 0.5;
	s_person1.anchor.y = 1;
	s_person1.scale.x = 1;
	s_person1.scale.y = 1;
	s_person1.x = width / 2 - 100;
	s_person1.y = height / 2 + 100 + 30;

	const s_bacteria1 = PIXI.Sprite.fromImage("/assets/timeTrials/bacteria.png");
	s_bacteria1.anchor.x = 0.5;
	s_bacteria1.anchor.y = 1;
	s_bacteria1.scale.x = 1;
	s_bacteria1.scale.y = 1;
	s_bacteria1.x = width / 2 + 100;
	s_bacteria1.y = height / 2 + 100 + 30;

	const s_sky1 = PIXI.Sprite.fromImage("/assets/timeTrials/sky.png");
	s_sky1.anchor.x = 0.5;
	s_sky1.anchor.y = 0.5;
	s_sky1.scale.x = 2.5;
	s_sky1.scale.y = 2.5;
	s_sky1.x = width / 2;
	s_sky1.y = height;

	s_person1.sun = PIXI.Sprite.fromImage("/assets/timeTrials/sun.png");
	s_person1.sun.anchor.x = 0.5;
	s_person1.sun.anchor.y = 1;
	s_person1.sun.scale.x = 1;
	s_person1.sun.scale.y = 1;
	s_person1.sun.x = width / 2 - 100;
	s_person1.sun.y = height / 2 - 20 + 30;
	s_bacteria1.sun = PIXI.Sprite.fromImage("/assets/timeTrials/sun.png");
	s_bacteria1.sun.anchor.x = 0.5;
	s_bacteria1.sun.anchor.y = 1;
	s_bacteria1.sun.scale.x = 1;
	s_bacteria1.sun.scale.y = 1;
	s_bacteria1.sun.x = width / 2 + 100;
	s_bacteria1.sun.y = height / 2 + 40 + 30;

	const ratio = width / height;

	const TT1 = new PIXI.Application(width, height, {
		transparent: true
	});
	document.getElementById("tt1").appendChild(TT1.view);

	const s_day1 = new PIXI.Text("Day 0", { font: "20px Futura" });
	s_day1.style.fill = "#979";
	s_day1.anchor.x = 1;
	s_day1.anchor.y = 0;
	s_day1.x = width - 40;
	s_day1.y = 10;

	add(TT1, s_sky1);
	add(TT1, s_person1);
	add(TT1, s_bacteria1);
	add(TT1, s_switch1);
	add(TT1, s_person1.sun);
	add(TT1, s_bacteria1.sun);
	add(TT1, s_day1);

	s_switch1.on("pointerdown", function() {
		TT1.start = !TT1.start;
		if (TT1.start) {
			s_switch1.texture = t_on;
		} else {
			s_switch1.texture = t_off;
		}
	});

	TT1.time = 0;
	TT1.day = 0;
	TT1.start = false;

	s_person1.decision = 0;
	s_bacteria1.decision = (Math.random() - 0.5) * piHour;

	TT1.ticker.add(function(delta) {
		if (TT1.start) {
			TT1.time += delta;
			s_sky1.rotation = TT1.time * dayTime;

			if (
				TT1.time > 10 &&
				mod((TT1.time - delta) * dayTime + s_person1.decision, pi2) >
					mod(TT1.time * dayTime + s_person1.decision, pi2)
			) {
				s_person1.decisionTimer = 1;
			}
			if (
				TT1.time > 10 &&
				mod((TT1.time - delta) * dayTime + s_bacteria1.decision, pi2) >
					mod(TT1.time * dayTime + s_bacteria1.decision, pi2)
			) {
				s_bacteria1.decisionTimer = 1;
				s_bacteria1.decision = (Math.random() - 0.5) * piHour;
			}

			if (s_person1.decisionTimer > 0) {
				s_person1.decisionTimer++;
				s_person1.decisionTimer;
				s_person1.sun.x = width / 2 - 100;
				if (s_person1.decisionTimer > 50) {
					s_person1.decisionTimer = -1;
				}
			} else {
				s_person1.sun.x = -200;
			}
			if (s_bacteria1.decisionTimer > 0) {
				s_bacteria1.decisionTimer++;
				s_bacteria1.decisionTimer;
				s_bacteria1.sun.x = width / 2 + 100;
				if (s_bacteria1.decisionTimer > 50) {
					s_bacteria1.decisionTimer = -1;
				}
			} else {
				s_bacteria1.sun.x = -200;
			}

			if (
				mod((TT1.time - delta) * dayTime, pi2) > mod(TT1.time * dayTime, pi2)
			) {
				TT1.day++;
				s_day1.setText("Day " + TT1.day);
			}
		}
	});
}

init1();

function init_2() {
	const s_switch_2 = new PIXI.Sprite(t_off);
	s_switch_2.cursor = "pointer";
	s_switch_2.anchor.x = 1;
	s_switch_2.anchor.y = 0;
	s_switch_2.scale.x = 1.5;
	s_switch_2.scale.y = 1.5;
	s_switch_2.x = width;
	s_switch_2.y = 0;
	s_switch_2.interactive = true;

	const s_person_2 = new PIXI.Sprite(t_person);
	s_person_2.anchor.x = 0.5;
	s_person_2.anchor.y = 1;
	s_person_2.scale.x = 1;
	s_person_2.scale.y = 1;
	s_person_2.x = width / 2 - 100;
	s_person_2.y = height / 2 + 100 + 30;

	const s_bacteria_2 = PIXI.Sprite.fromImage("/assets/timeTrials/bacteria.png");
	s_bacteria_2.anchor.x = 0.5;
	s_bacteria_2.anchor.y = 1;
	s_bacteria_2.scale.x = 1;
	s_bacteria_2.scale.y = 1;
	s_bacteria_2.x = width / 2 + 100;
	s_bacteria_2.y = height / 2 + 100 + 30;

	const s_sky_2 = PIXI.Sprite.fromImage("/assets/timeTrials/sky.png");
	s_sky_2.anchor.x = 0.5;
	s_sky_2.anchor.y = 0.5;
	s_sky_2.scale.x = 2.5;
	s_sky_2.scale.y = 2.5;
	s_sky_2.x = width / 2;
	s_sky_2.y = height;

	s_person_2.sun = PIXI.Sprite.fromImage("/assets/timeTrials/sun.png");
	s_person_2.sun.anchor.x = 0.5;
	s_person_2.sun.anchor.y = 1;
	s_person_2.sun.scale.x = 1;
	s_person_2.sun.scale.y = 1;
	s_person_2.sun.x = width / 2 - 100;
	s_person_2.sun.y = height / 2 - 20 + 30;
	s_bacteria_2.sun = PIXI.Sprite.fromImage("/assets/timeTrials/sun.png");
	s_bacteria_2.sun.anchor.x = 0.5;
	s_bacteria_2.sun.anchor.y = 1;
	s_bacteria_2.sun.scale.x = 1;
	s_bacteria_2.sun.scale.y = 1;
	s_bacteria_2.sun.x = width / 2 + 100;
	s_bacteria_2.sun.y = height / 2 + 40 + 30;

	const s_box_2 = PIXI.Sprite.fromImage("/assets/timeTrials/box.png");
	s_box_2.anchor.x = 0.5;
	s_box_2.anchor.y = 0.9;
	s_box_2.scale.x = 2.5;
	s_box_2.scale.y = 2.5;
	s_box_2.x = width / 2;
	s_box_2.y = height;

	const ratio = width / height;

	const TT_2 = new PIXI.Application(width, height, {
		transparent: true
	});
	document.getElementById("tt_2").appendChild(TT_2.view);

	const s_day_2 = new PIXI.Text("Day 0", { font: "20px Futura" });
	s_day_2.style.fill = "#979";
	s_day_2.anchor.x = 1;
	s_day_2.anchor.y = 0;
	s_day_2.x = width - 30;
	s_day_2.y = 10;

	add(TT_2, s_sky_2);
	add(TT_2, s_box_2);
	add(TT_2, s_person_2);
	add(TT_2, s_bacteria_2);
	add(TT_2, s_switch_2);
	add(TT_2, s_person_2.sun);
	add(TT_2, s_bacteria_2.sun);
	add(TT_2, s_day_2);

	s_switch_2.on("pointerdown", function() {
		TT_2.start = !TT_2.start;
		if (TT_2.start) {
			s_switch_2.texture = t_on;
		} else {
			s_switch_2.texture = t_off;
		}
	});

	TT_2.time = 0;
	TT_2.day = 0;
	TT_2.start = false;

	s_person_2.decision = 28 * piHour;
	s_person_2.decisionDay = 0;
	s_bacteria_2.decision = 26 * piHour;
	s_bacteria_2.decisionDay = 0;

	TT_2.ticker.add(function(delta) {
		if (TT_2.start) {
			TT_2.time += delta;
			s_sky_2.rotation = TT_2.time * dayTime;

			if (TT_2.time > 10 && s_sky_2.rotation > s_person_2.decision) {
				s_person_2.decisionTimer = 1;
				s_person_2.decision =
					s_person_2.decision + piHour * 28 + (Math.random() - 0.5) * piHour;
				s_person_2.decisionDay++;
			}
			if (TT_2.time > 10 && s_sky_2.rotation > s_bacteria_2.decision) {
				s_bacteria_2.decisionTimer = 1;
				s_bacteria_2.decision =
					s_bacteria_2.decision + piHour * 26 + (Math.random() - 0.5) * piHour;
				s_bacteria_2.decisionDay++;
			}

			if (s_person_2.decisionTimer > 0) {
				s_person_2.decisionTimer++;
				s_person_2.decisionTimer;
				s_person_2.sun.x = width / 2 - 100;
				if (s_person_2.decisionTimer > 50) {
					s_person_2.decisionTimer = -1;
				}
			} else {
				s_person_2.sun.x = -200;
			}
			if (s_bacteria_2.decisionTimer > 0) {
				s_bacteria_2.decisionTimer++;
				s_bacteria_2.decisionTimer;
				s_bacteria_2.sun.x = width / 2 + 100;
				if (s_bacteria_2.decisionTimer > 50) {
					s_bacteria_2.decisionTimer = -1;
				}
			} else {
				s_bacteria_2.sun.x = -200;
			}

			if (
				mod((TT_2.time - delta) * dayTime, pi2) > mod(TT_2.time * dayTime, pi2)
			) {
				TT_2.day++;
				s_day_2.setText("Day " + TT_2.day);
			}
		}
	});
}

init_2();

function init_3() {
	const ratio = width / height;

	const TT_3 = new PIXI.Application(width, height, {
		transparent: true
	});
	document.getElementById("tt_3").appendChild(TT_3.view);

	const s_switch_3 = new PIXI.Sprite(t_off);
	s_switch_3.cursor = "pointer";
	s_switch_3.anchor.x = 1;
	s_switch_3.anchor.y = 0;
	s_switch_3.scale.x = 1.5;
	s_switch_3.scale.y = 1.5;
	s_switch_3.x = width;
	s_switch_3.y = 0;
	s_switch_3.interactive = true;

	s_switch_3.on("pointerdown", function() {
		TT_3.start = !TT_3.start;
		if (TT_3.start) {
			s_switch_3.texture = t_on;
		} else {
			s_switch_3.texture = t_off;
		}
	});
	TT_3.start = false;

	const s_background_3 = new PIXI.Sprite(t_square);
	s_background_3.anchor.x = 0;
	s_background_3.anchor.y = 0;
	s_background_3.scale.x = width;
	s_background_3.scale.y = height;
	s_background_3.x = 0;
	s_background_3.y = 0;
	s_background_3.interactive = true;

	const s_area_3 = new PIXI.Sprite(t_square);
	s_area_3.tint = PIXI.utils.rgb2hex([0.25, 0.25, 0.25]);
	s_area_3.anchor.x = 0.5;
	s_area_3.anchor.y = 0.5;
	s_area_3.scale.x = width - 100;
	s_area_3.scale.y = height - 100;
	s_area_3.x = width / 2;
	s_area_3.y = height / 2 - 35;
	s_area_3.interactive = true;

	const s_dot_3 = PIXI.Sprite.fromImage("/assets/timeTrials/stop.png");
	s_dot_3.anchor.x = 0.9;
	s_dot_3.anchor.y = 0.9;
	s_dot_3.scale.x = 2;
	s_dot_3.scale.y = 2;
	s_dot_3.x = width / 2;
	s_dot_3.y = height / 2;
	s_dot_3.interactive = true;

	let mOldX_3 = 0;
	let mOldY_3 = 0;
	let stillTimer_3 = 0;

	const moveHandler = event => {
		if (
			TT_3.start &&
			between(
				event.data.global.x,
				width / 2 - (width / 2 - 50) + 27,
				width / 2 + (width / 2 - 50) - 3
			) &&
			between(
				event.data.global.y,
				height / 2 - (height / 2 - 50) - 35 + 27,
				height / 2 + (height / 2 - 50) - 35 - 3
			)
		) {
			if (s_dot_3.kind != "green") {
				s_dot_3.texture = t_go;
			}
			s_dot_3.kind = "green";
			s_dot_3.x = between(
				event.data.global.x,
				width / 2 - (width / 2 - 50) + 27,
				width / 2 + (width / 2 - 50) - 3
			);
			s_dot_3.y = between(
				event.data.global.y,
				height / 2 - (height / 2 - 50) - 35 + 27,
				height / 2 + (height / 2 - 50) - 35 - 3
			);
			stillTimer_3 = 6;
		}
	};
	s_background_3.on("pointermove", moveHandler);

	add(TT_3, s_background_3);
	add(TT_3, s_area_3);
	add(TT_3, s_dot_3);
	add(TT_3, s_switch_3);

	TT_3.ticker.add(function(delta) {
		if (TT_3.start) {
			if (stillTimer_3 <= 0) {
				if (s_dot_3.kind != "red") {
					s_dot_3.texture = t_stop;
				}
				s_dot_3.kind = "red";
			} else {
				stillTimer_3--;
			}
		}
	});
}

init_3();

function init_4() {
	const ratio = width / height;

	const TT_4 = new PIXI.Application(width, height, {
		transparent: true
	});
	document.getElementById("tt_4").appendChild(TT_4.view);

	const s_switch_4 = new PIXI.Sprite(t_off);
	s_switch_4.cursor = "pointer";
	s_switch_4.anchor.x = 1;
	s_switch_4.anchor.y = 0;
	s_switch_4.scale.x = 1.5;
	s_switch_4.scale.y = 1.5;
	s_switch_4.x = width;
	s_switch_4.y = 0;
	s_switch_4.interactive = true;

	s_switch_4.on("pointerdown", function() {
		TT_4.start = !TT_4.start;
		if (TT_4.start) {
			s_switch_4.texture = t_on;
		} else {
			s_switch_4.texture = t_off;
		}
	});
	TT_4.start = false;

	const s_background_4 = new PIXI.Sprite(t_square);
	s_background_4.anchor.x = 0;
	s_background_4.anchor.y = 0;
	s_background_4.scale.x = width;
	s_background_4.scale.y = height;
	s_background_4.x = 0;
	s_background_4.y = 0;
	s_background_4.interactive = true;

	const s_area_4 = new PIXI.Sprite(t_square);
	s_area_4.tint = PIXI.utils.rgb2hex([0.25, 0.25, 0.25]);
	s_area_4.anchor.x = 0.5;
	s_area_4.anchor.y = 0.5;
	s_area_4.scale.x = width - 100;
	s_area_4.scale.y = height - 100;
	s_area_4.x = width / 2;
	s_area_4.y = height / 2 - 35;
	s_area_4.interactive = true;

	const s_dot_4 = PIXI.Sprite.fromImage("/assets/timeTrials/stop.png");
	s_dot_4.anchor.x = 0.9;
	s_dot_4.anchor.y = 0.9;
	s_dot_4.scale.x = 2;
	s_dot_4.scale.y = 2;
	s_dot_4.x = width / 2;
	s_dot_4.y = height / 2;
	s_dot_4.cursor = "pointer";
	s_dot_4.interactive = true;

	const s_person_4 = new PIXI.Sprite(t_person);
	s_person_4.anchor.x = 0.5;
	s_person_4.anchor.y = 1;
	s_person_4.scale.x = 0.6;
	s_person_4.scale.y = 0.6;
	s_person_4.x = width / 2 - 200;
	s_person_4.y = height / 2 + 100 + 30;

	const s_camera_4 = PIXI.Sprite.fromImage("/assets/timeTrials/camera.png");
	s_camera_4.anchor.x = 0.5;
	s_camera_4.anchor.y = 1;
	s_camera_4.scale.x = 0.6;
	s_camera_4.scale.y = 0.6;
	s_camera_4.x = width / 2 + 200;
	s_camera_4.y = height / 2 + 100 + 30;

	const s_timeline_1_4 = new PIXI.Sprite(t_square);
	s_timeline_1_4.tint = PIXI.utils.rgb2hex([0.25, 0.25, 0.25]);
	s_timeline_1_4.anchor.x = 0;
	s_timeline_1_4.anchor.y = 0;
	s_timeline_1_4.scale.x = 120;
	s_timeline_1_4.scale.y = 2;
	s_timeline_1_4.x = width / 2 - 150;
	s_timeline_1_4.y = height / 2 + 100;
	s_timeline_1_4.array = [];

	const s_timeline_2_4 = new PIXI.Sprite(t_square);
	s_timeline_2_4.tint = PIXI.utils.rgb2hex([0.25, 0.25, 0.25]);
	s_timeline_2_4.anchor.x = 1;
	s_timeline_2_4.anchor.y = 0;
	s_timeline_2_4.scale.x = 120;
	s_timeline_2_4.scale.y = 2;
	s_timeline_2_4.x = width / 2 + 150;
	s_timeline_2_4.y = height / 2 + 100;
	s_timeline_2_4.array = [];

	for (let i = 0; i < 120; i++) {
		s_timeline_1_4.array[i] = new PIXI.Sprite(t_square);
		s_timeline_1_4.array[i].tint = dotColors["gray"];
		s_timeline_1_4.array[i].anchor.x = 0;
		s_timeline_1_4.array[i].anchor.y = 0.5;
		s_timeline_1_4.array[i].x = width / 2 - 150 + 1 * i;
		s_timeline_1_4.array[i].y = height / 2 + 100 + 0.5;
		s_timeline_1_4.array[i].scale.x = 1;
		s_timeline_1_4.array[i].scale.y = 4;

		s_timeline_2_4.array[i] = new PIXI.Sprite(t_square);
		s_timeline_2_4.array[i].tint = dotColors["gray"];
		s_timeline_2_4.array[i].anchor.x = 0;
		s_timeline_2_4.array[i].anchor.y = 0.5;
		s_timeline_2_4.array[i].x = width / 2 + 150 + 1 * i - 120;
		s_timeline_2_4.array[i].y = height / 2 + 100 + 0.5;
		s_timeline_2_4.array[i].scale.x = 1;
		s_timeline_2_4.array[i].scale.y = 4;
	}

	let mOldX_4 = 0;
	let mOldY_4 = 0;
	let stillTimer_4 = 0;
	TT_4.importance = 2;

	const moveHandler = event => {
		if (
			TT_4.start &&
			between(
				event.data.global.x,
				width / 2 - (width / 2 - 50) + 27,
				width / 2 + (width / 2 - 50) - 3
			) &&
			between(
				event.data.global.y,
				height / 2 - (height / 2 - 50) - 35 + 27,
				height / 2 + (height / 2 - 50) - 35 - 3
			)
		) {
			if (s_dot_4.kind != "green") {
				s_dot_4.texture = t_go;
			}
			s_dot_4.kind = "green";
			s_dot_4.x = between(
				event.data.global.x,
				width / 2 - (width / 2 - 50) + 27,
				width / 2 + (width / 2 - 50) - 3
			);
			s_dot_4.y = between(
				event.data.global.y,
				height / 2 - (height / 2 - 50) - 35 + 27,
				height / 2 + (height / 2 - 50) - 35 - 3
			);
			stillTimer_4 = 6;

			const vel = Math.sqrt(
				Math.abs(event.data.global.x - TT_4.oldX) +
					Math.abs(event.data.global.y - TT_4.oldY)
			);

			TT_4.oldX = event.data.global.x;
			TT_4.oldY = event.data.global.y;

			if (s_dot_4.kind == "green") {
				if (vel < 4.3) {
					TT_4.importance = Math.max(0.5, TT_4.importance - 0.1);
				} else {
					TT_4.importance = Math.min(20, TT_4.importance + 1);
				}
			}
		}
	};
	s_background_4.on("pointermove", moveHandler);

	add(TT_4, s_background_4);
	add(TT_4, s_area_4);
	add(TT_4, s_dot_4);
	add(TT_4, s_switch_4);
	add(TT_4, s_person_4);
	add(TT_4, s_camera_4);
	add(TT_4, s_timeline_1_4);
	add(TT_4, s_timeline_2_4);
	for (let i = 0; i < 120; i++) {
		add(TT_4, s_timeline_1_4.array[i]);
		add(TT_4, s_timeline_2_4.array[i]);
	}

	TT_4.timer = 0;
	TT_4.ticker.add(function(delta) {
		if (TT_4.start) {
			TT_4.timer++;
			if (stillTimer_4 <= 0) {
				if (s_dot_4.kind != "red") {
					s_dot_4.texture = t_stop;
				}
				s_dot_4.kind = "red";
				if (TT_4.importance > 10) {
					TT_4.importance = Math.max((TT_4.importance -= 0.05), 10);
				} else {
					TT_4.importance = Math.min((TT_4.importance += 0.05), 10);
				}
			} else {
				stillTimer_4--;
			}

			s_timeline_1_4.array[mod(TT_4.timer / 8, 120)].tint =
				dotColors[s_dot_4.kind];
			s_timeline_1_4.array[mod(TT_4.timer / 8, 120)].scale.y =
				TT_4.importance * 2;
			s_timeline_2_4.array[mod(TT_4.timer / 8, 120)].tint =
				dotColors[s_dot_4.kind];
			if (TT_4.timer / 8 > 120) {
				TT_4.timer = 0;
				for (let i = 0; i < 120; i++) {
					s_timeline_2_4.array[i].tint = dotColors["gray"];
					s_timeline_2_4.array[i].scale.y = 4;
					s_timeline_1_4.array[i].tint = dotColors["gray"];
					s_timeline_1_4.array[i].scale.y = 4;
				}
			}
		}
	});
}

init_4();

function init_5() {
	const ratio = width / height;

	const TT_5 = new PIXI.Application(width, height, {
		transparent: true
	});
	document.getElementById("tt_5").appendChild(TT_5.view);

	const s_switch_5 = new PIXI.Sprite(t_off);
	s_switch_5.cursor = "pointer";
	s_switch_5.anchor.x = 1;
	s_switch_5.anchor.y = 0;
	s_switch_5.scale.x = 1.5;
	s_switch_5.scale.y = 1.5;
	s_switch_5.x = width;
	s_switch_5.y = 0;
	s_switch_5.interactive = true;

	s_switch_5.on("pointerdown", function() {
		TT_5.start = !TT_5.start;
		if (TT_5.start) {
			s_switch_5.texture = t_on;
		} else {
			s_switch_5.texture = t_off;
		}
	});
	TT_5.start = false;

	const s_sense_5 = new PIXI.Sprite(t_square);
	s_sense_5.anchor.x = 0.5;
	s_sense_5.anchor.y = 0;
	s_sense_5.scale.x = width;
	s_sense_5.scale.y = 3 + 30;
	s_sense_5.x = width / 2;
	s_sense_5.y = height * 2 / 3 - 30 - 20;
	s_sense_5.tint = PIXI.utils.rgb2hex([0.5, 0.5, 0.5]);
	const t_sense_5 = new PIXI.Text("Sense", { font: "20px Futura" });
	t_sense_5.anchor.x = 0;
	t_sense_5.anchor.y = 1;
	t_sense_5.x = 20;
	t_sense_5.y = height * 2 / 3 - 20;
	t_sense_5.style.fill = PIXI.utils.rgb2hex([0.3, 0.3, 0.3]);

	const s_perception_5 = new PIXI.Sprite(t_square);
	s_perception_5.anchor.x = 0.5;
	s_perception_5.anchor.y = 0.5;
	s_perception_5.scale.x = width;
	s_perception_5.scale.y = 152;
	s_perception_5.x = width / 2;
	s_perception_5.y = height - 40 - 20;
	s_perception_5.tint = PIXI.utils.rgb2hex([0.6, 0.25, 0.6]);
	const t_perception_5 = new PIXI.Text("Perception", { font: "20px Futura" });
	t_perception_5.anchor.x = 0;
	t_perception_5.anchor.y = 1;
	t_perception_5.x = 20;
	t_perception_5.y = height - 40 - 20;
	t_perception_5.style.fill = PIXI.utils.rgb2hex([0.9, 0.5, 0.9]);

	const s_drum_5 = new PIXI.Sprite(t_drumUp);
	s_drum_5.anchor.x = 0.5;
	s_drum_5.anchor.y = 0.4;
	s_drum_5.scale.x = 1.5;
	s_drum_5.scale.y = 1.5;
	s_drum_5.x = width / 2;
	s_drum_5.y = height / 2 - 100;
	s_drum_5.interactive = true;
	s_drum_5.cursor = "pointer";
	s_drum_5.on("pointerdown", function() {
		if (TT_5.start) {
			if (!s_drum_5.hit) {
				TT_5.phase = 1;
				s_drum_5.hit = true;
				s_drum_5.texture = t_drumDown;
				s_vision_5.y = height / 2 - 100;
				s_sound_5.y = height / 2 - 100;
				s_vision_5.x = width / 2;
				s_sound_5.x = width / 2;

				s_vision_line_5.clear();
				s_vision_line_2_5.clear();
				s_sound_line_5.clear();
				s_sound_line_2_5.clear();
			}
		}
	});
	const s_vision_5 = PIXI.Sprite.fromImage("/assets/timeTrials/sight.png");
	s_vision_5.anchor.x = 0.5;
	s_vision_5.anchor.y = 0.4;
	s_vision_5.scale.x = 1.5;
	s_vision_5.scale.y = 1.5;
	s_vision_5.x = width / 2;
	s_vision_5.y = -height;
	const s_sound_5 = PIXI.Sprite.fromImage("/assets/timeTrials/sound.png");
	s_sound_5.anchor.x = 0.5;
	s_sound_5.anchor.y = 0.4;
	s_sound_5.scale.x = 1.5;
	s_sound_5.scale.y = 1.5;
	s_sound_5.x = width / 2;
	s_sound_5.y = -height;

	const s_vision_line_5 = new PIXI.Graphics();
	const s_sound_line_5 = new PIXI.Graphics();
	const s_vision_line_2_5 = new PIXI.Graphics();
	const s_sound_line_2_5 = new PIXI.Graphics();

	const s_background_5 = new PIXI.Sprite(t_square);
	s_background_5.anchor.x = 0;
	s_background_5.anchor.y = 0;
	s_background_5.scale.x = width;
	s_background_5.scale.y = height;
	s_background_5.x = 0;
	s_background_5.y = 0;

	const s_timeline_5 = PIXI.Sprite.fromImage(
		"/assets/timeTrials/timeArrow.png"
	);
	s_timeline_5.anchor.x = 0;
	s_timeline_5.anchor.y = 0.5;
	s_timeline_5.scale.x = 1;
	s_timeline_5.scale.y = 1;
	s_timeline_5.x = 0;
	s_timeline_5.y = height * 2 / 3 - 50;
	s_timeline_5.tint = PIXI.utils.rgb2hex([0, 0, 0]);
	const t_timeline_5 = new PIXI.Text("Direction of Time", {
		font: "13px Futura"
	});
	t_timeline_5.anchor.x = 1;
	t_timeline_5.anchor.y = 1;
	t_timeline_5.x = width - 10;
	t_timeline_5.y = height * 2 / 3 - 50;
	t_timeline_5.style.fill = PIXI.utils.rgb2hex([0.4, 0.4, 0.4]);

	add(TT_5, s_background_5);
	add(TT_5, s_switch_5);
	add(TT_5, s_perception_5);
	add(TT_5, s_sense_5);
	add(TT_5, s_timeline_5)
add(TT_5, t_timeline_5)
	add(TT_5, s_vision_line_5);
	add(TT_5, s_sound_line_5);
	add(TT_5, s_vision_line_2_5);
	add(TT_5, s_sound_line_2_5);
	add(TT_5, t_sense_5);
	add(TT_5, t_perception_5);
	add(TT_5, s_drum_5);
	add(TT_5, s_vision_5);
	add(TT_5, s_sound_5);

	TT_5.phase = 1;
	TT_5.timer = 0;
	TT_5.habituation = 1;

	let TT_percept_d = 2 / (s_perception_5.y - s_sense_5.y);
	TT_5.ticker.add(function(delta) {
		if (TT_5.start) {
			if (s_drum_5.hit) {
				if (TT_5.phase === 1) {
					s_vision_5.y = Math.min(height * 2 / 3, s_vision_5.y + 2.1);
					s_sound_5.y = Math.min(
						height * 2 / 3,
						s_sound_5.y + Math.acos(0.3) / 1.57079633 * 2.1
					);
					s_sound_5.x = s_sound_5.x + Math.asin(0.3) / 1.57079633 * 2.1;

					if (s_vision_5.y >= height * 2 / 3 && s_sound_5.y >= height * 2 / 3) {
						TT_5.phase = 2;
						s_vision_5.ox = s_vision_5.x;
						s_vision_5.oy = s_vision_5.y;
						s_sound_5.ox = s_sound_5.x;
						s_sound_5.oy = s_sound_5.y;
						s_vision_5.target_d =
							(s_sound_5.x - s_vision_5.x) / 2 -
							(s_sound_5.x - s_vision_5.x) / 2 * Math.max(0, TT_5.habituation);
						TT_5.habituation -= 0.2;
					}

					s_vision_line_5.clear();
					s_vision_line_5.moveTo(width / 2, height / 2 - 120);
					s_vision_line_5.lineStyle(3, 0xffcb2c);
					s_vision_line_5.lineTo(s_vision_5.x, s_vision_5.y);
					s_sound_line_5.clear();
					s_sound_line_5.moveTo(width / 2, height / 2 - 100);
					s_sound_line_5.lineStyle(3, 0x000000);
					s_sound_line_5.lineTo(s_sound_5.x, s_sound_5.y);
				} else if (TT_5.phase === 2) {
					if (
						s_vision_5.y >= s_perception_5.y &&
						s_sound_5.y >= s_perception_5.y
					) {
						s_drum_5.hit = false;
					} else {
						s_vision_5.y += 2;
						s_vision_5.x += s_vision_5.target_d * TT_percept_d;
						s_sound_5.y += 2;
						s_sound_5.x -= s_vision_5.target_d * TT_percept_d;
					}
					s_vision_line_2_5.clear();
					s_vision_line_2_5.moveTo(s_vision_5.ox, s_vision_5.oy);
					s_vision_line_2_5.lineStyle(3, 0xffcb2c);
					s_vision_line_2_5.lineTo(s_vision_5.x, s_vision_5.y);
					s_sound_line_2_5.clear();
					s_sound_line_2_5.moveTo(s_sound_5.ox, s_sound_5.oy);
					s_sound_line_2_5.lineStyle(3, 0x000000);
					s_sound_line_2_5.lineTo(s_sound_5.x, s_sound_5.y);
				}
			}
		}
	});
}

init_5();

function init_6() {
	const ratio = width / height;

	const TT_6 = new PIXI.Application(width, height, {
		transparent: true
	});
	document.getElementById("tt_6").appendChild(TT_6.view);

	const s_switch_6 = new PIXI.Sprite(t_off);
	s_switch_6.cursor = "pointer";
	s_switch_6.anchor.x = 1;
	s_switch_6.anchor.y = 0;
	s_switch_6.scale.x = 1.5;
	s_switch_6.scale.y = 1.5;
	s_switch_6.x = width;
	s_switch_6.y = 0;
	s_switch_6.interactive = true;

	s_switch_6.on("pointerdown", function() {
		TT_6.start = !TT_6.start;
		if (TT_6.start) {
			s_switch_6.texture = t_on;
		} else {
			s_switch_6.texture = t_off;
		}
	});
	TT_6.start = true;

	const s_sense_6 = new PIXI.Sprite(t_square);
	s_sense_6.anchor.x = 0.5;
	s_sense_6.anchor.y = 0;
	s_sense_6.scale.x = width;
	s_sense_6.scale.y = 3 + 30;
	s_sense_6.x = width / 2;
	s_sense_6.y = height * 2 / 3 - 30 - 20;
	s_sense_6.tint = PIXI.utils.rgb2hex([0.5, 0.5, 0.5]);
	const t_sense_6 = new PIXI.Text("Sense", { font: "20px Futura" });
	t_sense_6.anchor.x = 0;
	t_sense_6.anchor.y = 1;
	t_sense_6.x = 20;
	t_sense_6.y = height * 2 / 3 - 20;
	t_sense_6.style.fill = PIXI.utils.rgb2hex([0.3, 0.3, 0.3]);

	const s_perception_6 = new PIXI.Sprite(t_square);
	s_perception_6.anchor.x = 0.5;
	s_perception_6.anchor.y = 0.5;
	s_perception_6.scale.x = width;
	s_perception_6.scale.y = 152;
	s_perception_6.x = width / 2;
	s_perception_6.y = height - 40 - 20;
	s_perception_6.tint = PIXI.utils.rgb2hex([0.6, 0.25, 0.6]);
	const t_perception_6 = new PIXI.Text("Perception", { font: "20px Futura" });
	t_perception_6.anchor.x = 0;
	t_perception_6.anchor.y = 1;
	t_perception_6.x = 20;
	t_perception_6.y = height - 40 - 20;
	t_perception_6.style.fill = PIXI.utils.rgb2hex([0.9, 0.5, 0.9]);

	const s_bulb_6 = PIXI.Sprite.fromImage("/assets/timeTrials/lightBulb.png");
	s_bulb_6.anchor.x = 0.5;
	s_bulb_6.anchor.y = 0.4;
	s_bulb_6.scale.x = 1.5;
	s_bulb_6.scale.y = 1.5;
	s_bulb_6.x = width / 2 + 166;
	s_bulb_6.y = -height;

	const s_finger_6 = new PIXI.Sprite(t_lightSwitchOff);
	s_finger_6.anchor.x = 0.5;
	s_finger_6.anchor.y = 0.4;
	s_finger_6.scale.x = 1.5;
	s_finger_6.scale.y = 1.5;
	s_finger_6.x = width / 2 - 100;
	s_finger_6.y = height / 2 - 100;
	s_finger_6.interactive = true;
	s_finger_6.cursor = "pointer";
	s_finger_6.on("pointerdown", function() {
		if (TT_6.start) {
			if (!s_finger_6.hit) {
				TT_6.phase = 1;
				s_finger_6.hit = true;
				s_finger_6.texture = t_lightSwitchOn;
				s_vision_6.y = height / 2 - 100;
				s_sound_6.y = -height;
				s_bulb_6.y = -height;
				s_vision_6.x = width / 2 - 100;
				s_sound_6.x = width / 2 + 166;

				s_vision_line_6.clear();
				s_vision_line_2_6.clear();
				s_sound_line_6.clear();
				s_sound_line_2_6.clear();

				delay_timer_6 = 0;
			}
		}
	});
	const s_vision_6 = PIXI.Sprite.fromImage(
		"/assets/timeTrials/switchOnSight.png"
	);
	s_vision_6.anchor.x = 0.5;
	s_vision_6.anchor.y = 0.4;
	s_vision_6.scale.x = 1.5;
	s_vision_6.scale.y = 1.5;
	s_vision_6.x = width / 2 - 100;
	s_vision_6.y = -height;
	const s_sound_6 = PIXI.Sprite.fromImage("/assets/timeTrials/lightBulb.png");
	s_sound_6.anchor.x = 0.5;
	s_sound_6.anchor.y = 0.5;
	s_sound_6.scale.x = 1.5;
	s_sound_6.scale.y = 1.5;
	s_sound_6.x = width / 2 + 166;
	s_sound_6.y = -height;

	const s_vision_line_6 = new PIXI.Graphics();
	const s_sound_line_6 = new PIXI.Graphics();
	const s_vision_line_2_6 = new PIXI.Graphics();
	const s_sound_line_2_6 = new PIXI.Graphics();

	const s_background_6 = new PIXI.Sprite(t_square);
	s_background_6.anchor.x = 0;
	s_background_6.anchor.y = 0;
	s_background_6.scale.x = width;
	s_background_6.scale.y = height;
	s_background_6.x = 0;
	s_background_6.y = 0;

	const s_timeline_6 = PIXI.Sprite.fromImage(
		"/assets/timeTrials/timeArrow.png"
	);
	s_timeline_6.anchor.x = 0;
	s_timeline_6.anchor.y = 0.5;
	s_timeline_6.scale.x = 1;
	s_timeline_6.scale.y = 1;
	s_timeline_6.x = 0;
	s_timeline_6.y = height * 2 / 3 - 50;
	s_timeline_6.tint = PIXI.utils.rgb2hex([0, 0, 0]);
	const t_timeline_6 = new PIXI.Text("Direction of Time", {
		font: "13px Futura"
	});
	t_timeline_6.anchor.x = 1;
	t_timeline_6.anchor.y = 1;
	t_timeline_6.x = width - 10;
	t_timeline_6.y = height * 2 / 3 - 50;
	t_timeline_6.style.fill = PIXI.utils.rgb2hex([0.4, 0.4, 0.4]);

	add(TT_6, s_background_6);
	add(TT_6, s_switch_6);
	add(TT_6, s_perception_6);
	add(TT_6, s_sense_6);
	add(TT_6, s_timeline_6);
	add(TT_6, t_timeline_6);
	add(TT_6, s_vision_line_6);
	add(TT_6, s_sound_line_6);
	add(TT_6, s_vision_line_2_6);
	add(TT_6, s_sound_line_2_6);
	add(TT_6, s_bulb_6);
	add(TT_6, t_sense_6);
	add(TT_6, t_perception_6);
	add(TT_6, s_finger_6);
	add(TT_6, s_vision_6);
	add(TT_6, s_sound_6);

	TT_6.phase = 1;
	TT_6.timer = 0;
	TT_6.habituation = 1;
	const delay = 110;
	let delay_timer_6 = 0;

	let TT_percept_d = 2 / (s_perception_6.y - s_sense_6.y);
	TT_6.ticker.add(function(delta) {
		if (TT_6.start) {
			if (s_finger_6.hit) {
				if (TT_6.phase === 1) {
					if (delay_timer_6 >= delay) {
						s_sound_6.y = Math.min(height * 2 / 3, s_sound_6.y + 2.1);
						s_sound_line_6.clear();
						s_sound_line_6.moveTo(width / 2 + 166, height / 2 - 100);
						s_sound_line_6.lineStyle(3, 0xffff00);
						s_sound_line_6.lineTo(s_sound_6.x, s_sound_6.y);
					} else {
						delay_timer_6++;
						if (delay_timer_6 >= delay) {
							s_bulb_6.y = height / 2 - 100;
							s_sound_6.y = height / 2 - 100;
						}
					}
					s_vision_6.y = Math.min(height * 2 / 3, s_vision_6.y + 2.1);

					if (s_vision_6.y >= height * 2 / 3 && s_sound_6.y >= height * 2 / 3) {
						TT_6.phase = 2;
						s_vision_6.ox = s_vision_6.x;
						s_vision_6.oy = s_vision_6.y;
						s_sound_6.ox = s_sound_6.x;
						s_sound_6.oy = s_sound_6.y;
						s_vision_6.target_d =
							(s_sound_6.x - s_vision_6.x) / 2 -
							(s_sound_6.x - s_vision_6.x) /
								2 *
								Math.max(0.5, TT_6.habituation);
						TT_6.habituation -= 0.2;
					}

					s_vision_line_6.clear();
					s_vision_line_6.moveTo(width / 2 - 100, height / 2 - 120);
					s_vision_line_6.lineStyle(3, 0x30ff00);
					s_vision_line_6.lineTo(s_vision_6.x, s_vision_6.y);
				} else if (TT_6.phase === 2) {
					if (
						s_vision_6.y >= s_perception_6.y &&
						s_sound_6.y >= s_perception_6.y
					) {
						s_finger_6.hit = false;
					} else {
						s_vision_6.y += 2;
						s_vision_6.x += s_vision_6.target_d * TT_percept_d;
						s_sound_6.y += 2;
						s_sound_6.x -= s_vision_6.target_d * TT_percept_d;
					}
					s_vision_line_2_6.clear();
					s_vision_line_2_6.moveTo(s_vision_6.ox, s_vision_6.oy);
					s_vision_line_2_6.lineStyle(3, 0x30ff00);
					s_vision_line_2_6.lineTo(s_vision_6.x, s_vision_6.y);
					s_sound_line_2_6.clear();
					s_sound_line_2_6.moveTo(s_sound_6.ox, s_sound_6.oy);
					s_sound_line_2_6.lineStyle(3, 0xffff00);
					s_sound_line_2_6.lineTo(s_sound_6.x, s_sound_6.y);
				}
			}
		}
	});
}

init_6();

function init_7() {
	const ratio = width / height;

	const TT_7 = new PIXI.Application(width, height, {
		transparent: true
	});
	document.getElementById("tt_7").appendChild(TT_7.view);

	const s_switch_7 = new PIXI.Sprite(t_off);
	s_switch_7.cursor = "pointer";
	s_switch_7.anchor.x = 1;
	s_switch_7.anchor.y = 0;
	s_switch_7.scale.x = 1.5;
	s_switch_7.scale.y = 1.5;
	s_switch_7.x = width;
	s_switch_7.y = 0;
	s_switch_7.interactive = true;

	s_switch_7.on("pointerdown", function() {
		TT_7.start = !TT_7.start;
		if (TT_7.start) {
			s_switch_7.texture = t_on;
		} else {
			s_switch_7.texture = t_off;
		}
	});
	TT_7.start = false;

	const s_sense_7 = new PIXI.Sprite(t_square);
	s_sense_7.anchor.x = 0.5;
	s_sense_7.anchor.y = 0;
	s_sense_7.scale.x = width;
	s_sense_7.scale.y = 3 + 30;
	s_sense_7.x = width / 2;
	s_sense_7.y = height * 2 / 3 - 30 - 20;
	s_sense_7.tint = PIXI.utils.rgb2hex([0.5, 0.5, 0.5]);
	const t_sense_7 = new PIXI.Text("Sense", { font: "20px Futura" });
	t_sense_7.anchor.x = 0;
	t_sense_7.anchor.y = 1;
	t_sense_7.x = 20;
	t_sense_7.y = height * 2 / 3 - 20;
	t_sense_7.style.fill = PIXI.utils.rgb2hex([0.3, 0.3, 0.3]);

	const s_timeline_7 = PIXI.Sprite.fromImage(
		"/assets/timeTrials/timeArrow.png"
	);
	s_timeline_7.anchor.x = 0;
	s_timeline_7.anchor.y = 0.5;
	s_timeline_7.scale.x = 1;
	s_timeline_7.scale.y = 1;
	s_timeline_7.x = 0;
	s_timeline_7.y = height * 2 / 3 - 50;
	s_timeline_7.tint = PIXI.utils.rgb2hex([0, 0, 0]);
	const t_timeline_7 = new PIXI.Text("Direction of Time", {
		font: "13px Futura"
	});
	t_timeline_7.anchor.x = 1;
	t_timeline_7.anchor.y = 1;
	t_timeline_7.x = width - 10;
	t_timeline_7.y = height * 2 / 3 - 50;
	t_timeline_7.style.fill = PIXI.utils.rgb2hex([0.4, 0.4, 0.4]);

	const s_perception_7 = new PIXI.Sprite(t_square);
	s_perception_7.anchor.x = 0.5;
	s_perception_7.anchor.y = 0.5;
	s_perception_7.scale.x = width;
	s_perception_7.scale.y = 152;
	s_perception_7.x = width / 2;
	s_perception_7.y = height - 40;
	s_perception_7.tint = PIXI.utils.rgb2hex([0.6, 0.25, 0.6]);
	const t_perception_7 = new PIXI.Text("Perception", { font: "20px Futura" });
	t_perception_7.anchor.x = 0;
	t_perception_7.anchor.y = 1;
	t_perception_7.x = 20;
	t_perception_7.y = height - 40;
	t_perception_7.style.fill = PIXI.utils.rgb2hex([0.9, 0.5, 0.9]);

	const s_bulb_7 = PIXI.Sprite.fromImage("/assets/timeTrials/lightBulb.png");
	s_bulb_7.anchor.x = 0.5;
	s_bulb_7.anchor.y = 0.4;
	s_bulb_7.scale.x = 1.5;
	s_bulb_7.scale.y = 1.5;
	s_bulb_7.x = width / 2 + 47;
	s_bulb_7.y = -height;

	const s_finger_7 = new PIXI.Sprite(t_lightSwitchOff);
	s_finger_7.anchor.x = 0.5;
	s_finger_7.anchor.y = 0.4;
	s_finger_7.scale.x = 1.5;
	s_finger_7.scale.y = 1.5;
	s_finger_7.x = width / 2 - 100;
	s_finger_7.y = height / 2 - 100;
	s_finger_7.interactive = true;
	s_finger_7.on("pointerdown", function() {
		if (TT_7.start) {
			if (!s_finger_7.hit) {
				TT_7.phase = 1;
				s_finger_7.hit = true;
				s_finger_7.texture = t_lightSwitchOn;
				s_vision_7.y = height / 2 - 100;
				s_sound_7.y = -height;
				s_bulb_7.y = -height;
				s_vision_7.x = width / 2 - 100;
				s_sound_7.x = width / 2 + 47;

				s_vision_line_7.clear();
				s_vision_line_2_7.clear();
				s_sound_line_7.clear();
				s_sound_line_2_7.clear();

				delay_timer_7 = 0;
			}
		}
	});
	const s_vision_7 = PIXI.Sprite.fromImage(
		"/assets/timeTrials/switchOnSight.png"
	);
	s_vision_7.anchor.x = 0.5;
	s_vision_7.anchor.y = 0.4;
	s_vision_7.scale.x = 1.5;
	s_vision_7.scale.y = 1.5;
	s_vision_7.x = width / 2 - 100;
	s_vision_7.y = -height;
	const s_sound_7 = PIXI.Sprite.fromImage("/assets/timeTrials/lightBulb.png");
	s_sound_7.anchor.x = 0.5;
	s_sound_7.anchor.y = 0.5;
	s_sound_7.scale.x = 1.5;
	s_sound_7.scale.y = 1.5;
	s_sound_7.x = width / 2 + 47;
	s_sound_7.y = -height;

	const s_vision_line_7 = new PIXI.Graphics();
	const s_sound_line_7 = new PIXI.Graphics();
	const s_vision_line_2_7 = new PIXI.Graphics();
	const s_sound_line_2_7 = new PIXI.Graphics();

	const s_background_7 = new PIXI.Sprite(t_square);
	s_background_7.anchor.x = 0;
	s_background_7.anchor.y = 0;
	s_background_7.scale.x = width;
	s_background_7.scale.y = height;
	s_background_7.x = 0;
	s_background_7.y = 0;

	add(TT_7, s_background_7);
	add(TT_7, t_timeline_7);
	add(TT_7, s_switch_7);

	add(TT_7, s_perception_7);
	add(TT_7, s_sense_7);
	add(TT_7, s_timeline_7);
	add(TT_7, s_vision_line_7);
	add(TT_7, s_sound_line_7);
	add(TT_7, s_vision_line_2_7);
	add(TT_7, s_sound_line_2_7);
	add(TT_7, s_bulb_7);
	add(TT_7, t_sense_7);
	add(TT_7, t_perception_7);
	add(TT_7, s_finger_7);
	add(TT_7, s_vision_7);
	add(TT_7, s_sound_7);

	TT_7.phase = 1;
	TT_7.timer = 0;
	TT_7.habituation = 1;
	const delay = 50;
	let delay_timer_7 = 0;

	let TT_percept_d = 2 / (s_perception_7.y - s_sense_7.y);
	TT_7.ticker.add(function(delta) {
		if (TT_7.start) {
			if (s_finger_7.hit) {
				if (TT_7.phase === 1) {
					if (delay_timer_7 >= delay) {
						s_sound_7.y = Math.min(height * 2 / 3, s_sound_7.y + 1.5);
						s_sound_line_7.clear();
						s_sound_line_7.moveTo(width / 2 + 47, height / 2 - 100);
						s_sound_line_7.lineStyle(3, 0xffff00);
						s_sound_line_7.lineTo(s_sound_7.x, s_sound_7.y);
					} else {
						delay_timer_7++;
						if (delay_timer_7 >= delay) {
							s_bulb_7.y = height / 2 - 100;
							s_sound_7.y = height / 2 - 100;
						}
					}
					s_vision_7.y = Math.min(height * 2 / 3, s_vision_7.y + 1.5);

					if (s_vision_7.y >= height * 2 / 3 && s_sound_7.y >= height * 2 / 3) {
						TT_7.phase = 2;
						s_vision_7.ox = s_vision_7.x;
						s_vision_7.oy = s_vision_7.y;
						s_sound_7.ox = s_sound_7.x;
						s_sound_7.oy = s_sound_7.y;
						s_vision_7.target_d = Math.max(147, 147*1.7 * TT_7.habituation);
						TT_7.habituation -= 0.35;
					}

					s_vision_line_7.clear();
					s_vision_line_7.moveTo(width / 2 - 100, height / 2 - 120);
					s_vision_line_7.lineStyle(3, 0x30ff00);
					s_vision_line_7.lineTo(s_vision_7.x, s_vision_7.y);
				} else if (TT_7.phase === 2) {
					if (
						s_vision_7.y >= s_perception_7.y &&
						s_sound_7.y >= s_perception_7.y
					) {
						s_finger_7.hit = false;
					} else {
						s_vision_7.y += 2;
						s_vision_7.x += s_vision_7.target_d * TT_percept_d;
						s_sound_7.y += 2;
						s_sound_7.x -= s_vision_7.target_d * TT_percept_d;
					}
					s_vision_line_2_7.clear();
					s_vision_line_2_7.moveTo(s_vision_7.ox, s_vision_7.oy);
					s_vision_line_2_7.lineStyle(3, 0x30ff00);
					s_vision_line_2_7.lineTo(s_vision_7.x, s_vision_7.y);
					s_sound_line_2_7.clear();
					s_sound_line_2_7.moveTo(s_sound_7.ox, s_sound_7.oy);
					s_sound_line_2_7.lineStyle(3, 0xffff00);
					s_sound_line_2_7.lineTo(s_sound_7.x, s_sound_7.y);
				}
			}
		}
	});
}

init_7();
