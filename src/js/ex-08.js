import * as THREE from 'three'
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
  camera.position.set(5,2,1); // 카메라 위치 조정 (x,y,z);
  camera.lookAt(new THREE.Vector3(0,0,0)); // 카메라의 위치가 어디든 0,0,0 을 바라보게 한다

  // 렌더러 
  const renderer = new THREE.WebGLRenderer({
    alpha : true,
    antialias : true  
  });
  renderer.setSize(window.innerWidth, window.innerHeight);  
  document.body.appendChild(renderer.domElement);

  // 도형 추가
  const geometry = new THREE.SphereGeometry(0.5, 32, 16);
  const material = new THREE.MeshStandardMaterial({
      color : 0xffffff,
    });
  const cube = new THREE.Mesh(geometry, material); 
  cube.rotation.y = 0.5;
  scene.add(cube);

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color : 0xeeeeee,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  scene.add(plane);
  

  // 빛
  // 1. Ambient Light - 모든 object 를 대상으로 전역에서 비추는 빛. 그림자가 없다.
  const ambientLight = new THREE.AmbientLight(0xffa500, 0.3); 

   // 2. Directional Light - 특정 방향으로 비추는 빛
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-1,1,1); // 1, 1, 1 위치에서 오브젝트를 쏜다

  // 빛을 비추는 방향에 대해 Helper 를 지정해서 사용할 수 있다
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5, 0x000ff);

  // 3. HemisphereLight - 하늘, 땅의 색을 각각 받아 object 가 표현된다.
  const hemisphereLight = new THREE.HemisphereLight (0x0000ff, 0xff0000, 1);

  // 4. PointLight - 전구가 빛을 비추듯이 특정 위치에서 빛을 비춘다
  const pointLight = new THREE.PointLight(0xffffff,1);
  pointLight.position.set(2, 1, 2);
  const plHepler = new THREE.PointLightHelper(pointLight, 0.2);

  // 5.RectAreaLight - 특정 위치에 직사각으로 은은하게 빛을 비춘다
  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 2);
  rectLight.position.set(0.5, 0.5, 1);
  rectLight.lookAt(0,0,0);

  // 6. SpotLight - 특정 위치를 대상으로 강하게 빛을 비춘다
  const spotLight = new THREE.SpotLight(0xffffff, 0.5);

  scene.add(spotLight);

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
