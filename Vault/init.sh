# add hashicorp/vault to helm repo
policiyUploader="local"
helm repo add hashicorp https://helm.releases.hashicorp.com

# Install vault.
kubectl create namespace vault

helm install vault hashicorp/vault \
    --namespace vault \
    --set persistence.enabled=false \
    --set service.type=NodePort \
    --set service.nodePort=31000 \
    --set service.externalPort=8200 \
    --set service.externalTrafficPolicy=Local \
    #--set service.loadBalancerIP= 

# initialize vault.

sleep 10

kubectl -n vault exec -it vault-0 -- vault operator init

kubectl -n vault exec -it vault-0 -- sh

# vault operator unseal
# !!!!! Do this 5 times on each unseal key :

# Unseal Key 1: D59+l9Ci1wpyZpk09aJBaNc/Zoo1kBLEOklRlgd0YEx5
# Unseal Key 2: xmzL6V6jmlDw8uEODBzqTODB87uAz3XtNJVY1NN39v60
# Unseal Key 3: OjZK6/ZHVHjXZCAZgj9YDWx5RMU10JgjPtzotmhRrcw8
# Unseal Key 4: krsimM9/v2bL+JRC1nKfLPrFXJ6lqAAqh4Vn1boOW8pi
# Unseal Key 5: TWD9UKxjhGDl1cUmxzQ/RhZWe6CUw5tqinRUJcUtvRlM

# Initial Root Token: hvs.JozkTIsMYOMHgJtpsoivapt2



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


cat < /home/vault/app-policy.hcl
'path "secret/*" {
capabilities = ["read"]
}
EOF'

vi /home/vault/app-policy.hcl

# Insert this text :
# ----- Text starts here 
# path "secret/*" {
# capabilities = ["read"]
# }
# -------- Text ends here


vault policy write local /home/vault/app-policy.hcl

vault secrets enable -path=secret/ kv

vault kv put secret/local = access-token="123"

vault kv list secret/local

vault kv get -version=1 secret/local