var DeviceOrientationControls = require('./controls/DeviceOrientationControls');
var EffectComposer = require('./EffectComposer');
var StereoPass = require('./StereoPass');
var ShaderPass = require('./ShaderPass');
var BarrelDistortsionShader = require('./shaders/BarrelDistortsionShader');

var controls, composer;

var threevr = {

  init: function(renderer, scene, camera) {

    controls = new DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    composer = new EffectComposer(renderer);
    composer.addPass(new StereoPass(scene, camera));
    composer.addPass(new ShaderPass(BarrelDistortsionShader));
  },

  animate: function() {
    controls.update();
    composer.render();
  },

};

module.exports = threevr;
