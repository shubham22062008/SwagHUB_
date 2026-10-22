/**
 * SwagHUB Magnetic Chrome Cursor Engine
 * Precision ring cursor with smooth acceleration and magnetic element snaps.
 */

class SwagHubCursor {
  constructor() {
    this.cursorRing = document.getElementById("custom-cursor-ring");
    this.cursorDot = document.getElementById("custom-cursor-dot");
    this.pos = { x: -100, y: -100 };
    this.target = { x: -100, y: -100 };

    if (this.cursorRing && !('ontouchstart' in window)) {
      this.init();
    }
  }

  init() {
    window.addEventListener("mousemove", (e) => {
      this.target.x = e.clientX;
      this.target.y = e.clientY;
      if (this.cursorDot) {
        this.cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    });

    document.addEventListener("mouseover", (e) => {
      const interactive = e.target.closest("button, a, input, select, .product-card, .interactive-hover");
      if (interactive && this.cursorRing) {
        this.cursorRing.classList.add("cursor-hover-active");
      }
    });

    document.addEventListener("mouseout", (e) => {
      const interactive = e.target.closest("button, a, input, select, .product-card, .interactive-hover");
      if (interactive && this.cursorRing) {
        this.cursorRing.classList.remove("cursor-hover-active");
      }
    });

    document.addEventListener("mousedown", () => {
      if (this.cursorRing) this.cursorRing.classList.add("scale-75");
    });

    document.addEventListener("mouseup", () => {
      if (this.cursorRing) this.cursorRing.classList.remove("scale-75");
    });

    this.render();
  }

  render() {
    this.pos.x += (this.target.x - this.pos.x) * 0.18;
    this.pos.y += (this.target.y - this.pos.y) * 0.18;

    if (this.cursorRing) {
      this.cursorRing.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
    }

    requestAnimationFrame(() => this.render());
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.customCursor = new SwagHubCursor();
});
