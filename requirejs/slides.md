title: Performance Enhancements
author:
	name: Michael Grenier
	email: Michael.R.Grenier@deluxe.com
output: index.html
theme: sudodoki/reveal-cleaver-theme

--

# Proposed Performance Improvements

--

## Require JS
### Dependency management for JS
--
### The Old Way
fragment1.jsp
```
	<script src="dependency1.js"></script>
	<script src="dependency2.js"></script>
    <script src="script.js"></script>
```

script.js
```javascript
	var id = locateCustomerId(); // function defined in dependency1.js
	var customerName = JSON.parse(getNameFromId(id)); // defined in dependency1.js
	setPageConstant("name", customerName); // defined in dependency2.js
```
---

#### On a big app, things can get messy...

fragment2.jsp
```
<script src="dependency2.js"></script> <!-- already loaded in fragment1.jsp -->
<script>
   	setPageConstant("time", Date.now());
</script>
```

page.jsp
```
<dsp:include page="fragment1.jsp"></dsp:include>
<dsp:include page="fragment2.jsp"></dsp:include>
<script>
	alert(getPageConstant("customerName")) // alerts "undefined"
</script>
```
---

### RequireJS to the rescue

RequireJS fixes this by:
* Enforcing the AMD JavaScript pattern
	* No globals
	* Uniform code format
* Loading scripts asynchronously
* Allowing for packages
* Preventing double or recursive script loads
* Automatically controlling the cache GET variable
* Optionally minifying and concatenating scripts
* A uniform module style + dependency injection means unit tests are possible

---

### AMD Syntax

```javascript
require([
	'require',
	'dependency1',
	'dependency2'
], function(require){
	var   UserTools = require('dependency1')
		, PageTools = require('dependency2')
	;

	var id = UserTools.locateCustomerId();
	var customerName = JSON.parse(UserTools.getNameFromId(id));
	PageTools.setPageConstant("name", customerName); // defined in dependency2.js
});
```

```javascript
require([
	'require',
	'dependency2'
], function(require){
	//  `dependency` is only loaded once, but used twice...
	//	no overwriting of global variables!
	var PageTools = require('dependency2');

	PageTools.setPageConstant("for", "bar");
});
```

---

## File Serving Improvements

---

### The Problem

* In the US, most connections have good bandwidth, but poor latency
	* This is __especially__ true for mobile devices
	* Latency is not likely to improve in the near future
	* Latency is why upgrading from 5MB internet to 10MB internet doesn't feel twice as fast
* 302 redirect headers still require TCP connection, SSL handshake, and HTTPS header to be sent
* Browsers only download ~6 requests concurrently
* Every request on our page goes to the server, either for download or cache validation - none are loaded directly from cache
	* Shop Deluxe homepage makes 55 requests to our domain (out of 73 total)
	* Bags & Bows homepage makes 63 (out of 93 total)

---

### Proposed Solutions

* Set ```Cache-Control``` header to ```private, max-age=[time in seconds]```
	* A four hour ```max-age``` should give users drastically lower response times for most of their time on our site, while still forcing users to revalidate between file drops
* Set the cache-breaker GET parameter in ```Configuration.properties``` so that we can change it through /dyn/admin/ instead of needing a build
* Remove the ```ETags``` response header - only one of ```ETag``` and ```Last-Modified``` should be specified, and we don't want incorrect ```ETags``` to invalidate properly cached files

---

* Enable GZip Compression
	* SD Dev Webserver resources have been using GZip for several months
* Impliment standards for image compression
	* Right now, the creative team is very large images with a high level of quality
	* As a result, the image portion of our sites is massive - 1.3 MB of the B&B homepage's 2.3MB total is images