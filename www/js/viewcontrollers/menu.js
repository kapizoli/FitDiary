ViewController.Menu = new Class({
    Extends: ViewController.MainViewController,
	loadView: function() {
		this.view = Moobile.View.at('templates/menu.html');
		console.log(this.view.getChildComponents());
		this.screenName = "fokepernyo";
		this.parent();
	},
	viewDidLoad: function() {
//		/* Start DB sync */
//		var self = this;
//        if (!storage.getItem('nofirst')) {
//            /* ElsĹ‘ indĂ­tĂˇs, beĂˇllĂ­t */
//            storage.setItem("nofirst", true);
//            storage.setItem("pill_change", false);
//            this.sync.copyTable("day_events", "", function() { }, false);
//            
//            /* VerziĂłszĂˇm beĂˇllĂ­t */
//            this.restClient.get({ path: "settings?name=VerziĂł", success: function(data) { storage.setItem("version_number", data[0].value); },error: this.syncError});
//            /* DB sync */
//            //this.sync.copyTable("cholesterol", "", function() { }, true);
//            this.sync.copyTable("cholesterol", "", function() { });
//            this.sync.copyTable("pharmacy", "orderby=name", function() { });
//            this.sync.copyTable("pilltype", "", function() { });
//            
//            this.restClient.get({ path: "cholesterol_json", success: function(data) {  storage.setItem("cholesterol_json", JSON.encode(data)); sr = data; }, error: function(error) { logDisplay("REST error code: " + error.code);}});
//            this.restClient.get({ path: "pharmacy_json", success: function(data) {  storage.setItem("pharmacy_json", JSON.encode(data)); }, error: function(error) { logDisplay("REST error code: " + error.code);}});
//            
//        }
//        else {
//            /* Nem elsĹ‘ indĂ­tĂˇs, verziĂł elenĹ‘rzĂ©s */ 
//            this.restClient.get({ path: "settings?name=VerziĂł", success: function(data) { 
//                    //alert(storage.getItem("version_number")+"--"+data[0].value);
//                    if (storage.getItem("version_number") < data[0].value) {
//                        /* Server verziĂł nagyobb, sync */
//                    	storage.setItem("version_number", data[0].value); 
//                        self.sync.copyTable("cholesterol", "", function() {  });
//                        self.sync.copyTable("pharmacy", "", function() {  });
//                        self.sync.copyTable("pilltype", "", function() { });
//                        this.restClient.get({ path: "cholesterol_json", success: function(data) { storage.setItem("cholesterol_json", JSON.encode(data)); sr = data; }, error: function(error) { logDisplay("REST error code: " + error.code);}});
//                        this.restClient.get({ path: "pharmacy_json", success: function(data) {  storage.setItem("pharmacy_json", JSON.encode(data)); }, error: function(error) { logDisplay("REST error code: " + error.code);}});
//                    } 
//            },error: function(req, status, ex) { }});
//            
//        }
//        /* End DB sync */
//        
//        this.calendar = this.view.getChildComponent('calendar');
//        this.calendar.addEvent('tap', this.bound('changePage'));
//        this.reminder = this.view.getChildComponent('reminder');
//        this.reminder.addEvent('tap', this.bound('changePage'));
//        this.graphs = this.view.getChildComponent('graphs');
//        this.graphs.addEvent('tap', this.bound('changePage'));
//        this.cholester_table = this.view.getChildComponent('cholester-table');
//        this.cholester_table.addEvent('tap', this.bound('changePage'));
//        this.getpharmacy = this.view.getChildComponent('get-pharmacy');
//        this.getpharmacy.addEvent('tap', this.bound('getPharmacy'));
		this.parent();
	},
	viewDidBecomeReady: function() {
                
		this.parent();
	},			
	viewWillEnter: function() {
		var self = this;
//		$(".pharmacy-week ul").html("");
//		$(".menu-view").off("click");
//		$(".menu-view").on("click", "li.get-pharmacy-button", function() {
//			var thisbutton = this;
//			if ($(thisbutton).hasClass("pb-green")) {
//				navigator.notification.confirm(
//						Localization.trans("IGENX_RES_0114"), // message
//					    function(buttonIndex) { 
//							switch(buttonIndex) {
//							case 1: 
//								break;
//							case 2: $(thisbutton).removeClass("pb-green"); self.removeMedicine($(thisbutton).attr('data-rel'));
//								break;
//							}
//						},
//					     Localization.trans("IGENX_RES_0070"),           // title
//					    [Localization.trans("IGENX_RES_0069"), Localization.trans("IGENX_RES_0068")]     // buttonLabels
//				);
//			} else {
//				navigator.notification.confirm(
//						Localization.trans("IGENX_RES_0071"), // message
//					    function(buttonIndex) { 
//							switch(buttonIndex) {
//							case 1: 
//								break;
//							case 2: $(thisbutton).addClass("pb-green"); self.takeMedicine($(thisbutton).attr('data-rel'));
//								break;
//							}
//						},
//					     Localization.trans("IGENX_RES_0070"),           // title
//					    [Localization.trans("IGENX_RES_0069"), Localization.trans("IGENX_RES_0068")]     // buttonLabels
//				);
//			}
//		});
//		this.drawTakeMedicineDays();
//		$(".actual-month").html(getActualMonth());
		this.parent();
	},
//	takeMedicine: function(day) { 
//		logDisplay("NAP!!! "+day);
//		var take_day = day.split("_");
//		var sqlinsert = "INSERT OR IGNORE INTO medicine_take (day) VALUES ('"+take_day[1]+"');";
//		logDisplay(sqlinsert);
//		db.transaction(function(tx) {
//			tx.executeSql(sqlinsert, [], function(tx, res) {
//				db.transaction(function(tx) {
//		            tx.executeSql("select * from medicine_take", [], function(tx, res) {
//		            	var len = res.rows.length;
//		            	logDisplay("HOSSZ "+len);
//		            });
//		        });
//			});
//		});
//	},
//	removeMedicine: function(day) { 
//		logDisplay("NAP!!! "+day);
//		var take_day = day.split("_");
//		var sqldel = "DELETE FROM medicine_take WHERE day = '"+take_day[1]+"';";
//		logDisplay(sqldel);
//		db.transaction(function(tx) {
//			tx.executeSql(sqldel, [], function(tx, res) {});
//		});
//	},
//	drawTakeMedicineDays: function() {
//		var html = "";
//		var taked_days = new Array();
//		var date = new Date();
//		//logDisplay("alap dĂˇtum "+date.getFullYear()+"||"+(date.getMonth()+1)+"||"+(date.getDate()-7));
//		var start = new Date(date.getFullYear(), (date.getMonth()+1), (date.getDate()-6));
//		logDisplay("kezdĹ‘ dĂˇtum "+start.getFullYear()+"-"+padNumber(start.getMonth(),2)+"-"+(start.getDate()));
//		db.transaction(function(tx) {
//			var sqlsel = "select id, day from medicine_take where day >= '"+start.getFullYear()+"-"+padNumber(start.getMonth(),2)+"-"+padNumber((start.getDate()), 2)+"' AND day <= '"+date.getFullYear()+"-"+padNumber((date.getMonth()+1),2)+"-"+padNumber((date.getDate()),2)+"'"; 
//			logDisplay(sqlsel);
//            tx.executeSql(sqlsel, [], function(tx, res) {
//            	var len = res.rows.length;
//            	if (len > 0) {
//            		for (var i = 0; i < len; i++) {
//            			taked_days.push(res.rows.item(i).day);
//            		}
//            	}
//            	logDisplay("TAKED "+taked_days);
//            	/* Napok kigenerĂˇlĂˇsa */
//            	
//            	var dates = generatePillDates();
//            	logDisplay("DĂ�TUM FOR "+dates)
//        		for (var i = 0; i < dates.length; i++) {
//        			
//        			var day = dates[i].split("|");
//        			
//        			var monthday = day[0].split("-");
//        			
//        			logDisplay('day_'+monthday[2]+' - '+day[0]);
//        			
//        			if (taked_days.indexOf(day[0]) >= 0) {
//        				//html = '<li>'+day[1]+'<p data-rel="day_'+day[0]+'" class="day_'+monthday[2]+' get-pharmacy-button pb-green"></p>'+monthday[2]+'</li>'
//        				html = '<li data-rel="day_'+day[0]+'" class="day_'+monthday[2]+' get-pharmacy-button pb-green">'+day[1]+'</li>'
//        			} else {
//        				//html = '<li>'+day[1]+'<p data-rel="day_'+day[0]+'" class="day_'+monthday[2]+' get-pharmacy-button"></p>'+monthday[2]+'</li>'
//        				html = '<li data-rel="day_'+day[0]+'" class="day_'+monthday[2]+' get-pharmacy-button">'+day[1]+'</li>'
//        			}
//        		logDisplay("LI! "+html);
//        	        
//        	        $(".pharmacy-week ul").append(html);
//        	        
//        		}
//            });
//        });
//		
//	},
//	changePage: function(e, item) {
//		switch(item.getName()) {
//			case "calendar": viewstack.pushViewController(new ViewController.Diary, new Moobile.ViewTransition.None);
//				break;
//			case "reminder": viewstack.pushViewController(new ViewController.Reminder, new Moobile.ViewTransition.None);
//				break;
//			case "graphs": viewstack.pushViewController(new ViewController.Graphs, new Moobile.ViewTransition.None);
//				break;
//			case "cholester-table": viewstack.pushViewController(new ViewController.Cholester_table, new Moobile.ViewTransition.None);
//				break;
//		}
//		
//	},
//	getPharmacy: function() {
//		var self = this;
//		var date = new Date();
//		var today = new Date();
//		logDisplay("Bevettem "+today.getDate()+" - "+$("li.day_"+padNumber(today.getDate(), 2)).hasClass("pb-green"));
//		
//		
//		if ($("li.day_"+padNumber(today.getDate(), 2)).hasClass("pb-green")) { 
//			navigator.notification.confirm(
//					Localization.trans("IGENX_RES_0114"), // message
//				    function(buttonIndex) { 
//						switch(buttonIndex) {
//						case 1: 
//							break;
//						case 2: self.removeMedicine("day_"+date.getFullYear()+"-"+padNumber((date.getMonth()+1),2)+"-"+padNumber(date.getDate(), 2));
//								$("li.day_"+padNumber(today.getDate(), 2)).removeClass("pb-green");
//							break;
//						}
//					},
//				     Localization.trans("IGENX_RES_0070"),           // title
//				    [Localization.trans("IGENX_RES_0069"), Localization.trans("IGENX_RES_0068")]     // buttonLabels
//			);
//		}
//		else {
//			navigator.notification.confirm(
//					Localization.trans("IGENX_RES_0071"), // message
//				    function(buttonIndex) { 
//						switch(buttonIndex) {
//						case 1: 
//							break;
//						case 2: self.takeMedicine("day_"+date.getFullYear()+"-"+padNumber((date.getMonth()+1),2)+"-"+padNumber(date.getDate(), 2));
//								$("li.day_"+padNumber(today.getDate(), 2)).addClass("pb-green");
//							break;
//						}
//					},
//				     Localization.trans("IGENX_RES_0070"),           // title
//				    [Localization.trans("IGENX_RES_0069"), Localization.trans("IGENX_RES_0068")]     // buttonLabels
//			);
//		}
//		
//		//this.takeMedicine("day_"+date.getFullYear()+"-"+padNumber((date.getMonth()+1),2)+"-"+padNumber(date.getDate(), 2));
//		//$("p.day_"+today.getDate()).css("background-color", "green");
//	},
	destroy: function() {

		this.parent();
	}
});





