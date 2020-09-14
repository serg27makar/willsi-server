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
