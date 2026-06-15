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

  // Keep the footer year current without hardcoding.
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
