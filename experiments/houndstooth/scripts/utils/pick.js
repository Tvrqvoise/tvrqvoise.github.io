export default function(obj, attrs){
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
