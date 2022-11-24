import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);  

  // 카메라
  const fov = 47; // 화각 : 숫자가 커질수록 멀리서 보게 된다
  const aspect = window.innerWidth / window.innerHeight; // 종횡비 : 가로 세로 비율
  const near = 0.1; // 카메라 시작 시점
  const far = 1000; // 카메라 끝 시점
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
   
  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(2,2,1); // 카메라 위치 조정 (x,y,z);
  camera.lookAt(new THREE.Vector3(0,0,0)); // 카메라의 위치가 어디든 0,0,0 을 바라보게 한다

  // 렌더러 
  const renderer = new THREE.WebGLRenderer({
    alpha : true,
    antialias : true  
  });
  renderer.setSize(window.innerWidth, window.innerHeight);  
  document.body.appendChild(renderer.domElement);

  // 도형 추가
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshStandardMaterial({
      color : 0xFF7F00,
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
  

  // 빛 - 없으면 까맣게 나온다
  const pointLight = new THREE.PointLight(0xffffbb, 1);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);

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
