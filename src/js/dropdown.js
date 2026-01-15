document.addEventListener('toggle', (e) => {
  const el = e.target;
  if (!el.matches('menu[popover]')) return;

  const handle = document.querySelector(`[popovertarget="${el.id}"]`);

  const position = () => {
    const rect = handle.getBoundingClientRect();
    el.style.top = `${rect.bottom}px`;
    el.style.left = `${rect.left}px`;
  };

  if (e.newState === 'open') {
    position();
    window.addEventListener('scroll', position, true);
    el._cleanup = () => window.removeEventListener('scroll', position, true);
    el.querySelector('[role="menuitem"]')?.focus();

    handle?.setAttribute('aria-expanded', 'true');
  } else {
    el._cleanup?.();
    handle?.setAttribute('aria-expanded', 'false');
    handle?.focus();
  }
}, true);

document.addEventListener('keydown', (e) => {
  const item = e.target;
  if (!item.matches('[role="menuitem"]')) return;

  const el = item.closest('menu[popover]');
  if (!el?.matches(':popover-open')) return;

  const items = [...el.querySelectorAll('[role="menuitem"]')];
  const index = items.indexOf(item);

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      items[(index + 1) % items.length]?.focus();
      break;

    case 'ArrowUp':
      e.preventDefault();
      items[index - 1 < 0 ? items.length - 1 : index - 1]?.focus();
      break;

    case 'Home':
      e.preventDefault();
      items[0]?.focus();
      break;

    case 'End':
      e.preventDefault();
      items[items.length - 1]?.focus();
      break;
  }
});
