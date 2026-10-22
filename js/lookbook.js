/**
 * SwagHUB Editorial Lookbook Controller
 * Interactive editorial carousel with garment inspection hotspots and street vs studio mode.
 */

class SwagHubLookbook {
  constructor() {
    this.slides = [
      {
        id: "look-01",
        title: "SCENE 01 // MIDNIGHT METROPOLIS",
        location: "SHIBUYA UNDERPASS - 03:42 AM",
        mode: "NIGHT OPS",
        headline: "WEAR YOUR SIGNAL IN THE STATIC",
        description: "Phantom Zip Bomber layered over Afterimage Hoodie with 3M reflective luminescence activated under sodium streetlights.",
        imageStudio: "assets/img/lookbook_1.jpg",
        hotspots: [
          { top: "35%", left: "48%", label: "Phantom Zip Bomber", productId: "phantom-zip-bomber", price: "$480" },
          { top: "72%", left: "42%", label: "Static Cargo (Charcoal)", productId: "static-cargo", price: "$340" }
        ]
      },
      {
        id: "look-02",
        title: "SCENE 02 // SUBTERRANEAN BERLIN",
        location: "KRAFTWERK SUB-LEVEL 2 - 01:15 AM",
        mode: "HEAVY INDUSTRIAL",
        headline: "CARBON-WASHED GEOMETRY",
        description: "Static Cargo pant with articulated knee pleats and modular magnetic chest rig for rapid zero-weight EDC deployment.",
        hotspots: [
          { top: "30%", left: "52%", label: "Vector Chest Rig", productId: "vector-chest-rig", price: "$185" },
          { top: "65%", left: "54%", label: "Static Cargo (Graphite)", productId: "static-cargo", price: "$340" }
        ]
      },
      {
        id: "look-03",
        title: "SCENE 03 // OBSIDIAN HORIZON",
        location: "KOWLONG ROOFTOP - 05:10 AM",
        mode: "DAWN PATROL",
        headline: "500 GSM VOLCANIC HEAVYWEIGHT",
        description: "Afterimage Hoodie engineered with seamless drop shoulders and double-layered crossover storm collar.",
        hotspots: [
          { top: "32%", left: "50%", label: "Afterimage Hoodie (500GSM)", productId: "afterimage-hoodie", price: "$260" },
          { top: "18%", left: "50%", label: "Void Ribbed Beanie", productId: "void-beanie", price: "$75" }
        ]
      }
    ];

    this.currentIndex = 0;
    this.container = document.getElementById("lookbook-carousel");
    this.prevBtn = document.getElementById("lookbook-prev");
    this.nextBtn = document.getElementById("lookbook-next");
    this.counter = document.getElementById("lookbook-counter");
    
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderSlide();

    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.next());
    }
  }

  renderSlide() {
    const slide = this.slides[this.currentIndex];
    if (!slide) return;

    if (this.counter) {
      this.counter.innerText = `0${this.currentIndex + 1} / 0${this.slides.length}`;
    }

    const titleEl = document.getElementById("lookbook-title");
    const locEl = document.getElementById("lookbook-location");
    const descEl = document.getElementById("lookbook-desc");
    const headlineEl = document.getElementById("lookbook-headline");

    if (titleEl) titleEl.innerText = slide.title;
    if (locEl) locEl.innerText = slide.location;
    if (descEl) descEl.innerText = slide.description;
    if (headlineEl) headlineEl.innerText = slide.headline;

    // Render Editorial Card Viewport
    const viewport = document.getElementById("lookbook-viewport");
    if (viewport) {
      viewport.innerHTML = `
        <div class="relative w-full h-full bg-charcoal-900 border border-zinc-800 rounded-lg overflow-hidden group">
          <!-- Background Atmospheric Fog & Gradient Mockup -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/60 to-black"></div>
          
          <!-- Cinematic Lighting Beam -->
          <div class="absolute -top-20 -left-20 w-80 h-80 bg-zinc-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-zinc-400/20 transition-all duration-700"></div>

          <!-- Editorial Figure Mockup with Vector Garments -->
          <div class="relative w-full h-full flex items-center justify-center p-6 select-none">
            <div class="w-full max-w-sm h-full max-h-[440px] flex flex-col items-center justify-center relative">
              ${this.getLookSvg(this.currentIndex)}
              
              <!-- Interactive Garment Inspect Hotspots -->
              ${slide.hotspots.map((h, i) => `
                <div class="absolute z-20 group/spot" style="top: ${h.top}; left: ${h.left};">
                  <button 
                    onclick="window.app.openProductModal('${h.productId}')"
                    class="relative flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border border-white/60 text-white shadow-xl hover:scale-125 transition-transform duration-300 focus:outline-none"
                    aria-label="Inspect ${h.label}">
                    <span class="absolute w-full h-full rounded-full bg-white/30 animate-ping"></span>
                    <span class="text-xs font-mono font-bold">+</span>
                  </button>

                  <!-- Popover Tooltip -->
                  <div class="absolute left-1/2 bottom-full -translate-x-1/2 mb-3 hidden group-hover/spot:flex flex-col items-center w-48 p-2.5 bg-zinc-950/95 backdrop-blur-md border border-zinc-700 rounded-md shadow-2xl z-30 pointer-events-none">
                    <span class="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">INSPECT PIECE</span>
                    <span class="text-xs font-bold text-white text-center">${h.label}</span>
                    <span class="text-xs font-mono text-emerald-400 font-semibold mt-0.5">${h.price}</span>
                    <div class="w-2 h-2 bg-zinc-950 border-r border-b border-zinc-700 rotate-45 -mb-3.5 mt-1"></div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Scene Tag Overlay -->
          <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span class="px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase bg-black/80 backdrop-blur-md border border-zinc-800 text-zinc-400 rounded">
              CAM // 35MM CINEMASCOPE
            </span>
            <span class="px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase bg-black/80 backdrop-blur-md border border-zinc-800 text-emerald-400 rounded flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ${slide.mode}
            </span>
          </div>
        </div>
      `;
    }
  }

  getLookSvg(index) {
    if (index === 0) {
      return `
        <svg viewBox="0 0 300 400" class="w-full h-full object-contain filter drop-shadow-2xl">
          <ellipse cx="150" cy="50" rx="20" ry="24" fill="#18181b" stroke="#3f3f46"/>
          <path d="M110 75 Q150 90 190 75 L210 180 L90 180 Z" fill="#121214" stroke="#52525b" stroke-width="2"/>
          <path d="M90 75 L60 160 L85 170 L110 100 Z" fill="#18181b" stroke="#3f3f46"/>
          <path d="M190 75 L220 160 L195 170 L170 100 Z" fill="#18181b" stroke="#3f3f46"/>
          <line x1="150" y1="85" x2="150" y2="180" stroke="#f4f4f5" stroke-width="2" stroke-dasharray="4,2"/>
          <path d="M100 180 L140 185 L135 340 L90 340 Z" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
          <path d="M200 180 L160 185 L165 340 L210 340 Z" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
          <rect x="80" y="220" width="25" height="40" rx="3" fill="#27272a"/>
          <rect x="195" y="220" width="25" height="40" rx="3" fill="#27272a"/>
          <polygon points="90,340 135,340 140,365 80,365" fill="#09090b" stroke="#3f3f46"/>
          <polygon points="210,340 165,340 160,365 220,365" fill="#09090b" stroke="#3f3f46"/>
        </svg>
      `;
    } else if (index === 1) {
      return `
        <svg viewBox="0 0 300 400" class="w-full h-full object-contain filter drop-shadow-2xl">
          <ellipse cx="150" cy="50" rx="20" ry="24" fill="#18181b" stroke="#3f3f46"/>
          <polygon points="120,80 180,80 185,160 115,160" fill="#121214" stroke="#3f3f46"/>
          <rect x="125" y="100" width="50" height="45" rx="4" fill="#27272a" stroke="#e4e4e7" stroke-width="1.5"/>
          <circle cx="150" cy="122" r="4" fill="#ef4444"/>
          <path d="M95 160 L145 165 L138 350 L85 350 Z" fill="#222226" stroke="#3f3f46" stroke-width="2"/>
          <path d="M205 160 L155 165 L162 350 L215 350 Z" fill="#222226" stroke="#3f3f46" stroke-width="2"/>
          <path d="M100 210 Q80 270 115 310" stroke="#71717a" stroke-width="2" fill="none"/>
          <path d="M200 210 Q220 270 185 310" stroke="#71717a" stroke-width="2" fill="none"/>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 300 400" class="w-full h-full object-contain filter drop-shadow-2xl">
          <path d="M130 50 Q150 20 170 50 Z" fill="#141416" stroke="#3f3f46"/>
          <ellipse cx="150" cy="55" rx="18" ry="20" fill="#18181b"/>
          <path d="M100 80 Q150 110 200 80 L220 210 L80 210 Z" fill="#27272a" stroke="#52525b" stroke-width="2"/>
          <path d="M80 80 L40 170 L70 180 L100 110 Z" fill="#27272a" stroke="#3f3f46"/>
          <path d="M200 80 L240 170 L210 180 L180 110 Z" fill="#27272a" stroke="#3f3f46"/>
          <polygon points="110,150 190,150 200,205 100,205" fill="#1f1f23" stroke="#3f3f46"/>
          <path d="M95 210 L145 215 L140 360 L90 360 Z" fill="#141416" stroke="#27272a"/>
          <path d="M205 210 L155 215 L160 360 L210 360 Z" fill="#141416" stroke="#27272a"/>
        </svg>
      `;
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.renderSlide();
    if (window.audioEngine) window.audioEngine.playMetallicClick();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.renderSlide();
    if (window.audioEngine) window.audioEngine.playMetallicClick();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.lookbook = new SwagHubLookbook();
});
