// main.js
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  console.log("GSAP Initialized 🚀");

  // Initialize all animations
  initHeroAnimation();
  initFeaturesAnimation();
  initAboutAnimation();
});
