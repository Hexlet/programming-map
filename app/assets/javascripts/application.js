/* global $ ga hljs */

//= require jquery/dist/jquery
//= require tether/dist/js/tether
//= require highlight.js/lib/highlight
//= require social-likes/dist/social-likes.min
//= require bootstrap/dist/js/bootstrap

var reformalOptions = { //eslint-disable-line no-unused-vars
  project_id: 936854,
  project_host: "programming-map.reformal.ru",
  tab_orientation: "right",
  tab_indent: "50%",
  tab_bg_color: "#008C66",
  tab_border_color: "#FFFFFF",
  tab_image_url: "http://tab.reformal.ru/T9GC0LfRi9Cy0Ysg0Lgg0L%252FRgNC10LTQu9C%252B0LbQtdC90LjRjw==/FFFFFF/88128dfd6ca0743b5ccc2f8afed9f3b1/right/0/tab.png",
  tab_border_width: 0
};

// >> reformal
(function() {
  var script = document.createElement('script');
  script.type = 'text/javascript'; script.async = true;
  script.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'media.reformal.ru/widgets/v3/reformal.js';
  document.getElementsByTagName('head')[0].appendChild(script);
})();
// <<

$(document).on('popup_opened.social-likes', function(event, service) {
  ga('send', 'social', service, 'share', location.href);
});

hljs.initHighlightingOnLoad();
