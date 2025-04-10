import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState,useMemo } from "react";

import sakura from "../assets/sakura.mp3";
import HomeInfo from "../components/HomeInfo.jsx";
import { soundoff, soundon } from "../assets/icons";
import {  Island } from "../models/island.jsx";
import CanvasLoader from "../components/CanvasLoader";
import { Sky } from "../models/Sky.jsx";
import { Plane } from "../models/Plane.jsx";
import { OrbitControls } from "@react-three/drei";
import { useFrame} from "@react-three/fiber";
import gsap from "gsap";


const SakuraParticles = () => {
  const particles = useRef();
  const count = 500;
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push(
        Math.random() * 100 - 50,
        Math.random() * 100 - 10,
        Math.random() * 100 - 50
      );
    }
    return new Float32Array(pos);
  }, [count]);

  useFrame((state, delta) => {
    particles.current.rotation.y += delta * 0.1;
  });

  return (
    <points ref={particles} position={[0, 20, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#A23B72"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
};

const Journey = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) audioRef.current.play();
    return () => audioRef.current.pause();
  }, [isPlayingMusic]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') setCurrentStage(prev => Math.min(4, prev + 1));
      if (e.key === 'ArrowLeft') setCurrentStage(prev => Math.max(1, prev - 1));
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const adjustBiplaneForScreenSize = () => {
    if (window.innerWidth < 768) return [[1.5, 1.5, 1.5], [0, -1.5, 0]];
    return [[3, 3, 3], [0, -4, -4]];
  };

  const adjustIslandForScreenSize = () => {
    if (window.innerWidth < 768) return [[0.9, 0.9, 0.9], [0, -6.5, -43.4]];
    return [[1, 1, 1], [0, -6.5, -43.4]];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* <Preload all /> */}
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enableRotate={currentStage === 1}
          />
          
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={1} color="blue" />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
            castShadow
          />
          <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={1} />

          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            currentStage={currentStage}
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
          {isPlayingMusic && <SakuraParticles />}
        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />
      </div>
    </section>
  );
};

export default Journey;3