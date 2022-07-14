module.exports = {
    optimization: {
        minimize: false
    },
    entry: './build.js',
    mode: 'production',
    output: {
      path: `${__dirname}`,
      filename: 'snow.js',
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