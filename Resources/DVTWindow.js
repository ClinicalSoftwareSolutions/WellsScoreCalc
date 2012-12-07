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

var _platform = Ti.Platform.osname;
var _scoreLabel = null;
var TestflightTi = require('testflightjs');

var scoreItems = [
        {text:'Active cancer (treatment ongoing, within 6 months, or palliative)', score: 1},
        {text:'Paralysis, paresis or recent plaster immobilisation of the lower extremities', score: 1},
        {text:'Recently bedridden for 3 days or more or major surgery within 12 weeks requiring general or regional anaesthesia', score: 1},
        {text:'Localised tenderness along the distribution of the deep venous system', score: 1},
        {text:'Entire leg swollen', score: 1},
        {text:'Calf swelling at least 3 cm larger than asymptomatic side', score: 1},
        {text:'Pitting oedema confined to the symptomatic leg', score: 1},
        {text:'Collateral superficial veins (non-varicose)', score: 1},
        {text:'Previously documented DVT', score: 1},
        {text:'An alternative diagnosis is at least as likely as DVT', score: -2}
        ];

/*
 * Create the window
 */
exports.Create = function(_parent) {
    if(!_parent) Ti.API.error("A parent window needs to be passed");
    
        var win = Ti.UI.createWindow({title:L('Wells DVT score')});
        if (_platform === 'android') {
            win.backgroundImage = '/bg.png';
        }

        var totalScore = 0;  
        var row;
        var data = [];
        
        for(i=0,j=scoreItems.length;i<j;i++) {
            var l = Ti.UI.createLabel({text: scoreItems[i].text, left: '10dp', right: '30dp' });
            var r = Ti.UI.createTableViewRow({score: scoreItems[i].score,
            	hasCheck: false,
            	backgroundColor: '#eeeeee',
            	//className: 'datarow'
            	});
            r.add(l);
            data.push(r);
        }

        var tv = Ti.UI.createTableView({
            data: data,
            backgroundColor: 'transparent',
            style: Ti.UI.iPhone.TableViewStyle.GROUPED,
            minRowHeight: '52dp',
            top: '30dp', bottom: '60dp'
        });
        
        tv.addEventListener('click', function(e){
            var row = e.row;
            var currentCheck = row.hasCheck;
            // need to remove from total score
            totalScore += (!currentCheck) ? row.score : -(row.score);
            row.hasCheck = !currentCheck;
            
            if (totalScore<=1) {
                _scoreLabel.text = "Score: " + totalScore + " DVT unlikely\nClick for flowchart";
                _scoreLabel.backgroundColor = '#22ee22';                
            }
            else {
                _scoreLabel.text = "Score: " + totalScore + " DVT likely\nClick for flowchart";
                _scoreLabel.backgroundColor = '#dd2222';                       
            }
        });
        
        var headerLbl = Ti.UI.createLabel({text: 'DVT: Please Select Items',
                font: {fontSize: '18sp', fontWeight: 'bold'}, textAlign: 'center',
                top: '5dp'});

        _scoreLabel = Ti.UI.createLabel({text: 'Score: 0', font: {fontSize: '18sp'}, textAlign: 'center',
                color: '#000',
                borderRadius: 8, borderWidth: '1dp',
                backgroundColor: '#eeeeee',
                width: '90%', height: '48dp', bottom: '10dp'});
                
        _scoreLabel.addEventListener('click', function(e){
            if (_platform === 'iphone' || _platform === 'ipad') {
                var ng = _parent.navgroup;
                Ti.UI.currentNavGroup.open(_viewFlowchart());
            }            
            else if (_platform === 'android') {
                var fc_win = _viewFlowchart();
                fc_win.fullscreen = false;     // make heavy weight
                fc_win.open();
            }

        });
        
        win.add(headerLbl);
        win.add(tv);
        win.add(_scoreLabel);
        return win;
    }

function _viewFlowchart() {
    Ti.API.info("Current display DPI = " + Ti.Platform.displayCaps.dpi + " Width=" + Ti.Platform.displayCaps.platformWidth);

    var win = Ti.UI.createWindow({title: 'DVT Flowchart'});
    
    if (_platform === 'android_disable') {
        var image = Ti.UI.createImageView({
        canScale: true,
        height: Ti.UI.FILL,
        image:'DVT_fc.png',
        width: Ti.UI.FILL
        });
        var scrollView = Titanium.UI.createScrollableView({
        currentPage: 1,
        pagingControlHeight: 30,
        showPagingControl: true,
        views: [
            image
        ]
        });
        win.add(scrollView);
    }
    else {    
        var webview = Ti.UI.createWebView({
        borderRadius : 4,
        width : '100%', height : '100%',
        top : 0,
        backgroundColor:'white',
        scalesPageToFit:true,
        touchEnabled: true,
        });
        
        var initialScale = (_platform === 'iphone') ? '0.25' : '0.55';
        webview.html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=' + initialScale + ', maximum-scale=1"></head>'
            + '<body><img src="DVT_fc.png" /></body></html>';
        win.add(webview);
    }
    
    Ti.Analytics.featureEvent('View DVT flowchart');
	TestflightTi.passCheckpoint("View DVT flowchart");

    return win;
}
