/**
 * super simple carousel
 * animation between panes happens with css transitions
 *
 * https://gist.github.com/flarik/7097374
 *
 * NOTE: This is an alternative version of carousel example in
 * https://github.com/EightMedia/hammer.js
 */
function Carousel(element)
{
  var self = this;
  element = $(element);

  var container = $(">ul", element);
  var panes = $(">ul>li", element);

  var pane_width = 0;
  var pane_count = panes.length;

  var current_pane = 0;

  // px or %
  var units = 'px';


  /**
   * initial
   */
  this.init = function() {
    setPaneDimensions();

    $(window).on("load resize orientationchange", function(evt) {
      setPaneDimensions(evt);
    });
  };


  /**
   * set the pane dimensions and scale the container
   */
  function setPaneDimensions(evt) {
    pane_width = element.width();
    panes.each(function() {
      $(this).width(pane_width);
    });
    container.width(pane_width*pane_count);
  }


  /**
   * show pane by index
   * @param   {Number}    index
   */
  this.showPane = function( index, animate ) {
    // between the bounds
    index = Math.max(0, Math.min(index, pane_count-1));
    current_pane = index;

    var offset = getPaneOffset();
    setContainerOffset(offset, animate);
  };

  getPaneOffset = function() {
    if ( units == 'px' ) {
      return -element.width()*current_pane;
    } else { // percentage
      return -((100/pane_count)*current_pane);
    }
  };


  function setContainerOffset(offset, animate) {
    container.removeClass("animate");

    if(animate) {
      container.addClass("animate");
    }

    if(Modernizr.csstransforms3d) {
      container.css("transform", "translate3d("+ offset +units+",0,0)");
    }
    else  if(Modernizr.csstransforms) {
      container.css("transform", "translate("+ offset +units+",0)");
    }
    else {
      var px = units == 'px' ?
        offset :
        ((pane_width*pane_count) / 100) * units;
      container.css("left", px+"px");
    }
  }

  this.next = function() { return this.showPane(current_pane+1, true); };
  this.prev = function() { return this.showPane(current_pane-1, true); };



  function handleHammer(ev) {
    switch(ev.type) {
      case 'dragright':
      case 'dragleft':
        // stick to the finger
        var pane_offset = getPaneOffset();
        var drag_offset = ev.gesture.deltaX;

        if ( units == '%' ) {
          drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;
        }

        // slow down at the first and last pane
        if ( (current_pane === 0 && ev.gesture.direction == "right") ||
             + (current_pane == pane_count-1 && ev.gesture.direction == "left")) {
          drag_offset *= 0.4;
        }

        var offset = (drag_offset + pane_offset);

        setContainerOffset(offset);
        break;

      case 'swipeleft':
        self.next();
        ev.gesture.stopDetect();
        break;

      case 'swiperight':
        self.prev();
        ev.gesture.stopDetect();
        break;

      case 'release':
        // more then 50% moved, navigate
        if(Math.abs(ev.gesture.deltaX) > pane_width/2) {
          if(ev.gesture.direction == 'right') {
            self.prev();
          } else {
            self.next();
          }
        }
        else {
          self.showPane(current_pane, true);
        }
        break;
    }
  }

  element.hammer({ drag_lock_to_axis: true })
    .on("release dragleft dragright swipeleft swiperight", handleHammer);
}
