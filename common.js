// ==========================================
// Shared layout: sticky header (menu + search) and footer
// ==========================================
const NAV_ITEMS = [
  { label: "Bestsellers",  view: "bestsellers" },
  { label: "Perfumes",     view: "all" },
  { label: "New Arrivals", view: "new" },
  { label: "Gifting",      view: "gifting" }
];

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const current = new URLSearchParams(location.search).get("view");
  const onHome = /(^|\/)(index\.html)?$/.test(location.pathname);

  mount.innerHTML = `
    <header class="site-header">
      <a class="logo" href="index.html">✨ AURA Fragrances</a>

      <form class="search-box" id="search-form" role="search" autocomplete="off">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <input id="search-input" type="search" placeholder="Search perfumes, brands, scents" aria-label="Search perfumes">
        <ul id="search-suggestions" class="suggestions hidden"></ul>
      </form>

      <button class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false">☰</button>

      <nav class="main-nav" id="main-nav" aria-label="Main">
        ${NAV_ITEMS.map(n => `<a href="index.html?view=${n.view}#shop-section" class="${onHome && current === n.view ? "active" : ""}">${n.label}</a>`).join("")}
        <a href="index.html#quiz-section">Take Quiz</a>
      </nav>
    </header>`;

  // Mobile menu
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", e => { if (e.target.tagName === "A") nav.classList.remove("open"); });

  setupSearch();
}

function setupSearch() {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const list = document.getElementById("search-suggestions");

  // Pre-fill when arriving from a search
  const q = new URLSearchParams(location.search).get("q");
  if (q) input.value = q;

  input.addEventListener("input", () => {
    const matches = searchPerfumes(input.value).slice(0, 5);
    if (!input.value.trim() || !matches.length) { list.classList.add("hidden"); return; }
    list.innerHTML = matches.map(p =>
      `<li><a href="${productUrl(p)}"><strong>${p.name}</strong><span>${p.brand} • ${p.family} • $${p.price}</span></a></li>`
    ).join("");
    list.classList.remove("hidden");
  });

  document.addEventListener("click", e => { if (!form.contains(e.target)) list.classList.add("hidden"); });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const term = input.value.trim();
    if (term) location.href = `index.html?q=${encodeURIComponent(term)}#shop-section`;
  });
}

// Matches name, brand, family, season, occasion, price words
function searchPerfumes(query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return perfumes.filter(p => {
    const hay = `${p.name} ${p.brand} ${p.family} ${p.season} ${p.occasion} ${p.intensity} ${p.notes.top} ${p.notes.heart} ${p.notes.base}`.toLowerCase();
    return words.every(w => hay.includes(w));
  });
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = `
    <footer class="site-footer" id="contact">
      <div class="footer-grid">
        <div>
          <div class="logo">✨ AURA Fragrances</div>
          <p>Find a scent that fits your style, occasion and budget.</p>
        </div>
        <div>
          <h4>Shop</h4>
          ${NAV_ITEMS.map(n => `<a href="index.html?view=${n.view}#shop-section">${n.label}</a>`).join("")}
        </div>
        <div>
          <h4>Contact us</h4>
          <p><a href="mailto:support@aurafragrances.com">support@aurafragrances.com</a></p>
          <p><a href="tel:+911234567890">+91 12345 67890</a></p>
          <p>Mon–Sat, 10:00 am – 6:00 pm</p>
        </div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} AURA Fragrances. All rights reserved.</div>
    </footer>`;
}

document.addEventListener("DOMContentLoaded", () => { renderHeader(); renderFooter(); });
