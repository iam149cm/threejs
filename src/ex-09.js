import * as THREE from 'three'
import { ConeBufferGeometry } from 'three';
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);  

  // 카메라
  const fov = 63; // 화각 : 숫자가 커질수록 멀리서 보게 된다
  const aspect = window.innerWidth / window.innerHeight; // 종횡비 : 가로 세로 비율
  const near = 0.1; // 카메라 시작 시점
  const far = 1000; // 카메라 끝 시점
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
   
  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5,2,1); 
  camera.lookAt(new THREE.Vector3(0,0,0));

  // 렌더러 
  const renderer = new THREE.WebGLRenderer({
    alpha : true,
    antialias : true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);  
  renderer.shadowMap.enabled = true; // 그림자를 사용하겠다
  document.body.appendChild(renderer.domElement);

  // 도형 추가
  const geometry1 = new THREE.SphereGeometry(0.5, 32, 16);
  const geometry2 = new THREE.IcosahedronGeometry(0.5, 0); // 도형에 맞는 그림자가 적용됨
  const geometry3 = new THREE.ConeGeometry(0.4, 0.7, 6);
 
  const material = new THREE.MeshStandardMaterial({
      color : 0x004fff,
    });
  const cube1 = new THREE.Mesh( geometry1, material); 
  const cube2 = new THREE.Mesh( geometry2, material); 
  const cube3 = new THREE.Mesh( geometry3, material); 

  cube1.position.y = 0.2;
  cube1.castShadow = true; // 그림자 설정 1 - 그림자를 드리울 도형
  cube1.receiveShadow = true; // 도형이 복수개일 경우 다른 도형의 그림자를 받겠다

  cube2.position.set(1,1,1);
  cube2.castShadow = true;
  cube2.receiveShadow = true;

  cube3.position.set(2,0,-1);
  cube3.castShadow = true;
  cube3.receiveShadow = true;
  scene.add(cube1, cube2, cube3);

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color : 0xeeeeee,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  plane.receiveShadow = true; // 그림자 설정 2 - 그림자를 받을 도형
  scene.add(plane);
  

  // 빛
  // 1. Ambient Light - 모든 object 를 대상으로 전역에서 비추는 빛. 그림자가 없다.
  const ambientLight = new THREE.AmbientLight(0xffa500, 0.3); 

   // 2. Directional Light - 특정 방향으로 비추는 빛
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-1,1,1); // 1, 1, 1 위치에서 오브젝트를 쏜다
  directionalLight.castShadow = true; // 그림자설정 3 - 그림자를 비출 빛
  directionalLight.shadow.mapSize.width = 1024; // 그림자 가로길이에 대한 속성값 설정. 클수록 선명
  directionalLight.shadow.mapSize.height=1024; // 그림자 세로길이에 대한 속성값 설정. 
  directionalLight.shadow.radius = 5; // 자연스러운 그림자 설정

  // 빛을 비추는 방향에 대해 Helper 를 지정해서 사용할 수 있다
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5, 0x000ff);

  // 3. HemisphereLight - 하늘, 땅의 색을 각각 받아 object 가 표현된다.
  const hemisphereLight = new THREE.HemisphereLight (0x0000ff, 0xff0000, 1);

  // 4. PointLight - 전구가 빛을 비추듯이 특정 위치에서 빛을 비춘다
  const pointLight = new THREE.PointLight(0xffffff,1);
  pointLight.position.set(1, 3, 2);
  pointLight.castShadow = true;

  const plHepler = new THREE.PointLightHelper(pointLight, 0.2);

  // 5.RectAreaLight - 특정 위치에 직사각으로 은은하게 빛을 비춘다
  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 2);
  rectLight.position.set(0.5, 0.5, 1);
  rectLight.lookAt(0,0,0);
  rectLight.castShadow = true; // 그림자 적용이 안된다

  // 6. SpotLight - 특정 위치를 대상으로 강하게 빛을 비춘다
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.castShadow = true;
 
  scene.add(directionalLight);

  function render(time){
    renderer.render(scene, camera); // 필수
  }
  requestAnimationFrame(render);

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
