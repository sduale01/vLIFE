const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// add node cron
const cron = require('node-cron');
let task;
// task = cron.schedule("*/5 * * * * *", () => {
//     console.log('runs every 5 seconds');
    
//     sendGasData();
// }), {
//     scheduled: false
// }
// function startGasData() {
//     // If the cronTask is stopped, start it
//     if (this.task.getStatus() === 'stoped') {
//         this.task.start();
//     }
//     sendGasData();
// }

// function stopGasData() {
//     if(task) {
//         task.stop();
//     }
// }

// sendGasData = () => {
//     // TODO: Make these numbers change over time to better simulate live data
//     const result = {
//         gasLevel: 70, // Gas level
//     };
//         axios({
//             method: 'POST',
//             url: '/api/gas',
//             data: result

//         }).catch(error => {
//             console.log(error);
//         });
// }
function startInterval(carSpeed) {
    // if car speed ranges between 55-75 subtract 9 from "sensor level"
    console.log('runs this task every 4 seconds');
    task = cron.schedule("*/4 * * * * *", () => {
        console.log(carSpeed);
        let maxFuelLevel = 100
        if (carSpeed >= 0 && carSpeed <= 50) {
            maxFuelLevel -= 10;
            const queryText = `INSERT INTO "gas_sensor_data" ("level") VALUES ($1)`
            pool.query(queryText, [maxFuelLevel]).then(response => {
                console.log('PUT is succesfull');
            }).catch(error => {
                console.log('error in making PUT request', error);
            });
        } else if (carSpeed >= 51 && carSpeed <= 85) {
            maxFuelLevel -= 5;
            const queryText = `INSERT INTO "gas_sensor_data" ("level") VALUES ($1)`
            pool.query(queryText, [maxFuelLevel]).then(response => {
                console.log('PUT is succesfull');
            }).catch(error => {
                console.log('error in making PUT request', error);
            });
        }
    });
}

// router.put('/update/:speed', (req, res) => {
//     const carSpeed = Number(req.params.speed)
//     startInterval(carSpeed);
//     res.sendStatus(200);
// }); // end of put
router.post('/', (req, res) => {
    console.log('in POST api/gas');
    console.log(req.body);
    let carSpeed = Number(req.body.speed);
    startInterval(carSpeed);
    // const queryText =  `INSERT INTO "gas_sensor_data" ("level")
    //                     VALUES ($1)`
    // pool.query(queryText, [req.body.gasLevel]).then(response => {
    //     res.sendStatus(201);
    // }).catch(error => {
    //     console.log('error in make POST ', error);
    //     res.sendStatus(500);
    // });
});

module.exports = router;