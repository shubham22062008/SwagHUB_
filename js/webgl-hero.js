/**
 * SwagHUB 3D WebGL Hero Experience
 * Floating 3D technical bomber jacket, studio spotlight parallax, and interactive zipper mechanics.
 */

class SwagHubHero3D {
  constructor() {
    this.container = document.getElementById("hero-canvas-container");
    this.canvas = document.getElementById("hero-canvas");
    this.zipperProgress = 0; // 0 (closed) to 1 (fully open)
    this.targetProgress = 0;
    this.isDraggingZipper = false;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.lastZipperSoundStep = 0;
    this.sceneReady = false;

    if (this.canvas) {
      this.init();
    }
  }

  init() {
    // 1. Scene & Renderer
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050507, 0.045);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0.2, 4.8);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Studio Lighting
    this.setupLighting();

    // 3. 3D Procedural Bomber Jacket
    this.buildBomberJacket();

    // 4. Floating Atmospheric Dust/Fog
    this.buildAtmosphere();

    // 5. Event Listeners
    this.bindEvents();

    this.sceneReady = true;
    this.animate();
  }

  setupLighting() {
    // Soft dark ambient
    const ambientLight = new THREE.AmbientLight(0x18181f, 1.2);
    this.scene.add(ambientLight);

    // Primary Studio Key Spotlight
    this.keySpot = new THREE.SpotLight(0xffffff, 8.5);
    this.keySpot.position.set(2.5, 4.0, 3.5);
    this.keySpot.angle = Math.PI / 4.5;
    this.keySpot.penumbra = 0.8;
    this.keySpot.castShadow = true;
    this.scene.add(this.keySpot);

    // Cool Cyan-Silver Rim Light (Edge definition)
    this.rimLight1 = new THREE.DirectionalLight(0xd1d5db, 4.5);
    this.rimLight1.position.set(-3.5, 2.0, -2.5);
    this.scene.add(this.rimLight1);

    // Warm Chrome Specular Accent
    this.rimLight2 = new THREE.DirectionalLight(0xf59e0b, 1.8);
    this.rimLight2.position.set(3.5, -1.5, -2.0);
    this.scene.add(this.rimLight2);

    // Bottom soft ground fill
    const groundLight = new THREE.DirectionalLight(0x0f172a, 1.0);
    groundLight.position.set(0, -4, 2);
    this.scene.add(groundLight);
  }

  createPatchTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    // Dark woven background
    ctx.fillStyle = "#0c0c0e";
    ctx.fillRect(0, 0, 512, 256);

    // Stitched Border
    ctx.strokeStyle = "#3f3f46";
    ctx.lineWidth = 6;
    ctx.setLineDash([12, 8]);
    ctx.strokeRect(12, 12, 488, 232);

    // Inner panel
    ctx.fillStyle = "#18181b";
    ctx.fillRect(24, 24, 464, 208);

    // Logo Typography
    ctx.fillStyle = "#f4f4f5";
    ctx.font = "900 42px sans-serif";
    ctx.fillText("SWAGHUB", 45, 90);

    ctx.fillStyle = "#8e8e93";
    ctx.font = "700 24px monospace";
    ctx.fillText("SPEC-01 // SIGNAL CORP", 45, 135);

    ctx.fillStyle = "#ef4444";
    ctx.font = "700 18px monospace";
    ctx.fillText("● TOKYO / BERLIN", 45, 175);

    // Barcode Graphic
    ctx.fillStyle = "#d4d4d8";
    const startX = 330;
    const widths = [4, 8, 3, 10, 4, 12, 3, 7, 10, 4, 8, 3, 14, 5, 8];
    let curX = startX;
    widths.forEach(w => {
      ctx.fillRect(curX, 55, w, 90);
      curX += w + 4;
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
  }

  buildBomberJacket() {
    this.jacketGroup = new THREE.Group();

    // High-end Technical Fabric Material
    this.fabricMaterial = new THREE.MeshStandardMaterial({
      color: 0x121215,
      roughness: 0.65,
      metalness: 0.15,
      bumpScale: 0.05
    });

    // Ribbed Trim Material (Collar, Hem, Cuffs)
    this.ribMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1f,
      roughness: 0.9,
      metalness: 0.05
    });

    // 3M Reflective Piping Material
    this.reflectiveMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x3f3f46,
      emissiveIntensity: 0.35
    });

    // Chrome Metal Material (Zipper Teeth & Slider)
    this.chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.18,
      metalness: 0.95
    });

    // 1. Torso Panels (Left & Right Split for Unzipping)
    const torsoGeo = new THREE.CylinderGeometry(0.78, 0.72, 1.6, 24, 1, false, 0, Math.PI);
    
    // Left Chest Panel
    this.leftTorso = new THREE.Mesh(torsoGeo, this.fabricMaterial);
    this.leftTorso.position.set(-0.38, 0, 0);
    this.leftTorso.rotation.y = -Math.PI / 2;
    this.leftTorso.castShadow = true;
    this.leftTorso.receiveShadow = true;
    this.jacketGroup.add(this.leftTorso);

    // Right Chest Panel
    this.rightTorso = new THREE.Mesh(torsoGeo, this.fabricMaterial);
    this.rightTorso.position.set(0.38, 0, 0);
    this.rightTorso.rotation.y = Math.PI / 2;
    this.rightTorso.castShadow = true;
    this.rightTorso.receiveShadow = true;
    this.jacketGroup.add(this.rightTorso);

    // Back Shell (Connects both sides)
    const backGeo = new THREE.CylinderGeometry(0.79, 0.73, 1.6, 24, 1, false, Math.PI * 0.9, Math.PI * 1.2);
    const backMesh = new THREE.Mesh(backGeo, this.fabricMaterial);
    backMesh.position.set(0, 0, -0.05);
    this.jacketGroup.add(backMesh);

    // 2. Sleeves
    const sleeveGeo = new THREE.CylinderGeometry(0.28, 0.20, 1.45, 18);
    
    // Left Sleeve
    const leftSleeve = new THREE.Mesh(sleeveGeo, this.fabricMaterial);
    leftSleeve.position.set(-1.0, 0.15, 0.05);
    leftSleeve.rotation.z = Math.PI / 5.5;
    leftSleeve.rotation.x = 0.1;
    this.jacketGroup.add(leftSleeve);

    // Left Arm Utility Pocket
    const pocketGeo = new THREE.BoxGeometry(0.18, 0.28, 0.1);
    const pocketMesh = new THREE.Mesh(pocketGeo, this.fabricMaterial);
    pocketMesh.position.set(-1.24, 0.22, 0.08);
    pocketMesh.rotation.z = Math.PI / 5.5;
    this.jacketGroup.add(pocketMesh);

    // Red flight ribbon tag
    const ribbonGeo = new THREE.BoxGeometry(0.04, 0.22, 0.01);
    const ribbonMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.position.set(-1.32, 0.06, 0.12);
    ribbon.rotation.z = Math.PI / 6;
    this.jacketGroup.add(ribbon);

    // Right Sleeve
    const rightSleeve = new THREE.Mesh(sleeveGeo, this.fabricMaterial);
    rightSleeve.position.set(1.0, 0.15, 0.05);
    rightSleeve.rotation.z = -Math.PI / 5.5;
    rightSleeve.rotation.x = 0.1;
    this.jacketGroup.add(rightSleeve);

    // 3. Ribbed Collar, Cuffs & Waist Hem
    const collarGeo = new THREE.TorusGeometry(0.52, 0.08, 12, 32);
    const collar = new THREE.Mesh(collarGeo, this.ribMaterial);
    collar.position.set(0, 0.85, 0);
    collar.rotation.x = Math.PI / 2.2;
    this.jacketGroup.add(collar);

    const hemGeo = new THREE.CylinderGeometry(0.74, 0.74, 0.18, 28);
    const hem = new THREE.Mesh(hemGeo, this.ribMaterial);
    hem.position.set(0, -0.88, 0);
    this.jacketGroup.add(hem);

    const cuffGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.14, 18);
    const leftCuff = new THREE.Mesh(cuffGeo, this.ribMaterial);
    leftCuff.position.set(-1.42, -0.52, 0.15);
    leftCuff.rotation.z = Math.PI / 5.5;
    this.jacketGroup.add(leftCuff);

    const rightCuff = new THREE.Mesh(cuffGeo, this.ribMaterial);
    rightCuff.position.set(1.42, -0.52, 0.15);
    rightCuff.rotation.z = -Math.PI / 5.5;
    this.jacketGroup.add(rightCuff);

    // 4. Embroidered SwagHUB Tactical Patch on Right Chest
    const patchTexture = this.createPatchTexture();
    const patchGeo = new THREE.PlaneGeometry(0.38, 0.19);
    const patchMat = new THREE.MeshStandardMaterial({
      map: patchTexture,
      roughness: 0.5,
      metalness: 0.1
    });
    const patchMesh = new THREE.Mesh(patchGeo, patchMat);
    patchMesh.position.set(0.36, 0.32, 0.76);
    patchMesh.rotation.y = 0.25;
    this.jacketGroup.add(patchMesh);

    // 5. 3M Reflective Trim Curves
    const trimGeo = new THREE.TorusGeometry(0.79, 0.015, 8, 32, Math.PI);
    const leftTrim = new THREE.Mesh(trimGeo, this.reflectiveMaterial);
    leftTrim.position.set(0, 0, 0);
    leftTrim.rotation.z = Math.PI / 2;
    leftTrim.rotation.y = 0.4;
    this.jacketGroup.add(leftTrim);

    // 6. Interactive Center Zipper System
    this.buildZipper();

    this.scene.add(this.jacketGroup);
  }

  buildZipper() {
    this.zipperGroup = new THREE.Group();
    this.teethCount = 38;
    this.teethMeshes = [];
    const toothGeo = new THREE.BoxGeometry(0.024, 0.016, 0.02);

    for (let i = 0; i < this.teethCount; i++) {
      const y = 0.78 - (i / (this.teethCount - 1)) * 1.56;
      
      // Left tooth
      const leftTooth = new THREE.Mesh(toothGeo, this.chromeMaterial);
      leftTooth.position.set(-0.018, y, 0.78);
      this.zipperGroup.add(leftTooth);

      // Right tooth
      const rightTooth = new THREE.Mesh(toothGeo, this.chromeMaterial);
      rightTooth.position.set(0.018, y, 0.78);
      this.zipperGroup.add(rightTooth);

      this.teethMeshes.push({ left: leftTooth, right: rightTooth, origY: y });
    }

    // Heavy Metal Pull Slider
    const sliderGeo = new THREE.BoxGeometry(0.07, 0.12, 0.08);
    this.zipperSlider = new THREE.Mesh(sliderGeo, this.chromeMaterial);
    this.zipperSlider.position.set(0, 0.78, 0.81);

    // Pull Tab
    const tabGeo = new THREE.BoxGeometry(0.05, 0.16, 0.015);
    const tabMesh = new THREE.Mesh(tabGeo, this.chromeMaterial);
    tabMesh.position.set(0, -0.12, 0.02);
    this.zipperSlider.add(tabMesh);

    const ringGeo = new THREE.TorusGeometry(0.025, 0.008, 8, 16);
    const ringMesh = new THREE.Mesh(ringGeo, this.chromeMaterial);
    ringMesh.position.set(0, -0.21, 0.02);
    this.zipperSlider.add(ringMesh);

    this.zipperGroup.add(this.zipperSlider);
    this.jacketGroup.add(this.zipperGroup);
  }

  buildAtmosphere() {
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 6;
      scales[i / 3] = Math.random() * 0.04 + 0.01;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      color: 0x8e8e93,
      size: 0.045,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    this.dustParticles = new THREE.Points(geometry, material);
    this.scene.add(this.dustParticles);
  }

  setZipperProgress(val) {
    this.targetProgress = Math.max(0, Math.min(1, val));
    
    // Play sound click on teeth threshold
    const currentStep = Math.floor(this.targetProgress * this.teethCount);
    if (currentStep !== this.lastZipperSoundStep) {
      if (window.audioEngine) {
        window.audioEngine.playZipperClick(1.0 + (this.targetProgress * 0.5));
      }
      this.lastZipperSoundStep = currentStep;
    }

    // Update UI HUD
    const hudPercent = document.getElementById("zipper-percentage");
    if (hudPercent) {
      hudPercent.innerText = `${Math.round(this.targetProgress * 100)}%`;
    }

    // Trigger tunnel transition when zipper reaches end
    if (this.targetProgress >= 0.98 && !this.tunnelTriggered) {
      this.tunnelTriggered = true;
      if (window.tunnelTransition) {
        window.tunnelTransition.startTransition();
      }
    }
  }

  updateZipperVisuals() {
    this.zipperProgress += (this.targetProgress - this.zipperProgress) * 0.12;
    const p = this.zipperProgress;

    // Move slider from top (0.78) to bottom (-0.78)
    const currentY = 0.78 - p * 1.56;
    if (this.zipperSlider) {
      this.zipperSlider.position.y = currentY;
    }

    // Split opened zipper teeth and spread jacket panels
    const openSpread = p * 0.45;
    if (this.leftTorso) {
      this.leftTorso.position.x = -0.38 - openSpread;
      this.leftTorso.rotation.y = -Math.PI / 2 - p * 0.35;
    }
    if (this.rightTorso) {
      this.rightTorso.position.x = 0.38 + openSpread;
      this.rightTorso.rotation.y = Math.PI / 2 + p * 0.35;
    }

    this.teethMeshes.forEach((t, i) => {
      const isUnzipped = t.origY >= currentY;
      if (isUnzipped) {
        const factor = (t.origY - currentY) / 1.56;
        const spreadX = Math.min(0.35, factor * 0.42);
        t.left.position.x = -0.018 - spreadX;
        t.left.rotation.z = -spreadX * 1.2;
        t.right.position.x = 0.018 + spreadX;
        t.right.rotation.z = spreadX * 1.2;
      } else {
        t.left.position.x = -0.018;
        t.left.rotation.z = 0;
        t.right.position.x = 0.018;
        t.right.rotation.z = 0;
      }
    });
  }

  bindEvents() {
    window.addEventListener("resize", () => this.onResize());

    // Mouse Parallax
    window.addEventListener("mousemove", (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Scroll-driven Zipper
    window.addEventListener("wheel", (e) => {
      if (window.scrollY === 0 && !this.tunnelTriggered) {
        const delta = e.deltaY * 0.0012;
        this.setZipperProgress(this.targetProgress + delta);
      }
    }, { passive: true });

    // Drag / Touch Controls on Zipper Slider
    const handleDragStart = (e) => {
      this.isDraggingZipper = true;
      this.startY = e.touches ? e.touches[0].clientY : e.clientY;
      this.startProgress = this.targetProgress;
    };

    const handleDragMove = (e) => {
      if (!this.isDraggingZipper) return;
      const currentY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = (currentY - this.startY) / 320;
      this.setZipperProgress(this.startProgress + deltaY);
    };

    const handleDragEnd = () => {
      this.isDraggingZipper = false;
    };

    window.addEventListener("mousedown", (e) => {
      if (e.target.closest("#hero-action-unzip")) {
        this.setZipperProgress(this.targetProgress + 0.35);
      } else if (e.clientY < window.innerHeight && window.scrollY === 0) {
        handleDragStart(e);
      }
    });

    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);

    window.addEventListener("touchstart", handleDragStart, { passive: true });
    window.addEventListener("touchmove", handleDragMove, { passive: true });
    window.addEventListener("touchend", handleDragEnd);
  }

  onResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    // Smooth mouse interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Floating breathing motion
    if (this.jacketGroup && !this.tunnelTransitionActive) {
      this.jacketGroup.position.y = Math.sin(time * 1.4) * 0.08;
      this.jacketGroup.rotation.y = this.mouse.x * 0.35 + Math.sin(time * 0.6) * 0.06;
      this.jacketGroup.rotation.x = -this.mouse.y * 0.22;
      this.jacketGroup.rotation.z = Math.cos(time * 1.1) * 0.02;
    }

    // Studio Spotlight mouse tracking
    if (this.keySpot) {
      this.keySpot.position.x = 2.5 + this.mouse.x * 1.5;
      this.keySpot.position.y = 4.0 - this.mouse.y * 1.2;
    }

    // Dust particles drift
    if (this.dustParticles) {
      this.dustParticles.rotation.y = time * 0.03;
      this.dustParticles.rotation.x = time * 0.015;
    }

    // Update unzipping visuals
    this.updateZipperVisuals();

    // Render 3D Scene
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.swagHero3D = new SwagHubHero3D();
});
