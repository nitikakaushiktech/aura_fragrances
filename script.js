// ==========================================
// 1. THE PERFUME DATABASE (Mock Data)
// ==========================================
const perfumes = [
  {
    id: 1,
    name: "Velvet Rose",
    brand: "Jo Malone",
    price: 140,
    family: "Floral",
    occasion: "Party",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"
  },
  {
    id: 2,
    name: "Cedar Breeze",
    brand: "Tom Ford",
    price: 180,
    family: "Woody",
    occasion: "Daily",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400"
  },
  {
    id: 3,
    name: "Ocean Mist",
    brand: "Davidoff",
    price: 65,
    family: "Fresh",
    occasion: "Casual",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400"
  },
  {
    id: 4,
    name: "Jasmine Night",
    brand: "Gucci",
    price: 155,
    family: "Floral",
    occasion: "Party",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400"
  },
  {
    id: 5,
    name: "Amber Spice",
    brand: "Yves Saint Laurent",
    price: 160,
    family: "Oriental",
    occasion: "Party",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400"
  },
  {
    id: 6,
    name: "Citrus Splash",
    brand: "Dior",
    price: 95,
    family: "Fresh",
    occasion: "Daily",
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=400"
  },
  {
    id: 7,
    name: "Santal Nights",
    brand: "Le Labo",
    price: 220,
    family: "Woody",
    occasion: "Casual",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"
  },
  {
    id: 8,
    name: "Vanilla Cashmere",
    brand: "Maison Margiela",
    price: 135,
    family: "Oriental",
    occasion: "Casual",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400"
  }
];

// ==========================================
// 2. DISPLAY ALL PERFUMES IN THE SHOP CATALOG
// ==========================================
function displayShopCatalog() {
  const catalogContainer = document.getElementById("full-catalog");
  if (!catalogContainer) return;

  catalogContainer.innerHTML = ""; // Clear old content

  perfumes.forEach(perfume => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${perfume.image}" alt="${perfume.name}">
      <div class="product-info">
        <h4>${perfume.name}</h4>
        <p>${perfume.brand} • ${perfume.family}</p>
        <div class="price">$${perfume.price}</div>
      </div>
    `;
    catalogContainer.appendChild(card);
  });
}

// ==========================================
// 3. QUIZ INTERACTION & RECOMMENDATION LOGIC
// ==========================================
let userAnswers = {
  family: "",
  occasion: ""
};

function selectOption(category, value) {
  // Save user's answer
  userAnswers[category] = value;

  if (category === 'family') {
    // Hide Step 1, Show Step 2
    document.getElementById("step-1").classList.add("hidden");
    document.getElementById("step-2").classList.remove("hidden");
  } 
  else if (category === 'occasion') {
    // Hide Step 2, Show Results
    document.getElementById("step-2").classList.add("hidden");
    document.getElementById("quiz-results").classList.remove("hidden");
    
    showRecommendations();
  }
}

function showRecommendations() {
  const recommendationsContainer = document.getElementById("recommendations-grid");
  recommendationsContainer.innerHTML = "";

  // Filter perfumes based on user quiz answers
  const matchedPerfumes = perfumes.filter(p => 
    p.family === userAnswers.family && p.occasion === userAnswers.occasion
  );

  // If exact matches are found, show them
  if (matchedPerfumes.length > 0) {
    matchedPerfumes.forEach(perfume => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${perfume.image}" alt="${perfume.name}">
        <div class="product-info">
          <h4>${perfume.name}</h4>
          <p>${perfume.brand} • ${perfume.family}</p>
          <div class="price">$${perfume.price}</div>
        </div>
      `;
      recommendationsContainer.appendChild(card);
    });
  } else {
    // Fallback if no exact match: show perfumes matching just the family
    const partialMatches = perfumes.filter(p => p.family === userAnswers.family);
    
    if (partialMatches.length > 0) {
      recommendationsContainer.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #666;'>We couldn't find an exact match for both choices, but you'll love these based on your scent preference:</p>";
      partialMatches.forEach(perfume => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
          <img src="${perfume.image}" alt="${perfume.name}">
          <div class="product-info">
            <h4>${perfume.name}</h4>
            <p>${perfume.brand} • ${perfume.family}</p>
            <div class="price">$${perfume.price}</div>
          </div>
        `;
        recommendationsContainer.appendChild(card);
      });
    } else {
      recommendationsContainer.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>No perfumes found matching your exact criteria. Explore our full catalog below!</p>";
    }
  }
}

// Run this function when the page loads to display the shop catalog automatically
window.onload = function() {
  displayShopCatalog();
};