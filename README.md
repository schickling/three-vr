three-vr [![](http://img.shields.io/npm/v/three-vr.svg?style=flat)](https://www.npmjs.org/package/gulp-webserver)
===========

Device controls and render steps for mobile virtual reality applications

## Installation

```sh
$ npm install three-vr
```

## Usage

```js
// load three-vr extension
var threevr = require('three-vr');

// init rendering
threevr.init({
  renderer: renderer,
  camera: camera,
  scene: scene
});

// attach to your animation loop
function animate() {
  requestAnimationFrame(animate);
  threevr.animate();
}
```

## API

### init(options)

Initializes the extention.

### animate()

Updates the renderer.

## How it works

three-vr takes the original `camera` and creates a [stereoskopic](http://en.wikipedia.org/wiki/Stereoscopy) effect by using two separated cameras. Each image is then rendered with a [Barrel Distrotion](http://en.wikipedia.org/wiki/Distortion_(optics)).

![](https://raw.githubusercontent.com/schickling/three-vr/master/doc/resources/render-pipeline.png)

## Authors

* Johannes Schickling - [Github](https://github.com/schickling) - [Twitter](https://twitter.com/_schickling)
* Tim Suchanek - [Github](https://github.com/timsuchanek) - [Twitter](https://twitter.com/timsuchanek)

## License

[MIT License](http://opensource.org/licenses/MIT)

