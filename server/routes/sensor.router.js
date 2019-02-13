const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // Send back user object from the session (previously queried from the database)
    const queryText =  `SELECT * FROM "sensors"`
    pool.query(queryText).then(response => {
        res.send(response.rows);
    }).catch(error => {
        console.log('error in making sensor GET request', error);
        res.sendStatus(500);
    })
    // res.send(req.user);
  });

/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;