
document.addEventListener('DOMContentLoaded', updateDropDowns); 
document.addEventListener('DOMContentLoaded', bindButtons); 


function updateDropDowns() {
	updateRouteDropDown();
	updateDriverDropDown();
	updateRatingDropDown();
}

/* ---------------------------------------------------------------------------------------------
                                    Add Ride
-----------------------------------------------------------------------------------------------*/ 
function bindButtons() {	
	document.getElementById('addRide').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var date = document.getElementById('date').value; 
		var name = document.getElementById('name').value; 
		var driver = document.getElementById('driver').value;  
		var mileage = document.getElementById('mileage').value;  
		var rating = document.getElementById('rating').value; 
		var price = calculatePrice();

		//UPDATE DRIVERS RATING
		updateDriverRating(driver, rating);
		
		//DETERMINE PRICE
		
	if (name != "" && date != "" && driver != "" && mileage != "" && rating != "" && price != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest(); 
			
			//Contruct a URL that sends a GET request to /add-route with all of the necessary data
			var url = "/add-ride?" +"name=" + name + "&date=" + date + "&driver=" + driver + "&mileage=" + mileage + "&rating=" + rating + "&price=" + price; 
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					console.log(req.responseText); 
					alert("Ride Added");
				} 
				//If the request status isn't valid, display an error message 
				else {
					alert("Failed to Add Ride.");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Please fill in all fields.");
		}
	});
}

/* ---------------------------------------------------------------------------------------------
                                    UPDATE ROUTE DROP DOWN
-----------------------------------------------------------------------------------------------*/
function updateRouteDropDown() {
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = "/get-routes";
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			//Parse the JSON response
			var response = JSON.parse(req.responseText); 
			
			//DELETE OLD CONTENTS OF DROP DOWN MENU 
			
			//Delete contents from drop down 1
			if (document.getElementById("name").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("name").length - 1); i >= 0; i--) {
					document.getElementById("name").remove(i);
				}
			}
			
			// ADD UPDATED DROP DOWN CONTENTS 
			
			for (let i = 0; i < response.length; i++) {	
				//Add updated options to drop down menu 1
				var option = document.createElement("option");
				option.text = response[i].name;
				option.value = response[i].name;
				document.getElementById("name").add(option);
			}
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null); //no need to send additional data
}

/* ---------------------------------------------------------------------------------------------
                                    UPDATE DRIVER DROP DOWN
-----------------------------------------------------------------------------------------------*/
function updateDriverDropDown() {
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = "/get-drivers";
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			//Parse the JSON response
			var response = JSON.parse(req.responseText); 
			
			//DELETE OLD CONTENTS OF DROP DOWN MENU 
			
			//Delete contents from drop down 1
			if (document.getElementById("driver").length > 0) {
				//Delete the options in reverse order to avoid missing options
				for (i = (document.getElementById("driver").length - 1); i >= 0; i--) {
					document.getElementById("driver").remove(i);
				}
			}
			
			// ADD UPDATED DROP DOWN CONTENTS 
			
			for (let i = 0; i < response.length; i++) {	
				//Add updated options to drop down menu 1
				var option = document.createElement("option");
				option.text = response[i].username;
				option.value = response[i].username;
				document.getElementById("driver").add(option);
			}
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null); //no need to send additional data
}

/* ---------------------------------------------------------------------------------------------
                                    UPDATE RATING DROP DOWN
-----------------------------------------------------------------------------------------------*/
function updateRatingDropDown() {		
	for (let i = 10; i > 0; i--) {	
		//Add values 1 through 10 to rating drop down
		var option = document.createElement("option");	
		if(i==1){
			option.text = "1 (worst)";
		}
		else if(i==10){
			option.text = "10 (best)";
		}
		else{
			option.text = i
		}
		option.value = i;
		document.getElementById("rating").add(option);
	}
}

/* ---------------------------------------------------------------------------------------------
                                    CALCULATE DRIVER RATING
-----------------------------------------------------------------------------------------------*/
function getDriverRating(driverName, r) {
	var rating = 0;
	var numRides = 0;
	
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = "/get-driver-rides?" + "name=" + driverName;
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			//Parse the JSON response
			var response = JSON.parse(req.responseText); 
			console.log(response);
			
			if (response.length > 0) {
				for (let i = 0; i < response.length; i++) {
					rating = rating + response[i].rating;
					numRides = numRides + 1;
				}
			}
		
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null); //no need to send additional data
	//event.preventDefault(); //prevent the page from refreshing
	
	//Calcualte New Average With New Rating r
	numRides = numRides + 1;
	rating = parseInt(rating) + parseInt(r);
	rating = rating/numRides; //determine average
	
	return rating
}

/* ---------------------------------------------------------------------------------------------
                                    UPDATE DRIVER RATING
-----------------------------------------------------------------------------------------------*/
function updateDriverRating(driverName, r) {
	var rating = getDriverRating(driverName, r);
	console.log(rating);
	
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = "/update-rating?" + "name=" + driverName + "&rating=" + rating;
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
	
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null); //no need to send additional data
	//event.preventDefault(); //prevent the page from refreshing
}

/* ---------------------------------------------------------------------------------------------
                                    DETERMINE PRICE
-----------------------------------------------------------------------------------------------*/
function calculatePrice() {
	var mileage = document.getElementById('mileage').value;  
	var name = document.getElementById('name').value; 
	var fee = 5;
	var price;
	var distance;
	
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = "/get-routes?" + "name=" + name;
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			//Parse the JSON response
			var response = JSON.parse(req.responseText); 
			
			
			if (response.length > 0) {
					distance = response[0].distance;
			}
		
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null); //no need to send additional data
	//event.preventDefault(); //prevent the page from refreshing
	
	//Calculate and price
	price = (2.5*(distance/mileage)) + fee;
	return price;
}