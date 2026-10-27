const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useRef } from "react";
import * as THREE from "three";

const LOGO_URL = "https://media.db.com/images/public/user_695abc5bcdd1ecf63669f010/d5736ecd5_upscalemedia-transformed.png";

// Major tech hubs (lat, lon)
const HUBS = [
  { lat: 40.71, lon: -74.0 },   // New York
  { lat: 51.5, lon: -0.12 },    // London
  { lat: 35.68, lon: 139.69 },  // Tokyo
  { lat: -23.55, lon: -46.63 }, // São Paulo
  { lat: 1.35, lon: 103.81 },   // Singapore
  { lat: 37.77, lon: -122.41 }, // San Francisco
  { lat: 48.85, lon: 2.35 },    // Paris
  { lat: 52.52, lon: 13.40 },   // Berlin
  { lat: 28.61, lon: 77.20 },   // New Delhi
  { lat: -33.86, lon: 151.2 },  // Sydney
  { lat: 25.2, lon: 55.27 },    // Dubai
  { lat: 39.9, lon: 116.4 },    // Beijing
];

function latLonToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function EarthGlobe() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const RADIUS = 4.5;

    // Wireframe sphere
    const sphereGeo = new THREE.SphereGeometry(RADIUS, 48, 32);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    earthGroup.add(new THREE.Mesh(sphereGeo, wireMat));

    // Inner solid dark sphere to hide back-side points
    const innerGeo = new THREE.SphereGeometry(RADIUS * 0.99, 48, 32);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.85 });
    earthGroup.add(new THREE.Mesh(innerGeo, innerMat));

    // Dot grid representing landmass — generate points on sphere, keep a subset
    const dotsGeo = new THREE.BufferGeometry();
    const dotPositions = [];
    const dotCount = 1800;
    for (let i = 0; i < dotCount; i++) {
      // Fibonacci sphere distribution
      const y = 1 - (i / (dotCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * 2.39996;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      // Keep ~55% of points to mimic landmass density
      if (Math.random() > 0.45) {
        dotPositions.push(x * RADIUS, y * RADIUS, z * RADIUS);
      }
    }
    dotsGeo.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    earthGroup.add(new THREE.Points(dotsGeo, dotsMat));

    // Hub markers
    const hubVecs = HUBS.map((h) => latLonToVec3(h.lat, h.lon, RADIUS * 1.01));
    const hubGeo = new THREE.BufferGeometry();
    hubGeo.setAttribute("position", new THREE.Float32BufferAttribute(hubVecs.flatMap((v) => [v.x, v.y, v.z]), 3));
    const hubMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
    });
    const hubPoints = new THREE.Points(hubGeo, hubMat);
    earthGroup.add(hubPoints);

    // Glow rings around hubs
    const ringMeshes = [];
    hubVecs.forEach((v) => {
      const ringGeo = new THREE.RingGeometry(0.12, 0.18, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(v);
      ring.lookAt(0, 0, 0);
      earthGroup.add(ring);
      ringMeshes.push(ring);
    });

    // Connection arcs between random hubs
    const arcLines = [];
    const arcPulses = [];
    function createArc(start, end) {
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(RADIUS + dist * 0.35);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
      const line = new THREE.Line(geo, mat);
      earthGroup.add(line);
      arcLines.push(line);

      // Pulse traveling along arc
      const pulseGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      earthGroup.add(pulse);
      arcPulses.push({ mesh: pulse, curve, progress: Math.random(), speed: 0.004 + Math.random() * 0.006 });
    }

    // Create a set of arcs
    const arcPairs = [
      [0, 1], [1, 2], [2, 5], [5, 0], [3, 0], [4, 2], [6, 7], [8, 4],
      [9, 5], [10, 11], [11, 2], [7, 1], [3, 9], [10, 6],
    ];
    arcPairs.forEach(([a, b]) => createArc(hubVecs[a], hubVecs[b]));

    // Mouse parallax
    let targetRotX = 0.2;
    let targetRotY = 0;
    let currentRotX = 0.2;
    let currentRotY = 0;
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = mx * 0.8;
      targetRotX = 0.2 + my * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let frameId;
    let autoRotate = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!prefersReducedMotion) {
        autoRotate += delta * 0.08;
        currentRotY += (targetRotY - currentRotY) * 0.05;
        currentRotX += (targetRotX - currentRotX) * 0.05;
        earthGroup.rotation.y = autoRotate + currentRotY;
        earthGroup.rotation.x = currentRotX;
      } else {
        earthGroup.rotation.y = 0.3;
        earthGroup.rotation.x = 0.2;
      }

      // Pulse rings breathing
      const t = clock.getElapsedTime();
      ringMeshes.forEach((ring, i) => {
        const s = 1 + Math.sin(t * 2 + i) * 0.3;
        ring.scale.set(s, s, 1);
        ring.material.opacity = 0.5 - Math.sin(t * 2 + i) * 0.2;
      });

      // Arc pulses
      arcPulses.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const pos = p.curve.getPoint(p.progress);
        p.mesh.position.copy(pos);
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}