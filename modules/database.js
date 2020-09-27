const pp = require("../modules/productsParameters");
const express = require('express');
const router = express.Router();
module.exports = router ;
const ObjectId = require("mongodb").ObjectId;

module.exports.User = function(body) {
    const { UserName, Email, UsersParameters, Permission, Password, UserStore, Postpone } = body;
    let user = {};
    if (UsersParameters) user = {...user, UsersParameters};
    if (Email) user = {...user, Email};
    if (UserName) user = {...user, UserName};
    if (Password) user = {...user, Password};
    if (Permission) user = {...user, Permission};
    if (UserStore) user = {...user, UserStore};
    if (Postpone) user = {...user, Postpone};
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
        const {growth, shoulder, chest, waist, hips, thighGirth,
            palmGirth, headCircumference, armGirth, fingerLength,
            waistAtNavelLevel, insideLegLength, footLength, wideFootGirth,
            footCircumference, neckGirth, frontPawsLength, chestGirth, growthDog,
            waistDog, hindFeetLength, legLength, legWidth, legCircumference} = body.SearchParams;

        if (body.topCatalog === "catalogListDog") {

            if (neckGirth) size = {...size, "size.neckGirth": {$gte : Number(neckGirth)}};
            if (frontPawsLength) size = {...size, "size.frontPawsLength": {$gte : Number(frontPawsLength)}};
            if (chestGirth) size = {...size, "size.chestGirth": {$gte : Number(chestGirth)}};
            if (growthDog) size = {...size, "size.growthDog": {$gte : Number(growthDog)}};
            if (waistDog) size = {...size, "size.waistDog": {$gte : Number(waistDog)}};
            if (hindFeetLength) size = {...size, "size.hindFeetLength": {$gte : Number(hindFeetLength)}};
            if (legLength) size = {...size, "size.legLength": {$gte : Number(legLength)}};
            if (legWidth) size = {...size, "size.legWidth": {$gte : Number(legWidth)}};
            if (legCircumference) size = {...size, "size.legCircumference": {$gte : Number(legCircumference)}};

        } else {

            if (body.subCatalog === ("subCatalogListMenTshirts" || "subCatalogListWomenTshirts" || "subCatalogListBoyTshirts" || "subCatalogListGirlTshirts")) {
                if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
                if (shoulder) size = {...size, "size.shoulder": {$gte : Number(shoulder)}};
                if (chest) size = {...size, "size.chest": {$gte : Number(chest)}};
                if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
                if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
            } else if (body.subCatalog === ("subCatalogListMenShirts" || "subCatalogListWomenShirts" || "subCatalogListBoyShirts" || "subCatalogListGirlShirts")) {
                if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
                if (shoulder) size = {...size, "size.shoulder": {$gte : Number(shoulder)}};
                if (chest) size = {...size, "size.chest": {$gte : Number(chest)}};
                if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
                if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
                if (armGirth) size = {...size, "size.armGirth": {$gte : Number(armGirth)}};
            } else if (body.subCatalog === ("subCatalogListMenPants" || "subCatalogListWomenPants" || "subCatalogListBoyPants" || "subCatalogListGirlPants")) {
                if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
                if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
                if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
                if (thighGirth) size = {...size, "size.thighGirth": {$gte : Number(thighGirth)}};
            } else if (body.subCatalog === ("subCatalogListMenUnderwear" || "subCatalogListWomenUnderwear" || "subCatalogListBoyUnderwear" || "subCatalogListGirlUnderwear")) {
                if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
                if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
                if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
                if (thighGirth) size = {...size, "size.thighGirth": {$gte : Number(thighGirth)}};
            } else if (body.subCatalog === ("subCatalogListMenOuterwear" || "subCatalogListWomenOuterwear" || "subCatalogListBoyOuterwear" || "subCatalogListGirlOuterwear")) {
                if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
                if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
                if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
                if (thighGirth) size = {...size, "size.thighGirth": {$gte : Number(thighGirth)}};
            } else if (body.subCatalog === ("subCatalogListMenHome" || "subCatalogListWomenHome" || "subCatalogListBoyHome" || "subCatalogListGirlHome")) {
                if (palmGirth) size = {...size, "size.palmGirth": {$gte : Number(palmGirth)}};
                if (headCircumference) size = {...size, "size.headCircumference": {$gte : Number(headCircumference)}};
                if (fingerLength) size = {...size, "size.fingerLength": {$gte : Number(fingerLength)}};
                if (waistAtNavelLevel) size = {...size, "size.waistAtNavelLevel": {$gte : Number(waistAtNavelLevel)}};
            } else {
                size = {...size, "size.general": "general"}
            }
        }
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
        if (item && length) {
            fullProduct.push(item);
            if (length === index + 1) {
                return fatBack(fullProduct);
            }
        } else {
            if (length === index + 1) {
                return fatBack(null);
            }
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
                    } else {
                        returnData(null, res.length, index);
                    }
                }
                pp.getParametersToSearchParams(parameters, obj._id, searchParams, (result) => {
                    if (result.length > 0) {
                        let compatibility = 0;
                        let i = 0;
                        for (const key in result[0].size) {
                            const gte = searchParams.size["size." + key]['$gte'];
                            const ose = result[0].size[key];
                            compatibility = gte / ose + compatibility;
                            i++
                        }
                        compatibility = compatibility / i * 100;
                        result[0] = {
                            ...result[0],
                            compatibility: compatibility.toFixed(0),
                        };
                    }
                    foo(result);
                });
            });
        } else {
            return fatBack(fullProduct);
        }
    });
};

module.exports.getPostpone = function (collection, parameters, product, parameter, compatibility, fatBack) {
    const fullProduct = [];
    function returnData(item) {
        item = {
            ...item,
            postpone: true,
            compatibility,
        };
        fullProduct.push(item);
        return fatBack(fullProduct);
    }
    collection.findOne({_id: ObjectId(product)}, function (err, result) {
        if (result) {
            function foo(item) {
                if (item && item.length > 0) {
                    const Parameters = item;
                    result = {...result, Parameters};
                    returnData(result);
                }
            }
            pp.getParametersToId(parameters, parameter, (resultParameter) => {
                foo(resultParameter);
            });
        } else {
            return fatBack(fullProduct);
        }
    });
};
