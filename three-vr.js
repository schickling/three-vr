!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.THREE||(f.THREE={})).VR=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (__dirname){
var DeviceOrientationControls = require(__dirname + '/controls/DeviceOrientationControls');
var OrbitControls = require(__dirname + '/controls/OrbitControls');
var EffectComposer = require(__dirname + '/EffectComposer');
var StereoPass = require(__dirname + '/StereoPass');
var ShaderPass = require(__dirname + '/ShaderPass');
var BarrelDistortsionShader = require(__dirname + '/shaders/BarrelDistortionShader');

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

}).call(this,"/src")
},{}]},{},[1])(1)
});