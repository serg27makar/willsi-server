const express = require('express');
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const db = require("../modules/database");
module.exports = router ;

router.post("/register", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const {adminID, nameStore, urlStore, phoneStore, addressStore, countryStore} = req.body;
    const store = {
        adminID,
        nameStore,
        urlStore,
        phoneStore,
        addressStore,
        countryStore,
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

router.post("/getAllStoresData", function (req, res) {
    const collection = req.app.locals.store;
    let filter = {}
    collection.find(filter).toArray(function (err, result) {
        if (res) {
            res.send(result);
            res.end();
        } else {
            res.sendStatus(401);
            res.end();
        }
    });
});

router.post("/removeStoreData", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { StoreID } = req.body;
    const { removeData } = req.body;
    const collection = req.app.locals.store;
    collection.updateOne({_id: ObjectId(StoreID)}, {$unset: removeData}, function (err, result) {
        if (err) return console.log(err);
        if (result) {
            res.send(result);
        } else {
            console.log(err);
            res.send(err);
        }
    })
});

router.post("/setStoreData", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { StoreID } = req.body;
    const { setData } = req.body;
    const collection = req.app.locals.store;
    collection.updateOne({_id: ObjectId(StoreID)}, {$set: setData}, function (err, result) {
        if (err) return console.log(err);
        if (result) {
            res.send(result);
        } else {
            console.log(err);
            res.send(err);
        }
    })
});
