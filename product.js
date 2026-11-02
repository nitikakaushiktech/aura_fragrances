// ==========================================
// Product page: product.html?id=N  (themed by scent family)
// ==========================================
function renderProduct() {
  const root = document.getElementById("product-root");
  const p = getPerfume(new URLSearchParams(location.search).get("id"));

  if (!p) {
    root.innerHTML = `<section class="empty-state"><h4>We couldn't find that perfume</h4>
      <p>It may have been removed. Browse the full collection instead.</p>
      <a class="btn" href="index.html?view=all#shop-section">Browse perfumes</a></section>`;
    return;
  }

  const t = THEMES[p.family];
  document.title = `${p.name} | Aura`;
  document.body.style.setProperty("--theme-accent", t.accent);
  document.body.style.setProperty("--theme-soft", t.soft);
  document.body.style.setProperty("--theme-deep", t.deep);

  const related = perfumes.filter(x => x.family === p.family && x.id !== p.id).slice(0, 4);

  root.innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a> / <a href="index.html?view=all#shop-section">Perfumes</a> / <span>${p.name}</span>
    </nav>

    <section class="product-hero">
      <div class="product-media">
        <img src="${p.image}" alt="${p.name} by ${p.brand}">
      </div>

      <div class="product-detail">
        <span class="family-chip">${t.emoji} ${p.family} • ${t.tagline}</span>
        <h1>${p.name}</h1>
        <p class="brand">by ${p.brand}</p>
        <div class="detail-price">$${p.price}</div>
        <p class="detail-desc">${p.description}</p>

        <dl class="spec-list">
          <div><dt>Strength</dt><dd>${INTENSITY_LABEL[p.intensity]}</dd></div>
          <div><dt>Best for</dt><dd>${OCCASION_LABEL[p.occasion]}</dd></div>
          <div><dt>Season</dt><dd>${SEASON_LABEL[p.season]}</dd></div>
          <div><dt>Price range</dt><dd>${{Budget:"Under $100", Mid:"$100 – $150", Luxury:"Above $150"}[p.budget]}</dd></div>
        </dl>

        <div class="size-row" role="radiogroup" aria-label="Bottle size">
          ${["30 ml", "50 ml", "100 ml"].map((s, i) => `<button class="size-btn ${i === 1 ? "selected" : ""}" role="radio" aria-checked="${i === 1}">${s}</button>`).join("")}
        </div>

        <div class="buy-row">
          <button class="btn btn-theme" id="add-cart">Add to cart</button>
          <a class="btn btn-outline" href="index.html#quiz-section">Retake quiz</a>
        </div>
      </div>
    </section>

    <section class="notes-section">
      <h2>Scent notes</h2>
      <div class="notes-grid">
        <div class="note"><h3>Top</h3><p>${p.notes.top}</p></div>
        <div class="note"><h3>Heart</h3><p>${p.notes.heart}</p></div>
        <div class="note"><h3>Base</h3><p>${p.notes.base}</p></div>
      </div>
    </section>

    ${related.length ? `<section class="related">
      <h2>More ${p.family.toLowerCase()} scents</h2>
      <div class="product-grid">${related.map(cardHTML).join("")}</div>
    </section>` : ""}`;

  // Size selection
  root.querySelectorAll(".size-btn").forEach(btn => btn.addEventListener("click", () => {
    root.querySelectorAll(".size-btn").forEach(b => { b.classList.remove("selected"); b.setAttribute("aria-checked", "false"); });
    btn.classList.add("selected"); btn.setAttribute("aria-checked", "true");
  }));

  // Add to cart (demo: shows a confirmation only)
  document.getElementById("add-cart").addEventListener("click", () => {
    const size = root.querySelector(".size-btn.selected").textContent;
    const toast = document.getElementById("toast");
    toast.textContent = `Added ${p.name} (${size}) to cart`;
    toast.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.add("hidden"), 2500);
  });
}

window.addEventListener("DOMContentLoaded", renderProduct);
