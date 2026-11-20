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
eq('fee enquiries affected', feeIds.join(','), 'ENQ-2024-001,ENQ-2024-003,ENQ-2024-004,ENQ-2024-011');
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

// ---- 5b. Abusive enquiry: a draft with an amber flag and a recommended paragraph (decided 2026-11-20) ----
Object.keys(lookupState).forEach(k => delete lookupState[k]);   // the forced failure above left these enquiries failed
const abIdx = syntheticEnquiries.findIndex(e => e.id === 'ENQ-2024-011');
const abEnq = syntheticEnquiries[abIdx];
currentEnquiryIndex = abIdx;
renderEnquiry(abIdx);
const abHtml = _el('draft-content').innerHTML;
check('abusive enquiry still gets a draft with Approve', _el('draft-actions').innerHTML.indexOf('btn-approve') !== -1);
check('abusive flag is shown with words', abHtml.indexOf('Abusive enquiry') !== -1 && abHtml.indexOf('abusive-flag') !== -1);
check('recommended paragraph is shown', abHtml.indexOf(respectfulServiceParagraph) !== -1);
check('recommended paragraph is not part of the draft', draftToText(abEnq.draft).indexOf(respectfulServiceParagraph) === -1);
check('abusive flag is not blue and the fee stays blue', _el('confidence-badge').textContent.indexOf('Verification required') === 0 && abHtml.indexOf('abusive-flag') < abHtml.indexOf('FEE - Verify before accepting'));
check('draft does not repeat the insult', draftToText(abEnq.draft).toLowerCase().indexOf('idiot') === -1 && draftToText(abEnq.draft).toLowerCase().indexOf('stupid') === -1);
check('abusive flag is in the log', getLog().some(r => r.enquiry_id === 'ENQ-2024-011' && r.flag_type === 'abusive'));
check('log does not hold the words used', getLog().every(r => (r.officer_note || '').toLowerCase().indexOf('idiot') === -1 && (r.officer_note || '').toLowerCase().indexOf('stupid') === -1));
const abLogCount = getLog().filter(r => r.flag_type === 'abusive').length;
renderEnquiry(abIdx);
eq('abusive flag is logged once per enquiry', getLog().filter(r => r.flag_type === 'abusive').length, abLogCount);
addRespectfulParagraph(abEnq);
check('adding the paragraph puts it in the edit box before the closing', _el('edit-box').value.indexOf(respectfulServiceParagraph) !== -1 && _el('edit-box').value.indexOf(respectfulServiceParagraph) < _el('edit-box').value.indexOf(abEnq.draft.closing));
delete officerText['ENQ-2024-011'];
check('other enquiries have no abusive flag', syntheticEnquiries.filter(e => e.id !== 'ENQ-2024-011').every(e => !e.abusive));

// ---- 5c. Hand-offs: opinion on a policy or a minister, a threat against staff, and the 3-hour limit ----
['ENQ-2024-008', 'ENQ-2024-012', 'ENQ-2024-013', 'ENQ-2024-014'].forEach(id => {
  const i = syntheticEnquiries.findIndex(e => e.id === id);
  currentEnquiryIndex = i;
  renderEnquiry(i);
  const h = _el('draft-content').innerHTML;
  check(id + ' is a hand-off with no draft', syntheticEnquiries[i].draft === null && syntheticEnquiries[i].noDraft.type === 'handoff');
  check(id + ' has no Approve', _el('draft-actions').innerHTML.indexOf('btn-approve') === -1);
  check(id + ' says the human lead has 3 hours', h.indexOf('within 3 hours') !== -1);
  check(id + ' names its trigger', h.indexOf('Trigger:') !== -1);
  check(id + ' shows no policy pages', h.indexOf('policy-card') === -1);
});
check('opinion hand-off gives no opinion on the fee', syntheticEnquiries.find(e => e.id === 'ENQ-2024-012').noDraft.reason.indexOf('no opinion') !== -1);
check('hand-off screen lists the new triggers', NO_DRAFT_INFO.handoff.text.indexOf('threats against staff') !== -1 && NO_DRAFT_INFO.handoff.text.indexOf('opinion') !== -1);

// ---- 5d. Every no-draft result is a hand-off, seen by four roles (decided 2026-11-20) ----
syntheticEnquiries.filter(e => e.draft === null).forEach(e => {
  const i = syntheticEnquiries.indexOf(e);
  currentEnquiryIndex = i;
  renderEnquiry(i);
  const h = _el('draft-content').innerHTML;
  check(e.id + ' no-draft says it is handed off to the human lead', h.indexOf('Handed off to the human lead') !== -1);
  check(e.id + ' no-draft says who can see it', h.indexOf('supervisors, the project owner and the business owner') !== -1);
  check(e.id + ' no-draft has no escalate to senior officer', h.indexOf('senior officer') === -1 && _el('draft-actions').innerHTML.indexOf('senior officer') === -1);
});
const o14 = syntheticEnquiries.find(e => e.id === 'ENQ-2024-014');
check('request for another resident\'s information is refused with no draft', o14.draft === null && o14.noDraft.reason.indexOf('cannot share anything about other residents') !== -1);
check('refusal does not say whether anyone else wrote in', o14.noDraft.reason.toLowerCase().indexOf('no one else') === -1 && o14.noDraft.reason.toLowerCase().indexOf('nobody else') === -1);
check('hand-off screen lists the other-resident trigger', NO_DRAFT_INFO.handoff.text.indexOf("another resident's information") !== -1);

// ---- 5e. A lookup that fails twice is handed off, not escalated (decided 2026-11-20) ----
setForcedFailure(true);
const lfIdx = syntheticEnquiries.findIndex(e => e.id === 'ENQ-2024-001');
Object.keys(lookupState).forEach(k => delete lookupState[k]);
currentEnquiryIndex = lfIdx;
renderEnquiry(lfIdx);
renderLookupFailed(syntheticEnquiries[lfIdx], { status: 'failed', attempts: 2 });
check('second failed lookup says it is handed off', _el('draft-content').innerHTML.indexOf('handed off to the human lead') !== -1);
check('second failed lookup has no escalate button', _el('draft-actions').innerHTML.indexOf('senior officer') === -1 && _el('draft-content').innerHTML.indexOf('senior officer') === -1);
setForcedFailure(false);
Object.keys(lookupState).forEach(k => delete lookupState[k]);

// ---- 5f. Enquiries in other languages (decided 2026-11-19 and 2026-11-20) ----
function show(id) { const i = syntheticEnquiries.findIndex(e => e.id === id); currentEnquiryIndex = i; renderEnquiry(i); return syntheticEnquiries[i]; }
// Chinese: readable, English draft, labelled reference translation (EV-06)
const zh = show('ENQ-2024-015');
const zhHtml = _el('draft-content').innerHTML;
check('Chinese enquiry is read, not stopped as unreadable', zh.draft !== null && _el('draft-actions').innerHTML.indexOf('btn-approve') !== -1);
check('Chinese enquiry shows the language and an English digest', zhHtml.indexOf('Language: Chinese') !== -1 && zhHtml.indexOf('English digest') !== -1);
check('draft is in English only', zh.draft.paragraphs.every(p => !/[\u4e00-\u9fff]/.test(p.text)) && !/[\u4e00-\u9fff]/.test(draftToText(zh.draft)));
check('English draft keeps the 3 months figure and cites ICA Passport Services', draftToText(zh.draft).indexOf('3 months') !== -1 && zh.draft.paragraphs.some(p => p.citation && p.citation.source.indexOf('ICA Passport Services') === 0));
check('translation carries the unofficial machine translation label in English and Chinese', zhHtml.indexOf('Unofficial machine translation. The English version is the official reply and prevails if there is any difference.') !== -1 && zhHtml.indexOf('非官方机器翻译') !== -1);
check('label does not say the translation was checked', zhHtml.toLowerCase().indexOf('verified') === -1 && zhHtml.toLowerCase().indexOf('checked by') === -1);
check('translation keeps the figure 3', translationStatus(draftToText(zh.draft), zh.translation).ok);
check('Chinese text is not part of the English edit text or edit size', draftToText(zh.draft).indexOf(zh.translation.text) === -1 && classifyEdit(draftToText(zh.draft), draftToText(zh.draft) + ' We look forward to serving you.').action === 'edited_minor');
check('language is logged by name and the resident text is not', getLog().some(r => r.enquiry_id === 'ENQ-2024-015' && r.flag_type === 'language' && r.officer_note.indexOf('Chinese') === 0) && getLog().every(r => (r.officer_note || '').indexOf('更新护照') === -1 && (r.officer_note || '').indexOf('护照') === -1));
const zhLogCount = getLog().filter(r => r.flag_type === 'language').length;
show('ENQ-2024-015');
eq('language is logged once per enquiry', getLog().filter(r => r.flag_type === 'language').length, zhLogCount);
// Officer edits the English: the translation is made again, and withheld if a figure no longer matches (EV-14)
check('edited English with the same figure keeps the translation', translationStatus(draftToText(zh.draft) + ' We look forward to serving you.', zh.translation).ok);
check('edited English with a changed figure withholds the translation', !translationStatus(draftToText(zh.draft).replace('3 months', '6 months'), zh.translation).ok);
enterEditMode(zh);
check('edit screen says the officer edits the English only', _el('draft-content').innerHTML.indexOf('You edit the English only') !== -1);
delete officerText['ENQ-2024-015'];
// Malay: a figure in the translation differs, so no translation is shown (EV-15)
const ms = show('ENQ-2024-017');
const msHtml = _el('draft-content').innerHTML;
check('Malay draft is in English and still has Approve', ms.draft !== null && _el('draft-actions').innerHTML.indexOf('btn-approve') !== -1);
check('translation with a different figure is withheld', msHtml.indexOf('No translation shown') !== -1 && msHtml.indexOf('translation-withheld') !== -1 && msHtml.indexOf('Terjemahan') === -1);
check('withheld translation says why and that the English stands', msHtml.indexOf('differs from the English') !== -1 && msHtml.indexOf('The English draft stands') !== -1);
// Tamil: a complaint with a legal threat is a hand-off, with an English digest and no translation (EV-10)
const ta = show('ENQ-2024-016');
const taHtml = _el('draft-content').innerHTML;
check('Tamil complaint is a hand-off with no draft and no translation', ta.draft === null && ta.noDraft.type === 'handoff' && taHtml.indexOf('translation-box') === -1);
check('Tamil hand-off shows the language and the English digest', taHtml.indexOf('Language: Tamil') !== -1 && taHtml.indexOf('complains about the service') !== -1);
check('Tamil hand-off names its trigger and the 3 hours', taHtml.indexOf('a complaint and legal action') !== -1 && taHtml.indexOf('within 3 hours') !== -1);
check('Tamil text is not in the log', getLog().every(r => (r.officer_note || '').indexOf('புகார்') === -1));
check('English enquiries have no language box', syntheticEnquiries.filter(e => !e.language).every(e => { show(e.id); return _el('draft-content').innerHTML.indexOf('language-box') === -1; }));

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

// ---- Direct language (decided 2026-11-20) ----
const enq2 = syntheticEnquiries.find(e => e.id === 'ENQ-2024-002');
const elig = enq2.draft.paragraphs.find(p => p.highRisk === 'eligibility');
check('ENQ-002 says directly that the father qualifies', elig.text.includes('so he qualifies for senior concession fares'));
check('ENQ-002 eligibility sentence is cited and blue (high risk)', !!elig.citation && elig.citation.source.startsWith('PTC Concession Policy'));
check('ENQ-002 keeps the passage wording', elig.text.includes('aged 60 years and above qualify for senior concession fares on public buses and trains'));
check('no draft promises an outcome', syntheticEnquiries.every(e => !e.draft || e.draft.paragraphs.every(p => !/will be (approved|granted|accepted)|will receive/i.test(p.text))));

// ---- Result ----
print(passed + ' passed, ' + failed + ' failed');
if (failed > 0) throw new Error('Some checks failed');
