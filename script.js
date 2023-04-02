
// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 2;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// Create sphere
var sphere_geometry  = new THREE.SphereGeometry(1, 120, 120);
var material = new THREE.MeshNormalMaterial();
var sphere  = new THREE.Mesh( sphere_geometry, material );

// Add sphere
scene.add( sphere  );

var update = function() {

    // change '0.003' for more aggressive animation
    var time = performance.now() * 0.003;
    
    // change 'k' value for more spikes
    var k = 3;

    for (var i = 0; i < sphere.geometry.vertices.length; i++) {
        var p = sphere.geometry.vertices[i];
        p.normalize().multiplyScalar(1 + 0.3 * perlin.get(p.x * k + time, p.y * k, p.z * k));
    }
   // sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;
    sphere.geometry.verticesNeedUpdate = true;
}
  
// Render Loop
var render = function () {
   sphere.rotation.x += 0.01;
   sphere.rotation.y += 0.01;

   // Render the scene
   renderer.render(scene, camera);
};

update();
renderer.setAnimationLoop(render);