

Class.refactor(Moobile.ScrollView, {
	options: {
		scroller: 'IScroll'
	}
});
var storage = window.localStorage;
var controllerClass;
var listController;
var infoController;
var ViewController = {
	Component: {},
	Event: {}
};
var eventTime = 0;
var switcherName = "";
var db = null;
ViewController.MainViewController = new Class({
	Extends: Moobile.ViewController,
	db: null,
	sync: null,
	iosBackButton: false,
	restClient: null,
	activityIndicator: null,
	screenName: null,
	loadView: function() {

		var restSettings = {"url": "http://dev.h2online.hu/igenx_server/api"};
		this.restClient = new RestClient(restSettings);
		logDisplay("REST: "+this.restClient);
		this.sync = new DBSync(this.restClient, db);
		this.sync.initFileSystem();
		this.activityIndicator = new Moobile.ActivityIndicator();
		this.view.addChildComponent(this.activityIndicator);
		this.activityIndicator.hide();

		//this.view.addEvent('swipe', this.bound('viewSwipe'));
		
		if (this.screenName != null) {
			this.logScreen(this.screenName);
		}

	},
	viewDidBecomeReady: function() {
		Localization.apply_to_current_html();
		logDisplay("clear main switch event from MainViewController");
		this.parent();
	},
	viewWillEnter: function() {
		logDisplay("clear main switch event from MainViewController");
		if (device.platform==="iOS") {
			navBar.hideLeftButton();
			logDisplay("leftnavbutton " +this.iosBackButton);
			if (this.iosBackButton==true) {
				logDisplay("showleftnavbutton");
				navBar.showLeftButton();
			}
		}		
		this.parent();
	},
	logScreen: function(screenName) {
		analytics.sendAppView(device.platform+"/"+screenName, function() { logDisplay("Analytics DONE"); }, function() { logDisplay("Analytics ERROR"); });
	},
	destroy: function() {

		this.parent();
	},
	viewWillLeave: function() {
		this.parent();
	},
	backToPrevView: function() {
		viewstack.popViewController();
	},
	viewSwipe: function(event) {
		logDisplay(event.direction + " " + event.start.x + ":" + event.start.y + " " + event.end.x + ":" + event.end.y);
		if (event.direction == 'right' && event.end.x - event.start.x > 40) {
			//this.backToPrevView();
		}
	},
	showMessage: function(message, title, buttonname) {
		if (typeof buttonname == "undefined") {
			buttonname = Localization.trans("ok");
		}
		navigator.notification.alert(
				message, // message
				function() {
				}, // callback
				title, // title
				buttonname                  // buttonName
				);
	},
	showError: function(message) {
		navigator.notification.alert(
				message, // message
				function() {
				}, // callback
				Localization.trans("hiba"), // title
				Localization.trans("ok")                 // buttonName
				);
	},
	errorCB: function(err) {
		logDisplay("SQL ERROR " + err.code + " : " + err.message);
	},
	onErrorLocation: function() {
		var controller = this;
		if (device.platform == "android" || device.platform == "Android") {

			navigator.notification.alert(
					Localization.trans("error_location_android"), // message
					function() {
						viewstack.popViewController();
					}, // callback
					Localization.trans("hiba"), // title
					Localization.trans("ok")
					// buttonName
					);
		} else {
			navigator.notification.alert(
					Localization.trans("error_location"), // message
					function() {
						viewstack.popViewController();
					}, // callback
					Localization.trans("hiba"), // title
					Localization.trans("ok")
					// buttonName
					);
		}

	},
	getGPSPosition: function(successhandler, errorhandler) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var gps_X = position.coords.latitude;
			var gps_Y = position.coords.longitude;
			successhandler(gps_X, gps_Y);
		}, errorhandler ? errorhandler : this.onErrorLocation, {maximumAge: 5000, timeout: 5000, enableHighAccuracy: true});
	},
	//custom methods
	openMainPage: function() {
		var self = this;
		viewstack = new Moobile.ViewControllerStack;
		windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Settings(), new Moobile.ViewTransition.None);
	}
});


