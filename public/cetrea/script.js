/***** Main Controller ******/
/* This controller holds most of the code to run in the exercise except for 3 recursive functions better held outside the controller*/

function controller() 
{ /* We set the common variables used everywhere. The first one is the horse pool and represents all the horses to sort can be modified as the program adapts to the number of horses. Theres no minimum or maximum number of horses.*/
    this.horses = [107,47,102,64,50,100,28,91,27,5,22,114,23,42,13,3,93,8,92,79,53,83,63,7,15,66,105,57,14,65,58,113,112,1,62,103,120,72,111,51,9,36,119,99,30,20,25,84,16,116,98,18,37,108,10,80,101,35,75,39,109,17,38,117,60,46,85,31,41,12,29,26,74,77,21,4,70,61,88,44,49,94,122,2,97,73,69,71,86,45,96,104,89,68,40,6,87,115,54,123,125,90,32,118,52,11,33,106,95,76,19,82,56,121,55,34,24,43,124,81,48,110,78,67,59];
	// ^ values not used, only for reference ^
	this.result = []; // The array variable in which we hold the results of the exercice.
	this.numberOfRaces = 0; // The variable used to keep track of the number of times we raced 5 (or less) horses.
	this.numberOfHorses = 125; // We generate this many horses instead of using the first variable (this.horses);
}

controller.prototype = {
	
	/************ sortThemAll *************/ 
	// Main function to call. keeps the flow of the execution
	sortThemAll : function ()
	{
		this.print(this.horses,$("#phases")); // We print the first roster of horses in the first div inside phases section of the html.
		
		this.horses = this.makeThemRace(this.horses); // Race the horse pool and creates an structured array representing the race results and the winnable horses
		
		this.result.push(this.getWinner(this.horses)); // We have already found the winner of the exercice as the array is organized in such a way that the first position found will be the winner.
		
		if(this.numberOfHorses < 50) // Here we find two strategies to move forward, 50 initial horses is the point in which the second strategy is more efficient than the first 
		{ // In the first strategy we Race 5 of the horses and remove the last 3 as we already know the winner, we need the second and third horses
			
			this.horses = this.arrayGetAllValues(this.horses); // We need to serialize all the results in the array structure as it doesn't matter anymore and can't be used further without more races. Winner removed
			this.result = this.result.concat(this.simpleRacesSolver(this.horses, 2)); //This function uses the first strategy to find the 2nd and 3rd positions
		
		}else{ // The second strategy is the one we used in the first stage of the exercice, we race in groups of 5 and remove the ones we know failed, then race the winners, and the next winners until there are no horses or groups unraced.
			
			this.horses = this.sortForSecond(this.horses); // Organize the structured array in a way that is easy to remove already-lost-horses in the second position races
			this.horses = this.makeThemRace(this.horses, 2); // We call the main function to perform races and create the result array structure, only 2 winners needed (2nd and 3rd positions, the winner has been removed)
			this.result.push(this.getWinner(this.horses)); // We find the winner of the 2nd place and remove it from the horse pool
			
			this.horses = this.arrayGetAllValues(this.horses); // We get all the qualifiable horses to keep racing for the 3rd position
			this.horses = this.simpleRacesSolver(this.horses, 1); // We use the simple race solver as it's always equal or more efficient than the other approach
			this.result.push(this.getWinner(this.horses)); // We get the winner of the 3rd position and add him to the results
			
		} 
		
		this.printNumberOfRaces(); // Print the number of races on the top right corner
		this.printResult(); // Print the results on the top right corner
		this.print(this.result,$("#phases")); // Print the results as the last phase of the exercice
		
	},
	
	/************ makeThemRace *************/ 
	// Function to race horses or groups of horses and create an ordered array for further phases
	makeThemRace : function (object, numOfWinners = 3)
	{ // horse pool object to race, number of winners expected (3 by the default)
		var temp = []; // temporal array to hold values
		
		while(object.length > 1) 
		{ // Each iteration of this while is a phase in which we race and remove plenty of horses.
		
			while(object.length > 1)
			{ // while there are horses to race
				var horses = object.splice(0,5); // get the first 5 horses and remove them from the pool
				var orderedHorses;
				if(horses.length > 1)
				{ // if there is more than 1 horse we need to race them
					orderedHorses = this.superRace(horses); // race the horses
				}else{ // if there is only 1 horse no need to race
					orderedHorses = horses;
				}
				this.cleanCluster(orderedHorses, numOfWinners); // remove unwinnable horses from the result (be it an array or an structured array)
				temp.push(orderedHorses); // add the clean result to the temporal array
			}
			
			object = temp; // phase complete, save the results, if there are races to be made the while will perform one more iteration
			temp = []; // reset temporal array
			this.print(object,$("#phases")); // We print the result of the phase in the phases section.
			
		}
		return object;
	},
	
	/************ simpleRaceSolver *************/
	// This race strategy is simpler and more efficient in some contexts. 
	// We race 5 horses and remove the ones we dont need, we replace them with new horses from the pool until there are only the number of winners we want.
	simpleRacesSolver : function (object, numOfWinners = 3)
	{ //Object to get the horse pool from (usually this.horses), and the number of winners we want to find (3 as default)
	
		while(object.length > numOfWinners)
		{ //While there are more horses than the number of winners we want to find we need to keep racing
			this.print(object,$("#phases")); // we print a phase in the html
			var horses = object.splice(0,5); //We get the first 5 horses from the pool.
			var orderedHorses = this.superRace(horses); //We race the horses and keep as many horses as number of winners from the first.
			this.cleanCluster(orderedHorses, numOfWinners); // We drop the other horses as they are unable to get to any of the positions we are interested in.
			object = orderedHorses.concat(object); // We add the rest of the pool to the winners, this will be the horse pool to use in the next iteration of the while.
		}
		return object;
	},
	
	/************ getWinner *************/ 
	// This function gets the First position in a array structure result of multiple races, returns said winner horse
	getWinner : function (object)
	{ // Expects the object from which to extract the winner
		var item = object;
		while(typeof(item[0]) == 'object')
		{ // While the first child of the structure is an object and not a string or integer we know we need to go deeper
			item = item[0]; // Go one level deeper in the structure
		}
		this.printWinner(item[0]); // Print the winner in the phases section
		return item[0]; // Returns the winner
	},
	
	/************ sortForSecond *************/ 
	// calls the recursive function to properly order the array structure to race them efficiently for the second place
	sortForSecond : function (object)
	{ //object to sort
		var result = sortForSecond(object); // Call the recursive function
		this.print(result,$("#phases")); // Print the results as the last phase of the exercice
		return result; // returns the object
	},
	
	/************ cleanCluster *************/ 
	// calls the recursive function to clean the array structure from unwinnable horses
	cleanCluster : function (object, priority = 3)
	{ //object to clean, max level of priority (3 as default)
		cleanCluster(object, priority); //call the recursive function
	},
	
	/************ superRace *************/ 
	// Function to simulate a race. If the object racing is an array it uses the winner in that group, it works like this to easily remove dependant horses. never races more than 5
	superRace : function (horsesArray)
	{ // array to clean
		this.numberOfRaces ++; // increase the race counter by 1 to keep track of how many races we have performed
		console.log("Horses to Race: " + JSON.stringify(horsesArray)); // log the participant horses
		var solvedRace = horsesArray.sort(function(a, b)
		{ // custom function to get the winner of a horse group
			while(typeof(a) == 'object')
			{ // while the object to compare is an array go one level deeper.
				a = a[0];
				b = b[0];
			}
			return b-a; // compares the appropriate horses to decide the right order
		});
		console.log("Race Results: " + JSON.stringify(solvedRace)); // logs the race results
		return solvedRace; // returns the result
	},
	
	/************ arrayGetAllValues *************/ 
	// Undoes the array structure getting all the values in a single array in order to count them or race them when the structure is of no use anymore
	arrayGetAllValues : function (object)
	{ // object structure to serialize
		var values = arrayGetAllValues(object).splice(1); // calls the recursive function
		this.print(values,$("#phases")); // prints the result so it is visible
		return values; // returns the array
	},
	
	/************ print *************/ 
	// function to print any object in an identified html item
	print : function (object, container)
	{ // object to print, html container in which to append the print
		container.html( container.html() + superPrint(object) + this.printNumberOfRacesLogs()) // the container html is the current html + printed object + number of races to keep track of them in the different phases
	},
	
	/************ printWinner *************/ 
	// specifically prints a winning horse in the phases section
	printWinner : function (winner)
	{
		$("#phases").html( $("#phases").html() + "<p>Found a winner: <span>" + winner + "</span></p>"); // adds the winner in the phases section
	},
	
	/************ printResult *************/ 
	// specifically prints the results in the top right corner of the interface
	printResult : function ()
	{
		$("#result").html( superPrint(this.result) ); // the html item with id result is wiped and the printed object this.result is appended
	},
	
	/************ printNumberOfRaces *************/ 
	// specifically prints the number of races in the top right corner of the interface
	printNumberOfRaces : function ()
	{
		$("#numOfRaces").empty(); // wipes the node
		var txt = document.createTextNode(this.numberOfRaces); // creates a text node with the number of races
		document.getElementById("numOfRaces").appendChild(txt); // appends the text in the html object
	},
	
	/************ printNumberOfRacesLogs *************/ 
	// returns an html string with a label and the current number of races
	printNumberOfRacesLogs : function ()
	{ 
		return "<p>Number of races at this point: "+ this.numberOfRaces +"</p>"; 
	},
	
	/************ generateHorses *************/ 
	// asks the user how many horses to generate, creates the array and shuffles it
	generateHorses : function ()
	{
		this.numberOfHorses = prompt("Please enter the number of horses to race", "125"); //ask the user how many horses to generate, 125 by default
		
		while ( !(!isNaN(parseFloat(this.numberOfHorses)) && isFinite(this.numberOfHorses)) ) 
		{ //while the response is not a finite number ask again
			this.numberOfHorses = prompt("Incorrect value. Please enter the number of horses to race", "125");
		} 
		
		var array = []; // create temporal array
		
		for( var i = 1; i <= this.numberOfHorses; i++ )
		{ // loop until enough horses are generated
			array.push(i); // add the value to the array
		}
		
		this.horses = shuffle(array); // call the shuffle function in order to randomize the array
	}
};

/********* shuffle *********/
// shuffles the array randomly, so it's not ordered. Used in order to simulate an unordered horse pool
function shuffle(oArray) 
{
	var currentIndex = oArray.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle
	while (0 !== currentIndex) {

		// Pick a remaining element
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = oArray[currentIndex];
		oArray[currentIndex] = oArray[randomIndex];
		oArray[randomIndex] = temporaryValue;
	}
	
	return oArray;
}

/********* superPrint *********/
// This function goes through any structure and creates spans with horses values and divs for groups of horses to properly display them on the interface
function superPrint (object, html = "")
{ 
	html += "<div>"; // opens the div for each iteration of the function
	if(typeof(object[0]) == 'object')
	{ // if the first child is an array, the function has to call itself again and process all its children
		object.forEach(function(item){ // Process each children in the object
			html = superPrint(item, html);
		});
	}else{ // if the first child is not an array we need to create spans for each of its children
		object.forEach(function(item){ // Create a span for each children
			html += "<span>" + item + "</span>";
		});
	}
	html += "</div>"; // closes the div opened in the first line of the function
	return html; // returns the result
}

/********* arrayGetAllValues *********/
// This function recursevly goes through any object sent and serializes all the values
function arrayGetAllValues (object, iArray = [])
{// Object to serialize, array to send back
	object.forEach(function(item)
	{ // go through all child elements
		if(typeof(item) == 'object')
		{// if the current item is an object run the function through it
			iArray = arrayGetAllValues (item,iArray);
		}else{ // if it's a value add it to the return array
			iArray.push(item);
		}
	});
	return iArray
}

/********* CleanCluster ********/ 
// Function to remove all the horses we know for sure won't be able to matter
function cleanCluster (object, priority)
{ //Object to clean, priority is the number of winner we are looking for, in the code a priority below 1 means they can't go on
	var lastItem = 'object'; // tracks the last item type in order to not process array storages depending on a single horse in the second place races
	
	object.forEach(function(item, index)
	{ // loop each item in the object
		if(priority < 1) 
		{ // Priority less than 1 means the item and following items need to be removed
			console.log("Horses Discarded: " + JSON.stringify(object.splice(index))); // Splice function removes the item and following items, console.log displays them in the logs.

		}else{
			if(typeof(item) == 'object' && lastItem == 'object') // If the item is an object and not a second place race storage array, means there are horses inside we need to recall the recursive function for
				cleanCluster(item, priority); // recall the recursive function
			lastItem = typeof(item); // store the typeof for the next iteration, to avoid processing storage array in second place races
			priority --; // Each time we move laterally we need to drop priority by 1, as there is one less position available
		}
	});

	priority ++; // Each time we exit the recursive function and go one level up we need to increase the priority by one as that level has 1 more position available
}

/********* sortForSecond ********/ 
// Sorts the remaining race structure to easily remove horses once a horse which already has won a race against them loses and can't go on
function sortForSecond (object, priority = 3, res = [])
{ // object to process, priority level to take into account, result object to return
	object.forEach(function(item, index)
	{ // loop each item in the object
		if(typeof(item) == 'object')
		{ // If the item is an array means there are horse structures inside, we need to recall the recursive function
			res = sortForSecond(item, priority, res);
		}else{
			switch(priority) 
			{ // depending on the priority when we reach the item 
				case 1: // lowest priority, this horse has been raced against the last priority 2 horse found by the function, so we add them to their group in the result structure. if the level 2 horse is removed so is this one
				res[res.length - 1][1].push(item); 
				break;
				case 2: // add an entry for the priority 2 horse in the result array
				res.push([item,[]]);
				break;
				case 3:
					// priority 3 is the winner of the exercice at this point, and has already been delt with, just do nothing in this case
				break;
				default: //Other priorities mean it's less than 1, if so it needs to be removed and logged
					console.log("(!)Horses Discarded(" + priority + "): " + JSON.stringify(object.splice(index,1))); // Splice function removes the item and following items, console.log displays them in the logs.
			}
		}
			
		priority --; // Each time we move laterally we need to drop priority by 1, as there is one less position available
		
	});
	priority ++; // Each time we exit the recursive function and go one level up we need to increase the priority by one as that level has 1 more position available
	return res;
}

/*************/
// Function to execute at the page loaded instantiate and execute the controller
$(document).ready(function()
{	
	controller = new controller(); // Instantiates the controller
	controller.generateHorses(); // Generates an array with horses and shuffles the array randomly
	controller.sortThemAll(); // Calls the main function
});