import baseConfig from './webpack.base'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import MonacoPlugin from 'monaco-editor-webpack-plugin'
//import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import webpack from 'webpack'
import path from 'path'
//import Dotenv from 'dotenv-webpack'

const PORT = 3999

const createPages = (pages) => {
  return pages.map(({ filename, template, chunk }) => {
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: 'body',
      chunks: chunk,
    })
  })
}

for (const key in baseConfig.entry) {
  if (Array.isArray(baseConfig.entry[key])) {
    baseConfig.entry[key].push(
      require.resolve('webpack/hot/dev-server'),
      `${require.resolve('webpack-dev-server/client')}?http://localhost:${PORT}`
    )
  }
}
const envForEach = (env) => {
  const envs = {}
  try {
    for (const key in env) {
      envs[key] = JSON.stringify(env[key])
    }
  } catch (error) {}
  return envs
}
export default {
  ...baseConfig,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    ...createPages([
      {
        filename: 'index.html',
        template: path.resolve(__dirname, './template.ejs'),
        chunk: ['playground'],
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new MonacoPlugin({
      languages: ['json'],
    }),
    // new Dotenv(),
    new webpack.DefinePlugin({
      'process.env': envForEach(process.env),
    }),
    // new BundleAnalyzerPlugin()
  ],
  devServer: {
    host: '192.168.3.36',
    open: true,
    port: PORT,
    proxy: {
      '/api': 'http://192.168.3.123:8081',
    },
  },
}
