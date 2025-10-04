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
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;


    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    const hemisphereLight = new THREE.HemisphereLight(0x7DF9FF, 0x101a2b, 0.4);
    scene.add(hemisphereLight);

    // Materials
    const carBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, metalness: 0.8, roughness: 0.3 });
    const wingMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.2 });
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.2, roughness: 0.8 });

    const car = new THREE.Group();
    scene.add(car);

    // Chassis
    const chassisGeo = new THREE.BoxGeometry(2, 0.4, 4.5);
    const chassis = new THREE.Mesh(chassisGeo, carBodyMaterial);
    chassis.position.y = 0.5;
    car.add(chassis);

    // Nose cone
    const noseGeo = new THREE.CylinderGeometry(0.01, 0.4, 1, 4);
    const nose = new THREE.Mesh(noseGeo, carBodyMaterial);
    nose.rotation.x = -Math.PI / 2;
    nose.position.set(0, 0.5, 2.75);
    car.add(nose);
    
    // Sidepods
    const sidepodGeo = new THREE.BoxGeometry(1.8, 0.5, 2);
    const leftSidepod = new THREE.Mesh(sidepodGeo, carBodyMaterial);
    leftSidepod.position.set(-0.5, 0.5, 0);
    const rightSidepod = new THREE.Mesh(sidepodGeo, carBodyMaterial);
    rightSidepod.position.set(0.5, 0.5, 0);
    
    // Driver area
    const cockpitGeo = new THREE.BoxGeometry(0.8, 0.5, 1);
    const cockpit = new THREE.Mesh(cockpitGeo, carBodyMaterial);
    cockpit.position.y = 0.9;
    cockpit.position.z = -0.5;
    car.add(cockpit);

    // Front Wing
    const frontWingGeo = new THREE.BoxGeometry(2.5, 0.05, 0.5);
    const frontWing = new THREE.Mesh(frontWingGeo, wingMaterial);
    frontWing.position.set(0, 0.4, 2.9);
    car.add(frontWing);

    // Rear Wing
    const rearWingGeo = new THREE.BoxGeometry(2, 0.1, 0.5);
    const rearWing = new THREE.Mesh(rearWingGeo, wingMaterial);
    rearWing.position.set(0, 1.2, -2.5);
    car.add(rearWing);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
    const wheelPositions = [
        { x: -1.2, y: 0.4, z: 1.8 },
        { x: 1.2, y: 0.4, z: 1.8 },
        { x: -1.2, y: 0.4, z: -1.8 },
        { x: 1.2, y: 0.4, z: -1.8 },
    ];
    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.position.set(pos.x, pos.y, pos.z);
        wheel.rotation.z = Math.PI / 2;
        car.add(wheel);
    });


    // Airflow Particles
    const particleCount = 5000;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const particleVels = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 0] = (Math.random() - 0.5) * 15;
        posArray[i * 3 + 1] = Math.random() * 5;
        posArray[i * 3 + 2] = -15;

        particleVels[i * 3 + 2] = 0.1 + Math.random() * 0.05;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0x7DF9FF,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
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

    const carRaycaster = new THREE.Raycaster();
    const carBoundingBox = new THREE.Box3().setFromObject(car);


    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate particles
      const positions = particleMesh.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          positions[i3 + 2] += particleVels[i3+2];

          const particlePos = new THREE.Vector3(positions[i3], positions[i3+1], positions[i3+2]);

          if (carBoundingBox.containsPoint(particlePos)) {
            positions[i3+1] += 0.05; // Deflect up
            positions[i3] += (Math.random() - 0.5) * 0.1; // Add turbulence
          }

          if (positions[i3 + 2] > 15) {
              positions[i3 + 0] = (Math.random() - 0.5) * 15;
              positions[i3 + 1] = Math.random() * 5;
              positions[i3 + 2] = -15;
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
