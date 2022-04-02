const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-source-map',
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
    // assetModuleFilename: "img/[name].[hash:6][ext]",
  },
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: '/node-modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', {
              targets: {
                browsers: ["last 50 versions", "ie >= 7"]
              }
            }],
          }
        }
      },
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-preset-env')
                ]
              }
            }
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        // webpack5处理资源模块使用asset
        type: 'asset',
        generator: {
          filename: "img/[name].[hash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 600 * 1024
          }
        }
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       name: 'img/[name]-[hash:6].[ext]',
        //       limit: 102400,
        //     }
        //   },
        // ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ]
};
