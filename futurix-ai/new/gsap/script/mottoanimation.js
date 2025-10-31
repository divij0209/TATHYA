// mottoAnimation.js
gsap.registerPlugin(TextPlugin);

const phrases = ["seamless.", "secure.", "smart."];
const motto = document.getElementById("motto-text");
let current = 0;

function cycleText() {
  gsap.to(motto, {
    duration: 1,
    opacity: 0,
    onComplete: () => {
      current = (current + 1) % phrases.length;
      gsap.to(motto, {
        duration: 1,
        opacity: 1,
        text: phrases[current],
        ease: "power2.inOut",
      });
    },
  });
}

setInterval(cycleText, 2500);
