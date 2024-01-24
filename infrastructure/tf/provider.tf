terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

variable "bot_docker_run_script" {
  default = "../docker-run.sh"
}

variable "userbot_docker_run_script" {
  default = "../userbot-docker-run.sh"
}

provider "digitalocean" {
  token = var.do_token
}

data "digitalocean_ssh_key" "terraform" {
  name = "key"
}
