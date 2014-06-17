



function preventBehavior(e) {
	e.preventDefault();
}

function loadError(e) {
	logDisplay("ERROR type" + e.type);
}
document.addEventListener("touchmove", preventBehavior, false);
document.addEventListener("onerror", loadError, false);
window.onerror = function(message, url, lineNumber) {
	logDisplay("JS Error: " + message + " in " + url + " at line " + lineNumber);
}

var tf = null;
function showTabBar() {

	if (typeof notificationFromBackground !== 'undefined') {
		logDisplay("background notification: " + notificationFromBackground);
		onNotificationAPN(notificationFromBackground);
	}
	logDisplay("tabBar, NavBar init");

	viewstack = new Moobile.ViewControllerStack;
	windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Settings(), new Moobile.ViewTransition.None);
	if (window.localStorage.getItem("settings_ok") != null) {
		logDisplay("Not first run");
	} else {
		logDisplay("First run");
	}

	//tf.passCheckpoint(successtf, fail_tf, 'Init OK!');
}

function inputSelected(id, value) {
	logDisplay("inputSelected: " + id + " : " + value);
	$("#" + id).val(value);
}

function GAinit(id) {
	if (id == "")
		return false;
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "trackerWithTrackingId", [id]);
}

function logEvent(name) {
	if (device.platform == "iOS") {
		cordova.exec(null, null, "GoogleAnalyticsPlugin", "trackView", ["/ios/" + name]);
	}
}

function trackEvent(action, label, value) {
	if (device.platform == "iOS") {
		cordova.exec(null, null, "GoogleAnalyticsPlugin", "trackEventWithCategory", {category: "ios", action: action, label: label, value: value});
	}
}

function win_tf() {
	logDisplay(device.name + " " + device.uuid);
	//tf.setDeviceIdentifier(successtf, fail_tf, device.name+" "+device.uuid);
}

function successtf() {

}

function fail_tf(e) {
	logDisplay(e.getMessage());
}

function sendFeedDialog(title, lead, link) {
	cordova.exec(null, null, "FbFeedPlugin", "sendMessage", [title, lead, link]);
}

jQuery.fn.applyMetaData = function() {
	// Find all the embedded script meta-data tags and
	// iterate of them to individually apply them to the
	// direct parent node.
	this.find("script.meta-data").each(
			function(nodeIndex, scriptTag) {
				var script = $(this);
				var parent = script.parent();
				var metaData = {};
				logDisplay("applymetadata "+script.html());
				// Try to evaluate the JSON meta data.
				try {
					metaData = eval("(" + script.html() + ")");
				} catch (error) {
					// JSON was not valid.
				}

				// Store meta data into parent.
				parent.data(
						"metaData",
						jQuery.extend(
								{},
								parent.data("metaData"),
								metaData
								)
						);
			}
	)

			// Once the script tags have been processed,
			// remove them from the DOM.
			.remove()
			;

	// Return the collection without the script tags.
	return(this.not("script.meta-data"));
}

(function($){

    $.fn.loadDebuggable = function(url){

        data = typeof(arguments[1]) == "object"?arguments[1]:{};
        success = arguments[2]||typeof(arguments[1]) == "function"?arguments[1]:function(){};
        return $.ajax(url,{
            "context":this,
            "success":[function(data){
                var div = document.createElement('DIV');
                div.innerHTML = data;
                this[0].innerHTML = "";
                while (div.firstChild) 
                 {
                    this[0].appendChild(div.firstChild);
                    div.removeChild(div.firstChild);
                 };


            },success],
            "type":"GET",
            "data":data
            });
    }
})(jQuery);