// scripts/main.js
// GSAP animations for Tathya landing page

// Ensure gsap is available
const ready = () => {
  if (typeof gsap === 'undefined') {
    console.error('GSAP not found');
    return false;
  }
  return true;
};

if (ready()) {
  gsap.defaults({ease: 'power2.out'});

  // Logo fade-in
  gsap.from('.logo', {y: -10, opacity: 0, duration: 0.8, delay: 0.15});

  // Navbar slide from top
  gsap.from('.nav', {y: -20, opacity: 0, duration: 0.9, delay: 0.05});

  // Hero entrance timeline
  const heroTL = gsap.timeline({defaults:{duration:0.9}});
  heroTL.from('.motto', {y: 30, opacity: 0, duration: 1, ease: 'power3.out'})
        .from('.sub', {y: 18, opacity: 0}, '-=0.5')
        .from('.primary-cta', {scale: 0.96, opacity: 0, duration: 0.6}, '-=0.35');

  // Looping subtle motion for the motto: fade + small y oscillation
  gsap.to('.motto', {
    y: -6,
    opacity: 0.98,
    duration: 2.8,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  // Floating shapes gentle float
  gsap.to('.shape-1', {y: 18, x: -8, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut', opacity: 0.95});
  gsap.to('.shape-2', {y: -12, x: 6, duration: 5.2, yoyo: true, repeat: -1, ease: 'sine.inOut', opacity: 0.95});
  gsap.to('.shape-3', {y: 10, x: 14, duration: 7.2, yoyo: true, repeat: -1, ease: 'sine.inOut', opacity: 0.95});

  // Simple entrance for features when scrolled into view (if ScrollTrigger is loaded)
  if (gsap.utils && gsap.utils.toArray && typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('.feature').forEach((el) => {
      gsap.from(el, {y: 20, opacity: 0, duration: 0.7, scrollTrigger: {trigger: el, start: 'top 85%'}});
    });
  }
}
