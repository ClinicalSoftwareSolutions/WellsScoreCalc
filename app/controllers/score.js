// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args || {};
var totalScore  = 0;

// For DVT +ve is a score of <= 1 for PE it is <= 4
var thresholdScore = (args.type === 'dvt') ? 1 : 4;
var scoreTypeLabel = args.type.toUpperCase();

var dvtScoreItems = [
  {text: 'Active cancer (treatment ongoing, within 6 months, or palliative)', score: 1},
  {text: 'Paralysis, paresis or recent plaster immobilisation of the lower extremities', score: 1},
  {text: 'Recently bedridden for 3 days or more or major surgery within 12 weeks requiring general or regional anaesthesia', score: 1},
  {text: 'Localised tenderness along the distribution of the deep venous system', score: 1},
  {text: 'Entire leg swollen', score: 1},
  {text: 'Calf swelling at least 3 cm larger than asymptomatic side', score: 1},
  {text: 'Pitting oedema confined to the symptomatic leg', score: 1},
  {text: 'Collateral superficial veins (non-varicose)', score: 1},
  {text: 'Previously documented DVT', score: 1},
  {text: 'An alternative diagnosis is at least as likely as DVT', score: -2}
];

var peScoreItems = [
  {text: 'Clinical signs and symptoms of DVT (minimum of leg swelling and pain with palpation of the deep veins)', score: 3},
  {text: 'An alternative diagnosis is less likely than PE', score: 3},
  {text: 'Heart rate > 100 beats per minute', score: 1.5},
  {text: 'Immobilisation for more than 3 days or surgery in the previous 4 weeks', score: 1.5},
  {text: 'Previous DVT/PE', score: 1.5},
  {text: 'Haemoptysis', score: 1},
  {text: 'Malignancy (on treatment, treated in the last 6 months, or palliative)', score: 1}
];

$.init = function() {

  var score_items = (args.type === 'dvt') ? dvtScoreItems : peScoreItems;
  $.win.title = (args.type === 'dvt') ? 'DVT Wells Score' : 'PE Wells Score';

  var items = [];
  for(var x = 0; x < score_items.length; x++) {
  	items.push({
  		title: {
  			text: score_items[x].text
  		},
      indicator: {
        image: '',
      },
     	properties: {
        	itemId: x,
          checkStatus: 0,
          score: score_items[x].score,
        	accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
      }
    });
  }

  $.listview.sections[0].setItems(items);
};

$.close.addEventListener('click', function(){
  $.win.close();
});

$.listview.addEventListener('itemclick', function onListviewItemClick (e){
  var section = e.section;
  var item = section.getItemAt(e.itemIndex);
  var item_score = item.properties.score;

  // need to add to or remove from total score depending  of check or uncheck
  totalScore += (item.properties.checkStatus === 0) ? item_score : -(item_score);

  if (totalScore <= thresholdScore) {
      $.score_lbl.text = 'Score: ' + totalScore + ' ' + scoreTypeLabel + ' unlikely\nClick for flowchart';
      $.score_lbl.backgroundColor = '#91ab21';
  }
  else {
      $.score_lbl.text = 'Score: ' + totalScore + ' ' + scoreTypeLabel + ' likely\nClick for flowchart';
      $.score_lbl.backgroundColor = '#bd787d';
  }

  item.indicator.image = (item.properties.checkStatus === 0) ? '/check.png' : '';
  item.properties.checkStatus = 1 - item.properties.checkStatus;  // Toggle it bwteen 0 and 1
  section.updateItemAt(e.itemIndex, item);


});

$.score_lbl.addEventListener('click', function onScoreClick(e){
  Alloy.createController('view_flowchart', { type: args.type }).getView().open();
});

$.init();
