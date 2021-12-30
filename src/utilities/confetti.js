// coming from https://www.kirilv.com/canvas-confetti/
// for the basic cannon style

import confetti from "canvas-confetti";

export const launchConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};
