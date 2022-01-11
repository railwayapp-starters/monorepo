import { Center, Extrude } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import "twin.macro";
import { Scene } from "../components/Scene";
import { Page } from "../layouts/Page";

export const Tetris: React.FC = () => {
  return (
    <Page tw="p-8">
      <Scene
        tw="border-2 border-dotted border-violet-900"
        camera={{ position: [8, 5, 40] }}
      >
        <ambientLight />
        <pointLight position={[-20, 10, 25]} />
        <gridHelper
          args={[100, 20, "#4D089A", "#4D089A"]}
          position={[0, 0, -10]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <Center>
          <Block />
        </Center>
      </Scene>
    </Page>
  );
};

export default Tetris;

const extrudeSettings = { steps: 2, depth: 10, bevelEnabled: true };
const SIDE = 10;

const Block: React.FC = props => {
  const shape = useMemo(() => {
    const _shape = new THREE.Shape();

    _shape.moveTo(0, 0);
    _shape.lineTo(SIDE, 0);
    _shape.lineTo(SIDE, SIDE * 2);
    _shape.lineTo(0, SIDE * 2);
    _shape.lineTo(0, SIDE * 3);
    _shape.lineTo(-SIDE, SIDE * 3);
    _shape.lineTo(-SIDE, SIDE);
    _shape.lineTo(0, SIDE);

    return _shape;
  }, []);

  return (
    <Extrude args={[shape, extrudeSettings]} {...props}>
      <meshPhysicalMaterial
        flatShading
        color="#3E64FF"
        thickness={SIDE}
        roughness={0.4}
        clearcoat={1}
        clearcoatRoughness={1}
        transmission={0.8}
        ior={1.25}
        attenuationDistance={0}
      />
    </Extrude>
  );
};

const Cube: React.FC = props => {
  const mesh = useRef<any>();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={clicked ? 1.5 : 1}
      onClick={event => click(!clicked)}
      onPointerOver={event => hover(true)}
      onPointerOut={event => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};
