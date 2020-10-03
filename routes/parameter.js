const express = require('express');
const db = require("../modules/database");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
module.exports = router ;

router.post("/added", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const parameters = req.app.locals.parameters;
    parameters.insertOne(req.body, function (err, response) {
        if (err) return console.log(err);
        res.send(response);
        res.end()
    });
});


router.post("/getParametersToId", function (req, res) {
    const {ProductID} = req.body;
    const parameters = req.app.locals.parameters;
    parameters.find({ProductId: ProductID}).toArray(function (err, result) {
        if (res) {
            res.send(result);
            res.end();
        } else {
            res.sendStatus(401);
            res.end();
        }
    });
});

router.post("/update", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { ParameterID } = req.body;
    const parameters = req.app.locals.parameters;
    const Parameter = db.Parameter(req.body);
    parameters.updateOne({_id: ObjectId(ParameterID)}, {$set: Parameter}, function (err, result) {
        if (err) return console.log(err);
        if (result) {
            res.send(result);
        } else {
            console.log(err);
            res.send(err);
        }
    })
});
