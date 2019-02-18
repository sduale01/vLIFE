const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    const queryText = `SELECT * FROM "gas_sensor_data" 
                        ORDER BY "time" DESC LIMIT 1;`;
    pool.query(queryText).then(response => {
        console.log(response.rows[0].level);
        const oldLevel = response.rows[0].level;
        const queryText = `SELECT * FROM "gas_sensor_data" 
                        ORDER BY "time" DESC LIMIT 1;`;
        setTimeout(() => {
            pool.query(queryText).then(response => {
                console.log(response.rows);
                const newLevel = response.rows[0].level
                console.log(`old gas level was: ${oldLevel} new gas level is: ${newLevel}`);
                
                })
        }, 1000);
    })
})
module.exports = router;