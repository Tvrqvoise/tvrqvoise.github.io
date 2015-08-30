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
!(function(){
    'use strict';

    var extend = function(){
        var from = Array.prototype.slice.apply(arguments);
        var to = from.shift();

        do {
            let obj = from.shift();
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    to[key] = obj[key];
                }
            }
        } while (from.length);

        return to;
    };

    var pick = function(obj, attrs){
        var output = {};

        if (typeof attrs === 'string') {
            attrs = Array.prototype.slice.apply(attributes);
            attrs.shift();
        }

        for (let i = 0; i < attrs.length; i++) {
            output[attrs[i]] = obj[i];
        }

        return output;
    };

    var each = function(thing, cb, context){
        context = context || this;
        for (let i in thing) {
            if (thing.hasOwnProperty(i)){
                if (cb.call(context, thing[i], i, thing) === false) {
                    break;
                }
            }
        }
    };

    var isEmpty = function(obj){
        var i = 0;

        for (let key in obj) {
            i++;
        }

        return ! i;
    };

    var builtInValidations = {
        isPresent : function(key, value, validation){
            if (!value) {
                return validation.message || 'You must enter a ' + key;
            }
        },

        isNumeric : function(key, value, validation) {
            if (! /^\d*$/.test(value || '')) {
                return validation.message || key + ' must be numeric';
            }
        }
    };
    
    class Model {
        validate (props) {
            var errors = {};

            //  Overloading logic
            if (props instanceof Array) {
                props = pick(this, props);
            } else if (typeof props === 'string') {
                props = pick(this, Array.prototype.slice.apply(arguments));
            }

            for (let i = 0; i < this.validations.length; i++) {
                let validation = this.validations[i];
                let key = validation.value;
                let value = this[key];
                let error;

                if (
                    typeof validation.test === 'string' && 
                    validation.test in builtInValidations
                ) {
                    error = builtInValidations[validation.test]
                        .call(this, key, value, validation);
                } else if (validation.test instanceof RegExp) {
                    if (! validation.test.test(value)) {
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

        save () {
            //  Mocking out a server interaction here. Ideally, this'd be XHR
            return Promise((resolve, reject)=>{
                setTimeout(()=>{
                    resolve();
                }, 1000);
            }).then(()=>{
                //  TODO: Implement observer system instead of this junk
                if (this.onSave) {
                    this.onSave.apply(this, arguments);
                }
            });
        }
    }

    class BillingAddress extends Model {
        constructor (options) {
            super(options);

            this.validations = [
                {
                    value : 'name',
                    test : 'isPresent'
                }, {
                    value : 'street',
                    test : 'isPresent'
                }, {
                    value : 'city',
                    test : 'isPresent'
                }, {
                    value : 'zip',
                    test : 'isPresent'
                }, {
                    value : 'zip',
                    test : 'isNumeric',
                    message : 'Zip can only contain numbers'
                }
            ];
        }
    }

    class View {
        constructor (options) {
            options = options || {};
            this.el = options.el || document.createElement(options.tagName || 'div');

            if (options.model) {
                this.model = options.model;
            }
        }

        $ (selector) {
            return this.el.querySelectorAll(selector);
        }

        bindDOMEvents (obj) {
            obj = obj || {};
            this._unregisterChain = this._unregisterChain || [];

            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let callback = obj[key].bind(this);
                    let firstSpace = key.indexOf(' ');
                    let elements;
                    let eventName; 

                    //  If there are no spaces, assume that the event is on `this`
                    if (firstSpace > 0) {
                        eventName = key.slice(0, firstSpace); 
                        let selector = key.slice(firstSpace + 1);
                        //  getting the elements and transforming them into a real array
                        elements = Array.prototype.slice.call(this.$(selector));
                    } else {
                        elements = [this.el];
                        eventName = key;
                    }

                    while (elements.length) {
                        let element = elements.pop();
                        element.addEventListener(eventName, callback);

                        this._unregisterChain.push(function () {
                            element.removeEventListener(eventName, callback);
                        });
                    }
                }
            }

            return this;
        }

        unbindDOMEvents () {
            this._unregisterChain = this._unregisterChain || [];
            for (let i = 0; i < this._unregisterChain.length; i++) {
                this._unregisterChain[i].call(this);
            }

            return this;
        }

        template () {
            return '';
        }

        render (){
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

        show (selector, view) {
            this.regions = this.regions || {};

            if (this.regions[selector]) {
                this.regions[selector].destroy();
            }

            this.$(selector)[0].appendChild(view.el);
            this.regions[selector] = view;

            view.render();
        }

        destroy () {
            this.unbindDOMEvents();

            each(this.regions, (view)=>{
                view.destroy();
            });
        }
    }

    class FormView extends View {
        constructor (options) {
            super(options);

            this.events = {
                'input input' : this.onInputInput,
                'blur input' : this.onBlurInput,
                'focus input' : this.onFocusInput
            };
        }
        
        onFocusInput (e) {
            e.target
                .closest('.input-group')
                .classList
                .add('input-group--open');
            ;
        }

        onBlurInput (e) {
            var classList = e.target.closest('.input-group').classList;

            if (! e.target.value) {
                classList.remove('input-group--open');
            }

            this.validateInputs([e.target]);
        }

        onInputInput (e) {
            this.model[e.target.name] = e.target.value || '';
        }

        validateInputs (inputs) {
            let fieldsToValidate = [];

            inputs = inputs || this.$('input');
            inputs = Array.prototype.slice.apply(inputs);

            for (let i = 0; i < inputs.length; i++) {
                let input = inputs[i];
                fieldsToValidate.push(input.name);
            }

            let validations = this.model.validate(fieldsToValidate);

            for (let i = 0; i < inputs.length; i++) {
                let input = inputs[i];
                let inputGroup = input.closest('.input-group');
                let errorField = inputGroup.querySelectorAll('.input-group__error');

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
    }

    class BillingAddressView extends FormView {
        constructor (options) {
            super(options);

            this.el.className = 'billing-address cf';
            this.events = extend(this.events, {
                'submit' : this.onSubmit
            });
        }

        template () {
            return `
                <h2>Billing Address</h2>

                <label class="input-group">
                    <span class="input-group__label">Full Name</span>
                    <input name="name" />
                    <span class="input-group__error"></span>
                </label>
                <label class="input-group">
                    <span class="input-group__label">Street Address</span>
                    <input name="street" />
                    <span class="input-group__error"></span>
                </label>
                <label class="input-group">
                    <span class="input-group__label">City &amp; State</span>
                    <input name="city" />
                    <span class="input-group__error"></span>
                </label>
                <label class="input-group">
                    <span class="input-group__label">Zip</span>
                    <input name="zip" maxlength="5" />
                    <span class="input-group__error"></span>
                </label>

                <button class="button">Next</button>
            `;
        }

        onSubmit (e) {
            e.preventDefault();

            var errors = this.validateInputs();
            
            if (isEmpty(errors)) {
                this.$('button')[0].innerHTML = '<i class="fa fa-cog fa-spin"></i>';
            } else {
                this.$('.input-group--invalid input')[0].focus();
            }
        }
    }

    class CreditCardView extends FormView {
        template () {
            return `
                AHHEHEH    
            `;
        }
    }

    class MainView extends View {
        constructor (options) {
            super(options);
            this.el.className = 'main-view';

            this.billingAddress = new BillingAddress();
            this.billingAddress.onSave = this.showCreditCardView.bind(this)
        }
        
        template (data) {
            return `
                <div class="js-content cf"></div>    
            `;
        }

        onRender () {
            this.show('.js-content', new BillingAddressView({
                model : this.billingAddress,
                tagName : 'form'
            }));
        }

        showCreditCardView () {
            this.show('.js-content', new CreditCardView({
                model : this.billingAddress,
                tagName : 'form'
            }));
        }
    }

    var main = new MainView({ });

    //  WARN: Adding window property for debug ONLY
    window.main = main;

    main.render();

    //  Removing the no-js tag
    document.body.className = '';

    document.body.appendChild(main.el);
})();
