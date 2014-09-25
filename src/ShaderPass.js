/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShaderPass = function(shader, textureID) {

  this.textureID = (textureID !== undefined) ? textureID : "tDiffuse";

  this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

  this.material = new THREE.ShaderMaterial({

    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader

  });

  this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new THREE.Scene();

  this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), null);
  this.scene.add(this.quad);

};

THREE.ShaderPass.prototype = {

  render: function(renderer, writeBufferL, writeBufferR, readBufferL, readBufferR) {

    this.quad.material = this.material;

    var width = window.innerWidth / 2;
    var height = window.innerHeight;


    this.uniforms[this.textureID].value = readBufferL;

    renderer.setViewport(-0.1 * width, -0.1 * height, 1.16 * width, 1.2 * height);
    renderer.render(this.scene, this.camera);

    this.uniforms[this.textureID].value = readBufferR;

    renderer.setViewport(0.95 * width, -0.1 * height, 1.16 * width, 1.2 * height);
    renderer.render(this.scene, this.camera);

  }

};
