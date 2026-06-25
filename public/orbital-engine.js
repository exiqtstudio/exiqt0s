(function(){

var stage = document.getElementById('orbital-stage');
if (!stage) return;

// ─── Logo URLs ───────────────────────────────────────────────────────────────
function logoHTML(key) {
  var imgs = {
    gmail:      '<img src="/logos/Gmail.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    outlook:    '<img src="/logos/Microsoft-Outlook.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    whatsapp:   '<img src="/logos/whatsApp.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    gcal:       '<img src="/logos/Google-Calendar.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    outlookcal: '<img src="/logos/Microsoft_Outlook_Cal.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    linkedin:   '<img src="/logos/Linkedin.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    instagram:  '<img src="/logos/Instagram.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    facebook:   '<img src="/logos/facebook.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    stripe:     '<img src="/logos/Stripe.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    xero:       '<img src="/logos/xero.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    shopify:    '<img src="/logos/Shopify.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    slack:      '<img src="/logos/Slack.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    zoom:       '<img src="/logos/Zoom1.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    google:     '<img src="/logos/Google.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    mailchimp:  '<img src="/logos/mailchimp-mono.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    paypal:     '<img src="/logos/PayPal.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    gmeet:      '<img src="/logos/Google_Meet.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    gdrive:     '<img src="/logos/Google-Drive.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    dropbox:    '<img src="/logos/Dropbox.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    box:        '<img src="/logos/box.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    hubspot:    '<img src="/logos/Hubspot.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    salesforce: '<img src="/logos/Salesforce.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    canva:      '<img src="/logos/Canva.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    monday:     '<img src="/logos/monday-mono.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    trello:     '<img src="/logos/Trello.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    tiktok:     '<img src="/logos/tiktok.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    meta:       '<img src="/logos/meta.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    googleads:  '<img src="/logos/Google-ads.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    onedrive:   '<img src="/logos/Microsoft-Onedrive.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    quickbooks: '<img src="/logos/QuickBooks.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    square:     '<img src="/logos/Square.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    zapier:     '<img src="/logos/Zapier.svg" width="22" height="22" style="display:block;object-fit:contain;">',
    twilio:     '<img src="/logos/twilio.svg" width="22" height="22" style="display:block;object-fit:contain;">',
  };
  if (imgs[key]) return imgs[key];
  if (key === 'imessage') return '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.8 3 11.5c0 2.2.9 4.2 2.4 5.7L4 21l4.2-1.4c1.2.4 2.5.6 3.8.6 4.97 0 9-3.8 9-8.5S16.97 3 12 3z" fill="#1F2937"/><circle cx="8.5" cy="11.5" r="1.1" fill="#fff"/><circle cx="12" cy="11.5" r="1.1" fill="#fff"/><circle cx="15.5" cy="11.5" r="1.1" fill="#fff"/></svg>';
  if (key === 'docusign') return '<svg viewBox="0 0 24 24" fill="none"><path d="M5 2h9l5 5v15a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="0.5"/><path d="M14 2v5h5" stroke="#D1D5DB" stroke-width="0.5" fill="none"/><path d="M7 9h10M7 12h6" stroke="#C9CDD4" stroke-width="1.2" stroke-linecap="round"/><path d="M7 17q1.5-2.5 3 0t3-1.5t2.5 1.5" stroke="#1F2937" stroke-width="1.6" stroke-linecap="round" fill="none"/><path d="M6.5 19h11" stroke="#374151" stroke-width="0.8" stroke-linecap="round"/></svg>';
  if (key === 'exiqt') return '<img src="/brand/exiqt-monogram-white.svg" width="32" height="14" style="display:block;object-fit:contain;">';
  return '';
}

// ─── Card pool ────────────────────────────────────────────────────────────────
var CARDS = [
  { logoKey:'gmail',      logo:'gmail',      source:'Gmail',         label:'New enquiry received',             meta:'just now',          dot:'blue'   },
  { logoKey:'gmail',      logo:'gmail',      source:'Gmail',         label:'Re: Proposal, looks great',        meta:'2 min ago',         dot:null     },
  { logoKey:'gmail',      logo:'gmail',      source:'Gmail',         label:'Meeting confirmed Thursday',       meta:'8 min ago',         dot:null     },
  { logoKey:'outlook',    logo:'outlook',    source:'Outlook',       label:'Re: Contract, signed',             meta:'5 min ago',         dot:'green'  },
  { logoKey:'outlook',    logo:'outlook',    source:'Outlook',       label:'Reminder: Follow-up today',        meta:'10 min ago',        dot:'amber'  },
  { logoKey:'outlook',    logo:'outlook',    source:'Outlook',       label:'New message from Alex Chen',       meta:'15 min ago',        dot:'blue'   },
  { logoKey:'whatsapp',   type:'msg', logo:'whatsapp', source:'WhatsApp', label:'Confirming 3pm tomorrow',    meta:'James A.'           },
  { logoKey:'whatsapp',   type:'msg', logo:'whatsapp', source:'WhatsApp', label:'See you on site at 3pm',     meta:'Brad K.'            },
  { logoKey:'whatsapp',   type:'msg', logo:'whatsapp', source:'WhatsApp', label:'Running 10 mins late',       meta:'Marcus R.'          },
  { logoKey:'imessage',   type:'msg', logo:'imessage', source:'iMessage', label:'Deposit transferred',        meta:'Nat P.'             },
  { logoKey:'imessage',   type:'msg', logo:'imessage', source:'iMessage', label:'Call me when you get a chance', meta:'Chris W.'        },
  { logoKey:'gcal',       logo:'gcal',       source:'Calendar',      label:'Appointment 11:15am',              meta:'In 40 minutes',     dot:'amber'  },
  { logoKey:'gcal',       logo:'gcal',       source:'Calendar',      label:'3:30pm quote on site',             meta:'Today',             dot:null     },
  { logoKey:'gcal',       logo:'gcal',       source:'Calendar',      label:'Discovery call, Zoom',             meta:'Tomorrow 10am',     dot:'blue'   },
  { logoKey:'outlookcal', logo:'outlookcal', source:'Calendar',      label:'New booking 9am tomorrow',         meta:'Just confirmed',    dot:'green'  },
  { logoKey:'outlookcal', logo:'outlookcal', source:'Calendar',      label:'Meeting in 30 minutes',            meta:'Starting soon',     dot:'amber'  },
  { logoKey:'outlookcal', logo:'outlookcal', source:'Calendar',      label:'Valuation booked 4pm',             meta:'76 Heysen Ave',     dot:'blue'   },
  { logoKey:'gmeet',      logo:'gmeet',      source:'Google Meet',   label:'Meeting starting now',             meta:'Client onboarding', dot:'amber'  },
  { logoKey:'gmeet',      logo:'gmeet',      source:'Google Meet',   label:'Recording ready',                  meta:'45 min call',       dot:'green'  },
  { logoKey:'gmeet',      logo:'gmeet',      source:'Google Meet',   label:'Join link sent to client',         meta:'Tomorrow 2pm',      dot:'blue'   },
  { logoKey:'stripe',     logo:'stripe',     source:'Stripe',        label:'Payment received $4,250',          meta:'Cleared',           dot:'green'  },
  { logoKey:'stripe',     logo:'stripe',     source:'Stripe',        label:'Invoice paid $1,800',              meta:'Cleared',           dot:'green'  },
  { logoKey:'stripe',     logo:'stripe',     source:'Stripe',        label:'Deposit cleared',                  meta:'Account updated',   dot:'green'  },
  { logoKey:'xero',       logo:'xero',       source:'Xero',          label:'Invoice sent $6,500',              meta:'Awaiting payment',  dot:'blue'   },
  { logoKey:'xero',       logo:'xero',       source:'Xero',          label:'Reconciliation complete',          meta:'All clear',         dot:'green'  },
  { logoKey:'paypal',     logo:'paypal',     source:'PayPal',        label:'Payment received $890',            meta:'Cleared',           dot:'green'  },
  { logoKey:'paypal',     logo:'paypal',     source:'PayPal',        label:'Subscription payment cleared',     meta:'Monthly',           dot:'green'  },
  { logoKey:'shopify',    logo:'shopify',    source:'Shopify',       label:'New order received',               meta:'just now',          dot:'blue'   },
  { logoKey:'shopify',    logo:'shopify',    source:'Shopify',       label:'New sale $127',                    meta:'Processing',        dot:'green'  },
  { logoKey:'docusign',   logo:'docusign',   source:'DocuSign',      label:'Loan agreement signed',            meta:'All parties',       dot:'green'  },
  { logoKey:'docusign',   logo:'docusign',   source:'DocuSign',      label:'Awaiting signature 1 of 2',        meta:'Pending',           dot:'amber'  },
  { logoKey:'linkedin',   logo:'linkedin',   source:'LinkedIn',      label:'Sarah Mitchell connected',         meta:'Just now',          dot:'blue'   },
  { logoKey:'linkedin',   logo:'linkedin',   source:'LinkedIn',      label:'Post reached 1,240 people',        meta:'This week',         dot:'green'  },
  { logoKey:'linkedin',   logo:'linkedin',   source:'LinkedIn',      label:'3 new profile views',              meta:'Today',             dot:null     },
  { logoKey:'instagram',  logo:'instagram',  source:'Instagram',     label:'New follower @thebuildco',         meta:'Just now',          dot:'blue'   },
  { logoKey:'instagram',  logo:'instagram',  source:'Instagram',     label:'Post saved 47 times',              meta:'This week',         dot:'green'  },
  { logoKey:'facebook',   logo:'facebook',   source:'Facebook',      label:'Ad: 14 new leads today',           meta:'Campaign live',     dot:'blue'   },
  { logoKey:'facebook',   type:'msg', logo:'facebook', source:'Facebook Msg', label:'Hey, are you free Thursday?', meta:'James R.'     },
  { logoKey:'google',     logo:'google',     source:'Google',        label:'New 5-star review',                meta:'Reply suggested',   dot:'green'  },
  { logoKey:'google',     logo:'google',     source:'Google',        label:'6 profile views today',            meta:'Business search',   dot:null     },
  { logoKey:'slack',      logo:'slack',      source:'Slack',         label:'Jordan: urgent question',          meta:'#team channel',     dot:'amber'  },
  { logoKey:'slack',      logo:'slack',      source:'Slack',         label:'4 new messages',                   meta:'#general',          dot:'blue'   },
  { logoKey:'zoom',       logo:'zoom',       source:'Zoom',          label:'Meeting starting in 5 min',        meta:'Client call',       dot:'amber'  },
  { logoKey:'zoom',       logo:'zoom',       source:'Zoom',          label:'Recording ready',                  meta:'Client call',       dot:'green'  },
  { logoKey:'mailchimp',  logo:'mailchimp',  source:'Mailchimp',     label:'32% open rate, above avg',         meta:'Campaign sent',     dot:'green'  },
  { logoKey:'mailchimp',  logo:'mailchimp',  source:'Mailchimp',     label:'Campaign delivered, 847 sent',     meta:'2% unsubscribe',    dot:'blue'   },
  { logoKey:'gdrive',     logo:'gdrive',     source:'Google Drive',  label:'Document shared with you',         meta:'Q2 Proposal.pdf',   dot:'blue'   },
  { logoKey:'gdrive',     logo:'gdrive',     source:'Google Drive',  label:'File updated by client',           meta:'Signed agreement',  dot:'green'  },
  { logoKey:'gdrive',     logo:'gdrive',     source:'Google Drive',  label:'Folder access granted',            meta:'Project docs',      dot:'blue'   },
  { logoKey:'dropbox',    logo:'dropbox',    source:'Dropbox',       label:'New file added',                   meta:'Signed contract',   dot:'green'  },
  { logoKey:'dropbox',    logo:'dropbox',    source:'Dropbox',       label:'Folder shared with you',           meta:'Client assets',     dot:'blue'   },
  { logoKey:'box',        logo:'box',        source:'Box',           label:'Document ready to review',         meta:'Loan summary',      dot:'amber'  },
  { logoKey:'box',        logo:'box',        source:'Box',           label:'File approved',                    meta:'All parties',       dot:'green'  },
  { logoKey:'hubspot',    logo:'hubspot',    source:'HubSpot',       label:'New contact created',              meta:'Pipeline',          dot:'blue'   },
  { logoKey:'hubspot',    logo:'hubspot',    source:'HubSpot',       label:'Deal moved to Proposal',           meta:'$18,500',           dot:'green'  },
  { logoKey:'hubspot',    logo:'hubspot',    source:'HubSpot',       label:'Sequence enrolled',                meta:'7-step nurture',    dot:'purple' },
  { logoKey:'salesforce', logo:'salesforce', source:'Salesforce',    label:'Opportunity closed won',           meta:'$42,000',           dot:'green'  },
  { logoKey:'salesforce', logo:'salesforce', source:'Salesforce',    label:'New lead assigned to you',         meta:'Enterprise tier',   dot:'blue'   },
  { logoKey:'salesforce', logo:'salesforce', source:'Salesforce',    label:'Task overdue',                     meta:'Follow-up call',    dot:'amber'  },
  { logoKey:'canva',      logo:'canva',      source:'Canva',         label:'Design shared with you',           meta:'Proposal deck',     dot:'blue'   },
  { logoKey:'canva',      logo:'canva',      source:'Canva',         label:'Presentation ready',               meta:'Client-facing',     dot:'green'  },
  { logoKey:'monday',     logo:'monday',     source:'Monday',        label:'Task moved to In Progress',        meta:'Website build',     dot:'blue'   },
  { logoKey:'monday',     logo:'monday',     source:'Monday',        label:'Item assigned to you',             meta:'Client onboarding', dot:'amber'  },
  { logoKey:'monday',     logo:'monday',     source:'Monday',        label:'Board update from team',           meta:'Q3 pipeline',       dot:'blue'   },
  { logoKey:'trello',     logo:'trello',     source:'Trello',        label:'Card moved to Done',               meta:'Proposal sent',     dot:'green'  },
  { logoKey:'trello',     logo:'trello',     source:'Trello',        label:'You were added to a card',         meta:'New project',       dot:'blue'   },
  { logoKey:'exiqt',      logo:'exiqt',      source:'EX!QT 0S',      label:'New lead received',                meta:'Pipeline',          dot:'blue'   },
  { logoKey:'exiqt',      logo:'exiqt',      source:'EX!QT 0S',      label:'Unconditional approval',           meta:'Congratulations',   dot:'green'  },
  { logoKey:'exiqt',      logo:'exiqt',      source:'EX!QT 0S',      label:'Settlement today',                 meta:'42 Crown St',       dot:'green'  },
  { logoKey:'exiqt',      logo:'exiqt',      source:'EX!QT 0S',      label:'Valuation received',               meta:'14 Birch St',       dot:'green'  },
  { logoKey:'init', type:'initial', initials:'TW', source:'Team',    label:'Quote approved, send now',         meta:'Tom W.',            dot:'green'  },
  { logoKey:'init', type:'initial', initials:'MJ', source:'Client',  label:'Loved the proposal!',              meta:'Michael J.',        dot:'green'  },
  { logoKey:'init', type:'initial', initials:'RL', source:'Client',  label:'See you on site at 3pm',           meta:'Rachel L.',         dot:'blue'   },
  { logoKey:'init', type:'initial', initials:'PH', source:'Referral',label:'Referred by Jason, keen',          meta:'Phil H.',           dot:'blue'   },
];

// ─── Layouts ──────────────────────────────────────────────────────────────────
var LAYOUTS = [
  [ { tx:-165,ty:-250 }, { tx:165,ty:-250 }, { tx:-295,ty:0 }, { tx:295,ty:0 }, { tx:-165,ty:250 }, { tx:165,ty:250 } ],
  [ { tx:-165,ty:-270 }, { tx:165,ty:-270 }, { tx:-295,ty:-112 }, { tx:295,ty:-112 }, { tx:-295,ty:112 }, { tx:295,ty:112 }, { tx:-165,ty:270 }, { tx:165,ty:270 } ],
  [ { tx:0,ty:-260 }, { tx:255,ty:-130 }, { tx:255,ty:130 }, { tx:0,ty:260 }, { tx:-255,ty:130 }, { tx:-255,ty:-130 } ],
  [ { tx:0,ty:-310 }, { tx:200,ty:-210 }, { tx:275,ty:0 }, { tx:200,ty:210 }, { tx:0,ty:310 }, { tx:-200,ty:210 }, { tx:-275,ty:0 }, { tx:-200,ty:-210 } ],
];

// ─── State ────────────────────────────────────────────────────────────────────
var currentLayoutIndex = 0;
var activeCards = [];
var queue = [];

function refill() { queue = [].concat(CARDS).sort(function(){ return Math.random() - 0.5; }); }
refill();
function nextCard() { if (!queue.length) refill(); return queue.shift(); }

var SPAWN_MS        = 2000;
var RETRACT_MS      = 2000;
var SPAWN_STAGGER   = 350;
var RETRACT_STAGGER = 180;

// ─── Build card element ───────────────────────────────────────────────────────
function buildCard(data, tx, ty) {
  var el = document.createElement('div');
  el.className = 'card';
  el.style.setProperty('--tx', tx + 'px');
  el.style.setProperty('--ty', ty + 'px');

  if (data.type === 'initial') {
    var av = document.createElement('div');
    av.className = 'card-avatar';
    av.textContent = data.initials || '';
    el.appendChild(av);
  } else if (data.type === 'msg') {
    var av = document.createElement('div');
    av.className = 'card-avatar card-avatar-logo';
    av.innerHTML = logoHTML(data.logo);
    el.appendChild(av);
  } else if (data.logo) {
    var logoWrap = document.createElement('div');
    logoWrap.className = 'card-logo';
    logoWrap.dataset.logo = data.logo;
    logoWrap.innerHTML = logoHTML(data.logo);
    el.appendChild(logoWrap);
  }

  var body = document.createElement('div');
  body.className = 'card-body';

  var src = document.createElement('span');
  src.className = 'card-source';
  src.textContent = data.source || '';
  body.appendChild(src);

  var labelRow = document.createElement('div');
  labelRow.className = 'card-label-row';

  if (data.dot) {
    var dot = document.createElement('span');
    dot.className = 'status-dot ' + data.dot;
    labelRow.appendChild(dot);
  }

  var lbl = document.createElement('span');
  lbl.className = 'card-label';
  lbl.textContent = data.label;
  labelRow.appendChild(lbl);
  body.appendChild(labelRow);

  if (data.meta) {
    var meta = document.createElement('span');
    meta.className = 'card-meta';
    meta.textContent = data.meta;
    body.appendChild(meta);
  }

  el.appendChild(body);
  stage.appendChild(el);
  return el;
}

// ─── Diverse batch picker ─────────────────────────────────────────────────────
function pickDiverseBatch(count) {
  if (queue.length < count) refill();
  var batch = [], usedKeys = {}, deferred = [];
  while (batch.length < count && queue.length > 0) {
    var card = queue.shift();
    var key = card.logoKey || 'x';
    if (!usedKeys[key]) { batch.push(card); usedKeys[key] = true; }
    else { deferred.push(card); }
  }
  var di = 0;
  while (batch.length < count && di < deferred.length) batch.push(deferred[di++]);
  queue.unshift.apply(queue, deferred.slice(di));
  return batch;
}

// ─── Retract layout ───────────────────────────────────────────────────────────
function retractLayout(cards, onComplete) {
  var ordered = [].concat(cards).sort(function(a, b) { return a._spawnOrder - b._spawnOrder; });
  ordered.forEach(function(el, i) {
    setTimeout(function() {
      el.classList.remove('spawning');
      el.classList.add('retracting');
      setTimeout(function() { el.remove(); }, RETRACT_MS + 400);
    }, i * RETRACT_STAGGER);
  });
  setTimeout(onComplete, 100);
}

// ─── Spawn layout ─────────────────────────────────────────────────────────────
function spawnLayout(layoutIndex) {
  var positions = LAYOUTS[layoutIndex];
  var batch = pickDiverseBatch(positions.length);
  var newCards = [];
  var accentIndex = Math.floor(Math.random() * positions.length);

  positions.forEach(function(pos, i) {
    var data = batch[i];
    if (!data) return;
    var el = buildCard(data, pos.tx, pos.ty);
    el._spawnOrder = i;
    var dist = Math.sqrt(pos.tx * pos.tx + pos.ty * pos.ty);
    var scale = 1 - ((dist - 100) / 260) * 0.06;
    el.style.setProperty('--depth-scale', Math.max(0.93, scale).toFixed(3));
    if (i === accentIndex) el.classList.add('accent');
    newCards.push(el);
    setTimeout(function() {
      requestAnimationFrame(function() { requestAnimationFrame(function() { el.classList.add('spawning'); }); });
    }, i * SPAWN_STAGGER);
  });

  activeCards = newCards;

  var lastCardArrives = SPAWN_MS + ((positions.length - 1) * SPAWN_STAGGER);
  setTimeout(function() {
    retractLayout(newCards, function() {
      currentLayoutIndex = (currentLayoutIndex + 1) % LAYOUTS.length;
      setTimeout(function() { spawnLayout(currentLayoutIndex); }, 0);
    });
  }, lastCardArrives + 320);
}

// ─── Start ────────────────────────────────────────────────────────────────────
setTimeout(function() { spawnLayout(0); }, 800);

})();
