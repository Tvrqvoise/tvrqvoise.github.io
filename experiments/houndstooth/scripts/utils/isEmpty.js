export default function(obj){
    var i = 0;

    for (let key in obj) {
        i++;
    }

    return ! i;
};
