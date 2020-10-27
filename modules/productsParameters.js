const express = require('express');
const router = express.Router();
const util = require("../modules/utilities");
module.exports = router ;
const ObjectId = require("mongodb").ObjectId;

module.exports.getParametersToSearchParams = function ( parameters, ProductId, searchParams, searchItemColor, fetBack) {
    let SearchParams = searchParams.size;
    SearchParams = {...SearchParams, ProductId: String(ProductId)};
    if (!util.isEmptyObject(searchItemColor) && searchItemColor.itemValue.length) {
        SearchParams = {
            ...SearchParams,
            [searchItemColor.catalogName]: {$in: searchItemColor.itemValue},
        };
    }
    parameters.findOne(SearchParams, function (err, result) {
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