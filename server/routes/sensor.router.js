const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

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

  router.put('/update/:id', (req, res) => {
    const queryText = `UPDATE "sensors" SET sensor_level = 72 where "id" = 4;`
    pool.query(queryText).then(response => {
        console.log('PUT is succesfull');
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in making PUT request', error);
        res.sendStatus(500);
    });
    // axios.put('/api/sensor/update', queryText)
    // .then(response => {
    //     console.log(response.data);
        
    // }).catch(error => {
    //     console.log('error in making PUT', error);
    //     res.sendStatus(500);
    // });
  }); // end of put

/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;