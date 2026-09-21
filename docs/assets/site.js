(() => {
  const calculator = document.querySelector('[data-calculator]');
  if (!calculator) return;
  const quantity = document.getElementById('quantity');
  const property = document.getElementById('property');
  const total = document.getElementById('total');
  const breakdown = document.getElementById('calculation');
  const error = document.getElementById('calc-error');
  const format = number => new Intl.NumberFormat('ru-RU').format(number);
  function update() {
    const count = Number(quantity.value);
    const valid = quantity.value.trim() !== '' && Number.isInteger(count) && count >= 1 && count <= 100;
    quantity.setAttribute('aria-invalid', String(!valid));
    error.hidden = valid;
    if (!valid) { total.textContent = '—'; breakdown.textContent = 'Проверьте количество'; return; }
    const rate = count >= 4 ? 900 : property.value === 'house' ? 1200 : 1000;
    total.textContent = `${format(count * rate)} ₽`;
    breakdown.textContent = `${count} × ${format(rate)} ₽`;
  }
  quantity.setAttribute('aria-describedby','calc-error');
  quantity.addEventListener('input',update);
  property.addEventListener('change',update);
  update();
  document.querySelectorAll('[data-track="call"]').forEach(link => link.addEventListener('click', () => {
    // An analytics adapter can subscribe after a real counter is configured.
    window.dispatchEvent(new CustomEvent('prometr:call', {detail:{path:location.pathname}}));
  }));
})();
