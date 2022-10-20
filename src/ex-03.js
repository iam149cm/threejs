import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {

  // 가장 기본적인 구조의 코드
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x004fff); // 배경색 변경하기

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const canvas = document.querySelector('#ex-03');

  // 렌더러
  const renderer = new THREE.WebGLRenderer({canvas});
  // renderer.setSize(window.innerWidth, window.innerHeight); // canvas renderer 사이즈를 윈도우 사이즈로 

  // 렌더러 장면을 어디다 어떤 태그에 노출시킬것인가
  // document.body.appendChild(renderer.domElement); // querySelector 에 지정 해 주면 필요없어진다
  // renderer.render(scene, camera); 

  // 애니메이션
  function render(time) {
    time *= 0.001;  // convert time to seconds
   
    // cube.rotation.x = time;
    // cube.rotation.y = time;
   
    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
