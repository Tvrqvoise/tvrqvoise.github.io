import View from './View';

export default class FormView extends View {
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
