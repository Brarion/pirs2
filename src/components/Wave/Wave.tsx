// @ts-nocheck

import React from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import styles from './Wave.module.scss';

const COUNT = 102;
const SEPARATION = 250;
let myCount = 0;

const vertexShader = `
attribute float scale;

void main() {

vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

gl_PointSize = scale * ( 300.0 / - mvPosition.z );

gl_Position = projectionMatrix * mvPosition;

}

`;

const fragmentShader = `
uniform vec3 color;

void main() {

if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

gl_FragColor = vec4( color, 1.0 );

}

`;

const CustomGeometryParticles: React.FC<{ count: number }> = (props) => {
  const { count } = props;
  const bufferRef = React.useRef();
  const bufferRef1 = React.useRef();

  const points = React.useRef();
  const { viewport, camera, mouse, scene } = useThree();

  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < COUNT; ix++) {
      for (let iy = 0; iy < COUNT; iy++) {
        positions[i] = ix * SEPARATION - (COUNT * SEPARATION) / 2; // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * SEPARATION - (COUNT * SEPARATION) / 2; // z

        scales[j] = 1;

        i += 3;
        j++;
      }
    }

    return { positions, scales };
  }, [count]);

  useFrame((state, delta) => {
    if (
      bufferRef &&
      bufferRef.current &&
      bufferRef.current.array &&
      bufferRef1 &&
      bufferRef1.current &&
      bufferRef1.current.array
    ) {
      const positions = bufferRef.current.array;
      const scales = bufferRef1.current.array;

      camera.position.x += (mouse.x * 1000 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 1000 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      let i = 0;
      let j = 0;
      for (let ix = 0; ix < COUNT; ix++) {
        for (let iy = 0; iy < COUNT; iy++) {
          positions[i + 1] =
            Math.sin((ix + myCount) * 0.3) * 50 +
            Math.sin((iy + myCount) * 0.5) * 50;

          scales[j] =
            (Math.sin((ix + myCount) * 0.3) + 1) * 10 +
            (Math.sin((iy + myCount) * 0.5) + 1) * 10;

          i += 3;
          j++;
        }
      }

      myCount += 0.1;
      bufferRef.current.needsUpdate = true;
      bufferRef1.current.needsUpdate = true;
    }
  });

  const uniforms = React.useMemo(
    () => ({
      color: {
        value: new THREE.Color(0xffffff),
      },
    }),
    []
  );

  const resize = React.useCallback(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }, [camera]);

  React.useEffect(() => {
    camera.position.z = 1000;
    camera.fov = 75;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.near = 1;
    camera.far = 10000;

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <points ref={points}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={bufferRef}
          attach="attributes-position"
          count={particlesPosition.positions.length / 3}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          ref={bufferRef1}
          attach="attributes-scale"
          count={particlesPosition.scales.length}
          array={particlesPosition.scales}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};

const Wave = () => {
  return (
    <Canvas
      className={styles.canvas}
      camera={{
        position: [0, 0, 1000],
        fov: 75,
        near: 1,
        far: 10000,
      }}
    >
      <CustomGeometryParticles count={COUNT * COUNT} />
    </Canvas>
  );
};

export default Wave;
