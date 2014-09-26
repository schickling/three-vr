/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

THREE.BarrelDistortsionShader = {

  uniforms: {

    "tDiffuse": {
      type: "t",
      value: null
    },
    "coefficients": {
      type: "v3",
      value: new THREE.Vector3(1.0, 0.22, 0.24)
    },

  },

  vertexShader: [

    "varying vec2 vUv;",

    "void main() {",

    "vUv = uv;",

    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

  ].join("\n"),

  fragmentShader: [

    "uniform vec3 coefficients;",

    "uniform sampler2D tDiffuse;",

    "varying vec2 vUv;",

    "vec2 distort(vec2 p)",

    "{",

    "float rSq = p.y * p.y + p.x * p.x;",

    "p = p * (coefficients.x + rSq * coefficients.y + rSq * rSq * coefficients.z);",

    "return 0.5 * (p + 1.0);",

    "}",

    "void main() {",

    "vec2 xy = 2.0 * vUv - 1.0;",

    "vec2 uv = distort(xy);",

    "float d = length(uv);",

    "if (!all(equal(clamp(uv, vec2(0.0, 0.0), vec2(1.0, 1.0)), uv))) {",

    "gl_FragColor = vec4(0.0);",

    "} else {",

    "gl_FragColor = texture2D( tDiffuse, uv );",

    "}",

    "}"

  ].join("\n")

};
