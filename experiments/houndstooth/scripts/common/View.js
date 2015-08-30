import each from '../utils/each';

export default class View {
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
        this.el.remove();

        each(this.regions, (view)=>{
            view.destroy();
        });
    }
}

