const express = require('express');
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const db = require("../modules/database");
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
    const collection = req.app.locals.store;
    collection.insertOne(store, function (err, response) {
        if (err) return console.log(err);
        res.send(response);
        res.end()

    });

});

router.get("/getStoreData", function (req, res) {
    let cookies = req.headers;
    const collection = req.app.locals.store;
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

router.post("/remove", function (req, res) {
    let cookies = req.headers;
    const collection = req.app.locals.store;
    const { StoreID } = req.body;
    collection.remove({_id: ObjectId(StoreID)}, function (err, result) {
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
    const { StoreID } = req.body;
    const collection = req.app.locals.store;
    const store = db.Store(req.body);
    collection.updateOne({_id: ObjectId(StoreID)}, {$set: store}, function (err, result) {
        if (err) return console.log(err);
        if (result) {
            res.send(result);
        } else {
            console.log(err);
            res.send(err);
        }
    })
});
