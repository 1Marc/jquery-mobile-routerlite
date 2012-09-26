/*!
 * jQuery Mobile Router Lite
 * A lightweight and simple router for jQuery Mobile
 * https://github.com/1Marc/jquery-mobile-router-lite
 *
 * Copyright 2012 (c) Marc Grabanski MIT license
 */

(function($){

/* 
 * $.mobile.routerlite has four methods:
 *   routeinit - only fires once when the route is first visited
 *   routechange - fires each time the route is visited
 *   pageinit - only fires once when the page is first visited
 *   pagechange - fires each time the page is visited
 *
 * Each callback receives two parameters:       
 *   page - currently active jQuery mobile page  
 *   path - url path of the current route
 */
$.mobile.routerlite = {
    _initroutes: [],
    _changeroutes: [],
    _getPath: function() {

        var path = ($.mobile.urlHistory.getActive() && $.mobile.urlHistory.getActive().pageUrl) ?
			$.mobile.urlHistory.getActive().pageUrl: 
			window.location.pathname;
		
        return path;
    },
    _trigger: function(callback, uiPage) {
        callback(uiPage, this._getPath());
    },
    _routesInit: function(url, uiPage) {
        var self = this;
        for (var i = 0; i < this._initroutes.length; i++) {
            var route = this._initroutes[i];
            if (!route.loaded && url.indexOf(route.pathname) > -1) {
                self._trigger(route.callback, uiPage);
                route.loaded = true;
            }
        }
    },
    _routesChange: function(url, uiPage) {
        var self = this;
        for (var i = 0; i < this._changeroutes.length; i++) {
            var route = this._changeroutes[i];
            if (url.indexOf(route.pathname) > -1) {
                self._trigger(route.callback, uiPage);
            }
        }
    },
    // the first time we visit a route, call teh callback
    routeinit: function(route, callback) {
        var self = this;
        this._initroutes.push({"pathname":route, "callback":callback});
        if (!this._initroutescheck) {
            $(document).on("pageshow", function(e){
                self._routesInit(self._getPath(), e.target);
            });
            this._initroutescheck = true;
        }
    },
    // when we visit a route, call the callback
    routechange: function(route, callback) {
        var self = this;
        this._changeroutes.push({"pathname":route, "callback":callback});
        if (!this._changeroutescheck) {
            $(document).on("pagechange", function(e, data){
                self._routesChange(self._getPath(), data.toPage);
            });
            this._changeroutescheck = true;
        }
    },
    // when page has been initialized, call the callback
    pageinit: function(pageSelector, callback) {
        var self = this;
        $(document).on("pageshow", function(e) {
            var $page = $(pageSelector);
            if ($page.length && !$page.data('init')) {
                self._trigger(callback, $page.get(0));
                $page.data('init', true);
            }
        });
    },
    // when we change to the page that matches the selector, call the callback
    pagechange: function(pageSelector, callback) {
        var self = this;
        $(document).on("pagebeforechange", function(e, data) {
            // don't want to trigger on a pure url
            if (typeof data.toPage === "string") {
                return;
            }
            if ($(data.toPage).is(pageSelector)) {
                $(document).one('pagechange', function(e, data){
                    self._trigger(callback, data.toPage.get(0));
                });
            }
        });
    }
};

})(jQuery);