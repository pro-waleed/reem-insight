const page = document.body.dataset.page;

const create = (tag, className, content) => {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (content !== undefined) {
    node.textContent = content;
  }
  return node;
};

const renderHeroStats = () => {
  const container = document.getElementById("hero-stats");
  if (!container || !window.appData) return;

  appData.heroStats.forEach((item) => {
    const article = create("article");
    article.append(create("strong", "", item.value));
    article.append(create("span", "", item.label));
    container.append(article);
  });
};

const renderMetrics = () => {
  const container = document.getElementById("key-metrics");
  if (!container || !window.appData) return;

  appData.metrics.forEach((metric) => {
    const article = create("article", "metric");
    article.append(create("span", "metric-label", metric.label));
    article.append(create("strong", "", metric.value));
    article.append(create("p", "", metric.text));
    container.append(article);
  });
};

const renderFeaturedSectors = () => {
  const container = document.getElementById("featured-sectors");
  if (!container || !window.appData) return;

  appData.sectors.forEach((sector) => {
    const article = create("article", "sector-overview-card");
    article.append(create("span", "sector-score", sector.score));
    article.append(create("h3", "", sector.title));
    article.append(create("p", "", sector.text));
    container.append(article);
  });
};

const createOpportunityCard = (item) => {
  const article = create("article", "opportunity-card");
  article.dataset.category = item.category;
  article.append(create("span", "op-tag", item.label));
  article.append(create("h3", "", item.title));
  article.append(create("p", "", item.description));

  const row = create("div", "score-row");
  row.append(create("span", "", `جاذبية ${item.attraction}`));
  row.append(create("span", "", `مخاطر ${item.risk}`));
  article.append(row);

  return article;
};

const renderFeaturedOpportunities = () => {
  const container = document.getElementById("featured-opportunities");
  if (!container || !window.appData) return;

  appData.opportunities.slice(0, 4).forEach((item) => {
    container.append(createOpportunityCard(item));
  });
};

const renderSectorDetails = () => {
  const container = document.getElementById("sector-detail-grid");
  if (!container || !window.appData) return;

  appData.sectors.forEach((sector) => {
    const article = create("article", "sector-detail-card");
    article.append(create("span", "sector-score", sector.score));
    article.append(create("h3", "", sector.title));
    article.append(create("p", "", sector.text));

    const list = create("ul", "bullet-list");
    sector.bullets.forEach((bullet) => {
      list.append(create("li", "", bullet));
    });

    article.append(list);
    container.append(article);
  });
};

const renderOpportunityFilters = () => {
  const container = document.getElementById("filter-bar");
  const grid = document.getElementById("opportunity-grid");
  if (!container || !grid || !window.appData) return;

  const filters = [
    { id: "all", label: "الكل" },
    { id: "fintech", label: "FinTech" },
    { id: "commerce", label: "E-commerce" },
    { id: "edtech", label: "EdTech" },
    { id: "saas", label: "SME SaaS" }
  ];

  filters.forEach((filter, index) => {
    const button = create("button", `filter${index === 0 ? " active" : ""}`, filter.label);
    button.type = "button";
    button.dataset.filter = filter.id;
    container.append(button);
  });

  appData.opportunities.forEach((item) => {
    grid.append(createOpportunityCard(item));
  });

  const filterButtons = container.querySelectorAll(".filter");
  const cards = grid.querySelectorAll(".opportunity-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      cards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !matches);
      });
    });
  });
};

const renderReports = () => {
  const container = document.getElementById("report-grid");
  if (!container || !window.appData) return;

  appData.reports.forEach((report) => {
    const article = create("article", "report-card");
    article.append(create("h3", "", report.title));
    article.append(create("p", "", report.text));
    article.append(create("span", "", report.subtext));
    container.append(article);
  });
};

const renderPricing = () => {
  const container = document.getElementById("pricing-grid");
  if (!container || !window.appData) return;

  appData.pricing.forEach((plan) => {
    const article = create("article", `price-card${plan.featured ? " featured" : ""}`);
    article.append(create("h3", "", plan.name));
    article.append(create("strong", "", plan.price));

    const list = create("ul", "bullet-list");
    plan.features.forEach((feature) => {
      list.append(create("li", "", feature));
    });

    article.append(list);
    container.append(article);
  });
};

const setupMenu = () => {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
};

const markCurrentPage = () => {
  const currentFile = `${page}.html`;
  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if ((page === "home" && href === "index.html") || href === currentFile) {
      link.classList.add("current");
    }
  });
};

renderHeroStats();
renderMetrics();
renderFeaturedSectors();
renderFeaturedOpportunities();
renderSectorDetails();
renderOpportunityFilters();
renderReports();
renderPricing();
setupMenu();
markCurrentPage();
