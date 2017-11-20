document.addEventListener('DOMContentLoaded', bindButtons); 

function bindButtons() {	
	/* ---------------------------------------------------------------------------------------------
                                    Log In
	-----------------------------------------------------------------------------------------------*/ 
	document.getElementById('updatePassword').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var password = document.getElementById('newPassword').value;  
		
		if (password != "") {
			//Create a new HTTP request
			var req = new XMLHttpRequest(); 
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "/updatePassword?password=" + password; 
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					//Authenticate the login
					if (req.responseText === "Password Updated") {
						window.location = "/profile";
					}
					else {
						alert("Failed to update user password");
					}
				} 
				//If the request status isn't valid, display an error message 
				else {
					alert("Failed to update user password");
				}
			});				
			req.send(null); //no need to send additional data
		}
		else {
			alert("The password fields cannot be blank.");
		}
		
		event.preventDefault(); //prevent the page from refreshing
	});
}	
	