const express = require('express');
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
module.exports = router ;

router.post('/login', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    const { email, password } = req.body;
    const user = {Password: password, Email: email};
    const collection = req.app.locals.collection;
    collection.findOne(user, function (err, result) {
        if (err) return console.log(err);
        if (!result) {
            res.send('find:0');
            res.end();
        } else {
            const {UserName, Email, _id, PublicAuth, Phone, UsersParameters} = result;
            const data = {
                UserID: _id,
                UserName: UserName,
                Email: Email,
                PublicAuth: PublicAuth,
                Phone: Phone,
                UsersParameters: UsersParameters
            };
            res.send(data);
            res.end();
        }
    });
});

router.post("/register", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { email, password, name, usersParameters } = req.body;
    const user = {UserName: name, Password: password, Email: email, UsersParameters: usersParameters};
    const collection = req.app.locals.collection;
    if (email !== "") {
        collection.findOne({Email: email}, function (err, result) {
            if (err) return console.log(err);
            if (!result) {
                collection.insertOne(user, function (err, response) {
                    if (err) return console.log(err);
                    res.send(response);
                    res.end()

                });
            } else {
                res.send('find:1');
                res.end()

            }
        });
    } else {
        collection.insertOne(user, function (err, response) {
            if (err) return console.log(err);
            res.send(response);
            res.end()

        });
    }

});

router.post("/update", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { UserName, Email, UsersParameters, UserID } = req.body;
    const collection = req.app.locals.collection;
    collection.updateOne({_id: ObjectId(UserID)}, {$set: {UserName: UserName, Email: Email, UsersParameters: UsersParameters}}, function (err, result) {
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
        const {UserName, Email, _id, PublicAuth, Phone, UsersParameters} = result;
        const data = {
            UserID: _id,
            UserName: UserName,
            Email: Email,
            PublicAuth: PublicAuth,
            Phone: Phone,
            UsersParameters: UsersParameters
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
