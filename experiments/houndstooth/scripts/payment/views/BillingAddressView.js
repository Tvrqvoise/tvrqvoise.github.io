import extend from '../../utils/extend';
import isEmpty from '../../utils/isEmpty';
import FormView from '../../common/FormView';

export default class BillingAddressView extends FormView {
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
