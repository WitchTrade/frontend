job "witchtrade-fe" {
  datacenters = ["dc1"]
  type        = "service"

  group "witchtrade" {
    count = 1

    network {
       port "http" {
         to = 3000
         host_network = "public"
       }
    }

    service {
      name = "witchtrade-fe"
      port = "http"
      provider = "nomad"

      tags = [
        "traefik.enable=true",
        "traefik.http.routers.wtfe.rule=Host(`witchtrade.org`)",
        "traefik.http.routers.wtfe.tls.certresolver=letsencrypt"
      ]
    }

    task "server" {
      driver = "docker"

      resources {
        cpu = 500
        memory = 500
      }

      env {
        BASE_API_URL = "https://witchtrade.org"
      }

      config {
        image = "ghcr.io/witchtrade/frontend"
        ports = ["http"]
      }
    }
  }
}