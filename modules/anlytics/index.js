/**
 * Created by Rishikesh on 10/05/20.
 */

const controllers = require('./controllers/controllers');
const validators = require('./validators/validators');

app.get('/users', validators.userValidation, controllers.getUserStatistics);