const solutionDetails = {
  data: {
    title: 'Справочник 1С',
    problem: 'Одни и те же позиции заведены под разными названиями. Сотрудникам сложно искать товары и сопоставлять записи.',
    action: 'Проверяем справочник, находим возможные дубли, нормализуем названия и согласуем правила классификации.',
    result: 'Список возможных дублей и согласованные правила ведения одной категории.',
    pilot: 'На пилоте берём одну товарную категорию: готовим список кандидатов на объединение, отчёт и согласованные изменения.',
    metric: 'Измеряем долю дублей, точность сопоставления и время поиска позиции.'
  },
  integrations: {
    title: 'Обмен 1С и CRM',
    problem: 'Заявки, заказы и статусы приходится переносить вручную между системами.',
    action: 'Настраиваем обмен справочниками и событиями, контроль ошибок и повторные попытки передачи.',
    result: 'Данные переходят между системами, а ошибки обмена видны ответственным.',
    pilot: 'На пилоте проверяем один маршрут: лид → CRM → заказ в 1С → обновление статуса.',
    metric: 'Измеряем время передачи, число ручных действий и долю успешных обменов.'
  },
  requests: {
    title: 'Обработка обращений',
    problem: 'Обращения приходят в разные каналы, часть из них теряется или долго остаётся без ответа.',
    action: 'Собираем обращения, извлекаем ключевые поля, классифицируем и готовим карточку для ответственного.',
    result: 'Обращение зарегистрировано и направлено в работу.',
    pilot: 'На пилоте берём один почтовый ящик и заранее согласованные типы обращений.',
    metric: 'Измеряем время регистрации, полноту карточки и точность классификации.'
  },
  knowledge: {
    title: 'Поиск по документам',
    problem: 'Регламенты и ответы разбросаны по документам. Поиск занимает время, а найденному ответу трудно доверять.',
    action: 'Организуем поиск и ответы с указанием источников с учётом прав доступа.',
    result: 'Сотрудник получает проверяемый ответ по доступным ему документам.',
    pilot: 'На пилоте проверяем одну базу документов и 30–50 типовых вопросов.',
    metric: 'Измеряем корректность ответов, время поиска и долю корректных отказов при отсутствии данных.'
  },
  agents: {
    title: 'Помощник сотрудника',
    problem: 'Повторяющиеся операции в продажах, снабжении, юридическом отделе, HR и финансах отнимают время.',
    action: 'Создаём помощника для одной роли: подготовка материалов, сверка, поиск или черновики документов.',
    result: 'Сотрудник получает подготовленный результат и проверяет его перед использованием.',
    pilot: 'На пилоте запускаем одного помощника с 2–3 функциями. Рискованные действия выполняются только после подтверждения человека.',
    metric: 'Измеряем время выполнения, точность и долю результатов, принятых сотрудниками.'
  },
  training: {
    title: 'Обучение команды',
    problem: 'Сотрудники используют ИИ бессистемно и не всегда понимают ограничения при работе с данными.',
    action: 'Проводим практику по ролям, готовим инструкции, шаблоны и правила обращения с информацией.',
    result: 'Команда умеет применять ИИ в согласованных задачах и проверять результат.',
    pilot: 'На пилоте работаем с одной группой сотрудников и ограниченным набором реальных задач.',
    metric: 'Измеряем частоту использования, время выполнения и качество результата.'
  },
  processes: {
    title: 'Контроль процесса и отчёты',
    problem: 'Согласования и отчёты ведутся вручную, статусы непрозрачны, отклонения замечают поздно.',
    action: 'Настраиваем маршруты, статусы, панели показателей и сводки по событиям процесса.',
    result: 'Ход работы и отклонения видны в общей сводке.',
    pilot: 'На пилоте проверяем один процесс или одну аналитическую панель.',
    metric: 'Измеряем время цикла, количество ошибок и просрочек, трудозатраты.'
  }
};

const solutionDialog = document.getElementById('solution-dialog');
const solutionFields = {
  title: document.getElementById('solution-dialog-title'),
  problem: document.getElementById('solution-problem'),
  action: document.getElementById('solution-action'),
  result: document.getElementById('solution-result'),
  pilot: document.getElementById('solution-pilot'),
  metric: document.getElementById('solution-metric')
};

const solutionOptions = [...document.querySelectorAll('[data-solution-option]')];
const solutionPreview = {
  title: document.querySelector('[data-solution-preview-title]'),
  copy: document.querySelector('[data-solution-preview-copy]'),
  result: document.querySelector('[data-solution-preview-result]'),
  metric: document.querySelector('[data-solution-preview-metric]'),
  mark: document.querySelector('[data-solution-preview-mark]')
};
let activeSolution = 'data';

function selectSolution(id) {
  const detail = solutionDetails[id];
  const option = solutionOptions.find((item) => item.dataset.solutionOption === id);
  if (!detail || !option) return;
  activeSolution = id;
  solutionPreview.title.textContent = detail.title;
  solutionPreview.copy.textContent = option.dataset.summary;
  solutionPreview.result.textContent = detail.result;
  solutionPreview.metric.textContent = detail.metric.replace(/^Измеряем\s+/u, '').replace(/^Проверяем\s+/u, '');
  const iconPath = `./icons/${option.dataset.icon}.svg`;
  solutionPreview.mark.src = iconPath;
  solutionOptions.forEach((item) => {
    const isActive = item === option;
    item.classList.toggle('is-active', isActive);
    item.setAttribute('aria-pressed', String(isActive));
  });
}

function openSolution(id) {
  const detail = solutionDetails[id];
  if (!detail) return;
  solutionDialog.dataset.activeSolution = id;
  for (const [field, element] of Object.entries(solutionFields)) {
    element.textContent = detail[field];
  }
  solutionDialog.showModal();
}

solutionOptions.forEach((button) => {
  button.addEventListener('click', () => selectSolution(button.dataset.solutionOption));
});

document.querySelector('[data-open-solution]').addEventListener('click', () => openSolution(activeSolution));

solutionDialog.addEventListener('click', (event) => {
  if (event.target === solutionDialog) solutionDialog.close();
});

const calculatorIds = ['people', 'minutes', 'days', 'share', 'rate'];
const calculatorInputs = Object.fromEntries(calculatorIds.map((id) => [id, document.getElementById(`calc-${id}`)]));
const formatDecimal = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 });
const formatMoney = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
const hourPlural = new Intl.PluralRules('ru-RU');

function calculateResource() {
  const value = (key) => {
    const input = calculatorInputs[key];
    const raw = Number(input.value) || 0;
    const minimum = input.min === '' ? -Infinity : Number(input.min);
    const maximum = input.max === '' ? Infinity : Number(input.max);
    input.setAttribute('aria-invalid', String(!input.validity.valid));
    return Math.min(maximum, Math.max(minimum, raw));
  };
  const people = value('people');
  const minutes = value('minutes');
  const days = value('days');
  const share = Math.min(100, value('share'));
  const rate = value('rate');
  const hours = people * minutes * days * share / 100 / 60;

  document.getElementById('calc-formula').textContent = `${formatDecimal.format(people)} чел. × ${formatDecimal.format(minutes)} мин. × ${formatDecimal.format(days)} дн. × ${formatDecimal.format(share)}% ÷ 60 = ${formatDecimal.format(hours)} ч`;
  document.getElementById('calc-hours').textContent = formatDecimal.format(hours);
  document.getElementById('calc-hours-unit').textContent = `${({ one: 'час', few: 'часа', many: 'часов', other: 'часа' })[hourPlural.select(Number(hours.toFixed(1)))]} в месяц`;
  document.getElementById('calc-money').textContent = `${formatMoney.format(hours * rate)} ₽`;
}

Object.values(calculatorInputs).forEach((input) => {
  input.addEventListener('input', calculateResource);
  input.addEventListener('blur', () => {
    if (input.value === '') return;
    const minimum = input.min === '' ? -Infinity : Number(input.min);
    const maximum = input.max === '' ? Infinity : Number(input.max);
    input.value = String(Math.min(maximum, Math.max(minimum, Number(input.value) || 0)));
    calculateResource();
  });
});
calculateResource();

const contactForm = document.getElementById('contact-form');
const draftResult = document.getElementById('draft-result');
const draftText = document.getElementById('draft-text');
const formStatus = document.getElementById('form-status');
const contactInterest = document.getElementById('contact-interest');
const contactInterestValue = document.getElementById('contact-interest-value');
const contactTask = contactForm.elements.namedItem('task');
const contactRequiredFields = [...contactForm.querySelectorAll('[required]')];

function setContactInterest(value, helper) {
  contactInterestValue.value = value;
  contactInterest.textContent = `Вы выбрали: ${value}. Коротко опишите, как эта работа устроена у вас.`;
  contactInterest.hidden = false;
  if (!contactTask.value.trim()) contactTask.placeholder = helper;
}

document.querySelector('[data-scenario-contact]').addEventListener('click', () => {
  const scenario = scenarios[scenarioDialog.dataset.activeScenario];
  if (scenario) setContactInterest(scenario.dialogTitle, 'Например: сейчас сотрудник переносит данные вручную между почтой и CRM.');
});

document.querySelector('[data-solution-contact]').addEventListener('click', () => {
  const solution = solutionDetails[solutionDialog.dataset.activeSolution];
  if (solution) setContactInterest(solution.title, 'Напишите, как этот процесс устроен у вашей команды сейчас.');
});

document.getElementById('calculator-cta').addEventListener('click', () => {
  const hours = document.getElementById('calc-hours').textContent.trim();
  setContactInterest(`Расчёт ручной работы: ${hours} ч в месяц по введённым допущениям`, 'Напишите, какую операцию вы хотите сократить и как оценивали время.');
});

contactRequiredFields.forEach((field) => {
  field.addEventListener('invalid', () => field.setAttribute('aria-invalid', 'true'));
  field.addEventListener('input', () => field.setAttribute('aria-invalid', String(!field.validity.valid)));
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  contactRequiredFields.forEach((field) => field.setAttribute('aria-invalid', 'false'));
  const form = new FormData(contactForm);
  const lines = [
    'Запрос для Corp Agents',
    '',
    `Имя: ${String(form.get('name')).trim()}`,
    `Рабочая почта: ${String(form.get('email')).trim()}`,
    `Компания: ${String(form.get('company')).trim() || 'не указана'}`,
    `Телефон: ${String(form.get('phone')).trim() || 'не указан'}`,
    '',
    ...(String(form.get('interest')).trim() ? [`Интерес: ${String(form.get('interest')).trim()}`, ''] : []),
    'Задача:',
    String(form.get('task')).trim()
  ];
  draftText.value = lines.join('\n');
  draftResult.hidden = false;
  formStatus.textContent = 'Текст готов. Данные никуда не отправлены.';
});

document.getElementById('copy-draft').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(draftText.value);
    formStatus.textContent = 'Текст скопирован. Данные никуда не отправлены.';
  } catch {
    draftText.focus();
    draftText.select();
    formStatus.textContent = 'Выделили текст. Скопируйте его вручную. Данные никуда не отправлены.';
  }
});

const securityWorkbench = document.getElementById('security-workbench');

if (securityWorkbench) {
  const securityQuestions = {
    placement: {
      title: 'Где будут обрабатываться данные?',
      copy: 'Оцениваем инфраструктуру и требования к данным, затем согласуем вариант размещения до пилота.',
      map: 'Размещение согласуем до доступа к данным',
      nodes: ['ai'],
      paths: ['rules', 'person']
    },
    data: {
      title: 'Какие источники подключим?',
      copy: 'Только те источники и поля, которые нужны для выбранной задачи. Остальные данные остаются вне контура.',
      map: 'Состав данных ограничен задачей',
      nodes: ['erp', 'crm', 'docs'],
      paths: ['sources-l', 'sources-m', 'sources-r']
    },
    audit: {
      title: 'Что проверим до запуска?',
      copy: 'Источники, ограничения, риски и действия, которые требуют отдельного подтверждения сотрудника.',
      map: 'Правила согласованы до начала работы',
      nodes: ['rules'],
      paths: ['rules']
    },
    access: {
      title: 'Кто получит доступ к результату?',
      copy: 'Только пользователи с нужной ролью. Права на ответы и отчёты повторяют согласованную модель доступа.',
      map: 'Доступ зависит от роли сотрудника',
      nodes: ['result'],
      paths: ['result']
    },
    log: {
      title: 'Что запишем в журнал?',
      copy: 'Запросы, события, подтверждения и ошибки. По ним можно восстановить ход работы и разобрать отклонение.',
      map: 'Ход работы можно восстановить',
      nodes: ['result', 'feedback'],
      paths: ['result'],
      feedback: true
    },
    human: {
      title: 'Кто подтвердит важное действие?',
      copy: 'Ответственный сотрудник проверяет результат и отдельно подтверждает действия, которые команда признала важными.',
      map: 'Подтверждение остаётся за сотрудником',
      nodes: ['human'],
      paths: ['person']
    }
  };

  const securityNodes = {
    erp: ['1С: учётные данные', 'ИИ получает доступ только к согласованным разделам и операциям 1С.', 'data', ['sources-l'], 'На схеме: источник 1С'],
    crm: ['CRM: данные клиентов', 'Подключаем только нужные записи и события, сохраняя действующие права пользователей.', 'data', ['sources-m'], 'На схеме: источник CRM'],
    docs: ['Документы и знания', 'В контур попадают разрешённые документы; закрытые категории можно исключить целиком.', 'data', ['sources-r'], 'На схеме: источник документов'],
    rules: ['Правила и ограничения', 'До обработки запроса определяем источники, допустимые операции и обязательные проверки.', 'audit', ['rules'], 'На схеме: правила и входной маршрут'],
    ai: ['ИИ-модуль', 'Обрабатывает запрос только внутри согласованного контура и не выходит за установленные правила.', 'placement', ['sources-l', 'sources-m', 'sources-r', 'rules', 'result', 'person'], 'На схеме: центр согласованного контура'],
    result: ['Результат и журнал', 'Ответы получают уполномоченные пользователи, а события и ошибки сохраняются для разбора.', 'access', ['result'], 'На схеме: результат и выходной маршрут'],
    human: ['Решение остаётся за человеком', 'Сотрудник проверяет результат и отдельно подтверждает критические действия.', 'human', ['person'], 'На схеме: человек и подтверждение'],
    feedback: ['Обратная связь', 'Замечания после проверки помогают уточнить правила без бесконтрольного самообучения.', 'log', [], 'На схеме: контур обратной связи']
  };

  const object = document.getElementById('security-svg');
  const wrap = document.getElementById('security-svg-wrap');
  const status = document.getElementById('security-load-status');
  const detailTitle = document.getElementById('security-detail-title');
  const detailCopy = document.getElementById('security-detail-copy');
  const detailMap = document.getElementById('security-detail-map');
  const detailCard = document.getElementById('security-detail');
  const questionButtons = [...securityWorkbench.querySelectorAll('[data-security-question]')];
  let svgRoot = null;

  function reserveDetailHeight() {
    const width = detailCard.getBoundingClientRect().width;
    if (!width) return;

    const sample = detailCard.cloneNode(true);
    sample.setAttribute('aria-hidden', 'true');
    sample.removeAttribute('aria-live');
    sample.removeAttribute('id');
    sample.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
    Object.assign(sample.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: `${width}px`,
      height: 'auto',
      minHeight: '0',
      margin: '0',
      visibility: 'hidden',
      pointerEvents: 'none'
    });
    detailCard.parentElement.appendChild(sample);

    const title = sample.querySelector('h3');
    const copy = sample.querySelector('p');
    const map = sample.querySelector('.security-detail-map strong');
    const variants = [
      ...Object.values(securityQuestions).map(({ title, copy, map }) => ({ title, copy, map })),
      ...Object.values(securityNodes).map((node) => ({ title: node[0], copy: node[1], map: node[4] }))
    ];
    let maxHeight = 0;
    variants.forEach((variant) => {
      title.textContent = variant.title;
      copy.textContent = variant.copy;
      map.textContent = variant.map;
      maxHeight = Math.max(maxHeight, sample.getBoundingClientRect().height);
    });
    sample.remove();
    detailCard.style.minHeight = `${Math.ceil(maxHeight)}px`;
  }

  let detailSizingFrame;
  function scheduleDetailSizing() {
    cancelAnimationFrame(detailSizingFrame);
    detailSizingFrame = requestAnimationFrame(reserveDetailHeight);
  }
  reserveDetailHeight();
  window.addEventListener('resize', scheduleDetailSizing);
  document.fonts?.ready.then(scheduleDetailSizing);

  function markQuestion(key) {
    questionButtons.forEach((button) => {
      const selected = button.dataset.securityQuestion === key;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  function paintDiagram(nodes = [], paths = [], feedback = false) {
    if (!svgRoot) return;
    svgRoot.querySelectorAll('[data-node]').forEach((node) => {
      const selected = nodes.includes(node.dataset.node);
      node.classList.toggle('is-active', selected);
      node.setAttribute('aria-pressed', String(selected));
    });
    const connectors = [...svgRoot.querySelectorAll('[id^="connector-"]')];
    const feedbackLoop = svgRoot.querySelector('#feedback-loop');
    connectors.forEach((connector) => connector.classList.remove('selected-path'));
    feedbackLoop?.classList.remove('selected-feedback');
    void svgRoot.getBoundingClientRect();
    connectors.forEach((connector) => {
      connector.classList.toggle('selected-path', paths.includes(connector.id.replace('connector-', '')));
    });
    feedbackLoop?.classList.toggle('selected-feedback', feedback);
  }

  function selectQuestion(key) {
    const entry = securityQuestions[key];
    if (!entry) return;
    detailTitle.textContent = entry.title;
    detailCopy.textContent = entry.copy;
    detailMap.textContent = entry.map;
    markQuestion(key);
    paintDiagram(entry.nodes, entry.paths, Boolean(entry.feedback));
  }

  function selectNode(key) {
    const entry = securityNodes[key];
    if (!entry) return;
    detailTitle.textContent = entry[0];
    detailCopy.textContent = entry[1];
    detailMap.textContent = entry[4];
    markQuestion(entry[2]);
    paintDiagram([key], entry[3], key === 'feedback');
  }

  function prepareSvg() {
    const documentRoot = object.contentDocument?.documentElement;
    if (!documentRoot || documentRoot.nodeName.toLowerCase() !== 'svg') {
      wrap.classList.add('is-error');
      wrap.setAttribute('aria-busy', 'false');
      status.textContent = 'Интерактивная схема недоступна. Показана резервная версия.';
      return;
    }

    wrap.classList.remove('is-error');
    status.textContent = 'Загружаем схему…';
    if (object.dataset.ready === 'true') return;
    object.dataset.ready = 'true';
    svgRoot = documentRoot;
    svgRoot.querySelectorAll('[data-node]').forEach((node) => {
      const key = node.dataset.node;
      node.addEventListener('click', () => selectNode(key));
      node.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectNode(key);
        }
      });
    });
    wrap.classList.add('is-ready');
    wrap.setAttribute('aria-busy', 'false');
    selectQuestion('placement');
  }

  questionButtons.forEach((button) => {
    button.addEventListener('click', () => selectQuestion(button.dataset.securityQuestion));
  });

  object.addEventListener('load', prepareSvg);
  object.addEventListener('error', () => {
    if (object.dataset.ready === 'true') return;
    wrap.classList.add('is-error');
    wrap.setAttribute('aria-busy', 'false');
    status.textContent = 'Интерактивная схема недоступна. Показана резервная версия.';
  });
  if (object.contentDocument?.documentElement) requestAnimationFrame(prepareSvg);
}

