# provider "aws" {
#     region = "us-east-1"
#     access_key = ""
#     secret_key = ""
  
# }
# resource "aws_instance" "instance_name" {
#     ami = "ami-xxxx"
#     instance_type = "t2.micro"
# }

output "helloWorld" {
  value = "Hello world by terraform"
}