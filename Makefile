all: install

lock:
	npm shrinkwrap

build:
	docker build -t programming-map .

# generate_assets:
# 	./node_modules/mincer/bin/mincer.js --include app/assets/javascripts \
# 		--include app/assets/stylesheets \
# 		--include node_modules \
# 		--include bower_components \
# 		--output public/assets application.js application.css

start:
	npm run start

install:
	npm install

.PHONY: start lock build
