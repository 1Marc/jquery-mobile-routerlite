jquery-mobile-routerlite
=========================
A lightweight and simple router for jQuery Mobile.

Why
=====================
**$.mobile.routerlite** was created to give you exactly the power you need to handle routes properly in jQuery Mobile with a straightforward API. **routerlite** just gives you four simple methods: **routeinit**, **routechange**, **pageinit** and **pagechange**. You can bind a callback either when a route or page is *first visited*, or *everytime* a certain route or page is visited.

There are a lot of different types of page events in jQuery Mobile and sometimes it's hard to figure out which one to bind to and also how to get the current page context when that event fires. So **routerlite** helps you with normalizing event data so you don't have to do any guesswork. **routerlite** normalizes this for you and gives you the current **page** and **path** context every time you handle a route or page change.

API Methods
=====================
**$.mobile.routerlite** has four methods:

* **routeinit** - only fires once when the route is first visited
  ```javascript
  // When "/admin" is first visited
  $.mobile.routerlite.routeinit("/admin", function(page, path){
      doSomething();
  });
  ```
	
* **routechange** - fires each time the route is visited
	```javascript
  // For every page in "/admin/*"
  $.mobile.routerlite.routechange("/admin", function(page, path){
      doSomething();
  });
  ```

* **pageinit** - only fires once when the page is first visited
  ```javascript
  // if we see page with id="checkout" then run this code
  $.mobile.routerlite.pageinit("#checkout", function(page){
      doSomething();
  });
  ```

* **pagechange** - fires each time the page is visited
  ```javascript
  // every time we visit the page with id="checkout" then run this code
  $.mobile.routerlite.pagechange("#checkout", function(page){
      doSomething();
  });
  ```

Each callback receives two parameters:       

* **page** - currently active jQuery mobile page
* **path** - url path of the current route