const express = require('express');
const router = express.Router();
module.exports = router ;

router.post('/login', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    const { email, password } = req.body;
    const user = {Password: password, Email: email};
    const collection = req.app.locals.collection;
    collection.findOne(user, function (err, result) {
        if(err) return console.log(err);
        if(!result){
            res.send('find:0');
            res.end();
        }else{
            res.send(result);
            res.end();
        }
    });
});

router.post("/register", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { email, password, name } = req.body;
    const user = {UserName: name, Password: password, Email: email};
    const collection = req.app.locals.collection;
    collection.findOne({UserName: name}, function (err, result) {
        if(err) return console.log(err);
        if(!result){
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
});
