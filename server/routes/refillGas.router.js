const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    const queryText = `SELECT * FROM "gas_sensor_data" 
                        ORDER BY "time" DESC LIMIT 2;`;
    pool.query(queryText).then(response => {
        if(response.rows.length === 2) {
            const oldLevel = Number(response.rows[1].level);
            const newLevel = Number(response.rows[0].level);
            res.send({oldLevel:oldLevel, newLevel:newLevel, greater: newLevel > oldLevel});
        }
        // send something else
        // console.log(response.rows);
        
        // setTimeout(() => {
        //     const queryText = `SELECT * FROM "gas_sensor_data" 
        //                 ORDER BY "time" DESC LIMIT 1;`;
        //     pool.query(queryText).then(response => {
        //         const newLevel = Number(response.rows[0].level);
                
        //         // res.send('booooo0000!!!!!!')
        //         if (newLevel > oldLevel) {
        //             console.log(response.rows);
                    
        //             console.log(`old gas level was: ${oldLevel} new gas level is: ${newLevel}`);
        //             res.send(newLevel)
        //         }
        //         });
        // }, 1500);
    })
})
module.exports = router;