export default function(thing, cb, context){
    context = context || this;
    for (let i in thing) {
        if (thing.hasOwnProperty(i)){
            if (cb.call(context, thing[i], i, thing) === false) {
                break;
            }
        }
    }
};
