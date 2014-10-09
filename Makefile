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
# Target for `three-vr.js` file.
#
build:
	@$(BROWSERIFY) src/index.js -r three --standalone THREE.VR > three-vr.js
	@$(MINIFY) three-vr.js --output three-vr.min.js

build-demo: build
	@$(BROWSERIFY) demo/index.js --debug > demo/build.js
