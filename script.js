// ==========================================
// Home page: shop catalog (menu views + search) and the 5-step quiz
// Perfume data lives in data.js, header/footer/search in common.js
// ==========================================

// ---------- Shop catalog ----------
const VIEWS = {
  all:          { title: "Perfume Collection Categorized by Profile", filter: () => true,          group: true },
  bestsellers:  { title: "Bestsellers",  filter: p => p.bestseller, group: false },
  new:          { title: "New Arrivals", filter: p => p.isNew,      group: false },
  gifting:      { title: "Gifting",      filter: p => p.gift,       group: false }
};

function displayShopCatalog() {
  const container = document.getElementById("full-catalog");
  const heading = document.getElementById("shop-title");
  if (!container) return;

  const params = new URLSearchParams(location.search);
  const query = (params.get("q") || "").trim();
  const view = VIEWS[params.get("view")] || VIEWS.all;

  container.innerHTML = "";

  // Search results
  if (query) {
    const results = searchPerfumes(query);
    heading.textContent = `Results for “${query}”`;
    container.innerHTML = results.length
      ? `<div class="product-grid">${results.map(cardHTML).join("")}</div>`
      : `<div class="empty-state"><h4>No perfumes match “${query.replace(/</g, "&lt;")}”</h4>
         <p>Try a brand, a scent family like “woody”, or a season like “summer”.</p>
         <a class="btn" href="index.html?view=all#shop-section">Browse all perfumes</a></div>`;
    return;
  }

  heading.textContent = view.title;
  const list = perfumes.filter(view.filter);

  // Flat grid for Bestsellers / New / Gifting
  if (!view.group) {
    container.innerHTML = `<div class="product-grid">${list.map(cardHTML).join("")}</div>`;
    return;
  }

  // Grouped by scent profile for "Perfumes"
  [...new Set(list.map(p => p.family))].forEach(profile => {
    const section = document.createElement("div");
    section.className = "category-section";
    section.innerHTML = `
      <h3 class="category-title" style="border-color:${THEMES[profile].accent}">${THEMES[profile].emoji} ${profile} Profile Collection</h3>
      <div class="product-grid">${list.filter(p => p.family === profile).map(cardHTML).join("")}</div>`;
    container.appendChild(section);
  });
}

// ---------- Quiz ----------
let userAnswers = { family: "", occasion: "", intensity: "", season: "", budget: "" };
const QUIZ_ORDER = ["family", "occasion", "intensity", "season", "budget"];

function selectOption(category, value) {
  userAnswers[category] = value;
  const i = QUIZ_ORDER.indexOf(category);
  document.getElementById(`step-${i + 1}`).classList.add("hidden");

  if (i < QUIZ_ORDER.length - 1) {
    document.getElementById(`step-${i + 2}`).classList.remove("hidden");
  } else {
    document.getElementById("quiz-results").classList.remove("hidden");
    showRecommendations();
  }
}

function showRecommendations() {
  const grid = document.getElementById("recommendations-grid");
  const note = msg => `<p class="grid-note">${msg}</p>`;
  const a = userAnswers;

  let matched = perfumes.filter(p => p.family === a.family && p.budget === a.budget && p.occasion === a.occasion);
  let intro = "";

  if (!matched.length) {
    matched = perfumes.filter(p => p.family === a.family && p.budget === a.budget);
    intro = note("We couldn't find an exact match for that occasion, but here are top matches in your preferred scent family and budget:");
  }
  if (!matched.length) {
    matched = perfumes.filter(p => p.family === a.family);
    intro = note("Here are alternative selections within your preferred scent family:");
  }

  grid.innerHTML = matched.length
    ? intro + matched.map(cardHTML).join("")
    : `<div class="empty-state"><h4>No exact matches found for this combination 🌸</h4>
       <p>Explore the full catalog by scent profile, or retake the quiz.</p>
       <a href="index.html?view=all#shop-section" class="btn">Browse Catalog</a></div>`;
}

function resetQuiz() {
  userAnswers = { family: "", occasion: "", intensity: "", season: "", budget: "" };
  document.getElementById("quiz-results").classList.add("hidden");
  document.getElementById("step-1").classList.remove("hidden");
}

window.addEventListener("DOMContentLoaded", displayShopCatalog);
