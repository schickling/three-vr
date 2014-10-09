var THREE = require('three');
var threevr = require('../');

var camera, scene, renderer, element, cube;


function init() {

  // renderer

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;

  document.body.appendChild(renderer.domElement);
  element = renderer.domElement;


  // camera & controls

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
  camera.position.set(0, 10, -10);
  scene.add(camera);

  // threevr
  threevr.init({
    camera: camera,
    renderer: renderer,
    scene: scene,
  });

  // scene objects

  addLight();
  addPlane();
  addCube();


  // event handlers

  window.addEventListener('resize', resize, false);
  window.addEventListener('click', function() {
    if (window.innerWidth === screen.width && window.innerHeight === screen.height) {
      location.reload();
    } else {
      fullscreen();
    }
  }, false);

  animate();

}


init();

function resize() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

function fullscreen() {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function animate() {
  requestAnimationFrame(animate);
  threevr.animate();
}

function addLight() {
  var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
  scene.add(light);
}

function addPlane() {

  var texture = THREE.ImageUtils.loadTexture('textures/patterns/checker.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat = new THREE.Vector2(50, 50);
  texture.anisotropy = renderer.getMaxAnisotropy();

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: texture
  });

  var geometry = new THREE.PlaneGeometry(1000, 1000);

  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

}

function addCube() {

  cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshNormalMaterial());
  cube.position.set(0, 15, 10);

  scene.add(cube);

}
