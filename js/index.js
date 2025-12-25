"use strict";

const scrollBtn = document.querySelector("#scroll-to-top");
const btnTheme = document.querySelector("#theme-toggle-button");
const htmlTheme = document.querySelector("html");
const filterButtons = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const settingsToggle = document.getElementById("settings-toggle");
const settingsSidebar = document.getElementById("settings-sidebar");
const closeSettings = document.getElementById("close-settings");
const buttons = document.querySelectorAll("button.btn-color");
const savedTheme = localStorage.getItem("theme");
const mobileMenuBtn = document.querySelector("#mobile-menu-toggle");
const navLink = document.querySelector(".nav-links");
const fontButtons = document.querySelectorAll(".font-option");
const resetBtn = document.getElementById("reset-settings");
const carousel = document.querySelector("#testimonials-carousel");
const cards = document.querySelectorAll(".testimonial-card");
const nextBtn = document.querySelector("#next-testimonial");
const prevBtn = document.querySelector("#prev-testimonial");
const indicators = document.querySelectorAll(".carousel-indicator");
const counters = document.querySelectorAll("#statistics-section div.text-5xl");

// start theme button
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
// end theme button
// start  scrollSpy
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
// end  scrollSpy
// start portofolio buttons
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
// end portofolio buttons
// start settings
settingsToggle.addEventListener("click", () => {
  const isOpen = settingsSidebar.classList.contains("translate-x-0");

  if (isOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

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
// end settings
// start scroll to top
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
// end scroll to top
// start theme
const root = document.documentElement;
const DEFAULT_THEME = "themePurple";
const colorBtns = document.querySelectorAll(".btn-color");

const themes = {
  themeBlue: ["#1E9FE4", "#6EC6F2"],
  themeGreen: ["#0BA976", "#5ED6B3"],
  themeOrange: ["#F35F51", "#F8A097"],
  themePurple: ["#7C5FF4", "#B7A6FA"],
  themeYellow: ["#F07D0C", "#F6B26B"],
  themePink: ["#F14151", "#F7A1A9"],
};

function applyTheme(id) {
  if (!themes[id]) return;

  const [p, s] = themes[id];
  root.style.setProperty("--color-primary", p);
  root.style.setProperty("--color-secondary", s);
  localStorage.setItem("themeColor", id);

  colorBtns.forEach((b) =>
    b.classList.toggle("active", b.id === id)
  );
}

colorBtns.forEach((btn) => {
  btn.onclick = () => applyTheme(btn.id);
});

const saved = localStorage.getItem("themeColor") || DEFAULT_THEME;
applyTheme(saved);

resetBtn?.addEventListener("click", () => {
  localStorage.removeItem("themeColor");
  applyTheme(DEFAULT_THEME);
});

// end theme
// start mobile menu
mobileMenuBtn.onclick = () => {
  if (navLink.className.includes("active")) {
    navLink.className = navLink.className.replace(" active", "");
  } else {
    navLink.className += " active";
  }
};
// end mobile menu
// start font
fontButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const font = button.dataset.font;

    document.body.style.fontFamily = font;

    fontButtons.forEach((btn) => btn.setAttribute("aria-checked", "false"));
    button.setAttribute("aria-checked", "true");

    fontButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    localStorage.setItem("selectedFont", font);
  });
});

const savedFont = localStorage.getItem("selectedFont");
if (savedFont) {
  document.body.style.fontFamily = savedFont;

  fontButtons.forEach((btn) => {
    if (btn.dataset.font === savedFont) {
      btn.setAttribute("aria-checked", "true");
      btn.classList.add("active");
    } else {
      btn.setAttribute("aria-checked", "false");
      btn.classList.remove("active");
    }
  });
}
// end font
// start reset button
resetBtn.addEventListener("click", () => {
  const defaultFont = "tajawal";
  document.body.style.fontFamily = defaultFont;

  const fontButtons = document.querySelectorAll(".font-option");
  fontButtons.forEach((btn) => {
    btn.setAttribute(
      "aria-checked",
      btn.dataset.font === defaultFont ? "true" : "false"
    );
    btn.classList.toggle("active", btn.dataset.font === defaultFont);
  });

  localStorage.removeItem("selectedFont");

  const defaultThemeId = "themePurple";
  applyTheme(defaultThemeId);

  const colorButtons = document.querySelectorAll(".btn-color");
  colorButtons.forEach((btn) => btn.classList.remove("active"));

  const defaultColorBtn = document.getElementById("themePurple");
  if (defaultColorBtn) defaultColorBtn.classList.add("active");

  localStorage.removeItem("selectedTheme");
});
// end reset button
// start slider
let currentIndex = 0;

function cardsPerView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function maxIndex() {
  return cards.length - cardsPerView();
}

function cardWidth() {
  return cards[0].offsetWidth;
}

function updateSlider() {
  if (currentIndex < 0) currentIndex = maxIndex();
  if (currentIndex > maxIndex()) currentIndex = 0;

  const moveX = currentIndex * cardWidth();

  carousel.style.transform = `translateX(${moveX}px)`;

  indicators.forEach((btn, i) => {
    const isActive = i === currentIndex;
    btn.classList.toggle("bg-accent", isActive);
    btn.classList.toggle("bg-slate-400", !isActive);
    btn.setAttribute("aria-selected", isActive);
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > maxIndex()) {
    currentIndex = 0;
  }
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = maxIndex();
  }
  updateSlider();
});

indicators.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentIndex = Number(btn.dataset.index);
    updateSlider();
  });
});

window.addEventListener("resize", updateSlider);

updateSlider();
// end slider
// Start statistics-section
counters.forEach((counter) => {
  const targetText = counter.textContent.trim();
  const target = parseInt(targetText.replace(/\D/g, ""));
  let count = 0;
  const duration = 3000;
  const stepTime = 50;
  const steps = duration / stepTime;
  const increment = target / steps;

  const interval = setInterval(() => {
    count += increment;
    if (count >= target) {
      counter.textContent = target;
      clearInterval(interval);
    } else {
      counter.textContent = Math.ceil(count);
    }
  }, stepTime);
});
// end statistics-section
