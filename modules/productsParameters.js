const express = require('express');
const router = express.Router();
const util = require("./utilities");
module.exports = router ;
const ObjectId = require("mongodb").ObjectId;

module.exports.getParametersToSearchParams = function ( parameters, ProductId, searchParams, searchItemColor, searchItemPrice, fetBack) {
    let SearchParams = searchParams.size;
    SearchParams = {...SearchParams, ProductId: String(ProductId)};
    if (!util.isEmptyObject(searchItemColor) && searchItemColor.itemValue.length) {
        SearchParams = {
            ...SearchParams,
            [searchItemColor.catalogName]: {$in: searchItemColor.itemValue},
        };
    }
    if (!util.isEmptyObject(searchItemPrice)) {
        SearchParams = {
            ...SearchParams,
            "Price": {$gte: searchItemPrice.priceFrom, $lte: searchItemPrice.priceTo},
        };
    }

    parameters.findOne(SearchParams, function (err, result) {
        return fetBack(result);
    });
};

module.exports.getParametersToAll = function ( parameters, ProductId, subCatalog, body, searchItemColor, searchItemPrice, fetBack) {
    body = {
        ...body,
        subCatalog,
    };
    const params = util.SearchParams(body);
    let SearchParams = params.size;
    SearchParams = {...SearchParams, ProductId: String(ProductId)};
    if (!util.isEmptyObject(searchItemColor) && searchItemColor.itemValue.length) {
        SearchParams = {
            ...SearchParams,
            [searchItemColor.catalogName]: {$in: searchItemColor.itemValue},
        };
    }
    if (!util.isEmptyObject(searchItemPrice)) {
        SearchParams = {
            ...SearchParams,
            "Price": {$gte: searchItemPrice.priceFrom, $lte: searchItemPrice.priceTo},
        };
    }
    parameters.findOne(SearchParams, function (err, result) {
        let noSize = false;
        if (result) {
            for (const key in result.size) {
                if (!body.SearchParams[key] && !noSize) {
                    noSize = true;
                }
            }
            if (!noSize) {
                let compatibility = 0;
                let secondCompatibility = 0;
                let i = 0;
                let quadCompatibility = 0;
                for (const key in result.size) {
                    const gte = params.size["size." + key]['$gte'];
                    const ose = result.size[key];
                    compatibility = gte / ose + compatibility;
                    quadCompatibility = (gte * gte) / (ose * ose) + quadCompatibility;
                    i++
                }
                compatibility = compatibility / i * 100;
                secondCompatibility = Math.sqrt(quadCompatibility / i) * 100;
                result = {
                    ...result,
                    compatibility: compatibility.toFixed(2),
                    secondCompatibility: secondCompatibility.toFixed(2),
                };
            }
        }
        if (noSize) {
            return fetBack(null);
        }
        return fetBack(result);
    });
};


module.exports.getParametersToId = function ( parameters, parameter, fetBack) {
    parameters.findOne({_id: ObjectId(parameter)}, function (err, result) {
        return fetBack(result);
    });
};

module.exports.DefaultSubCatalogs = function (catalog) {
    if (catalog.subCatalog || catalog.topCatalog === "catalogListDog") return catalog;
    let subCatalog = "";
    switch (catalog.topCatalog) {
        case "catalogListMen":
            subCatalog = "subCatalogListMenGeneral";
            break;
        case "catalogListWomen":
            subCatalog = "subCatalogListWomenGeneral";
            break;
        case "catalogListBoy":
            subCatalog = "subCatalogListBoyGeneral";
            break;
        case "catalogListGirl":
            subCatalog = "subCatalogListGirlGeneral";
            break;
    }
    catalog = {
        ...catalog,
        subCatalog
    };
    return catalog;
};