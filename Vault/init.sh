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

sleep 30

kubectl -n vault exec -it vault-0 -- vault operator init

kubectl -n vault exec -it vault-0 -- sh

# vault operator unseal
# !!!!! Do this 5 times on each unseal key :

# Unseal Key 1: OoSKttWnlU/F68tEPbj9Gm0+1CQg6mRCbZRCO8hy1raL
# Unseal Key 2: uWOaYcIDGgleBk5Wkmmk6sYi/0PkJ2TkNxJT8LTh+gih
# Unseal Key 3: mPNao3syWabGUtX31DPK9zC6v7oSZcsh5aXy383m2Qse
# Unseal Key 4: 7PgprL9F7zdjr7uAQI1izarpUnez3MK5dCHTA4RTdLJl
# Unseal Key 5: RV/XjDOVU4snOg9RJZqmWqyj5l5eUBYzHxm512ir7Md7

# Initial Root Token: hvs.UmgkpIIhHudj5ffnbr2Qsz2Y



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


vault policy write $policiyUploader /home/vault/app-policy.hcl

vault secrets enable -path=secret/ kv

vault kv put secret/$policitUploader = access-token="123"

vault kv list secret/$policitUploader

Vault kv get -version=1 secret/$policitUploader