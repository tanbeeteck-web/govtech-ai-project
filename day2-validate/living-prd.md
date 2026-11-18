# Living PRD

**Scenario:** A · ServiceSG enquiry response

All data is synthetic and labelled as made up.

## Prototype notes

These notes come from what was built, tested and read. "Solid" means tested on a simulated page. The page has not been seen in a real browser.

### [solid]

- **The decision rules are written down once.** `log.js` has the officer counts, the 70% fail line, the 80% success line and the major-edit cutoff as named constants at the top. The verdict was tested at 90%, 80%, 70% and 60%. The kill switch also trips early with only 3 officers.
- **The colours mean one thing each.** `context-skill.md` records them, and the code now matches. Blue means verify, green means nothing to verify, and red means stop or no draft. A draft with a blue section can't show a green badge.
- **Failure paths are handled.** A failed lookup, an empty filter, a double press on Retry, and a failure that starts while someone is typing all keep the officer's text. About 100 checks passed across the filter, the failure handling and the refine step.
- **Nothing can be sent.** There is no send action anywhere in the code, which matches rule 11 in `context-skill.md`.
- **Setup is nothing.** There are no dependencies, no build step and no accounts. You open the file and it runs.

### [fragile]

- **There is no AI behind it.** The drafts, confidence figures, topics and the lookup are all hand-set in `data.js`. The failure is a checkbox. The rules in `context-skill.md` are not enforced by anything.
- **The ratings are typed in by the tester.** The verdicts read like results but they only prove the logic works. A reload also wipes the ratings, the log and any typed text.
- **No tests are saved in the repo.** The checks ran in a throwaway simulated page. The page script is inside `index.html`, so it is hard to test.
- **Shared state is easy to break.** There are 11 shared variables (9 in the page, 2 logs) and 14 lines in the page that write HTML as text, and the action buttons are written out twice. Retry and the edit box had to be wired together by hand during Behavior.
- **Officer notes go into the page as raw HTML.** `log.js` line 76 does this. It is harmless today, but it is a security problem once notes come from other people.
- **Layout is unconfirmed.** Whether the buttons fit a laptop comes from a width estimate. Chrome hung here, so no real screenshot exists.

### [surprise]

- **The Day 1 files disagreed and it was only found late.** Three files gave three success targets (8 in 10, 6 in 10 and 60%). The SLA figure said both "90% already meet it" and "we miss 90%". Both are now settled, but only because this came up while writing the one-pager.
- **The first confidence badge was misleading.** It showed green "High confidence" on drafts that had fee claims needing verification. That came straight from a hard-coded colour.
- **Exactly 70% is neither pass nor fail.** Fail is "below 70%" and success is "80% or more", so 70% to 79% reads "in between". If the kill switch and the fail line both apply, the kill switch wins.
- **A fee enquiry with no draft also fails.** ENQ-2024-003 mentions a fee, so the forced failure catches it too. It shows the failure message with no text box.
- **A filter adds log entries.** Picking a topic opens its first enquiry, and if that has no draft it writes another feedback log entry. The log fills faster than a reader would expect.
- **Everything is dated 2024.** The enquiries and policy dates in `data.js` are all in 2024, and the pilot's date in `opportunity.md` is "20 Nov". Today is November 2026, so the dates look stale.
- **Two Day 1 files were edited while working on Day 2,** to align the numbers. That goes against the "work in the current day folder" rule, though the change was approved.

---

## The Living PRD

Extracted from the code in `day2-validate/prototype/` on `main` (commit `25bfb1c`, 2026-11-18). Where this file and the code disagree, the code is right. Update this file when a constant, a screen or a rule in the code changes.

| # | Building block | Status |
|---|---|---|
| 1 | Product overview | Present |
| 2 | Problem and riskiest assumption | Present |
| 3 | User flow and screen map | Partial |
| 4 | Success metrics | Partial |
| 5 | Technical reality | Present |
| 6 | Assumptions and risks | Present |
| 7 | In and out of scope | Present |
| 8 | Engineering recommendation | Partial |

Present means the block is written from the code and checked against it. Partial means it is written but has a stated gap. None is missing.

### 1. Product overview

**Status: Present.** What it is, what it is not, who it is for and its size are all stated and match the code.

**What it is:** The ServiceSG Enquiry Draft Assistant, a clickable mock-up for Scenario A. An officer opens a resident enquiry and sees a drafted first reply with a policy citation under each claim. They approve, edit or reject it. The page then asks for a comfort rating from 1 to 5 and shows whether the test is passing.

**What it is not:** There is no AI, no server and no real policy search. Every draft, citation, confidence figure and topic is hand-written in `data.js`. Nothing is sent anywhere. Everything is made up, and the page says so.

**Who it is for:** ServiceSG officers who work the shared enquiry inbox. In the test, one tester plays up to five officers (O1 to O5) from a dropdown.

**What it is for:** Testing one assumption (block 2) before anything real is built.

**Size:** About 2,000 lines of plain HTML, CSS and JavaScript. No dependencies. Double-click `index.html` to run it.

### 2. Problem and riskiest assumption

**Status: Present.** The problem figures come from the Day 1 files, not the code, and are made up. The assumption and how the code tests it are stated.

**Problem** (from `day1-discover-define/opportunity.md`, all figures made up):
- Officers search policy pages before they can reply. A search takes 12 minutes.
- The average first reply takes 2 days. 70% of enquiries meet the one-working-day target, against a 90% target.
- 1 in 5 enquiries has an image that current tools cannot read.
- Two officers often give different answers to the same question.
- A wrong answer costs more than a slow one.

**Strategy** (from `one-pager.md`): Give a good first draft with citations, so officers accept it with only a light edit. The officer always sends. Every reply traces to a policy page.

**Riskiest assumption:** Officers are comfortable with draft replies with policy citations generated by AI.

**Risk type:** Desirability. If it is wrong, officers ignore the drafts or rubber-stamp them, and the first-draft bet fails.

**How the code tests it:** After each send, edit or reject, the officer rates comfort from 1 to 5. The Comfort test panel turns the ratings into a verdict (block 4). This tests comfort with a mock-up. It cannot test whether a real model's drafts deserve that comfort.

### 3. User flow and screen map

**Status: Partial.** Every flow and screen is mapped from the code. Nobody has opened the page in a real browser, so there are no screenshots and the layout is unconfirmed.

**Flow:**
1. The officer picks a test officer (O1 to O5) and, if they want, a policy topic.
2. They open one of the 10 enquiries from the tabs.
3. The right-hand panel shows one of: a draft, a no-draft screen, a lookup-failed screen, or an empty-filter message.
4. On a draft they can:
   - **Approve.** If any section is blue, a "Verify before accepting" pop-up appears and every item must be ticked first. Then the rating pop-up opens.
   - **Edit.** A text box opens. On save, the tool measures how much changed, then the rating pop-up opens.
   - **Reject draft.** The rating pop-up opens.
   - **Restore original** or **Flag a citation.** Flag logs a wrong citation and nothing else.
5. They rate comfort from 1 to 5. The result is logged and the Comfort test panel updates.

**Screen map:**

| Screen | Shown when | Actions | Code |
|---|---|---|---|
| Draft | The enquiry has a draft and the lookup worked | Approve, Edit, Restore original, Flag a citation, Reject draft | `renderDraft` |
| Edit | The officer presses Edit | Save edit, Discard my edit | `enterEditMode` |
| No draft: low confidence | Two or more topics, below 90% | Start from scratch, Escalate to senior officer (both are toasts only) | `renderNoDraft` |
| No draft: needs clarification | No source covers the question | Same | `renderNoDraft` |
| No draft: hand-off | Complaint with legal risk | Open case file, Hand off to human lead (toasts only) | `renderNoDraft` |
| No draft: attachment | The image cannot be read | Same as low confidence | `renderNoDraft` |
| Lookup failed | The test checkbox is on and the enquiry is about fees | Retry lookup. Escalate after 2 failures | `renderLookupFailed` |
| Empty filter | A topic has 0 enquiries | None | `renderEmpty` |
| Verify pop-up | Approve on a draft with blue sections | Tick every item, then approve | `openConfirmModal` |
| Flag pop-up | Flag pressed | Add a note, submit | `openFlagModal` |
| Rating pop-up | After send, edit or reject | Rate 1 to 5 | `openRatingModal` |
| Comfort test panel | Always | Read only | `updateComfortDisplay` |
| Feedback log panel | Always | Read only | `updateLogDisplay` |

**Always on screen:** the officer picker, the grey "All data is made up" badge, the topic filter, the test checkbox, the 10 enquiry tabs and the enquiry text with its topic and any attachment note.

**Colours** (full table in `context-skill.md`): blue means the officer must verify, green means nothing to verify, red means stop or no draft, amber means look at this, grey is neutral.

### 4. Success metrics

**Status: Partial.** The success, fail and kill thresholds are all in the code. Four measures that earlier documents require are not built (30-second signal, auto-disable, weekly audit, consistency check). The Day 1 baselines (12-minute search, 70% on time) are not measured by the page.

All values are named constants at the top of the comfort test in `log.js`.

| Setting | Value | Constant |
|---|---|---|
| Test officers | 5 | `PLANNED_OFFICERS` |
| Drafts an officer must rate to count | 3 | `MIN_RATINGS_PER_OFFICER` |
| An officer is comfortable | Average rating of 4 or more | `COMFORT_CUTOFF` |
| Success: officers comfortable | At least 4 of 5 | `SUCCESS_OFFICERS` |
| Success: drafts used | At least 80% | `SUCCESS_ACCEPT_RATE` |
| Fail: drafts used | Below 70% | `FAIL_ACCEPT_RATE` |
| Kill: officers comfortable | Fewer than 3 | `KILL_OFFICERS` |
| Kill: drafts rejected | More than 50% | `KILL_DISCARD_RATE` |
| Kill: rejecting officers | 3 of 5 reject or majorly edit more than half of their drafts | `KILL_REJECTING_OFFICERS`, `REJECTING_SHARE` |
| Major edit | More than 50% of the draft's words changed | `MAJOR_EDIT_SHARE` |

**"Used"** means sent or given a minor edit. A major edit or a reject is not used. The kill rule on rejected drafts counts rejects only.

**Edit size** is measured, not chosen. It is the words changed, added or removed, divided by the words in the original draft.

**Verdict order:**
1. Kill switch, if 3 officers are rejecting. This can trip before all 5 officers finish.
2. Once 5 officers are counted: success, else kill (fewer than 3 comfortable, or more than 50% rejected), else fail (below 70% used), else in between (anything left: success was not met, no kill or fail was hit, and at least 70% of drafts were used).
3. Before that: "Collecting".

**Recorded for every action:** officer, enquiry, action (sent, minor edit, major edit, rejected), rating, seconds to decide, edit percent.

**Required by earlier documents but not measured by the code:**

| Requirement | Source | State in the code |
|---|---|---|
| Officers get stuck within 30 seconds | `opportunity.md` kill-switch signal | Seconds to decide is recorded and never read |
| More than 2 wrong citations reach residents in a week: auto-disable | Chief Executive Sponsor, `build-log.md` | Not built. A flag is logged with no count and no limit |
| Weekly audit of 5% of sent replies | Chief Executive Sponsor | Not built |
| Same wording for 10 similar enquiries, less variance than officers | Head of Product | Not built |
| At least 30% of test enquiries are edge cases | Director of Frontline Operations | Data has 5 of 10 with no draft, by hand. Not measured |

### 5. Technical reality

**Status: Present.** What is real and what is faked is listed, with the code shape and data shape. Browser behaviour is the one unknown, and it is stated.

**What is real and what is faked:**

| Part | State |
|---|---|
| Drafts | Hand-written in `data.js`: 5 drafts, 11 citations, 4 claims marked for verification (2 fee, 1 eligibility, 1 deadline) |
| Confidence | A hand-set percentage on 7 enquiries. The 90% rule is not in the code. It holds because every draft is set at 93% or more and every no-draft case is below 90% or has none |
| Topic | Hand-set per enquiry. ENQ-2024-009 has none and shows under Other |
| Policy lookup | Fake. It fails only when the test checkbox is on and the enquiry is about fees (ENQ-2024-001, 003, 004). Retry always fails while the checkbox is on |
| Policy sources | A list of 15 pages with last-updated dates, shown on each citation. Not checked for staleness |
| Edit-size measure | Real |
| Verdict logic | Real, tested only with made-up ratings |
| Sending | None. There is no send action anywhere |
| Storage | None. The logs and state live in page variables, so a reload clears everything |
| Network | None. `server.py` is optional and not needed |
| Tests | None saved in the repo |

**Code shape:**
- `index.html`: 717 lines, with one inline script of 30 functions and 9 shared state variables.
- `log.js`: 217 lines. It holds both the feedback log and the comfort test (12 functions, 2 logs).
- `data.js`: 364 lines of content.
- `style.css`: 652 lines.
- 17 lines write HTML as text (14 in `index.html`, 3 in `log.js`). Nothing escapes the text first.
- The draft action buttons are written out in two places.

**Draft data shape** (`data.js`). This is the contract a real model would have to meet:
- `id`, `topic`, `timestamp`, `confidence`, `confidencePct`
- `enquiry`: `from`, `subject`, `body`. An optional `attachment` with `readable`.
- `draft`: `greeting`, `paragraphs`, `closing`, `signature`. Each paragraph has `text`, a `citation` (`source`, `passage`, `url`) or null, and an optional `highRisk` of fee, eligibility or deadline.
- Or `draft: null` with a `noDraft` of `type` (low confidence, needs clarification, hand-off or attachment) and `reason`, plus `suggestedPolicies`.

### 6. Assumptions and risks

**Status: Present.** 12 assumptions and risks, each with what the code shows and how to test or fix it.

| # | Assumption or risk | Type | What the code shows | How to test or fix |
|---|---|---|---|---|
| 1 | Officers are comfortable with AI drafts with citations (riskiest) | Desirability | Tested only with hand-written drafts and typed ratings | Run the comfort test with 5 real officers |
| 2 | A real model can follow the `context-skill.md` rules (exact passage for fees, no promised outcomes, no draft below 90%) | Feasibility | Nothing enforces them. The six test questions cannot run against this page | Add rule checks in code and run the six questions on a model |
| 3 | The verify step will not become a rubber stamp | Behaviour | Ticking a box is a click. It does not prove the officer checked. Seconds to decide are recorded and unused | Read time-to-decide. Add the weekly audit |
| 4 | Officers read blue as "verify", not "low confidence" | Usability | Never tested with an officer | Ask real officers what blue means |
| 5 | Drafts will be consistent for the same question | Value | Not built or measured | The Head of Product's 10-enquiry comparison |
| 6 | Hard cases are routed to "no draft" correctly | Feasibility | Routing is hand-set data, not logic | Test with at least 30% edge-case enquiries |
| 7 | Policy pages stay current | Operational | The date is shown and never checked | A staleness rule owned by the knowledge base lead |
| 8 | Image enquiries (1 in 5) can be handled | Feasibility | One placeholder case. The attachment is always unreadable | Decide whether to read images |
| 9 | One tester can stand in for five officers | Validity | Nothing stops one person picking all five | Use real officers. Log the person, not a dropdown |
| 10 | The thresholds are right | Validity | Chosen by the learner. Five officers is a small sample | Review after a real pilot |
| 11 | Officer notes are safe to display | Security | Notes go into the page as raw HTML (`log.js`) | Escape all text |
| 12 | The dates are current | Data | Enquiries and policy dates are all in 2024 | Refresh the made-up dates |

### 7. In and out of scope

**Status: Present.** Built, look-built-but-not, and not built are separated.

**In scope (built and in the code):**
- 10 made-up enquiries: 5 with a draft and 5 without (2 low confidence, 1 hand-off, 1 unreadable attachment, 1 needs clarification).
- Citations on every claim, with source, passage and last-updated date.
- The blue verify step with a tick for each item before approving.
- Edit with automatic edit size, Reject draft, Restore original and Flag a citation.
- A topic filter with 6 topics plus Other.
- Failed policy lookup with retry, escalate after two failures, and the officer's typed text kept.
- The comfort test with kill, success, fail and in-between verdicts.
- The feedback log.
- The colour rules in `context-skill.md`.

**Placeholders that look real but are not:**
- Start from scratch, Open case file, Escalate and Hand off only show a message.
- "View full policy" links go nowhere.
- Flag a citation only writes to the log.

**Out of scope (not built):**
- Any AI model or real policy search.
- Sending a reply. This is by design: the officer sends.
- Saving anything after a reload.
- Reading attachments.
- The 30-second signal, auto-disable, the weekly audit and the consistency check.
- Real officers, real data, sign-in and roles (supervisor, human lead, knowledge base lead).
- Any test of layout or accessibility in a real browser.

### 8. Engineering recommendation

**Status: Partial.** The recommendation and its order of work are clear. It has no effort sizes, no owners and no dates, because none have been decided.

**Do not build on this code as it stands. Build from what it specifies.** The page script is one inline block with shared state, and nothing in the repo tests it. The valuable parts are the draft data shape, the no-draft types, the rule constants, the colour meanings and the edit-size measure. Keep those. Treat the page as the reference UI.

**Order of work:**
1. **Look at it.** Open it in a real browser and click through the main paths. Nobody has done this yet.
2. **Write the draft contract.** Put the data shape from block 5 into `context-skill.md`, so a model and the page agree.
3. **Enforce the rules.** Check every draft in code before it is shown:
   - Each claim cites one of the 15 sources.
   - Fee, deadline, date and eligibility text appears word for word in the cited passage.
   - No outcome is promised.
   - Below 90% confidence, or a hand-off topic, means no draft.
4. **Make it testable.** Move the script out of `index.html` into modules. Save the checks that so far exist only in a throwaway file.
5. **Escape all text** before it goes into the page.
6. **Keep the results.** Save the comfort and feedback logs outside the page, and record who the officer is, so five real officers' results survive a reload.
7. **Run a real pilot** and meet the gates in `one-pager.md`:
   - All six `context-skill.md` test questions pass.
   - Mandatory confirmation on fees, deadlines and eligibility.
   - A weekly audit of 5% of sent replies.
   - Auto-disable at more than 2 wrong citations in a week.
   - At least 30% edge-case enquiries.
   - A consistency check across 10 similar enquiries.
8. **Decide** as `one-pager.md` says:
   - Continue if the success signal is met.
   - Pivot to a version that only suggests the closest policy pages if a kill switch trips.
   - Stop if the pivot also fails.

**What would change this recommendation:** If the real-browser check shows the page works well and the team keeps it, step 4 gets cheaper. If a real pilot trips the kill switch, steps 3 and 6 are not worth doing for the AI-draft version.
