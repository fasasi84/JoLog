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

function renderResource(resource) {
  document.title = `${resource.title} for ${resource.audienceLabel} | GeoLog`;
  document.querySelector('main').innerHTML = `<section class="resource-hero wrap"><a class="back-link" href="index.html#library">← Back to library</a><p class="eyebrow">FIELD NOTE / ${resource.category.replaceAll('-', ' ')}</p><h1>${resource.title}<br><em>for ${resource.audienceLabel}.</em></h1><p class="hero-lede">${resource.intro} This resource considers what that looks like in ${resource.placeLabel}, where context, constraints and local knowledge shape every useful answer.</p><div class="resource-meta"><span>GeoLog library</span><span>Reading guide · 6 min</span><span>Updated 2026</span></div></section><section class="article-body wrap"><article><p class="eyebrow">A WORKING FRAMEWORK</p><h2>Start with the situation, not the software.</h2><p>Good location intelligence begins with a shared understanding of the work. Before choosing a dashboard or a data model, name the decisions that need support, the people who make them and the conditions under which information is collected.</p><p>For ${resource.audienceLabel}, that often means connecting records that already exist with observations that only appear in the field. In ${resource.placeLabel}, the most useful system is usually the one that makes uncertainty visible while reducing the effort required to create a trustworthy record.</p><blockquote>“A map is useful when it changes what a team can see, discuss or decide.”</blockquote><h2>Three questions to carry forward</h2><div class="question-list"><div><span>01</span><p>What is the smallest reliable piece of context this decision needs?</p></div><div><span>02</span><p>Who has knowledge of this place that the current record does not include?</p></div><div><span>03</span><p>How will the team know that an insight has led to a better action?</p></div></div></article><aside><div class="aside-card"><span class="resource-type">RELATED TOPIC</span><h3>Keep building the picture.</h3><p>Explore adjacent methods from the GeoLog library.</p><a class="text-link" href="?page=${resources[(resources.indexOf(resource) + 1) % resources.length].slug}">Next resource ↗</a></div><div class="aside-card"><span class="resource-type">ABOUT THIS LIBRARY</span><p>These pages are educational working notes from an early-stage organization. They do not represent customer results, certifications or deployed product functionality.</p></div></aside></section>`;
  window.scrollTo(0, 0);
}

function renderRichResource(resource) {
  document.title = `${resource.title} for ${resource.audienceLabel} | GeoLog`;
  const nextResource = resources[(resources.indexOf(resource) + 1) % resources.length];
  document.querySelector('main').innerHTML = `<section class="resource-hero wrap"><a class="back-link" href="index.html#library">← Back to library</a><p class="eyebrow">FIELD NOTE / ${resource.category.replaceAll('-', ' ')}</p><h1>${resource.title}<br><em>for ${resource.audienceLabel}.</em></h1><p class="hero-lede">${resource.intro} This guide focuses on how to ${resource.categoryGoal} in ${resource.placeLabel}, where context, constraints and local knowledge shape every useful answer.</p><div class="resource-meta"><span>GeoLog library</span><span>Reading guide · 8 min</span><span>Updated 2026</span></div></section><section class="article-body wrap"><article><p class="eyebrow">WHY THIS MATTERS</p><h2>Design around the decision.</h2><p>${resource.audienceContext}</p><p>${resource.placeContext} Those conditions change what a useful record looks like. A good approach starts by making the decision, the responsible person and the acceptable level of uncertainty visible before selecting a tool.</p><h2>The working objective</h2><p>For this topic, the practical objective is to ${resource.categoryGoal}. Begin with ${resource.categorySignals}. Keep the first version small enough that a team can use it during real work, then improve it from observed gaps rather than imagined features.</p><blockquote>“A map is useful when it changes what a team can see, discuss or decide.”</blockquote><h2>What to examine first</h2><div class="question-list"><div><span>01</span><p>Which decision becomes slower or less reliable when location context is missing?</p></div><div><span>02</span><p>What is the smallest reliable record that would improve that decision?</p></div><div><span>03</span><p>Who holds local knowledge that the current system does not represent?</p></div><div><span>04</span><p>What would make a field contributor trust this workflow enough to use it twice?</p></div></div><h2>A first experiment</h2><p>Choose one bounded area, one workflow and one accountable owner. Establish a baseline using the records already available, then run a short field cycle with explicit fields for location, time, source, confidence and next action. Review the results with the people who created the records, not only the people who consume them.</p><div class="question-list"><div><span>TEST</span><p>Measure completion rate, time to find a record, number of unresolved exceptions and whether the next action was clearer.</p></div><div><span>LEARN</span><p>Write down where people improvised, which fields were ambiguous and which information was requested but unavailable.</p></div></div></article><aside><div class="aside-card"><span class="resource-type">FIELD CHECKLIST</span><h3>Make the next step concrete.</h3><p>Define the decision, owner, location, time window, evidence standard and follow-up before expanding the map.</p></div><div class="aside-card"><span class="resource-type">RELATED TOPIC</span><h3>Keep building the picture.</h3><p>Explore an adjacent method from the GeoLog library.</p><a class="text-link" href="?page=${nextResource.slug}">Next resource ↗</a></div><div class="aside-card"><span class="resource-type">ABOUT THIS LIBRARY</span><p>These educational working notes are generated from a structured content model. They do not represent customer results, certifications or deployed product functionality.</p></div></aside></section>`;
  window.scrollTo(0, 0);
}

function renderApplication() {
  document.title = 'Azure startup application | GeoLog Technologies';
  document.querySelector('main').innerHTML = `<section class="resource-hero wrap"><a class="back-link" href="index.html">← Back to GeoLog</a><p class="eyebrow">STARTUP APPLICATION / AZURE</p><h1>Building field intelligence <em>for the real world.</em></h1><p class="hero-lede">GeoLog Technologies is an early-stage geospatial technology initiative based in Port Harcourt, Nigeria. We are developing a practical workspace that helps field-intensive organizations connect location, asset records and operational decisions.</p><div class="resource-meta"><span>Founder: Samsung Fasasi</span><span>Stage: prototype and validation</span><span>Location: Nigeria</span></div></section><section class="article-body wrap application-body"><article><p class="eyebrow">THE OPPORTUNITY</p><h2>Important work is often missing shared context.</h2><p>Infrastructure, energy, logistics and environmental teams work across distributed places. Their information is commonly split between spreadsheets, messages, paper notes and disconnected map files. That makes it harder to know what changed, where attention is needed and whether a decision is based on a complete record.</p><p>GeoLog is starting with the operational layer: a simple way to structure field observations, connect them to assets and locations, and give teams a common view of what is happening.</p><h2>What we are building</h2><div class="application-cards"><div><span>01</span><h3>GeoView</h3><p>A map-based workspace for assets, observations and operational status.</p></div><div><span>02</span><h3>FieldLog</h3><p>Structured, location-aware records for inspections and field activity.</p></div><div><span>03</span><h3>Insight layer</h3><p>Search, summaries and trend views that support careful next actions.</p></div></div><h2>Why Azure</h2><p>Azure gives GeoLog a credible path from prototype to a secure, observable service without requiring a large infrastructure team. The proposed stack is intentionally modest and can scale with validated usage.</p><div class="azure-stack"><div><b>Azure Maps</b><span>Location visualization and geocoding</span></div><div><b>Azure Container Apps</b><span>Deploy the API and web services</span></div><div><b>Azure Database for PostgreSQL</b><span>Store structured operational records</span></div><div><b>Azure Blob Storage</b><span>Hold photos, exports and field attachments</span></div><div><b>Azure Functions</b><span>Run ingestion and scheduled workflows</span></div><div><b>Azure Monitor</b><span>Measure reliability and responsible usage</span></div></div></article><aside><div class="aside-card budget-card"><span class="resource-type">PROPOSED $100,000 CREDIT PLAN</span><h3>Use Azure credits to reach validation.</h3><div class="budget-row"><span>Prototype infrastructure</span><b>$35,000 · 35%</b></div><div class="budget-row"><span>Maps, storage and data</span><b>$25,000 · 25%</b></div><div class="budget-row"><span>Testing and observability</span><b>$20,000 · 20%</b></div><div class="budget-row"><span>AI-assisted search experiments</span><b>$10,000 · 10%</b></div><div class="budget-row"><span>Contingency</span><b>$10,000 · 10%</b></div></div><div class="aside-card"><span class="resource-type">12-MONTH MILESTONES</span><p><b>0–3 months</b><br>Working prototype and user interviews.</p><p><b>4–6 months</b><br>Pilot workflows with selected field teams.</p><p><b>7–12 months</b><br>Measure retention, reliability and willingness to pay.</p></div><div class="aside-card"><span class="resource-type">EVIDENCE TO ADD</span><p>Replace this note with incorporation details, founder profile, product screenshots, customer discovery notes and any verified traction before submitting.</p></div></aside></section>`;
  window.scrollTo(0, 0);
}

if (requestedSlug === 'azure-application') renderApplication();
else if (requestedSlug && bySlug.has(requestedSlug)) renderRichResource(bySlug.get(requestedSlug));
else {
  renderLibrary();
  searchInput?.addEventListener('input', () => { visibleCount = 12; renderLibrary(); });
  loadMore?.addEventListener('click', () => { visibleCount += 12; renderLibrary(); });
}

if (requestedSlug === 'azure-application') {
  const founderMeta = [...document.querySelectorAll('.resource-meta span')].find(item => item.textContent.startsWith('Founder:'));
  if (founderMeta) founderMeta.textContent = 'Founder: Samson Fasasi';
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
