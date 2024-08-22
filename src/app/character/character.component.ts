import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initThreeJS();
  }

  private initThreeJS(): void {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff); // Fondo blanco
    this.canvasContainer.nativeElement.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(15, 20, 30);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    scene.add(new THREE.AmbientLight(0x666666));
    const light = new THREE.PointLight(0xffffff, 3, 0, 0);
    camera.add(light);

    // Crear cuerpo (esfera)
    const bodyGeometry = new THREE.SphereGeometry(5, 32, 32);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 }); // Amarillo
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 5;
    scene.add(body);

    // Crear cabeza (esfera)
    const headGeometry = new THREE.SphereGeometry(3, 32, 32);
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 }); // Amarillo
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 10, 0);
    scene.add(head);

    // Crear ojos
    const eyeGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-1, 11, 3);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(1, 11, 3);
    scene.add(leftEye);
    scene.add(rightEye);

    // Pupilas
    const pupilGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-1, 11, 3.5);
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(1, 11, 3.5);
    scene.add(leftPupil);
    scene.add(rightPupil);

    // Crear pico
    const beakGeometry = new THREE.ConeGeometry(0.7, 1.5, 32);
    const beakMaterial = new THREE.MeshBasicMaterial({ color: 0xFFA500 }); // Naranja
    const beak = new THREE.Mesh(beakGeometry, beakMaterial);
    beak.position.set(0, 9.5, 3);
    beak.rotation.x = Math.PI / 2;
    scene.add(beak);

    // Crear alas
    const wingGeometry = new THREE.BoxGeometry(1, 0.5, 3);
    const wingMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 }); // Amarillo
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-4.5, 5, 0);
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(4.5, 5, 0);
    scene.add(leftWing);
    scene.add(rightWing);

    // Crear mano levantando el dedo índice (cambio del dedo anular al índice)
    const handGeometry = new THREE.BoxGeometry(3, 0.7, 2);
    const handMaterial = new THREE.MeshBasicMaterial({ color: 0xFFA500 });
    const hand = new THREE.Mesh(handGeometry, handMaterial);
    hand.position.set(3, 5, 5);
    scene.add(hand);

    const fingerGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3, 32);
    const fingerMaterial = new THREE.MeshBasicMaterial({ color: 0xFFA500 });
    const finger = new THREE.Mesh(fingerGeometry, fingerMaterial);
    finger.position.set(3, 6.8, 5);
    finger.rotation.z = -Math.PI / 2;
    scene.add(finger);

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
