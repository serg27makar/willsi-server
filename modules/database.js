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
