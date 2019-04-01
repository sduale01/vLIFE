
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const gasRouter = require('./routes/gas.router');
const gasData = require('./routes/gasdata.router');
const refillGas = require('./routes/refillGas.router');
const refillCost = require('./routes/refillCost.router');
const safetySensor = require('./routes/safetySensor.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/gas', gasRouter);
app.use('/api/gasdata', gasData);
app.use('/api/refillGas', refillGas);
app.use('/api/gasPrice', refillCost);
app.use('/api/safetysensor', safetySensor);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
