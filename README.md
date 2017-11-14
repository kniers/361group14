# 361group14
Carpooling app

Instructions for developers:
clone git repo to your account on the OSU flip server
run command:
	git clone https://github.com/kniers/361group14

Install the node packages with the command:
	npm install
	
To start the server for development, run:
	node server.js
If the port is taken, edit the file server.js to pick a new port
	app.set('port', 7526);  <- this is the line to change
	
To visit the site, you must be on the OSU VPN. See http://oregonstate.edu/helpdocs/network-and-phone/virtual-private-network-vpn
Then, use a browser to navigate to flip3.engr.oregonstate.edu:7526
If you are on a different flip number or different port, be sure to change them.


In case you haven't used git in a while,
you can stage files with:
	git add filename
or to stage all changes:
	git add -A
Then you commit your changes with:
	git commit -m "My commit message. This is what I changed..."
Finally, push your changes to the github repo:
	git push origin