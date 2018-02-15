const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.post('/', function(req, res){
    koalaObject = req.body

    const sqlText = `insert into koalas (name, age, gender, transfer, notes) values($1, $2, $3, $4, $5)`
    pool.query(sqlText, [koalaObject.name, koalaObject.age, koalaObject.gender, koalaObject.transfer, koalaObject.notes])
    .then(function(result){
        console.log('Added koala (not object)', result);
        res.send(201);
    })
    .catch(function(error){
        console.log('Error locating koala', error);
        res.sendStatus(500);
    })
});

router.get('/', function(req, res){
    const sqlText = 'select * from koalas order by age;';
    pool.query(sqlText)
    .then(function(result){
        res.send(result.rows);
    }).catch(function(error){
        response.sendStatus(500);
    })
})

module.exports = router;