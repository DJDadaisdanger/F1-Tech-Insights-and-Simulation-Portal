'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function SimulationClient() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101a2b);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(5, 5, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Simplified F1 Car Body
    const carMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, metalness: 0.5, roughness: 0.5 });
    
    // Chassis
    const chassisShape = new THREE.Shape();
    chassisShape.moveTo(0, 0);
    chassisShape.lineTo(4, 0);
    chassisShape.lineTo(4.5, 0.5);
    chassisShape.lineTo(4.5, 1);
    chassisShape.lineTo(0.5, 1);
    chassisShape.lineTo(0, 0.5);
    chassisShape.lineTo(0, 0);
    const extrudeSettings = { depth: 1.5, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
    const chassisGeometry = new THREE.ExtrudeGeometry(chassisShape, extrudeSettings).center();
    const chassis = new THREE.Mesh(chassisGeometry, carMaterial);
    chassis.rotation.y = Math.PI / 2;
    scene.add(chassis);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const wheels = [
        { x: -1.5, y: -0.3, z: 1 },
        { x: 1.5, y: -0.3, z: 1 },
        { x: -1.5, y: -0.3, z: -1 },
        { x: 1.5, y: -0.3, z: -1 },
    ];
    wheels.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.position.set(pos.x, pos.y, pos.z);
        wheel.rotation.x = Math.PI / 2;
        scene.add(wheel);
    });

    // Airflow Particles
    const particleCount = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x7DF9FF,
        transparent: true,
        opacity: 0.7,
    });
    const particleMesh = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleMesh);


    // Handle resize
    const handleResize = () => {
      if(currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate particles
      const positions = particleMesh.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 2] += 0.1; // Move along Z
          if (positions[i * 3 + 2] > 10) {
              positions[i * 3 + 2] = -10;
          }
      }
      particleMesh.geometry.attributes.position.needsUpdate = true;


      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full"></div>;
}
