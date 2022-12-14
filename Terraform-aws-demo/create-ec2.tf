resource "aws_insrance" "aws-linux-terraform" {
    ami = "ami-xxx"
    instance_type = "t2.micro"
    count = 1
    key_name = "terraform"
    security_groups = ["launch-wizard-4", "launch-wizard-6"]
    tags = {
        "name" = "terraform_instance"
    }

}

# run => terraform plan