/**
 * Created by sumeet on 05/10/19.
 */

const bodyParser              = require('body-parser');
const errorhandler            = require('errorhandler');
const cors                    = require('cors');

app.set('port', config.get('PORT'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    return res.sendStatus(400);
  }
  next();
});

app.use(cors());

if ('development' == app.get('env')) {
  app.use(errorhandler());
}

console.log("App Environment Running at: ", app.get('env'));