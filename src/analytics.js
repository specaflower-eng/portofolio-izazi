/* Google Analytics 4 — loaded only in production.
   The Measurement ID comes from the VITE_GA_ID env var (set in Netlify),
   so it never lives in the repository. */
const GA_ID = import.meta.env.VITE_GA_ID;

if (GA_ID && !['localhost', '127.0.0.1'].includes(location.hostname)) {
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
}
