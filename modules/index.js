/**
 * Created by Rishikesh on 10/05/20.
 */

require('./anlytics');

app.get('/ping', function(req, res) {
  res.send('OK');
});