const pp = require("../modules/productsParameters");
const express = require('express');
const router = express.Router();
module.exports = router ;

module.exports.User = function(body) {
    const { UserName, Email, UsersParameters, Permission, Password, UserStore } = body;
    let user = {};
    if (UsersParameters) user = {...user, UsersParameters};
    if (Email) user = {...user, Email};
    if (UserName) user = {...user, UserName};
    if (Password) user = {...user, Password};
    if (Permission) user = {...user, Permission};
    if (UserStore) user = {...user, UserStore};
    return user;
};

module.exports.Store = function(body) {
    const {adminID, nameStore, urlStore, textStore, phoneStore, secondUrlStore, addressStore, StoreID} = body;
    let store = {};
    if (adminID) store = {...store, adminID};
    if (nameStore) store = {...store, nameStore};
    if (urlStore) store = {...store, urlStore};
    if (textStore) store = {...store, textStore};
    if (phoneStore) store = {...store, phoneStore};
    if (secondUrlStore) store = {...store, secondUrlStore};
    if (addressStore) store = {...store, addressStore};
    if (StoreID) store = {...store, StoreID};
    return store;
};

module.exports.Product = function(body) {
    const {topCatalog, subCatalog, size, parameters} = body;
    let product = {};
    if (parameters) product = {...product, parameters};
    if (topCatalog) product = {...product, topCatalog};
    if (subCatalog) product = {...product, subCatalog};
    return product;
};

module.exports.getParametersToId = async function (collection, ProductId) {
    collection.find().toArray(function (err, result) {
       return result;
    });
};

module.exports.getProductDataToParams = async function (collection, product, parameters, skip, fatBack) {
    const fullProduct = [];
    function returnData(item, length, index) {
        fullProduct.push(item);
        if(length === index + 1) {
            return fatBack(fullProduct);
        }
    }
    collection.find(product).skip(skip || 0).limit(12).toArray(function (err, res) {
        res.map((obj, index) => {
            function foo(item) {
                const Parameters = item;
                obj = {...obj, Parameters};
                returnData(obj, res.length, index);
            }
            pp.getParametersToId(parameters, obj._id, (result) => {
                foo(result);
            });
        });

    });
};