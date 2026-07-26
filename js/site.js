/* Evergrow Electrical Service. Language toggle.
   Every translatable node carries data-en and data-zh.
   English is the default; the choice persists across pages. */

(function () {
  "use strict";

  var KEY = "evergrow-lang";
  var root = document.documentElement;

  function apply(lang) {
    var nodes = document.querySelectorAll("[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var value = el.getAttribute("data-" + lang);
      if (value === null) continue;
      if (el.hasAttribute("data-attr")) {
        el.setAttribute(el.getAttribute("data-attr"), value);
      } else {
        el.textContent = value;
      }
    }

    root.setAttribute("lang", lang === "zh" ? "zh" : "en");

    var title = document.querySelector("title[data-en]");
    if (title) document.title = title.getAttribute("data-" + lang) || document.title;

    var buttons = document.querySelectorAll("[data-lang]");
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].setAttribute(
        "aria-pressed",
        buttons[j].getAttribute("data-lang") === lang ? "true" : "false"
      );
    }
  }

  function stored() {
    try {
      return window.localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function remember(lang) {
    try {
      window.localStorage.setItem(KEY, lang);
    } catch (e) {
      /* private browsing, nothing to do */
    }
  }

  var initial = stored() === "zh" ? "zh" : "en";
  apply(initial);

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-lang]");
    if (!button) return;
    var lang = button.getAttribute("data-lang");
    apply(lang);
    remember(lang);
  });
})();

/* Mobile action dock.
   Shown only when the page's own contact buttons are off screen, so the dock
   never sits under a button the visitor can already tap. */

(function () {
  "use strict";

  var dock = document.querySelector(".dock");
  if (!dock) return;

  // Every in-page way to reach us. If none is visible, the dock earns its place.
  var anchors = document.querySelectorAll(
    'main a[href^="https://wa.me"], main a[href^="tel:"], main a[href^="mailto:"]'
  );
  if (!anchors.length) return;

  if (!("IntersectionObserver" in window)) {
    dock.setAttribute("data-shown", "true");
    return;
  }

  // Track which anchors are on screen. A counter breaks here: the observer's
  // first callback reports every element at once, so misses drive it negative.
  var onScreen = [];
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var at = onScreen.indexOf(entry.target);
        if (entry.isIntersecting && at === -1) onScreen.push(entry.target);
        else if (!entry.isIntersecting && at !== -1) onScreen.splice(at, 1);
      });
      dock.setAttribute("data-shown", onScreen.length === 0 ? "true" : "false");
    },
    { rootMargin: "-8px 0px -8px 0px" }
  );

  for (var i = 0; i < anchors.length; i++) observer.observe(anchors[i]);
})();
