document.addEventListener('DOMContentLoaded', bindButtons); 

function bindButtons() {	
	/* ---------------------------------------------------------------------------------------------
                                    Add Payment
	-----------------------------------------------------------------------------------------------*/ 
	document.getElementById('addCard').addEventListener('click', function(event) {
		//Get the data from the form to use in the URL
		var cardNumber = document.getElementById('cardNumber').value;  
		var cvv = document.getElementById('cvv').value;
		var expMonth = document.getElementById('expMonth').value;
		var expYear = document.getElementById('expYear').value;

		if (cardNumber == "" || cvv == "" || expMonth == "" || expYear == "") 
		{
			alert("Please Fill out all Field");
		}
		else if (isNaN(cardNumber)){
			alert("Credit Card Number Must be Number");
		}
		else if(cardNumber.length != 16){
			alert("Credit Card Number Must be 16 Digits");
		}
		else{
			//Create a new HTTP request
			var req = new XMLHttpRequest(); 
			
			//Contruct a URL that sends a GET request to /insert with all of the necessary data
			var url = "/addPayment?cardNumber=" + cardNumber + "&cvv=" + cvv + "&expMonth=" + expMonth + "&expYear=" + expYear; 
			
			//Make the call
			req.open("GET", url, false); 
			req.addEventListener('load',function(){
				//If the request status is valid, update the table with the new value
				if(req.status >= 200 && req.status < 400){
					//Authenticate the login
					if (req.responseText === "Payment Added") {
						window.location = "/profile";
					}
					else {
						alert("Failed to add Payment");
					}
				} 
				//If the request status isn't valid, display an error message 
				else {
					alert("Failed to add Payment");
				}
			});				
			req.send(null); //no need to send additional data
		}
		
		
		event.preventDefault(); //prevent the page from refreshing
	});
}	
	
	