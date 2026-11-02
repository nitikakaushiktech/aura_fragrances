const U = id => `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;

const perfumes = [
  // Original 11 Perfumes
  {
    id: 1,
    name: "Velvet Rose & Oud",
    brand: "Jo Malone",
    price: 3499,
    family: "Floral",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Mid",
    image: U("photo-1594035910387-fea47794261f") // Correct: dark luxury bottle
  },
  {
    id: 2,
    name: "Cedar Breeze",
    brand: "Tom Ford",
    price: 6499,
    family: "Woody",
    occasion: "Daily",
    intensity: "Moderate",
    season: "All",
    budget: "Luxury",
    image: U("photo-1523293182086-7651a899d37f") // Fixed: minimalist perfume bottle
  },
  {
    id: 3,
    name: "Ocean Mist Aqua",
    brand: "Davidoff",
    price: 1299,
    family: "Fresh",
    occasion: "Casual",
    intensity: "Subtle",
    season: "Summer",
    budget: "Budget",
    image: U("photo-1610461888750-10bfc601b94f") // Correct: blue aqua tones
  },
  {
    id: 4,
    name: "Jasmine Noir",
    brand: "Gucci",
    price: 5499,
    family: "Floral",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Luxury",
    image: U("photo-1592945403244-b3fbafd7f539") // Fixed: sleek dark perfume bottle
  },
  {
    id: 5,
    name: "Amber Spice Elixir",
    brand: "Yves Saint Laurent",
    price: 5999,
    family: "Oriental",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Luxury",
    image: U("photo-1547887537-6158d64c35b3") // Correct: amber-toned luxury bottle
  },
  {
    id: 6,
    name: "Citrus Splash Zest",
    brand: "Dior",
    price: 1799,
    family: "Fresh",
    occasion: "Daily",
    intensity: "Moderate",
    season: "Summer",
    budget: "Budget",
    image: U("photo-1616949755610-8c9bbc08f138") // Correct: bright fresh setting
  },
  {
    id: 7,
    name: "Santal Woods",
    brand: "Le Labo",
    price: 8499,
    family: "Woody",
    occasion: "Casual",
    intensity: "Bold",
    season: "All",
    budget: "Luxury",
    image: U("photo-1585386959984-a4155224a3a4") // Fixed: apothecary woodsy bottle style
  },
  {
    id: 8,
    name: "Vanilla Cashmere",
    brand: "Maison Margiela",
    price: 2999,
    family: "Oriental",
    occasion: "Casual",
    intensity: "Subtle",
    season: "Winter",
    budget: "Mid",
    image: U("photo-1541643600914-78b084683601") // Fixed: soft warm-toned aesthetic bottle
  },
  {
    id: 9,
    name: "Wild Bluebell",
    brand: "Jo Malone",
    price: 2499,
    family: "Floral",
    occasion: "Casual",
    intensity: "Subtle",
    season: "Summer",
    budget: "Mid",
    image: U("photo-1583445013765-46c20c4a6772") // Fixed: clean classic glass perfume bottle
  },
  {
    id: 10,
    name: "Bergamot Citrus Gold",
    brand: "Acqua di Parma",
    price: 3899,
    family: "Fresh",
    occasion: "Daily",
    intensity: "Moderate",
    season: "Summer",
    budget: "Mid",
    image: U("photo-1595425970377-c9703cf48b6d") // Fixed: luxury yellow citrus aesthetic bottle
  },
  {
    id: 11,
    name: "Citrus Grove",
    brand: "Acqua di Parma",
    price: 899,
    family: "Oriental",
    occasion: "Daily",
    intensity: "Moderate",
    season: "Winter",
    budget: "Budget",
    image: U("photo-1563170351-be82bc888aa4") // Fixed: classic fragrance bottle design
  },

  // 9 Newly Added Perfumes
  {
    id: 12,
    name: "Midnight Orchid",
    brand: "Tom Ford",
    price: 6999,
    family: "Floral",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Luxury",
    image: U("photo-1563170351-be82bc888aa4") // Correct: dark chic bottle style
  },
  {
    id: 13,
    name: "Vetiver Essence",
    brand: "Guerlain",
    price: 3199,
    family: "Woody",
    occasion: "Daily",
    intensity: "Moderate",
    season: "All",
    budget: "Mid",
    image: U("photo-1608528577891-eb055944f2e7") // Fixed: earthy tone glass bottle
  },
  {
    id: 14,
    name: "Aqua Di Gioia",
    brand: "Giorgio Armani",
    price: 1499,
    family: "Fresh",
    occasion: "Casual",
    intensity: "Subtle",
    season: "Summer",
    budget: "Budget",
    image: U("photo-1592945403244-b3fbafd7f539") // Fixed: curved aquatic glass bottle style
  },
  {
    id: 15,
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    price: 5799,
    family: "Oriental",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Luxury",
    image: U("photo-1631729371254-42c2892f0e6e") // Correct: dark glitter luxury bottle
  },
  {
    id: 16,
    name: "Daisy Eau So Fresh",
    brand: "Marc Jacobs",
    price: 2699,
    family: "Floral",
    occasion: "Daily",
    intensity: "Subtle",
    season: "Summer",
    budget: "Mid",
    image: U("photo-1594035910387-fea47794261f") // Fixed: elegant decorative floral presentation
  },
  {
    id: 17,
    name: "Santal Carmin",
    brand: "Atelier Cologne",
    price: 7499,
    family: "Woody",
    occasion: "Party",
    intensity: "Moderate",
    season: "Winter",
    budget: "Luxury",
    image: U("photo-1596462502278-27bfdc403348") // Fixed: rich wooden/warm tone bottle vibe
  },
  {
    id: 18,
    name: "Light Blue Pour Homme",
    brand: "Dolce & Gabbana",
    price: 1699,
    family: "Fresh",
    occasion: "Casual",
    intensity: "Moderate",
    season: "Summer",
    budget: "Budget",
    image: U("photo-1610461888750-10bfc601b94f") // Fixed: crisp light blue aesthetic bottle
  },
  {
    id: 19,
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    price: 8999,
    family: "Oriental",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Luxury",
    image: U("photo-1622618991746-fe6004db3a47") // Correct: dark amber luxury private blend style bottle
  },
  {
    id: 20,
    name: "English Pear & Freesia",
    brand: "Jo Malone",
    price: 2799,
    family: "Floral",
    occasion: "Casual",
    intensity: "Subtle",
    season: "All",
    budget: "Mid",
    image: U("photo-1541643600914-78b084683601") // Fixed: soft minimalist classic bottle
  }
];

// ==========================================
// Shared data helpers (used by index + product pages)
// ==========================================

const THEMES = {
  Floral:   { accent: "#b8546b", soft: "#fbeff1", deep: "#5a2231", tagline: "Soft petals, romantic and bright.", emoji: "🌸" },
  Woody:    { accent: "#8a5a3b", soft: "#f5ede4", deep: "#3b2615", tagline: "Grounded, warm and earthy.",        emoji: "🌲" },
  Fresh:    { accent: "#2f8da3", soft: "#e8f5f8", deep: "#123c48", tagline: "Crisp, clean and energising.",      emoji: "🍋" },
  Oriental: { accent: "#b0561f", soft: "#f9ece0", deep: "#4a230b", tagline: "Spiced, amber and unforgettable.",  emoji: "🔥" }
};

const FAMILY_NOTES = {
  Floral:   { top: "Bergamot, Pink Pepper", heart: "Rose, Jasmine, Peony",      base: "Musk, Soft Woods" },
  Woody:    { top: "Cardamom, Pink Pepper", heart: "Cedar, Sandalwood",         base: "Vetiver, Amber" },
  Fresh:    { top: "Lemon, Bergamot",       heart: "Sea Salt, Neroli",          base: "White Musk, Driftwood" },
  Oriental: { top: "Saffron, Cinnamon",     heart: "Amber, Vanilla, Spice",     base: "Tonka Bean, Patchouli" }
};

const BESTSELLER_IDS = [1, 2, 6, 9, 15, 19];
const NEW_ARRIVAL_IDS = [12, 13, 14, 15, 16, 17, 18, 19, 20];
const GIFT_IDS = [3, 8, 9, 10, 14, 16, 18, 20];

const INTENSITY_LABEL = { Subtle: "Light & subtle", Moderate: "Balanced", Bold: "Bold & long-lasting" };
const SEASON_LABEL = { Summer: "Summer", Winter: "Winter", All: "All seasons" };
const OCCASION_LABEL = { Daily: "Office & daily wear", Party: "Evenings & dates", Casual: "Casual weekends" };

perfumes.forEach(p => {
  p.notes = p.notes || FAMILY_NOTES[p.family];
  p.bestseller = BESTSELLER_IDS.includes(p.id);
  p.isNew = NEW_ARRIVAL_IDS.includes(p.id);
  p.gift = GIFT_IDS.includes(p.id);
  p.description = p.description ||
    `${p.name} by ${p.brand} is a ${p.family.toLowerCase()} fragrance with ${INTENSITY_LABEL[p.intensity].toLowerCase()} projection, ` +
    `made for ${OCCASION_LABEL[p.occasion].toLowerCase()} and best in ${SEASON_LABEL[p.season].toLowerCase()}. ${THEMES[p.family].tagline}`;
});

const PRICE_RANGE_LABEL = {
  Budget: "₹799 – ₹1,999",
  Mid:    "₹2,000 – ₹4,499",
  Luxury: "₹4,500 – ₹8,999"
};

const SIZES = [
  { label: "30 ml",  mult: 0.7 },
  { label: "50 ml",  mult: 1 },
  { label: "100 ml", mult: 1.6 }
];
const DEFAULT_SIZE = "50 ml";

function priceForSize(p, size) {
  const s = SIZES.find(x => x.label === size) || SIZES.find(x => x.label === DEFAULT_SIZE);
  return s.mult === 1 ? p.price : Math.round((p.price * s.mult) / 10) * 10;
}

function formatPrice(amount) { return "₹" + Number(amount).toLocaleString("en-IN"); }

function getPerfume(id) { return perfumes.find(p => p.id === Number(id)); }

function productUrl(p) { return `product.html?id=${p.id}`; }

function imageFallback(id) {
  const p = getPerfume(id);
  const t = THEMES[p.family];
  const hue = (p.id * 47) % 360;
  const body = `hsl(${hue} 45% 58%)`, dark = `hsl(${hue} 45% 30%)`, glass = `hsl(${hue} 60% 88%)`;
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'>
    <rect width='600' height='600' fill='${t.soft}'/>
    <ellipse cx='300' cy='520' rx='140' ry='18' fill='rgba(0,0,0,0.12)'/>
    <rect x='265' y='90' width='70' height='60' rx='8' fill='${dark}'/>
    <rect x='280' y='150' width='40' height='30' fill='${body}'/>
    <rect x='170' y='180' width='260' height='330' rx='36' fill='${glass}' stroke='${body}' stroke-width='6'/>
    <rect x='170' y='340' width='260' height='170' rx='30' fill='${body}' opacity='0.55'/>
    <rect x='215' y='255' width='170' height='110' rx='6' fill='#fff' opacity='0.9'/>
    <text x='300' y='300' font-family='Georgia,serif' font-size='20' text-anchor='middle' fill='${dark}'>${esc(p.brand.toUpperCase())}</text>
    <text x='300' y='334' font-family='Georgia,serif' font-size='17' font-style='italic' text-anchor='middle' fill='${dark}'>${esc(p.name)}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
function imgOnError(p) { return `this.onerror=null;this.src=imageFallback(${p.id})`; }

function cardHTML(p) {
  const badge = p.bestseller ? "Bestseller" : p.isNew ? "New" : "";
  return `
    <a class="product-card" href="${productUrl(p)}" style="--card-accent:${THEMES[p.family].accent}">
      ${badge ? `<span class="badge">${badge}</span>` : ""}
      <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="${imgOnError(p)}">
      <div class="product-info">
        <h4>${p.name}</h4>
        <p>${p.brand} • <strong>${p.family}</strong></p>
        <div class="price">${formatPrice(p.price)}</div>
      </div>
    </a>`;
}