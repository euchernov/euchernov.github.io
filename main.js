// Theme toggle: persists the user's choice and reflects it on the toggle button.
// The initial theme is set by an inline script in <head> to avoid a flash.
(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  // CSS shows the correct sun/moon icon per theme; JS just keeps the label accurate.
  function syncLabel() {
    if (!toggle) return;
    var isDark = root.getAttribute("data-theme") === "dark";
    toggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  syncLabel();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      syncLabel();
    });
  }

  // Mobile nav (hamburger) toggle.
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close the panel (and any open dropdown) after tapping a link inside it.
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        closeNav();
        closeDropdown();
      }
    });
  }

  // Projects dropdown toggle.
  var dropdown = document.querySelector(".nav__dropdown");
  var dropBtn = dropdown ? dropdown.querySelector(".nav__dropbtn") : null;
  function closeDropdown() {
    if (!dropdown) return;
    dropdown.classList.remove("is-open");
    if (dropBtn) dropBtn.setAttribute("aria-expanded", "false");
  }
  if (dropdown && dropBtn) {
    dropBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = dropdown.classList.toggle("is-open");
      dropBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Close menus on outside click or Escape.
  document.addEventListener("click", function (e) {
    if (dropdown && !dropdown.contains(e.target)) closeDropdown();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeDropdown();
      closeNav();
    }
  });

  // Keep the footer year current without hardcoding.
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
