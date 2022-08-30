const
    utils = require('./utils');

let
    isInit = true;

async function executeGenerator(req, res, next) {

    try {
        if (isInit) {
            res.json(utils.handleOptions());
        }
        res.json(await handleRequest(req));

    } catch (error) {
        return next(error);
    }

}

function handleRequest(req) {
    const requestMethod = Object.keys(req.route.methods)[0]
    if (requestMethod == "get") {
        if (req._parsedOriginalUrl.href.toString().indexOf("options") > -1) {
            isInit = false;
        }
    } else if (requestMethod == "post") {
        return handleRoute(req.body.option, req.body.passwordLength)
    }
}

async function handleRoute(option, passwordLength) {

    if(!option || option == "") throw new Error("No Option Found at request!")
    return await utils.handleUserOptionSelection(option, passwordLength)

}



module.exports = {
    executeGenerator
}