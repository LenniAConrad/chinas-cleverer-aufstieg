(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const header = document.querySelector("[data-site-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (header) {
    let frame = 0;
    const update = function () {
      frame = 0;
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    };
    const schedule = function () {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }

  if (navToggle && nav) {
    const setNav = function (open) {
      document.body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.querySelector(".sr-only").textContent = open ? "Menü schließen" : "Menü öffnen";
    };

    navToggle.addEventListener("click", function () {
      setNav(!document.body.classList.contains("nav-open"));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !document.body.classList.contains("nav-open")) return;
      setNav(false);
      navToggle.focus();
    });
  }

  // Data companion: mark the jump link whose chart is currently in view.
  const chartLinks = Array.from(document.querySelectorAll("[data-chart-link]"));
  const chartSections = chartLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if (chartLinks.length && chartSections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        chartLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-28% 0px -60%", threshold: 0 });
    chartSections.forEach(function (section) { observer.observe(section); });
  }
})();
