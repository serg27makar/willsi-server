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