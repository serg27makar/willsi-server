const express = require('express');
const router = express.Router();
module.exports = router ;

module.exports.getParametersToId = function ( parameters, ProductId, fetBack) {
    parameters.find({ProductId: String(ProductId)}).toArray(function (err, result) {
        return fetBack(result);
    });
};