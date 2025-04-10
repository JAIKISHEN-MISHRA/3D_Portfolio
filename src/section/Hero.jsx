import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { HackerRoom } from '../components/HackerRoom.jsx'
import CanvasLoader from '../components/CanvasLoader.jsx'
import { PerspectiveCamera } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import { useMediaQuery } from 'react-responsive'
import { calculateSizes } from '../constants/index.js'
import Target from '../components/Target.jsx'
import ReactLogo from '../components/ReactLogo.jsx'
import Cube from '../components/Cube.jsx'
import Rings from '../components/Rings.jsx'
import HeroCamera from '../components/HeroCamera.jsx'
import Button from '../components/Button.jsx'

const Hero = () => {
    // const controls=useControls('HackerRoom',{   Leva throught this control we can set porition directly in web by adjusting value 
    //     positionX:{value:2.5,min:-10,max:10},
    //     positionY:{value:2.5,min:-10,max:10},
    //     positionZ:{value:2.5,min:-10,max:10},
    //     rotationX:{value:0,min:-10,max:10},
    //     rotationY:{value:0,min:-10,max:10},
    //     rotationZ:{value:0,min:-10,max:10},
    //     scale:{value:1,min:0.1,max:10}
    // })
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    const sizes = calculateSizes(isSmall, isMobile, isTablet);
    return (
        <section className='min-h-screen w-full flex flex-col relative'>
            <div className='w-full mx-auto flex flex-col  sm:mt-36 mt-20 c-space gap-3'>
                <p className='sm:text-3xl text-2xl font-medium text-white text-center font-generalsans'>
                    Hey, I'm Jaikishan <span className='waving-hand'>👋</span>
                </p>
                {/* <p className='hero_tag text-gray_gradient text-center'>
                    Full-Stack Developer | 3D Web Enthusiast
                </p> */}
                <p className='text-white text-center text-[14px] sm:text-[16px] max-w-2xl mx-auto mt-2 font-light leading-relaxed'>
                    Crafting interactive digital experiences with the MERN stack, Three.js, and GSAP. <br />
                    Passionate about building scalable products and immersive UIs that make an impact.
                </p>

            </div>
            <div className='w-full h-full absolute inset-0'>
                {/* <Leva/> */}

                <Canvas className='w-full h-full'>
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                        <HeroCamera isMobile={isMobile}>
                            <HackerRoom
                                scale={sizes.deskScale} position={sizes.deskPosition} rotation={[0, -Math.PI, 0]}
                            //  position={[controls.positionX,controls.positionY,controls.positionZ]}
                            //  rotation={[controls.rotationX,controls.rotationY,controls.rotationZ]}
                            //  scale={[controls.scale,controls.scale,controls.scale]}
                            />
                        </HeroCamera>
                        <group>
                            <Target position={sizes.targetPosition} />
                            <ReactLogo position={sizes.reactLogoPosition} />
                            <Cube position={sizes.cubePosition} />
                            <Rings position={sizes.ringPosition} />
                        </group>
                        <ambientLight intensity={1} />
                        <directionalLight position={[10, 10, 10]} intensity={0.5} />
                    </Suspense>
                </Canvas>
            </div>
            <div className="absolute bottom-7 left-0 right-0 w-full z-10 flex justify-center gap-4 px-4">
                <a href="#contact" className="w-fit">
                    <Button
                        name="Let's work together"
                        isBeam
                        containerClass="sm:w-auto w-full px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-200"
                    />
                </a>
                <a href="/Journey" className="w-fit">
                    <Button
                        name="My Journey"
                        isBeam
                        containerClass="sm:w-auto w-full px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-200"
                    />
                </a>
            </div>

        </section>
    )
}

export default Hero