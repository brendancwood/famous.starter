define(function(require, exports, module) {
	var Engine  = require('famous/core/Engine');
	var Utility = require('famous/utilities/Utility');
	var AppView = require('views/AppView');
	var SlideData = require('data/SlideData');

	var mainContext = Engine.createContext();

	mainContext.setPerspective(1000);
	//simple get request to Picasa api w callback
	Utility.loadURL(SlideData.getUrl(), initApp);

	function initApp(data){
		data = SlideData.parse(data);

		//create new instance of appView
		var appView = new AppView({ data: data });

		//add instance to the mainContext
		mainContext.add(appView);
	}
	
});