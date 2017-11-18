port = 7363;

document.addEventListener('DOMContentLoaded', bindButton);

function bindButton() {

	// Submit button makes a POST request to add a new workout
	document.getElementById('newUserSubmit').addEventListener('click', function(event){
		event.preventDefault();
		var req = new XMLHttpRequest();
		
		// Create payload
		var payload = {};
		payload.newUsername = document.getElementById("registerUsername").value; // Make required
		if (payload.newUsername == "") {
			document.getElementById("usernameLabel").style.color = "red";
			return;
		}
		else {
			document.getElementById("usernameLabel").style.color = "black";
		}
		payload.newPassword = document.getElementById("registerPassword").value; // Make required
		if (payload.newPassword == "") {
			document.getElementById("passwordLabel").style.color = "red";
			return;
		}
		else {
			document.getElementById("passwordLabel").style.color = "black";
		}
		
		// Asynchronous POST request
		req.open("POST", "http://flip3.engr.oregonstate.edu:" + port + "/newuser/", true);
		req.setRequestHeader('Content-Type', 'application/json');
		
		// Asynchronous event listener
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
			} else {
				console.log("Error in network request: " + req.statusText);
			}
		});
		
		req.send(JSON.stringify(payload));
		
	});
}