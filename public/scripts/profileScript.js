document.addEventListener('DOMContentLoaded', getUserInfo); 		

/* ---------------------------------------------------------------------------------------------
                                 Get Routes
-----------------------------------------------------------------------------------------------*/ 
function getUserInfo() {	  
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 
	
	//Contruct a URL that sends a GET request to /add-route with all of the necessary data
	var url = "/get-user"; 
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table with the new value
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			console.log(response);
			
			//If the user has routes, populate the table
			if (response.length != 0) {
					//Add rows to table
					var username = document.getElementById("info").insertRow(0);
					var rating = document.getElementById("info").insertRow(1);
					
					//Populate rows with user info
					username.innerHTML = "<b>Username: " + response[0].username + "</b>";
					rating.innerHTML = "<b>Rating: " + response[0].rating + "/10</b>";
			}
		} 
		//If the request status isn't valid, display an error message 
		else {
			alert("Failed to populate rides.");
		}
	});				
	req.send(null); //no need to send additional data
}