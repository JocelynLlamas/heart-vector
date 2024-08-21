import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-heart',
  standalone: true,
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.scss']
})
export class HeartComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private heart!: THREE.Mesh;

  ngOnInit(): void {
    // Initialization can be done here if necessary
  }

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
  }

  private initThree() {
    // Crear la escena
    this.scene = new THREE.Scene();

    // Configurar el renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Configurar la cámara
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 15);
    this.scene.add(this.camera);

    // Configurar los controles
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;

    // Añadir luz ambiental y luz puntual
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Luz ambiental más intensa
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(10, 10, 10);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.7); // Luz secundaria más suave
    pointLight2.position.set(-10, -10, 10);
    this.scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 0.5); // Luz desde el frente
    pointLight3.position.set(0, 0, 10);
    this.scene.add(pointLight3);

    // Añadir una luz direccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    this.scene.add(directionalLight);

    // Añadir un reflector
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 10, 10);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.2;
    spotLight.decay = 2;
    spotLight.distance = 50;
    spotLight.castShadow = true;
    this.scene.add(spotLight);

    // Crear la geometría del corazón
    const heartShape = this.createHeartShape();
    const extrudeSettings = { depth: 1, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.3, bevelSegments: 3 };
    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

    // Cargar la textura y ajustar su mapeo
    const loader = new THREE.TextureLoader();
    const texture = loader.load('textures/heart.jpeg', (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1); // Ajusta el número de repeticiones de la textura si es necesario
      texture.offset.set(0.5, 0.5); // Ajusta el desplazamiento de la textura si es necesario
    });

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sideMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Material rojo para los lados
    const materials = [material, sideMaterial];
    // Crear la malla del corazón
    this.heart = new THREE.Mesh(geometry, materials);

    // Ajustes de posición y rotación para centrar y orientar el corazón
    this.heart.position.set(0, 0, 0); // Ajustar la posición Y para centrar
    this.heart.rotation.x = Math.PI;   // Rotar 180 grados en el eje X para que no esté al revés
    this.scene.add(this.heart);
  }

  // Método para crear la forma del corazón
  private createHeartShape(): THREE.Shape {
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();

    heartShape.moveTo(x + 2.5, y + 2.5);
    heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    heartShape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    heartShape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    heartShape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 5.5, x + 8, y + 3.5);
    heartShape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    heartShape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    return heartShape;
  }

  // Método de animación
  private animate() {
    requestAnimationFrame(() => this.animate());
    this.heart.rotation.y += 0.01;  // Rotar el corazón
    this.renderer.render(this.scene, this.camera);
  }

  // Ajuste del tamaño de la ventana
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
