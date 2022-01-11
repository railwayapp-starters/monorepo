import { Sphere, Stats } from "@react-three/drei";
import { LightProps, useFrame, useThree, Vector3 } from "@react-three/fiber";
import { Bloom, EffectComposer, SSAO } from "@react-three/postprocessing";
import { useControls } from "leva";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Light, Mesh, MeshStandardMaterial } from "three";
import "twin.macro";
import { Scene } from "../components/Scene";
import { Page } from "../layouts/Page";
import { rand, randItem } from "../utils";

const GREEN = "#1E792C";
const RED = "#C30F16";

export const XmasBalls: React.FC = () => {
  return (
    <Page>
      <Scene tw="" camera={{ position: [4, 8, 40] }}>
        <Lights />
        <Camera />

        <BallGenerator />

        {/* <SphereItem
          ball={{
            id: 1,
            born: 1,
            colour: RED,
            position: [-2, 0, 0],
            scale: 1,
          }}
        />
        <SphereItem
          ball={{
            id: 1,
            born: 1,
            colour: GREEN,
            position: [2, 0, 0],
            scale: 0.5,
          }}
        /> */}

        <EffectComposer>
          <Bloom
            intensity={1.0}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.0025}
          />
          {/* <SelectiveBloom luminanceThreshold={0.1}  /> */}
          <SSAO />
        </EffectComposer>

        {/* <Stats /> */}
      </Scene>
    </Page>
  );
};

export default XmasBalls;

const Camera: React.FC = () => {
  useFrame(({ camera, clock }) => {
    const x = camera.position.x;
    const z = camera.position.z;

    const rotSpeed = 0.01;

    camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
    camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);

    camera.lookAt(new THREE.Vector3(0, 0, 0));
  });

  return null;
};

export interface Ball {
  id: number;
  position: Vector3;
  scale?: number;
  born: number; // seconds
  colour: string;
  dead?: boolean;
}

let ballId = 0;

const FREQ = 40; // seconds
const LIFETIME = 6;

const min = -40;
const max = 40;

const colours = [GREEN, RED, "white"];

const randomBall = (): Ball => {
  return {
    id: ballId++,
    position: [rand(min, max), rand(min, max), rand(min, max)],
    born: new Date().getTime(),
    scale: rand(0.8, 1.6),
    colour: randItem(colours),
  };
};

const BallGenerator: React.FC = () => {
  const [balls, setBalls] = useState<Ball[]>([randomBall()]);
  const count = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBall = randomBall();

      const now = new Date().getTime();
      setBalls(balls => [
        ...balls.filter(b => !b.dead && now - b.born <= LIFETIME * 1000),
        newBall,
      ]);
    }, FREQ);
  }, []);

  return (
    <>
      {balls.map((ball, i) => (
        <SphereItem
          key={ball.id}
          ball={ball}
          onDeath={() =>
            setBalls(balls =>
              balls.map(b => (b.id === ball.id ? { ...b, dead: true } : b)),
            )
          }
        />
      ))}
    </>
  );
};

const Lights: React.FC<LightProps> = props => {
  const ref = useRef<Light>(null!);
  // useHelper(ref, PointLightHelper, 1);

  return (
    <>
      <ambientLight intensity={0.1} />
      {/* <pointLight position={[0, 0, 4]} ref={ref} intensity={0.5} /> */}
      {/* <directionalLight /> */}
    </>
  );
};

const SphereItem: React.FC<{ ball: Ball; onDeath: () => void }> = ({
  ball,
  onDeath,
}) => {
  const mesh = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    // Scale down
    if (mesh.current.scale.x >= 0) {
      mesh.current.scale.subScalar(0.001);
    }

    // Move towards center
    const dir = new THREE.Vector3();
    dir
      .subVectors(new THREE.Vector3(0, 0, 0), mesh.current.position)
      .normalize();
    mesh.current.position.add(dir.multiplyScalar(0.04));

    if (mesh.current.position.manhattanLength() <= 0.5) {
      onDeath();
    }
  });

  return (
    <mesh ref={mesh} position={ball.position}>
      <sphereBufferGeometry args={[0.5, 20, 20]} />
      <meshPhongMaterial
        attach="material"
        color={ball.colour}
        emissive={new THREE.Color(ball.colour)}
        emissiveIntensity={0.8}
        flatShading
      />
    </mesh>
  );
};
