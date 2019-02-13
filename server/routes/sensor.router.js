const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// add node cron
const cron = require('node-cron');

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
  }); // end of get

  cron.schedule("*/4 * * * * *", () => {
      // if car speed ranges between 55-75 subtract 9 from "sensor level"
    console.log('runs this task every 4 seconds');
    router.put('/update/:id', (req, res) => {
        console.log(req.params);
        
        // const queryText = `UPDATE "sensors" SET sensor_level = sensor_level - 5;`
        // pool.query(queryText).then(response => {
        //     console.log('PUT is succesfull');
        //     res.sendStatus(200);
        // }).catch(error => {
        //     console.log('error in making PUT request', error);
        //     res.sendStatus(500);
        // });
      }); // end of put
});

updateSensor = () => {
    
}

/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;