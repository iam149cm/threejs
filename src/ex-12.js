import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

if (WEBGL.isWebGLAvailable()) {

  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 카메라
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 4000);
  camera.position.set(0,20,100); 
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
  controls.enableDamping = true;
  controls.minDistance = 100 ; // 마우스 휠로 줌인 시 최소값
  controls.maxDistance = 1200 ; // 마우스 휠로 줌아웃 시 최대값 (obj 크기보다 작아야 함)
  controls.maxPolarAngle = Math.PI  ; // 회전 시 각도 조절.
  controls.update();
  
  // 텍스쳐 추가 - 배열을 이용
  const skyMaterialArray = [];
 
  const texture_bk = new THREE.TextureLoader().load('../static/img/skybox/paze_bk.jpg');
  const texture_dn = new THREE.TextureLoader().load('../static/img/skybox/paze_dn.jpg');
  const texture_ft = new THREE.TextureLoader().load('../static/img/skybox/paze_ft.jpg');
  const texture_lf = new THREE.TextureLoader().load('../static/img/skybox/paze_lf.jpg');
  const texture_rt = new THREE.TextureLoader().load('../static/img/skybox/paze_rt.jpg');
  const texture_up = new THREE.TextureLoader().load('../static/img/skybox/paze_up.jpg');

  // push 할 때 순서가 중요하다 (ft-bk-up-dn-rt-lf)
  skyMaterialArray.push(new THREE.MeshStandardMaterial({  map : texture_ft,   }) );
  skyMaterialArray.push(new THREE.MeshStandardMaterial({  map : texture_bk,   }) );
  skyMaterialArray.push(new THREE.MeshStandardMaterial({  map : texture_up,   }) );
  skyMaterialArray.push(new THREE.MeshStandardMaterial({  map : texture_dn,   }) );
  skyMaterialArray.push(new THREE.MeshStandardMaterial({  map : texture_rt,   }) );
  skyMaterialArray.push(new THREE.MeshStandardMaterial({  map : texture_lf,   }) );

  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide
  }


  const skyGeometry = new THREE.BoxGeometry(2400 ,2400 ,2400 );

  const obj = new THREE.Mesh( skyGeometry, skyMaterialArray); 
  obj.position.y = 0.8;
  obj.position.z = 0;
  scene.add(obj);


  // 빛

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  // Orbit Control 시 추가해야 하는 코드
  function animate(){
    requestAnimationFrame(animate);
    // obj.rotation.y += 0.01;

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
