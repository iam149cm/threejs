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
 
  // geometry 는 하나만 등록한다
  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);

    // 메쉬 01 : MeshBasicMaterial - 빛에 영향을 받지 않는다
     const material01 = new THREE.MeshBasicMaterial({
      color : 0xFF7F00,
    });
    material01.wireframe = true;
    const obj01 = new THREE.Mesh(geometry, material01); 
    obj01.position.x = -2;
    scene.add(obj01);

    
   // 메쉬 02 : MeshStandardMaterial - 3d 프로그램에서 사용하는 표준
   const material02 = new THREE.MeshStandardMaterial({
     color : 0xFF7F00,
     // metalness : 0.6, // 재질
     // roughness : 0.4, // 거칠기
     // wireframe : true,
     // transparent : true, // 투명도
     // opacity : 0.5,
   });
   

   const obj02 = new THREE.Mesh(geometry, material02); 
   obj02.position.x = -1;
   scene.add(obj02);

    // 메쉬 03 - MeshDepthMaterial / MeshPhysicalMaterial
  const material03 = new THREE.MeshPhysicalMaterial({
    color : 0xFF7F00,
    clearcoat : 1,
    clearcoatRoughness : 0.3
  });
  const obj03 = new THREE.Mesh(geometry, material03); 
  obj03.position.x = 0;
  scene.add(obj03);

   // 메쉬 04 - MeshLambertMaterial
   const material04 = new THREE.MeshLambertMaterial({
     color : 0xFF7F00,
   });
   const obj04 = new THREE.Mesh(geometry, material04); 
   obj04.position.x = 1;
   scene.add(obj04);

    // 메쉬 05 - MeshPhongMaterial
  const material05 = new THREE.MeshPhongMaterial({
    color : 0xFF7F00,
    shininess : 60,
    specular : 0x004fff, // 광의 색상
  });
  const obj05 = new THREE.Mesh(geometry, material05); 
  obj05.position.x = 2;
  scene.add(obj05);



  // 애니메이션
  function render(time) {
    time *= 0.0005;  // convert time to seconds
    obj01.rotation.y += 0.01;
    obj02.rotation.y += 0.01;
    obj03.rotation.y += 0.01;
    obj04.rotation.y += 0.01;
    obj05.rotation.y += 0.01;
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
