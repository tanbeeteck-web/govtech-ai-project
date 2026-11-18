// Saved checks for the prototype. All data is made up.
//
// How to run (macOS, no install needed). From this folder:
//   /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc tests.js
//
// It loads data.js, log.js and app.js into a stand-in page (not a real browser).
// So it checks the logic and the text that is written into the page. It does not check how the page looks.

// ---- Stand-in page ----
const _els = {};
function _el(id) {
  if (!_els[id]) {
    _els[id] = {
      id, innerHTML: '', textContent: '', value: '', checked: false, disabled: false, dataset: {},
      style: {}, classList: { add() {}, remove() {}, toggle() {} },
      addEventListener() {}, querySelectorAll() { return []; }
    };
  }
  return _els[id];
}
var document = {
  getElementById: _el,
  querySelectorAll() { return []; }
};
var console = { log() {} };   // keep the output short
function setTimeout() { return 0; }
function clearTimeout() {}

load('data.js');
load('log.js');
load('app.js');

// ---- Tiny test runner ----
let passed = 0, failed = 0;
function check(name, ok) {
  if (ok) { passed++; } else { failed++; print('FAIL: ' + name); }
}
function eq(name, a, b) { check(name + ' (got ' + JSON.stringify(a) + ', want ' + JSON.stringify(b) + ')', a === b); }

// ---- 1. escapeHtml ----
eq('escape angle brackets', escapeHtml('<b>x</b>'), '&lt;b&gt;x&lt;/b&gt;');
eq('escape quotes and ampersand', escapeHtml('a & "b" \'c\''), 'a &amp; &quot;b&quot; &#39;c&#39;');
eq('escape null', escapeHtml(null), '');

// ---- 2. An officer note cannot inject HTML into the feedback log ----
logFeedback({ enquiry_id: 'ENQ-TEST', flag_type: 'wrong_citation', officer_note: '<img src=x onerror=alert(1)>' });
const logHtml = _el('feedback-log').innerHTML;
check('log note is escaped', logHtml.indexOf('<img') === -1 && logHtml.indexOf('&lt;img') !== -1);
feedbackLog.length = 0;

// ---- 3. Every enquiry renders and nothing is left unescaped ----
syntheticEnquiries.forEach((e, i) => {
  currentEnquiryIndex = i;
  renderEnquiry(i);
  const body = _el('draft-content').innerHTML;
  check(e.id + ' shows something', body.length > 0);
  check(e.id + ' has no raw script tag', body.indexOf('<script') === -1);
  if (e.draft === null) {
    check(e.id + ' no draft means no Approve button', _el('draft-actions').innerHTML.indexOf('btn-approve') === -1);
  } else {
    check(e.id + ' draft has Approve', _el('draft-actions').innerHTML.indexOf('btn-approve') !== -1);
    check(e.id + ' draft has Reject draft', _el('draft-actions').innerHTML.indexOf('Reject draft') !== -1);
    const badge = _el('confidence-badge').textContent;
    const blue = highRiskItems.length > 0;
    check(e.id + ' badge agrees with blue sections', blue ? badge.indexOf('Verification required') === 0 : badge.indexOf('nothing to verify') !== -1);
  }
});

// ---- 4. Data text is escaped when it is written ----
const original = syntheticEnquiries[0].draft.paragraphs[0].text;
syntheticEnquiries[0].draft.paragraphs[0].text = '<script>bad()</script>';
currentEnquiryIndex = 0;
renderEnquiry(0);
check('draft text is escaped', _el('draft-content').innerHTML.indexOf('<script>bad') === -1);
syntheticEnquiries[0].draft.paragraphs[0].text = original;

// ---- 5. Policy lookup failure (forced failure on fee enquiries) ----
const feeIds = syntheticEnquiries.filter(isAboutFees).map(e => e.id);
eq('fee enquiries affected', feeIds.join(','), 'ENQ-2024-001,ENQ-2024-003,ENQ-2024-004');
setForcedFailure(true);
syntheticEnquiries.forEach((e, i) => {
  currentEnquiryIndex = i;
  renderEnquiry(i);
  const failed_ = feeIds.indexOf(e.id) !== -1;
  const shown = _el('draft-content').innerHTML;
  check(e.id + (failed_ ? ' shows lookup failed' : ' unaffected'), failed_ ? shown.indexOf('Policy lookup failed') !== -1 : shown.indexOf('Policy lookup failed') === -1);
  if (failed_) check(e.id + ' failed screen has no Approve', _el('draft-actions').innerHTML.indexOf('btn-approve') === -1);
});
setForcedFailure(false);

// ---- 6. Edit size ----
eq('no change is 0%', editPercent('a b c d', 'a b c d'), 0);
eq('all changed is 100%', editPercent('a b c d', 'w x y z'), 100);
eq('half changed is 50%', editPercent('a b c d', 'a b y z'), 50);
eq('exactly 50% is minor', classifyEdit('a b c d', 'a b y z').action, 'edited_minor');
eq('over 50% is major', classifyEdit('a b c d', 'a x y z').action, 'edited_major');

// ---- 7. Comfort test verdicts ----
function resetComfort() { comfortLog.length = 0; }
function addRatings(officer, action, rating, n) {
  for (let i = 0; i < n; i++) logComfort({ officer, enquiry_id: 'ENQ-TEST', action, rating, seconds_to_decide: 5 });
}
resetComfort();
eq('starts collecting', getComfortSummary().verdict, 'collecting');

resetComfort();
['O1', 'O2', 'O3', 'O4', 'O5'].forEach(o => addRatings(o, 'sent', 5, 3));
eq('all comfortable, all sent is success', getComfortSummary().verdict, 'success');

resetComfort();
['O1', 'O2', 'O3'].forEach(o => addRatings(o, 'discarded', 1, 3));
eq('3 rejecting officers trips kill early', getComfortSummary().verdict, 'kill');

resetComfort();
['O1', 'O2', 'O3', 'O4', 'O5'].forEach(o => { addRatings(o, 'sent', 4, 2); addRatings(o, 'edited_major', 4, 1); });
const s67 = getComfortSummary();
eq('67% used with 5 comfortable is fail', s67.verdict, 'fail');

resetComfort();
// 15 drafts, 11 used (73%), 5 officers comfortable, nobody mostly rejecting: not success, not kill, not fail
['O1', 'O2', 'O3', 'O4'].forEach(o => { addRatings(o, 'sent', 4, 2); addRatings(o, 'edited_major', 4, 1); });
addRatings('O5', 'sent', 4, 3);
const sMid = getComfortSummary();
eq('73% used is in between', sMid.verdict, 'unclear');

resetComfort();
['O1', 'O2', 'O3', 'O4', 'O5'].forEach(o => addRatings(o, 'sent', 1, 3));
eq('fewer than 3 comfortable is kill', getComfortSummary().verdict, 'kill');

// ---- Result ----
print(passed + ' passed, ' + failed + ' failed');
if (failed > 0) throw new Error('Some checks failed');
