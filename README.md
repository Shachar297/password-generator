# Password Generator - stored in local Vault.

#### What will be created :

1. Docker Container
###### 1.1. Nodejs backend
###### 1.2. Javascript Client

2. Minikube Cluster.

###### 1.1. Nodejs backend
###### 1.2. Javascript Client
###### 1.3. Hashicorp Vault.


### Prerequisites:

1. Docker Installed.
2. Minikube Installed.
3. Helm Installed.

## Workflow :

1. Vault pod will be created by default on namespace "vault". Using helm chart.
2. Nodejs backend will be created by default on namespace "generator"
3. Nodejs will create a javascript client.
4. Generate Random password, with possability of saving the generated password in a local vault.

## Important :

1. [Makefile](./Makefile)

Functions: 

1. build_node : build the docker container.

2. deploy_node : deploy Nodejs to kubernetes cluster.

3. start_cluster: start minikube cluster

4. init_vault: initializing vault pods.


## Vault: 

When Creating vault, you will need to configure the auth methods to the vault engine.

After running [Vault/init.sh](./Vault/init.sh), you'll need to set auth tokens.

Example output from Vault initialization :

```
# Unseal Key 1: D59+l9Ci1wpyZpk09aJBaNc/Zoo1kBLEOklRlgd0YEx5
# Unseal Key 2: xmzL6V6jmlDw8uEODBzqTODB87uAz3XtNJVY1NN39v60
# Unseal Key 3: OjZK6/ZHVHjXZCAZgj9YDWx5RMU10JgjPtzotmhRrcw8
# Unseal Key 4: krsimM9/v2bL+JRC1nKfLPrFXJ6lqAAqh4Vn1boOW8pi
# Unseal Key 5: TWD9UKxjhGDl1cUmxzQ/RhZWe6CUw5tqinRUJcUtvRlM

# Initial Root Token: hvs.JozkTIsMYOMHgJtpsoivapt2
```

Usage : 

```sh
# Do this 5 times, one for each key
vault operator unseal
```

After authenticating with 5 Unseal Keys, use

```sh
vault login # use here the Initial Root Token
vault auth enable kubernetes
vault write auth/kubernetes/config \

token_reviewer_jwt="$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
    kubernetes_host=https://${KUBERNETES_PORT_443_TCP_ADDR}:443 \
    kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
    issuer="https://kubernetes.default.svc.cluster.local"


vault write auth/kubernetes/role/shahar-role \
    bound_service_account_names=shahar \
    bound_service_account_namespaces=* \
    policies=usaa-policy \
    ttl=2400h

    # create a policy for the role
cat < /home/vault/app-policy.hcl
path "secret/*" {
capabilities = ["read"]
}
EOF


vault policy write X /home/vault/app-policy.hcl

vault secrets enable -path=secret/ kv

vault kv put secret/shahar = username="shachar"
```
