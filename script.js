const scenarios = {
  inbox: {
    dialogTitle: 'Обращения теряются в почте',
    intro: 'Берём один входящий ящик и согласованные типы писем. Проверяем процесс на ограниченном наборе обращений.',
    before: 'Сейчас менеджер читает письмо, вручную переносит данные в CRM и назначает ответственного.',
    after: 'На пилоте ИИ готовит черновик карточки. Сотрудник проверяет данные и направляет обращение в работу.',
    metric: 'Проверяем время регистрации, полноту карточки и точность маршрута.',
    board: {
      title: 'Входящие обращения', icon: 'mail', description: 'От письма клиента до проверенной карточки в CRM.',
      beforeLabel: 'Новое письмо', beforeTitle: 'Запрос на поставку', beforeCopy: 'Крепёж М10, 500 шт. Нужна цена и срок.',
      middleLabel: 'Черновик от ИИ', middleTitle: 'Данные извлечены', middleCopy: 'Контакт, позиции и тип обращения собраны.',
      afterLabel: 'Подтверждено', afterTitle: 'Заявка в CRM', afterCopy: 'Карточка создана, назначен ответственный.',
      note: 'Критичные действия остаются за сотрудником: ИИ готовит, человек подтверждает.'
    }
  },
  catalog: {
    dialogTitle: 'В 1С много похожих позиций',
    intro: 'Выбираем одну товарную категорию. Готовим список возможных дублей и правила проверки.',
    before: 'Сейчас похожие товары заведены под разными названиями. Сотрудники долго ищут и сопоставляют позиции.',
    after: 'На пилоте система предлагает пары на проверку. Решение об изменении справочника подтверждает ответственный.',
    metric: 'Проверяем долю дублей, точность сопоставления и время поиска.',
    board: {
      title: 'Порядок в справочнике', icon: 'database', description: 'Одна товарная категория. Кандидаты на проверку.',
      beforeLabel: 'Из 1С', beforeTitle: 'Болт М10×40', beforeCopy: 'Несколько названий одной позиции.',
      middleLabel: 'Возможный дубль', middleTitle: 'Найдено совпадение', middleCopy: 'Похожие параметры и описание.',
      afterLabel: 'На проверке', afterTitle: 'Список кандидатов', afterCopy: 'Ответственный подтверждает изменения.',
      note: 'ИИ предлагает совпадения, а изменения в справочнике согласует сотрудник.'
    }
  },
  knowledge: {
    dialogTitle: 'Ответ спрятан в документах',
    intro: 'Подключаем согласованный набор регламентов и проверяем ответы на заранее подготовленных вопросах.',
    before: 'Сейчас сотрудник ищет нужный пункт в общей папке или спрашивает коллег.',
    after: 'На пилоте помощник показывает ответ с источником. Если данных недостаточно, он сообщает об этом.',
    metric: 'Проверяем время поиска, корректность ответов и долю ответов с источником.',
    board: {
      title: 'Поиск по регламентам', icon: 'file-search', description: 'Проверяемый ответ по согласованным документам.',
      beforeLabel: 'Вопрос', beforeTitle: 'Кто согласует закупку?', beforeCopy: 'Сотруднику нужен точный пункт регламента.',
      middleLabel: 'Найден источник', middleTitle: 'Раздел 3.2', middleCopy: 'Регламент закупок, утверждённая версия.',
      afterLabel: 'Ответ', afterTitle: 'Руководитель отдела', afterCopy: 'Ответ сопровождается ссылкой на источник.',
      note: 'Ответ можно проверить по документу; без источника помощник не должен угадывать.'
    }
  },
  reports: {
    dialogTitle: 'Статусы живут в разных системах',
    intro: 'Выбираем один процесс и согласованные источники данных. Показываем события и отклонения в общей сводке.',
    before: 'Сейчас руководитель запрашивает статусы в отделах и вручную собирает отчёт из нескольких систем.',
    after: 'На пилоте сводка формируется по событиям. Просрочки и ошибки обмена вынесены отдельно.',
    metric: 'Проверяем время подготовки, число просрочек и ошибки обмена.',
    board: {
      title: 'Контроль процесса', icon: 'workflow', description: 'События из согласованных систем в одной сводке.',
      beforeLabel: 'Из систем', beforeTitle: 'Заказы и заявки', beforeCopy: 'Данные в CRM и 1С обновляются отдельно.',
      middleLabel: 'Сопоставлено', middleTitle: 'Статусы собраны', middleCopy: 'События связаны по правилам процесса.',
      afterLabel: 'Внимание', afterTitle: '5 отклонений', afterCopy: 'Просрочки и ошибки показаны отдельно.',
      note: 'Для пилота выбираем один процесс и заранее согласуем, какие статусы считать важными.'
    }
  }
};

const boardFields = {
  description: document.getElementById('board-description'),
  beforeLabel: document.getElementById('board-before-label'),
  beforeTitle: document.getElementById('board-before-title'),
  beforeCopy: document.getElementById('board-before-copy'),
  middleLabel: document.getElementById('board-middle-label'),
  middleTitle: document.getElementById('board-middle-title'),
  middleCopy: document.getElementById('board-middle-copy'),
  afterLabel: document.getElementById('board-after-label'),
  afterTitle: document.getElementById('board-after-title'),
  afterCopy: document.getElementById('board-after-copy'),
  note: document.getElementById('board-note')
};

const tabs = [...document.querySelectorAll('[data-board]')];
const sidebarItems = [...document.querySelectorAll('.workspace-sidebar .sidebar-item')].slice(0, 4);
const scenarioDialog = document.getElementById('scenario-dialog');
const pilotDialog = document.getElementById('pilot-dialog');

function selectBoard(id) {
  if (!scenarios[id]) return;
  const board = scenarios[id].board;
  const boardIcon = document.createElement('img');
  boardIcon.src = `./icons/${board.icon}.svg`;
  boardIcon.alt = '';
  boardIcon.setAttribute('aria-hidden', 'true');
  document.getElementById('board-title').replaceChildren(document.createTextNode(`${board.title} `), boardIcon);
  Object.entries(boardFields).forEach(([key, element]) => { element.textContent = board[key]; });
  tabs.forEach(tab => {
    const active = tab.dataset.board === id;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  sidebarItems.forEach((item, index) => {
    const active = tabs[index]?.dataset.board === id;
    item.classList.toggle('is-current', active);
    item.classList.toggle('ca-app__sidebar-item--active', active);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectBoard(tab.dataset.board));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
      (index + (event.key === 'ArrowLeft' ? -1 : 1) + tabs.length) % tabs.length;
    tabs[next].focus();
    selectBoard(tabs[next].dataset.board);
  });
});

document.querySelectorAll('[data-scenario]').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.scenario;
    const scenario = scenarios[id];
    selectBoard(id);
    document.getElementById('scenario-dialog-title').textContent = scenario.dialogTitle;
    document.getElementById('dialog-intro').textContent = scenario.intro;
    document.getElementById('dialog-before').textContent = scenario.before;
    document.getElementById('dialog-after').textContent = scenario.after;
    document.getElementById('dialog-metric').textContent = scenario.metric;
    scenarioDialog.showModal();
  });
});

document.querySelectorAll('[data-open-pilot]').forEach(button => {
  button.addEventListener('click', () => pilotDialog.showModal());
});

document.querySelectorAll('[data-close-dialog]').forEach(button => {
  button.addEventListener('click', () => button.closest('dialog').close());
});

[scenarioDialog, pilotDialog].forEach(dialog => {
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
});

const navDropdowns = [...document.querySelectorAll('.nav-dropdown')];
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mainNavigation = document.getElementById('main-navigation');

function closeMobileMenu() {
  if (!mobileMenuButton || !mainNavigation) return;
  mobileMenuButton.setAttribute('aria-expanded', 'false');
  mobileMenuButton.setAttribute('aria-label', 'Открыть меню');
  mainNavigation.classList.remove('is-open');
}

if (mobileMenuButton && mainNavigation) {
  mobileMenuButton.addEventListener('click', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const open = mobileMenuButton.getAttribute('aria-expanded') !== 'true';
    mobileMenuButton.setAttribute('aria-expanded', String(open));
    mobileMenuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    mainNavigation.classList.toggle('is-open', open);
    if (!open) navDropdowns.forEach(dropdown => { dropdown.open = false; });
  });

  mainNavigation.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a')) closeMobileMenu();
  });
}

navDropdowns.forEach(dropdown => {
  dropdown.addEventListener('toggle', () => {
    if (dropdown.open) navDropdowns.filter(other => other !== dropdown).forEach(other => { other.open = false; });
  });
  dropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { dropdown.open = false; });
  });
});

document.addEventListener('click', event => {
  if (event.target instanceof Element && !event.target.closest('.main-nav')) {
    navDropdowns.forEach(dropdown => { dropdown.open = false; });
  }
  if (event.target instanceof Element && !event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-button')) closeMobileMenu();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    navDropdowns.forEach(dropdown => { dropdown.open = false; });
    closeMobileMenu();
  }
});

selectBoard('inbox');
