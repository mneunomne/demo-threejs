
var container, controls;
var camera, scene, renderer;

init()
render()

// THREE.Object3D.DefaultUp.set(1.0, 0.0, 1.0)

function init() {

  container = document.createElement('div')
  document.body.appendChild(container)

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 200)
  this.camera.position.set(0, 5, 10);
  this.camera.lookAt(new THREE.Vector3(0,0,0));

  scene = new THREE.Scene()
  // scene.background = new THREE.Color( 0xefd1b5 );
  scene.fog = new THREE.FogExp2( 'black', 0.025 );

  // var gltf_loader = new THREE.GLTFLoader().setPath('assets/cidade_3D/')
  // loader.load('scene.gltf', function (gltf) {
  //   scene.add(gltf.scene)
  //   render()
  // });

  var fbx_loader = new THREE.FBXLoader() // .setPath('assets/cidade_3D/')
  fbx_loader.load('assets/cidade_3D/plano-e-cidade.fbx', function (object) {
    // object.scale.set(0.001, 0.001, 0.001)
    // object.rotation.set(new THREE.Vector3( Math.PI / 2, 0, 0))
    object.scale.x = object.scale.y = object.scale.z = 0.01
    object.castShadow = true
    object.receiveShadow = true
    object.rotateX(Math.PI / 2)
    // object.traverse(function(child){
    //   child.castShadow = true
    //   child.receiveShadow = true
    // });
    scene.add( object );
    render()
  });


  // var fbx_loader = new THREE.FBXLoader() // .setPath('assets/cidade_3D/')
  fbx_loader.load('assets/cidade_3D/predio.fbx', function (object) {
    // object.scale.set(0.001, 0.001, 0.001)
    // object.rotation.set(new THREE.Vector3( Math.PI / 2, 0, 0))
    object.scale.x = object.scale.y = object.scale.z = 0.01
    object.castShadow = true
    object.receiveShadow = true
    // object.rotateX(Math.PI / 2)
    // object.traverse(function(child){
    //   child.castShadow = true
    //   child.receiveShadow = true
    // });
    scene.add( object );
    render()
  });

  var light = new THREE.SpotLight( 0x404040 , 10); // soft white light
  light.castShadow = true
  light.receiveShadow = true
  light.position.set(0, 100, 0)
  scene.add( light );

  var axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.toneMapping = THREE.ACESFilmicToneMapping
  // renderer.toneMappingExposure = 0.8
  renderer.shadowMapEnabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  renderer.outputEncoding = THREE.sRGBEncoding
  container.appendChild(renderer.domElement)

  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', render)
  controls.minDistance = 2
  controls.maxDistance = 1000
  // controls.target.set(0, 0, - 0.2)
  controls.update()

  console.log('scene', scene)

  window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function render() {
  renderer.render(scene, camera)
}