const utils = require('./utils');

async function handleVaultOperations(params) {
    const vault = {
        namespace: "vault"
        // podName: await getVaultPods("vault")
    }

    console.log(params)

    let vaultPutCommands = [
            `kubectl exec vault-0 -n ${vault.namespace} -- vault policy write ${params.secretUploader} /home/vault/app-policy.hcl`,
            `kubectl exec vault-0 -n vault -- vault secrets enable -path=secret/ kv`,
            `kubectl exec vault-0 -n ${vault.namespace} -- vault kv put secret/${params.secretUploader} = ${params.keyName}=${params.password.randomPassword}`,
            `kubectl exec -n ${vault.namespace} vault-0 -- vault kv get -version=1 secret/${params.secretUploader}`];

    try {
        return await utils.executeCommands(vaultPutCommands);
    } catch (error) {
        throw new Error(error)
    }
}


async function getVaultPods(namespace) {
    let pod = `kubectl get po -n ${namespace} -o=json | jq '.items[0].metadata.name'`
    try {
        return await utils.executeCommands(pod)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    handleVaultOperations
}