import FormView from '../../common/FormView';

export default class CreditCardView extends FormView {
    constructor (options) {
        super(options);

        this.el.className = 'credit-card';
    }

    template () {
        return `
            <h2>Credit Card</h2>
            <label class="input-group input-group--card-number">
                <span class="input-group__label">Card Number</span>
                <input name="number" />
                <span class="input-group__error"></span>
                <i class="fa input-group__icon"></i>
            </label>
            <div class="cf">
                <label class="input-group input-group--month">
                    <span class="input-group__label">Month</span>
                    <input name="expiry-month" />
                    <span class="input-group__error"></span>
                </label>
                <label class="input-group input-group--year">
                    <span class="input-group__label">Year</span>
                    <input name="expiry-year" />
                    <span class="input-group__error"></span>
                </label>
                <label class="input-group input-group--cvv">
                    <span class="input-group__label">CVV</span>
                    <input name="cvv" />
                    <span class="input-group__error"></span>
                    <i class="fa input-group__icon fa-question-circle" tabindex="0"></i>
                </label>
            </div>
            <button class="button button--pay">Pay</button>
        `;
    }
}
