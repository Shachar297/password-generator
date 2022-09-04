variable "repo_owner" {
    type = string
    default = "shacharovadia"
}

variable "image_name" {
    type = string
    default = "generator"
}

variable "kube_config_location" {
    type = string
    default = "~/.kube/config"
}

variable "nginx" {
    type = string
    default = "nginx"
}

variable "nginx_tag" {
    type = string
    default = "latest"
  
}