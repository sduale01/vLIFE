const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    const queryText = `SELECT * FROM "gas_sensor_data";`
    pool.query(queryText).then(response => {
        
        res.send(response.rows)
    })
    .catch(error => {
        console.log('error in making GET ', error);
        res.sendStatus(500);
    })
})

module.exports = router;