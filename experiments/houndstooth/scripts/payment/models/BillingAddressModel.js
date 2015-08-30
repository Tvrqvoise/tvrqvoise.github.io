import Model from '../../common/Model';
console.log(Model);

export default class BillingAddress extends Model {
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
