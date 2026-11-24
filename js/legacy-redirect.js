// Send visitors who arrive from the retired craft.gillyb.net domain to the
// "we've moved" page. Runs in <head> so it fires before the page renders.
//
// Two signals are handled:
//   - the hostname they used (old bookmarks / direct visits to the old domain)
//   - the referrer (old links still pointing at the old site)
//
// The pathname guard prevents a redirect loop on the destination itself.
(function () {
  "use strict";

  var host = (window.location.hostname || "").toLowerCase();
  var ref = document.referrer || "";
  var OLD_HOST = "craft.gillyb.net";
  // Match the hostname as a whole label: craft.gillyb.net, www.craft.gillyb.net,
  // http(s)://craft.gillyb.net/... — but not notcraft.gillyb.net or craft.gillyb.net.evil.tld
  var fromOldDomain =
    host === OLD_HOST ||
    host.endsWith("." + OLD_HOST) ||
    new RegExp("(^|[/]|[.])" + OLD_HOST.replace(/\./g, "\\.") + "([/:]|$)", "i").test(ref);

  if (fromOldDomain && window.location.pathname !== "/legacy.html") {
    window.location.replace("/legacy.html");
  }
})();
