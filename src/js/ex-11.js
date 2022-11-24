import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

if (WEBGL.isWebGLAvailable()) {
  // 안개 컬러
  const fogColor = 0x004fff;
  const objColor = 0xffffff;
  const floorColor = 0x555555;

  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(fogColor); 
  
  // 안개 - scene 에 추가해주면 된다.
  // scene.fog = new THREE.Fog(fogColor, 1, 8); // 색상, 가까운거리, 먼거리

  scene.fog = new THREE.FogExp2(fogColor, 0.3); // 두 번째 fog. 밀도를 설정 해 준다

  // 카메라
  const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0,2,3); 
  camera.lookAt(0, 0, 0);

  // 렌더러 
  const renderer = new THREE.WebGLRenderer({
    alpha : true,
    antialias : true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);  
  renderer.shadowMap.enabled = true; // 그림자를 사용하겠다
  document.body.appendChild(renderer.domElement);

  // OrbitControls 추가 - 카메라 세팅 이후 설정해야 한다
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2 ; // 마우스 휠로 줌인 시 최소값
  controls.maxDistance = 10 ; // 마우스 휠로 줌아웃 시 최대값
  controls.maxPolarAngle = Math.PI / 2; // 회전 시 각도 조절.


  controls.update();


  // 도형 추가
  const geometry1 = new THREE.TorusGeometry(0.7, 0.3, 12, 80);
 
  const material = new THREE.MeshStandardMaterial({
      color : objColor,
    });
  const obj = new THREE.Mesh( geometry1, material); 
  obj.position.y = 0.8;
  obj.position.z = 0;

  scene.add(obj);

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color : floorColor,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  plane.receiveShadow = true; // 그림자 설정 2 - 그림자를 받을 도형
  scene.add(plane);
  

  // 빛
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-1,1,1); // 1, 1, 1 위치에서 오브젝트를 쏜다
  directionalLight.castShadow = true; // 그림자설정 3 - 그림자를 비출 빛
  directionalLight.shadow.mapSize.width = 1024; // 그림자 가로길이에 대한 속성값 설정. 클수록 선명
  directionalLight.shadow.mapSize.height=1024; // 그림자 세로길이에 대한 속성값 설정. 
  directionalLight.shadow.radius = 5; // 자연스러운 그림자 설정

  scene.add(directionalLight);

  // Orbit Control 시 추가해야 하는 코드
  function animate(){
    requestAnimationFrame(animate);
    obj.rotation.y += 0.01;

    controls.update();
    renderer.render(scene,camera);
  }
  animate();

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
