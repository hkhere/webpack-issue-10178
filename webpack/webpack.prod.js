const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonPaths = require('./paths');

module.exports = {
  mode: 'production',
  output: {
    filename: `[name].[hash].js`,
    path: commonPaths.outputPath,
    chunkFilename: `[name].[chunkhash].js`,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: false,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        initial: {
          test: /[\\/]node_modules[\\/]/,
          name: 'initial',
          chunks: 'initial',
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          name: 'async',
          chunks: 'async',
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name].css`,
      chunkFilename: `[name].css`,
    }),
  ],
  devtool: 'source-map',
};
