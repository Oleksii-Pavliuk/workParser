source .env

terraform destroy \
      -var "do_token=${DO_PAT}" \
      -var "pvt_key=$HOME/.ssh/id_rsa"

terraform apply \
      -var "do_token=${DO_PAT}" \
      -var "pvt_key=$HOME/.ssh/id_rsa" \
      -auto-approve


      terraform output reserved_ip_address
