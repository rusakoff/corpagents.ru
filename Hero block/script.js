/* Corp Agents — only behaviour required for mobile navigation and demo tabs. */
(() => {
  'use strict';

  const root = document.querySelector('.ca-site');
  if (!root) return;

  const menuButton = root.querySelector('.ca-menu-button');
  const navigation = root.querySelector('.ca-header__nav');
  const dropdownButtons = [...root.querySelectorAll('.ca-nav__toggle')];

  const closeDropdowns = (except = null) => {
    dropdownButtons.forEach(button => {
      if (button === except) return;
      button.setAttribute('aria-expanded', 'false');
      root.querySelector('#' + button.getAttribute('aria-controls')).hidden = true;
    });
  };

  dropdownButtons.forEach(button => {
    button.addEventListener('click', () => {
      const willOpen = button.getAttribute('aria-expanded') !== 'true';
      closeDropdowns(button);
      button.setAttribute('aria-expanded', String(willOpen));
      root.querySelector('#' + button.getAttribute('aria-controls')).hidden = !willOpen;
    });
  });

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Открыть меню');
      navigation.classList.remove('ca-header__nav--open');
      closeDropdowns();
    };
    menuButton.addEventListener('click', () => {
      const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(willOpen));
      menuButton.setAttribute('aria-label', willOpen ? 'Закрыть меню' : 'Открыть меню');
      navigation.classList.toggle('ca-header__nav--open', willOpen);
      if (!willOpen) closeDropdowns();
    });
    navigation.addEventListener('click', e => {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('click', e => {
      if (!root.contains(e.target) || (!e.target.closest('.ca-header__nav') && !e.target.closest('.ca-menu-button'))) {
        closeDropdowns();
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Change the example data without replacing the application DOM.
  // This is a visual simulation, not a live CRM connection.
  const scenes = {
    mail: [
      ['Сейчас', 'Новое письмо', 'Запрос на поставку', 'Крепёж М10, 500 шт. Нужна цена и срок.'],
      ['Подготовлено', 'Черновик от ИИ', 'Данные извлечены', 'Контакт, позиции и тип обращения собраны.'],
      ['В работе', 'Подтверждено', 'Заявка в CRM', 'Карточка создана, назначен ответственный.']
    ],
    erp: [
      ['Сейчас', 'Новая позиция', 'Поиск номенклатуры', 'Запрос сопоставлен с каталогом 1С.'],
      ['Подготовлено', 'Черновик от ИИ', 'Совпадения найдены', 'Артикулы и единицы измерения проверены.'],
      ['В работе', 'Подтверждено', 'Данные синхронизированы', 'Информация передана в карточку сделки.']
    ],
    docs: [
      ['Сейчас', 'Новый файл', 'Счёт от поставщика', 'PDF получен и добавлен к обращению.'],
      ['Подготовлено', 'Черновик от ИИ', 'Поля распознаны', 'ИНН, суммы и реквизиты извлечены.'],
      ['В работе', 'Подтверждено', 'Документ проверен', 'Сотрудник согласовал результат обработки.']
    ],
    status: [
      ['Сейчас', 'Новое событие', 'Ожидается ответ', 'Изменение статуса найдено в CRM.'],
      ['Подготовлено', 'Черновик от ИИ', 'Уведомление готово', 'Система сформировала текст для клиента.'],
      ['В работе', 'Подтверждено', 'Клиент уведомлён', 'Статус и история действий обновлены.']
    ]
  };
  const tabs = [...root.querySelectorAll('.ca-app__tab')];
  const panel = root.querySelector('#ca-app-panel');
  const fields = name => [...root.querySelectorAll(`[data-${name}]`)];

  const activateTab = tab => {
    const data = scenes[tab.dataset.scene];
    if (!data) return;
    tabs.forEach(t => {
      const active = t === tab;
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    ['lane-status', 'ticket-badge', 'ticket-title', 'ticket-description'].forEach((attribute, col) => {
      fields(attribute).forEach((el, index) => { el.textContent = data[index][col]; });
    });
    const laneScroller = root.querySelector('.ca-app__lanes');
    if (laneScroller) laneScroller.scrollLeft = 0;
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const newIndex = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      activateTab(tabs[newIndex]);
      tabs[newIndex].focus();
    });
  });
})();
