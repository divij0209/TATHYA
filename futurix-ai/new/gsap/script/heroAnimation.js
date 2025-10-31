// heroAnimation.js
// Simple hero entrance animations using GSAP.
// Keeps this file lightweight so it won't throw syntax errors if loaded.

const heroHeading = document.querySelector('.hero-content h2');
const mottoText = document.getElementById('motto-text');
const cta = document.querySelector('.hero-content .cta');

try {
  if (heroHeading) {
    gsap.from(heroHeading, { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' });
  }

  if (mottoText) {
    gsap.from(mottoText, { y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' });
  }

  if (cta) {
    gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.6, delay: 0.5, ease: 'back.out(1.7)' });
  }
} catch (e) {
  // If GSAP isn't loaded yet or something else fails, fail quietly in the console for debugging.
  console.error('Hero animation failed:', e);
}
