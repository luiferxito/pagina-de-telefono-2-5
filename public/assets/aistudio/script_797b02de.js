/* ==========================================================================
   Celucosta — script.js
   Funcionalidad, observadores de scroll y haptics (JS Vanilla).
   Solo propiedades aceleradas por hardware en animaciones.
   ========================================================================== */

/* ── Haptic-like feedback (Vibration API) on meaningful commits ── */
function hapticTap(ms = 10) {
  if (typeof navigator.vibrate === "function") navigator.vibrate(ms);
}

/* ── QA #1: navegación activa al hacer scroll ── */
function setupActiveNav() {
  const links = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("main > section, footer.closing");
  if (!links.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        if (!id) return;
        links.forEach((link) => {
          link.classList.remove("nav__link--active");
          const href = link.getAttribute("href") || "";
          if (href === `#${id}`) link.classList.add("nav__link--active");
        });
      }
    });
  }, { rootMargin: "-20% 0% -60% 0%", threshold: 0 });

  sections.forEach((sec) => observer.observe(sec));
}

/* ── Haptics ── */
function setupHaptics() {
  document.querySelectorAll(".btn--primary, .nav__toggle").forEach((el) => {
    el.addEventListener("pointerup", () => hapticTap(), { passive: true });
  });
}

/* ── Hero CTA scales softly on scroll (transform/opacity only) ── */
function setupCtaScroll() {
  const heroCta = document.querySelector(".hero .btn--primary");
  if (!heroCta) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let rafId = null;
  let scaled = false;
  const threshold = 40;
  document.addEventListener("scroll", () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (y > threshold && !scaled) {
        heroCta.classList.add("hero-cta-scaled");
        scaled = true;
      } else if (y <= threshold && scaled) {
        heroCta.classList.remove("hero-cta-scaled");
        scaled = false;
      }
      rafId = null;
    });
  }, { passive: true });
}

/* ── Hero photo parallax on mouse (max 4 deg tilt, transform only) ── */
function setupHeroParallax() {
  const heroImg = document.querySelector(".hero--product .hero__stage > img");
  if (!heroImg) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let rafId = null;
  const maxTilt = 4;
  const maxMove = 12;
  document.addEventListener("pointermove", (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const { innerWidth: w, innerHeight: h } = window;
      const cx = e.clientX / w - 0.5;
      const cy = e.clientY / h - 0.5;
      const rotateX = (-cy * maxTilt).toFixed(2);
      const rotateY = (cx * maxTilt).toFixed(2);
      const tx = (cx * maxMove).toFixed(1);
      const ty = (cy * maxMove).toFixed(1);
      heroImg.style.transform = `translate(${tx}px, ${ty}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      rafId = null;
    });
  }, { passive: true });
}

/* ── Inicialización ── */
document.addEventListener("DOMContentLoaded", () => {
  setupActiveNav();
  setupHaptics();
  setupCtaScroll();
  setupHeroParallax();
});
