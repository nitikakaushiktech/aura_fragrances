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

      <button type="button" class="cart-btn" id="cart-btn" aria-label="Open cart, 0 items">🛍 Cart (<span id="cart-count">0</span>)</button>

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
  setupCart();
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
      `<li><a href="${productUrl(p)}"><strong>${p.name}</strong><span>${p.brand} • ${p.family} • ${formatPrice(p.price)}</span></a></li>`
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

// ==========================================
// Cart: stored in localStorage, shared by every page
// ==========================================
const CART_KEY = "aura_cart_v1";
const MAX_QTY = 10;

const Cart = (() => {
  let fallback = [];          // used if localStorage is blocked
  const listeners = [];

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (!Array.isArray(raw)) return [];
      return raw
        .filter(i => i && getPerfume(i.id) && SIZES.some(s => s.label === i.size) && i.qty > 0)
        .map(i => ({
          id: Number(i.id), size: String(i.size),
          // older saved carts have no price: work it out from the size
          price: Number(i.price) > 0 ? Number(i.price) : priceForSize(getPerfume(i.id), i.size),
          qty: Math.min(MAX_QTY, Math.floor(i.qty))
        }));
    } catch { return fallback.slice(); }
  }
  function save(items) {
    fallback = items;
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {}
    changed();
  }
  function changed() { listeners.forEach(fn => fn()); }
  const same = (i, id, size) => i.id === Number(id) && i.size === size;

  return {
    items: load,
    count: () => load().reduce((n, i) => n + i.qty, 0),
    total: () => load().reduce((sum, i) => sum + i.price * i.qty, 0),
    add(id, size, qty = 1) {
      const items = load();
      const price = priceForSize(getPerfume(id), size);   // size-adjusted unit price
      const line = items.find(i => same(i, id, size));
      if (line) { line.qty = Math.min(MAX_QTY, line.qty + qty); line.price = price; }
      else items.push({ id: Number(id), size, price, qty: Math.min(MAX_QTY, qty) });
      save(items);
    },
    setQty(id, size, qty) {
      save(load().map(i => same(i, id, size) ? { ...i, qty: Math.min(MAX_QTY, qty) } : i).filter(i => i.qty > 0));
    },
    remove(id, size) { save(load().filter(i => !same(i, id, size))); },
    clear() { save([]); },
    onChange(fn) { listeners.push(fn); }
  };
})();

function showToast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast"; t.className = "toast hidden"; t.setAttribute("role", "status");
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.add("hidden"), 2500);
}

function setupCart() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="cart-overlay" id="cart-overlay"></div>
    <aside class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden="true">
      <div class="cart-head">
        <h3 id="cart-title">Your cart</h3>
        <button type="button" class="cart-close" id="cart-close" aria-label="Close cart">✕</button>
      </div>
      <div class="cart-body" id="cart-body"></div>
      <div class="cart-foot hidden" id="cart-foot">
        <div class="cart-total"><span>Total</span><strong id="cart-total">₹0</strong></div>
        <button type="button" class="btn btn-block" id="cart-checkout">Checkout</button>
        <button type="button" class="link-btn" id="cart-clear">Clear cart</button>
      </div>
    </aside>`);

  const $ = id => document.getElementById(id);
  const btn = $("cart-btn"), countEl = $("cart-count"), overlay = $("cart-overlay"), drawer = $("cart-drawer");
  const body = $("cart-body"), foot = $("cart-foot"), totalEl = $("cart-total");
  let lastCount = Cart.count();

  const rowHTML = i => {
    const p = getPerfume(i.id);
    return `
      <li class="cart-item" data-id="${p.id}" data-size="${i.size}">
        <a href="${productUrl(p)}"><img src="${p.image}" alt="${p.name}" onerror="${imgOnError(p)}"></a>
        <div class="cart-item-info">
          <a class="cart-item-name" href="${productUrl(p)}">${p.name}</a>
          <span class="cart-item-meta">${p.brand} • ${i.size}</span>
          <span class="cart-item-meta">${formatPrice(i.price)} each</span>
          <div class="qty">
            <button type="button" data-act="dec" aria-label="Decrease quantity">−</button>
            <span aria-live="polite">${i.qty}</span>
            <button type="button" data-act="inc" aria-label="Increase quantity" ${i.qty >= MAX_QTY ? "disabled" : ""}>+</button>
          </div>
        </div>
        <div class="cart-item-side">
          <strong>${formatPrice(i.price * i.qty)}</strong>
          <button type="button" class="link-btn" data-act="remove">Remove</button>
        </div>
      </li>`;
  };

  function refresh() {
    const items = Cart.items();
    const n = items.reduce((sum, i) => sum + i.qty, 0);
    countEl.textContent = n;
    btn.setAttribute("aria-label", `Open cart, ${n} item${n === 1 ? "" : "s"}`);
    if (n > lastCount) { btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump"); }
    lastCount = n;

    body.innerHTML = items.length
      ? `<ul class="cart-list">${items.map(rowHTML).join("")}</ul>`
      : `<div class="cart-empty"><p>Your cart is empty.</p><a class="btn" href="index.html?view=all#shop-section">Browse perfumes</a></div>`;
    foot.classList.toggle("hidden", !items.length);
    totalEl.textContent = formatPrice(Cart.total());
  }

  function open() {
    drawer.classList.add("open"); overlay.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    $("cart-close").focus();
  }
  function close() {
    drawer.classList.remove("open"); overlay.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
    btn.focus();
  }
  Cart.open = open; Cart.close = close;

  btn.addEventListener("click", open);
  $("cart-close").addEventListener("click", close);
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && drawer.classList.contains("open")) close(); });

  drawer.addEventListener("click", e => {
    if (e.target.closest("a")) { close(); return; }
    const b = e.target.closest("button[data-act]");
    if (!b) return;
    const row = b.closest(".cart-item");
    const { id, size } = row.dataset;
    const line = Cart.items().find(i => i.id === Number(id) && i.size === size);
    if (!line) return;
    if (b.dataset.act === "inc") Cart.setQty(id, size, line.qty + 1);
    else if (b.dataset.act === "dec") Cart.setQty(id, size, line.qty - 1);
    else Cart.remove(id, size);
  });

  $("cart-clear").addEventListener("click", () => Cart.clear());
  $("cart-checkout").addEventListener("click", () => showToast("Checkout isn't connected yet. This is a demo cart."));

  Cart.onChange(refresh);
  window.addEventListener("storage", e => { if (e.key === CART_KEY) refresh(); }); // other tabs
  refresh();
}
