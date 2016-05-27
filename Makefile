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

development:
	./node_modules/gulp/bin/gulp.js development

start:
	node app/server.js

install:
	npm install

# build:
# 	./node_modules/webpack/bin/webpack.js --progress --colors

# watch:
# 	./node_modules/webpack/bin/webpack.js --progress --colors

# .PHONY: assets
