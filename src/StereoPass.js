/**
 * @author alteredq / http://alteredqualia.com/
 * @authod mrdoob / http://mrdoob.com/
 * @authod arodic / http://aleksandarrodic.com/
 */

THREE.StereoPass = function(scene, camera) {


  this.scene = scene;
  this.camera = camera;

  this.separation = 3;

  // internals

  this._position = new THREE.Vector3();
  this._quaternion = new THREE.Quaternion();
  this._scale = new THREE.Vector3();

  this._cameraL = new THREE.PerspectiveCamera();
  this._cameraR = new THREE.PerspectiveCamera();

};

THREE.StereoPass.prototype = {

  render: function(renderer, writeBufferL, writeBufferR, readBufferL, readBufferR) {

    var width = window.innerWidth / 2;
    var height = window.innerHeight;

    scene.updateMatrixWorld();

    if (camera.parent === undefined) camera.updateMatrixWorld();

    camera.matrixWorld.decompose(this._position, this._quaternion, this._scale);

    // left

    this._cameraL.fov = this.camera.fov;
    this._cameraL.aspect = 0.5 * this.camera.aspect;
    this._cameraL.near = this.camera.near;
    this._cameraL.far = this.camera.far;
    this._cameraL.updateProjectionMatrix();

    this._cameraL.position.copy(this._position);
    this._cameraL.quaternion.copy(this._quaternion);
    this._cameraL.translateX(-this.separation);

    // right

    this._cameraR.near = this.camera.near;
    this._cameraR.far = this.camera.far;
    this._cameraR.projectionMatrix = this._cameraL.projectionMatrix;

    this._cameraR.position.copy(this._position);
    this._cameraR.quaternion.copy(this._quaternion);
    this._cameraR.translateX(this.separation);

    if (this.renderToScreen) {

      renderer.setViewport(0, 0, width * 2, height);
      renderer.clear();

      renderer.setViewport(width, 0, width, height);
      renderer.render(this.scene, this._cameraR);

      renderer.setViewport(0, 0, width, height);
      renderer.render(this.scene, this._cameraL);

    } else {

      renderer.setViewport(0, 0, width, height);
      renderer.render(this.scene, this._cameraL, writeBufferL, true);

      renderer.setViewport(width, 0, width, height);
      renderer.render(this.scene, this._cameraR, writeBufferR, true);

    }

  }

};
