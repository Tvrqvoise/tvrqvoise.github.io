module.exports = {
    entry: "./scripts/payment.js",
    output: {
        path: __dirname,
        filename: "dist/payment.js"
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                exclude: /(node_modules|bower_components)/,
                loader: "babel"
            }
        ]
    }
};
