/**
 * SwagHUB Main Application Orchestrator
 * Product grid filtering, 3D card tilt, product detail modal with 360 viewer, newsletter VIP generator, and toast notifications.
 */

class SwagHubApp {
  constructor() {
    this.currentCategory = "all";
    this.activeProductModal = null;
    this.activeModalView = "front";
    this.selectedModalSize = "L";

    this.init();
  }

  init() {
    this.renderProductGrid();
    this.setupCategoryFilters();
    this.setupAudioHUD();
    this.setupCardTiltEffects();
    this.setupNewsletter();
    this.setupNavbarScroll();
    this.setupSizingModal();
  }

  setupAudioHUD() {
    const soundToggleBtn = document.getElementById("audio-toggle-btn");
    const soundVisualizer = document.getElementById("audio-visualizer-bars");

    if (soundToggleBtn) {
      soundToggleBtn.addEventListener("click", () => {
        const isUnmuted = window.audioEngine.toggleSound();
        const textLabel = document.getElementById("audio-status-label");
        if (textLabel) {
          textLabel.innerText = isUnmuted ? "AUDIO // 432Hz ON" : "AUDIO // MUTED";
        }
        if (soundToggleBtn) {
          soundToggleBtn.classList.toggle("text-emerald-400", isUnmuted);
        }
      });
    }

    const updateVisualizer = () => {
      if (window.audioEngine && soundVisualizer) {
        const data = window.audioEngine.getVisualizerData();
        const bars = soundVisualizer.querySelectorAll("span");
        bars.forEach((bar, i) => {
          const val = data[i] || 0;
          const height = Math.max(3, (val / 255) * 16);
          bar.style.height = `${height}px`;
        });
      }
      requestAnimationFrame(updateVisualizer);
    };
    updateVisualizer();
  }

  setupNavbarScroll() {
    const nav = document.getElementById("main-nav");
    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        if (nav) {
          nav.classList.remove("-translate-y-full", "opacity-0");
          nav.classList.add("translate-y-0", "opacity-100", "bg-black/90", "backdrop-blur-md");
        }
      }
    }, { passive: true });
  }

  setupCategoryFilters() {
    const buttons = document.querySelectorAll(".category-filter-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => {
          b.classList.remove("bg-white", "text-black");
          b.classList.add("bg-zinc-900", "text-zinc-400");
        });
        btn.classList.add("bg-white", "text-black");
        btn.classList.remove("bg-zinc-900", "text-zinc-400");

        this.currentCategory = btn.getAttribute("data-category");
        this.renderProductGrid();
        if (window.audioEngine) window.audioEngine.playMetallicClick();
      });
    });
  }

  renderProductGrid() {
    const grid = document.getElementById("products-grid");
    if (!grid || !window.SWAGHUB_PRODUCTS) return;

    const filtered = this.currentCategory === "all"
      ? window.SWAGHUB_PRODUCTS
      : window.SWAGHUB_PRODUCTS.filter(p => p.category === this.currentCategory);

    grid.innerHTML = filtered.map(product => `
      <div class="product-card group relative bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden p-5 flex flex-col justify-between transition-all duration-500 hover:border-zinc-500 hover:shadow-2xl hover:shadow-black" data-product-id="${product.id}">
        
        <div class="card-sheen pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>

        <div class="flex items-center justify-between z-10">
          <span class="px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase bg-zinc-900 border border-zinc-700 text-zinc-300 rounded font-semibold">
            ${product.badge}
          </span>
          <span class="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full ${product.stock < 20 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}"></span>
            ${product.stock} PIECES LEFT
          </span>
        </div>

        <div class="relative w-full h-72 my-4 flex items-center justify-center cursor-pointer select-none" onclick="window.app.openProductModal('${product.id}')">
          <div class="card-front-view absolute inset-0 transition-opacity duration-300 group-hover:opacity-0 flex items-center justify-center p-2">
            ${product.svgViews.front}
          </div>
          <div class="card-back-view absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center p-2">
            ${product.svgViews.back}
          </div>

          <div class="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-md border border-zinc-700 rounded-full text-[10px] font-mono text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            360° INSPECT // FLIP
          </div>
        </div>

        <div class="z-10 space-y-3">
          <div>
            <div class="flex items-baseline justify-between">
              <h3 class="font-syne font-bold text-lg text-white uppercase tracking-wider group-hover:text-zinc-200 transition-colors">
                ${product.name}
              </h3>
              <span class="font-mono font-bold text-base text-white">
                $${product.price}
              </span>
            </div>
            <p class="text-xs text-zinc-400 line-clamp-1 mt-0.5">
              ${product.tagline}
            </p>
          </div>

          <div class="pt-2 border-t border-zinc-900 flex items-center gap-2">
            <div class="flex-1 flex gap-1">
              ${product.sizes.map(size => `
                <button 
                  onclick="event.stopPropagation(); window.bag.addItem('${product.id}', '${size}')"
                  class="flex-1 py-1.5 bg-zinc-900 hover:bg-white hover:text-black border border-zinc-800 text-zinc-300 text-[11px] font-mono font-bold rounded transition-colors"
                  title="Add size ${size} to bag">
                  ${size}
                </button>
              `).join("")}
            </div>

            <button 
              onclick="event.stopPropagation(); window.app.openProductModal('${product.id}')"
              class="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-mono"
              aria-label="View Details">
              ℹ
            </button>
          </div>
        </div>

      </div>
    `).join("");

    this.setupCardTiltEffects();
  }

  setupCardTiltEffects() {
    const cards = document.querySelectorAll(".product-card");
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    });
  }

  openProductModal(productId) {
    const product = window.SWAGHUB_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    this.activeProductModal = product;
    this.activeModalView = "front";
    this.selectedModalSize = product.sizes[0];

    const modal = document.getElementById("product-detail-modal");
    if (!modal) return;

    this.renderModalContent();
    modal.classList.remove("hidden");

    if (window.audioEngine) window.audioEngine.playMetallicClick();
  }

  setModalView(view) {
    this.activeModalView = view;
    this.renderModalContent();
    if (window.audioEngine) window.audioEngine.playMetallicClick();
  }

  setModalSize(size) {
    this.selectedModalSize = size;
    this.renderModalContent();
    if (window.audioEngine) window.audioEngine.playMetallicClick();
  }

  renderModalContent() {
    const product = this.activeProductModal;
    if (!product) return;

    const modalBody = document.getElementById("product-modal-content");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        <div class="flex flex-col items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
          <div class="flex gap-2 z-10 mb-4">
            <button onclick="window.app.setModalView('front')" class="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded ${this.activeModalView === 'front' ? 'bg-white text-black font-bold' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}">
              FRONT VIEW
            </button>
            <button onclick="window.app.setModalView('back')" class="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded ${this.activeModalView === 'back' ? 'bg-white text-black font-bold' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}">
              BACK VIEW
            </button>
            <button onclick="window.app.setModalView('detail')" class="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded ${this.activeModalView === 'detail' ? 'bg-white text-black font-bold' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}">
              MACRO DETAIL
            </button>
          </div>

          <div class="w-full h-80 flex items-center justify-center p-4">
            ${product.svgViews[this.activeModalView]}
          </div>

          <div class="w-full grid grid-cols-2 gap-3 pt-4 border-t border-zinc-900 text-center font-mono text-xs">
            <div class="p-2 bg-zinc-900/60 rounded">
              <span class="text-zinc-500 block text-[10px]">WEIGHT SPEC</span>
              <span class="text-white font-bold">${product.weight}</span>
            </div>
            <div class="p-2 bg-zinc-900/60 rounded">
              <span class="text-zinc-500 block text-[10px]">RATING</span>
              <span class="text-white font-bold">${product.temperatureRating}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-between space-y-6">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono text-zinc-500 tracking-widest uppercase">${product.code} /// ${product.category}</span>
              <span class="text-xs font-mono text-emerald-400 font-bold">● IN STOCK (${product.stock} UNITS)</span>
            </div>
            <h2 class="text-2xl lg:text-3xl font-syne font-black text-white uppercase tracking-wider mt-1">${product.name}</h2>
            <div class="text-2xl font-mono font-bold text-white mt-2">$${product.price}.00 USD</div>
            <p class="text-sm text-zinc-300 mt-4 leading-relaxed">${product.description}</p>

            <div class="mt-5 space-y-2">
              <span class="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">TECHNICAL SPECIFICATIONS</span>
              <ul class="space-y-1.5 font-mono text-xs text-zinc-300">
                ${product.specs.map(spec => `
                  <li class="flex items-start gap-2">
                    <span class="text-emerald-400">▹</span>
                    <span>${spec}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
          </div>

          <div class="space-y-4 pt-4 border-t border-zinc-800">
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-mono text-zinc-400 uppercase font-bold">SELECT SIZE</span>
                <button onclick="window.app.openSizingModal()" class="text-xs font-mono text-zinc-400 hover:text-white underline">VIEW SIZE GUIDE</button>
              </div>

              <div class="flex gap-2">
                ${product.sizes.map(size => `
                  <button 
                    onclick="window.app.setModalSize('${size}')"
                    class="flex-1 py-2.5 rounded font-mono font-bold text-xs uppercase tracking-wider transition-colors ${this.selectedModalSize === size ? 'bg-white text-black shadow-lg' : 'bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-zinc-500'}">
                    ${size}
                  </button>
                `).join("")}
              </div>
            </div>

            <div class="flex gap-3">
              <button 
                onclick="window.bag.addItem('${product.id}', '${this.selectedModalSize}'); document.getElementById('product-detail-modal').classList.add('hidden')"
                class="flex-1 py-3.5 bg-white text-black font-syne font-bold text-sm uppercase tracking-widest rounded hover:bg-zinc-200 transition-colors shadow-2xl flex items-center justify-center gap-2">
                <span>ADD TO SHOPPING BAG</span>
                <span class="font-mono font-normal">($${product.price})</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  setupNewsletter() {
    const form = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("newsletter-email");
    const codeDisplay = document.getElementById("generated-vip-code");

    if (form && emailInput) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (!email) return;

        const vipCode = `SWAG-${Math.floor(1000 + Math.random() * 9000)}-VIP`;
        if (codeDisplay) {
          codeDisplay.innerText = vipCode;
          document.getElementById("vip-code-container").classList.remove("hidden");
        }

        this.showToast(`VIP ACCESS CODE GENERATED: ${vipCode}`);
        if (window.audioEngine) window.audioEngine.playBagAdd();
        emailInput.value = "";
      });
    }
  }

  setupSizingModal() {
    const modal = document.getElementById("sizing-modal");
    const closeBtn = document.getElementById("close-sizing-modal");
    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    }
  }

  openSizingModal() {
    const modal = document.getElementById("sizing-modal");
    if (modal) modal.classList.remove("hidden");
    if (window.audioEngine) window.audioEngine.playMetallicClick();
  }

  showToast(message) {
    const toast = document.getElementById("toast-notification");
    const toastText = document.getElementById("toast-text");
    if (!toast || !toastText) return;

    toastText.innerText = message;
    toast.classList.remove("translate-y-20", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.add("translate-y-20", "opacity-0");
      toast.classList.remove("translate-y-0", "opacity-100");
    }, 3800);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.app = new SwagHubApp();
});
