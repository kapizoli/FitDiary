var Localization;

Localization = (function() {

  function Localization() {}

  Localization.initialize = function(dictionnary, fallback_language) {
    Localization.dictionnary = dictionnary;
	//logDisplay(JSON.encode(Localization.dictionnary));
    Localization.fallback_language = fallback_language;
    return navigator.globalization.getPreferredLanguage(Localization.get_preferred_language_callback, Localization.get_preferred_language_error_callback);
  };

  Localization.get_preferred_language_callback = function(language) {
    Localization.language = language.value;
    console.log("Phone language is " + Localization.language);
    if (Localization.language in Localization.dictionnary) {
      console.log("It is supported.");
    } else {
      Localization.language = Localization.fallback_language;
      console.log("It is unsupported, so we chose " + Localization.language + " instead.");
    }
    return Localization.apply_to_current_html();
  };

  Localization.get_preferred_language_error_callback = function() {
    Localization.language = Localization.fallback_language;
    console.log("There was a error determining the language, so we chose " + Localization.language + ".");
    return Localization.apply_to_current_html();
  };

  Localization.apply_to_current_html = function() {
    var key, value, _ref, _results;
    console.log("Localizing HTML file.");
    _ref = Localization.dictionnary[Localization.language];
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push($(".l10n-" + key).html(value));
    }
    return _results;
  };

  Localization.trans = function(key) {
	  //logDisplay(Localization.language+":"+key);
	if (typeof Localization.language=='undefined'){
		logDisplay("Localization.language is undefined, init from default lang:"+defaultLang);
		Localization.language=defaultLang;
	}
    return Localization.dictionnary[Localization.language][key];
  };

  return Localization;

})();