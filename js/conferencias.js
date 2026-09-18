document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('confEditionsGrid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.conf-edition-card'));
  const filterBtns = Array.from(document.querySelectorAll('.conf-filter-btn'));
  const verMasWrap = document.getElementById('confVerMasWrap');
  const verMasBtn = document.getElementById('confVerMasBtn');
  const TOPE = 8;

  let filtro = 'todas';
  let expandido = false;

  function render() {
    const filtradas = cards.filter((c) => filtro === 'todas' || c.dataset.region === filtro);
    const mostrar = expandido ? filtradas : filtradas.slice(0, TOPE);
    const visibles = new Set(mostrar);

    cards.forEach((c) => {
      c.hidden = !visibles.has(c);
    });

    const restantes = filtradas.length - mostrar.length;
    const hayMas = restantes > 0 || expandido;
    verMasWrap.hidden = !hayMas;
    verMasBtn.textContent = expandido ? 'Ver menos' : `Ver las ${filtradas.length} ediciones`;
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filtro = btn.dataset.filter;
      expandido = false;
      filterBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      render();
    });
  });

  verMasBtn.addEventListener('click', () => {
    expandido = !expandido;
    render();
  });

  render();
});
