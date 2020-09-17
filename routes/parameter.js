const express = require('express');
const router = express.Router();
module.exports = router ;

router.post("/added", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const collection = req.app.locals.parameters;
    collection.insertOne(req.body, function (err, response) {
        if (err) return console.log(err);
        res.send(response);
        res.end()
    });
});


router.post("/getParametersToId", function (req, res) {
    const {ProductID} = req.body;
    const collection = req.app.locals.parameters;
    collection.find({ProductID}).toArray(function (err, result) {
        if (res) {
            res.send(result);
            res.end();
        } else {
            res.sendStatus(401);
            res.end();
        }
    });
});
