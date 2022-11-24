import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {

  // 가장 기본적인 구조의 코드
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x004fff); // 배경색 변경하기

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2;

  // 렌더러 
  const renderer = new THREE.WebGLRenderer({
    alpha : true,
    antialias : true // 랜더러 내부에서 속성값 지정이 가능하다 (antialias : 계단현상)

  });
  renderer.setSize(window.innerWidth, window.innerHeight); // canvas renderer 사이즈를 윈도우 사이즈로 

  // 렌더러 장면을 어디다 어떤 태그에 노출시킬것인가
  document.body.appendChild(renderer.domElement);

  // 메쉬 01
  const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5); // 어떤 geometry 를 쓸 것인가 설정
  const material01 = new THREE.MeshStandardMaterial({
    color : 0x999999
  });
  const obj01 = new THREE.Mesh(geometry01, material01); // geometry, material 값을 넣는다
  obj01.position.x = -1;
  scene.add(obj01);

  // 메쉬 02
  const geometry02 = new THREE.ConeGeometry(0.4, 0.7, 6)
  const material02 = new THREE.MeshStandardMaterial({
    color : 0x999999
  });
  const obj02 = new THREE.Mesh(geometry02, material02); 
  scene.add(obj02);

  // 메쉬 03
  const geometry03 = new THREE.IcosahedronBufferGeometry(0.4, 0); 
  const material03 = new THREE.MeshStandardMaterial({
    color : 0x999999
  });
  const obj03 = new THREE.Mesh(geometry03, material03); 
  obj03.position.x = 1;
  scene.add(obj03);


  // 애니메이션
  function render(time) {
    time *= 0.0005;  // convert time to seconds
   
    obj01.rotation.y = time;
    obj02.rotation.y = time;
    obj03.rotation.y = time;
   
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
