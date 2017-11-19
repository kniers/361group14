document.addEventListener('DOMContentLoaded', bindButtons); 

//Set the port value
var flip = "http://flip2.engr.oregonstate.edu:"
var port = "3147"; 

function bindButtons() {	
	/* ---------------------------------------------------------------------------------------------
                                    Add New User
	-----------------------------------------------------------------------------------------------*/ 
	document.getElementById('newUser').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var username = document.getElementById('registerUsername').value; 
		var password = document.getElementById('registerPassword').value;  
		
		if (username != "" && password != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest(); 
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = flip + port + "/add-user?" + "username=" + username + "&password=" + password; 
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					console.log(req.responseText); 
					alert("User Created");
				} 
				//If the request status isn't valid, display an error message 
				else {
					alert("This user already exists.");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("The username and password fields cannot be blank.");
		}
	});
}