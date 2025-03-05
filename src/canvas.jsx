import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const DrawableCanvas = ({ setTaskDescription }) => {
  const canvasRef = useRef()
  const canvasWidth = 400
  const canvasHeight = 400

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        const canvas = p.createCanvas(canvasWidth, canvasHeight).parent(canvasRef.current)
        p.background(255)
        console.log('Canvas created:', canvas)
      };

      p.draw = () => {
        if (p.mouseIsPressed) {
          p.stroke(0)
          p.strokeWeight(4)
          p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY)
        }
      };

      p.saveDrawing = () => {
        const canvas = p.canvas.toDataURL()
        setTaskDescription(canvas)
        console.log('Drawing saved:', canvas)
      };
    };

    const p5Instance = new p5(sketch)
    window.p5Instance = p5Instance

    return () => {
      p5Instance.remove();
      console.log('p5 instance removed');
    }
  }, [setTaskDescription])

  return (
    <div>
      <div ref={canvasRef} style={{ border: '1px solid black', width: `${canvasWidth}px`, height: `${canvasHeight}px` }}></div>
      <button onClick={() => window.p5Instance.saveDrawing()}>Save Drawing</button>
    </div>
  )
}

export default DrawableCanvas