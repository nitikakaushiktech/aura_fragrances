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

// Weighted scoring (total 100). Budget is a HARD filter, so it never shows
// perfumes outside the chosen range; family and budget carry the most weight.
const SCORE_WEIGHTS = { family: 40, budget: 30, occasion: 12, intensity: 9, season: 9 };
const INTENSITY_RANK = { Subtle: 0, Moderate: 1, Bold: 2 };
const MAX_RESULTS = 6;

function scorePerfume(p, a) {
  const w = SCORE_WEIGHTS;
  let score = 0;
  if (p.family === a.family) score += w.family;
  if (p.budget === a.budget) score += w.budget;
  if (p.occasion === a.occasion) score += w.occasion;

  // Intensity: full points if equal, half if one step away
  const gap = Math.abs(INTENSITY_RANK[p.intensity] - INTENSITY_RANK[a.intensity]);
  score += gap === 0 ? w.intensity : gap === 1 ? w.intensity / 2 : 0;

  // Season: full for same season, partial if either is all-season
  if (p.season === a.season) score += w.season;
  else if (p.season === "All" || a.season === "All") score += w.season * 0.6;

  return Math.round(score);
}

function showRecommendations() {
  const grid = document.getElementById("recommendations-grid");
  const note = msg => `<p class="grid-note">${msg}</p>`;
  const a = userAnswers;

  // 1. Strict budget filter: nothing outside the chosen range is ever shown
  const inBudget = perfumes
    .filter(p => p.budget === a.budget)
    .map(p => ({ p, score: scorePerfume(p, a) }));

  // 2. Rank: score first, then bestsellers, then lower price
  const rank = (x, y) => y.score - x.score || (y.p.bestseller - x.p.bestseller) || (x.p.price - y.p.price);

  // 3. Prefer the chosen scent family; only fall back to other families if none exist in budget
  let results = inBudget.filter(r => r.p.family === a.family).sort(rank);
  let intro = "";

  if (!results.length && inBudget.length) {
    results = inBudget.sort(rank);
    intro = note(`We don't have ${a.family.toLowerCase()} scents in the ${PRICE_RANGE_LABEL[a.budget]} range yet. Here are the closest picks within your budget:`);
  }

  results = results.slice(0, MAX_RESULTS);

  grid.innerHTML = results.length
    ? intro + results.map(r => cardHTML(r.p)).join("")
    : `<div class="empty-state"><h4>No perfumes found in this budget 🌸</h4>
       <p>Explore the full catalog by scent profile, or retake the quiz.</p>
       <a href="index.html?view=all#shop-section" class="btn">Browse Catalog</a></div>`;
}

function resetQuiz() {
  userAnswers = { family: "", occasion: "", intensity: "", season: "", budget: "" };
  document.getElementById("quiz-results").classList.add("hidden");
  document.getElementById("step-1").classList.remove("hidden");
}

window.addEventListener("DOMContentLoaded", displayShopCatalog);
