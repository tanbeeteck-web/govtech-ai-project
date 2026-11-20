// Feedback log for prototype testing
// Logs wrong citations and low confidence events for knowledge base improvement

// Makes text safe to put inside the page. Use it on any text that came from data or from a person.
function escapeHtml(text) {
  return String(text === null || text === undefined ? '' : text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const feedbackLog = [];

function logFeedback(entry) {
  const record = {
    id: `LOG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    enquiry_id: entry.enquiry_id,
    flag_type: entry.flag_type, // 'wrong_citation', 'low_confidence', 'needs_clarification', 'handoff', 'attachment' or 'lookup_failed'
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

// Logs any no-draft case. type: low_confidence, needs_clarification, handoff or attachment
function logNoDraft(enquiryId, type, note) {
  return logFeedback({
    enquiry_id: enquiryId,
    flag_type: type,
    officer_note: note
  });
}

// An abusive enquiry with a valid question was drafted and flagged. The words used are never logged.
function logAbusive(enquiryId) {
  return logFeedback({
    enquiry_id: enquiryId,
    flag_type: "abusive",
    officer_note: "Flagged as an abusive enquiry. Draft delivered. The words used are not logged."
  });
}

// The policy lookup returned nothing, so no draft was shown
function logLookupFailed(enquiryId, attempt) {
  return logFeedback({
    enquiry_id: enquiryId,
    flag_type: "lookup_failed",
    officer_note: `Policy lookup returned nothing (attempt ${attempt}). No draft shown.`
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
      <span class="log-type ${entry.flag_type}">${{ wrong_citation: 'Wrong citation', low_confidence: 'Low confidence', needs_clarification: 'Needs clarification', handoff: 'Hand-off', attachment: 'Attachment', lookup_failed: 'Lookup failed', abusive: 'Abusive enquiry' }[entry.flag_type] || escapeHtml(entry.flag_type)}</span>
      <span class="log-enquiry">${escapeHtml(entry.enquiry_id)}</span>
      ${entry.officer_note ? `<p class="log-note">"${escapeHtml(entry.officer_note)}"</p>` : ''}
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
const FAIL_ACCEPT_RATE = 0.7;        // fail: fewer than 70% (7 in 10) of drafts used, once all 5 officers are counted
const SUCCESS_ACCEPT_RATE = 0.8;     // ... and at least 80% (8 in 10) of drafts used (sent or minor edit)
const KILL_OFFICERS = 3;             // kill: fewer than 3 of 5 officers comfortable ...
const KILL_DISCARD_RATE = 0.5;       // ... or more than 50% of drafts discarded
const KILL_REJECTING_OFFICERS = 3;   // kill: 3 of 5 officers mostly rejected or majorly edited their drafts
const REJECTING_SHARE = 0.5;         // "mostly" = more than half of that officer's drafts

const MAJOR_EDIT_SHARE = 50;         // an edit is "major" when MORE than 50% of the draft text was changed

const comfortLog = [];

// How much of the draft was edited? Counts words changed, added or removed
// (word-level edit distance) as a percent of the words in the original draft.
function editPercent(original, edited) {
  const a = original.trim().split(/\s+/).filter(Boolean);
  const b = edited.trim().split(/\s+/).filter(Boolean);
  if (a.length === 0) return b.length ? 100 : 0;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return Math.min(100, Math.round((prev[b.length] / a.length) * 100));
}

function classifyEdit(original, edited) {
  const pct = editPercent(original, edited);
  return { pct, action: pct > MAJOR_EDIT_SHARE ? 'edited_major' : 'edited_minor' };
}

function logComfort(entry) {
  const record = {
    id: `COMFORT-${Date.now()}`,
    timestamp: new Date().toISOString(),
    officer: entry.officer,           // made-up id such as "O1"
    enquiry_id: entry.enquiry_id,
    action: entry.action,             // 'sent', 'edited_minor', 'edited_major' or 'discarded' (rejected)
    rating: entry.rating,             // 1-5, null if the officer skipped
    seconds_to_decide: entry.seconds_to_decide,
    edit_percent: entry.edit_percent === undefined ? null : entry.edit_percent   // only set for edits
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
  const isRejectOrMajor = r => r.action === 'discarded' || r.action === 'edited_major';
  const used = comfortLog.filter(r => !isRejectOrMajor(r)).length;   // sent or minor edit
  const discarded = comfortLog.filter(r => r.action === 'discarded').length;

  // Officers who rejected or majorly edited more than half of their drafts
  const actionsByOfficer = {};
  comfortLog.forEach(r => { (actionsByOfficer[r.officer] = actionsByOfficer[r.officer] || []).push(r); });
  const rejectingOfficers = Object.values(actionsByOfficer).filter(list =>
    list.length >= MIN_RATINGS_PER_OFFICER &&
    list.filter(isRejectOrMajor).length / list.length > REJECTING_SHARE
  ).length;
  const acceptRate = total ? used / total : 0;
  const discardRate = total ? discarded / total : 0;

  let verdict = 'collecting';
  if (rejectingOfficers >= KILL_REJECTING_OFFICERS) {
    verdict = 'kill';   // can trip early, as soon as 3 officers are rejecting
  } else if (counted.length >= PLANNED_OFFICERS) {
    if (comfortable.length >= SUCCESS_OFFICERS && acceptRate >= SUCCESS_ACCEPT_RATE) {
      verdict = 'success';
    } else if (comfortable.length < KILL_OFFICERS || discardRate > KILL_DISCARD_RATE) {
      verdict = 'kill';
    } else if (acceptRate < FAIL_ACCEPT_RATE) {
      verdict = 'fail';   // below the pilot fail line: fewer than 7 in 10 drafts used
    } else {
      verdict = 'unclear';
    }
  }

  return {
    totalActions: total,
    officersCounted: counted.length,
    officersComfortable: comfortable.length,
    rejectingOfficers, acceptRate, discardRate, verdict
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
    fail: `FAIL: fewer than ${pct(FAIL_ACCEPT_RATE)} of drafts were used. Below the fail line. Do not continue as is.`,
    unclear: 'In between: run more officers or enquiries before deciding.'
  }[s.verdict];

  el.innerHTML = `
    <p class="comfort-line">Officers counted: <strong>${s.officersCounted}</strong> of ${PLANNED_OFFICERS}</p>
    <p class="comfort-line">Officers comfortable (average rating ${COMFORT_CUTOFF}+): <strong>${s.officersComfortable}</strong> (success: ${SUCCESS_OFFICERS}+, kill: under ${KILL_OFFICERS})</p>
    <p class="comfort-line">Drafts used (sent or minor edit): <strong>${pct(s.acceptRate)}</strong> (success: ${pct(SUCCESS_ACCEPT_RATE)}+, fail: under ${pct(FAIL_ACCEPT_RATE)})</p>
    <p class="comfort-line">Officers who rejected or majorly edited most drafts: <strong>${s.rejectingOfficers}</strong> of ${PLANNED_OFFICERS} (kill: ${KILL_REJECTING_OFFICERS}+)</p>
    <p class="comfort-line">Drafts rejected: <strong>${pct(s.discardRate)}</strong> (kill: over ${pct(KILL_DISCARD_RATE)})</p>
    <p class="comfort-verdict verdict-${s.verdict}">${verdictText}</p>
  `;
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { escapeHtml, editPercent, classifyEdit, logFeedback, flagWrongCitation, logLowConfidence, logNoDraft, logLookupFailed, getLog, logComfort, getComfortSummary, comfortLog };
}
