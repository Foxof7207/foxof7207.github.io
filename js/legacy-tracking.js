// Track button clicks on the legacy redirect page
(function () {
  "use strict";

  function trackButtonClick(event) {
    var target = event.target;
    var buttonText = target.textContent || target.innerText || "unknown";
    var href = target.href || "";

    console.log("[legacy-tracking] Button clicked:", buttonText);

    // Send event to Umami analytics
    if (window.umami && window.umami.track) {
      window.umami.track("legacy_button_click", {
        button: buttonText,
        destination: href
      });
    } else {
      console.log("[legacy-tracking] Umami not available yet, queuing event");
      // Fallback: try again after a short delay if Umami isn't loaded
      setTimeout(function() {
        if (window.umami && window.umami.track) {
          window.umami.track("legacy_button_click", {
            button: buttonText,
            destination: href
          });
        }
      }, 500);
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll(".btn-row .btn");
    buttons.forEach(function(button) {
      button.addEventListener("click", trackButtonClick);
    });
    console.log("[legacy-tracking] Event listeners attached to", buttons.length, "button(s)");
  });
})();
