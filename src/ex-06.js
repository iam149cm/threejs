import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);  

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2;

  // 렌더러 
  const renderer = new THREE.WebGLRenderer({
    alpha : true,
    antialias : true  

  });
  renderer.setSize(window.innerWidth, window.innerHeight);  
  document.body.appendChild(renderer.domElement);

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);
 
  // 텍스쳐
  const textureLoader = new THREE.TextureLoader();
  // 텍스쳐로 활용할 이미지 경로
  const textureBaseColor = textureLoader.load('../static/img/Wall_Stone_010_basecolor.jpg'); 
  const textureNormal = textureLoader.load('../static/img/Wall_Stone_010_normal.jpg'); 
  const textureHeight = textureLoader.load('../static/img/Wall_Stone_010_height.png'); 
  const textureRoughness = textureLoader.load('../static/img/Wall_Stone_010_roughness.jpg'); 


  // geometry 는 하나만 등록한다
  const geometry = new THREE.SphereGeometry(0.3, 32, 16);

    // 메쉬 01 
     const material01 = new THREE.MeshStandardMaterial({
      map : textureBaseColor,
    });
    const obj01 = new THREE.Mesh(geometry, material01); 
    obj01.position.x = -2;
    scene.add(obj01);

    
   // 메쉬 02 : normalMap - 법선 매핑. 빛을 통해 더 입체감있게 표현
   const material02 = new THREE.MeshStandardMaterial({
      map : textureBaseColor,
      normalMap : textureNormal, // 입체감 추가
   });
   

   const obj02 = new THREE.Mesh(geometry, material02); 
   obj02.position.x = -1;
   scene.add(obj02);

    // 메쉬 03 : displacementMap - 매시 높낮이를 밝고 어두움으로 표현
  const material03 = new THREE.MeshStandardMaterial({
    map : textureBaseColor,
    normalMap : textureNormal,
    displacementMap : textureHeight, // 울퉁불퉁함 추가
    displacementScale : 0.05, // 울퉁불퉁함 조절
  });
  const obj03 = new THREE.Mesh(geometry, material03); 
  obj03.position.x = 0;
  scene.add(obj03);

   // 메쉬 04
   const material04 = new THREE.MeshStandardMaterial({
    map : textureBaseColor,
    normalMap : textureNormal,
    displacementMap : textureHeight, // 울퉁불퉁함 추가
    displacementScale : 0.05, // 울퉁불퉁함 조절
    roughnessMap : textureRoughness, // 거칠기에 따를 빛 표현 추가
    roughness : 0.5 // 빛 반사 표현 조절
   });
   const obj04 = new THREE.Mesh(geometry, material04); 
   obj04.position.x = 1;
   scene.add(obj04);
 
  // 애니메이션
  function render(time) {
    time *= 0.0005;  // convert time to seconds
    obj01.rotation.y += 0.01;
    obj02.rotation.y += 0.01;
    obj03.rotation.y += 0.01;
    obj04.rotation.y += 0.01;
 
    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // 반응형 처리
  function onWindowResize(){
    // 윈도우 사이즈를 가변처리한다
    camera.aspect = window.innerWidth / window.innerHeight; // 종횡비
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);


} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
