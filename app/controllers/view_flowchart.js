// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.init = function () {
  $.win.title = (args.type === 'dvt') ? 'DVT Flowchart' : 'PE Flowchart';

  Ti.API.debug("Loading image: " + args.type + '_flowchart');
  $.imageview.image = '/' + args.type + '_flowchart.png';
  $.imageview.reloadImage();

  $.close.addEventListener('click', function(){
    $.imageview.removeEventListeners();
    $.win.close();
  });
}

$.init();
