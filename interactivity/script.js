//Each color has a counter

var colors = [['#40e0d0',0], ['#f0fff0',0], ['#483d8b',0], ['#8fbc8f',0], ['#deb887',0],['#b23aee',0],['#8b475d',0],['#ff4500',0]];
var globalPos;

function writeMessage(){	
	//choose a random color from 0 to 7
	var pos = Math.floor((Math.random() * colors.length));
	globalPos = pos;

	//Get the new color
	var newColor = colors[pos];

	//Update the counter
	newColor[1] = newColor[1] + 1;

	//Update the array 
	colors[pos] = newColor;
	document.body.style.backgroundColor = newColor[0];

	if(newColor[1] >= 3){
		document.getElementById("info_changed_back").style.visibility = "visible";
	}

	console.log('color: ' + newColor[0] + 'escolhida: ' + newColor[1]);
}

function removeColor(argument) {
	console.log(colors.length + " before ");

	document.getElementById("info_changed_back").style.visibility = "hidden";
	colors.splice(globalPos,1);
	console.log(colors.length + "globalPos " + globalPos);

}

function hideMessage(){
	document.getElementById("info_changed_back").style.visibility = "hidden";
}