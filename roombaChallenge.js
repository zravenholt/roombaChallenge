const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const sourceLocation = './input.txt'; // Change this if resource file has different name or location

//----------------------------------------------------------------------------------------
// Main Function
//----------------------------------------------------------------------------------------

function roombaChallenge () {
	extractData()
		//extracts raw data from input source as a promise.
	.then( data => {
		//Converts data to be organized and interactable.
		let infoObj = cleanData(data.toString());
		return infoObj;
	})
	.then( info => {
		// Executes Roomba task with the information
		activateRoomba(info);
		return;
	})

}

//----------------------------------------------------------------------------------------
// Supporting Functions
//----------------------------------------------------------------------------------------

function extractData () {
	//extracts raw data from source file as a promise.
	return readFile(sourceLocation);
}

function cleanData (dataString) {
	// cleans data into array of INT coordinates; the last index of the
	// array remains untouched because it is a string of "NSEW" cardinal directions
	let coordinatesList = dataString.split('\r').join('').split('\n');
    for (let i = 0; i < coordinatesList.length - 1; i++) {
    	let coordinate = coordinatesList[i].split(' ');
    	coordinate[0] = parseInt(coordinate[0]);
    	coordinate[1] = parseInt(coordinate[1]);
    	coordinatesList[i] = coordinate;   		
    }
    return organizeData(coordinatesList);
}

function organizeData (coordinates) {
	// Organizes data to be easier to reference and manipulate later. 
	// I rearranged data into an object that can be handed between promises and recursive functions
	// and persists any changes that I make to it as the roomba performs its duties.
	let info = {};
	info.roomSize = coordinates[0];
	info.roombaLocation = coordinates[1];
	info.directions = coordinates[coordinates.length - 1].split('');
	info.dirtySpots = {};
	info.cleanedSpots = 0;

	for (i = 2; i < coordinates.length - 1; i++) {
		let dirtCoordinate = coordinates[i].map(String).join('');
		info.dirtySpots[dirtCoordinate] = true;
	}
	return info;

	// I use an object for the info.dirtySpots instead of array for a few reasons:
	// * checking a known key value is O(1), versus searching an array for the existance of a coordinate is O(n);
	//   for very large rooms this cuts execution time and scales better.
	// * Each XY coordinate will be a unique key as each square only has dirt on it once, 
	//   and even if there are duplicates of dirt piles in the input the code should still work fine.
	// * Once the roomba cleans a tile, info.dirtySpots.key boolean flips, preventing
	//   any tile from being marked as clean more than once.
}

function activateRoomba (info) {
	// Recursive function that:
	// * checks current location for dirt and cleans if found
	// * moves in the direction of the next instruction (if able)
	// * repeats until there are no more directions for it to follow
	checkCurrentSpot(info);
	if (info.directions.length === 0) {
		console.log('\n ----- ROOMBA FINISHED ----- \n', 'ROOMBA ENDING LOCATION: ', info.roombaLocation, '\n', 'TOTAL CLEANED TILES: ', info.cleanedSpots, '\n')
		return;
	} else {
		moveRoomba(info);
		activateRoomba(info);
	}
	return;
}

function checkCurrentSpot (info) {
	// checks current location for dirt by comparing info.roombaLocation to 
	// info.dirtySpots.XY, where XY is a preknown coordinate of dirt.
	// If key exists && value is "true", dirt is cleaned up and the info.cleanedSpots tally increases.
	// If N/A or key is already marked as "false", roomba does nothing.
	if (info.dirtySpots[info.roombaLocation.map(String).join('')]) {
		info.dirtySpots[info.roombaLocation.map(String).join('')] = false;
		info.cleanedSpots ++;
	}
	return;
}

function moveRoomba (info) {
	// Converts cardinal NSEW directions into roomba movements;
	// each time this function is ran the roomba attempts to move based off of
	// the next instruction. Regardless of the roomba's success in actually moving due to walls, the direction is 
	// always consumed and removed from the shrinking list of future directions.
	let direction = info.directions.shift();
	if (direction.toUpperCase() === 'N') {
		if (info.roombaLocation[1] < info.roomSize[1]) {
			info.roombaLocation[1] ++;
		}
	} else if (direction.toUpperCase() === 'E') {
		if (info.roombaLocation[0] < info.roomSize[0]) {
			info.roombaLocation[0] ++;
		}
	} else if (direction.toUpperCase() === 'S') {
		if (info.roombaLocation[1] > 0) {
			info.roombaLocation[1] --;
		}
	} else if (direction.toUpperCase() === 'W') {
		if (info.roombaLocation[0] > 0) {
			info.roombaLocation[0] --;
		}
	}
	return;

}

// Executes the file via node
roombaChallenge();

