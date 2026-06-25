(function () {
  'use strict';

  var INITIAL = [
    { id: 'c1', name: 'Sarah Chen',   business: 'Chen Advisory',    value: '$12,500', initials: 'SC', color: '#4B5563', stage: 'new'         },
    { id: 'c2', name: 'Marcus Reid',  business: 'Reid & Partners',  value: '$18,500', initials: 'MR', color: '#2D3748', stage: 'new'         },
    { id: 'c3', name: 'James Walsh',  business: 'Walsh & Co',       value: '$9,200',  initials: 'JW', color: '#374151', stage: 'contacted'   },
    { id: 'c4', name: 'Priya Nair',   business: 'Nair Group',       value: '$24,000', initials: 'PN', color: '#1F2937', stage: 'appointment' },
    { id: 'c5', name: 'Tom Brennan',  business: 'Brennan Retail',   value: '$7,800',  initials: 'TB', color: '#374151', stage: 'proposal'    },
  ];

  var INCOMING = [
    { id: 'n1', name: 'Emma Lowe',    business: 'Lowe Creative',    value: '$15,300', initials: 'EL', color: '#4B5563' },
    { id: 'n2', name: 'Daniel Park',  business: 'Park & Co',        value: '$11,200', initials: 'DP', color: '#2D3748' },
    { id: 'n3', name: 'Nina Torres',  business: 'Torres Group',     value: '$19,800', initials: 'NT', color: '#374151' },
  ];

  var ICON_EMAIL = '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="#C6C6CB" stroke-width="1.2"/><path d="M1.5 5l6.5 4.5L14.5 5" stroke="#C6C6CB" stroke-width="1.2"/></svg>';
  var ICON_CLOCK = '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="5.5" stroke="#C6C6CB" stroke-width="1.2"/><path d="M8 5v3l2 1.5" stroke="#C6C6CB" stroke-width="1.2" stroke-linecap="round"/></svg>';
  var ICON_CAL   = '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="3" width="13" height="11" rx="1" stroke="#C6C6CB" stroke-width="1.2"/><path d="M1.5 7h13M5 1.5v3M11 1.5v3" stroke="#C6C6CB" stroke-width="1.2" stroke-linecap="round"/></svg>';

  var contacts = [];
  var incomingIdx = 0;
  var timers = [];

  // ─── Build card element ───────────────────────────────────────────────────────
  function buildCard(c) {
    var el = document.createElement('div');
    el.className = 'crm-card';
    el.id = 'crm-card-' + c.id;
    el.innerHTML =
      '<div class="crm-card-top">' +
        '<div class="crm-card-avatar" style="background:' + c.color + '">' + c.initials + '</div>' +
        '<div class="crm-card-info">' +
          '<div class="crm-card-name">' + c.name + '</div>' +
          '<div class="crm-card-biz">' + c.business + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="crm-card-value">' + c.value + '</div>' +
      '<div class="crm-card-icons">' +
        '<div class="crm-card-icon">' + ICON_EMAIL + '</div>' +
        '<div class="crm-card-icon">' + ICON_CLOCK + '</div>' +
        '<div class="crm-card-icon">' + ICON_CAL + '</div>' +
      '</div>';
    return el;
  }

  // ─── Render ───────────────────────────────────────────────────────────────────
  function renderAll() {
    ['new', 'contacted', 'appointment', 'proposal', 'closed'].forEach(function (s) {
      var col = document.getElementById('crm-cards-' + s);
      if (col) col.innerHTML = '';
    });
    contacts.forEach(function (c) {
      var col = document.getElementById('crm-cards-' + c.stage);
      if (col) col.appendChild(buildCard(c));
    });
    updateCounts();
  }

  function updateCounts() {
    ['new', 'contacted', 'appointment', 'proposal', 'closed'].forEach(function (s) {
      var col = document.getElementById('crm-cards-' + s);
      var el  = document.getElementById('crm-count-' + s);
      if (col && el) el.textContent = col.children.length;
    });
  }

  // ─── Move card ────────────────────────────────────────────────────────────────
  function moveCard(id, toStage, msg) {
    var card    = document.getElementById('crm-card-' + id);
    var contact = contacts.find(function (c) { return c.id === id; });
    if (!card || !contact) return;

    card.classList.add('crm-card-exit');
    setTimeout(function () {
      if (card.parentNode) card.parentNode.removeChild(card);
      contact.stage = toStage;
      var col = document.getElementById('crm-cards-' + toStage);
      if (col) {
        card.classList.remove('crm-card-exit');
        card.classList.add('crm-card-enter');
        col.insertBefore(card, col.firstChild);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { card.classList.remove('crm-card-enter'); });
        });
      }
      updateCounts();
      if (msg) showToast(msg);
    }, 380);
  }

  // ─── Add incoming card ────────────────────────────────────────────────────────
  function addCard(msg) {
    var template = INCOMING[incomingIdx % INCOMING.length];
    incomingIdx++;
    var c = Object.assign({}, template, { id: template.id + '_' + incomingIdx, stage: 'new' });
    contacts.push(c);
    var col = document.getElementById('crm-cards-new');
    if (col) {
      var card = buildCard(c);
      card.classList.add('crm-card-enter');
      col.insertBefore(card, col.firstChild);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { card.classList.remove('crm-card-enter'); });
      });
      updateCounts();
      if (msg) showToast(msg);
    }
  }

  // ─── Remove card (after closed) ───────────────────────────────────────────────
  function removeCard(id) {
    var card = document.getElementById('crm-card-' + id);
    if (!card) return;
    card.classList.add('crm-card-exit');
    setTimeout(function () {
      if (card.parentNode) card.parentNode.removeChild(card);
      contacts = contacts.filter(function (c) { return c.id !== id; });
      updateCounts();
    }, 380);
  }

  // ─── Toast ────────────────────────────────────────────────────────────────────
  function showToast(msg) {
    var toast = document.getElementById('crm-toast');
    if (!toast) return;
    clearTimeout(toast._t);
    var text = toast.querySelector('.crm-toast-text');
    if (text) text.textContent = msg;
    toast.classList.add('crm-toast-show');
    toast._t = setTimeout(function () { toast.classList.remove('crm-toast-show'); }, 2800);
  }

  // ─── Sequence ─────────────────────────────────────────────────────────────────
  var SEQ = [
    [2000,  function () { moveCard('c3', 'appointment', 'Appointment confirmed — James Walsh'); }],
    [4800,  function () { addCard('New enquiry — Emma Lowe'); }],
    [7500,  function () { moveCard('c1', 'contacted', 'AI sent follow-up to Sarah Chen'); }],
    [10000, function () { moveCard('c4', 'proposal', 'Proposal sent — Priya Nair $24,000'); }],
    [12500, function () { moveCard('c2', 'contacted', 'Marcus Reid — initial contact made'); }],
    [15000, function () { moveCard('c5', 'closed', 'Deal closed — Tom Brennan $7,800'); }],
    [17200, function () { addCard('New enquiry — Daniel Park'); }],
    [18500, function () { removeCard('c5'); }],
    [20000, function () { moveCard('c3', 'proposal', 'James Walsh — proposal stage'); }],
    [22500, function () { moveCard('c1', 'appointment', 'Appointment set — Sarah Chen'); }],
  ];

  function runLoop() {
    timers.forEach(clearTimeout);
    timers = [];
    SEQ.forEach(function (step) {
      timers.push(setTimeout(step[1], step[0]));
    });
    timers.push(setTimeout(function () {
      contacts = INITIAL.map(function (c) { return Object.assign({}, c); });
      incomingIdx = 0;
      renderAll();
      setTimeout(runLoop, 1500);
    }, 26000));
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    if (!document.getElementById('crm-pipeline')) return;
    contacts = INITIAL.map(function (c) { return Object.assign({}, c); });
    renderAll();
    setTimeout(runLoop, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
