const
    utils = require('./utils'),
    kubernetesHandler = require("./kubernetesHandler");

let
    isInit = true;


async function initGenerator(req, res,next) {
    try {
        res.json(utils.handleOptions());
        isInit = false;
    } catch (error) {
        
    }
}

async function executeGenerator(req, res, next) {

    try {

        res.json(await handleRequest(req));

    } catch (error) {
        return next(error);
    }

}

async function handleVaultOptions(req,res,next) {
    try {
        res.json(await utils.handleVaultOptions());
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

async function handleVaultOperations(req, res, next) {

    let 
        secretUploader = req.body,
        password
    try {
        const vaultOperationResponse = await kubernetesHandler.handleVaultOperations(req.body)
        res.send({
            status: "success",
            statusCode: 200,
            message: `Your secret has been Stored at secret/t3.`,
            vaultCommand: `vault kv get -version=1 secret/t3`,
            fullCommandExecuted: "kubectl exec -n vault vault-0 -- vault kv get -version=1 secret/t3"
        });
    } catch (error) {
        return next(error)
    }
}


module.exports = {
    executeGenerator,
    initGenerator,
    handleVaultOptions,
    handleVaultOperations
}