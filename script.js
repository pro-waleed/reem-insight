const page = document.body.dataset.page;

const create = (tag, className, content) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
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

const renderMarketSignals = () => {
  const container = document.getElementById("market-signals");
  if (!container || !window.appData) return;

  appData.marketSignals.forEach((signal) => {
    const article = create("article", "signal-card");
    article.append(create("span", "signal-source", signal.source));
    article.append(create("strong", "signal-value", signal.value));
    article.append(create("h3", "", signal.title));
    article.append(create("p", "", signal.context));
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
  article.append(create("p", "opportunity-note", item.whyNow));
  article.append(create("p", "opportunity-pilot", `نقطة الانطلاق المقترحة: ${item.pilot}`));

  const row = create("div", "score-row");
  row.append(create("span", "", `جاذبية ${item.attraction}`));
  row.append(create("span", "", `مخاطر ${item.risk}`));
  article.append(row);

  const link = create("a", "source-link", "عرض تفاصيل الفرصة");
  link.href = `opportunity.html?slug=${item.slug}`;
  article.append(link);

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
    sector.bullets.forEach((bullet) => list.append(create("li", "", bullet)));
    article.append(list);
    container.append(article);
  });
};

const renderSectorSignals = () => {
  const container = document.getElementById("sector-signals");
  if (!container || !window.appData) return;

  appData.sectors.forEach((sector) => {
    const article = create("article", "signal-card");
    article.append(create("span", "signal-source", sector.title));
    article.append(create("strong", "signal-value", sector.monetization));
    article.append(create("h3", "", "محفزات الطلب"));
    article.append(create("p", "", sector.demandDrivers.join(" - ")));
    article.append(create("h3", "", "المشترون المحتملون"));
    article.append(create("p", "", sector.personas.join(" - ")));
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
    article.append(create("small", "report-meta", report.meta));

    if (report.slug) {
      const link = create("a", "source-link", "فتح التقرير");
      link.href = `report.html?slug=${report.slug}`;
      article.append(link);
    }

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
    plan.features.forEach((feature) => list.append(create("li", "", feature)));
    article.append(list);
    container.append(article);
  });
};

const renderServices = () => {
  const container = document.getElementById("service-grid");
  if (!container || !window.appData) return;

  appData.servicePackages.forEach((pkg) => {
    const article = create("article", "service-card");
    article.append(create("span", "signal-source", pkg.audience));
    article.append(create("h3", "", pkg.name));
    article.append(create("strong", "signal-value", pkg.price));
    article.append(create("p", "opportunity-pilot", `مدة التسليم: ${pkg.turnaround}`));

    const list = create("ul", "bullet-list");
    pkg.services.forEach((item) => list.append(create("li", "", item)));
    article.append(list);
    container.append(article);
  });
};

const renderCities = () => {
  const container = document.getElementById("city-grid");
  if (!container || !window.appData) return;

  appData.demoCityData.forEach((city) => {
    const article = create("article", "city-card");
    article.append(create("h3", "", city.city));
    article.append(create("span", "signal-source", `الحجم السكاني: ${city.populationBand}`));

    const stats = create("div", "city-stats");
    [
      `الطلب الرقمي ${city.digitalDemand}`,
      `جاهزية FinTech ${city.fintechReadiness}`,
      `جاهزية التجارة ${city.commerceReadiness}`
    ].forEach((item) => stats.append(create("span", "", item)));

    article.append(stats);
    article.append(create("p", "", city.note));
    container.append(article);
  });
};

const renderDemoClients = () => {
  const container = document.getElementById("client-grid");
  if (!container || !window.appData) return;

  appData.demoClients.forEach((client) => {
    const article = create("article", "service-card");
    article.append(create("span", "signal-source", "حالة تجريبية"));
    article.append(create("h3", "", client.name));
    article.append(create("p", "", `الاحتياج: ${client.need}`));
    article.append(create("p", "opportunity-note", `الخدمة: ${client.solution}`));
    article.append(create("p", "opportunity-pilot", `النتيجة المتوقعة: ${client.outcome}`));
    container.append(article);
  });
};

const renderSources = () => {
  const container = document.getElementById("source-notes");
  if (!container || !window.appData) return;

  appData.sourceNotes.forEach((note) => {
    const article = create("article", "source-card");
    article.append(create("span", "signal-source", note.source));
    article.append(create("h3", "", note.title));
    article.append(create("p", "", note.summary));

    const link = create("a", "source-link", "فتح المصدر");
    link.href = note.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    article.append(link);

    container.append(article);
  });
};

const renderPlayers = () => {
  const filterBar = document.getElementById("company-filter-bar");
  const grid = document.getElementById("player-grid");
  if (!filterBar || !grid || !window.appData) return;

  const filters = [
    { id: "all", label: "الكل" },
    { id: "fintech", label: "FinTech" },
    { id: "commerce", label: "E-commerce" },
    { id: "edtech", label: "EdTech" },
    { id: "saas", label: "SME SaaS" },
    { id: "support", label: "جهات داعمة" }
  ];

  filters.forEach((filter, index) => {
    const button = create("button", `filter${index === 0 ? " active" : ""}`, filter.label);
    button.type = "button";
    button.dataset.filter = filter.id;
    filterBar.append(button);
  });

  appData.players.forEach((player) => {
    const article = create("article", "player-card");
    article.dataset.category = player.category;
    article.append(create("span", "signal-source", player.type));
    article.append(create("h3", "", player.name));
    article.append(create("p", "", player.focus));
    article.append(create("p", "opportunity-note", player.note));
    grid.append(article);
  });

  const filterButtons = filterBar.querySelectorAll(".filter");
  const cards = grid.querySelectorAll(".player-card");

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

const renderReportDetail = () => {
  const container = document.getElementById("report-detail");
  if (!container || !window.appData) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || "market-overview";
  const report = appData.reportBriefs[slug];
  if (!report) return;

  const hero = create("section", "report-hero");
  hero.append(create("span", "eyebrow", "تقرير قطاعي استعراضي"));
  hero.append(create("h1", "", report.title));
  hero.append(create("p", "hero-text", report.subtitle));
  container.append(hero);

  const summary = create("section", "report-summary-card");
  summary.append(create("h2", "", "ملخص تنفيذي"));
  summary.append(create("p", "", report.summary));

  const highlights = create("div", "report-highlight-grid");
  report.highlights.forEach((item) => {
    const article = create("article", "showcase-mini");
    article.append(create("p", "", item));
    highlights.append(article);
  });
  summary.append(highlights);
  container.append(summary);

  report.sections.forEach((section) => {
    const block = create("section", "report-section");
    block.append(create("h2", "", section.heading));
    block.append(create("p", "", section.text));
    container.append(block);
  });
};

const renderInvestmentCase = () => {
  const container = document.getElementById("investment-case");
  if (!container || !window.appData) return;

  const askCard = create("article", "investment-card featured-investment");
  askCard.append(create("span", "signal-source", "الاحتياج التمويلي"));
  askCard.append(create("strong", "signal-value", appData.investmentCase.ask));
  askCard.append(create("p", "", appData.investmentCase.thesis));
  container.append(askCard);

  const whyCard = create("article", "investment-card");
  whyCard.append(create("span", "signal-source", "لماذا يمكن أن تنجح؟"));
  const list = create("ul", "bullet-list");
  appData.investmentCase.whyWin.forEach((item) => list.append(create("li", "", item)));
  whyCard.append(list);
  container.append(whyCard);
};

const renderFinance = () => {
  const container = document.getElementById("finance-grid");
  if (!container || !window.appData) return;

  appData.financeModel.forEach((item) => {
    const article = create("article", "signal-card");
    article.append(create("span", "signal-source", item.label));
    article.append(create("strong", "signal-value", item.value));
    article.append(create("p", "", item.note));
    container.append(article);
  });
};

const renderRisks = () => {
  const container = document.getElementById("risk-grid");
  if (!container || !window.appData) return;

  appData.riskMitigations.forEach((item) => {
    const article = create("article", "signal-card");
    article.append(create("span", "signal-source", item.value));
    article.append(create("h3", "", item.title));
    article.append(create("p", "", item.context));
    container.append(article);
  });
};

const renderRevenueMix = () => {
  const container = document.getElementById("revenue-mix");
  if (!container || !window.appData) return;

  appData.revenueMix.forEach((item) => {
    const article = create("article", "signal-card");
    article.append(create("span", "signal-source", item.title));
    article.append(create("strong", "signal-value", item.value));
    article.append(create("p", "", item.context));
    container.append(article);
  });
};

const renderOpportunityDetail = () => {
  const container = document.getElementById("opportunity-detail");
  if (!container || !window.appData) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || appData.opportunities[0]?.slug;
  const item = appData.opportunities.find((entry) => entry.slug === slug);
  if (!item) return;

  const hero = create("section", "report-hero");
  hero.append(create("span", "eyebrow", item.label));
  hero.append(create("h1", "", item.title));
  hero.append(create("p", "hero-text", item.description));
  container.append(hero);

  const summary = create("section", "report-summary-card");
  summary.append(create("h2", "", "ملخص الفرصة"));
  summary.append(create("p", "", item.whyNow));

  const grid = create("div", "report-highlight-grid");
  [
    `المشتري: ${item.buyer}`,
    `الإيراد: ${item.revenueModel}`,
    `الانطلاق: ${item.pilot}`
  ].forEach((entry) => {
    const card = create("article", "showcase-mini");
    card.append(create("p", "", entry));
    grid.append(card);
  });
  summary.append(grid);
  container.append(summary);

  [
    { heading: "المشكلة", text: item.problem },
    { heading: "نطاق النسخة الأولى", text: item.buildScope },
    { heading: "الميزة التنافسية المحتملة", text: item.moat }
  ].forEach((section) => {
    const block = create("section", "report-section");
    block.append(create("h2", "", section.heading));
    block.append(create("p", "", section.text));
    container.append(block);
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
renderMarketSignals();
renderFeaturedSectors();
renderFeaturedOpportunities();
renderSectorDetails();
renderSectorSignals();
renderOpportunityFilters();
renderReports();
renderPricing();
renderServices();
renderCities();
renderDemoClients();
renderSources();
renderPlayers();
renderReportDetail();
renderInvestmentCase();
renderFinance();
renderRisks();
renderRevenueMix();
renderOpportunityDetail();
setupMenu();
markCurrentPage();
