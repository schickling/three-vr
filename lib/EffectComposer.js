/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.EffectComposer = function(renderer) {

  this.renderer = renderer;
  this.passes = [];

  this.reset();

};

THREE.EffectComposer.prototype = {

  swapBuffers: function() {

    var tmpL = this.readBufferL;
    this.readBufferL = this.writeBufferL;
    this.writeBufferL = tmpL;

    var tmpR = this.readBufferR;
    this.readBufferR = this.writeBufferR;
    this.writeBufferR = tmpR;

  },

  addPass: function(pass) {
    this.passes.push(pass);
  },

  popPass: function() {
    this.passes.pop();
  },

  render: function() {

    var pass, i, il = this.passes.length;

    for (i = 0; i < il; i++) {

      pass = this.passes[i];

      pass.renderToScreen = (i === il - 1);

      pass.render(this.renderer, this.writeBufferL, this.writeBufferR, this.readBufferL, this.readBufferR);

      this.swapBuffers();

    }

  },

  reset: function() {

    var width = window.innerWidth / 2;
    var height = window.innerHeight;
    var parameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat,
      stencilBufferL: false
    };

    var renderTarget = new THREE.WebGLRenderTarget(width, height, parameters);

    this.writeBufferL = renderTarget;
    this.readBufferL = renderTarget.clone();
    this.writeBufferR = renderTarget.clone();
    this.readBufferR = renderTarget.clone();

  },

  setSize: function() {

    this.reset();

  }

};
