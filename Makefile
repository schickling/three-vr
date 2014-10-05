#
# Task args.
#

BINS = node_modules/.bin
BROWSERIFY = $(BINS)/browserify
MINIFY = $(BINS)/uglifyjs

#
# Default target.
#

default: build

#
# Target for `node_modules` folder.
#
node_modules: package.json
	@npm install

#
# Target for `three-vr.js` file.
#
build: node_modules
	@$(BROWSERIFY) lib/index.js --standalone THREE.VR > three-vr.js
	@$(MINIFY) three-vr.js --output three-vr.min.js

build-demo: build
	@$(BROWSERIFY) demo/index.js --debug > demo/build.js
