var DeviceOrientationControls = require('./controls/DeviceOrientationControls');
var OrbitControls = require('./controls/OrbitControls');
var EffectComposer = require('./EffectComposer');
var StereoPass = require('./StereoPass');
var ShaderPass = require('./ShaderPass');
var BarrelDistortsionShader = require('./shaders/BarrelDistortionShader');

var DeviceOrientationControls, orbitControls, composer;

var threevr = {

  init: function(options) {

    options = options || {};
    this._setDefault(options, 'enableBarrelDistortion', true);
    this._setDefault(options, 'enableDeviceOrientationControls', true);
    this._setDefault(options, 'enableOrbitControls', false);

    if (options.enableDeviceOrientationControls) {
      deviceOrientationControls = new DeviceOrientationControls(options.camera, true);
      deviceOrientationControls.connect();
      deviceOrientationControls.update();
    }

    if (options.enableOrbitControls) {
      orbitControls = new OrbitControls(options.camera, options.renderer.domElement);
      orbitControls.rotateUp(Math.PI / 4);
      orbitControls.target.set(
        camera.position.x + 0.1,
        camera.position.y,
        camera.position.z
      );
      orbitControls.noZoom = true;
      orbitControls.noPan = true;
    }

    composer = new EffectComposer(options.renderer);
    composer.addPass(new StereoPass(options.scene, options.camera));

    if (options.enableBarrelDistortion) {
      composer.addPass(new ShaderPass(BarrelDistortsionShader));
    }

  },

  animate: function() {
    if (deviceOrientationControls) deviceOrientationControls.update();
    if (orbitControls) orbitControls.update();
    composer.render();
  },

  _setDefault: function(obj, key, val) {
    obj[key] = obj[key] ? obj[key] : val;
  }

};

module.exports = threevr;
