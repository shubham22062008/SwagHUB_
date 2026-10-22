/**
 * SwagHUB Hyperspace Fabric & Chrome Tunnel Transition
 * Accelerates camera through the opened zipper into the editorial homepage.
 */

class SwagHubTunnelTransition {
  constructor() {
    this.overlay = document.getElementById("tunnel-transition-overlay");
    this.mainNav = document.getElementById("main-nav");
    this.mainContent = document.getElementById("main-content");
    this.heroSection = document.getElementById("hero-section");
    this.isTransitioning = false;
  }

  startTransition() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Play cinematic whoosh sound
    if (window.audioEngine) {
      window.audioEngine.playTunnelWhoosh();
    }

    // Notify 3D hero scene
    if (window.swagHero3D) {
      window.swagHero3D.tunnelTransitionActive = true;
    }

    // 1. Zoom camera in Three.js
    if (window.swagHero3D && window.swagHero3D.camera) {
      gsap.to(window.swagHero3D.camera.position, {
        z: 0.8,
        y: -0.2,
        duration: 1.2,
        ease: "power3.inOut"
      });
    }

    // 2. Animate Tunnel Flash & Hyperspace Overlay
    if (this.overlay) {
      this.overlay.classList.remove("pointer-events-none", "opacity-0");
      this.overlay.classList.add("opacity-100");
    }

    // 3. Staggered reveal of main homepage panels
    setTimeout(() => {
      // Reveal main navigation
      if (this.mainNav) {
        this.mainNav.classList.remove("-translate-y-full", "opacity-0");
        this.mainNav.classList.add("translate-y-0", "opacity-100");
      }

      // Smooth scroll past hero into main editorial masthead
      if (this.mainContent) {
        this.mainContent.scrollIntoView({ behavior: "smooth" });
      }

      // Hide overlay
      setTimeout(() => {
        if (this.overlay) {
          this.overlay.classList.add("opacity-0", "pointer-events-none");
          this.overlay.classList.remove("opacity-100");
        }

        // Animate initial entrance of homepage cards
        if (typeof gsap !== "undefined") {
          gsap.from(".editorial-panel", {
            y: 60,
            opacity: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: "power3.out"
          });
        }
      }, 500);

    }, 850);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.tunnelTransition = new SwagHubTunnelTransition();
});
