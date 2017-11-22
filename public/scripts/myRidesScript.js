document.addEventListener('DOMContentLoaded', getRides); 		

/* ---------------------------------------------------------------------------------------------
                                 Get Routes
-----------------------------------------------------------------------------------------------*/ 
function getRides() {	  
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 
	
	//Contruct a URL that sends a GET request to /add-route with all of the necessary data
	var url = "/get-rides"; 
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table with the new value
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			console.log(response);
			
			//If the user has routes, populate the table
			if (response.length != 0) {
				var rowCount = 0
				
				//Add routes to routes table
				for (i = 0; i <= response.length; i++) {	
					//Add rows to table
					var date = document.getElementById("rides").insertRow(rowCount);
					rowCount = rowCount + 1;
					var route = document.getElementById("rides").insertRow(rowCount);
					rowCount = rowCount + 1;
					var driver = document.getElementById("rides").insertRow(rowCount);
					rowCount = rowCount + 1;
					var rating = document.getElementById("rides").insertRow(rowCount);
					rowCount = rowCount + 1;
					var price = document.getElementById("rides").insertRow(rowCount);
					rowCount = rowCount + 1;
					
					//Populate rows with route info
					date.innerHTML = "<h2><b>" + response[i].date + ":</b><h2>";
					route.innerHTML = "<b>Route: </b>" + response[i].routeName;
					driver.innerHTML = "<b>Driver: </b>" + response[i].driverName;
					rating.innerHTML = "<b>Rating: </b>" + response[i].rating;
					price.innerHTML = "<b>Price: $</b>" + response[i].price;
				}
			}
			//Otherwise notify the user that they have no routes
			else {
				var message = document.getElementById("no routes");
				message.innerHTML = "You have no rides, you can add one by clicking below";
			}
			
		} 
		//If the request status isn't valid, display an error message 
		else {
			alert("Failed to populate rides.");
		}
	});				
	req.send(null); //no need to send additional data
}