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
const buttons = document.querySelectorAll("button.btn-color");
const savedTheme = localStorage.getItem("theme");
const bgGradientToL = document.querySelectorAll(".bg-gradient-to-l");
const bgLinearToR = document.querySelectorAll(".bg-linear-to-r");
const textSecondary = document.querySelectorAll(".text-secondary");
const bgLinearToBR = document.querySelectorAll(".bg-linear-to-br");
const bgGradientSmall = document.querySelectorAll(".w-16.bg-gradient-to-br");
const textPrimaryBold = document.querySelectorAll(".text-primary.font-bold");
const borderedElements = document.querySelectorAll(
  ".border-white, .dark\\:border-slate-900, .border-primary, .border-secondary"
);
const navLinksColor = document.querySelectorAll(
  "nav a.text-slate-600, nav a.dark\\:text-slate-300"
);
const profileBorders = document.querySelectorAll(
  ".relative.w-64.h-64.md\\:w-80.md\\:h-80.rounded-full.overflow-hidden.border-4"
);
const profileGradientRings = document.querySelectorAll(
  ".absolute.-inset-3.bg-gradient-to-br, .absolute.-inset-2.bg-gradient-to-br"
);
const animatedRings = document.querySelectorAll("#animation");
const animatedRings2 = document.querySelectorAll("#animation2");
const mobileMenuBtn = document.querySelector("#mobile-menu-toggle");
const navLink = document.querySelector(".nav-links");
const fontButtons = document.querySelectorAll(".font-option");
const resetBtn = document.getElementById("reset-settings");

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
const gradients = {
  themeBlue: {
    bgGradientToL: "linear-gradient(to left, #3498db, #85c1e9)",
    bgLinearToR: "linear-gradient(to right, #3498db, #85c1e9)",
    bgLinearToBR: "linear-gradient(to bottom right, #3498db, #85c1e9)",
    bgGradientSmall: "linear-gradient(to bottom right, #3498db, #85c1e9)",
    textSecondary: "#3498db",
    textPrimaryBold: "#3498db",
    borderColor: "#3498db",
    navColor: "#3498db",
  },
  themeGreen: {
    bgGradientToL: "linear-gradient(to left, #2ecc71, #82e0aa)",
    bgLinearToR: "linear-gradient(to right, #2ecc71, #82e0aa)",
    bgLinearToBR: "linear-gradient(to bottom right, #2ecc71, #82e0aa)",
    bgGradientSmall: "linear-gradient(to bottom right, #2ecc71, #82e0aa)",
    textSecondary: "#2ecc71",
    textPrimaryBold: "#2ecc71",
    borderColor: "#2ecc71",
    navColor: "#2ecc71",
  },
  themeOrange: {
    bgGradientToL: "linear-gradient(to left, #e67e22, #f5b041)",
    bgLinearToR: "linear-gradient(to right, #e67e22, #f5b041)",
    bgLinearToBR: "linear-gradient(to bottom right, #e67e22, #f5b041)",
    bgGradientSmall: "linear-gradient(to bottom right, #e67e22, #f5b041)",
    textSecondary: "#e67e22",
    textPrimaryBold: "#e67e22",
    borderColor: "#e67e22",
    navColor: "#e67e22",
  },
  themePurple: {
    bgGradientToL: "linear-gradient(to left, #9b59b6, #d2b4de)",
    bgLinearToR: "linear-gradient(to right, #9b59b6, #d2b4de)",
    bgLinearToBR: "linear-gradient(to bottom right, #9b59b6, #d2b4de)",
    bgGradientSmall: "linear-gradient(to bottom right, #9b59b6, #d2b4de)",
    textSecondary: "#9b59b6",
    textPrimaryBold: "#9b59b6",
    borderColor: "#9b59b6",
    navColor: "#9b59b6",
  },
  themeYellow: {
    bgGradientToL: "linear-gradient(to left, #f1c40f, #f7dc6f)",
    bgLinearToR: "linear-gradient(to right, #f1c40f, #f7dc6f)",
    bgLinearToBR: "linear-gradient(to bottom right, #f1c40f, #f7dc6f)",
    bgGradientSmall: "linear-gradient(to bottom right, #f1c40f, #f7dc6f)",
    textSecondary: "#f1c40f",
    textPrimaryBold: "#f1c40f",
    borderColor: "#f1c40f",
    navColor: "#f1c40f",
  },
  themePink: {
    bgGradientToL: "linear-gradient(to left, #ff69b4, #ffaad1)",
    bgLinearToR: "linear-gradient(to right, #ff69b4, #ffaad1)",
    bgLinearToBR: "linear-gradient(to bottom right, #ff69b4, #ffaad1)",
    bgGradientSmall: "linear-gradient(to bottom right, #ff69b4, #ffaad1)",
    textSecondary: "#ff69b4",
    textPrimaryBold: "#ff69b4",
    borderColor: "#ff69b4",
    navColor: "#ff69b4",
  },
};

function applyTheme(themeId) {
  const theme = gradients[themeId];
  if (!theme) return;

  bgGradientToL.forEach((e) => (e.style.backgroundImage = theme.bgGradientToL));
  bgLinearToR.forEach((e) => (e.style.backgroundImage = theme.bgLinearToR));
  bgLinearToBR.forEach((e) => (e.style.backgroundImage = theme.bgLinearToBR));
  bgGradientSmall.forEach(
    (e) => (e.style.backgroundImage = theme.bgGradientSmall)
  );
  textSecondary.forEach((e) =>
    e.style.setProperty("color", theme.textSecondary, "important")
  );
  textPrimaryBold.forEach((e) =>
    e.style.setProperty("color", theme.textPrimaryBold, "important")
  );
  borderedElements.forEach((e) =>
    e.style.setProperty("border-color", theme.borderColor, "important")
  );
  profileBorders.forEach((e) =>
    e.style.setProperty("border-color", theme.borderColor, "important")
  );
  navLinks.forEach((e) =>
    e.style.setProperty("color", theme.navColor, "important")
  );
  profileGradientRings.forEach((e) => {
    e.style.backgroundImage = theme.bgLinearToBR;
  });
  animatedRings.forEach((e, index) => {
    if (index === 0) {
      e.style.borderColor = theme.borderColor + "4D";
    } else {
      e.style.borderColor = theme.borderColor + "33";
    }
  });
  animatedRings2.forEach((e, index) => {
    if (index === 0) {
      e.style.borderColor = theme.borderColor + "4D";
    } else {
      e.style.borderColor = theme.borderColor + "33";
    }
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const themeId = btn.id;
    applyTheme(themeId);
    localStorage.setItem("selectedTheme", themeId);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const ThemeSaved = localStorage.getItem("selectedTheme");
  if (ThemeSaved) {
    applyTheme(ThemeSaved);
  }
});
mobileMenuBtn.onclick = () => {
  if (navLink.className.includes("active")) {
    navLink.className = navLink.className.replace(" active", "");
  } else {
    navLink.className += " active";
  }
};
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
