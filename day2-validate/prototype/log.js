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

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { logFeedback, flagWrongCitation, logLowConfidence, getLog };
}
