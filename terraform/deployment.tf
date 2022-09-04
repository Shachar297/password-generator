resource "kubernetes_deployment" "nginx" {
  metadata {
    name = "scalable-${var.nginx}"
    labels = {
      App = "${var.nginx}"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        App = "${var.nginx}"
      }
    }

    template {
      metadata {
        labels = {
          App = "${var.nginx}"
        }
      }
      spec {
        container {
          image = "${var.nginx}:${var.nginx_tag}"
          name  = var.nginx

          port {
            container_port = 80
          }

          resources {
            limits = {
              cpu    = "0.5"
              memory = "512Mi"
            }
          }
        }
      }
    }
  }
}
