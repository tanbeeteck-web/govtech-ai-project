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
- **Shared state is easy to break.** There are about 15 shared variables and 14 places that write HTML as text, and the action buttons are written out twice. Retry and the edit box had to be wired together by hand during Behavior.
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
