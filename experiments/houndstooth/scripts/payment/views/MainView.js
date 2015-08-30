import View from '../../common/View';
import BillingAddressModel from '../models/BillingAddressModel';
import BillingAddressView from '../views/BillingAddressView';
import CreditCardView from '../views/CreditCardView';

export default class MainView extends View {
    constructor (options) {
        super(options);
        this.el.className = 'main-view';

        this.billingAddress = new BillingAddressModel();
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
