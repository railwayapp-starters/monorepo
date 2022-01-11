import { Center, shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import "twin.macro";
import { theme } from "twin.macro";
import { Scene } from "../components/Scene";
import { Page } from "../layouts/Page";
import glsl from "babel-plugin-glsl/macro";

export const Cube: React.FC = () => {
  return (
    <Page>
      <Scene>
        <ambientLight color={theme`colors.pink.500`} />
        <pointLight position={[-4, 5, 2]} />
        <Center>
          <CubeItem />
        </Center>
      </Scene>
    </Page>
  );
};

export default Cube;

const ColorShiftMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    }
  `,
);

extend({ ColorShiftMaterial });

const CubeItem: React.FC = props => {
  const mesh = useRef<any>();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const ref = useRef<any>();
  useFrame(({ clock }) => (ref.current.time = clock.getElapsedTime()));

  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={clicked ? 4 : 2}
      onClick={event => click(!clicked)}
      onPointerOver={event => hover(true)}
      onPointerOut={event => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />

      {/* @ts-ignore */}
      <colorShiftMaterial attach="material" color="deeppink" ref={ref} />
      {/* <meshStandardMaterial color={hovered ? "hotpink" : "orange"} /> */}
    </mesh>
  );
};
