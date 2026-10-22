/**
 * SwagHUB Product Catalog Data
 * Premium technical streetwear with procedural SVG visuals for Front, Back, and Material Macro views.
 */

window.SWAGHUB_PRODUCTS = [
  {
    id: "phantom-zip-bomber",
    code: "SH-JKT-01",
    name: "Phantom Zip Bomber",
    category: "outerwear",
    tagline: "Black technical flight jacket with 3M reflective piping & magnetic chest rig",
    price: 480,
    currency: "USD",
    badge: "DROP 001 HERO",
    stock: 14,
    sizes: ["S", "M", "L", "XL"],
    color: "Pitch Black / Smoked Gray",
    weight: "850 GSM Composite",
    temperatureRating: "-5°C to 18°C",
    description: "Engineered from proprietary 3-layer laminated Cordura® with water-repellent DWR coating. Features twin asymmetric storm flaps, integrated magnetic chest sling harness, arm utility capsule, custom chrome heavy-gauge YKK Metaluxe® two-way zippers, and an embroidered SwagHUB Signal patch on the left breast.",
    specs: [
      "Shell: 100% Ballistic Cordura® Nylon 500D",
      "Lining: Breathable Anti-Static Silver Silk Poly",
      "Reflective: 3M™ Scotchlite™ 550 cd/lux reflective edge piping",
      "Hardware: Gunmetal matte YKK Metaluxe® 10-gauge two-way zipper",
      "Modularity: Quick-release FIDLOCK® V-buckle chest sling",
      "Pockets: 2 magnetic waist bellows, 1 waterproof arm pocket, 2 interior EDC slots"
    ],
    care: "Dry clean only or cold hand wash with technical detergent. Do not tumble dry.",
    svgViews: {
      front: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <defs>
          <linearGradient id="bomber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1c1c1f"/>
            <stop offset="40%" stop-color="#121214"/>
            <stop offset="100%" stop-color="#09090a"/>
          </linearGradient>
          <linearGradient id="chrome-zipper" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f5f5f7"/>
            <stop offset="50%" stop-color="#71717a"/>
            <stop offset="100%" stop-color="#e4e4e7"/>
          </linearGradient>
          <linearGradient id="rib-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#141416"/>
            <stop offset="50%" stop-color="#27272a"/>
            <stop offset="100%" stop-color="#141416"/>
          </linearGradient>
        </defs>
        <!-- Ribbed Collar -->
        <path d="M150 70 Q200 95 250 70 L240 50 Q200 65 160 50 Z" fill="url(#rib-grad)" stroke="#3f3f46" stroke-width="1"/>
        <!-- Sleeves -->
        <!-- Left Sleeve -->
        <path d="M150 70 L80 160 L50 330 L95 345 L130 220 L135 150 Z" fill="url(#bomber-grad)" stroke="#27272a" stroke-width="1.5"/>
        <path d="M50 330 L95 345 L90 375 L45 360 Z" fill="url(#rib-grad)" stroke="#3f3f46" stroke-width="1"/>
        <!-- Arm Utility Pocket -->
        <rect x="75" y="200" width="36" height="50" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
        <line x1="75" y1="212" x2="111" y2="212" stroke="#71717a" stroke-width="2"/>
        <rect x="100" y="222" width="6" height="20" fill="#ef4444"/>
        <!-- Right Sleeve -->
        <path d="M250 70 L320 160 L350 330 L305 345 L270 220 L265 150 Z" fill="url(#bomber-grad)" stroke="#27272a" stroke-width="1.5"/>
        <path d="M350 330 L305 345 L310 375 L355 360 Z" fill="url(#rib-grad)" stroke="#3f3f46" stroke-width="1"/>
        <!-- Main Torso -->
        <path d="M150 70 Q200 95 250 70 L270 220 L260 380 L140 380 L130 220 Z" fill="url(#bomber-grad)" stroke="#27272a" stroke-width="1.5"/>
        <!-- 3M Reflective Piping Lines -->
        <path d="M150 70 L130 220 L140 380" fill="none" stroke="#e4e4e7" stroke-width="2" stroke-dasharray="8,4" opacity="0.85"/>
        <path d="M250 70 L270 220 L260 380" fill="none" stroke="#e4e4e7" stroke-width="2" stroke-dasharray="8,4" opacity="0.85"/>
        <!-- Asymmetric Magnetic Chest Rig -->
        <polygon points="145,120 190,115 190,180 145,175" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <rect x="155" y="130" width="22" height="6" fill="#71717a"/>
        <circle cx="166" cy="155" r="4" fill="#a1a1aa"/>
        <!-- SwagHUB Embroidered Logo Patch -->
        <rect x="205" y="125" width="46" height="22" rx="2" fill="#09090b" stroke="#e4e4e7" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="210" y="138" font-family="'Syne', sans-serif" font-weight="900" font-size="7" fill="#f4f4f5">SWAGHUB</text>
        <text x="210" y="144" font-family="'Space Grotesk', monospace" font-size="4.5" fill="#a1a1aa">SPEC-01 // 3M</text>
        <!-- Center Zipper -->
        <line x1="200" y1="88" x2="200" y2="380" stroke="#52525b" stroke-width="5"/>
        <line x1="200" y1="88" x2="200" y2="380" stroke="url(#chrome-zipper)" stroke-width="2.5" stroke-dasharray="3,2"/>
        <!-- Metallic Zipper Slider -->
        <polygon points="196,160 204,160 206,180 194,180" fill="#f4f4f5" stroke="#27272a" stroke-width="1"/>
        <circle cx="200" cy="172" r="2" fill="#18181b"/>
        <!-- Pockets with angled storm welt -->
        <polygon points="148,270 185,290 185,300 148,280" fill="#141416" stroke="#3f3f46" stroke-width="1"/>
        <polygon points="252,270 215,290 215,300 252,280" fill="#141416" stroke="#3f3f46" stroke-width="1"/>
        <!-- Ribbed Hem -->
        <path d="M140 380 L260 380 L255 410 L145 410 Z" fill="url(#rib-grad)" stroke="#3f3f46" stroke-width="1"/>
        <line x1="150" y1="385" x2="150" y2="405" stroke="#27272a" stroke-width="1"/>
        <line x1="170" y1="385" x2="170" y2="405" stroke="#27272a" stroke-width="1"/>
        <line x1="190" y1="385" x2="190" y2="405" stroke="#27272a" stroke-width="1"/>
        <line x1="210" y1="385" x2="210" y2="405" stroke="#27272a" stroke-width="1"/>
        <line x1="230" y1="385" x2="230" y2="405" stroke="#27272a" stroke-width="1"/>
        <line x1="250" y1="385" x2="250" y2="405" stroke="#27272a" stroke-width="1"/>
      </svg>`,
      back: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <!-- Back View with Oversized SwagHUB Stencil -->
        <path d="M150 70 Q200 60 250 70 L240 50 Q200 45 160 50 Z" fill="#141416" stroke="#3f3f46" stroke-width="1"/>
        <path d="M150 70 L80 160 L50 330 L95 345 L130 220 L135 150 Z" fill="#121214" stroke="#27272a" stroke-width="1.5"/>
        <path d="M50 330 L95 345 L90 375 L45 360 Z" fill="#141416" stroke="#3f3f46" stroke-width="1"/>
        <path d="M250 70 L320 160 L350 330 L305 345 L270 220 L265 150 Z" fill="#121214" stroke="#27272a" stroke-width="1.5"/>
        <path d="M350 330 L305 345 L310 375 L355 360 Z" fill="#141416" stroke="#3f3f46" stroke-width="1"/>
        <path d="M150 70 Q200 65 250 70 L270 220 L260 380 L140 380 L130 220 Z" fill="#121214" stroke="#27272a" stroke-width="1.5"/>
        <!-- Storm Flap Spine & Yoke -->
        <polygon points="170,70 230,70 220,130 180,130" fill="#1c1c20" stroke="#3f3f46" stroke-width="1"/>
        <!-- Oversized Stencil Signal Logo Graphic -->
        <g transform="translate(150, 160)" opacity="0.85">
          <rect x="0" y="0" width="100" height="100" fill="none" stroke="#27272a" stroke-width="1" stroke-dasharray="4,4"/>
          <path d="M15 80 L35 20 L65 20 L85 80 L65 80 L58 60 L42 60 L35 80 Z M46 48 L54 48 L50 35 Z" fill="#27272a"/>
          <text x="50" y="94" font-family="'Space Grotesk', monospace" font-size="7" fill="#71717a" text-anchor="middle" letter-spacing="2">SIGNAL CORP /// 001</text>
        </g>
        <text x="200" y="320" font-family="'Syne', sans-serif" font-weight="900" font-size="20" fill="#27272a" text-anchor="middle" letter-spacing="8">SWAGHUB</text>
        <!-- Ribbed Hem -->
        <path d="M140 380 L260 380 L255 410 L145 410 Z" fill="#141416" stroke="#3f3f46" stroke-width="1"/>
      </svg>`,
      detail: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <!-- High-res Macro Close-up of Zipper & Embroidered Patch -->
        <rect width="400" height="480" fill="#09090b"/>
        <!-- Cordura Grid Texture Pattern -->
        <g stroke="#1f1f23" stroke-width="0.8" opacity="0.6">
          <line x1="0" y1="50" x2="400" y2="50"/><line x1="0" y1="100" x2="400" y2="100"/>
          <line x1="0" y1="150" x2="400" y2="150"/><line x1="0" y1="200" x2="400" y2="200"/>
          <line x1="0" y1="250" x2="400" y2="250"/><line x1="0" y1="300" x2="400" y2="300"/>
          <line x1="0" y1="350" x2="400" y2="350"/><line x1="0" y1="400" x2="400" y2="400"/>
        </g>
        <!-- Embroidered Patch Macro -->
        <rect x="50" y="80" width="300" height="150" rx="8" fill="#0e0e11" stroke="#3f3f46" stroke-width="4" stroke-dasharray="6,4"/>
        <line x1="70" y1="100" x2="330" y2="100" stroke="#71717a" stroke-width="2"/>
        <text x="70" y="140" font-family="'Syne', sans-serif" font-weight="900" font-size="28" fill="#f4f4f5" letter-spacing="4">SWAGHUB</text>
        <text x="70" y="170" font-family="'Space Grotesk', monospace" font-size="14" fill="#a1a1aa" letter-spacing="2">SPEC-01 // TACTICAL WEAVE</text>
        <text x="70" y="200" font-family="'Space Grotesk', monospace" font-size="11" fill="#71717a">BALLISTIC CORDURA 500D • 3M SCOTCHLITE</text>
        <!-- Chrome Heavy Zipper Teeth -->
        <g transform="translate(180, 270)">
          <rect x="-10" y="0" width="40" height="190" fill="#18181b" stroke="#27272a" stroke-width="2"/>
          <line x1="10" y1="0" x2="10" y2="190" stroke="#3f3f46" stroke-width="4"/>
          <!-- Metal teeth -->
          <line x1="0" y1="20" x2="20" y2="20" stroke="#e4e4e7" stroke-width="6" stroke-linecap="round"/>
          <line x1="0" y1="40" x2="20" y2="40" stroke="#f4f4f5" stroke-width="6" stroke-linecap="round"/>
          <line x1="0" y1="60" x2="20" y2="60" stroke="#d4d4d8" stroke-width="6" stroke-linecap="round"/>
          <line x1="0" y1="80" x2="20" y2="80" stroke="#e4e4e7" stroke-width="6" stroke-linecap="round"/>
          <line x1="0" y1="100" x2="20" y2="100" stroke="#f4f4f5" stroke-width="6" stroke-linecap="round"/>
          <line x1="0" y1="120" x2="20" y2="120" stroke="#d4d4d8" stroke-width="6" stroke-linecap="round"/>
          <line x1="0" y1="140" x2="20" y2="140" stroke="#e4e4e7" stroke-width="6" stroke-linecap="round"/>
          <line x1="0" y1="160" x2="20" y2="160" stroke="#f4f4f5" stroke-width="6" stroke-linecap="round"/>
        </g>
      </svg>`
    }
  },
  {
    id: "static-cargo",
    code: "SH-PNT-02",
    name: "Static Cargo",
    category: "bottoms",
    tagline: "Oversized charcoal technical cargo pants with modular cobra utility straps",
    price: 340,
    currency: "USD",
    badge: "MODULAR FIT",
    stock: 19,
    sizes: ["S", "M", "L", "XL"],
    color: "Charcoal Mineral / Graphite",
    weight: "480 GSM Double-Ripstop",
    temperatureRating: "All-Season Urban Armor",
    description: "Constructed with heavyweight carbon-washed twill and diamond ripstop reinforcement. 8-pocket tactical layout featuring expandable bellows, quick-detach military nylon webbing straps with matte metal cobra clasps, and articulated ergonomic knee darts for unrestricted movement.",
    specs: [
      "Material: 85% Technical Cotton Twill, 15% Kevlar® Ripstop Weave",
      "Strap System: Detachable high-tenacity nylon webbing with tactical aluminum quick-release buckles",
      "Gusset: Reinforced crotch panel and 3D articulated knee pleats",
      "Closure: Cobrax® snap button fly with interior mil-spec drawstring waistband",
      "Ankle: Bungee cord cinch locks for convertible tapered or wide-leg silhouette"
    ],
    care: "Machine wash cold inside out with like colors. Hang dry in shade.",
    svgViews: {
      front: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <defs>
          <linearGradient id="cargo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#222226"/>
            <stop offset="50%" stop-color="#18181b"/>
            <stop offset="100%" stop-color="#0f0f12"/>
          </linearGradient>
        </defs>
        <!-- Waistband -->
        <rect x="110" y="50" width="180" height="25" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <line x1="200" y1="50" x2="200" y2="75" stroke="#71717a" stroke-width="2"/>
        <circle cx="190" cy="62" r="3" fill="#e4e4e7"/>
        <!-- Left Leg -->
        <path d="M110 75 L185 85 L180 260 L195 440 L125 440 L105 240 Z" fill="url(#cargo-grad)" stroke="#27272a" stroke-width="1.5"/>
        <!-- Right Leg -->
        <path d="M290 75 L215 85 L220 260 L205 440 L275 440 L295 240 Z" fill="url(#cargo-grad)" stroke="#27272a" stroke-width="1.5"/>
        <!-- Crotch & Fly -->
        <path d="M185 85 Q200 135 215 85" fill="none" stroke="#27272a" stroke-width="1.5"/>
        <line x1="200" y1="75" x2="200" y2="125" stroke="#3f3f46" stroke-width="2"/>
        <!-- Left Cargo Bellows Pocket -->
        <polygon points="95,170 145,180 140,270 90,260" fill="#141417" stroke="#3f3f46" stroke-width="1.5"/>
        <polygon points="95,170 145,180 143,195 93,185" fill="#27272a" stroke="#52525b" stroke-width="1"/>
        <!-- Right Cargo Bellows Pocket -->
        <polygon points="305,170 255,180 260,270 310,260" fill="#141417" stroke="#3f3f46" stroke-width="1.5"/>
        <polygon points="305,170 255,180 257,195 307,185" fill="#27272a" stroke="#52525b" stroke-width="1"/>
        <!-- Dangling Utility Straps with Metal Buckles -->
        <path d="M130 195 Q115 280 150 330" fill="none" stroke="#18181b" stroke-width="4"/>
        <path d="M130 195 Q115 280 150 330" fill="none" stroke="#71717a" stroke-width="1.5" stroke-dasharray="4,2"/>
        <rect x="145" y="325" width="12" height="16" rx="2" fill="#e4e4e7" stroke="#18181b" stroke-width="1.5"/>
        <path d="M270 195 Q285 280 250 330" fill="none" stroke="#18181b" stroke-width="4"/>
        <path d="M270 195 Q285 280 250 330" fill="none" stroke="#71717a" stroke-width="1.5" stroke-dasharray="4,2"/>
        <rect x="243" y="325" width="12" height="16" rx="2" fill="#e4e4e7" stroke="#18181b" stroke-width="1.5"/>
        <!-- Articulated Knee Darts -->
        <line x1="120" y1="285" x2="165" y2="295" stroke="#3f3f46" stroke-width="2"/>
        <line x1="122" y1="300" x2="167" y2="310" stroke="#3f3f46" stroke-width="2"/>
        <line x1="280" y1="285" x2="235" y2="295" stroke="#3f3f46" stroke-width="2"/>
        <line x1="278" y1="300" x2="233" y2="310" stroke="#3f3f46" stroke-width="2"/>
        <!-- Ankle Cinch Tabs -->
        <rect x="125" y="425" width="70" height="15" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
        <rect x="205" y="425" width="70" height="15" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
        <circle cx="135" cy="432" r="3" fill="#a1a1aa"/>
        <circle cx="265" cy="432" r="3" fill="#a1a1aa"/>
      </svg>`,
      back: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <!-- Back View of Static Cargo -->
        <rect x="110" y="50" width="180" height="25" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <!-- Saddle Seat Patch -->
        <path d="M110 75 L185 85 L200 160 L215 85 L290 75 L295 240 L275 440 L205 440 L200 240 L195 440 L125 440 L105 240 Z" fill="#141416" stroke="#27272a" stroke-width="1.5"/>
        <path d="M140 100 Q200 180 260 100" fill="none" stroke="#3f3f46" stroke-width="2"/>
        <!-- Back Utility Welt Pockets -->
        <rect x="125" y="110" width="45" height="35" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <rect x="230" y="110" width="45" height="35" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <!-- Woven Spec Label -->
        <rect x="135" y="120" width="25" height="12" fill="#09090b"/>
        <text x="147" y="128" font-family="'Space Grotesk', monospace" font-size="4" fill="#a1a1aa" text-anchor="middle">CARGO-02</text>
      </svg>`,
      detail: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <rect width="400" height="480" fill="#09090b"/>
        <!-- Heavy Ripstop Weave Close-up -->
        <g stroke="#1c1c20" stroke-width="1.5">
          <line x1="0" y1="40" x2="400" y2="40"/><line x1="0" y1="80" x2="400" y2="80"/>
          <line x1="0" y1="120" x2="400" y2="120"/><line x1="0" y1="160" x2="400" y2="160"/>
          <line x1="0" y1="200" x2="400" y2="200"/><line x1="0" y1="240" x2="400" y2="240"/>
          <line x1="0" y1="280" x2="400" y2="280"/><line x1="0" y1="320" x2="400" y2="320"/>
          <line x1="0" y1="360" x2="400" y2="360"/><line x1="0" y1="400" x2="400" y2="400"/>
          <line x1="0" y1="440" x2="400" y2="440"/>
        </g>
        <!-- Tactical Cobra-Style Quick Release Metal Buckle -->
        <g transform="translate(100, 140)">
          <rect x="0" y="0" width="200" height="160" rx="12" fill="#18181b" stroke="#52525b" stroke-width="3"/>
          <rect x="30" y="20" width="140" height="40" rx="4" fill="#27272a" stroke="#71717a" stroke-width="1.5"/>
          <text x="100" y="45" font-family="'Space Grotesk', monospace" font-size="12" fill="#f4f4f5" font-weight="700" text-anchor="middle" letter-spacing="3">COBRA QUICK-RELEASE</text>
          <!-- Golden/Brass Release Pins -->
          <circle cx="20" cy="90" r="10" fill="#d97706" stroke="#92400e" stroke-width="2"/>
          <circle cx="180" cy="90" r="10" fill="#d97706" stroke="#92400e" stroke-width="2"/>
          <!-- Heavy Webbing Insert -->
          <rect x="50" y="80" width="100" height="120" fill="#09090b" stroke="#3f3f46" stroke-width="2"/>
          <line x1="65" y1="80" x2="65" y2="200" stroke="#71717a" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="135" y1="80" x2="135" y2="200" stroke="#71717a" stroke-width="2" stroke-dasharray="4,4"/>
        </g>
      </svg>`
    }
  },
  {
    id: "afterimage-hoodie",
    code: "SH-HD-03",
    name: "Afterimage Hoodie",
    category: "tops",
    tagline: "Heavyweight 500 GSM washed volcanic gray hoodie with tonal silicone typography",
    price: 260,
    currency: "USD",
    badge: "HEAVYWEIGHT 500GSM",
    stock: 28,
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Washed Mineral Gray / Charcoal",
    weight: "500 GSM Organic Loopback Terry",
    temperatureRating: "0°C to 20°C",
    description: "Tailored with custom high-density 500 GSM loopback cotton for a structured drape and extreme durability. Features an exaggerated crossover storm hood, seamless drop shoulders, kangaroo pocket with concealed magnetic card pocket, and 3D high-density silicone 'WEAR YOUR SIGNAL' typography across the upper back.",
    specs: [
      "Body: 100% Combed Heavyweight French Terry 500 GSM",
      "Kangaroo Pocket: Double-reinforced with concealed EDC phone slot",
      "Hood: Double-ply self-fabric ergonomic crossover design (no drawstrings)",
      "Print: Tonal high-density matte silicone relief with zero-cracking guarantee",
      "Ribbing: 2x2 heavy spandex-reinforced cotton cuffs and waist hem"
    ],
    care: "Machine wash cold. Lay flat to dry to preserve silhouette and silicone print.",
    svgViews: {
      front: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <defs>
          <linearGradient id="hoodie-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#323238"/>
            <stop offset="60%" stop-color="#232327"/>
            <stop offset="100%" stop-color="#141416"/>
          </linearGradient>
        </defs>
        <!-- Crossover Double Hood -->
        <path d="M140 100 Q200 40 260 100 Q200 130 140 100 Z" fill="#27272a" stroke="#3f3f46" stroke-width="1.5"/>
        <path d="M160 90 Q200 60 240 90 Q200 115 160 90 Z" fill="#18181b"/>
        <!-- Drop Shoulder Sleeves -->
        <path d="M140 100 L60 170 L30 330 L80 340 L120 210 L130 140 Z" fill="url(#hoodie-grad)" stroke="#27272a" stroke-width="1.5"/>
        <path d="M30 330 L80 340 L75 375 L25 365 Z" fill="#1f1f23" stroke="#3f3f46" stroke-width="1"/>
        <path d="M260 100 L340 170 L370 330 L320 340 L280 210 L270 140 Z" fill="url(#hoodie-grad)" stroke="#27272a" stroke-width="1.5"/>
        <path d="M370 330 L320 340 L325 375 L375 365 Z" fill="#1f1f23" stroke="#3f3f46" stroke-width="1"/>
        <!-- Torso Body -->
        <path d="M140 100 Q200 125 260 100 L270 210 L260 380 L140 380 L130 210 Z" fill="url(#hoodie-grad)" stroke="#27272a" stroke-width="1.5"/>
        <!-- Tonal Chest Signal Logo -->
        <g transform="translate(170, 160)" opacity="0.9">
          <circle cx="30" cy="20" r="18" fill="none" stroke="#52525b" stroke-width="2"/>
          <path d="M20 20 L40 20 M30 10 L30 30" stroke="#71717a" stroke-width="2.5"/>
          <text x="30" y="48" font-family="'Space Grotesk', monospace" font-size="6" fill="#a1a1aa" text-anchor="middle" letter-spacing="1">SWAGHUB 500G</text>
        </g>
        <!-- Seamless Kangaroo Pocket -->
        <polygon points="150,270 250,270 260,370 140,370" fill="#202024" stroke="#3f3f46" stroke-width="1.5"/>
        <line x1="150" y1="270" x2="160" y2="330" stroke="#52525b" stroke-width="2"/>
        <line x1="250" y1="270" x2="240" y2="330" stroke="#52525b" stroke-width="2"/>
        <!-- Ribbed Waistband -->
        <rect x="140" y="380" width="120" height="30" fill="#1f1f23" stroke="#3f3f46" stroke-width="1"/>
      </svg>`,
      back: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <!-- Back View with High-Density Silicone Typography -->
        <path d="M140 100 Q200 50 260 100 Q200 80 140 100 Z" fill="#27272a" stroke="#3f3f46" stroke-width="1.5"/>
        <path d="M140 100 L60 170 L30 330 L80 340 L120 210 L130 140 Z" fill="#232327" stroke="#27272a" stroke-width="1.5"/>
        <path d="M260 100 L340 170 L370 330 L320 340 L280 210 L270 140 Z" fill="#232327" stroke="#27272a" stroke-width="1.5"/>
        <path d="M140 100 Q200 90 260 100 L270 210 L260 380 L140 380 L130 210 Z" fill="#232327" stroke="#27272a" stroke-width="1.5"/>
        <!-- High-Density Silicone Back Print -->
        <text x="200" y="190" font-family="'Syne', sans-serif" font-weight="900" font-size="22" fill="#3f3f46" text-anchor="middle" letter-spacing="4">WEAR YOUR</text>
        <text x="200" y="225" font-family="'Syne', sans-serif" font-weight="900" font-size="28" fill="#52525b" text-anchor="middle" letter-spacing="6">SIGNAL</text>
        <line x1="160" y1="245" x2="240" y2="245" stroke="#71717a" stroke-width="2"/>
        <text x="200" y="265" font-family="'Space Grotesk', monospace" font-size="7" fill="#71717a" text-anchor="middle" letter-spacing="2">SWAGHUB NIGHT SHIFT /// 001</text>
        <rect x="140" y="380" width="120" height="30" fill="#1f1f23" stroke="#3f3f46" stroke-width="1"/>
      </svg>`,
      detail: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <rect width="400" height="480" fill="#141416"/>
        <!-- 500 GSM Heavy French Terry Loop Close-up -->
        <g fill="#27272a" opacity="0.7">
          <circle cx="50" cy="50" r="4"/><circle cx="80" cy="50" r="4"/><circle cx="110" cy="50" r="4"/>
          <circle cx="140" cy="50" r="4"/><circle cx="170" cy="50" r="4"/><circle cx="200" cy="50" r="4"/>
          <circle cx="230" cy="50" r="4"/><circle cx="260" cy="50" r="4"/><circle cx="290" cy="50" r="4"/>
          <circle cx="320" cy="50" r="4"/><circle cx="350" cy="50" r="4"/>
          <circle cx="65" cy="70" r="4"/><circle cx="95" cy="70" r="4"/><circle cx="125" cy="70" r="4"/>
          <circle cx="155" cy="70" r="4"/><circle cx="185" cy="70" r="4"/><circle cx="215" cy="70" r="4"/>
          <circle cx="245" cy="70" r="4"/><circle cx="275" cy="70" r="4"/><circle cx="305" cy="70" r="4"/>
          <circle cx="335" cy="70" r="4"/>
        </g>
        <!-- 3D High-Density Matte Silicone Lettering Relief -->
        <g transform="translate(60, 180)">
          <rect x="0" y="0" width="280" height="120" rx="8" fill="#1c1c20" stroke="#3f3f46" stroke-width="2"/>
          <text x="140" y="60" font-family="'Syne', sans-serif" font-weight="900" font-size="28" fill="#71717a" text-anchor="middle" letter-spacing="4">500 GSM</text>
          <text x="140" y="90" font-family="'Space Grotesk', monospace" font-size="12" fill="#a1a1aa" text-anchor="middle" letter-spacing="2">SILICONE RELIEF APPLIQUÉ</text>
        </g>
      </svg>`
    }
  },
  {
    id: "vector-chest-rig",
    code: "SH-ACC-04",
    name: "Vector Chest Rig",
    category: "gear",
    tagline: "Modular Cordura® cross-body utility bag with FIDLOCK® magnetic buckle",
    price: 185,
    currency: "USD",
    badge: "QUICK RELEASE",
    stock: 22,
    sizes: ["ONE SIZE"],
    color: "Stealth Black",
    weight: "320g Ultra-Tough",
    temperatureRating: "All-Weather Proof",
    description: "Engineered for night missions and rapid EDC access. Features a 3-point harness system with breathable padded mesh back panel, German magnetic quick-release clasps, and laser-cut Molle attachment points.",
    specs: [
      "Cordura® 1000D waterproof construction",
      "FIDLOCK® German magnetic V-buckle closure",
      "Laser-cut hypalon Molle grid",
      "Interior padded tech sleeve fits iPhone Pro Max and passports"
    ],
    care: "Wipe with damp cloth. Air dry.",
    svgViews: {
      front: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <defs>
          <linearGradient id="rig-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#27272a"/>
            <stop offset="100%" stop-color="#09090b"/>
          </linearGradient>
        </defs>
        <!-- Shoulder & Torso Straps -->
        <path d="M80 50 L140 180 M320 50 L260 180" stroke="#18181b" stroke-width="16" stroke-linecap="round"/>
        <path d="M80 50 L140 180 M320 50 L260 180" stroke="#52525b" stroke-width="2" stroke-dasharray="6,4"/>
        <line x1="80" y1="50" x2="320" y2="50" stroke="#18181b" stroke-width="12"/>
        <!-- Main Rig Body -->
        <rect x="110" y="160" width="180" height="180" rx="14" fill="url(#rig-grad)" stroke="#3f3f46" stroke-width="2"/>
        <!-- Top Zipper Pocket -->
        <rect x="130" y="180" width="140" height="30" rx="6" fill="#18181b" stroke="#52525b" stroke-width="1.5"/>
        <line x1="140" y1="195" x2="260" y2="195" stroke="#a1a1aa" stroke-width="2" stroke-dasharray="4,2"/>
        <!-- Center FIDLOCK Buckle -->
        <rect x="170" y="230" width="60" height="40" rx="4" fill="#e4e4e7" stroke="#18181b" stroke-width="2"/>
        <circle cx="200" cy="250" r="6" fill="#ef4444"/>
        <!-- Laser-cut Molle Grid -->
        <g stroke="#52525b" stroke-width="2">
          <line x1="130" y1="290" x2="160" y2="290"/>
          <line x1="170" y1="290" x2="200" y2="290"/>
          <line x1="210" y1="290" x2="240" y2="290"/>
          <line x1="250" y1="290" x2="270" y2="290"/>
          <line x1="130" y1="310" x2="160" y2="310"/>
          <line x1="170" y1="310" x2="200" y2="310"/>
          <line x1="210" y1="310" x2="240" y2="310"/>
          <line x1="250" y1="310" x2="270" y2="310"/>
        </g>
        <text x="200" y="360" font-family="'Space Grotesk', monospace" font-size="8" fill="#71717a" text-anchor="middle" letter-spacing="2">SWAGHUB RIG // MOD-4</text>
      </svg>`,
      back: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <rect x="110" y="160" width="180" height="180" rx="14" fill="#141416" stroke="#27272a" stroke-width="2"/>
        <!-- Padded Air Mesh Texture -->
        <g stroke="#27272a" stroke-width="1.5">
          <circle cx="140" cy="200" r="10" fill="#18181b"/>
          <circle cx="170" cy="200" r="10" fill="#18181b"/>
          <circle cx="200" cy="200" r="10" fill="#18181b"/>
          <circle cx="230" cy="200" r="10" fill="#18181b"/>
          <circle cx="260" cy="200" r="10" fill="#18181b"/>
          <circle cx="140" cy="240" r="10" fill="#18181b"/>
          <circle cx="170" cy="240" r="10" fill="#18181b"/>
          <circle cx="200" cy="240" r="10" fill="#18181b"/>
          <circle cx="230" cy="240" r="10" fill="#18181b"/>
          <circle cx="260" cy="240" r="10" fill="#18181b"/>
          <circle cx="140" cy="280" r="10" fill="#18181b"/>
          <circle cx="170" cy="280" r="10" fill="#18181b"/>
          <circle cx="200" cy="280" r="10" fill="#18181b"/>
          <circle cx="230" cy="280" r="10" fill="#18181b"/>
          <circle cx="260" cy="280" r="10" fill="#18181b"/>
        </g>
      </svg>`,
      detail: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <rect width="400" height="480" fill="#09090b"/>
        <rect x="80" y="120" width="240" height="240" rx="10" fill="#18181b" stroke="#52525b" stroke-width="3"/>
        <text x="200" y="200" font-family="'Syne', sans-serif" font-weight="900" font-size="20" fill="#f4f4f5" text-anchor="middle">FIDLOCK® GERMANY</text>
        <text x="200" y="240" font-family="'Space Grotesk', monospace" font-size="12" fill="#71717a" text-anchor="middle">MAGNETIC SAFETY LOCK</text>
        <circle cx="200" cy="290" r="24" fill="#ef4444" stroke="#991b1b" stroke-width="3"/>
        <path d="M190 290 L210 290 M200 280 L200 300" stroke="#ffffff" stroke-width="4"/>
      </svg>`
    }
  },
  {
    id: "sub-zero-balaclava",
    code: "SH-ACC-05",
    name: "Sub-Zero Mask & Balaclava",
    category: "gear",
    tagline: "Thermal compression knit with laser-cut ventilation & reflective 3M brim",
    price: 95,
    currency: "USD",
    badge: "NIGHT VISIBILITY",
    stock: 35,
    sizes: ["ONE SIZE"],
    color: "Pitch Black",
    weight: "140g Lightweight",
    temperatureRating: "Windproof & Breathable",
    description: "Constructed from anti-microbial Italian thermal fleece with laser-cut breathing micro-ports and seamless 4-way stretch.",
    specs: [
      "90% Poly-elastane with anti-odor silver ion thread",
      "Laser-perforated mouth/nose ventilation zone",
      "3M™ reflective temple logo print"
    ],
    care: "Hand wash cold. Dries in 20 minutes.",
    svgViews: {
      front: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <!-- Balaclava Silhouette -->
        <path d="M140 100 Q200 40 260 100 L270 320 Q200 370 130 320 Z" fill="#141416" stroke="#27272a" stroke-width="2"/>
        <!-- Eye Opening -->
        <polygon points="155,140 245,140 235,180 165,180" fill="#09090b" stroke="#3f3f46" stroke-width="2"/>
        <!-- Breathing Ports -->
        <g fill="#3f3f46">
          <circle cx="185" cy="220" r="2"/><circle cx="200" cy="220" r="2"/><circle cx="215" cy="220" r="2"/>
          <circle cx="190" cy="230" r="2"/><circle cx="200" cy="230" r="2"/><circle cx="210" cy="230" r="2"/>
          <circle cx="195" cy="240" r="2"/><circle cx="205" cy="240" r="2"/>
        </g>
        <!-- 3M Reflective Side Marking -->
        <text x="200" y="300" font-family="'Space Grotesk', monospace" font-size="8" fill="#e4e4e7" text-anchor="middle" letter-spacing="3">/// SWAGHUB // SUBZERO</text>
      </svg>`,
      back: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <path d="M140 100 Q200 40 260 100 L270 320 Q200 370 130 320 Z" fill="#121214" stroke="#27272a" stroke-width="2"/>
        <line x1="200" y1="60" x2="200" y2="340" stroke="#27272a" stroke-width="2"/>
      </svg>`,
      detail: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <rect width="400" height="480" fill="#09090b"/>
        <text x="200" y="220" font-family="'Syne', sans-serif" font-weight="900" font-size="24" fill="#f4f4f5" text-anchor="middle">LASER PERFORATION</text>
        <text x="200" y="260" font-family="'Space Grotesk', monospace" font-size="12" fill="#71717a" text-anchor="middle">ZERO MOISTURE TRAP</text>
      </svg>`
    }
  },
  {
    id: "void-beanie",
    code: "SH-ACC-06",
    name: "Void Ribbed Beanie",
    category: "gear",
    tagline: "Extra-heavy 100% Merino wool beanie with polished gunmetal steel logo badge",
    price: 75,
    currency: "USD",
    badge: "100% MERINO",
    stock: 40,
    sizes: ["ONE SIZE"],
    color: "Obsidian Black",
    weight: "200g Heavy Knit",
    temperatureRating: "Sub-Zero Thermal",
    description: "Knitted from 100% extra-fine Australian Merino wool with a deep double-cuff fold and brushed gunmetal alloy SwagHUB ingot.",
    specs: [
      "100% Australian Extra-Fine Merino Wool",
      "7-gauge chunky thermal fisherman rib",
      "Screwed solid gunmetal emblem plate"
    ],
    care: "Hand wash in cold water with wool care. Dry flat.",
    svgViews: {
      front: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <!-- Beanie Dome -->
        <path d="M120 220 Q200 80 280 220 Z" fill="#141416" stroke="#27272a" stroke-width="2"/>
        <!-- Ribbed Texture -->
        <line x1="160" y1="120" x2="150" y2="220" stroke="#27272a" stroke-width="2"/>
        <line x1="180" y1="100" x2="175" y2="220" stroke="#27272a" stroke-width="2"/>
        <line x1="200" y1="90" x2="200" y2="220" stroke="#27272a" stroke-width="2"/>
        <line x1="220" y1="100" x2="225" y2="220" stroke="#27272a" stroke-width="2"/>
        <line x1="240" y1="120" x2="250" y2="220" stroke="#27272a" stroke-width="2"/>
        <!-- Folded Cuff -->
        <rect x="110" y="215" width="180" height="70" rx="8" fill="#18181b" stroke="#3f3f46" stroke-width="2"/>
        <!-- Gunmetal Chrome Plate -->
        <rect x="175" y="235" width="50" height="25" rx="3" fill="#e4e4e7" stroke="#18181b" stroke-width="1.5"/>
        <text x="200" y="252" font-family="'Syne', sans-serif" font-weight="900" font-size="8" fill="#09090b" text-anchor="middle">SWAGHUB</text>
      </svg>`,
      back: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <path d="M120 220 Q200 80 280 220 Z" fill="#141416" stroke="#27272a" stroke-width="2"/>
        <rect x="110" y="215" width="180" height="70" rx="8" fill="#18181b" stroke="#3f3f46" stroke-width="2"/>
      </svg>`,
      detail: `<svg viewBox="0 0 400 480" class="w-full h-full object-contain filter drop-shadow-2xl">
        <rect width="400" height="480" fill="#09090b"/>
        <rect x="80" y="160" width="240" height="120" rx="6" fill="#e4e4e7" stroke="#27272a" stroke-width="3"/>
        <text x="200" y="230" font-family="'Syne', sans-serif" font-weight="900" font-size="26" fill="#09090b" text-anchor="middle" letter-spacing="4">SWAGHUB</text>
        <text x="200" y="260" font-family="'Space Grotesk', monospace" font-size="10" fill="#52525b" text-anchor="middle">SOLID GUNMETAL STEEL INGOT</text>
      </svg>`
    }
  }
];
