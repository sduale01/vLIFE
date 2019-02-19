const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// post newest gas spending into the gas_budget table
router.post('/', (req, res) => {
    console.log('req.body is: ', req.body);
    
    const queryText =  `INSERT INTO "gas_budget" ("gas_price") VALUES ($1)`
    pool.query(queryText, [req.body.refillPrice]).then(response => {res.sendStatus(201)})
    .catch(error => {
        console.log('error in making POST ', error);
        res.sendStatus(500);
    });
}); // end of POST
// GET amount spent on gas over time
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "gas_budget"`).then(response => res.send(response.rows))
    .catch(error => {
        console.log('error in making GET request', error);
        res.sendStatus(500);
    })
})

module.exports = router;