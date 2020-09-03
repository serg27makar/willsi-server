const db = require("../modules/database");
const express = require('express');
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
module.exports = router ;

router.post('/login', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    const { Email, Password } = req.body;
    const user = {Password: Password, Email: Email};
    const collection = req.app.locals.collection;
    collection.findOne(user, function (err, result) {
        if (err) return console.log(err);
        if (!result) {
            res.send('find:0');
            res.end();
        } else {
            const {UserName, Email, _id, PublicAuth, Phone, UsersParameters, Permission, UserStore} = result;
            const data = {
                UserID: _id,
                UserName,
                Email,
                PublicAuth,
                Phone,
                UsersParameters,
                Permission,
                UserStore,
            };
            res.send(data);
            res.end();
        }
    });
});

router.post("/register", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { Email, Permission } = req.body;
    const user = db.User(req.body);
    const collection = req.app.locals.collection;
    if (Permission !== "unknown") {
        collection.findOne({Email: Email}, function (err, result) {
            if (err) return console.log(err);
            if (!result) {
                collection.insertOne(user, function (err, response) {
                    if (err) return console.log(err);
                    res.send(response);
                    res.end();
                });
            } else {
                res.send('find:1');
                res.end();
            }
        });
    } else {
        collection.insertOne(user, function (err, response) {
            if (err) return console.log(err);
            res.send(response);
            res.end();
        });
    }
});

router.post("/update", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { UserID } = req.body;
    const collection = req.app.locals.collection;
    const user = db.User(req.body);
    collection.updateOne({_id: ObjectId(UserID)}, {$set: user}, function (err, result) {
        if (err) return console.log(err);
        if (result) {
            res.send(result);
        } else {
            console.log(err);
            res.send(err);
        }
    })
});

router.get("/getUserData", function (req, res) {
    let cookies = req.headers;
    const collection = req.app.locals.collection;
    collection.findOne(ObjectId(cookies.token),function (err, result) {
        const {UserName, Email, _id, PublicAuth, Phone, UsersParameters, Permission, UserStore} = result;
        const data = {
            UserID: _id,
            UserName,
            Email,
            PublicAuth,
            Phone,
            UsersParameters,
            Permission,
            UserStore,
        };
        if (res) {
            res.send(data);
            res.end();
        } else {
            res.sendStatus(401);
            res.end();
        }
    });
});
