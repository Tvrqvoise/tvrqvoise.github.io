title: Require JS
author:
	name: Michael Grenier
output: index.html
theme: sudodoki/reveal-cleaver-theme

--

# Require JS
## Dependency management for JS
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
	'jquery',
	'dependency1',
	'dependency2'
], function(require){
	var $ = require("jquery")
		, UserTools = require('dependency1')
		, PageTools = require('dependency2')
	;

	var id = UserTools.locateCustomerId();
	var customerName = JSON.parse(UserTools.getNameFromId(id));
	PageTools.setPageConstant("name", customerName); // defined in dependency2.js
});
```