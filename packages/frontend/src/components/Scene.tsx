import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import "twin.macro";

export const Scene: React.FC<
  {
    hideControls?: boolean;
  } & React.ComponentProps<typeof Canvas>
> = ({ children, ...props }) => {
  return (
    <Canvas tw="flex-grow" {...props}>
      {children}

      {!props.hideControls && <OrbitControls />}
    </Canvas>
  );
};
