/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	* The MIT License (MIT)
	* 
	* Copyright (c) 2015 Michael Grenier
	* 
	* Permission is hereby granted, free of charge, to any person obtaining a copy
	* of this software and associated documentation files (the "Software"), to deal
	* in the Software without restriction, including without limitation the rights
	* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the Software is
	* furnished to do so, subject to the following conditions:
	* 
	* The above copyright notice and this permission notice shall be included in all
	* copies or substantial portions of the Software.
	* 
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	* SOFTWARE.
	*/

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _viewsMainView = __webpack_require__(9);

	var _viewsMainView2 = _interopRequireDefault(_viewsMainView);

	!(function () {

	    var main = new _viewsMainView2['default']({});

	    //  WARN: Adding window property for debug ONLY
	    window.main = main;

	    main.render();

	    //  Removing the no-js tag
	    document.body.className = '';

	    document.body.appendChild(main.el);
	})();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports["default"] = function () {
	    var from = Array.prototype.slice.apply(arguments);
	    var to = from.shift();

	    do {
	        var obj = from.shift();
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                to[key] = obj[key];
	            }
	        }
	    } while (from.length);

	    return to;
	};

	;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function (obj, attrs) {
	    var output = {};

	    if (typeof attrs === 'string') {
	        attrs = Array.prototype.slice.apply(attributes);
	        attrs.shift();
	    }

	    for (var i = 0; i < attrs.length; i++) {
	        output[attrs[i]] = obj[i];
	    }

	    return output;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports["default"] = function (thing, cb, context) {
	    context = context || this;
	    for (var i in thing) {
	        if (thing.hasOwnProperty(i)) {
	            if (cb.call(context, thing[i], i, thing) === false) {
	                break;
	            }
	        }
	    }
	};

	;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports["default"] = function (obj) {
	    var i = 0;

	    for (var key in obj) {
	        i++;
	    }

	    return !i;
	};

	;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsPick = __webpack_require__(2);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

	var builtInValidations = {
	    isPresent: function isPresent(key, value, validation) {
	        if (!value) {
	            return validation.message || 'You must enter a ' + key;
	        }
	    },

	    isNumeric: function isNumeric(key, value, validation) {
	        if (!/^\d*$/.test(value || '')) {
	            return validation.message || key + ' must be numeric';
	        }
	    }
	};

	var Model = (function () {
	    function Model() {
	        _classCallCheck(this, Model);
	    }

	    _createClass(Model, [{
	        key: 'validate',
	        value: function validate(props) {
	            var errors = {};

	            //  Overloading logic
	            if (props instanceof Array) {
	                props = (0, _utilsPick2['default'])(this, props);
	            } else if (typeof props === 'string') {
	                props = (0, _utilsPick2['default'])(this, Array.prototype.slice.apply(arguments));
	            }

	            for (var i = 0; i < this.validations.length; i++) {
	                var validation = this.validations[i];
	                var key = validation.value;
	                var value = this[key];
	                var error = undefined;

	                if (typeof validation.test === 'string' && validation.test in builtInValidations) {
	                    error = builtInValidations[validation.test].call(this, key, value, validation);
	                } else if (validation.test instanceof RegExp) {
	                    if (!validation.test.test(value)) {
	                        error = validation.message;
	                    }
	                } else {
	                    error = validation.test.call(this, key, value, validation);
	                }

	                if (error) {
	                    errors[key] = errors[key] || [];
	                    errors[key].push(error);
	                }
	            }

	            return errors;
	        }
	    }, {
	        key: 'save',
	        value: function save() {
	            var _this = this,
	                _arguments = arguments;

	            //  Mocking out a server interaction here. Ideally, this'd be XHR
	            return Promise(function (resolve, reject) {
	                setTimeout(function () {
	                    resolve();
	                }, 1000);
	            }).then(function () {
	                //  TODO: Implement observer system instead of this junk
	                if (_this.onSave) {
	                    _this.onSave.apply(_this, _arguments);
	                }
	            });
	        }
	    }]);

	    return Model;
	})();

	exports['default'] = Model;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsEach = __webpack_require__(3);

	var _utilsEach2 = _interopRequireDefault(_utilsEach);

	var View = (function () {
	    function View(options) {
	        _classCallCheck(this, View);

	        options = options || {};
	        this.el = options.el || document.createElement(options.tagName || 'div');

	        if (options.model) {
	            this.model = options.model;
	        }
	    }

	    _createClass(View, [{
	        key: '$',
	        value: function $(selector) {
	            return this.el.querySelectorAll(selector);
	        }
	    }, {
	        key: 'bindDOMEvents',
	        value: function bindDOMEvents(obj) {
	            var _this = this;

	            obj = obj || {};
	            this._unregisterChain = this._unregisterChain || [];

	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    (function () {
	                        var callback = obj[key].bind(_this);
	                        var firstSpace = key.indexOf(' ');
	                        var elements = undefined;
	                        var eventName = undefined;

	                        //  If there are no spaces, assume that the event is on `this`
	                        if (firstSpace > 0) {
	                            eventName = key.slice(0, firstSpace);
	                            var selector = key.slice(firstSpace + 1);
	                            //  getting the elements and transforming them into a real array
	                            elements = Array.prototype.slice.call(_this.$(selector));
	                        } else {
	                            elements = [_this.el];
	                            eventName = key;
	                        }

	                        var _loop = function () {
	                            var element = elements.pop();
	                            element.addEventListener(eventName, callback);

	                            _this._unregisterChain.push(function () {
	                                element.removeEventListener(eventName, callback);
	                            });
	                        };

	                        while (elements.length) {
	                            _loop();
	                        }
	                    })();
	                }
	            }

	            return this;
	        }
	    }, {
	        key: 'unbindDOMEvents',
	        value: function unbindDOMEvents() {
	            this._unregisterChain = this._unregisterChain || [];
	            for (var i = 0; i < this._unregisterChain.length; i++) {
	                this._unregisterChain[i].call(this);
	            }

	            return this;
	        }
	    }, {
	        key: 'template',
	        value: function template() {
	            return '';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            if (this.onBeforeRender) {
	                this.onBeforeRender();
	            }

	            this.unbindDOMEvents();
	            this.el.innerHTML = this.template();
	            this.bindDOMEvents(this.events);

	            if (this.onRender) {
	                this.onRender();
	            }

	            return this;
	        }
	    }, {
	        key: 'show',
	        value: function show(selector, view) {
	            this.regions = this.regions || {};

	            if (this.regions[selector]) {
	                this.regions[selector].destroy();
	            }

	            this.$(selector)[0].appendChild(view.el);
	            this.regions[selector] = view;

	            view.render();
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.unbindDOMEvents();

	            (0, _utilsEach2['default'])(this.regions, function (view) {
	                view.destroy();
	            });
	        }
	    }]);

	    return View;
	})();

	exports['default'] = View;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _View2 = __webpack_require__(6);

	var _View3 = _interopRequireDefault(_View2);

	var FormView = (function (_View) {
	    _inherits(FormView, _View);

	    function FormView(options) {
	        _classCallCheck(this, FormView);

	        _get(Object.getPrototypeOf(FormView.prototype), 'constructor', this).call(this, options);

	        this.events = {
	            'input input': this.onInputInput,
	            'blur input': this.onBlurInput,
	            'focus input': this.onFocusInput
	        };
	    }

	    _createClass(FormView, [{
	        key: 'onFocusInput',
	        value: function onFocusInput(e) {
	            e.target.closest('.input-group').classList.add('input-group--open');
	            ;
	        }
	    }, {
	        key: 'onBlurInput',
	        value: function onBlurInput(e) {
	            var classList = e.target.closest('.input-group').classList;

	            if (!e.target.value) {
	                classList.remove('input-group--open');
	            }

	            this.validateInputs([e.target]);
	        }
	    }, {
	        key: 'onInputInput',
	        value: function onInputInput(e) {
	            this.model[e.target.name] = e.target.value || '';
	        }
	    }, {
	        key: 'validateInputs',
	        value: function validateInputs(inputs) {
	            var fieldsToValidate = [];

	            inputs = inputs || this.$('input');
	            inputs = Array.prototype.slice.apply(inputs);

	            for (var i = 0; i < inputs.length; i++) {
	                var input = inputs[i];
	                fieldsToValidate.push(input.name);
	            }

	            var validations = this.model.validate(fieldsToValidate);

	            for (var i = 0; i < inputs.length; i++) {
	                var input = inputs[i];
	                var inputGroup = input.closest('.input-group');
	                var errorField = inputGroup.querySelectorAll('.input-group__error');

	                if (input.name in validations) {
	                    inputGroup.classList.add('input-group--invalid');
	                    inputGroup.classList.remove('input-group--valid');
	                    errorField[0].textContent = validations[input.name][0];
	                } else {
	                    inputGroup.classList.remove('input-group--invalid');
	                    inputGroup.classList.add('input-group--valid');
	                }
	            }

	            return validations;
	        }
	    }]);

	    return FormView;
	})(_View3['default']);

	exports['default'] = FormView;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _commonModel = __webpack_require__(5);

	var _commonModel2 = _interopRequireDefault(_commonModel);

	console.log(_commonModel2['default']);

	var BillingAddress = (function (_Model) {
	    _inherits(BillingAddress, _Model);

	    function BillingAddress(options) {
	        _classCallCheck(this, BillingAddress);

	        _get(Object.getPrototypeOf(BillingAddress.prototype), 'constructor', this).call(this, options);

	        this.validations = [{
	            value: 'name',
	            test: 'isPresent'
	        }, {
	            value: 'street',
	            test: 'isPresent'
	        }, {
	            value: 'city',
	            test: 'isPresent'
	        }, {
	            value: 'zip',
	            test: 'isPresent'
	        }, {
	            value: 'zip',
	            test: 'isNumeric',
	            message: 'Zip can only contain numbers'
	        }];
	    }

	    return BillingAddress;
	})(_commonModel2['default']);

	exports['default'] = BillingAddress;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _commonView = __webpack_require__(6);

	var _commonView2 = _interopRequireDefault(_commonView);

	var _modelsBillingAddressModel = __webpack_require__(8);

	var _modelsBillingAddressModel2 = _interopRequireDefault(_modelsBillingAddressModel);

	var _viewsBillingAddressView = __webpack_require__(10);

	var _viewsBillingAddressView2 = _interopRequireDefault(_viewsBillingAddressView);

	var _viewsCreditCardView = __webpack_require__(11);

	var _viewsCreditCardView2 = _interopRequireDefault(_viewsCreditCardView);

	var MainView = (function (_View) {
	    _inherits(MainView, _View);

	    function MainView(options) {
	        _classCallCheck(this, MainView);

	        _get(Object.getPrototypeOf(MainView.prototype), 'constructor', this).call(this, options);
	        this.el.className = 'main-view';

	        this.billingAddress = new _modelsBillingAddressModel2['default']();
	        this.billingAddress.onSave = this.showCreditCardView.bind(this);
	    }

	    _createClass(MainView, [{
	        key: 'template',
	        value: function template(data) {
	            return '\n            <div class="js-content cf"></div>    \n        ';
	        }
	    }, {
	        key: 'onRender',
	        value: function onRender() {
	            this.show('.js-content', new _viewsBillingAddressView2['default']({
	                model: this.billingAddress,
	                tagName: 'form'
	            }));
	        }
	    }, {
	        key: 'showCreditCardView',
	        value: function showCreditCardView() {
	            this.show('.js-content', new _viewsCreditCardView2['default']({
	                model: this.billingAddress,
	                tagName: 'form'
	            }));
	        }
	    }]);

	    return MainView;
	})(_commonView2['default']);

	exports['default'] = MainView;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utilsExtend = __webpack_require__(1);

	var _utilsExtend2 = _interopRequireDefault(_utilsExtend);

	var _utilsIsEmpty = __webpack_require__(4);

	var _utilsIsEmpty2 = _interopRequireDefault(_utilsIsEmpty);

	var _commonFormView = __webpack_require__(7);

	var _commonFormView2 = _interopRequireDefault(_commonFormView);

	var BillingAddressView = (function (_FormView) {
	    _inherits(BillingAddressView, _FormView);

	    function BillingAddressView(options) {
	        _classCallCheck(this, BillingAddressView);

	        _get(Object.getPrototypeOf(BillingAddressView.prototype), 'constructor', this).call(this, options);

	        this.el.className = 'billing-address cf';
	        this.events = (0, _utilsExtend2['default'])(this.events, {
	            'submit': this.onSubmit
	        });
	    }

	    _createClass(BillingAddressView, [{
	        key: 'template',
	        value: function template() {
	            return '\n            <h2>Billing Address</h2>\n\n            <label class="input-group">\n                <span class="input-group__label">Full Name</span>\n                <input name="name" />\n                <span class="input-group__error"></span>\n            </label>\n            <label class="input-group">\n                <span class="input-group__label">Street Address</span>\n                <input name="street" />\n                <span class="input-group__error"></span>\n            </label>\n            <label class="input-group">\n                <span class="input-group__label">City &amp; State</span>\n                <input name="city" />\n                <span class="input-group__error"></span>\n            </label>\n            <label class="input-group">\n                <span class="input-group__label">Zip</span>\n                <input name="zip" maxlength="5" />\n                <span class="input-group__error"></span>\n            </label>\n\n            <button class="button">Next</button>\n        ';
	        }
	    }, {
	        key: 'onSubmit',
	        value: function onSubmit(e) {
	            e.preventDefault();

	            var errors = this.validateInputs();

	            if ((0, _utilsIsEmpty2['default'])(errors)) {
	                this.$('button')[0].innerHTML = '<i class="fa fa-cog fa-spin"></i>';
	            } else {
	                this.$('.input-group--invalid input')[0].focus();
	            }
	        }
	    }]);

	    return BillingAddressView;
	})(_commonFormView2['default']);

	exports['default'] = BillingAddressView;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _commonFormView = __webpack_require__(7);

	var _commonFormView2 = _interopRequireDefault(_commonFormView);

	var CreditCardView = (function (_FormView) {
	    _inherits(CreditCardView, _FormView);

	    function CreditCardView() {
	        _classCallCheck(this, CreditCardView);

	        _get(Object.getPrototypeOf(CreditCardView.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(CreditCardView, [{
	        key: 'template',
	        value: function template() {
	            return '\n            AHHEHEH    \n        ';
	        }
	    }]);

	    return CreditCardView;
	})(_commonFormView2['default']);

	exports['default'] = CreditCardView;
	module.exports = exports['default'];

/***/ }
/******/ ]);