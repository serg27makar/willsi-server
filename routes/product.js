const db = require("../modules/database");
const express = require('express');
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
module.exports = router ;

router.post("/added", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const collection = req.app.locals.products;
    collection.insertOne(req.body, function (err, response) {
        if (err) return console.log(err);
        res.send(response);
        res.end()
    });
});

router.post("/update", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { ProductID } = req.body;
    const collection = req.app.locals.products;
    const product = db.Product(req.body);
    collection.updateOne({_id: ObjectId(ProductID)}, {$set: product}, function (err, result) {
        if (err) return console.log(err);
        if (result) {
            res.send(result);
        } else {
            console.log(err);
            res.send(err);
        }
    })
});

router.get("/getProductData", function (req, res) {
    const collection = req.app.locals.products;
    collection.find().toArray(function (err, result) {
        if (res) {
            res.send(result);
            res.end();
        } else {
            res.sendStatus(401);
            res.end();
        }
    });
});

router.post("/getProductDataToId", function (req, res) {
    const {ProductStoreID} = req.body;
    const collection = req.app.locals.products;
    collection.find({ProductStoreID}).toArray(function (err, result) {
        if (res) {
            res.send(result);
            res.end();
        } else {
            res.sendStatus(401);
            res.end();
        }
    });
});

router.post("/getPostpone", function (req, res) {
    const collection = req.app.locals.products;
    const parameters = req.app.locals.parameters;
    const fatBack = [];
    try {
        if (res) {
            function foo(result) {
                res.send(result);
                res.end();
            }
            req.body.map((item) => {
                const {product, parameter, compatibility} = item;
                db.getPostpone(collection, parameters, product, parameter, compatibility, (result) => {
                    fatBack.push(result[0]);
                    if (req.body.length === fatBack.length) {
                        foo(fatBack);
                    }
                });
            });
        } else {
            res.sendStatus(401);
            res.end();
        }
    } catch (e) {
        res.send(e);
        res.end();
    }
});

router.post("/getProductDataToParams", function (req, res) {
    const collection = req.app.locals.products;
    const parameters = req.app.locals.parameters;
    const {skip} = req.body;
    const product = db.Product(req.body);
    const searchParams =  db.SearchParams(req.body);
    try {
        if (res) {
            db.getProductDataToParams(collection, product, searchParams, parameters, skip, (products) => {
                if (products) {
                    res.send(products);
                    res.end();
                } else {
                    res.sendStatus(404);
                    res.end();
                }
            });
        } else {
            res.sendStatus(401);
            res.end();
        }
    } catch (e) {
        res.send(e);
        res.end();
    }
});


