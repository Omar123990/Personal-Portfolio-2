// ^ Write your JavaScript code here
"use strict";

const scrollBtn = document.querySelector("#scroll-to-top");
const btnTheme = document.querySelector("#theme-toggle-button");
const htmlTheme = document.documentElement;
const filterButtons = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const settingsToggle = document.getElementById("settings-toggle");
const settingsSidebar = document.getElementById("settings-sidebar");
const closeSettings = document.getElementById("close-settings");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  htmlTheme.classList.add("dark");
  btnTheme.setAttribute("aria-pressed", "true");
} else {
  htmlTheme.classList.remove("dark");
  btnTheme.setAttribute("aria-pressed", "false");
}
btnTheme.addEventListener("click", () => {
  const isDark = htmlTheme.classList.toggle("dark");
  btnTheme.setAttribute("aria-pressed", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-primary", "font-bold");
    link.classList.add("text-slate-600", "dark:text-slate-300");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("text-primary", "font-bold");
      link.classList.remove("text-slate-600", "dark:text-slate-300");
    }
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white"
      );
      btn.classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300"
      );
      btn.setAttribute("aria-pressed", "false");
    });

    button.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white"
    );
    button.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300"
    );
    button.setAttribute("aria-pressed", "true");

    portfolioItems.forEach((item) => {
      const category = item.dataset.category;

      if (filter === "all" || category === filter) {
        item.classList.remove("hidden");
        item.classList.add("block");
      } else {
        item.classList.add("hidden");
        item.classList.remove("block");
      }
    });
  });
});
 settingsToggle.addEventListener("click", () => {
    const isOpen = settingsSidebar.classList.contains("translate-x-0");

    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // زرار الإغلاق X
  closeSettings.addEventListener("click", closeSidebar);

  function openSidebar() {
    settingsSidebar.classList.remove("translate-x-full");
    settingsSidebar.classList.add("translate-x-0");

    settingsSidebar.setAttribute("aria-hidden", "false");
    settingsToggle.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    settingsSidebar.classList.remove("translate-x-0");
    settingsSidebar.classList.add("translate-x-full");

    settingsSidebar.setAttribute("aria-hidden", "true");
    settingsToggle.setAttribute("aria-expanded", "false");
  }

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("opacity-0", "invisible");
    scrollBtn.classList.add("opacity-100", "visible");
  } else {
    scrollBtn.classList.add("opacity-0", "invisible");
    scrollBtn.classList.remove("opacity-100", "visible");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
