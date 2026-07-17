import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface RobotHandProps {
  isMobile?: boolean;
}

function RobotHand({ isMobile = false }: RobotHandProps) {
  const { scene } = useGLTF('/assets/3d/robot_hand.glb');
  const ref = useRef<THREE.Group>(null);

  // Track inputs without triggering React renders
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);
  const scrollYRef = useRef(0);

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const dragRotationRef = useRef({ x: 0, y: 0 });
  const dragVelocityRef = useRef({ x: 0, y: 0 });

  // Inactivity tracking
  const lastInteractionTimeRef = useRef(0);

  // Dynamic touch listeners cleanup ref to prevent scroll hijacking when not touching the model
  const touchCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Normalize to range [-1, 1] for general cursor tracking
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Handle drag rotation if pointer is down (desktop pointer events)
      if (isDraggingRef.current && !isMobile) {
        const deltaX = e.clientX - previousMouseRef.current.x;
        const deltaY = e.clientY - previousMouseRef.current.y;

        const sensitivity = 0.007;

        dragRotationRef.current.y += deltaX * sensitivity;
        dragRotationRef.current.x += deltaY * sensitivity;

        // Constraint X rotation (tilt) to prevent flipping upside down
        dragRotationRef.current.x = Math.max(-0.7, Math.min(0.7, dragRotationRef.current.x));

        dragVelocityRef.current.y = deltaX * sensitivity;
        dragVelocityRef.current.x = deltaY * sensitivity;

        previousMouseRef.current = { x: e.clientX, y: e.clientY };
        lastInteractionTimeRef.current = performance.now() / 1000;
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = isHoveredRef.current ? 'grab' : 'auto';
    };

    const handleMouseEnter = () => { isHoveredRef.current = true; };
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      isDraggingRef.current = false;
      document.body.style.cursor = 'auto';
    };
    const handleScroll = () => { scrollYRef.current = window.scrollY; };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      
      // Clean up any remaining touch listeners on unmount
      if (touchCleanupRef.current) {
        touchCleanupRef.current();
      }
    };
  }, [isMobile]);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    isDraggingRef.current = true;
    previousMouseRef.current = { x: e.clientX, y: e.clientY };
    dragVelocityRef.current = { x: 0, y: 0 };
    lastInteractionTimeRef.current = performance.now() / 1000;
    document.body.style.cursor = 'grabbing';

    // On mobile, bind touch event listeners dynamically only during active drags to completely
    // eliminate native page scrolling hijacking when dragging outside the model bounds.
    if (isMobile) {
      const handleTouchMove = (event: TouchEvent) => {
        if (event.touches.length > 0) {
          // Block page scrolling exclusively when dragging the model
          if (event.cancelable) {
            event.preventDefault();
          }
          const touch = event.touches[0];
          const deltaX = touch.clientX - previousMouseRef.current.x;
          const deltaY = touch.clientY - previousMouseRef.current.y;

          const sensitivity = 0.018; // 2.5x sensitivity
          dragRotationRef.current.y += deltaX * sensitivity;
          dragRotationRef.current.x += deltaY * sensitivity;

          // Constraint X rotation (tilt) to prevent flipping upside down
          dragRotationRef.current.x = Math.max(-0.7, Math.min(0.7, dragRotationRef.current.x));

          dragVelocityRef.current.y = deltaX * sensitivity;
          dragVelocityRef.current.x = deltaY * sensitivity;

          previousMouseRef.current = { x: touch.clientX, y: touch.clientY };
          lastInteractionTimeRef.current = performance.now() / 1000;
        }
      };

      const handleTouchEnd = () => {
        isDraggingRef.current = false;
        cleanup();
      };

      const cleanup = () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchcancel', handleTouchEnd);
        touchCleanupRef.current = null;
      };

      // Clean up previous event bindings if any
      if (touchCleanupRef.current) {
        touchCleanupRef.current();
      }

      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
      window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

      touchCleanupRef.current = cleanup;
    }
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    isHoveredRef.current = true;
    if (!isDraggingRef.current) {
      document.body.style.cursor = 'grab';
    }
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    isHoveredRef.current = false;
    if (!isDraggingRef.current) {
      document.body.style.cursor = 'auto';
    }
  };

  // Self-healing effect to reset cached scene mutations and center the model
  useEffect(() => {
    if (scene) {
      scene.scale.set(1, 1, 1);
      scene.position.set(-168.2, -26.7, -17.0);
    }
  }, [scene]);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();

    // 1. Slow floating motion (calm, up and down)
    const floatY = Math.sin(t * 1.1) * 0.12;
    const floatX = Math.cos(t * 0.7) * 0.04;

    // 2. Very slow idle rotation (acts on top of drag rotation offset)
    const idleRotY = t * 0.04;
    const idleRotX = Math.sin(t * 0.4) * 0.04;

    // 3. Mouse Interaction (rotate towards cursor, max 12 degrees)
    // Only apply hover tracking rotation when not dragging to avoid conflict
    const targetMouseRotX = (!isDraggingRef.current && isHoveredRef.current) ? mouseRef.current.y * 0.20 : 0;
    const targetMouseRotY = (!isDraggingRef.current && isHoveredRef.current) ? mouseRef.current.x * 0.20 : 0;

    // 4. Scroll Interaction (rotate and move subtly upward)
    const scrollMax = 763;
    const scrollRatio = Math.min(scrollYRef.current / scrollMax, 1);

    const targetScrollY = scrollRatio * 1.5;
    const targetScrollRotZ = -scrollRatio * 0.25;
    const targetScrollRotX = scrollRatio * 0.12;

    // 5. Drag physics / inertia / auto-return reset
    const currentTime = performance.now() / 1000;
    const isInactive = !isDraggingRef.current && (currentTime - lastInteractionTimeRef.current > 3.0);

    if (isInactive) {
      // Smoothly return to original hero pose after 3 seconds of inactivity
      dragRotationRef.current.x = THREE.MathUtils.lerp(dragRotationRef.current.x, 0, 0.05);
      dragRotationRef.current.y = THREE.MathUtils.lerp(dragRotationRef.current.y, 0, 0.05);
      dragVelocityRef.current.x = 0;
      dragVelocityRef.current.y = 0;
    } else if (!isDraggingRef.current) {
      // Apply smooth inertia friction on release (slightly reduced damping on mobile)
      const friction = isMobile ? 0.975 : 0.95;
      dragVelocityRef.current.x *= friction;
      dragVelocityRef.current.y *= friction;

      dragRotationRef.current.x += dragVelocityRef.current.x;
      dragRotationRef.current.y += dragVelocityRef.current.y;
    }

    // Responsive Positioning
    const isDesktop = window.innerWidth >= 1024;

    // Center horizontally and vertically inside the mobile hero, or place right on desktop
    const defaultX = isMobile ? 0 : (isDesktop ? viewport.width * 0.20 : 0);
    const defaultY = isMobile ? 0.60 : (isDesktop ? 0.2 : -0.2);
    const defaultZ = isMobile ? 0.2 : (isDesktop ? 0.2 : -0.8);

    const targetX = defaultX + floatX;
    const targetY = defaultY + floatY + targetScrollY;
    const targetZ = defaultZ;

    // Interpolate using linear interpolation (lerp) for springy/damped behavior
    // On mobile, use a much higher lerp speed during active drags so it follows the finger instantly
    const lerpSpeed = isMobile 
      ? (isDraggingRef.current ? 0.25 : 0.10) 
      : 0.06;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, lerpSpeed);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, lerpSpeed);
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, lerpSpeed);

    // Damped Base Rotations
    // Default angles to display the mechanical arm/hand model elegantly
    const defaultRotX = 0.35;
    const defaultRotY = -0.55;
    const defaultRotZ = 0.15;

    // Y drag rotates Y-axis, X drag rotates X-axis
    const rotX = defaultRotX + dragRotationRef.current.x + idleRotX + targetMouseRotX + targetScrollRotX;
    const rotY = defaultRotY + dragRotationRef.current.y + idleRotY + targetMouseRotY;
    const rotZ = defaultRotZ + targetScrollRotZ;

    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, rotX, lerpSpeed);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, rotY, lerpSpeed);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, rotZ, lerpSpeed);
  });

  // Responsive scale factor (occupies 55% of screen width on mobile, static on desktop)
  const isDesktopScale = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
  const staticScale = isMobile 
    ? (viewport.width * 0.55) / 3402 
    : (isDesktopScale ? 0.001 : 0.0006);

  return (
    <>
      {/* Invisible full-screen mesh to capture drags that start in the background */}
      {!isMobile && (
        <mesh
          position={[0, 0, -4]}
          scale={[100, 100, 1]}
          onPointerDown={handlePointerDown}
        >
          <planeGeometry />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}

      <group
        ref={ref}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={staticScale}
      >
        <primitive object={scene} />
      </group>
    </>
  );
}

interface RobotHandCanvasProps {
  isMobile?: boolean;
}

export default function RobotHandCanvas({ isMobile = false }: RobotHandCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, isMobile ? 8.5 : 7.5], fov: isMobile ? 32 : 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      className="w-full h-full pointer-events-auto select-none"
      style={{ touchAction: isMobile ? 'pan-y' : 'none' }}
    >
      <Suspense fallback={null}>
        {/* Ambient base lighting */}
        <ambientLight intensity={0.4} />

        {/* Strong Key Light */}
        <directionalLight
          position={[6, 10, 5]}
          intensity={2.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Soft Fill Light */}
        <directionalLight
          position={[-6, 5, -5]}
          intensity={0.7}
        />

        {/* Rim lights highlighting metallic contours with matching purple glow */}
        <pointLight
          position={[-4, 6, -5]}
          intensity={3.5}
          color="#ffffff"
        />
        <pointLight
          position={[4, -4, -6]}
          intensity={4.0}
          color="#ef8ff6" // Matches the mobile hero purple background theme
        />

        <RobotHand isMobile={isMobile} />

        {/* HDR studio environment maps for high fidelity PBR metal reflections */}
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload('/assets/3d/robot_hand.glb');
