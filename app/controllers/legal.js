// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var htmlText = '<html><body><div><h3>Wells Score Calculator</h3><br/>' +
    '<p>The Wells Score Calculator is released under the GPL v3 which is viewable at ' +
    '<a href=\"http://www.gnu.org/licenses/\">http://www.gnu.org/licenses/</a><br/>' +
    'The copyright is held by Neville Dastur and the application is distributed by ' +
    'Clinical Software Solutions Ltd</p>' +
    '<h3>Clinical Attributions</h3>' +
    'The NICE website link <a href=\"http://guidance.nice.org.uk/CG144 \">http://guidance.nice.org.uk/CG144</a>' +
    '<p>Wells PS et al. (2000) Derivation of a simple clinical model to categorize patients’ probability of pulmonary embolism: increasing the model’s utility with the SimpliRED D-dimer. Thrombosis and Haemostasis 83: 416–20</p>' +
    '<p>Wells PS et al. (2003) Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis.</p>' +
    '<h3>Image Attributions</h3>' +
    '<p>Some images used in this application have been downloaded from Authors who released them ' +
    'under the creative commons license. The following links are sources for the images.</p>' +
    '<ul>' +
    '<li>Blood cell background - User: zhouxuan12345678 https://www.flickr.com/photos/53921113@N02/5645665364</li>' +
    '</ul>' +
    '<p>The informartion from NICE is reproduced as non-commercial use and under the UK government Crown Copyright rules</p>' +
    '<h3>Disclaimer:</h3><p>This application is designed to aid in using the Wells Scoring system. It is not a replacement for clinical judgement nor should be used to make clinical decsions.</p>'
    ;

$.init = function () {
  $.styledlabel.html = htmlText;
};

function doClose() {
    $.win.close();
}

$.init();
