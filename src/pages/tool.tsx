import { type NextPage } from "next";
import Dropdown from "src/components/Dropdown";
import Link from "next/link";
import { type SyntheticEvent, useRef, useState, useEffect } from "react";
import DatasetOutliner from "src/components/DatasetOutliner";
import axios from "axios";
import CreatePost from "src/components/CreatePost";
import { Canvas, useFrame } from "@react-three/fiber";
import { BoxGeometry } from "three";

const Tool: NextPage = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState(null);
  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLInputElement) {
      if (e.currentTarget.files) {
        setFile(e.currentTarget.files[0]);
      }
    }
  };
  const openDataset = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  // function graph_bar(){
  //   const test_data = [4, 3, 5];
  //   const colors = [0xFF0000, 0x0000FF, 0x00FF00];

  //   if(typeof window !== "undefined"){
  //     const scene = new THREE.Scene();
  //     scene.background = new THREE.Color(0xeFeFeF)
  //     const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
  //     camera.position.set(0, 0, 0)

  //     const renderer = new THREE.WebGLRenderer();
  //     renderer.setSize( window.innerWidth, window.innerHeight );
  //     document.body.appendChild( renderer.domElement );

  //     let i = 0;
  //     while(i < test_data.length){
  //       const geometry = new THREE.BoxGeometry( 0.5, test_data[i], 0 );
  //       const material = new THREE.MeshBasicMaterial( { color: colors[i] } );
  //       console.log(colors[i]);
  //       const mesh = new THREE.Mesh( geometry, material );
  //       scene.add( mesh );
  //       mesh.position.y = (mesh.position.y + (test_data[i]/2));
  //       mesh.position.x = (mesh.position.x + i);
  //       i++;
  //     }
  //     camera.position.z = 5;

  //     function animate() {
  //     requestAnimationFrame( animate );
  //     renderer.render( scene, camera );
  //     }
  //     animate();
  //   }
  // }

  useEffect(() => {
    if (file != undefined) {
      const fd = new FormData();
      fd.append("file", file);
      axios
        .post("/api/dataset/load", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => console.log("response: ", setData(res.data)))
        .catch((error) => console.error(error));
    }
  }, [file]);

  console.log(data);
  return (
    <>
      <main className="flex w-full flex-col">
        <div className="flex w-full flex-col border-b">
          <nav className="flex w-full max-w-[1280px] flex-row self-center  [&>div]:mx-3">
            <Dropdown dropdownButtonText="File">
              <button>New Visualization</button>
              <button onClick={openDataset}>Open Dataset</button>
            </Dropdown>
            <Dropdown dropdownButtonText="Edit">
              <button>Undo</button>
              <button>Redo</button>
            </Dropdown>
            <Link href="/dashboard" className="ml-auto">
              Return to Dashboard
            </Link>
          </nav>
        </div>
        <DatasetOutliner file={file} />
        <input
          type="file"
          id="file"
          onChange={handleChange}
          ref={inputFile}
          accept=".xls,.xlsx,.csv, text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          style={{ display: "none" }}
        />
        <div className="w-full max-w-[1280px] self-center">
          <CreatePost />
        </div>
        <div>
          <Canvas className="bg-black">
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            {data &&
              data.rows &&
              data.rows.map((coords) => {
                return (
                  <mesh key={coords[0]} position={[...coords, 0.0]}>
                    <boxGeometry />
                    <meshStandardMaterial />
                  </mesh>
                );
              })}
          </Canvas>
        </div>
      </main>
    </>
  );
};

export default Tool;
