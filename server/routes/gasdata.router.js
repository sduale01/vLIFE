const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// import cron.
const cron = require('node-cron');
let task;
router.get('/', (req,res) => {
    const queryText = `SELECT * FROM "gas_sensor_data";`
    pool.query(queryText).then(response => {
        
        res.send(response.rows)
    })
    .catch(error => {
        console.log('error in making GET ', error);
        res.sendStatus(500);
    })
}); // end of GET 

router.delete('/:id', (req, res) => {
    const deleteFrequency = req.params.id;
    console.log(deleteFrequency);
    
    switch (true) {
        case (deleteFrequency == 1):
        startDeleteChartCron(deleteFrequency);
            break;
        case (deleteFrequency == 2):
        startDeleteChartCron(deleteFrequency);
        
            break;
        case (deleteFrequency == 3):
        startDeleteChartCron(deleteFrequency);
            break;
        case (deleteFrequency == 4):
        startDeleteChartCron(deleteFrequency);
            break;    
    
        default:
            break;
    }
}) // end of DELETE

startDeleteChartCron = (deleteFrequency) => {
    console.log('runs this task every 4 seconds');
    task = cron.schedule(`*/${deleteFrequency} * * * * *`, () => {
        console.log('delte frequenct number is:', deleteFrequency);
        deleteAllRows();
    });
}

// will send delete query to the database
deleteAllRows = () => {
    const queryText = `DELETE FROM "fake_table"`
    pool.query(queryText)
    .then(response => {console.log('table contents deleted');
    })
    .catch(error => {console.log('error in making DELETE', error);
    })
}

module.exports = router;