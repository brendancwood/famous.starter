define(function(require, exports, module){
	// Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Lightbox = require('famous/views/Lightbox');
    var Easing = require('famous/transitions/Easing');

    var SlideView = require('views/SlideView');
    //constructor function for EmptyView class
    function SlideshowView(){
    	// Applies View's constructor function to EmptyView class
    	View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: this.options.size,
            origin: [0.5, 0],
            align: [0.5, 0]
        });

        this.mainNode = this.add(this.rootModifier);

        _createLightbox.call(this);
        _createSlides.call(this);
    }

    function _createSlides(){
        this.slides = [],
        this.currentIndex = 0;

        for (var i = 0; i < this.options.data.length; i++){
            var slide = new SlideView({
                size: this.options.size,
                photoUrl: this.options.data[i]
            });

            this.slides.push(slide);

            //on click, call showNextSlide()
            //note that we bind showNextSlide to the slideshow
            //to maintain the correct context when called
            slide.on('click', this.showNextSlide.bind(this));
        }

        this.showCurrentSlide();
    }

    function _createLightbox() {
        this.lightbox = new Lightbox(this.options.lightboxOpts);
        this.mainNode.add(this.lightbox);
    }

 	// Establishes prototype chain for EmptyView class to inherit from View
    SlideshowView.prototype = Object.create(View.prototype);
    SlideshowView.prototype.constructor = SlideshowView;


    SlideshowView.prototype.showCurrentSlide = function(){
        var slide = this.slides[this.currentIndex];
        this.lightbox.show(slide);
    };

    SlideshowView.prototype.showNextSlide = function(){
        this.currentIndex++;
        if (this.currentIndex === this.slides.length){
            this.currentIndex = 0;
        }
        this.showCurrentSlide();
    }

    //Default options for EmptyView Class
    SlideshowView.DEFAULT_OPTIONS = {
        size: [450, 500],
        data: undefined,
        lightboxOpts: {
            inTransform: Transform.rotateY(0.5),
            inOpacity: 1,
            inOrigin: [0,0],
            showOrigin: [0,0],
            outTransform: Transform.rotateY(-Math.PI/2),
            outOpacity: 1,
            outOrigin: [0,0],
            inTransition: { duration: 500, curve: 'easeOut'},
            outTransition: { duration: 500, curve: 'easeIn'},
            overlap: true
        }
    };

    //define helper methods and functions here


    module.exports = SlideshowView;

});