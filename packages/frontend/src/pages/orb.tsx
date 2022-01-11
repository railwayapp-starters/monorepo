import { useHelper } from "@react-three/drei";
import { LightProps, MeshProps, useFrame } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import React, { useRef } from "react";
import * as THREE from "three";
import { HemisphereLightHelper, Light, Mesh } from "three";
import "twin.macro";
import { Scene } from "../components/Scene";
import { Page } from "../layouts/Page";
import { clamp } from "../utils";

const Orb: React.FC = () => {
  return (
    <Page title="Orb">
      <Leva hidden />

      <Scene camera={{ position: [0, 0, 1.2] }} hideControls>
        <Lights />
        <SphereItem position={[0, 0, 0]} />

        {/* <Stats /> */}
      </Scene>
    </Page>
  );
};

export default Orb;

const c1 = new THREE.Color("#ff1e00");
// const c1 = new THREE.Color("#e900ff");
const c2 = new THREE.Color("#ff9000");
const c3 = new THREE.Color("#e900ff");

const Lights: React.FC<LightProps> = props => {
  const directionalLight = useRef<Light>(null!);
  // useHelper(directionalLight, DirectionalLightHelper, 1);

  const rectAreaLight = useRef<Light>(null!);

  const hemisphereLight = useRef<Light>(null!);
  // useHelper(hemisphereLight, HemisphereLightHelper);

  useFrame(({ mouse }) => {
    rectAreaLight.current.lookAt(0, 0, 0);

    const dirLight = directionalLight.current;

    const r = Math.min(1, mouse.length());
    dirLight.color = dirLight.color.lerpColors(c1, c2, r);

    const n = 80;
    const clampVal = 400;
    const mx = clamp(mouse.x * n, -clampVal, clampVal);
    const my = clamp(mouse.y * n, -clampVal, clampVal);
    dirLight.position.set(mx, my, dirLight.position.z);
  });

  return (
    <>
      {/* <ambientLight intensity={0.1} color={c3} /> */}
      <hemisphereLight
        ref={hemisphereLight}
        args={["#ff0095", "#7508db"]}
        intensity={0.2}
      />

      <directionalLight
        ref={directionalLight}
        position={[0, 2, 10]}
        intensity={1.0}
        color={c1}
      />

      <rectAreaLight
        ref={rectAreaLight}
        position={[-4, -2, 1]}
        intensity={0.2}
        width={6}
        height={6}
        color={"cyan"}
      />
    </>
  );
};

const SphereItem: React.FC<MeshProps> = props => {
  const mesh = useRef<Mesh>(null!);

  const { metalness, roughness } = useControls({
    metalness: 0,
    roughness: 0.48,
  });

  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry args={[0.5, 60, 60]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        metalness={metalness}
        roughness={roughness}
      />
      {/* <meshNormalMaterial attach="material" /> */}
    </mesh>
  );
};
