import { type NextPage } from "next";
import * as THREE from 'three';

const Test: NextPage = () => {

    const test_data = [4, 3, 5];
    const colors = [0xFF0000, 0x0000FF, 0x00FF00];

    function check() {
        if (typeof window !== 'undefined') {
            console.log('You are on the browser,You are good to go')
            } else {
            console.log('You are on the server,Cannot execute')
           }
    }
    
    function cubetest() {

        console.log("running cubetest")

		if(typeof window !== 'undefined'){
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xeFeFeF)

			const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			}
			animate();
        }
    }

    function graph_bar(){
        if(typeof window !== "undefined"){
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xeFeFeF)

			const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
            camera.position.set(0, 0, 0)

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

            let i = 0; 
            while(i < test_data.length){
			    const geometry = new THREE.BoxGeometry( 0.5, test_data[i], 0 );
			    const material = new THREE.MeshBasicMaterial( { color: colors[i] } );
                console.log(colors[i]);
			    const mesh = new THREE.Mesh( geometry, material );
			    scene.add( mesh );
                mesh.position.y = (mesh.position.y + (test_data[i]/2));
                mesh.position.x = (mesh.position.x + i);
                i++;
            }
			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );
				renderer.render( scene, camera );
			}
			animate();
        
        }
    }

    return (
        //check(),
        //cubetest()
        graph_bar()

    );
  };
  
  export default Test;