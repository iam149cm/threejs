import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Interaction } from 'three.interaction'; 
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';


if (WEBGL.isWebGLAvailable()) {

  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  // 카메라
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 4000);
  camera.position.set(1200,240,800); 
  camera.lookAt(0, 0, 0);

  // 렌더러 
  const renderer = new THREE.WebGLRenderer({
    alpha : true,
    antialias : true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);  
  renderer.shadowMap.enabled = true; // 그림자를 사용하겠다
  document.body.appendChild(renderer.domElement);

  // interaction
  const interaction = new Interaction(renderer, scene, camera);

  // OrbitControls 추가 - 카메라 세팅 이후 설정해야 한다
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 100 ; // 마우스 휠로 줌인 시 최소값
  controls.maxDistance = 1200 ; // 마우스 휠로 줌아웃 시 최대값 (obj 크기보다 작아야 함)
  controls.maxPolarAngle = Math.PI  ; // 회전 시 각도 조절.
  controls.update();
  
  // 텍스쳐 추가 - 배열을 이용
  const skyMaterialArray = [];

  const path = "https://raw.githubusercontent.com/iam149cm/threejs/main/";
  const texture_bk = new THREE.TextureLoader().load(path + '/static/img/skybox/paze_bk.jpg');
  const texture_dn = new THREE.TextureLoader().load(path + '/static/img/skybox/paze_dn.jpg');
  const texture_ft = new THREE.TextureLoader().load(path + '/static/img/skybox/paze_ft.jpg');
  const texture_lf = new THREE.TextureLoader().load(path + '/static/img/skybox/paze_lf.jpg');
  const texture_rt = new THREE.TextureLoader().load(path + '/static/img/skybox/paze_rt.jpg');
  const texture_up = new THREE.TextureLoader().load(path + '/static/img/skybox/paze_up.jpg');


  // push 할 때 순서가 중요하다 (ft-bk-up-dn-rt-lf)
  skyMaterialArray.push(new THREE.MeshBasicMaterial({  map : texture_ft,   }) );
  skyMaterialArray.push(new THREE.MeshBasicMaterial({  map : texture_bk,   }) );
  skyMaterialArray.push(new THREE.MeshBasicMaterial({  map : texture_up,   }) );
  skyMaterialArray.push(new THREE.MeshBasicMaterial({  map : texture_dn,   }) );
  skyMaterialArray.push(new THREE.MeshBasicMaterial({  map : texture_rt,   }) );
  skyMaterialArray.push(new THREE.MeshBasicMaterial({  map : texture_lf,   }) );

  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide
  }

  const skyGeometry = new THREE.BoxGeometry(2400 ,2400 ,2400 );
  const obj = new THREE.Mesh( skyGeometry, skyMaterialArray); 
  obj.position.y = 0.8;
  obj.position.z = 0;
  scene.add(obj);

  // 1. ambientLight
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  // 2. Directional Light - 특정 방향으로 비추는 빛
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-70,30,30); // 1, 1, 1 위치에서 오브젝트를 쏜다

  // 빛을 비추는 방향에 대해 Helper 를 지정해서 사용할 수 있다
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5, 0xffffff);
  scene.add(directionalLight);

  // 축
  // const axesHelper = new THREE.AxesHelper(50);
  // axesHelper.position.set(-450,300,300);
  // scene.add(axesHelper);

  // 도형 - sphear ---------------------------------------------
  // 텍스쳐
  const textureLoader = new THREE.TextureLoader();
  // 텍스쳐로 활용할 이미지 경로
  const textureBaseColor_sph = textureLoader.load(path +'/static/img/material/Marble_Carrara_003_COLOR.jpg'); 
  const textureNormal_sph = textureLoader.load(path +'/static/img/material/Marble_Carrara_003_NORM.jpg'); 
  const textureRoughness_sph = textureLoader.load(path +'/static/img/material/Marble_Carrara_003_ROUGH.jpg'); 
  const geometrySphear = new THREE.SphereGeometry( 100, 32, 16 );
  const materialSphear = new THREE.MeshStandardMaterial( 
    { 
    transparent : true,
    map : textureBaseColor_sph,
    normalMap : textureNormal_sph,
    roughnessMap : textureRoughness_sph, 
    roughness : 5  
    });
  const sphere = new THREE.Mesh( geometrySphear, materialSphear );
  sphere.castShadow = true;
  sphere.receiveShadow = true; 
  scene.add( sphere );

   // 도형 - Icosahedron (우) ---------------------------------------------
   const textureBaseColor_ico = textureLoader.load(path+'/static/img/material/Sapphire_001_COLOR.jpg'); 
   const textureNormal_ico = textureLoader.load(path+'/static/img/material/Sapphire_001_NORM.jpg'); 
   const textureRoughness_ico = textureLoader.load(path+'/static/img/material/Sapphire_001_ROUGH.jpg'); 

  const geometryIco = new THREE.IcosahedronGeometry(30);
  const materialIco = new THREE.MeshStandardMaterial( 
    { 
    transparent : true,
    map : textureBaseColor_ico,
    normalMap : textureNormal_ico,
    // refractionRatio: 100,
    displacementScale : 10, // 울퉁불퉁함 조절
    roughnessMap : textureRoughness_ico, // 거칠기에 따를 빛 표현 추가
    roughness : 10 // 빛 반사 표현 조절
    } );
  const icosa = new THREE.Mesh( geometryIco, materialIco );
  icosa.castShadow = true;
  icosa.receiveShadow = true; 
  icosa.position.set(300, 70, 30);
  scene.add( icosa );

  // 도형 - Octahedron (좌) ---------------------------------------------
  const textureBaseColor_octa = textureLoader.load(path+'/static/img/material/Crystal_001_COLOR.jpg'); 
  const textureNormal_octa = textureLoader.load(path+'/static/img/material/Crystal_001_NORM.jpg');  
  const geometryOcta = new THREE.OctahedronGeometry(20);
  const materialIOcta = new THREE.MeshStandardMaterial( 
  { 
  transparent : true,
  map : textureBaseColor_octa,
  normalMap : textureNormal_octa,
  // refractionRatio: 100,
  displacementScale : 10, // 울퉁불퉁함 조절
  roughness : 10 // 빛 반사 표현 조절
  } );
  const octa = new THREE.Mesh( geometryOcta, materialIOcta );
  octa.castShadow = true;
  octa.receiveShadow = true; 
  octa.position.set(-150, 70, 130);
  scene.add( octa );

    // 도형 - sphear (하) ---------------------------------------------
    const textureBaseColor_sp = textureLoader.load(path+'/static/img/material/Malachite_001_basecolor.jpg'); 
    const textureNormal_sp = textureLoader.load(path+'/static/img/material/Malachite_001_normal.jpg');  
    const geometrySp = new THREE.SphereGeometry(40);
    const materialSp = new THREE.MeshStandardMaterial( 
    { 
  
    transparent : true,
    map : textureBaseColor_sp,
    normalMap : textureNormal_sp,
    // refractionRatio: 100,
    displacementScale : 10, // 울퉁불퉁함 조절
    roughness : 10, // 빛 반사 표현 조절
    } );
    const sp = new THREE.Mesh( geometrySp, materialSp );
    sp.castShadow = true;
    sp.receiveShadow = true; 
    sp.position.set(-40, -170, 130);
    scene.add( sp );


    

    // interaction ---------------------------------------------
    scene.on('click', (event) => {
      $('.welcome').fadeOut();
      music();
    })

 
    // mouseover ---------------------------------------------
    icosa.on('mouseover', (event) => {
      toWireframe(icosa, event);
    })

    sphere.on('mouseover', (event) => {
      // toWireframe(sphere, event);
    })

    octa.on('mouseover', (event) => {
      toWireframe(octa, event);
    })

    sp.on('mouseover', (event) => {
      toWireframe(sp, event);
    })

    // mouseout ---------------------------------------------
    icosa.on('mouseout', (event) => {
      toWireframe(icosa, event);
    })

    sp.on('mouseout', (event) => {
      toWireframe(sp, event);
    })

    octa.on('mouseout', (event) => {
      toWireframe(octa, event);
    })
    
    sphere.on('mouseout', (event) => {
      // toWireframe(sphere, event);
    })


    // touchstart ---------------------------------------------
    scene.on('click', (event) => {
      $('.touchstart').fadeOut();
      music();
    })

  icosa.on('touchstart', (event) => {
      toWireframe(icosa, event);
    })

    octa.on('touchstart', (event) => {
      toWireframe(octa, event);
    })

    sp.on('touchstart', (event) => {
      toWireframe(sp, event);
    })
    sphere.on('touchstart', (event) => {
      // toWireframe(sphere, event);
    })

    // touchend ---------------------------------------------
    icosa.on('touchend', (event) => {
      toWireframe(icosa, event);
      window.open("https://iam149cm.github.io/naatCamp/2_TinDog/index.html");
      
    })

    octa.on('touchend', (event) => {
      toWireframe(octa, event);
      window.open("https://iam149cm.github.io/naatCamp/3_Drum-Kit/index.html");
    })

    sp.on('touchend', (event) => {
      toWireframe(sp, event);
    })
    
    sphere.on('touchend', (event) => {
      // toWireframe(sphere, event);
      window.open("https://sleepy-reading-7bf.notion.site/CV-c0e73f41082f4b7fbd71a2c90c9aa305");

    })

    // click ---------------------------------------------
    icosa.on('click', (event) => {
      window.open("https://iam149cm.github.io/naatCamp/2_TinDog/index.html");
    })
      
    sphere.on('click', (event) => {
      window.open("https://sleepy-reading-7bf.notion.site/CV-c0e73f41082f4b7fbd71a2c90c9aa305");
    })
      
    octa.on('click', (event) => {
      window.open("https://iam149cm.github.io/naatCamp/3_Drum-Kit/index.html")
    })
    


  // Orbit Control 시 추가해야 하는 코드
  function animate(){
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;
    icosa.rotation.z += 0.005;
    octa.rotation.y -= 0.01;
    sp.rotation.x += 0.02; 

    controls.update();
    TWEEN.update();
    render();
   
  }
  animate();

  function render(){
    renderer.render(scene,camera);
  }

  // 반응형 처리
  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // 카메라의 param 이 변경되는 경우 이 함수가 필요하다
    renderer.setSize(window.innerWidth , window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}


// function -------------------------------------
let targetOpacity = 0;

function fade(mesh){
  
  new TWEEN.Tween(mesh.material)
  .to({
      opacity: targetOpacity,
    },
    500
  )
  .start() 
  .onComplete(() => {
    !targetOpacity ? (targetOpacity = 1.0) : (targetOpacity = 0)
})

}

function toWireframe(mesh, event) {
  // console.log("Mesh :::" , mesh , "event ::: ", event.type);

  if (event.type === 'mouseover' || event.type === 'touchstart' ) {
    mesh.material.wireframe = true;
  } else if (event.type === 'mouseout' || event.type === 'touchend') {
    mesh.material.wireframe = false;
  }

}

