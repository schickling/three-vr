three-vr [![](http://img.shields.io/npm/v/three-vr.svg?style=flat)](https://www.npmjs.org/package/gulp-webserver)
===========

Device controls and render steps for mobile virtual reality applications

## Installation

Note: [three.js](https://github.com/mrdoob/three.js) has to be installed as well.

```sh
$ npm install three-vr
```

## Usage

Can be loaded with [Browserify](http://browserify.org), RequireJS as `three-vr` or simply included via `<script>` tag and accessed via global variable `THREE.VR`.

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

### `init(options)`

Initializes the extention. Pass the options below.

##### `options.renderer` (required)

Specify your application's renderer.

##### `options.camera` (required)

Specify your application's camera.

##### `options.scene` (required)

Specify your application's scene.

### `animate()`

Updates the renderer. Should be called within your animation loop.

## How it works

three-vr takes the original `camera` and creates a [stereoskopic](http://en.wikipedia.org/wiki/Stereoscopy) effect by using two separated cameras. Each image is then rendered with a [Barrel Distrotion](http://en.wikipedia.org/wiki/Distortion_(optics)).

![](https://raw.githubusercontent.com/schickling/three-vr/master/doc/resources/render-pipeline.png)

Each camera has a slightly different position and thus a different perspective. The Barrel distrotion is implemented via a WebGL fragment shader which runs in parallel on the GPU.

## Development

### Build library

```sh
$ make build
```

### Run demo application

```sh
$ npm start # builds demo
$ python -m SimpleHTTPServer # starts webserver
```

Open `localhost:8000/demo` in your browser.

## Authors

* Johannes Schickling - [Github](https://github.com/schickling) - [Twitter](https://twitter.com/_schickling)
* Tim Suchanek - [Github](https://github.com/timsuchanek) - [Twitter](https://twitter.com/timsuchanek)

## License

[MIT License](http://opensource.org/licenses/MIT)

