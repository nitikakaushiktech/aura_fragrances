// ==========================================
// 1. THE PERFUME DATABASE (Expanded with Realistic Images)
// ==========================================
const perfumes = [
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
  }
];

// ==========================================
// 2. DISPLAY SHOP CATALOG
// ==========================================
function displayShopCatalog() {
  const catalogContainer = document.getElementById("full-catalog");
  if (!catalogContainer) return;

  catalogContainer.innerHTML = "";

  perfumes.forEach(perfume => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${perfume.image}" alt="${perfume.name}">
      <div class="product-info">
        <h4>${perfume.name}</h4>
        <p>${perfume.brand} • <strong>${perfume.family}</strong></p>
        <div class="price">$${perfume.price}</div>
      </div>
    `;
    catalogContainer.appendChild(card);
  });
}

// ==========================================
// 3. 5-STEP QUIZ LOGIC
// ==========================================
let userAnswers = {
  family: "",
  occasion: "",
  intensity: "",
  season: "",
  budget: ""
};

function selectOption(category, value) {
  userAnswers[category] = value;

  if (category === 'family') {
    document.getElementById("step-1").classList.add("hidden");
    document.getElementById("step-2").classList.remove("hidden");
  } 
  else if (category === 'occasion') {
    document.getElementById("step-2").classList.add("hidden");
    document.getElementById("step-3").classList.remove("hidden");
  }
  else if (category === 'intensity') {
    document.getElementById("step-3").classList.add("hidden");
    document.getElementById("step-4").classList.remove("hidden");
  }
  else if (category === 'season') {
    document.getElementById("step-4").classList.add("hidden");
    document.getElementById("step-5").classList.remove("hidden");
  }
  else if (category === 'budget') {
    document.getElementById("step-5").classList.add("hidden");
    document.getElementById("quiz-results").classList.remove("hidden");
    
    showRecommendations();
  }
}

function showRecommendations() {
  const recommendationsContainer = document.getElementById("recommendations-grid");
  recommendationsContainer.innerHTML = "";

  // Filter based on core family and budget first, or general matches
  let matchedPerfumes = perfumes.filter(p => 
    p.family === userAnswers.family && p.budget === userAnswers.budget
  );

  // If exact match found, display them
  if (matchedPerfumes.length > 0) {
    matchedPerfumes.forEach(perfume => renderCard(perfume, recommendationsContainer));
  } else {
    // Fallback: match by scent family if exact budget/family combo isn't found
    matchedPerfumes = perfumes.filter(p => p.family === userAnswers.family);

    if (matchedPerfumes.length > 0) {
      recommendationsContainer.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #666; margin-bottom: 15px;'>Here are top recommendations based on your preferred scent family:</p>";
      matchedPerfumes.forEach(perfume => renderCard(perfume, recommendationsContainer));
    } else {
      recommendationsContainer.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Explore our full catalog below to find your dream scent!</p>";
    }
  }
}

function renderCard(perfume, container) {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <img src="${perfume.image}" alt="${perfume.name}">
    <div class="product-info">
      <h4>${perfume.name}</h4>
      <p>${perfume.brand} • <strong>${perfume.family}</strong></p>
      <div class="price">$${perfume.price}</div>
    </div>
  `;
  container.appendChild(card);
}

function resetQuiz() {
  // Reset answers
  userAnswers = { family: "", occasion: "", intensity: "", season: "", budget: "" };
  
  // Hide results and show step 1
  document.getElementById("quiz-results").classList.add("hidden");
  document.getElementById("step-1").classList.remove("hidden");
}

// Load shop catalog automatically on page load
window.onload = function() {
  displayShopCatalog();
};