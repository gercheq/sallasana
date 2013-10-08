// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/user", "collections/recommendations", "views/photo" ], function( $, Backbone, UserModel, RecommendationsCollection, PhotoView ) {

    //
    //
    //
    var PhotoStackView = Backbone.View.extend( {

        className: 'photo-stack-view',

        photoHeight: null,

        template: _.template($('#tmpl-photo-stack').html()),

        events: {
            'click #btn-like': 'like',
            'click #btn-dislike': 'dislike',
            // 'click #btn-add': 'addPhotoToStack',
            'click .photo': 'showProfileDetails'
        },

        initialize: function() {
            var self = this;
            console.log("INIT:  PhotoStackView");

            // this.photoFront;
            // this.photoBack;

            this.createCollection();
        },

        render: function() {2
            console.log("RNDR:  PhotoStackView");
            var self = this;

            var options = {
                'recommendations': self.tempCollection.toJSON()
            };
            self.$el.html( self.template(options) );

            // Initialize touch and drag
            self.$el.find('.photo').pep();

            return this;
        },



//        addPhotoToStack: function(){
//
//          var self = this;
//
//
//          var photoView = new PhotoView({
//              collection: self.recommendationsCollection,
//              height: self.photoHeight
//          });
//
//         var photo = photoView.render();
//         // debugger;
//
//         this.$el.find('.photo-stack').append(photo);
//
//
//        },


        like: function(e) {
            var self = this;

           // debugger;

            var $currentPhoto = self.$el.find('.photo').last();

            $currentPhoto.addClass('animated bounceOutLeft').removeClass('front');
            $currentPhoto.prev().addClass('front');
            _.delay(function(){
                $currentPhoto.remove();
            }, 300);

        },

        dislike: function(e) {
            alert('DISLIKED');
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

//            });



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

        createCollection: function(){

            var user1 = new UserModel({
                first_name: "Gercek",
                age: '29',
                shared_interests: '32',
                shared_friends: '11',
                photo: "http://m.c.lnkd.licdn.com/media/p/2/000/0b7/233/26a567e.jpg"
            });

            var user2 = new UserModel({
                first_name: "Melis",
                age: '26',
                shared_interests: '2',
                shared_friends: '5',
                photo: 'https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-ash3/1015588_10100688244085212_1430391934_o.jpg'
            });

            var user3 = new UserModel({
                first_name: "Renan",
                age: '28',
                shared_interests: '21',
                shared_friends: '84',
                photo: 'https://scontent-a-sjc.xx.fbcdn.net/hphotos-prn2/1231161_10151620122421867_1432863768_n.jpg'
            });



            this.tempCollection = new RecommendationsCollection([user3, user2, user1]);
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




