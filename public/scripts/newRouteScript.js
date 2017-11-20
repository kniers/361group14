document.addEventListener('DOMContentLoaded', bindButtons); 

function bindButtons() {	
	/* ---------------------------------------------------------------------------------------------
                                    Add Route
	-----------------------------------------------------------------------------------------------*/ 
	document.getElementById('addRoute').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var startLocation= document.getElementById('startLocation').value; 
		var endLocation = document.getElementById('endLocation').value;  
		var startTime = document.getElementById('depart').value;  
		var endTime = document.getElementById('arrive').value;  
		var distance = document.getElementById('distance').value;  
		var monday = document.getElementById('monday').value;  
		var tuesday = document.getElementById('tuesday').value;  
		var wednesday = document.getElementById('wednesday').value;  
		var thursday = document.getElementById('thursday').value;  
		var friday = document.getElementById('friday').value;  
		var saturday = document.getElementById('saturday').value;  
		var sunday = document.getElementById('sunday').value;  
		
	if (startLocation != "" && endLocation != "" && startTime != "" && endTime != "" && distance != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest(); 
			
			//Contruct a URL that sends a GET request to /add-route with all of the necessary data
			var url = "/add-route?" + "startLocation=" + startLocation + "&endLocation=" + endLocation + "&startTime=" + startTime + "&endTime=" + endTime + "&monday=" + monday + "&tuesday=" + tuesday + "&wednesday=" + wednesday + "&thursday=" + thursday + "&friday=" + friday + "&saturday=" + saturday + "&sunday=" + sunday + "&distance=" + distance; 
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					console.log(req.responseText); 
					alert("Route Added");
				} 
				//If the request status isn't valid, display an error message 
				else {
					alert("Failed to Add Route.");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("Please fill in all fields.");
		}
	});
}