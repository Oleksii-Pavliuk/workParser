resource "digitalocean_reserved_ip" "parser_ip" {
  region = "fra1"
}


resource "digitalocean_droplet" "parser" {
  image = "ubuntu-20-04-x64"
  name = "parser"
  region = "fra1"
  size = "s-1vcpu-1gb-amd"
  ssh_keys = [
    data.digitalocean_ssh_key.terraform.id
  ]
  connection {
    host = self.ipv4_address
    user = "root"
    type = "ssh"
    private_key = file(var.pvt_key)
    timeout = "2m"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt -y update",
      "sudo apt -y install curl",
      "curl -fsSL https://get.docker.com -o get-docker.sh",
      "sudo sh get-docker.sh",

      "touch docker-compose.yaml",
      "echo '${file(var.docker_compose_file)}' > docker-compose.yaml",

      "mkdir consul",
      "touch consul/client.json",
      "echo '${file(var.consul_client_config)}' > consul/client.json",
      "touch consul/server.json",
      "echo '${file(var.consul_server_config)}' > consul/server.json",

      "${file(var.docker_compose_script)}"
    ]
  }
}



resource "digitalocean_reserved_ip_assignment" "parser_ip" {
  ip_address = digitalocean_reserved_ip.parser_ip.ip_address
  droplet_id = digitalocean_droplet.parser.id
}

