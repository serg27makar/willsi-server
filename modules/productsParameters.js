const express = require('express');
const router = express.Router();
module.exports = router ;

module.exports.getParametersToSearchParams = function ( parameters, ProductId, searchParams, fetBack) {
    let SearchParams = searchParams.size;
    SearchParams = {...SearchParams, ProductId: String(ProductId)};
    parameters.find(SearchParams).toArray(function (err, result) {
        return fetBack(result);
    });
};