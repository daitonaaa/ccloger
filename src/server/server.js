const path = require('path')
const webpack = require('webpack');
const express = require('express');

var http = require('http');
var https = require('https');

const fs = require('fs');

const sslOptions = {
  cert: fs.readFileSync(__dirname + '/ssl/cert.pem'),
  key: fs.readFileSync(__dirname + '/ssl/privkey.pem'),
};

const configDev = require('../../webpack/webpack.config.dev');

const app = express();
const httpPort = 4000;
const httpsPort = 4443;

const compiler = webpack(configDev);

const fileIndex = path.join(__dirname, 'index.html');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: configDev.output.publicPath,
}))

app.get('*', (req, res) => {
  res.sendFile(fileIndex);
})

const httpServer = http.createServer(app);
const httpsServer = https.createServer(sslOptions, app);

httpServer.listen(httpPort, (error) => {
  if (error) console.error('ERROR', error);
  console.log('LOGGER SERVER HTTP IS RUNNING')
  console.log(`LOGGER SERVER PORT ${httpPort}`)
});

httpsServer.listen(httpsPort, (error) => {
  if (error) console.error('ERROR', error);
  console.log('LOGGER SERVER HTTPS IS RUNNING')
  console.log(`LOGGER SERVER PORT ${httpsPort}`)
});
