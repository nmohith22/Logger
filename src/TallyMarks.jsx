import React from "react";
import { Canvas } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const TallyMark = ({ position, color }) => {
  const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0)]

  return (
    <Line
      points={points}
      color={color}
      lineWidth={3}
      position={position}
    />
  )
}

const CrossTallyMark = ({ position, color }) => {
  const points = [new THREE.Vector3(-1.2, 0, 0), new THREE.Vector3(0, 1, 0)]

  return (
    <Line
      points={points}
      color={color}
      lineWidth={3}
      position={position}
    />
  )
}

const TallyMarks = ({ count, color = "black", crossColor = "black" }) => {
  const marks = [];

  for (let i = 0; i < count; i++) {
    //const xBase = Math.floor (i/5) * 2.5
    const xOffset = ((i % 15) * 0.3)
    const yOffset = -Math.floor(i / 15) * 1.5

    if ((i + 1) % 5 === 0) {
      marks.push(
        <CrossTallyMark key={i} position={[xOffset - 0.15, yOffset, 0]} color={crossColor} />
        )
    } else {
      marks.push(
        <TallyMark key={i} position={[xOffset, yOffset, 0]} color={color} />
        )
    }
  }

  return (
    <Canvas style={{ height: "300px", width: "300px" }}> 
      <group position={[-2, 2.65, 0]}>{marks}</group> 
    </Canvas>
  );
};

export default TallyMarks;
