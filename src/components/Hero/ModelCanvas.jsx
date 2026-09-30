import React, { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import styles from './ModelCanvas.module.css'

useGLTF.preload('/personaje.glb')

const TARGET_HEIGHT = 3

function Character() {
  const { scene } = useGLTF('/personaje.glb')

  const normalized = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    if (size.y <= 0) return scene

    const scale = TARGET_HEIGHT / size.y
    const clone = scene.clone(true)
    clone.scale.multiplyScalar(scale)

    const fitted = new THREE.Box3().setFromObject(clone)
    const center = fitted.getCenter(new THREE.Vector3())
    clone.position.x -= center.x
    clone.position.z -= center.z
    clone.position.y -= fitted.min.y

    return clone
  }, [scene])

  return <primitive object={normalized} />
}

function TouchScroll() {
  const gl = useThree((state) => state.gl)

  useEffect(() => {
    gl.domElement.style.touchAction = 'pan-y'
  }, [gl])

  return null
}

function LoadingViewport() {
  return (
    <div className={styles.loader}>
      <div className={styles.grid} />
      <span className={styles.spinner} />
      <span className={styles.label}>LOADING VIEWPORT…</span>
    </div>
  )
}

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

export default function ModelCanvas() {
  const controlsRef = useRef(null)
  const reduced = useReducedMotion()

  const zoomIn = () => controlsRef.current?.dollyIn(1.15)
  const zoomOut = () => controlsRef.current?.dollyOut(1.15)

  return (
    <CanvasErrorBoundary fallback={<LoadingViewport />}>
      <Suspense fallback={<LoadingViewport />}>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 1.6, 5.2], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <hemisphereLight color="#e8e8e8" groundColor="#232323" intensity={0.7} />
          <directionalLight position={[4, 5, 3]} intensity={1.5} color="#ff6b00" />
          <directionalLight position={[-5, 3, -4]} intensity={0.6} color="#ffffff" />
          <Character />
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.08}
            autoRotate={!reduced}
            autoRotateSpeed={0.6}
            enablePan={false}
            enableZoom={false}
            minDistance={2.5}
            maxDistance={7}
            minPolarAngle={0.4}
            maxPolarAngle={Math.PI / 2}
            target={[0, 1.5, 0]}
          />
          <TouchScroll />
        </Canvas>
      </Suspense>

      <div className={styles.zoom}>
        <button className={styles.zoomBtn} onClick={zoomIn} aria-label="Acercar">
          +
        </button>
        <button className={styles.zoomBtn} onClick={zoomOut} aria-label="Alejar">
          −
        </button>
      </div>
    </CanvasErrorBoundary>
  )
}
