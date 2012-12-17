/*
 * Copyright 2012 Neville Dastur
 * 
 * Distributed by Clinical Software Solutions Ltd
 * http://www.clinicalsoftwaresolutions.co.uk
 * Clinical Software Solutions retains all copyright interest in the program
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

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#fff');
Ti.UI.setBackgroundImage('/bg.png');

if (Ti.version < 3.0 ) {
    alert('Sorry - this application requires Titanium Mobile SDK 3.0 or later. Becasue of a tableview bug in earlier versions');
}
else {    
    //create a private scope to prevent further polluting the global object
    (function() {
        var platform = Ti.Platform.osname;
        var TestflightTi = require('testflightjs');
        var _ng = null;
        var dashwin = DashBoardWin();                  
        

		TestflightTi.passCheckpoint("App opened");
        Ti.Analytics.featureEvent('App opened', {AppVersion: Ti.App.version });
        
        if (platform === 'android') {
            dashwin.exitOnClose = true;
            dashwin.navBarHidden = false;
            dashwin.fullscreen = false;
        }

        if (platform === 'iphone') {
            var w = Ti.UI.createWindow();
            _ng = Ti.UI.iPhone.createNavigationGroup({window: dashwin});
            Ti.UI.currentNavGroup = _ng;
            dashwin.navgroup = _ng;
            w.add(_ng);
            w.open();
        }
        else if (platform === 'ipad') {
            // On iPad lets use the real estate and put both next to each other
            // NYI 
            // So do same as iPhone for the moment
            var w = Ti.UI.createWindow();
            _ng = Ti.UI.iPhone.createNavigationGroup({window: dashwin});
            Ti.UI.currentNavGroup = _ng;
            dashwin.navgroup = _ng;
            w.add(_ng);
            w.open();
        }
        else {
            dashwin.open();
        }

    function DashBoardWin() {
        var win = Ti.UI.createWindow({title: L('Wells Score Calculator'), /*backgroundImage: '/bg.png',*/ navBarHidden: false});
        if (platform === 'android') {       // on android the background doesn't show through
            win.backgroundImage = '/bg.png';
        }
        var inner_view = Ti.UI.createView({layout: 'vertical', height: Ti.UI.SIZE, width: '100%'});
        
        var hdrLabel = Ti.UI.createLabel({text: 'Select VTE Type', textAlign: 'center',
            bottom: '20dp', width: Ti.UI.SIZE, height: Ti.UI.SIZE,
            color: 'black', font: {fontSize: '32sp', fontWeight: 'bold'},});
        
        var dvt_label = Ti.UI.createLabel({
            text: 'DVT', textAlign: 'center', color: 'white', font: {fontSize: '28dp'},
            backgroundImage: '/blue_button_bg.png',
            width: '208dp', height: '52dp'});

        dvt_label.addEventListener('click', function(e){
            var dvt_win = require('DVTWindow').Create(win);

            Ti.Analytics.navEvent('Dashboard', 'DVT Window');
       		TestflightTi.passCheckpoint("Nav to DVT Window");

            if (platform === 'iphone' || platform === 'ipad') {
                _ng.open(dvt_win);
            }
            else if (platform === 'android') {
                dvt_win.fullscreen = false;     // make heavy weight
                dvt_win.open();
            }
        });
        
        var pe_label = Ti.UI.createLabel({
            text: 'PE', textAlign: 'center', color: 'white', font: {fontSize: '28dp'},
            backgroundImage: '/blue_button_bg.png',
            width: '208dp', height: '52dp', top: '15dp'});
            
        pe_label.addEventListener('click', function(e){
            var pe_win = require('PEWindow').Create(win);

            Ti.Analytics.navEvent('Dashboard', 'PE Window');
       		TestflightTi.passCheckpoint("Nav to PE Window");

            if (platform === 'iphone' || platform === 'ipad') {
                _ng.open(pe_win);
            }
            else if (platform === 'android') {
                pe_win.fullscreen = false;     // make heavy weight
                pe_win.open();
            }
        });
        
        var legal_button = Ti.UI.createLabel({text:'Legal', textAlign: 'center', color: 'white', font: {fontSize: '28dp'},
        backgroundImage: 'Legal_button_bg.png', width: '208dp', height: '52dp', top: '60dp'});
        legal_button.addEventListener('click', function(e){
            var l_win = require('LegalsWindow').Create(win);
            
            Ti.Analytics.navEvent('Dashboard', 'Legals Window');
       		TestflightTi.passCheckpoint("Nav to Legals Window");
       		
            if (platform === 'iphone' || platform === 'ipad') {
                _ng.open(l_win);
            }
            else if (platform === 'android') {
                l_win.fullscreen = false;     // make heavy weight
                l_win.open();
            }            
        });
        
        var footer_label = Ti.UI.createLabel({
            text: 'Copyright Clinical Software Solutions Ltd',
            textAlign: 'center', color: 'black', font: {fontSize: '12dp'},
            top: '10dp',
            });
        
        inner_view.add(hdrLabel);
        inner_view.add(dvt_label);
        inner_view.add(pe_label);
        inner_view.add(legal_button);
        inner_view.add(footer_label);
        win.add(inner_view);
        return win;        
    }
    
    })();
}
