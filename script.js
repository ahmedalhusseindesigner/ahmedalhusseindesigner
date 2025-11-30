const img = new Image();
img.src = 'assets/hero.avif';
img.onload = function () {
  const ratio = img.height / img.width;
  const container = document.getElementById('hero');
  const width = container.offsetWidth;
  container.style.height = (width * ratio) + 'px';
}


const heroTitle = document.querySelector('.hero-txt h1');
let lastScrollY = window.scrollY;
let hasAnimated = false;

function isInViewportFromTop(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.top <= window.innerHeight;
}

function triggerAnimation() {
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;

  if (scrollingDown && isInViewportFromTop(heroTitle) && !hasAnimated) {
    heroTitle.classList.remove('flip-in-x');
    void heroTitle.offsetWidth; // Force reflow
    heroTitle.classList.add('flip-in-x');
    hasAnimated = true;
  }

  // إذا طلع لفوق وخرج العنصر من الشاشة، نسمح له يتكرر لما يرجع تاني
  if (!isInViewportFromTop(heroTitle) && currentScrollY < lastScrollY) {
    hasAnimated = false;
  }

  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', triggerAnimation);




