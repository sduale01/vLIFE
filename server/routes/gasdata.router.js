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
        startHourlyDelete();
            break;
        case (deleteFrequency == 2):
        startDailyDelete();
            break;
        case (deleteFrequency == 3):
        startWeeklyDelete();
            break;
        case (deleteFrequency == 4):
        startMonthlyDelete();
            break;    
    
        default:
            break;
    }
}) // end of DELETE

// runs every hour.
startHourlyDelete = () => {
    console.log('runs this task every hour');
    task = cron.schedule("0 * * * * ", () => {
        deleteAllRows();
    });
}

// runs every day at 12 am.
startDailyDelete = () => {
    console.log('runs this task at midnight');
    task = cron.schedule("0 0 0 * * *", () => {
        deleteAllRows();
    });
}

//runs every Sunday.
startWeeklyDelete = () => {
    console.log('runs this task every sunday');
    task = cron.schedule("0 0 0 * * Sunday", () => {
        deleteAllRows();
    });
}
//runs on the first day of the month.
startMonthlyDelete = () => {
    console.log('runs this task on the first of the month');
    task = cron.schedule("0 0 1 * * ", () => {
        deleteAllRows();
    });
}

// will send delete query to the database
deleteAllRows = () => {
    // Stops any previously runnig tasks
    if (task) {
        task.stop();
    }
    const queryText = `DELETE FROM "fake_table"`
    pool.query(queryText)
    .then(response => {console.log('table contents deleted');
    })
    .catch(error => {console.log('error in making DELETE', error);
    })
}

module.exports = router;