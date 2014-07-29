define(function(require, exports, module){
	// Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var SlideshowView = require('views/SlideshowView');
    //constructor function for EmptyView class
    function AppView(){
    	// Applies View's constructor function to EmptyView class
    	View.apply(this, arguments);

        //passing in data
        //create new instance of slideshow view
        var slideshowView = new SlideshowView({
            data: this.options.data
        });

        this.add(slideshowView);
    }
 	// Establishes prototype chain for EmptyView class to inherit from View
    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    //Default options for EmptyView Class
    AppView.DEFAULT_OPTIONS = {
        data: undefined
    };

    //define helper methods and functions here


    module.exports = AppView;

});