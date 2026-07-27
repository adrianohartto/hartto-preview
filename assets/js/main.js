// Hartto — medição central (GA4 + eventos). Validar no Tempo Real após publicar.
(function() {
  var s = document.createElement('script'); s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-VTGDXK1JVN';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', 'G-VTGDXK1JVN', { 'page_path': location.pathname });

  function ev(name, extra) {
    var p = { page_path: location.pathname, service_origin: document.body.dataset.page || '' };
    for (var k in (extra || {})) p[k] = extra[k];
    gtag('event', name, p);
  }

  // Cliques rastreados via data-ev (whatsapp, phone, email, form_submit)
  document.addEventListener('click', function(e) {
    var el = e.target.closest('[data-ev]');
    if (el) ev(el.dataset.ev, { cta_location: el.className || 'link' });
  });

  // Lead: página de obrigado
  if (location.pathname.indexOf('obrigado') !== -1) ev('generate_lead');

  // scroll 75%
  var fired = false;
  window.addEventListener('scroll', function() {
    if (fired) return;
    var h = document.documentElement;
    if ((window.scrollY + window.innerHeight) / h.scrollHeight > 0.75) { fired = true; ev('scroll_75'); }
  }, { passive: true });

  // LinkedIn Insight Tag — descomentar e preencher o PARTNER_ID quando criar a conta de ads
  // _linkedin_partner_id = "PARTNER_ID"; window._linkedin_data_partner_ids = [_linkedin_partner_id];
  // (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
  // var st=document.getElementsByTagName("script")[0];var b=document.createElement("script");
  // b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
  // st.parentNode.insertBefore(b,st)})(window.lintrk);
})();
