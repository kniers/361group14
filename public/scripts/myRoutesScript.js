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
				//Add routes to routes table
				for (i = 0; i <= response.length; i++) {
					if (i == 0) {
						//Add table headers 
						var row = document.getElementById("routes").insertRow(i);
						
						var num = row.insertCell(0);
						var startLocation = row.insertCell(1);
						var endLocation = row.insertCell(2);
						var startTime = row.insertCell(3);
						var endTime = row.insertCell(4);
						var distance = row.insertCell(5);
						
						num.innerHTML = "<center><b>Route #</b></center>";
						startLocation.innerHTML = "<center><b>Start</b></center>";
						endLocation.innerHTML = "<center><b>End</b></center>";
						startTime.innerHTML = "<center><b>Depart</b></center>";
						endTime.innerHTML = "<center><b>Arrive</b></center>";
						distance.innerHTML = "<center><b>Distance (mi)</b></center>";
					}
					else {
						//Then add table contents
						var row = document.getElementById("routes").insertRow(i);
						
						var num = row.insertCell(0);
						var startLocation = row.insertCell(1);
						var endLocation = row.insertCell(2);
						var startTime = row.insertCell(3);
						var endTime = row.insertCell(4);
						var distance = row.insertCell(5);
						
						num.innerHTML = "<center>" + i + "</center>"
						startLocation.innerHTML = "<center>" + response[i-1].startLocation + "</center>";
						endLocation.innerHTML = "<center>" + response[i-1].endLocation + "</center>";
						startTime.innerHTML = "<center>" + response[i-1].startTime + "</center>";
						endTime.innerHTML = "<center>" + response[i-1].endTime + "</center>";
						distance.innerHTML = "<center>" + response[i-1].distance + "</center>";
					}
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