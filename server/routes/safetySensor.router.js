const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// will get the 2 latest insertions from the gas sensor data table.
router.get('/', (req,res) => {
    const queryText = `SELECT * FROM "safety_sensors";`;
    pool.query(queryText).then(response => {res.send(response.rows)})
    .catch(error => {
        console.log('error in making safety sensor GET', error);
        res.sendStatus(500);
    });
}); // end of GET

module.exports = router;