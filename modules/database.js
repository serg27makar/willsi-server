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
    const {topCatalog, subCatalog} = body;
    let product = {};
    if (topCatalog) product = {...product, topCatalog};
    if (subCatalog) product = {...product, subCatalog};
    return product;
};

module.exports.SearchParams = function(body) {
    let product = {};
    let size = {};
    if (body.SearchParams) {
        const {growth, shoulders, chest, waist, hips, leg, climb, head} = body.SearchParams;

        if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
        if (shoulders) size = {...size, "size.shoulders": {$gte : Number(shoulders)}};
        if (chest) size = {...size, "size.chest": {$gte : Number(chest)}};
        if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
        if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
        if (leg) size = {...size, "size.leg": {$gte : Number(leg)}};
        if (climb) size = {...size, "size.climb": {$gte : Number(climb)}};
        if (head) size = {...size, "size.head": {$gte : Number(head)}};
    }
    if (size) product = {...product, size};
    return product;
};

module.exports.getParametersToId = async function (collection, ProductId) {
    collection.find().toArray(function (err, result) {
       return result;
    });
};

module.exports.getProductDataToParams = function (collection, product, searchParams, parameters, skip, fatBack) {
    const fullProduct = [];
    function returnData(item, length, index) {
        fullProduct.push(item);
        if(length === index + 1) {
            return fatBack(fullProduct);
        }
    }
    collection.find(product).skip(skip || 0).limit(12).toArray(function (err, res) {
        if (res.length > 0) {
            res.map((obj, index) => {
                function foo(item) {
                    if (item && item.length > 0) {
                        const Parameters = item;
                        obj = {...obj, Parameters};
                        returnData(obj, res.length, index);
                    }
                }
                pp.getParametersToSearchParams(parameters, obj._id, searchParams, (result) => {
                    foo(result);
                });
            });
        } else {
            return fatBack(fullProduct);
        }

    });
};