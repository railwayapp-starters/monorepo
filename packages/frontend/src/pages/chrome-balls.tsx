import { Center, Plane, Stage, Stats, useHelper } from "@react-three/drei";
import { LightProps, MeshProps, useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import React, { useRef } from "react";
import * as THREE from "three";
import {
  DirectionalLightHelper,
  HemisphereLightHelper,
  Light,
  Mesh,
  MeshStandardMaterial,
  PointLightHelper,
} from "three";
import "twin.macro";
import { Scene } from "../components/Scene";
import { Page } from "../layouts/Page";
import { clamp } from "../utils";

const numRows = 10;
const numCols = 10;

const rowGap = 0.2;
const colGap = 0.2;

const ballRadius = 0.3;
const ballSize = ballRadius * 2;

const ChromeBalls: React.FC = () => {
  return (
    <Page title="Chrome Balls">
      <Leva hidden />

      <Scene camera={{ position: [0, 0.1, 7.4] }} shadows>
        <Lights />

        <Balls />

        {/* <Plane args={[200, 40]} rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
          <meshStandardMaterial
            attach="material"
            // color="#170d2f"
          />
        </Plane> */}

        {/* <Stats /> */}
      </Scene>
    </Page>
  );
};

export default ChromeBalls;

const Lights: React.FC<LightProps> = props => {
  const p1 = useRef<Light>(null!);
  const p2 = useRef<Light>(null!);
  const p3 = useRef<Light>(null!);
  const p4 = useRef<Light>(null!);
  const p5 = useRef<Light>(null!);
  const p6 = useRef<Light>(null!);

  // useHelper(p1, PointLightHelper, 0.5);
  // useHelper(p2, PointLightHelper, 0.5);
  // useHelper(p3, PointLightHelper, 0.5);
  // useHelper(p4, PointLightHelper, 0.5);
  // useHelper(p5, PointLightHelper, 0.5);
  // useHelper(p6, PointLightHelper, 0.5);

  useFrame(({ clock, mouse, camera }) => {
    // const p1x = Math.sin(clock.elapsedTime) * 6;

    const v = new THREE.Vector3(mouse.x, mouse.y, 0).unproject(camera);
    v.sub(camera.position).normalize();
    const distance = (p1.current.position.z - camera.position.z) / v.z;
    const pos = new THREE.Vector3();
    pos.copy(camera.position).add(v.multiplyScalar(distance));

    p1.current.position.set(pos.x, pos.y, pos.z);

    p6.current.position.set(pos.x, pos.y, p6.current.position.z);
  });

  return (
    <>
      {/* <ambientLight intensity={0.1} /> */}

      <pointLight
        ref={p1}
        distance={3.4}
        decay={1.1}
        position={[-2, 2.2, 2.5]}
        intensity={2.5}
        color="cyan"
      />

      <pointLight
        ref={p2}
        distance={12}
        decay={2}
        intensity={1.4}
        position={[-4, -4, 4]}
        color="#ff470f"
      />

      <pointLight
        ref={p3}
        distance={12}
        decay={1}
        intensity={0.8}
        position={[4, 0, 4.2]}
        color="#ae00ff"
      />

      <pointLight
        ref={p4}
        distance={6}
        decay={1}
        intensity={0.5}
        position={[5, 3, 1.2]}
        color="#ff0000"
      />

      <pointLight
        ref={p5}
        distance={8}
        decay={1}
        intensity={0.4}
        position={[-5, 6.5, 2.8]}
        color="#5704c2"
      />

      <pointLight
        ref={p6}
        distance={6}
        decay={1}
        intensity={0.4}
        position={[-5, 6.5, -4.0]}
        color="#c4a601"
      />
    </>
  );
};

const Balls: React.FC<MeshProps> = props => {
  useFrame(({ clock, mouse, camera }) => {
    // const p1x = Math.sin(clock.elapsedTime) * 6;

    const v = new THREE.Vector3(mouse.x, mouse.y, 0).unproject(camera);
    v.sub(camera.position).normalize();
    const distance = -camera.position.z / v.z;
    const pos = new THREE.Vector3();
    pos.copy(camera.position).add(v.multiplyScalar(distance));
  });

  const { mouse } = useThree();

  return (
    <Center>
      <group>
        {Array.from({ length: numRows }).map((_, row) => (
          <React.Fragment key={row}>
            {Array.from({ length: numCols }).map((_, col) => (
              <SphereItem
                key={col}
                row={row}
                col={col}
                position={[
                  col * (ballSize + colGap),
                  row * (ballSize + rowGap),
                  0,
                ]}
              />
            ))}
          </React.Fragment>
        ))}
      </group>
    </Center>
  );
};

const SphereItem: React.FC<
  MeshProps & { row: number; col: number }
> = props => {
  const mesh = useRef<Mesh>(null!);

  const { metalness, roughness } = useControls({
    metalness: 0.14,
    roughness: 0.2,
  });

  useFrame(({ clock, mouse, camera }) => {
    mesh.current.position.set(
      mesh.current.position.x,
      mesh.current.position.y,
      Math.sin((clock.elapsedTime + props.row + props.col) * 0.4) * 1.0,
    );

    const v = new THREE.Vector3(mouse.x, mouse.y, 0).unproject(camera);
    v.sub(camera.position).normalize();
    const distance = -camera.position.z / v.z;
    const pos = new THREE.Vector3();
    pos.copy(camera.position).add(v.multiplyScalar(distance));

    const distanceToMouse = pos.distanceTo(mesh.current.position);
    const scale = clamp(distanceToMouse, 0.6, 1.4);

    // console.log({ distanceToMouse, scale });

    // mesh.current.scale.setScalar(scale);
  });

  return (
    <mesh {...props} ref={mesh} castShadow>
      <sphereGeometry args={[ballRadius, 60, 60]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        metalness={metalness}
        roughness={roughness}
      />
    </mesh>
  );
};
