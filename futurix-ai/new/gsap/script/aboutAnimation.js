// scripts/aboutAnimation.js
function initAboutAnimation() {
  gsap.from("#demo h2", {
    scrollTrigger: {
      trigger: "#demo",
      start: "top 80%",
    },
    x: -100,
    opacity: 0,
    duration: 1,
  });

  gsap.from(".demo-box", {
    scrollTrigger: {
      trigger: ".demo-box",
      start: "top 85%",
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
  });
}
