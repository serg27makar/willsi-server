const pp = require("../modules/productsParameters");
const util = require("../modules/utilities");
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

module.exports.Parameter = function(body) {
    const {ProductId, color, size, SizeStandard, VendorCode, Price} = body;
    let parameter = {};
    if (ProductId) parameter = {...parameter, ProductId};
    if (color) parameter = {...parameter, color};
    if (size) parameter = {...parameter, size};
    if (SizeStandard) parameter = {...parameter, SizeStandard};
    if (VendorCode) parameter = {...parameter, VendorCode};
    if (Price) parameter = {...parameter, Price};
    return parameter;
};

module.exports.Product = function(body) {
    const {topCatalog, subCatalog, ProductStoreID, Manufacturer,
        ProdName, ProductCode, Photo1, Photo2, Photo3, LinkToProduct,
        Description, Composition, ModelParameters, CareInstructions,
        PaymentAndDelivery, storeAdmin, primaryAdmin} = body;
    let product = {};
    if (topCatalog) product = {...product, topCatalog};
    if (subCatalog) product = {...product, subCatalog};
    if (ProductStoreID) product = {...product, ProductStoreID};
    if (Manufacturer) product = {...product, Manufacturer};
    if (ProdName) product = {...product, ProdName};
    if (ProductCode) product = {...product, ProductCode};
    if (Photo1) product = {...product, Photo1};
    if (Photo2) product = {...product, Photo2};
    if (Photo3) product = {...product, Photo3};
    if (LinkToProduct) product = {...product, LinkToProduct};
    if (Description) product = {...product, Description};
    if (Composition) product = {...product, Composition};
    if (ModelParameters) product = {...product, ModelParameters};
    if (CareInstructions) product = {...product, CareInstructions};
    if (PaymentAndDelivery) product = {...product, PaymentAndDelivery};
    product = {...product, primaryAdmin, storeAdmin};
    return product;
};

module.exports.getParametersToId = async function (collection, ProductId) {
    collection.find().toArray(function (err, result) {
       return result;
    });
};

module.exports.getProductDataToParams = function (collection, product, country, searchParams, searchItemParams, searchItemNew, searchItemColor, searchItemPrice, parameters, fatBack) {
    product = pp.DefaultSubCatalogs(product);
    product = {
        ...product,
        primaryAdmin: false,
        storeAdmin: false,
        country
    };
    if (!util.isEmptyObject(searchItemParams) && searchItemParams.itemValue.length) {
        product = {
            ...product,
            [searchItemParams.catalogName]: {$in : searchItemParams.itemValue},
        };
    }
    if (searchItemNew) {
        product = {...product, "registrationDate": {$gte : searchItemNew}};
    }
    const returnDataObj = [];
    collection.find(product).toArray(function (err, res) {
        if (res.length > 0) {
            function foo(obj, item, index) {
                if (item) {
                    const Parameters = item;
                    obj = {...obj, Parameters};
                    returnDataObj.push(obj)
                }
                if (res.length === index +1) {
                    setTimeout(() => {
                        return fatBack(returnDataObj);
                    }, 50);
                }
            }
            res.map((obj, index) => {
                pp.getParametersToSearchParams(parameters, obj._id, searchParams, searchItemColor, searchItemPrice, (result) => {
                    if (result) {
                        let compatibility = 0;
                        let secondCompatibility = 0;
                        let i = 0;
                        let quadCompatibility = 0;
                        for (const key in result.size) {
                            const gte = searchParams.size["size." + key]['$gte'];
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
                    foo(obj, result, index);
                });
            });
        } else {
            return fatBack(returnDataObj);
        }
    });
};

module.exports.getAllProductDataToParams = function (collection, parameters, product, country, searchParams, searchItemParams, searchItemNew, searchItemColor, searchItemPrice, fatBack) {
    product = {
        ...product,
        primaryAdmin: false,
        storeAdmin: false,
        country,
        topCatalog: product.topCatalog,
        subCatalog: {$nin : ["subCatalogListMenGeneral",
                "subCatalogListWomenGeneral", "subCatalogListBoyGeneral",
                "subCatalogListGirlGeneral", "subCatalogListDogGeneral"]}
    };
    if (!util.isEmptyObject(searchItemParams) && searchItemParams.itemValue.length) {
        product = {
            ...product,
            [searchItemParams.catalogName]: {$in : searchItemParams.itemValue},
        };
    }
    if (searchItemNew) {
        product = {...product, "registrationDate": {$gte : searchItemNew}};
    }
    const returnDataObj = [];
    collection.find(product).toArray(function (err, res) {
        if (res.length > 0) {
            function foo(obj, item, index) {
                if (item) {
                    const Parameters = item;
                    obj = {...obj, Parameters};
                    returnDataObj.push(obj)
                }
                if (res.length === index +1) {
                    setTimeout(() => {
                        return fatBack(returnDataObj);
                    }, 50);
                }
            }
            res.map((obj, index) => {
                pp.getParametersToAll(parameters, obj._id, obj.subCatalog, searchParams, searchItemColor, searchItemPrice, (result) => {
                    foo(obj, result, index);
                });
            });
        } else {
            return fatBack(returnDataObj);
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
                if (item) {
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
