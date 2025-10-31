// scripts/featuresAnimation.js
function initFeaturesAnimation() {
  gsap.utils.toArray(".feature-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2,
      ease: "power3.out",
    });
  });
}
