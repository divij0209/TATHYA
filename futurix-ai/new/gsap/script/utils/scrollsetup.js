// scripts/utils/scrollSetup.js
function enableSmoothScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Optional: pinning or global smooth scroll effects
  // Example: fade in all sections
  gsap.utils.toArray("section").forEach((sec) => {
    gsap.from(sec, {
      scrollTrigger: {
        trigger: sec,
        start: "top 90%",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
  });
}

enableSmoothScroll();

