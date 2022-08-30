const crypto = require('crypto');

const generatorOptions = [
    { element: "input", html: "Generate Random Password", type: "button" },
    { element: "input", html: "Password Length", type: "number" }
],
    vaultOptions = [
        { element: "select"},
        { element: "option", option: "Hashicorp Vault" },
        { element: "option", option: "Azure Key Vault" },
        { element: "input", html: "Vault Base Url", type: "text" },
        { element: "input", html: "Vault Port (Optional for cloud users)", type: "text" },
        { element: "input", html: "Secret Path", type: "text" },
        { element: "input", html: "Integrate Vault", type: "button" }
    ];

function handleOptions() {
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

    return { randomPassword: config() };
}

function handleVaultOptions() {
    return vaultOptions
}

module.exports = {
    handleOptions,
    handleUserOptionSelection,
    generateRandomPassword,
    handleVaultOptions,
    generatorOptions
}