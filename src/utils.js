const crypto  = require('crypto');

const generatorOptions = [
    { element: "input", html: "Generate Random Password", type: "button" },
    { element: "input", html: "Password Length", type: "number" },
    { element: "input", html: "Oauth2 Generator", type: "button" }
];

function handleOptions() {
    console.log(generatorOptions)
    return generatorOptions;
}

function handleUserOptionSelection(option, passwordLength) {


    option = option.toString().toLowerCase();
    let serverResponse;
    switch (option) {
        case "generate random password":
        serverResponse = generateRandomPassword(passwordLength);
        break;

        case "oauth2 generator":

        break;

        case "":

        break;
    }
    return serverResponse;
}

function generateRandomPassword(num) {
    
    const config = (
        length = num,
        wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$') => 
        Array.from(crypto.randomFillSync(new Uint32Array(length))).map(
            (x) => wishlist[x % wishlist.length]).join('')

        return {randomPassword : config()};
}

module.exports = {
    handleOptions,
    handleUserOptionSelection,
    generateRandomPassword,
    generatorOptions
}