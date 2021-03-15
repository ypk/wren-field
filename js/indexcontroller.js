define(['Field', 'Animal'], function(Field, Animal) {
	var selectedAnimals = [],
		selectedAnimalsGender = [], // selected genders
		animalParentsName = [], // parents name array
		animalGender = ["Female", "Male"], // genders
		selectedAnimalType = "", // selected animal class
		templateGenderCellPostion = 3, // gender position in table
		totalTemplateCellsCount = 5; // total cells (td) in table
	// add animal button
	var addAnimalBtn = document.getElementById('animalSpawner');
	// add animal button event handler
	addAnimalBtn.addEventListener("click", function(e) {
		var animalName = document.getElementById('animalName'), // get title field element
			name = animalName.value, // get title 
			regex = /^[a-zA-Z]+$/, // regex to make sure title is alphabet string
			errorsCount = 0; // error count
		if (e.target && e.target.nodeName === "BUTTON") {
			if (!((name !== "" || name !== null) && name.match(regex))) { // check if title field is empty
				errorsCount++;
				alert("Please enter a valid name");
			}
			if (selectedAnimalType === "" || typeof(selectedAnimalType) === "undefined") { // check if animal type isnt selected
				errorsCount++;
				alert("Please select animal type");
			}
			if (errorsCount === 0) { // everything is A-OK
				var gender = e.target.id; // pull gender from field id (id = Male/Female)
				populateAnimal(name, gender, selectedAnimalType); // populate animal
			}
		}
	});
	// branded animals arrray
	var brandedAnimals = [];
	// function saves all branded animals
	var getBrandedAnimals = function(){
		var animalsSpawned = document.getElementById("animalSpawned"); // animal spawned div
		for (var i = 1; i < animalSpawned.rows.length; i++) { // loop through the rows in the div
			(function(idx) {
				if(animalSpawned.rows[idx].className === "branded"){ // if animal is branded
					brandedAnimals.push(animalSpawned.rows[idx].id); // save branded animal into array
				}
			})(i);
		}
	};
	// select animal type button
	var selectAnimalTypeBtn = document.getElementById('animalType');
	selectAnimalTypeBtn.addEventListener("click", function(e) { // animal type button handler
		var childNodes = selectAnimalTypeBtn.childNodes; // animal type buttons
		for (var x = 0; x < childNodes.length; x++) { // loop through available types
			if (childNodes[x].nodeName === "BUTTON") { // if button is clicked
				if (childNodes[x].id === e.target.id) {
					selectedAnimalType = e.target.id; // store animal type
					e.target.className = "btn selected"; // indicate animal type selected
				} else {
					childNodes[x].className = "btn"; // clear animal type selection
				}
			}
		}
	});
	// clear selected animals
	var clearSelectedAnimals = function() {
		selectedAnimals = [];
	};
	// clear animal parents names
	var clearAnimalParentsName = function() {
		animalParentsName = [];
	};
	// clear selected animal type
	var clearSelectedAnimalType = function() {
		var selectAnimalTypeBtn = document.getElementById('animalType'); // select animal type button holder
		var childNodes = selectAnimalTypeBtn.childNodes; // animal type buttonss
		for (var x = 0; x < childNodes.length; x++) { // loop through available types
			if (childNodes[x].nodeName === "BUTTON") {
				childNodes[x].className = "btn"; // clear animal type button selection
			}
		}
		selectedAnimalType = ""; // clear animal type selection
	};
	// function returns 50% chance of breeding (i.e., true or false)
	var canBreed = function() {
		return (Math.random() < 0.5);
	};
	// function returns random gender
	var randomiseGender = function() {
		var randomGenderIndex = Math.round(Math.random() * 1); // returns 0 or 1
		return animalGender[randomGenderIndex]; // returns gender from animalGender array
	};
	// function clears animal selections
	var clearAnimalSelection = function() {
		for (var x in selectedAnimals) { // loop through selected animals UI
			var selectedAnimal = document.getElementById(selectedAnimals[x]); // get selected animal
			selectedAnimal.style.fontWeight = "normal"; // de-select animal types
		}
		selectedAnimalsGender = []; // empty selected animal types
	};
	// function returns if animals selected are beedable
	var isSelectedAnimalBreedable = function() {
		// check if animals are of different gender and same type
		if ((selectedAnimalsGender[0].animalGender !== selectedAnimalsGender[1].animalGender) && (selectedAnimalsGender[0]
				.animalType === selectedAnimalsGender[1].animalType)) {
			return true;
			// check if animals are of same gender and different type
		} else if ((selectedAnimalsGender[0].animalGender === selectedAnimalsGender[1].animalGender) && (
				selectedAnimalsGender[0].animalType !== selectedAnimalsGender[1].animalType)) {
			return false;
		}
	};
	// function to get animal parent names
	var getAnimalParents = function() {
		clearAnimalParentsName(); // clear previously selected parent names
		for (var x in selectedAnimalsGender) { // loop through selected animals gender
			var animalIndex = selectedAnimalsGender[x].animalIndex; // get animal index from table
			var animal = document.getElementById(animalIndex); // animal index id
			var cells = animal.cells; // get all animal cells
			var cellLength = cells.length; // get cell length
			if (cellLength !== totalTemplateCellsCount) { // check if cells are intact (not mandatory)
				alert("Error! Script Failed to fetch Cell Property."); // cells are not intact
				return false;
			}
			var keyItem = 1, // get cell property from position 1
				cellProperty = cells[keyItem]; // get cell property from position 1
			var animalName = cellProperty.innerHTML; // get cell value from position 1
			animalParentsName.push(animalName); // save cell values in array
		}
		return animalParentsName; // return saved cell values
	};
	// function returns animal type from animal id
	var getAnimalType = function(animal) {
		var row = document.getElementById(animal); // fetch animal row from given animal id
		var cells = row.cells; // fetch all cells from animal row
		var cellLength = cells.length; // get cell length
		if (cellLength !== totalTemplateCellsCount) { // check if cells are intact (not mandatory)
			alert("Error! Script Failed to fetch Cell Property.");
			return false;
		}
		var lastItem = cellLength - 1, // get cell property from cellLength - 1 (animalType)
			cellProperty = cells[lastItem]; // get cell property from cellLength - 1 (animalType)
		var animalType = cellProperty.innerHTML; // get cell value from position cellLength - 1 
		return animalType; // return cell value
	};
	// function retrns animal gender from animal id
	var getAnimalGender = function(animal) {
		var row = document.getElementById(animal); // fetch animal row from given animal id
		var cells = row.cells; // fetch all cells from animal row
		var cellLength = cells.length; // get cell length
		if (cellLength !== totalTemplateCellsCount) { // check if cells are intact (not mandatory)
			alert("Error! Script Failed to fetch Cell Property.");
			return false;
		}
		var lastItem = cellLength - templateGenderCellPostion, // get cell property from cellLength - templateGenderCellPostion (animalGender)
			cellProperty = cells[lastItem]; // get cell property from cellLength - templateGenderCellPostion (animalGender)
		var animalGender = cellProperty.innerHTML; // get cell value from position cellLength - templateGenderCellPostion 
		return animalGender; // return cell value
	};
	// function rebinds event handler to animal rows
	var reBinder = function() {
		var animalsSpawned = document.getElementById("animalSpawned"); // animal spawned div
		for (var i = 0; i < animalSpawned.rows.length; i++) { // loop through the rows in the div
			(function(idx) {
				animalSpawned.rows[idx].addEventListener("click", function(e) { // add event handler to rows
					e.stopPropagation();
					if (e.target && e.target.nodeName === "TD") { // if rows is td (integrity check)
						var parent = e.target.parentElement, // fetch parent element (tr)
							parentId = parent.id; // get parent id (animal id)
						if (selectedAnimals.indexOf(parentId) >= 0) { // if animal already selected
							var index = selectedAnimals.indexOf(parentId); // get position from selected array
							selectedAnimals.splice(index, 1); // remove animal
							parent.style.fontWeight = "normal"; // state UI that animal is removed
						} else {
							selectedAnimals.push(parentId); // animal is added to selectedAnimals array
							parent.style.fontWeight = "bold"; // state UI that animal is added
						}
					}
				});
			})(i);
		}
	};
	// brand animal button element
	var brandAnimalBtn = document.getElementById('brand');
	brandAnimalBtn.addEventListener("click", function() { // brand animal button event handler
		if (selectedAnimals.length > 0) { // if some animals are selected
			var isNotified = false;
			for (var x in selectedAnimals) { // loop through the selected animals
				var selectedAnimal = document.getElementById(selectedAnimals[x]); // selected animal
				if (selectedAnimal.className === "branded") { // if animal is already branded
					if (!isNotified) { // flag to limit notification
						alert("You cannot brand an already branded animal");
						isNotified = true;
					}
					return false;
				} else { // animal is not branded
					selectedAnimal.className = "branded"; // change Animal UI to branded
					selectedAnimal.style.fontWeight = "normal"; // deselect animal
				}
			}
		} else { // no animal is selected
			alert("Please select an Animal first!");
		}
		clearSelectedAnimals(); // clear selected animals
	});
	// breed animal button
	var breedAnimalBtn = document.getElementById('breed');
	breedAnimalBtn.addEventListener("click", function() { // breed animal button handler
		if (selectedAnimals.length === 2) { // if animal selected are two animals
			var isNotifiedA = false, // notification flag
				initBreeding = false; // init breeding flag
				animalParentType = "";
			for (var x in selectedAnimals) { // loop through selected animals
				var selectedAnimal = document.getElementById(selectedAnimals[x]); // selected animal
				if (selectedAnimal.className === "branded") { // check if animal is branded
					if (!isNotifiedA) {
						alert("You cannot breed a branded Animal"); // notify
						isNotifiedA = true;
					}
					return false;
				} else { // animal is not branded
					gender = getAnimalGender(selectedAnimals[x]); // fetch animal gender
					type = getAnimalType(selectedAnimals[x]); // fetch animal type
					animalParentType = type; // save animal parent type for child animal
					selectedAnimalsGender.push({
						animalIndex: selectedAnimals[x],
						animalGender: gender,
						animalType: type
					}); // push animal properties into selectedAnimalsGender Array
					initBreeding = true; // set start breed to true
				}
			}
			if (initBreeding) { // start breed is true
				getBrandedAnimals(); // save all branded animals
				if (isSelectedAnimalBreedable()) { // make gender and type checks
					var animalParents = getAnimalParents(); // get selected animal parent names
					if (canBreed()) { // check 50% breeding condition 
						var name = prompt("Please enter a name for the newly bred animal"); // ask for animal name
						if (name === null || name === "") { // animal name not supplied
							name = "animal" + Math.round(Math.random() * 300);
						}
						var type = animalParentType; // get child animal type from parent
						var gender = randomiseGender(); // randomizing gender
						var parents = animalParents.toString().split(",").join(", "); // prettify parent names
						populateAnimal(name, gender, type, parents); // populating breeded animal
						for(var x in brandedAnimals){ // loop through branded animals
							document.getElementById(brandedAnimals[x]).className = "branded"; // re-brand the animals
						}
						brandedAnimals=[];
					} else { // 50% breeding condition failed
						alert("Breeding Failed!");
					}
				} else { // gender or type mismatch
					alert("Biologically, that is impossible!");
				}
				clearSelectedAnimalType(); // clear selected animal type
				clearAnimalSelection(); // clear breeding animals selection
				initBreeding = false; // stop breeding flag
			}
			clearSelectedAnimals(); // clear selected animal
		} else { // if animals selected are not 2
			if (selectedAnimals.length === 0) { // if none of animals are selected
				alert("Please select an Animal first");
			} else if (selectedAnimals.length < 2) { // if only 1 animal is selectd
				alert("Please select correct pair of Animals first");
			} else if (selectedAnimals.length > 2) { // if more than 2 animals are selected
				alert("Its not possible to breed the selected animals");
			}
		}
	});
	// field container
	var fieldNode = document.getElementById('fieldContainer');
	// create a field, passing the node to render html to
	var field = new Field();
	// render the field html
	fieldNode.innerHTML = field.render();
	var populateAnimal = function(name, gender, type, parent) {
		var animal = new Animal(name, gender, type, parent);
		field.add(animal);
		fieldNode.innerHTML = field.render();
		reBinder();
	}
});
