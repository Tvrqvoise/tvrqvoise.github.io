import pick from '../utils/pick';

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

export default class Model {
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
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve({});
            }, 1000);
        }).then(()=>{
            //  TODO: Implement observer system instead of this junk
            if (this.onSave) {
                this.onSave.apply(this, arguments);
            }
        });
    }
}
