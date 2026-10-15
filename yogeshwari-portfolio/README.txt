Yogeshwari Sandip Pawar - Portfolio website
===========================================

HOW TO OPEN
  Double-click index.html (works in any modern browser), or upload the whole
  folder to a static host such as GitHub Pages, Netlify or Vercel.

FOLDER STRUCTURE
  index.html          page structure and all text content
  css/styles.css      all styling, colors (CSS variables at the top), animations
  js/app.js           behaviour: start screen, menu, animations, forms, theme
  images/hero.webp    circular profile photo (top section)
  images/about.webp   anime photo (About Me section)
  images/splashBase.webp, images/splashHair.webp   opening-screen portrait (body layer + moving hair layer)
  assets/Yogeshwari_Pawar_Resume.pdf   file downloaded by the Resume button

HOW TO EDIT
  Text and links ........ index.html
  Skills / certificates .. SKILLS and CERTS lists at the top of js/app.js
  Email, resume link ..... CONFIG at the top of js/app.js
  Photos ................. replace the files in images/ (keep the same names)
  Resume ................. replace assets/Yogeshwari_Pawar_Resume.pdf
  Colors ................. the :root variables at the top of css/styles.css

CONTACT FORM
  The form validates and then opens Gmail with the message filled in.
  To send messages without opening Gmail, set CONFIG.formEndpoint in js/app.js
  to a form service URL (for example Formspree).
