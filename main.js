// goodfiles.eu — landing page behavior

// Contact address: kept out of the DOM/HTML source (privacy / anti-scraping).
// It only lives here and is written to the clipboard on click.
const CONTACT_EMAIL = 'ferdi@goodfiles.eu';

const COPIED_DURATION = 2600;

// ---- About dropdown ----
const aboutTrigger = document.getElementById('about-trigger');
const aboutPanel = document.getElementById('about-panel');

function setAboutOpen(open) {
  aboutPanel.hidden = !open;
  aboutTrigger.setAttribute('aria-expanded', String(open));
}

aboutTrigger.addEventListener('click', (e) => {
  e.stopPropagation();
  setAboutOpen(aboutPanel.hidden);
});

// Click-outside and Escape to close (small improvement over the reference)
document.addEventListener('click', (e) => {
  if (!aboutPanel.hidden && !e.target.closest('.about')) setAboutOpen(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !aboutPanel.hidden) setAboutOpen(false);
});

// ---- Contact copy button ----
const contactBtn = document.getElementById('contact-btn');
const contactHint = document.getElementById('contact-hint');
let copiedTimer = null;

async function copyEmail(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    // Fallback for browsers/contexts without the Clipboard API
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (_) { /* no-op */ }
    document.body.removeChild(ta);
  }
}

contactBtn.addEventListener('click', async () => {
  await copyEmail(CONTACT_EMAIL);

  contactBtn.classList.add('copied');
  contactBtn.textContent = 'Copied ✓';
  contactHint.textContent = 'e-mail copied to clipboard';

  clearTimeout(copiedTimer);
  copiedTimer = setTimeout(() => {
    contactBtn.classList.remove('copied');
    contactBtn.textContent = 'Contact';
    contactHint.textContent = 'click to copy our e-mail';
  }, COPIED_DURATION);
});
