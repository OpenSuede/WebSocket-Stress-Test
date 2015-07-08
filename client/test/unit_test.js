QUnit.test( "Loading Configuration File", function( assert ) {
	assert.expect( 2 );
	assert.equal( 
		typeof(SuedeConfig.numberOfConnections),
		"number",
		"We expect value of SuedeConfig.numberOfConnections to be of type 'Number'" 
	);
	assert.equal( 
		typeof(SuedeConfig.serverHost),
		"string",
		"We expect value of SuedeConfig.serverHost to be of type 'String'" 
	);
});
/*
QUnit.test( "WebSocket Echo Test", function( assert ) {
	assert.expect( 2 );
	var backupWebSocket = undefined;
	var backupDisplayVal = document.getElementById("WebSocketSupport").innerHTML; // backup real value
	if(WebSocket !== undefined) {
		backupWebSocket = WebSocket; //Backup real WebSocket function if it exists
	}
	function WebSocket(){//TODO Fix this object
        this.message = "";
        this.send = function(string){
            this.message = string;
        };
        this.onopen();
        this.onmessage(this.message);
    }; // Fake Support for WebSockets
	detectWebSockets(); // run WebSocket Support Checker
	assert.equal( 
		document.getElementById("EchoResult").innerHTML,
		"Success",
		"We expect value to be the result of the echo test to be 'Success'"
	);
	WebSocket = 0; // Disable WebSockets temporarily
	detectWebSockets(); // run WebSocket Support Checker again
	assert.equal( 
		document.getElementById("EchoResult").innerHTML,
		"Failed",
        "We expect value to be the result of the echo test to be 'Failed'"
	);
	if(backupWebSocket !== undefined) {
		WebSocket = backupWebSocket;
	}
	document.getElementById("WebSocketSupport").innerHTML = backupDisplayVal;// Reset to true value
});*/

QUnit.test( "WebSocket Support Checker", function( assert ) {
    assert.expect( 2 );
    var backupWebSocket = undefined;
    var backupDisplayVal = document.getElementById("WebSocketSupport").innerHTML; // backup real value
    if(WebSocket !== undefined) {
        backupWebSocket = WebSocket; //Backup real WebSocket function if it exists
    }
    WebSocket = function (){}; // Fake Support for WebSockets
    detectWebSockets(); // run WebSocket Support Checker
    assert.equal(
        document.getElementById("WebSocketSupport").innerHTML,
        "Support Confirmed",
        "We expect value to be 'Support Confirmed' when support faked"
    );
    WebSocket = 0; // Disable WebSockets temporarily
    detectWebSockets(); // run WebSocket Support Checker again
    assert.equal(
        document.getElementById("WebSocketSupport").innerHTML,
        "Not Supported",
        "We expect value to be 'Not Supported' when support disabled"
    );
    if(backupWebSocket !== undefined) {
        WebSocket = backupWebSocket;
    }
    document.getElementById("WebSocketSupport").innerHTML = backupDisplayVal;// Reset to true value
});

QUnit.test( "WebSocket Connection Generator", function( assert ) {
	assert.expect(2);
	var ipAddress = "x.x.x.x";
    var portNum = 80;
	var count = 2000;
	var backupIPVal = document.getElementById("IPAddress").innerHTML;
	var backupCountVal = document.getElementById("ConnectionCount").innerHTML;
	makeWebSocketConnections(count, ipAddress, portNum); //make test run
	assert.equal( 
		document.getElementById("IPAddress").innerHTML,
		ipAddress,
		"IP Address is set properly to '" + ipAddress + "' on the display" 
	);
    assert.equal(
        document.getElementById("PortNumber").innerHTML,
        portNum,
        "Port Number is set properly to '" + portNum + "' on the display"
    );
	//Expected to fail until we set up makeWebSocketConnections() properly
	assert.equal( 
		document.getElementById("ConnectionCount").innerHTML,
		count,
		"Connection count was set properly to '" + count + "'" 
	);
	document.getElementById("IPAddress").innerHTML = backupIPVal;
	document.getElementById("ConnectionCount").innerHTML = backupCountVal;
});
