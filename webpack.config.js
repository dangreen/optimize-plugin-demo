const OptimizePlugin = require('@trigensoftware/optimize-plugin');

const { VARIANT } = process.env;
const VariantSettings = {
  'optimize-plugin': () => ({
    plugins: [
      new OptimizePlugin({
        minify: true,
        downlevel: true,
        concurrency: false
      })
    ]
  }),
  'babel-modern': () => ({
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'defaults and supports es6-module'
                  }
                ]
              ]
            }
          }
        }
      ]
    }
  }),
  'babel-legacy': () => ({
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'defaults',
                    corejs: 3,
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          }
        }
      ]
    }
  })
};

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: `${VARIANT}.js`
  },
  ...(VariantSettings[VARIANT] ? VariantSettings[VARIANT]() : {})
};
