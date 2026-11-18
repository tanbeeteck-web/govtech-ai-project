# Prompt chain

**Scenario:** A · ServiceSG enquiry response
**Prototype today:** It shows 10 made-up ServiceSG enquiries, where officers review hand-written drafts with citations, verify blue-marked fees, deadlines and eligibility before approving, then rate their comfort, and a live panel reports success, fail or kill-switch results.

All data is synthetic and labelled as made up.

## 1. Expand

**Prompt:** Let the officer filter the inbox by policy topic, and show the topic on each enquiry.

**Business rules:**
- Topics come from a fixed made-up list of 6.
- An enquiry can have one topic only.

**Edge cases:**
- An enquiry that matches no topic goes under Other.
- The filter shows a count of 0 without breaking.

**Result:** Ran on 2024-11-18 (made-up data). Not yet checked in a real browser.

*What worked:*
- A dropdown filters the inbox by one of 6 fixed topics. Each option shows its count, and a line says how many enquiries are showing.
- Each enquiry shows its topic. An enquiry with no topic (ENQ-2024-009) goes under Other.
- A filter with 0 enquiries shows a plain message, removes the action buttons and recovers when All is picked.
- 20 checks on a simulated page passed. Existing draft and no-draft screens still render.

*What broke or needs a decision:*
- Picking a topic opens its first enquiry. If that enquiry has no draft, the feedback log gets another entry, so the log fills faster than before.
- No topic is empty in the data, so the 0 case can only be seen by removing an enquiry. It was tested with a temporary empty topic.
- The prototype README still says 10 enquiries and does not mention the filter.

## 2. Behavior

**Prompt:** Handle a failed policy lookup: show a clear message, keep the officer’s draft, and offer a retry.

**Forced failure:** Make the policy lookup return nothing for every enquiry about fees.

**Business rules:**
- Never show a draft that cites no policy page.
- Never lose text the officer typed.

**Edge cases:**
- The lookup fails twice in a row.
- The officer edits the draft while the retry runs.

**Result:** Ran on 2024-11-18 (made-up data). Forced failure triggered. Not yet checked in a real browser.

*Forced failure:* a checkbox under the header makes the policy lookup return nothing for every enquiry about fees. That fails ENQ-2024-001, 003 and 004. The other seven are unaffected.

*What worked:*
- The failed screen says "Policy lookup failed", says why no draft is shown, and says nothing was sent. Retry is offered.
- Rule "never show a draft that cites no policy page": with the failure on, no fee draft showed for any of the 10 enquiries, and a failed screen has no Approve button.
- Rule "never lose text the officer typed": typed text survived switching enquiries, failed retries, and the failure being switched on mid-edit. Only "Discard my edit" removes it.
- Fails twice in a row: shows "Still no result after 2 tries", keeps offering Retry, offers Escalate to senior officer, and logs each attempt.
- Officer edits while the retry runs: the text is kept if the retry fails. If the lookup recovers during the retry, the edit box opens with the officer's text.
- A second press on Retry while one is running does nothing.
- 42 checks on a simulated page passed. Existing screens still render.

*What broke or needs a decision:*
- One check failed first. The cause was a mistake in the test, not in the page.
- After recovery, the edit box shows the officer's typed text and not the cited draft. They press "Discard my edit" to see the cited draft again.
- While the checkbox is on, every retry fails, so recovery needs the checkbox turned off first.
- ENQ-2024-003 is a no-draft enquiry whose text mentions a fee. It also shows the failure message, with no text box.
- The prototype README did not mention failure handling. It is now updated.

## 3. Refine

**Prompt:** Make labels, spacing and button names consistent on the reply screen.

**Business rules:**
- Do not change how drafts are generated or approved.

**Edge cases:**
- Long enquiries still fit on a laptop screen.

**Result:** _fill in after you run it: what worked, what broke._
