resource "digitalocean_project" "playground" {
  name        = "first-project"
  resources = [digitalocean_droplet.parser.urn,digitalocean_reserved_ip.parser_ip.urn]
}