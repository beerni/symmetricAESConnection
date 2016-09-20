var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http        = require('http');
var routes = require('./routes/index');
var cypher = require('./routes/cypher');
var CryptoJS = require("crypto-js");

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/cypher', cypher);

app.set('port',process.env.PORT || 8080); //Ponemos a escuchar en el puerto 8000

//Creamos e iniciamos el servidor
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
app.use(express.static(path.join(__dirname, 'public'))); //Localización de los ficheros estáticos

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



var clientSecret = '123';
var serverSecret = '321';
app.post('/', function (req, res, next) {
  // Decrypt client message
  var bytes  = CryptoJS.AES.decrypt(req.body.cyphertext, clientSecret);
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  console.log(plaintext);

  //Encrypt server response
  var ciphertext = CryptoJS.AES.encrypt('helloworldRECEIVED', serverSecret).toString();
  res.send({cypertext:ciphertext})
});

module.exports = app;
