import { withPluginApi } from "discourse/lib/plugin-api";

function initialize(api) {
  const siteSettings = api.container.lookup("site-settings:main");
  const currentUser = Discourse.User.current();
  if (!siteSettings.intercom_enabled || !currentUser) {
    return;
  }

  const startMessenger = () => { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; function l() { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = `https://widget.intercom.io/widget/${ siteSettings.intercom_app_id }`; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); } l(); } };

  window.intercomSettings = {
    app_id: siteSettings.intercom_app_id,
    email: currentUser.email,
    user_hash: currentUser.intercom_hash
  };

  startMessenger();
}

export default {
  name: 'intercom',

  initialize() {
    withPluginApi("0.8.7", initialize);
  }
};
