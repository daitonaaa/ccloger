const path = require('path')
const webpack = require('webpack');
const express = require('express');

const configDev = require('../../webpack/webpack.config.dev');

const port = 4000;
const app = express();

const compiler = webpack(configDev);

const fileIndex = path.join(__dirname, 'index.html');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: configDev.output.publicPath,
}))

app.get('*', (req, res) => {
  res.sendFile(fileIndex);
})

app.listen(port, (error) => {
  if (error) console.error('ERROR', error);
  console.log('LOGGER SERVER IS RUNNING')
  console.log(`LOGGER SERVER PORT ${port}`)
});
