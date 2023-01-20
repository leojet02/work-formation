function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const scene = new THREE.Scene();

  const fov = 75;
  const aspect = 2;                                                               // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);             //(field of view, aspect ratio, near, far)
  camera.position.z = 3;                                                        //camera position

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxwidth = 1;
  const boxheight = 1;
  const boxdepth = 1;

  const geometry = new THREE.BoxGeometry(boxwidth, boxheight, boxdepth);        //box geometry : (x,y,z)

  function makeInstance(geometry, color, x) {                                   //cube function :
    const material = new THREE.MeshPhongMaterial({ color });                    //cube's material

    const cube = new THREE.Mesh(geometry, material);                            //cube=material+geometry
    scene.add(cube);                                                            //add cube to the scene

    cube.position.x = x;                                                        //position of cube = x

    return cube;
  }

  const cubes = [                                                              //use cube function to add as many cubes as wanted:
    makeInstance(geometry, 0x44aa88, 0),                                       //geometry+color+ x position
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  function resizeRendererToDisplaySize(renderer) {                              //check the size of the screen to render with more or less pixel
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;                                                              // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {                                //if the screen gets resized it will addapt the number of pixel
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {                                              //for each cube= speed + 1, making them turn at different speed
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);                                             //rendering scene and cam

    requestAnimationFrame(render);                                              //render frames
  }
  requestAnimationFrame(render);



  // function animate() {
  //   requestAnimationFrame(animate);
  //   cube.rotation.x += 0.01;                                                    //cube rotation axe x
  //   cube.rotation.y += 0.01;                                                    //cube rotation axe y
  //   cube.rotation.z += 0.01;                                                    //cube rotation axe z
  //   renderer.render(scene, camera);                                             //render scene
  // }

}

main();                                                            //start animation