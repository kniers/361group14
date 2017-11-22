document.addEventListener('DOMContentLoaded', getRoutes); 		

/* ---------------------------------------------------------------------------------------------
                                 Get Routes
-----------------------------------------------------------------------------------------------*/ 
function getRoutes() {	  
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 
	
	//Contruct a URL that sends a GET request to /add-route with all of the necessary data
	var url = "/get-routes"; 
	
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
					var name = document.getElementById("routes").insertRow(rowCount);
					rowCount = rowCount + 1;
					var startLocation = document.getElementById("routes").insertRow(rowCount);
					rowCount = rowCount + 1;
					var endLocation = document.getElementById("routes").insertRow(rowCount);
					rowCount = rowCount + 1;
					var startTime = document.getElementById("routes").insertRow(rowCount);
					rowCount = rowCount + 1;
					var endTime = document.getElementById("routes").insertRow(rowCount);
					rowCount = rowCount + 1;
					var distance = document.getElementById("routes").insertRow(rowCount);
					rowCount = rowCount + 1;
					
					//Populate rows with route info
					name.innerHTML = "<h2><b>" + response[i].name + ":</b><h2>";
					startLocation.innerHTML = "<b>Start Location: </b>" + response[i].startLocation;
					endLocation.innerHTML = "<b>End Location: </b>" + response[i].endLocation;
					startTime.innerHTML = "<b>Departure Time: </b>" + response[i].startTime;
					endTime.innerHTML = "<b>Arrival Time: </b>" + response[i].endTime;
					distance.innerHTML = "<b>Distance: </b>" + response[i].distance + " miles";
				}
			}
			//Otherwise notify the user that they have no routes
			else {
				var message = document.getElementById("no routes");
				message.innerHTML = "You have no routes, you can add them by clicking below";
			}
			
		} 
		//If the request status isn't valid, display an error message 
		else {
			alert("Failed to populate routes.");
		}
	});				
	req.send(null); //no need to send additional data
}