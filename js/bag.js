/**
 * SwagHUB Shopping Bag & Checkout Engine
 * Slide-over drawer, quantity adjustments, free shipping progress bar, promo vouchers, and 3-step checkout simulation.
 */

class SwagHubBag {
  constructor() {
    this.items = [];
    this.discount = 0; // percentage
    this.appliedPromo = null;
    this.freeShippingThreshold = 300;
    this.shippingCost = 25;
    
    this.drawer = document.getElementById("shopping-bag-drawer");
    this.backdrop = document.getElementById("bag-backdrop");
    this.bagItemsContainer = document.getElementById("bag-items-list");
    this.bagSubtotalEl = document.getElementById("bag-subtotal");
    this.bagTotalEl = document.getElementById("bag-total");
    this.bagCountBadges = document.querySelectorAll(".bag-count-badge");
    this.shippingProgress = document.getElementById("shipping-progress-bar");
    this.shippingNotice = document.getElementById("shipping-threshold-notice");

    this.init();
  }

  init() {
    try {
      const saved = localStorage.getItem("swaghub_cart");
      if (saved) {
        this.items = JSON.parse(saved);
      }
    } catch (e) {}

    if (this.items.length === 0) {
      this.items.push({
        id: "phantom-zip-bomber",
        name: "Phantom Zip Bomber",
        size: "L",
        price: 480,
        qty: 1,
        color: "Pitch Black",
        code: "SH-JKT-01"
      });
    }

    this.render();
    this.bindEvents();
  }

  bindEvents() {
    const openBtns = document.querySelectorAll(".open-bag-btn");
    openBtns.forEach(btn => {
      btn.addEventListener("click", () => this.open());
    });

    const closeBtns = document.querySelectorAll(".close-bag-btn");
    closeBtns.forEach(btn => {
      btn.addEventListener("click", () => this.close());
    });

    if (this.backdrop) {
      this.backdrop.addEventListener("click", () => this.close());
    }

    const promoBtn = document.getElementById("apply-promo-btn");
    const promoInput = document.getElementById("promo-input");
    if (promoBtn && promoInput) {
      promoBtn.addEventListener("click", () => {
        const code = promoInput.value.trim().toUpperCase();
        this.applyPromoCode(code);
      });
    }

    const checkoutBtn = document.getElementById("proceed-checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        this.openCheckoutModal();
      });
    }
  }

  addItem(productId, size = "L", qty = 1) {
    const product = window.SWAGHUB_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.items.findIndex(item => item.id === productId && item.size === size);
    if (existingIndex > -1) {
      this.items[existingIndex].qty += qty;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        size: size,
        price: product.price,
        qty: qty,
        color: product.color,
        code: product.code
      });
    }

    this.save();
    this.render();
    this.open();

    if (window.audioEngine) {
      window.audioEngine.playBagAdd();
    }

    if (window.app) {
      window.app.showToast(`ADDED: ${product.name} [SIZE ${size}]`);
    }
  }

  updateQty(index, delta) {
    if (!this.items[index]) return;
    this.items[index].qty += delta;
    if (this.items[index].qty <= 0) {
      this.items.splice(index, 1);
    }
    this.save();
    this.render();
    if (window.audioEngine) window.audioEngine.playMetallicClick();
  }

  removeItem(index) {
    if (!this.items[index]) return;
    this.items.splice(index, 1);
    this.save();
    this.render();
    if (window.audioEngine) window.audioEngine.playMetallicClick();
  }

  applyPromoCode(code) {
    const feedback = document.getElementById("promo-feedback");
    if (code === "NIGHTSHIFT10" || code === "VIP10") {
      this.discount = 10;
      this.appliedPromo = code;
      if (feedback) {
        feedback.innerText = "✓ PROMO 'NIGHTSHIFT10' APPLIED (10% OFF)";
        feedback.className = "text-[11px] font-mono text-emerald-400 mt-1 block";
      }
      this.render();
      if (window.audioEngine) window.audioEngine.playBagAdd();
    } else if (code === "DROP001" || code === "SIGNAL20") {
      this.discount = 20;
      this.appliedPromo = code;
      if (feedback) {
        feedback.innerText = "✓ VIP CODE APPLIED (20% OFF ORDER)";
        feedback.className = "text-[11px] font-mono text-emerald-400 mt-1 block";
      }
      this.render();
      if (window.audioEngine) window.audioEngine.playBagAdd();
    } else {
      if (feedback) {
        feedback.innerText = "✕ INVALID SIGNAL CODE. TRY 'NIGHTSHIFT10'";
        feedback.className = "text-[11px] font-mono text-rose-400 mt-1 block";
      }
    }
  }

  save() {
    try {
      localStorage.setItem("swaghub_cart", JSON.stringify(this.items));
    } catch (e) {}
  }

  open() {
    if (this.drawer && this.backdrop) {
      this.drawer.classList.remove("translate-x-full");
      this.backdrop.classList.remove("opacity-0", "pointer-events-none");
      this.backdrop.classList.add("opacity-100");
    }
    if (window.audioEngine) window.audioEngine.playMetallicClick();
  }

  close() {
    if (this.drawer && this.backdrop) {
      this.drawer.classList.add("translate-x-full");
      this.backdrop.classList.add("opacity-0", "pointer-events-none");
      this.backdrop.classList.remove("opacity-100");
    }
    if (window.audioEngine) window.audioEngine.playMetallicClick();
  }

  render() {
    const totalCount = this.items.reduce((acc, item) => acc + item.qty, 0);
    this.bagCountBadges.forEach(badge => {
      badge.innerText = totalCount;
      if (totalCount > 0) {
        badge.classList.remove("scale-0");
        badge.classList.add("scale-100");
      } else {
        badge.classList.add("scale-0");
      }
    });

    const rawSubtotal = this.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discountAmount = (rawSubtotal * this.discount) / 100;
    const subtotalAfterDiscount = rawSubtotal - discountAmount;
    const isFreeShipping = subtotalAfterDiscount >= this.freeShippingThreshold || this.items.length === 0;
    const activeShipping = isFreeShipping ? 0 : this.shippingCost;
    const grandTotal = subtotalAfterDiscount + activeShipping;

    if (this.shippingProgress && this.shippingNotice) {
      const percentage = Math.min(100, (subtotalAfterDiscount / this.freeShippingThreshold) * 100);
      this.shippingProgress.style.width = `${percentage}%`;
      if (subtotalAfterDiscount >= this.freeShippingThreshold) {
        this.shippingNotice.innerHTML = `<span class="text-emerald-400 font-bold">✓ YOU UNLOCKED FREE WORLDWIDE EXPRESS DISPATCH</span>`;
      } else {
        const remaining = this.freeShippingThreshold - subtotalAfterDiscount;
        this.shippingNotice.innerHTML = `ADD <span class="text-white font-bold">$${remaining.toFixed(0)}</span> MORE FOR FREE EXPRESS DISPATCH`;
      }
    }

    if (this.bagSubtotalEl) {
      this.bagSubtotalEl.innerText = `$${rawSubtotal.toFixed(2)}`;
    }
    if (this.bagTotalEl) {
      this.bagTotalEl.innerText = `$${grandTotal.toFixed(2)}`;
    }

    const discountRow = document.getElementById("bag-discount-row");
    const discountVal = document.getElementById("bag-discount-amount");
    if (discountRow && discountVal) {
      if (this.discount > 0) {
        discountRow.classList.remove("hidden");
        discountVal.innerText = `-$${discountAmount.toFixed(2)} (${this.discount}%)`;
      } else {
        discountRow.classList.add("hidden");
      }
    }

    const shippingRowVal = document.getElementById("bag-shipping-amount");
    if (shippingRowVal) {
      shippingRowVal.innerText = isFreeShipping ? "FREE" : `$${this.shippingCost}.00`;
    }

    if (this.bagItemsContainer) {
      if (this.items.length === 0) {
        this.bagItemsContainer.innerHTML = `
          <div class="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-lg my-6">
            <svg class="w-12 h-12 text-zinc-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <p class="text-sm font-mono text-zinc-400 uppercase tracking-wider">YOUR BAG IS EMPTY</p>
            <p class="text-xs text-zinc-600 mt-1">Select pieces from DROP 001 to begin your signal.</p>
          </div>
        `;
        return;
      }

      this.bagItemsContainer.innerHTML = this.items.map((item, idx) => {
        const product = window.SWAGHUB_PRODUCTS.find(p => p.id === item.id) || {};
        return `
          <div class="flex gap-4 p-3.5 bg-zinc-900/60 border border-zinc-800/80 rounded-lg hover:border-zinc-700 transition-colors">
            <div class="w-20 h-24 bg-zinc-950 rounded border border-zinc-800 p-1 flex-shrink-0 flex items-center justify-center cursor-pointer" onclick="window.app.openProductModal('${item.id}')">
              ${product.svgViews ? product.svgViews.front : ""}
            </div>

            <div class="flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between">
                  <h4 class="text-sm font-bold text-white uppercase tracking-wider cursor-pointer hover:text-zinc-300" onclick="window.app.openProductModal('${item.id}')">${item.name}</h4>
                  <button onclick="window.bag.removeItem(${idx})" class="text-zinc-500 hover:text-rose-400 text-xs p-1" aria-label="Remove item">✕</button>
                </div>
                <div class="text-[11px] font-mono text-zinc-400 mt-0.5">SIZE: <span class="text-white">${item.size}</span> // ${item.color}</div>
                <div class="text-[10px] font-mono text-zinc-600">${item.code}</div>
              </div>

              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center border border-zinc-700 rounded bg-zinc-950">
                  <button onclick="window.bag.updateQty(${idx}, -1)" class="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white font-mono text-xs">-</button>
                  <span class="w-7 text-center font-mono text-xs text-white">${item.qty}</span>
                  <button onclick="window.bag.updateQty(${idx}, 1)" class="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white font-mono text-xs">+</button>
                </div>

                <div class="text-sm font-mono font-bold text-white">
                  $${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  openCheckoutModal() {
    if (this.items.length === 0) return;
    this.close();

    const checkoutModal = document.getElementById("checkout-modal");
    if (checkoutModal) {
      checkoutModal.classList.remove("hidden");
      this.renderCheckoutStep(1);
    }
    if (window.audioEngine) window.audioEngine.playMetallicClick();
  }

  renderCheckoutStep(step) {
    const body = document.getElementById("checkout-modal-body");
    if (!body) return;

    if (step === 1) {
      body.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span class="text-xs font-mono text-zinc-400 uppercase">STEP 1 OF 3 // DISPATCH DESTINATION</span>
            <span class="text-xs font-mono text-emerald-400">ENCRYPTED 256-BIT</span>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-1">FIRST NAME</label>
              <input type="text" id="chk-fname" value="Alex" class="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-xs text-white focus:border-white outline-none">
            </div>
            <div>
              <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-1">LAST NAME</label>
              <input type="text" id="chk-lname" value="Vance" class="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-xs text-white focus:border-white outline-none">
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-1">SHIPPING ADDRESS</label>
            <input type="text" id="chk-addr" value="742 Evergreen Signal Way, Unit 4B" class="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-xs text-white focus:border-white outline-none">
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-1">CITY</label>
              <input type="text" id="chk-city" value="Tokyo" class="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-xs text-white focus:border-white outline-none">
            </div>
            <div>
              <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-1">POSTAL CODE</label>
              <input type="text" id="chk-zip" value="150-0002" class="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-xs text-white focus:border-white outline-none">
            </div>
            <div>
              <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-1">COUNTRY</label>
              <select id="chk-country" class="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-xs text-white focus:border-white outline-none">
                <option>Japan (JP)</option>
                <option>Germany (DE)</option>
                <option>United States (US)</option>
                <option>United Kingdom (UK)</option>
                <option>France (FR)</option>
              </select>
            </div>
          </div>

          <div class="pt-4 flex justify-end">
            <button onclick="window.bag.renderCheckoutStep(2)" class="px-6 py-2.5 bg-white text-black font-bold font-mono text-xs uppercase tracking-wider rounded hover:bg-zinc-200 transition-colors">
              CONTINUE TO PAYMENT →
            </button>
          </div>
        </div>
      `;
    } else if (step === 2) {
      body.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span class="text-xs font-mono text-zinc-400 uppercase">STEP 2 OF 3 // PAYMENT METHOD</span>
            <span class="text-xs font-mono text-emerald-400">ZERO FEES</span>
          </div>

          <div class="space-y-2">
            <label class="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-700 rounded cursor-pointer hover:border-zinc-500">
              <input type="radio" name="paymethod" checked class="accent-white">
              <span class="text-xs font-mono text-white font-bold">CREDIT / DEBIT CARD (CHROME PAY)</span>
            </label>
            <label class="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded cursor-pointer hover:border-zinc-700">
              <input type="radio" name="paymethod" class="accent-white">
              <span class="text-xs font-mono text-zinc-300">APPLE PAY / GOOGLE PAY</span>
            </label>
            <label class="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded cursor-pointer hover:border-zinc-700">
              <input type="radio" name="paymethod" class="accent-white">
              <span class="text-xs font-mono text-zinc-300">CRYPTO // ETH / SOL / BTC</span>
            </label>
          </div>

          <div class="bg-zinc-950 p-3.5 border border-zinc-800 rounded">
            <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-1">CARD NUMBER</label>
            <input type="text" value="•••• •••• •••• 8849" class="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-xs text-white font-mono outline-none" readonly>
            
            <div class="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-1">EXPIRY</label>
                <input type="text" value="09/29" class="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-xs text-white font-mono outline-none" readonly>
              </div>
              <div>
                <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-1">CVC</label>
                <input type="password" value="884" class="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-xs text-white font-mono outline-none" readonly>
              </div>
            </div>
          </div>

          <div class="pt-4 flex items-center justify-between">
            <button onclick="window.bag.renderCheckoutStep(1)" class="text-xs font-mono text-zinc-400 hover:text-white uppercase">← BACK</button>
            <button onclick="window.bag.renderCheckoutStep(3)" class="px-6 py-2.5 bg-emerald-500 text-black font-bold font-mono text-xs uppercase tracking-wider rounded hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
              CONFIRM & AUTHORIZE ORDER
            </button>
          </div>
        </div>
      `;
    } else if (step === 3) {
      const orderId = `SH-${Math.floor(100000 + Math.random() * 900000)}`;
      
      this.items = [];
      this.save();
      this.render();

      if (window.audioEngine) window.audioEngine.playBagAdd();

      body.innerHTML = `
        <div class="text-center py-6 space-y-4">
          <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>

          <div>
            <h3 class="text-lg font-bold font-syne text-white uppercase tracking-wider">ORDER CONFIRMED // SIGNAL DISPATCHED</h3>
            <p class="text-xs font-mono text-emerald-400 mt-1">TRACKING NUMBER: ${orderId}</p>
          </div>

          <p class="text-xs text-zinc-400 max-w-sm mx-auto">
            Your encrypted order manifest has been routed to our Tokyo Automated Fulfillment Hub. Priority courier dispatch estimated within 12 hours.
          </p>

          <div class="p-4 bg-zinc-950 border border-zinc-800 rounded font-mono text-left text-xs text-zinc-300 space-y-1">
            <div class="flex justify-between"><span>STATUS:</span><span class="text-emerald-400 font-bold">DISPATCH QUEUED</span></div>
            <div class="flex justify-between"><span>COURIER:</span><span>DHL EXPRESS JET</span></div>
            <div class="flex justify-between"><span>EST. TRANSIT:</span><span>2-3 BUSINESS DAYS</span></div>
          </div>

          <div class="pt-4 flex justify-center gap-3">
            <button onclick="window.print()" class="px-4 py-2 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white rounded">
              PRINT MANIFEST
            </button>
            <button onclick="document.getElementById('checkout-modal').classList.add('hidden')" class="px-6 py-2 bg-white text-black font-bold font-mono text-xs uppercase tracking-wider rounded hover:bg-zinc-200">
              RETURN TO HUB
            </button>
          </div>
        </div>
      `;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.bag = new SwagHubBag();
});
