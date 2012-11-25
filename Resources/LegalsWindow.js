/*
 * Copyright 2012 Neville Dastur
 * 
 * Distributed by Clinical Software Solutions Ltd
 * http://www.clinicalsoftwaresolutions.co.uk
 * Clinical Software Solutions hereby disclaims all copyright interest in the program
 * 
 *  This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @author Neville Dastur
 */

exports.Create = function() {
    var win = Ti.UI.createWindow({title: 'Legal', backgroundColor: 'transparent'});

    var webView = Titanium.UI.createWebView({
        top:'10dp', left: '10dp', right: '10dp', bottom:'10dp',
        borderWidth: 2, borderRadius: 6, backgroundColor: '#eeeeee'});
    
    win.add(webView);     
    
    var htmlText = '<html><body><div><h3>Wells Score Calculator</h3><br/>'
        + "<p>The Wells Score Calculator is released under the GPL v3 which is viewable at "
        + "<a href=\"http://www.gnu.org/licenses/\">http://www.gnu.org/licenses/</a><br/>"
        + "The copyright is held by Neville Dastur and the application is distributed by "
        + "Clinical Software Solutions Ltd</p>"
        + "<h3>Clinical Attributions</h3>"
        + "The NICE website link <a href=\"http://guidance.nice.org.uk/CG14 \">http://guidance.nice.org.uk/CG144</a>"
        + "<p>Wells PS et al. (2000) Derivation of a simple clinical model to categorize patients’ probability of pulmonary embolism: increasing the model’s utility with the SimpliRED D-dimer. Thrombosis and Haemostasis 83: 416–20</p>"
        + "<p>Wells PS et al. (2003) Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis.</p>"
        + "<h3>Image Attributions</h3>"
        + "<p>Some images used in this application have been downloaded from Authors who released them "
        + "under the creative commons license. The following links are sources for the images.</p>"
        + "<ul>"
        + "<li>DVT icon background image - http://www.flickr.com/photos/tahini/4112147062/</li>"
        + "<li>PE pathology slide image - http://www.flickr.com/photos/pulmonary_pathology/4337748628/in/set-72157621635224912</li>"
        + "<li>Blood cell background - http://www.flickr.com/photos/kingdesmond/2872482711/</li>"
        + "</ul>"
        + "<p>The informartion from NICE is reproduced as non-commercial use and under the UK government Crown Copyright rules</p>"
        + "<h3>Disclaimer:</h3><p>This application is designed to aid in using the Wells Scoring system. It is not a replacement for clinical judgement nor should be used to make clinical decsions.</p>"

    webView.setHtml( htmlText );
        
    return win;
}
