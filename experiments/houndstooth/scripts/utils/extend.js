export default function (){
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
