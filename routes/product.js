const express = require('express');
const router = express.Router();
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

router.get("/getProductData", function (req, res) {
    const collection = req.app.locals.products;
    collection.find().toArray(function (err, result) {
        if (res) {
            const products = [];
            result.forEach((obj) => {
                if (obj.ProductStoreID) {
                    products.push(obj)
                }
            });
            res.send(products);
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
