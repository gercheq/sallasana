// Category View
// =============

// Includes file dependencies
define([
    "jquery",
    "backbone",
    "models/user",
    "collections/recommendations",
    "views/photo" ],
    function($, Backbone, UserModel, RecommendationsCollection, PhotoView) {


    var PhotoStackView = Backbone.View.extend( {

        className: 'photo-stack-view',

        photoHeight: null,

        template: _.template($('#tmpl-photo-stack').html()),

        events: {
            'click #btn-like': 'like',
            'click #btn-dislike': 'dislike',
            'click #btn-info': 'showProfileDetails'
//            'tap .photo': 'showProfileDetails'
        },

        initialize: function() {
            var self = this;
            console.log("INIT:  PhotoStackView");

//            self.recommendationsCollection = new RecommendationsCollection();
//            self.recommendationsCollection
//                .fetch({reset: true})
//                .success(function(resp){ debugger; alert('success') })
//                .error(function(){ alert('error') })
//                .fail(function(){ alert('fail') });

            self.recommendationsCollection = self.options.recommendationsCollection;

            self.recommendationsCollection.on('change reset add remove', function(models, options){
                console.log("Collection Reset");
                console.log(models);
                console.log(options);
                self.render();
                // alert('Collection Changed!')
            });


            // this.createCollection();
        },

        render: function() {
            console.log("RNDR:  PhotoStackView");
            var self = this;

//            debugger;

            var templateContext = {
                'recommendations': self.recommendationsCollection.toJSON()
            };
            self.$el.html( self.template(templateContext) );


            // Initialize touch and drag
//            self.$el.find('.photo-card').pep();

            return this;
        },

        like: function(e) {
            e.preventDefault();
            this._sendPhotoOut('bounceOutRight');


        },

        dislike: function(e) {
            e.preventDefault();
            this._sendPhotoOut('bounceOutLeft');
        },


        _sendPhotoOut: function(animationClass) {
            var $currentPhoto = this.$el.find('.photo-card').last();

            $currentPhoto.addClass('animated ').addClass(animationClass);
            $currentPhoto.prev().addClass('front');
            _.delay(function(){
                $currentPhoto.removeClass('front').remove();
            }, 1000);
        },




        temporary: function(){


            //
            // http://stackoverflow.com/questions/5023514/how-do-i-normalize-css3-transition-functions-across-browsers
            //
            function whichTransitionEvent(){
                var t;
                var el = document.createElement('fakeelement');
                var transitions = {
                  'transition':'transitionend',
                  'OTransition':'oTransitionEnd',
                  'MozTransition':'transitionend',
                  'WebkitTransition':'webkitTransitionEnd'
                }

                for(t in transitions){
                    if( el.style[t] !== undefined ){
                        return transitions[t];
                    }
                }
            }


//            $( document ).delegate("#page-recommendations", "pagebeforecreate", function() {

              var windowWidth = $(window).width(),
                  recommendationWidth = $('.recommendation.front').width(),
                  threshold = recommendationWidth,
                  currentPosition;


              $('.recommendation.front').pep({

                velocityMultiplier: 1.9,

                debug: false,

                initiate: function(e) {
                  // [≘ touchstart/mousedown] called when first touch / click event is triggered on the object
                  console.log("INITIATE");
                },

                start: function(e){
                  // called when dragging starts; when dx or dy are greater than startThreshold[0] or startThreshold[1]
                  console.log("START");
                },

                drag: function(e, obj) {
                  // [≘ touchmove/mousemove] called continuously while the object is dragging
                  console.log("DRAG");
                  console.log(obj.$el.position().left);
                },

                stop: function(e, obj) {
                  // [≘ touchend/mouseup] called when dragging stops
                  console.log("STOP");

                  // This is too early to check for transtion distance
                  // checkPositionAndMove(obj.$el, threshold);

                }

              });


              var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
              $(".recommendation.front").on(transitionEnd, function(e, obj) {
                //do something
                console.log("TRANSITION ENDED");

                // This is too late to check for transtion distance
                // checkPositionAndMove( $(e.currentTarget), threshold);
              });



            function checkPositionAndMove($el, threshold) {
              var position = $el.position();


              if(position.left > threshold) {
                $.pep.unbind($el);
                $el.addClass('liked animated fadeOutRightBig').removeClass('disliked');
              } else if (position.left < -threshold){
                $.pep.unbind($el);
                $el.addClass('disliked animated fadeOutLeftBig').removeClass('liked');
              }

            }
        },

        showProfileDetails: function(e) {

            e.preventDefault();

            var self = this;

            // Setup current photo
            self.$currentPhoto = $(e.currentTarget);

            // Disable touch and drag
            $.pep.unbind(self.$currentPhoto);


            // Setup fullscreen styles w/ an extra class
            self.$currentPhoto.addClass('photo-active');

            self.$currentPhoto.parents('.photo-stack').css('position','static');



            self._hideComponents();

            self._displayDetailsPane();



        },


        _hideComponents: function(){
            this.$currentPhoto.siblings().hide();


            $('.ui-header').addClass('animated fadeOutUp');
            $('.photo-controls').addClass('animated fadeOut');


            this.$currentPhoto.find('.name-age, .stats').hide();

        },

        _showComponents: function() {
            $('.ui-header').removeClass('fadeOutUp').addClass('fadeInTop');
        },

        _displayDetailsPane: function() {
            var self = this;
            $('#pane-photo-details').addClass('animated bounceInUp')


        }



    } );

    // Returns the View class
    return PhotoStackView;

});




