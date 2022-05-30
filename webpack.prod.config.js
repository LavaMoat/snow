module.exports = {
    optimization: {
        minimize: true
    },
    entry: './build.js',
    mode: 'production',
    output: {
        path: `${__dirname}`,
        filename: 'glazier.prod.js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    }
};