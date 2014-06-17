
var db_username = "igenxapp";
var db_password = "etvqbUu2fdzPMMLe";

$.ajaxSetup({
	timeout: 10000, //Time in milliseconds
	beforeSend: function(xhr) {
		xhr.setRequestHeader("Authorization", "Basic " + window.btoa(db_username + ":" + db_password));
	}

});

function DBSync(restClient, db) {
	// Add object properties like this
	this.restClient = restClient;
	this.db = db;
	this.syncDomain = "http://dev.h2online.hu/igenx_server/";
}


DBSync.prototype.authentication = function(username, password, successCallBack, error) {
	this.restClient.get({path: "account?user_name=" + username + "&password=" + password, success: successCallBack, error: error ? error : this.error});
};

DBSync.prototype.copyTable = function(table, parameters, successCallback, onlySchema) {
	if (typeof onlySchema == "undefined") {
		onlySchema = false;
	}
	logDisplay("copy table: " + table);
	//logDisplay(typeof this);
	var self = this;
	this.restClient.get({
		path: table + "/schema",
		success: function(schema) {
			if (onlySchema == false) { 
				self.restClient.get({
					path: table + "?" + parameters,
					success: function(data) {
						self.db.transaction(function(tx) {
							logDisplay(table + "?" + parameters);
							//logDisplay(schema);
							//logDisplay("drop table");
							tx.executeSql('DROP table if exists ' + schema.table + ';');
							var cols = new Array();
							jQuery.each(schema.columns, function(key, val) {
								cols.push(key + " " + val);
							});
							var createSql = "CREATE TABLE IF NOT EXISTS " + schema.table + " ( " + cols.join(", ") + " )";
							//logDisplay(createSql);
							tx.executeSql(createSql);
							jQuery.each(schema.indexes, function(key, val) {
								tx.executeSql("CREATE INDEX " + key + " ON " + schema.table + " (" + val + ");");
							});
							//logDisplay(data);						
							logDisplay("db inserts (rows: " + data.length + " " + schema.table + ")");
							var insert_str = "INSERT INTO " + schema.table + " ";
							for (var k = 0; k < data.length; k++) {
								var columns = new Array();
								var values = new Array();
								jQuery.each(data[k], function(i, val) {
									columns.push(i);
									values.push(mysqlEscape(val));
								});
								insert_query = insert_str + "( " + columns.join() + " ) VALUES ( '" + values.join("','") + "' );";
								//logDisplay(insert_query);
								tx.executeSql(insert_query);
							}
						}, self.dberror, successCallback ? successCallback : function() {
							logDisplay("success DB transaction");
						});
					},
					error: function(error) {
						//logDisplay("download error source " + error.source);
						//logDisplay("download error target " + error.target);
						logDisplay("REST error code: " + error.code);
						
						
					}
				});
			} else {
				self.db.transaction(function(tx) {
					logDisplay(table + "?" + parameters);
					//logDisplay(schema);
					//logDisplay("drop table");
					// TODO: DROP ONLY TABLE IF EMPTY
					tx.executeSql('DROP table if exists ' + schema.table + ';');
					var cols = new Array();
					jQuery.each(schema.columns, function(key, val) {
						cols.push(key + " " + val);
					});
					var createSql = "CREATE TABLE IF NOT EXISTS " + schema.table + " ( " + cols.join(", ") + " )";
					logDisplay(createSql);
					tx.executeSql(createSql);
					jQuery.each(schema.indexes, function(key, val) {
                                            logDisplay("CREATE INDEX " + key + " ON " + schema.table + " (" + val + ");");
						tx.executeSql("CREATE INDEX " + key + " ON " + schema.table + " (" + val + ");");
					});

				}, self.dberror, successCallback ? successCallback : function() {
					logDisplay("success DB transaction");
				});
			}
		},
		error: function(error) {
			//logDisplay("download error source " + error.source);
			//logDisplay("download error target " + error.target);
			logDisplay("REST error code: " + error.code);
			
			
		}});
};

DBSync.prototype.initFileSystem = function() {
	 var self = this;
	 var filename = "dummy1.txt";
	 window.requestFileSystem(
	   LocalFileSystem.PERSISTENT, 0,
	   function onFileSystemSuccess(fileSystem) {
	    logDisplay("filesystem " + fileSystem.root.toURL());
	    //window.localStorage.setItem("filepath", fileSystem.root.toURL());
	    fileSystem.root.getFile(
	      filename, {create: true, exclusive: false},
	    function gotFileEntry(fileEntry) {

	     var sPath = fileEntry.toNativeURL().replace(filename, "");
	     logDisplay("gotfileentry: " + sPath);
	     window.localStorage.setItem("filepath", sPath);
	    }, self.fileFail);
	   },
	   self.fileFail);

	};

DBSync.prototype.downloadFile = function(filenames, successFunction, errorFunction) {
	var filename = "dummy1.txt";
	var self = this;
	window.requestFileSystem(
			LocalFileSystem.PERSISTENT, 0,
			function onFileSystemSuccess(fileSystem) {
				//logDisplay("--------------------------------------------------");
				logDisplay("filesystem " + fileSystem.root.toURL());
				fileSystem.root.getFile(
						filename, {create: true, exclusive: false},
				function gotFileEntry(fileEntry) {
					logDisplay(filenames);
					logDisplay("gotfileentry: " + fileEntry.toURL());

					var sPath = fileEntry.fullPath.replace(filename, "");
					if ((device.platform == "Android" || device.platform == "android")) {
						sPath = sPath + "edetailing/";
						window.localStorage.setItem("filepath", fileSystem.root.toURL());
					}
					if (device.platform == "iOS") {
						window.localStorage.setItem("filepath", fileSystem.root.toURL());
					}

					logDisplay("files count: " + filenames.length);
					var fileTransfer = new FileTransfer();
					var download_count = 0;
					var download_error = 0;
					for (var k = 0; k < filenames.length; k++) {
						logDisplay("download error"+download_error);
						if (download_error == 0) {
							logDisplay(sPath + filenames[k]);
							fileEntry.remove();
							fileTransfer.download(
									self.syncDomain + encodeURI(filenames[k]),
									window.localStorage.getItem("filepath") + encodeURI(filenames[k]),
									function(theFile) {
										download_count = download_count + 1;
										//logDisplay("download complete: " + theFile.toURL());
										if (device.platform == "iOS") {
											theFile.setMetadata(self.fileSuccess, self.fileFail, {"com.apple.MobileBackup": 1});
										}
										//logDisplay(download_count + ":" + filenames.length);
										if (download_count == filenames.length) {
											//logDisplay("File download completed");
											successFunction();
										}

									},
									function(error) {
										//logDisplay("download error source " + error.source);
										//logDisplay("download error target " + error.target);
										logDisplay("download error code: " + error.code);
										if (download_error == 0) {
											errorFunction(error);	
										}
										download_error = 1;
										
									}
							);
						}

					}
				}, self.fileFail);
			},
			self.fileFail);
};

DBSync.prototype.fileSuccess = function() {
	logDisplay("file function ok");
};

DBSync.prototype.fileFail = function(evt) {
	logDisplay("error: " + evt.code);
};

DBSync.prototype.error = function(req, status, ex) {
	logDisplay(JSON.stringify(req) + " " + status + " " + ex);
};

DBSync.prototype.dberror = function(err) {
	logDisplay("Error processing SQL: " + err);
};


function checkConnection() {
	var networkState = navigator.connection.type;

	var states = {};
	states[Connection.UNKNOWN] = 'Unknown';
	states[Connection.ETHERNET] = 'Ethernet';
	states[Connection.WIFI] = 'WiFi';
	states[Connection.CELL_2G] = 'Cell';
	states[Connection.CELL_3G] = 'Cell';
	states[Connection.CELL_4G] = 'Cell';
	states[Connection.CELL] = 'Cell';
	states[Connection.NONE] = 'NO';

	return states[networkState];
}

function sqlEscape(stringToEscape) {
	return stringToEscape
			.replace("\\", "\\\\")
			.replace("\'", "\\\'")
			.replace("\"", "\\\"")
			.replace("\n", "\\\n")
			.replace("\r", "\\\r")
			.replace("\x00", "\\\x00")
			.replace("\x1a", "\\\x1a");
}