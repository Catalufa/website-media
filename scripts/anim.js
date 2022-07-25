const animElems = document.querySelectorAll('[anim]');

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = entry.target.getAttribute("anim");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

animElems.forEach(elem => {
  elem.style.opacity = 0;
  elem.onanimationend = () => {
    elem.style.opacity = 1;
  };
  observer.observe(elem);
});
