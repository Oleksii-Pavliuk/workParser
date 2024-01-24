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
      "${file(var.bot_docker_run_script)}",
      "${file(var.userbot_docker_run_script)}"
    ]
  }
}