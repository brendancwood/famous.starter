define(function(require, exports, module){
	// Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');

    var SlideData = require('data/SlideData');

    //constructor function for EmptyView class
    //runs once for each new instance
    function SlideView(){
    	// Applies View's constructor function to EmptyView class
    	View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: this.options.size
        });

        this.mainNode = this.add(this.rootModifier);

        //call create background using 'this' context
        _createBackground.call(this);
        _createFilm.call(this);
        _createPhoto.call(this);
    }

    function _createBackground(){
        var background = new Surface({
            properties: {
                backgroundColor: '#FFFFF5',
                boxShadow: '0 10px 20px -5px rgba(0,0,0,0.5)'
            }
        });
        this.mainNode.add(background);

        background.on('click', function(){
            //the event output handler is to broadcast outwards
            this._eventOutput.emit('click');
        }.bind(this));
    }

    function _createFilm(){
        this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder;

        var film = new Surface({
            size: [this.options.filmSize, this.options.filmSize],
            properties: {
                backgroundColor: '#222',
                zIndex: 1,
                //makes surface invisible to clicks
                pointerEvents: 'none'
            }
        });

        var filmModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0],
            transform: Transform.translate(0, this.options.filmBorder, 1)
        });

        this.mainNode.add(filmModifier).add(film);
    }

    function _createPhoto(){
        var photoSize = this.options.filmSize - 2 * this.options.photoBorder;

        var photo = new ImageSurface({
            size: [photoSize, photoSize],
            content: this.options.photoUrl,
            properties: {
                zIndex: 2,
                pointerEvents: 'none'
            }
        });
        this.photoModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0],
            transform: Transform.translate(0, this.options.filmBorder + this.options.photoBorder, 2)
        });

        this.mainNode.add(this.photoModifier).add(photo);
    }
 	// Establishes prototype chain for EmptyView class to inherit from View
    SlideView.prototype = Object.create(View.prototype);
    SlideView.prototype.constructor = SlideView;

    //Default options for EmptyView Class
    SlideView.DEFAULT_OPTIONS = {
        size: [400,450],
        filmBorder: 15,
        photoBorder: 3,
        photoUrl: SlideData.defaultImage
    };

    //define helper methods and functions here


    module.exports = SlideView;

});