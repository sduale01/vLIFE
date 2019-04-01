const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// add node cron
const cron = require('node-cron');
let task;

// this will stop the cron task when Stop Car button is pressed.
router.post('/stoptask', (req,res) => {
    if (task) {
        task.stop();
    }
})
function startInterval(carSpeed) {
    if (task) {
        task.stop();
    }
    console.log('runs this task every 1 second');
    task = cron.schedule("*/1 * * * * *", () => {
        console.log('car speed is:', carSpeed);
        getNewestRow(carSpeed);
    });
}  

// GET latest gas levels from database to simulate the device getting the data 
// fro the car
 getNewestRow = (carSpeed) =>{
    const queryText = `SELECT * FROM "gas_sensor_data" 
                        ORDER BY "time" DESC LIMIT 1;`
    pool.query(queryText)
    .then(response => {
        console.log('respoense form server;', response.rows[0].level);
        if( response.rows[0].level <= 3.00) {
            pool.query(`INSERT INTO "gas_sensor_data" ("level") VALUES (88.00)`)
            .then(response => {
                console.log('response after refilling gas to 88:',response.rows);
                // insertGasData(response, carSpeed);
            }).catch(error => {
                console.log('error in making PUT ', error);
                res.sendStatus(500);
            });
        } else {
            insertGasData(response, carSpeed);
        }
    }).catch(error => {
            console.log('error in GET:', error);
            return -1;
        })
}
// this function desides the depletion rate of the vehicles gas 
// depending on its speed
insertGasData = (response, carSpeed) => {
    let maxFuelLevel = Number(response.rows[0].level)
    // let queryText;
    switch (true) {
        case (carSpeed <10):
        maxFuelLevel -= 0.3;
        insertQuery(maxFuelLevel);
            
            break;
        case (carSpeed <20):
        maxFuelLevel -= 0.6;
        insertQuery(maxFuelLevel);
            break;
        case (carSpeed <30):
        maxFuelLevel -= 0.9;
        insertQuery(maxFuelLevel);
            break;
        case (carSpeed <40):
        maxFuelLevel -= 1.3;
        insertQuery(maxFuelLevel);
            break;
        case (carSpeed <50):
        maxFuelLevel -= 1.7;
        insertQuery(maxFuelLevel);
            break;
        case (carSpeed <60):
        maxFuelLevel -= 2.4;
        insertQuery(maxFuelLevel);
            break;
        case (carSpeed <70):
        maxFuelLevel -= 2.6;
        insertQuery(maxFuelLevel);
            break;
        case (carSpeed <80):
        maxFuelLevel -= 2.9;
        insertQuery(maxFuelLevel);
            break;
        default:
            break;
    }
}

function insertQuery(maxFuelLevel) {
    queryText = `INSERT INTO "gas_sensor_data" ("level") VALUES ($1)`
        pool.query(queryText, [maxFuelLevel]).then(response => {
            console.log('POST is succesfull');
        }).catch(error => {
            console.log('error in making POST request', error);
        });
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