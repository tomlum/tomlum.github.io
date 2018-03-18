function hide(element, speed) {
	speed = speed ? speed + "s" : ".5s";
	document.getElementById(element).style.transition =
		"all " + speed + " ease-in-out";
	document.getElementById(element).style.opacity = "0";
	document.getElementById(element).style.cursor = "auto";
}

function show(element, speed) {
	speed = speed ? speed + "s" : ".5s";
	document.getElementById(element).style.transition =
		"all " + speed + " ease-in-out";
	document.getElementById(element).style.opacity = "1";
	document.getElementById(element).style.cursor = "pointer";
}
