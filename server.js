const http =require('http');
const cors = require('cors');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
const server = http.createServer(app);
var path = require('path');
var fs = require('fs');

let dbClient;

const route_names = [
    'users',
    'store',
    'product',
    'parameter'
];

let api = "../willsi-front/build";
let usedPort = 80;

if (isDebugging()) {
    usedPort = 3001;
    api = "";
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((request,response,next)=>{
    if (['/users/register',
        '/users/postSendEmail',
        '/users/getAllUsers',
        '/users/clearAllDB',
        '/users/checkEmail',
        '/users/allCountries',
        '/product/getAllProductsData',
        '/product/getProductsByLink',
        '/product/getProductDataToParams',
        '/parameter/getParametersToIdBySearchParams',
        '/users/login'].includes(request.path)) {
        next();
        return
    }
    let cookies = request.headers;
    if (cookies.token && cookies.token.length === 24) {
        next();
    } else {
        response.sendStatus(500);
        response.end();
    }
});

mongoClient.connect(function(err, client){
    if (err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("willsiDb").collection("usersDb");
    app.locals.products = client.db("willsiDb").collection("productsDb");
    app.locals.store = client.db("willsiDb").collection("storeDb");
    app.locals.parameters = client.db("willsiDb").collection("parametersDb");
    server.listen(usedPort, function(){
        console.log("Server ready...");
    });
});

route_names.forEach(route_name => {
    let router = require(`./routes/${route_name}`);
    app.use(`/${route_name}`, router);
});

app.use (function (request, response) {
    let filePath = '.' + request.url;
    if (filePath === './')
        filePath = './index.html';

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    filePath = path.join(api, filePath);
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
})

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});

function isDebugging() {
    return typeof v8debug === 'object'
        || /--debug|--inspect/.test(process.execArgv.join(' '));
}