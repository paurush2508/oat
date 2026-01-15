document.addEventListener('toggle', (e) => {
  const menu = e.target;
  if (!menu.matches('menu[popover]')) return;

  const trigger = document.querySelector(`[popovertarget="${menu.id}"]`);

  if (e.newState === 'open') {
    const rect = trigger.getBoundingClientRect();
    menu.style.top = `${rect.bottom}px`;
    menu.style.left = `${rect.left}px`;
    menu.querySelector('[role="menuitem"]')?.focus();

    trigger?.setAttribute('aria-expanded', 'true');
  } else {
    trigger?.setAttribute('aria-expanded', 'false');
    trigger?.focus();
  }
}, true);

document.addEventListener('keydown', (e) => {
  const item = e.target;
  if (!item.matches('[role="menuitem"]')) return;

  const menu = item.closest('menu[popover]');
  if (!menu?.matches(':popover-open')) return;

  const items = [...menu.querySelectorAll('[role="menuitem"]')];
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
