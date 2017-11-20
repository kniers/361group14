document.addEventListener('DOMContentLoaded', pullUserID);

//Set the port value
var flip = "http://flip2.engr.oregonstate.edu:"
var port = "3147"; 

//User ID
var userID;

function pullUserID() {
	//Create a new HTTP request
	var req = new XMLHttpRequest(); 

	//Construct a URL that will send a Select request for the desired table
	var url = flip + port + "/get-user-id";
	
	//Make the call
	req.open("GET", url, false); 
	req.addEventListener('load',function(){
		//If the request status is valid, update the table
		if(req.status >= 200 && req.status < 400){
			//Parse the JSON response
			var response = JSON.parse(req.responseText); 
			console.log("User ID: " + response[0].id);
			userID = response[0].id;
		} 
		//If the request status isn't valid, display an error message with the request status
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	//req.send(null); //no need to send additional data
} 

//console.log("User ID: " + userID);