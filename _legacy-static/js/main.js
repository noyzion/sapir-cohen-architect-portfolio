(function () {
  const STORAGE_KEY = "sapir-lang";
  let lang = localStorage.getItem(STORAGE_KEY) || "he";

  const html = document.documentElement;
  const langToggle = document.getElementById("langToggle");
  const header = document.getElementById("header");
  const nav = document.getElementById("siteNav");
  const menuBtn = document.querySelector(".menu-btn");
  const portfolioGrid = document.getElementById("portfolioGrid");
  const contactEmail = document.getElementById("contactEmail");

  function applyLang(code) {
    lang = code;
    localStorage.setItem(STORAGE_KEY, code);
    html.lang = code;
    html.dir = code === "he" ? "rtl" : "ltr";
    langToggle.textContent = code === "he" ? "EN" : "עב";

    const t = translations[code];
    document.title = t.metaTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.metaDesc);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    renderWorks();
  }

  function renderWorks() {
    if (!portfolioGrid) return;
    const t = translations[lang];
    const preview = t["portfolio.preview"];

    portfolioGrid.innerHTML = portfolioProjects
      .map((p) => {
        const name = p.name[lang];
        const type = p.type[lang];
        const desc = p.desc[lang];
        const loc = p.location[lang];
        const meta = [type, loc].filter(Boolean).join(" · ");
        const hasGallery = p.gallery?.length > 0;
        const galleryHtml = hasGallery
          ? `
            <div class="work-gallery" aria-label="${name}">
              ${p.gallery
                .map((item) => {
                  const caption = item.caption?.[lang] || "";
                  return `
                <figure class="work-gallery__item">
                  <img src="${item.src}" alt="${caption || name}" loading="lazy" />
                  ${caption ? `<figcaption>${caption}</figcaption>` : ""}
                </figure>
              `;
                })
                .join("")}
            </div>
          `
          : "";

        return `
          <article class="work-card${hasGallery ? " work-card--gallery" : ""}" id="${p.id}">
            <div class="work-card__img">
              <img src="${p.image}" alt="${name}" loading="lazy"
                onerror="this.hidden=true; this.nextElementSibling.hidden=false;">
              <div class="work-card__ph" hidden>
                <span>${preview}</span>
              </div>
            </div>
            <div class="work-card__body">
              <p class="work-card__cat">${meta}</p>
              <h3 class="work-card__name">${name}</h3>
              <p class="work-card__desc">${desc}</p>
              ${galleryHtml}
            </div>
          </article>
        `;
      })
      .join("");
  }

  langToggle?.addEventListener("click", () => {
    applyLang(lang === "he" ? "en" : "he");
  });

  window.addEventListener("scroll", () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  });

  menuBtn?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  document.querySelectorAll(".site-nav__links a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuBtn?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  applyLang(lang);
})();
