const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// will get the 2 latest insertions from the gas sensor data table.
router.get('/', (req,res) => {
    const queryText = `SELECT * FROM "gas_sensor_data" 
                        ORDER BY "time" DESC LIMIT 2;`;
    pool.query(queryText).then(response => {
        if(response.rows.length === 2) {
            const oldLevel = Number(response.rows[1].level);
            const newLevel = Number(response.rows[0].level);
            res.send({oldLevel:oldLevel, newLevel:newLevel, greater: newLevel > oldLevel});
        }
    });
}); // end of GET

// post newest gas spending into the gas_budget table
router.post('/gasPrice', (req, res) => {
    const queryText =  `INSERT INTO "gas_budget" ("gas_price") VALUES ($1)`
    pool.query(queryText, [req.params.id]).then(response => {res.sendStatus(201)})
    .catch(error => {
        console.log('error in making POST ', error);
        res.sendStatus(500);
    });
}); // end of POST
module.exports = router;