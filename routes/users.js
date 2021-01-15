const db = require("../modules/database");
const util = require("../modules/utilities");
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
            const {UserName, Email, _id, PublicAuth, Phone, UsersParameters, Permission, UserStore, Postpone} = result;
            const data = {
                UserID: _id,
                UserName,
                Email,
                PublicAuth,
                Phone,
                UsersParameters,
                Permission,
                UserStore,
                Postpone,
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

router.post("/checkEmail", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const collection = req.app.locals.collection;
    const email = req.body;
    collection.find(email).toArray(function (err, result) {
        if (err) return console.log(err);
        if (result) {
            const output = { result: result.length === 0}
            res.send(output);
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
        const {UserName, Email, _id, PublicAuth, Phone, UsersParameters, Permission, UserStore, Postpone} = result;
        const data = {
            UserID: _id,
            UserName,
            Email,
            PublicAuth,
            Phone,
            UsersParameters,
            Permission,
            UserStore,
            Postpone,
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

router.post("/postSendEmail", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    util.sendEmailToWillsi(req.body);
    res.send("result");
});

router.post("/getAllUsers", function (req, res) {
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function (err, result) {
        if (res) {
            let size = 0;
            for (const key in result) {
                if (result.hasOwnProperty(key)) size++;
            }
            const count = {
                size
            };
            res.send(count);
            res.end();
        } else {
            res.sendStatus(401);
            res.end();
        }
    });
});

router.post("/getAllUsersData", function (req, res) {
    const collection = req.app.locals.collection;
    const { Permission } = req.body;
    let filter = {}
    if (Permission) {
        filter = {
            Permission
        }
    }
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

router.post("/clearAllDB", function (req, res) {
    const productsDb = req.app.locals.productsDb;
    const parametersDb = req.app.locals.parametersDb;
    productsDb.remove({}, function (err, result) {
        parametersDb.remove({}, function (err, result) {
            if (res) {
                res.send(result);
                res.end();
            } else {
                res.sendStatus(401);
                res.end();
            }
        });
    });
});
