const db = require("../modules/database");
const util = require("../modules/utilities");
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
    const product = db.Product(req.body);
    const searchParams = util.SearchParams(req.body);
    const {searchItemParams} = req.body;
    const {searchItemNew} = req.body;
    const {searchItemColor} = req.body;
    const {searchItemPrice} = req.body;
    const {country} = req.body;
    try {
        if (res) {
            db.getProductDataToParams(collection, product, country, searchParams, searchItemParams, searchItemNew, searchItemColor, searchItemPrice, parameters, (products) => {
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

router.post("/getAllProductDataToParams", function (req, res) {
    const collection = req.app.locals.products;
    const parameters = req.app.locals.parameters;
    const product = db.Product(req.body);
    const {searchItemParams} = req.body;
    const {searchItemNew} = req.body;
    const {searchItemColor} = req.body;
    const {searchItemPrice} = req.body;
    const {country} = req.body;
    try {
        if (res) {
            db.getAllProductDataToParams(collection, parameters, product, country, req.body, searchItemParams, searchItemNew, searchItemColor, searchItemPrice, (products) => {
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

router.post("/getAllProductsData", function (req, res) {
    const collection = req.app.locals.products;
    const {ProductStoreID} = req.body
    const filter = ProductStoreID ? {ProductStoreID} : {}
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

router.post("/getProductsByLink", function (req, res) {
    const linkArr = ["Photo1", "Photo2", "Photo3", "LinkToProduct"];
    const collection = req.app.locals.products;
    const {link} = req.body
    let i = 0;
    function foo(data) {
        if (res) {
            res.send(data);
            res.end();
        } else {
            res.sendStatus(401);
            res.end();
        }
    }
    function search() {
        collection.find({[linkArr[i]]:link}).toArray(function (err, result) {
            if (result.length > 0) {
                foo(result)
            } else {
                if (i <= linkArr.length) {
                    i++;
                    search();
                } else {
                    foo(result)
                }
            }
        });
    }
    search();
});

router.post("/unsetProductData", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { ProductID } = req.body;
    const { removeData } = req.body;
    const collection = req.app.locals.products;
    collection.updateOne({_id: ObjectId(ProductID)}, {$unset: removeData}, function (err, result) {
        if (err) return console.log(err);
        if (result) {
            res.send(result);
        } else {
            console.log(err);
            res.send(err);
        }
    })
});

router.post("/setProductData", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { ProductID } = req.body;
    const { setData } = req.body;
    const collection = req.app.locals.products;
    collection.updateOne({_id: ObjectId(ProductID)}, {$set: setData}, function (err, result) {
        if (err) return console.log(err);
        if (result) {
            res.send(result);
        } else {
            console.log(err);
            res.send(err);
        }
    })
});
