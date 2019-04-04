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
router.post('/register', (req, res) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  (async () => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const registerUser = `INSERT INTO "person" ("username", "password") VALUES ($1, $2)`;
      await client.query(registerUser, [username, password]);

      const registerCar = `INSERT INTO "car_info" ("make", "model", "year") VALUES ($1, $2, $3)`;
      await client.query(registerCar, [req.body.car_make, req.body.car_model, req.body.car_year]);

      await client.query('COMMIT');
      await res.sendStatus(201);
    } catch (error) {
      await client.query('ROLLBACK');
      await res.sendStatus(500);
      throw error;
    }finally {
      client.release();
    }
  })().catch(error => {
    console.log(error.stack);
  });
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
