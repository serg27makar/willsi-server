const http =require('http');
const cors = require('cors');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
const ObjectId = require("mongodb").ObjectId;
const server = http.createServer(app);

let dbClient;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((request,response,next)=>{
    if (['/users/register',
        '/users/login'].includes(request.path)) {
        next();
        return
    }
    const collection = request.app.locals.collection;
    let cookies = request.headers;
    if(!cookies.token){
        response.sendStatus(401);
        response.end();
        return
    }
    collection.findOne(ObjectId(cookies.token),function (err,res) {
        if (res) {
            response.send(res);
            next()
        }else {
            response.sendStatus(401);
            response.end();
        }
    });
});

mongoClient.connect(function(err, client){
    if (err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("usersDb").collection("usersDb");
    server.listen(3001, function(){
        console.log("Сервер ожидает подключения...");
    });
});

const route_names = [
    'users'
];

route_names.forEach(route_name => {
    let router = require(`./routes/${route_name}`);
    app.use(`/${route_name}`, router);
});

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});