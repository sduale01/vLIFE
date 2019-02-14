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
        console.log('car speed is:', carSpeed);
        // will reset maxFuelLevel back to 100 after 4 seconds
        // want maxFuelLevel to be the current fuel 
        // let maxFuelLevel = getNewestRow();
        // console.log(maxFuelLevel);
        getNewestRow(carSpeed);
        // let maxFuelLevel = 100

    });
}  

// GET current gas levels from database

 getNewestRow = (carSpeed) =>{
    const queryText = `SELECT * FROM "gas_sensor_data" 
                        ORDER BY "time" DESC LIMIT 1;`
    pool.query(queryText)
    .then(response => {
        console.log('respoense form server;', response.rows[0].level);
        if( response.rows[0].level < 10.00) {
            pool.query(`INSERT INTO "gas_sensor_data" ("level") VALUES (88.00)`)
            .then(response => {
                console.log('response after refilling gas to 88:',response.rows);
                let maxFuelLevel = Number(response.rows[0].level)
                if (carSpeed >= 0 && carSpeed <= 50) {
                    maxFuelLevel -= 5;
                    const queryText = `INSERT INTO "gas_sensor_data" ("level") VALUES ($1)`
                    pool.query(queryText, [maxFuelLevel]).then(response => {
                        console.log('POST is succesfull');
                    }).catch(error => {
                        console.log('error in making POST request', error);
                    });
                } else if (carSpeed >= 51 && carSpeed <= 85) {
                    maxFuelLevel -= 10;
                    const queryText = `INSERT INTO "gas_sensor_data" ("level") VALUES ($1)`
                    pool.query(queryText, [maxFuelLevel]).then(response => {
                        console.log('POST is succesfull');
                    }).catch(error => {
                        console.log('error in making POST request', error);
                    });
                }
            })
        } else {
            let maxFuelLevel = Number(response.rows[0].level)
        if (carSpeed >= 0 && carSpeed <= 50) {
            maxFuelLevel -= 5;
            const queryText = `INSERT INTO "gas_sensor_data" ("level") VALUES ($1)`
            pool.query(queryText, [maxFuelLevel]).then(response => {
                console.log('POST is succesfull');
            }).catch(error => {
                console.log('error in making POST request', error);
            });
        } else if (carSpeed >= 51 && carSpeed <= 85) {
            maxFuelLevel -= 10;
            const queryText = `INSERT INTO "gas_sensor_data" ("level") VALUES ($1)`
            pool.query(queryText, [maxFuelLevel]).then(response => {
                console.log('POST is succesfull');
            }).catch(error => {
                console.log('error in making POST request', error);
            });
        }
        }
        let maxFuelLevel = Number(response.rows[0].level)
        if (carSpeed >= 0 && carSpeed <= 50) {
            maxFuelLevel -= 5;
            const queryText = `INSERT INTO "gas_sensor_data" ("level") VALUES ($1)`
            pool.query(queryText, [maxFuelLevel]).then(response => {
                console.log('POST is succesfull');
            }).catch(error => {
                console.log('error in making POST request', error);
            });
        } else if (carSpeed >= 51 && carSpeed <= 85) {
            maxFuelLevel -= 10;
            const queryText = `INSERT INTO "gas_sensor_data" ("level") VALUES ($1)`
            pool.query(queryText, [maxFuelLevel]).then(response => {
                console.log('POST is succesfull');
            }).catch(error => {
                console.log('error in making POST request', error);
            });
        }
    }).catch(error => {
            console.log('error ', error);
            return -1;
        })
}
router.post('/', (req, res) => {
    console.log('in POST api/gas');
    console.log('speed is:',req.body);
    let carSpeed = Number(req.body.speed);
    startInterval(carSpeed);
});

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "gas_sensor_data" 
                ORDER BY "time" DESC LIMIT 1`)
    .then(response => res.send(response.rows))
    .catch(error => {
        console.log('error in making GET ', error);
        res.sendStatus(500);
    });
}); // end of GET

module.exports = router;