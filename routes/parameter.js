const express = require('express');
const db = require("../modules/database");
const pp = require("../modules/productsParameters");
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

router.post("/getParametersToIdBySearchParams", function (req, res) {
    const {ProductID} = req.body;
    const parameters = req.app.locals.parameters;
    pp.getParametersToSearchParams(parameters, ProductID, req.body, {},  {}, (result) => {
        if (res) {
            if (result) {
                let compatibility = 0;
                let secondCompatibility = 0;
                let i = 0;
                let quadCompatibility = 0;
                let stop = false;
                for (const key in result.size) {
                    const gte = req.body.SearchParams[key];
                    const ose = result.size[key];
                    if (!stop) {
                        stop = gte > ose
                    }
                    compatibility = gte / ose + compatibility;
                    quadCompatibility = (gte * gte) / (ose * ose) + quadCompatibility;
                    i++
                }
                compatibility = compatibility / i * 100;
                secondCompatibility = Math.sqrt(quadCompatibility / i) * 100;
                result = {
                    ...result,
                    compatibility: compatibility.toFixed(2),
                    secondCompatibility: secondCompatibility.toFixed(2),
                    stop,
                };
            }
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
