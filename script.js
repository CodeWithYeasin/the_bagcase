const bag = document.querySelector('.bag');
let angle = 28;

function animateBag() {
  angle = (angle + 0.4) % 360;
  bag.style.transform = `rotateX(-18deg) rotateY(${angle}deg)`;
  requestAnimationFrame(animateBag);
}

if (bag) {
  requestAnimationFrame(animateBag);
}
