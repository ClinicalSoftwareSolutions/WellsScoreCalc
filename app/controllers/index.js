function doDVT (e) {
    Alloy.createController('score', {type: 'dvt'}).getView().open();
}

function doPE (e) {
  Alloy.createController('score', {type: 'pe'}).getView().open();
}

function doLegal (e) {
  Alloy.createController('legal', {}).getView().open();
}

$.index.open();
