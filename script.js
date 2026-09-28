const categories = [
  ['asset-visibility', 'Asset visibility', 'A practical guide to making distributed assets easier to understand, inspect and act on.'],
  ['field-data-collection', 'Field data collection', 'Methods for capturing consistent observations when work happens outside the office.'],
  ['operational-insight', 'Operational insight', 'Ways to connect location-aware records with the decisions teams need to make.'],
  ['infrastructure-planning', 'Infrastructure planning', 'A grounded perspective on planning, maintaining and communicating physical systems.'],
  ['environmental-monitoring', 'Environmental monitoring', 'Frameworks for observing change across landscapes, sites and communities.'],
  ['route-optimization', 'Route optimization', 'Questions and methods for making movement through complex places more predictable.'],
  ['risk-mapping', 'Risk mapping', 'Approaches for identifying exposure, uncertainty and priority areas without false precision.'],
  ['community-mapping', 'Community mapping', 'Participatory ways to bring local knowledge into a more complete picture of place.'],
  ['data-governance', 'Data governance', 'Practical principles for responsible, useful and accountable location data.'],
  ['geospatial-strategy', 'Geospatial strategy', 'A clear starting point for organizations deciding what location intelligence should do.']
];
const audiences = [
  ['infrastructure-field-teams', 'infrastructure field teams'], ['energy-operators', 'energy operators'], ['logistics-managers', 'logistics managers'], ['environmental-practitioners', 'environmental practitioners'], ['public-sector-planners', 'public-sector planners'], ['nonprofit-programs', 'nonprofit programs'], ['operations-leaders', 'operations leaders'], ['data-teams', 'data teams'], ['community-organizers', 'community organizers'], ['researchers', 'researchers']
];
const places = [
  ['urban', 'urban environments'], ['coastal', 'coastal environments'], ['rural', 'rural environments'], ['riverine', 'riverine environments'], ['industrial', 'industrial environments'], ['regional', 'regional networks']
];
const categoryDetails = {
  'asset-visibility': ['build a dependable asset register', 'identity, condition, ownership and last-known status'],
  'field-data-collection': ['design a field record people will actually complete', 'the minimum useful observation, its source and its time'],
  'operational-insight': ['connect observations to an operational decision', 'what changed, who needs to know and what happens next'],
  'infrastructure-planning': ['turn a physical-system view into a planning habit', 'priority, lifecycle, dependencies and service impact'],
  'environmental-monitoring': ['observe change without pretending to know more than the data shows', 'baseline, time series, uncertainty and local interpretation'],
  'route-optimization': ['make movement safer and more predictable', 'stops, constraints, travel time and exceptions'],
  'risk-mapping': ['make exposure and uncertainty discussable', 'hazard, vulnerability, confidence and response capacity'],
  'community-mapping': ['bring lived experience into a shared map', 'consent, representation, local language and action'],
  'data-governance': ['make location data useful without making it careless', 'purpose, access, retention, provenance and accountability'],
  'geospatial-strategy': ['choose a location capability that matches the organization', 'decision value, ownership, adoption and sustainable cost']
};
const audienceDetails = {
  'infrastructure-field-teams': 'Field teams need quick capture, reliable offline habits and a record that remains useful after the inspection is over.',
  'energy-operators': 'Energy operators need a shared view across distributed equipment, maintenance cycles, safety concerns and service continuity.',
  'logistics-managers': 'Logistics managers need to understand movement, exceptions and handoffs without burying the team in administration.',
  'environmental-practitioners': 'Environmental practitioners need evidence that can be revisited, compared over time and explained to non-specialists.',
  'public-sector-planners': 'Public-sector planners need transparent assumptions, durable records and a way to connect plans to lived outcomes.',
  'nonprofit-programs': 'Nonprofit programs need location context that supports service delivery while respecting community trust and limited capacity.',
  'operations-leaders': 'Operations leaders need a small number of reliable signals that help them prioritize attention and allocate people well.',
  'data-teams': 'Data teams need clear ownership, quality rules and interfaces that make location information reusable across products.',
  'community-organizers': 'Community organizers need mapping practices that make participation meaningful rather than extractive.',
  'researchers': 'Researchers need traceable observations, explicit limitations and methods that can survive scrutiny across places.'
};
const placeDetails = {
  urban: 'Urban work is shaped by density, competing uses of space, changing addresses and many stakeholders sharing the same infrastructure.',
  coastal: 'Coastal work is shaped by exposure, seasonal movement, fragile access routes and the overlap between livelihoods and environmental change.',
  rural: 'Rural work is shaped by distance, intermittent connectivity, local knowledge and the high cost of sending people back to correct a record.',
  riverine: 'Riverine work is shaped by water levels, changing routes, dispersed settlements and access that can change faster than a static map.',
  industrial: 'Industrial work is shaped by safety controls, restricted areas, equipment dependencies and the need for a clear operational handoff.',
  regional: 'Regional work is shaped by different standards, uneven data quality, multiple jurisdictions and the challenge of comparing like with like.'
};

const resources = categories.flatMap(([category, title, intro]) => audiences.flatMap(([audience, audienceLabel]) => places.map(([place, placeLabel]) => ({
  slug: `${category}-${audience}-${place}`, title, intro, audienceLabel, placeLabel, category, categoryGoal: categoryDetails[category][0], categorySignals: categoryDetails[category][1], audienceContext: audienceDetails[audience], placeContext: placeDetails[place]
}))));
const bySlug = new Map(resources.map(resource => [resource.slug, resource]));
const pageUrl = new URL(window.location.href);
const requestedSlug = pageUrl.searchParams.get('page');
const libraryGrid = document.querySelector('#library-grid');
const searchInput = document.querySelector('#library-search');
const resultCount = document.querySelector('#result-count');
const loadMore = document.querySelector('#load-more');
let visibleCount = 12;

function resourceCard(resource) {
  return `<a class="resource-card" href="?page=${resource.slug}"><span class="resource-type">FIELD NOTE / ${resource.category.replaceAll('-', ' ')}</span><h3>${resource.title} for ${resource.audienceLabel}</h3><p>${resource.placeLabel} · A considered starting point for better operational context.</p><span class="card-arrow">↗</span></a>`;
}

function renderLibrary() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  const filtered = resources.filter(resource => `${resource.title} ${resource.audienceLabel} ${resource.placeLabel} ${resource.category}`.includes(query));
  libraryGrid.innerHTML = filtered.slice(0, visibleCount).map(resourceCard).join('') || '<p class="empty-state">No resources match that search. Try a broader phrase.</p>';
  resultCount.textContent = `${filtered.length} resource${filtered.length === 1 ? '' : 's'}`;
  loadMore.hidden = visibleCount >= filtered.length;
}

function renderDemo() {
  document.title = 'Try the SamLog demo';
  const desktopNav = document.querySelector('.desktop-nav');
  const mobileNav = document.querySelector('.mobile-menu nav');
  const navMarkup = '<a href="index.html">Overview</a><a href="#demo-assets">Assets</a><a href="#demo-activity">Activity</a>';
  if (desktopNav) desktopNav.innerHTML = navMarkup;
  if (mobileNav) mobileNav.innerHTML = navMarkup;
  const headerAction = document.querySelector('.site-header>.button');
  if (headerAction) {
    headerAction.href = 'index.html#contact';
    headerAction.innerHTML = 'Contact SamLog <span aria-hidden="true">↗</span>';
  }

  const startingAssets = [
    { id: 'SL-014', name: 'Generator set A', type: 'Power', site: 'Riverside depot', status: 'Needs review', due: 'Today', x: 25, y: 31 },
    { id: 'SL-021', name: 'Water pump 02', type: 'Water', site: 'Riverside depot', status: 'Current', due: '18 Jun', x: 48, y: 23 },
    { id: 'SL-033', name: 'Storage tank 1', type: 'Storage', site: 'North yard', status: 'Inspection due', due: 'Today', x: 72, y: 35 },
    { id: 'SL-042', name: 'Transformer 4', type: 'Power', site: 'North yard', status: 'Current', due: '24 Jun', x: 38, y: 62 },
    { id: 'SL-057', name: 'Access gate B', type: 'Security', site: 'East entrance', status: 'Needs review', due: 'Overdue', x: 65, y: 73 },
    { id: 'SL-061', name: 'Drainage channel', type: 'Civil', site: 'Riverside depot', status: 'Current', due: '02 Jul', x: 84, y: 57 }
  ];
  let assets = startingAssets.map(asset => ({ ...asset }));
  let selectedId = assets[0].id;
  let activeView = 'map';
  let activity = [
    { time: 'Today · 09:42', title: 'Routine check recorded', detail: 'Water pump 02 · Riverside depot', kind: 'success' },
    { time: 'Today · 08:15', title: 'Inspection flagged for review', detail: 'Generator set A · Riverside depot', kind: 'warning' },
    { time: 'Yesterday · 16:30', title: 'Asset details updated', detail: 'Transformer 4 · North yard', kind: 'neutral' }
  ];
  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

  document.querySelector('main').innerHTML = `
    <section class="demo-page" id="demo-app">
      <div class="demo-wrap">
        <div class="demo-breadcrumb"><a href="index.html">← SamLog</a><span>INTERACTIVE DEMO</span></div>
        <header class="demo-heading"><div><p class="demo-eyebrow">SAMPLE WORKSPACE · PORT HARCOURT</p><h1>Site operations</h1><p>Explore a sample asset register, inspect a location and try logging a field visit.</p></div><button class="demo-primary" type="button" id="demo-add-inspection"><span aria-hidden="true">＋</span> Log inspection</button></header>
        <p class="demo-disclosure"><span aria-hidden="true">i</span> Demo data is fictional. Changes stay in this browser session and reset when you reload.</p>
        <div class="demo-metrics" aria-label="Workspace summary"><div><span>ASSETS</span><b id="demo-total">6</b><small>In this sample site</small></div><div><span>NEEDS ATTENTION</span><b id="demo-attention">3</b><small>Due or flagged</small></div><div><span>UP TO DATE</span><b id="demo-current">3</b><small>Marked current</small></div><div><span>ACTIVITY ITEMS</span><b id="demo-visits">3</b><small>In this demo session</small></div></div>
        <div class="demo-toolbar"><div class="demo-tabs" role="tablist" aria-label="Workspace views"><button type="button" role="tab" aria-selected="true" data-view="map">Map</button><button type="button" role="tab" aria-selected="false" data-view="assets" id="demo-assets-tab">Assets</button><button type="button" role="tab" aria-selected="false" data-view="activity" id="demo-activity-tab">Activity</button></div><div class="demo-filters"><label class="demo-search"><span class="visually-hidden">Search assets</span><span aria-hidden="true">⌕</span><input id="demo-search" type="search" placeholder="Search assets" autocomplete="off"></label><label><span class="visually-hidden">Filter by status</span><select id="demo-status-filter"><option value="all">All statuses</option><option>Needs review</option><option>Inspection due</option><option>Current</option></select></label></div></div>
        <div class="demo-workspace" id="demo-map-view" role="tabpanel">
          <section class="demo-map-panel"><div class="demo-panel-heading"><div><h2>Riverside &amp; North Yard</h2><p>Sample site plan · select a marker to inspect an asset</p></div><span class="demo-site-chip"><i></i> Sample site</span></div><div class="demo-map-canvas" id="demo-map-canvas" role="group" aria-label="Sample site map with selectable assets"></div><div class="demo-map-legend"><span><i class="legend-current"></i> Current</span><span><i class="legend-due"></i> Inspection due</span><span><i class="legend-review"></i> Needs review</span></div></section>
          <aside class="demo-detail-panel" id="demo-detail" aria-live="polite"></aside>
        </div>
        <section class="demo-table-panel" id="demo-assets-view" role="tabpanel" hidden><div class="demo-panel-heading"><div><h2>Asset register</h2><p>Six fictional assets across two sample sites</p></div><span id="demo-result-count">6 assets</span></div><div class="demo-table-scroll"><table><thead><tr><th>Asset</th><th>Type</th><th>Site</th><th>Status</th><th>Next inspection</th></tr></thead><tbody id="demo-asset-rows"></tbody></table></div><p class="demo-empty" id="demo-empty" hidden>No sample assets match these filters.</p></section>
        <section class="demo-activity-panel" id="demo-activity-view" role="tabpanel" hidden><div class="demo-panel-heading"><div><h2>Recent activity</h2><p>Actions taken in this browser session</p></div></div><ol id="demo-activity-list"></ol></section>
        <div class="demo-footer"><span>SamLog product demo · Fictional sample data</span><button type="button" id="demo-reset">Reset sample data</button></div>
        <dialog class="demo-dialog" id="demo-inspection-dialog"><form id="demo-inspection-form"><div class="demo-dialog-heading"><div><p class="demo-eyebrow">FIELD VISIT</p><h2>Log an inspection</h2></div><button class="demo-icon-button" type="button" id="demo-dialog-close" aria-label="Close">×</button></div><label>Asset<select name="asset" id="demo-form-asset" required></select></label><label>Visit result<select name="result" required><option value="routine">Routine check completed</option><option value="followup">Follow-up needed</option></select></label><label>Field note<textarea name="note" rows="3" maxlength="240" placeholder="Add a short sample note (optional)"></textarea></label><p class="demo-form-hint">Use fictional details only. This demo does not save or send information.</p><div class="demo-dialog-actions"><button class="demo-secondary" type="button" id="demo-cancel">Cancel</button><button class="demo-primary" type="submit">Save inspection</button></div></form></dialog>
        <div class="demo-toast" id="demo-toast" role="status" aria-live="polite"></div>
      </div>
    </section>`;

  const root = document.querySelector('#demo-app');
  const search = document.querySelector('#demo-search');
  const statusFilter = document.querySelector('#demo-status-filter');
  const dialog = document.querySelector('#demo-inspection-dialog');
  const form = document.querySelector('#demo-inspection-form');
  const toast = document.querySelector('#demo-toast');
  let toastTimer;

  function filteredAssets() {
    const query = search.value.trim().toLowerCase();
    const status = statusFilter.value;
    return assets.filter(asset => {
      const matchesQuery = `${asset.id} ${asset.name} ${asset.type} ${asset.site}`.toLowerCase().includes(query);
      return matchesQuery && (status === 'all' || asset.status === status);
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  function renderDemo() {
    const visibleAssets = filteredAssets();
    const selectedAsset = visibleAssets.find(asset => asset.id === selectedId) || visibleAssets[0];
    if (selectedAsset) selectedId = selectedAsset.id;
    document.querySelector('#demo-total').textContent = assets.length;
    document.querySelector('#demo-attention').textContent = assets.filter(asset => asset.status !== 'Current').length;
    document.querySelector('#demo-current').textContent = assets.filter(asset => asset.status === 'Current').length;
    document.querySelector('#demo-visits').textContent = activity.length;
    document.querySelector('#demo-result-count').textContent = `${visibleAssets.length} asset${visibleAssets.length === 1 ? '' : 's'}`;
    document.querySelector('#demo-empty').hidden = visibleAssets.length > 0;

    document.querySelector('#demo-map-canvas').innerHTML = `<div class="demo-map-label demo-map-label-a">NORTH YARD</div><div class="demo-map-label demo-map-label-b">RIVERSIDE DEPOT</div><div class="demo-road demo-road-a"></div><div class="demo-road demo-road-b"></div><div class="demo-waterway"></div>${visibleAssets.map(asset => `<button type="button" class="demo-map-pin status-${asset.status === 'Current' ? 'current' : asset.status === 'Inspection due' ? 'due' : 'review'}${selectedAsset?.id === asset.id ? ' is-selected' : ''}" style="left:${asset.x}%;top:${asset.y}%" data-asset-id="${asset.id}" aria-label="Select ${escapeHtml(asset.name)}" title="${escapeHtml(asset.name)}"><span></span><small>${escapeHtml(asset.id)}</small></button>`).join('')}<div class="demo-map-scale">SAMPLE SITE PLAN</div>`;

    document.querySelector('#demo-detail').innerHTML = selectedAsset ? `<div class="detail-overline"><span>SELECTED ASSET</span><b>${escapeHtml(selectedAsset.id)}</b></div><div class="detail-icon">${escapeHtml(selectedAsset.type.slice(0, 1))}</div><h2>${escapeHtml(selectedAsset.name)}</h2><p class="detail-site">${escapeHtml(selectedAsset.site)}</p><dl><div><dt>Category</dt><dd>${escapeHtml(selectedAsset.type)}</dd></div><div><dt>Status</dt><dd><span class="demo-status status-${selectedAsset.status === 'Current' ? 'current' : selectedAsset.status === 'Inspection due' ? 'due' : 'review'}">${escapeHtml(selectedAsset.status)}</span></dd></div><div><dt>Next inspection</dt><dd>${escapeHtml(selectedAsset.due)}</dd></div></dl><button type="button" class="demo-secondary demo-review-button" data-mark-reviewed="${selectedAsset.id}" ${selectedAsset.status === 'Current' ? 'disabled' : ''}>Mark reviewed</button>` : '<div class="demo-no-selection">No matching assets. Adjust your search or status filter.</div>';

    document.querySelector('#demo-asset-rows').innerHTML = visibleAssets.map(asset => `<tr class="${selectedAsset?.id === asset.id ? 'is-selected' : ''}" data-select-row="${asset.id}"><td><button type="button" class="demo-table-asset" data-asset-id="${asset.id}"><b>${escapeHtml(asset.name)}</b><small>${escapeHtml(asset.id)}</small></button></td><td>${escapeHtml(asset.type)}</td><td>${escapeHtml(asset.site)}</td><td><span class="demo-status status-${asset.status === 'Current' ? 'current' : asset.status === 'Inspection due' ? 'due' : 'review'}">${escapeHtml(asset.status)}</span></td><td>${escapeHtml(asset.due)}</td></tr>`).join('');
    document.querySelector('#demo-activity-list').innerHTML = activity.map(item => `<li><i class="activity-dot ${item.kind}"></i><div><span>${escapeHtml(item.time)}</span><b>${escapeHtml(item.title)}</b><p>${escapeHtml(item.detail)}</p></div></li>`).join('');
    document.querySelector('#demo-form-asset').innerHTML = assets.map(asset => `<option value="${asset.id}">${escapeHtml(asset.name)} · ${asset.id}</option>`).join('');
  }

  function setView(view) {
    activeView = view;
    document.querySelector('#demo-map-view').hidden = view !== 'map';
    document.querySelector('#demo-assets-view').hidden = view !== 'assets';
    document.querySelector('#demo-activity-view').hidden = view !== 'activity';
    root.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-selected', String(button.dataset.view === view)));
  }

  root.addEventListener('click', event => {
    const tab = event.target.closest('[data-view]');
    if (tab) setView(tab.dataset.view);
    const assetControl = event.target.closest('[data-asset-id]');
    if (assetControl) {
      selectedId = assetControl.dataset.assetId;
      renderDemo();
    }
    const row = event.target.closest('[data-select-row]');
    if (row && !assetControl) {
      selectedId = row.dataset.selectRow;
      setView('map');
      renderDemo();
    }
    const markReviewed = event.target.closest('[data-mark-reviewed]');
    if (markReviewed && !markReviewed.disabled) {
      const asset = assets.find(item => item.id === markReviewed.dataset.markReviewed);
      asset.status = 'Current';
      asset.due = '30 days';
      activity.unshift({ time: 'Just now', title: 'Asset marked as reviewed', detail: `${asset.name} · ${asset.site}`, kind: 'success' });
      renderDemo();
      showToast(`${asset.name} marked as reviewed`);
    }
    if (event.target.closest('#demo-add-inspection')) dialog.showModal();
    if (event.target.closest('#demo-dialog-close, #demo-cancel')) dialog.close();
    if (event.target.closest('#demo-reset')) {
      assets = startingAssets.map(asset => ({ ...asset }));
      selectedId = assets[0].id;
      activity = [
        { time: 'Today · 09:42', title: 'Routine check recorded', detail: 'Water pump 02 · Riverside depot', kind: 'success' },
        { time: 'Today · 08:15', title: 'Inspection flagged for review', detail: 'Generator set A · Riverside depot', kind: 'warning' },
        { time: 'Yesterday · 16:30', title: 'Asset details updated', detail: 'Transformer 4 · North yard', kind: 'neutral' }
      ];
      search.value = '';
      statusFilter.value = 'all';
      setView('map');
      renderDemo();
      showToast('Sample data reset');
    }
  });
  search.addEventListener('input', renderDemo);
  statusFilter.addEventListener('change', renderDemo);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const asset = assets.find(item => item.id === formData.get('asset'));
    if (!asset) return;
    const needsFollowup = formData.get('result') === 'followup';
    asset.status = needsFollowup ? 'Needs review' : 'Current';
    asset.due = needsFollowup ? 'Follow-up' : '30 days';
    const note = String(formData.get('note') || '').trim();
    activity.unshift({ time: 'Just now', title: needsFollowup ? 'Inspection flagged for follow-up' : 'Routine inspection recorded', detail: `${asset.name} · ${asset.site}${note ? ` · ${note}` : ''}`, kind: needsFollowup ? 'warning' : 'success' });
    selectedId = asset.id;
    form.reset();
    dialog.close();
    renderDemo();
    showToast('Inspection added to this demo session');
  });

  renderDemo();
  window.scrollTo(0, 0);
}

function renderResource(resource) {
  document.title = `${resource.title} for ${resource.audienceLabel} | GeoLog`;
  document.querySelector('main').innerHTML = `<section class="resource-hero wrap"><a class="back-link" href="index.html#library">← Back to library</a><p class="eyebrow">FIELD NOTE / ${resource.category.replaceAll('-', ' ')}</p><h1>${resource.title}<br><em>for ${resource.audienceLabel}.</em></h1><p class="hero-lede">${resource.intro} This resource considers what that looks like in ${resource.placeLabel}, where context, constraints and local knowledge shape every useful answer.</p><div class="resource-meta"><span>GeoLog library</span><span>Reading guide · 6 min</span><span>Updated 2026</span></div></section><section class="article-body wrap"><article><p class="eyebrow">A WORKING FRAMEWORK</p><h2>Start with the situation, not the software.</h2><p>Good location intelligence begins with a shared understanding of the work. Before choosing a dashboard or a data model, name the decisions that need support, the people who make them and the conditions under which information is collected.</p><p>For ${resource.audienceLabel}, that often means connecting records that already exist with observations that only appear in the field. In ${resource.placeLabel}, the most useful system is usually the one that makes uncertainty visible while reducing the effort required to create a trustworthy record.</p><blockquote>“A map is useful when it changes what a team can see, discuss or decide.”</blockquote><h2>Three questions to carry forward</h2><div class="question-list"><div><span>01</span><p>What is the smallest reliable piece of context this decision needs?</p></div><div><span>02</span><p>Who has knowledge of this place that the current record does not include?</p></div><div><span>03</span><p>How will the team know that an insight has led to a better action?</p></div></div></article><aside><div class="aside-card"><span class="resource-type">RELATED TOPIC</span><h3>Keep building the picture.</h3><p>Explore adjacent methods from the GeoLog library.</p><a class="text-link" href="?page=${resources[(resources.indexOf(resource) + 1) % resources.length].slug}">Next resource ↗</a></div><div class="aside-card"><span class="resource-type">ABOUT THIS LIBRARY</span><p>These pages are educational working notes from an early-stage organization. They do not represent customer results, certifications or deployed product functionality.</p></div></aside></section>`;
  window.scrollTo(0, 0);
}

if (requestedSlug === 'demo') renderDemo();
else if (requestedSlug && bySlug.has(requestedSlug)) renderResource(bySlug.get(requestedSlug));
else if (libraryGrid && searchInput && resultCount && loadMore) {
  renderLibrary();
  searchInput?.addEventListener('input', () => { visibleCount = 12; renderLibrary(); });
  loadMore?.addEventListener('click', () => { visibleCount += 12; renderLibrary(); });
}

document.title = document.title.replaceAll('GeoLog', 'SamLog');
document.querySelectorAll('.logo').forEach(logo => { logo.textContent = 'S'; });
document.querySelectorAll('.map-center').forEach(mapCenter => { mapCenter.innerHTML = 'SAM<br><span>LOG</span>'; });
document.querySelectorAll('[aria-label*="GeoLog"]').forEach(element => { element.setAttribute('aria-label', element.getAttribute('aria-label').replaceAll('GeoLog', 'SamLog')); });
const brandWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const brandNodes = [];
while (brandWalker.nextNode()) brandNodes.push(brandWalker.currentNode);
brandNodes.forEach(node => { node.nodeValue = node.nodeValue.replaceAll('GeoLog', 'SamLog'); });
document.querySelectorAll('[href*="geolog.example"]').forEach(link => { link.href = link.href.replace('geolog.example', 'samlog.example'); });
