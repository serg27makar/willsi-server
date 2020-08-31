const express = require('express');
const router = express.Router();
module.exports = router ;

router.post("/register", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const {adminID, nameStore, urlStore, textStore, phoneStore, secondUrlStore, addressStore} = req.body;
    const store = {
        adminID,
        nameStore,
        urlStore,
        textStore,
        phoneStore,
        secondUrlStore,
        addressStore,
    };
    const collection = req.app.locals.collection;
    collection.insertOne(store, function (err, response) {
        if (err) return console.log(err);
        res.send(response);
        res.end()

    });

});

router.get("/getStoreData", function (req, res) {
    let cookies = req.headers;
    const collection = req.app.locals.collection;
    collection.find({adminID: cookies.token}).toArray(function (err, result) {
        if (res) {
            res.send(result);
            res.end();
        } else {
            res.sendStatus(401);
            res.end();
        }
    });
});
