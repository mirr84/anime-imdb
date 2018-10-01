
module.exports.menuOffAuth = { login: true, reg: true, profile: false, list: true, my_list: false, chatRoom: false, top100: true };
module.exports.menuOnAuth = { login: false, reg: false, profile: true, list: true, my_list: true, chatRoom: true, top100: true };

module.exports.genMsg = (text = 'что то пошло не так', type = 'warn') => ([{type, text}]);

module.exports.genToken = (n=100) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < n; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}