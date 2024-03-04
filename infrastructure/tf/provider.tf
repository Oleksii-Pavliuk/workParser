terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

variable "docker_compose_file" {
  default = "../docker-compose.yaml"
}

variable "docker_compose_script" {
  default = "../compose-run.sh"
}

variable "consul_client_config" {
  default = "../consul/client.json"
}

variable "consul_server_config" {
  default = "../consul/server.json"
}

output "reserved_ip_address" {
  value = digitalocean_reserved_ip_assignment.parser_ip.ip_address
}

provider "digitalocean" {
  token = var.do_token
}

data "digitalocean_ssh_key" "terraform" {
  name = "key"
}
