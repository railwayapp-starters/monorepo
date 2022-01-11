import { Stats } from "@react-three/drei";
import { LightProps, MeshProps, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Light, Mesh } from "three";
import "twin.macro";
import { Scene } from "../components/Scene";
import { Page } from "../layouts/Page";

export const Basic: React.FC = () => {
  return (
    <Page tw="p-8">
      <Scene
        tw="border-2 border-dotted border-violet-900"
        camera={{ position: [1, 4, 6] }}
        shadows
      >
        <Lights />

        <RotatingBox position={[-2, 0, 0]} castShadow />
        <SphereItem position={[1, 0, 0]} castShadow />

        <Plane
          position={[-1, -2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        />

        <Stats />
      </Scene>
    </Page>
  );
};

export default Basic;

const Lights: React.FC<LightProps> = props => {
  const ref = useRef<Light>(null!);
  // useHelper(ref, DirectionalLightHelper, 1);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={ref}
        position={[0, 2, 0]}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
    </>
  );
};

const RotatingBox: React.FC<MeshProps> = props => {
  const myMesh = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
    myMesh.current.rotation.y = a * 0.4;
    myMesh.current.rotation.z = a * 0.1;
  });

  return (
    <mesh ref={myMesh} {...props}>
      <boxBufferGeometry args={[1, 1]} />
      <meshPhongMaterial color="gold" />
    </mesh>
  );
};

const SphereItem: React.FC<MeshProps> = props => {
  const mesh = useRef<Mesh>(null!);

  return (
    <mesh {...props} ref={mesh}>
      <sphereBufferGeometry args={[0.5, 20, 20]} />
      <meshPhongMaterial attach="material" color="deeppink" />
    </mesh>
  );
};

const Plane: React.FC<MeshProps> = props => {
  const mesh = useRef<Mesh>(null!);

  return (
    <mesh ref={mesh} {...props} receiveShadow>
      <planeBufferGeometry args={[10, 10]} />
      <meshStandardMaterial color="#18003d" attach="material" />
    </mesh>
  );
};
