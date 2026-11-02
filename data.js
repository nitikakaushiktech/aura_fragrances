const perfumes = [
  // Original 11 Perfumes
  {
    id: 1,
    name: "Velvet Rose & Oud",
    brand: "Jo Malone",
    price: 140,
    family: "Floral",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Mid",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600"
  },
  {
    id: 2,
    name: "Cedar Breeze",
    brand: "Tom Ford",
    price: 180,
    family: "Woody",
    occasion: "Daily",
    intensity: "Moderate",
    season: "All",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600"
  },
  {
    id: 3,
    name: "Ocean Mist Aqua",
    brand: "Davidoff",
    price: 65,
    family: "Fresh",
    occasion: "Casual",
    intensity: "Subtle",
    season: "Summer",
    budget: "Budget",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600"
  },
  {
    id: 4,
    name: "Jasmine Noir",
    brand: "Gucci",
    price: 155,
    family: "Floral",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600"
  },
  {
    id: 5,
    name: "Amber Spice Elixir",
    brand: "Yves Saint Laurent",
    price: 160,
    family: "Oriental",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600"
  },
  {
    id: 6,
    name: "Citrus Splash Zest",
    brand: "Dior",
    price: 95,
    family: "Fresh",
    occasion: "Daily",
    intensity: "Moderate",
    season: "Summer",
    budget: "Budget",
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600"
  },
  {
    id: 7,
    name: "Santal Woods",
    brand: "Le Labo",
    price: 220,
    family: "Woody",
    occasion: "Casual",
    intensity: "Bold",
    season: "All",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600"
  },
  {
    id: 8,
    name: "Vanilla Cashmere",
    brand: "Maison Margiela",
    price: 135,
    family: "Oriental",
    occasion: "Casual",
    intensity: "Subtle",
    season: "Winter",
    budget: "Mid",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600"
  },
  {
    id: 9,
    name: "Wild Bluebell",
    brand: "Jo Malone",
    price: 110,
    family: "Floral",
    occasion: "Casual",
    intensity: "Subtle",
    season: "Summer",
    budget: "Mid",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600"
  },
  {
    id: 10,
    name: "Bergamot Citrus Gold",
    brand: "Acqua di Parma",
    price: 145,
    family: "Fresh",
    occasion: "Daily",
    intensity: "Moderate",
    season: "Summer",
    budget: "Mid",
    image: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?w=600"
  },
  {
    id: 11,
    name: "Citrus Grove",
    brand: "Acqua di Parma",
    price: 50,
    family: "Oriental",
    occasion: "Daily",
    intensity: "Moderate",
    season: "Winter",
    budget: "Budget",
    image: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?w=600"
  },

  // 9 Newly Added Perfumes
  {
    id: 12,
    name: "Midnight Orchid",
    brand: "Tom Ford",
    price: 175,
    family: "Floral",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600"
  },
  {
    id: 13,
    name: "Vetiver Essence",
    brand: "Guerlain",
    price: 125,
    family: "Woody",
    occasion: "Daily",
    intensity: "Moderate",
    season: "All",
    budget: "Mid",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600"
  },
  {
    id: 14,
    name: "Aqua Di Gioia",
    brand: "Giorgio Armani",
    price: 85,
    family: "Fresh",
    occasion: "Casual",
    intensity: "Subtle",
    season: "Summer",
    budget: "Budget",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600"
  },
  {
    id: 15,
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    price: 165,
    family: "Oriental",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600"
  },
  {
    id: 16,
    name: "Daisy Eau So Fresh",
    brand: "Marc Jacobs",
    price: 115,
    family: "Floral",
    occasion: "Daily",
    intensity: "Subtle",
    season: "Summer",
    budget: "Mid",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600"
  },
  {
    id: 17,
    name: "Santal Carmin",
    brand: "Atelier Cologne",
    price: 195,
    family: "Woody",
    occasion: "Party",
    intensity: "Moderate",
    season: "Winter",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600"
  },
  {
    id: 18,
    name: "Light Blue Pour Homme",
    brand: "Dolce & Gabbana",
    price: 92,
    family: "Fresh",
    occasion: "Casual",
    intensity: "Moderate",
    season: "Summer",
    budget: "Budget",
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600"
  },
  {
    id: 19,
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    price: 240,
    family: "Oriental",
    occasion: "Party",
    intensity: "Bold",
    season: "Winter",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600"
  },
  {
    id: 20,
    name: "English Pear & Freesia",
    brand: "Jo Malone",
    price: 120,
    family: "Floral",
    occasion: "Casual",
    intensity: "Subtle",
    season: "All",
    budget: "Mid",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600"
  }
];

// ==========================================
// Shared data helpers (used by index + product pages)
// ==========================================

// Visual theme per scent family (drives the product page colours)
const THEMES = {
  Floral:   { accent: "#b8546b", soft: "#fbeff1", deep: "#5a2231", tagline: "Soft petals, romantic and bright.", emoji: "🌸" },
  Woody:    { accent: "#8a5a3b", soft: "#f5ede4", deep: "#3b2615", tagline: "Grounded, warm and earthy.",        emoji: "🌲" },
  Fresh:    { accent: "#2f8da3", soft: "#e8f5f8", deep: "#123c48", tagline: "Crisp, clean and energising.",      emoji: "🍋" },
  Oriental: { accent: "#b0561f", soft: "#f9ece0", deep: "#4a230b", tagline: "Spiced, amber and unforgettable.",  emoji: "🔥" }
};

// Default fragrance notes per family (add a `notes` field to any perfume to override)
const FAMILY_NOTES = {
  Floral:   { top: "Bergamot, Pink Pepper", heart: "Rose, Jasmine, Peony",      base: "Musk, Soft Woods" },
  Woody:    { top: "Cardamom, Pink Pepper", heart: "Cedar, Sandalwood",         base: "Vetiver, Amber" },
  Fresh:    { top: "Lemon, Bergamot",       heart: "Sea Salt, Neroli",          base: "White Musk, Driftwood" },
  Oriental: { top: "Saffron, Cinnamon",     heart: "Amber, Vanilla, Spice",     base: "Tonka Bean, Patchouli" }
};

// Collections used by the header menu
const BESTSELLER_IDS = [1, 2, 6, 9, 15, 19];
const NEW_ARRIVAL_IDS = [12, 13, 14, 15, 16, 17, 18, 19, 20];
const GIFT_IDS = [3, 8, 9, 10, 14, 16, 18, 20]; // approachable prices / crowd-pleasers

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

function getPerfume(id) { return perfumes.find(p => p.id === Number(id)); }

function productUrl(p) { return `product.html?id=${p.id}`; }

function cardHTML(p) {
  const badge = p.bestseller ? "Bestseller" : p.isNew ? "New" : "";
  return `
    <a class="product-card" href="${productUrl(p)}" style="--card-accent:${THEMES[p.family].accent}">
      ${badge ? `<span class="badge">${badge}</span>` : ""}
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="product-info">
        <h4>${p.name}</h4>
        <p>${p.brand} • <strong>${p.family}</strong></p>
        <div class="price">$${p.price}</div>
      </div>
    </a>`;
}
