import React, { useRef, useEffect, useState } from 'react'
import p5 from 'p5'
import './Canvas.css'

const DrawableCanvas = ({ setTaskDescription }) => {
  const canvasRef = useRef()
  const canvasWidth = 400
  const canvasHeight = 400
  const [brushColor, setBrushColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(4)
  const [isEraser, setIsEraser] = useState(false)

  useEffect(() => {
    const sketch = (p) => {
      let currentColor = '#000000'
      let currentSize = 4

      p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight).parent(canvasRef.current)
        p.background(255)
      }

      p.draw = () => {
        if (p.mouseIsPressed) {
          p.stroke(currentColor)
          p.strokeWeight(currentSize)
          p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY)
        }
      }

      p.setColor = (hexColor) => {
        currentColor = hexColor
      }

      p.setSize = (newSize) => {
        currentSize = newSize
      }

      p.saveDrawing = () => {
        const dataURL = p.canvas.toDataURL()
        setTaskDescription(dataURL)
      }
    }

    const instance = new p5(sketch)
    window.p5Instance = instance

    return () => {
      window.p5Instance.remove()
      delete window.p5Instance
    }
  }, [setTaskDescription])

  const handleColorChange = (e) => {
    const hex = e.target.value
    setBrushColor(hex)
    if (isEraser) {
      setIsEraser(false)
    }
    if (window.p5Instance && window.p5Instance.setColor) {
      window.p5Instance.setColor(hex)
    }
  }

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10)
    setBrushSize(newSize)
    if (window.p5Instance && window.p5Instance.setSize) {
      window.p5Instance.setSize(newSize)
    }
  }

  const toggleEraser = () => {
    if (!isEraser) {
      setIsEraser(true)
      if (window.p5Instance && window.p5Instance.setColor) {
        window.p5Instance.setColor('#FFFFFF')
      }
    } else {
      setIsEraser(false)
      if (window.p5Instance && window.p5Instance.setColor) {
        window.p5Instance.setColor(brushColor)
      }
    }
  }

  return (
    <div>
      <div className="canvasWrapper">
        <div
          ref={canvasRef}
          className="canvasElement"
        ></div>
      </div>
      <div className="controls">
        <label>
          Color:
          <input type="color" value={brushColor} onChange={handleColorChange} />
        </label>
        <label>
          Size ({brushSize}px):
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={handleSizeChange}
          />
        </label>
        <button onClick={toggleEraser}>
          {isEraser ? 'Disable Eraser' : 'Eraser'}
        </button>
        <button
          onClick={() => {
            if (window.p5Instance && window.p5Instance.saveDrawing) {
              window.p5Instance.saveDrawing()
            }
          }}
        >
          Save Drawing
        </button>
      </div>
    </div>
  )
}

export default DrawableCanvas
