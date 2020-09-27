const express = require('express');
const router = express.Router();
module.exports = router ;
const ObjectId = require("mongodb").ObjectId;

module.exports.getParametersToSearchParams = function ( parameters, ProductId, searchParams, fetBack) {
    let SearchParams = searchParams.size;
    SearchParams = {...SearchParams, ProductId: String(ProductId)};
    parameters.find(SearchParams).toArray(function (err, result) {
        return fetBack(result);
    });
};

module.exports.getParametersToId = function ( parameters, parameter, fetBack) {
    parameters.find({_id: ObjectId(parameter)}).toArray(function (err, result) {
        return fetBack(result);
    });
};
