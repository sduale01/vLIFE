const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// add node cron
const cron = require('node-cron');

router.get('/', (req, res) => {
    // Send back user object from the session (previously queried from the database)
    const queryText = `SELECT * FROM "sensors"`
    pool.query(queryText).then(response => {
        res.send(response.rows);
    }).catch(error => {
        console.log('error in making sensor GET request', error);
        res.sendStatus(500);
    })
    // res.send(req.user);
}); // end of get
let task;

function startInterval(carSpeed) {
    // if car speed ranges between 55-75 subtract 9 from "sensor level"
    console.log('runs this task every 4 seconds');
    task = cron.schedule("*/4 * * * * *", () => {
        console.log(carSpeed);

        if (carSpeed >= 0 && carSpeed <= 50) {
            const queryText = `UPDATE "sensors" SET sensor_level = sensor_level - 5;`
            pool.query(queryText).then(response => {
                console.log('PUT is succesfull');
            }).catch(error => {
                console.log('error in making PUT request', error);
            });
        } else if (carSpeed >= 51 && carSpeed <= 85) {
            const queryText = `UPDATE "sensors" SET sensor_level = sensor_level - 10;`
            pool.query(queryText).then(response => {
                console.log('PUT is succesfull');
            }).catch(error => {
                console.log('error in making PUT request', error);
            });
        }
    });
}

router.put('/update/:speed', (req, res) => {
    const carSpeed = Number(req.params.speed)
    startInterval(carSpeed);
    res.sendStatus(200);
}); // end of put

updateSensor = () => {

}

/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;