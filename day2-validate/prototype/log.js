// Feedback log for prototype testing
// Logs wrong citations and low confidence events for knowledge base improvement

const feedbackLog = [];

function logFeedback(entry) {
  const record = {
    id: `LOG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    enquiry_id: entry.enquiry_id,
    flag_type: entry.flag_type, // 'wrong_citation' or 'low_confidence'
    cited_passage: entry.cited_passage || null,
    officer_note: entry.officer_note || "",
    draft_text: entry.draft_text || null
  };

  feedbackLog.push(record);
  console.log("Feedback logged for knowledge base review:", record);
  updateLogDisplay();
  return record;
}

function flagWrongCitation(enquiryId, citationSource, draftText, note) {
  return logFeedback({
    enquiry_id: enquiryId,
    flag_type: "wrong_citation",
    cited_passage: citationSource,
    draft_text: draftText,
    officer_note: note
  });
}

function logLowConfidence(enquiryId, note) {
  return logFeedback({
    enquiry_id: enquiryId,
    flag_type: "low_confidence",
    officer_note: note
  });
}

function getLog() {
  return feedbackLog;
}

function updateLogDisplay() {
  const logPanel = document.getElementById('feedback-log');
  if (!logPanel) return;

  if (feedbackLog.length === 0) {
    logPanel.innerHTML = '<p class="empty-log">No flags yet. Flagged items will appear here for knowledge base review.</p>';
    return;
  }

  const html = feedbackLog.map(entry => `
    <div class="log-entry">
      <span class="log-type ${entry.flag_type}">${entry.flag_type === 'wrong_citation' ? 'Wrong citation' : 'Low confidence'}</span>
      <span class="log-enquiry">${entry.enquiry_id}</span>
      ${entry.officer_note ? `<p class="log-note">"${entry.officer_note}"</p>` : ''}
    </div>
  `).join('');

  logPanel.innerHTML = html;
}

// ---- Comfort test (Day 2 riskiest assumption) ----
// Assumption: officers are comfortable with AI-generated draft replies that carry policy citations.
// All ratings in this prototype are made up test inputs, not real officer data.

const PLANNED_OFFICERS = 5;          // test officers (made up: O1..O5)
const MIN_RATINGS_PER_OFFICER = 3;   // an officer counts once they rate this many drafts
const COMFORT_CUTOFF = 4;            // rating 4 or 5 on a 1-5 scale = comfortable
const SUCCESS_OFFICERS = 4;          // success: at least 4 of 5 officers comfortable ...
const SUCCESS_ACCEPT_RATE = 0.6;     // ... and at least 60% of drafts used (sent or edited)
const KILL_OFFICERS = 3;             // kill: fewer than 3 of 5 officers comfortable ...
const KILL_DISCARD_RATE = 0.5;       // ... or more than 50% of drafts discarded

const comfortLog = [];

function logComfort(entry) {
  const record = {
    id: `COMFORT-${Date.now()}`,
    timestamp: new Date().toISOString(),
    officer: entry.officer,           // made-up id such as "O1"
    enquiry_id: entry.enquiry_id,
    action: entry.action,             // 'sent', 'edited' or 'discarded'
    rating: entry.rating,             // 1-5, null if the officer skipped
    seconds_to_decide: entry.seconds_to_decide
  };
  comfortLog.push(record);
  console.log("Comfort test result logged (made up data):", record);
  updateComfortDisplay();
  return record;
}

function getComfortSummary() {
  const rated = comfortLog.filter(r => r.rating !== null);
  const byOfficer = {};
  rated.forEach(r => {
    (byOfficer[r.officer] = byOfficer[r.officer] || []).push(r.rating);
  });

  const counted = Object.entries(byOfficer).filter(([, ratings]) => ratings.length >= MIN_RATINGS_PER_OFFICER);
  const comfortable = counted.filter(([, ratings]) =>
    ratings.reduce((a, b) => a + b, 0) / ratings.length >= COMFORT_CUTOFF
  );

  const total = comfortLog.length;
  const used = comfortLog.filter(r => r.action !== 'discarded').length;
  const discarded = total - used;
  const acceptRate = total ? used / total : 0;
  const discardRate = total ? discarded / total : 0;

  let verdict = 'collecting';
  if (counted.length >= PLANNED_OFFICERS) {
    if (comfortable.length >= SUCCESS_OFFICERS && acceptRate >= SUCCESS_ACCEPT_RATE) {
      verdict = 'success';
    } else if (comfortable.length < KILL_OFFICERS || discardRate > KILL_DISCARD_RATE) {
      verdict = 'kill';
    } else {
      verdict = 'unclear';
    }
  }

  return {
    totalActions: total,
    officersCounted: counted.length,
    officersComfortable: comfortable.length,
    acceptRate, discardRate, verdict
  };
}

function updateComfortDisplay() {
  const el = document.getElementById('comfort-summary');
  if (!el) return;
  const s = getComfortSummary();
  const pct = n => Math.round(n * 100) + '%';
  const verdictText = {
    collecting: `Collecting. Verdict shows once ${PLANNED_OFFICERS} officers have rated ${MIN_RATINGS_PER_OFFICER}+ drafts each.`,
    success: 'SUCCESS SIGNAL MET: keep going.',
    kill: 'KILL SWITCH HIT: stop and rethink (try search-only help, no AI draft).',
    unclear: 'In between: run more officers or enquiries before deciding.'
  }[s.verdict];

  el.innerHTML = `
    <p class="comfort-line">Officers counted: <strong>${s.officersCounted}</strong> of ${PLANNED_OFFICERS}</p>
    <p class="comfort-line">Officers comfortable (average rating ${COMFORT_CUTOFF}+): <strong>${s.officersComfortable}</strong> (success: ${SUCCESS_OFFICERS}+, kill: under ${KILL_OFFICERS})</p>
    <p class="comfort-line">Drafts used (sent or edited): <strong>${pct(s.acceptRate)}</strong> (success: ${pct(SUCCESS_ACCEPT_RATE)}+)</p>
    <p class="comfort-line">Drafts discarded: <strong>${pct(s.discardRate)}</strong> (kill: over ${pct(KILL_DISCARD_RATE)})</p>
    <p class="comfort-verdict verdict-${s.verdict}">${verdictText}</p>
  `;
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { logFeedback, flagWrongCitation, logLowConfidence, getLog, logComfort, getComfortSummary, comfortLog };
}
