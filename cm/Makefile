provision:
	ansible-playbook setup.yml -i production -u $(U)

build:
	docker build -t programming-map .
	# ansible-playbook build.yml -i production -u $(U) -vv

deploy:
	ansible-playbook deploy.yml -i production -u $(U) -vv --ask-vault-pass
