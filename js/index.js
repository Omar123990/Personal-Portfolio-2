// ^ Write your JavaScript code here
"use strict";


const scrollBtn = document.querySelector("#scroll-to-top");
const btnTheme = document.querySelector("#theme-toggle-button");
const htmlTheme = document.documentElement;



const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  htmlTheme.classList.add("dark");
  btnTheme.setAttribute("aria-pressed", "true");
} else {
  htmlTheme.classList.remove("dark");
  btnTheme.setAttribute("aria-pressed", "false");
};
btnTheme.addEventListener("click", () => {
  const isDark = htmlTheme.classList.toggle("dark");
  btnTheme.setAttribute("aria-pressed", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

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
