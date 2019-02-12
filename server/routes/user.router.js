const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `WITH 
  "new1" AS (INSERT INTO "person" ("username", "password") VALUES ($1, $2) RETURNING "id"),
  "new2" AS (INSERT INTO "car_info" ("make", "model", "year") VALUES ($3, $4, $5) RETURNING "id"),
  "new3" AS (INSERT INTO "auto_shop" ("shop_name", "shop_address", "shop_number") VALUES ($6, $7, $8) RETURNING "id")
    INSERT INTO "junction_table" ("user_id", "car_id", "auto_shop_id") 
    SELECT "new1"."id", "new2"."id", "new3"."id" 
    FROM "new1", "new2", "new3";`;
  pool.query(queryText, [ username, password, 
                          req.body.car_make, req.body.car_model,
                          req.body.car_year, req.body.shop_name,
                          req.body.shop_address, req.body.shop_number
                        ])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
