document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('chiGalleryMain');
  if (!main) return;

  const slides = Array.from(main.querySelectorAll('.chi-slide'));
  const total = slides.length;
  const thumbs = Array.from(document.querySelectorAll('.chi-thumb'));
  const dots = Array.from(document.querySelectorAll('#chiGalleryDots .chi-dot'));
  const prevBtn = document.getElementById('chiPrevBtn');
  const nextBtn = document.getElementById('chiNextBtn');

  let current = 0;

  function render() {
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));

    thumbs.forEach((thumb, offsetIndex) => {
      const targetIndex = (current + offsetIndex + 1) % total;
      const targetSlide = slides[targetIndex];
      thumb.querySelector('span').textContent = targetSlide.querySelector('h3').textContent;
      thumb.style.backgroundImage = targetSlide.style.backgroundImage;
      thumb.classList.add('has-photo');
      thumb.dataset.target = String(targetIndex);
    });
  }

  function goTo(index) {
    current = ((index % total) + total) % total;
    render();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => goTo(Number(thumb.dataset.target)));
  });
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  render();
});
