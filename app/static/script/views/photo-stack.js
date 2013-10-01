// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/user" ], function( $, Backbone, UserModel ) {

    // Extends Backbone.View
    var PhotoStackView = Backbone.View.extend( {


        template: _.template($('#tmpl-photo-stack').html()),

        events: {
            'click #btn-like': 'like',
            'click #btn-dislike': 'dislike'
        },

        initialize: function() {
            console.log("Initializing PhotoStackView");

            // this.photoFront;
            // this.photoBack;

        },

        render: function() {
            console.log("Rendering PhotoStackView");

            var tmpl = this.template;

            this.$el.html(tmpl);

            this.temporary();


        },

        like: function(e) {
            debugger;
            $(e.currentTarget).addClass('fadeOut')


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
        }




    } );

    // Returns the View class
    return PhotoStackView;

} );




