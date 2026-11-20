# Prototype: ServiceSG Enquiry Draft Assistant

**Scenario:** A · ServiceSG enquiry response

A clickable mock-up. It tests one assumption: officers are comfortable with AI-drafted replies that cite the policy. See `../build-log.md`.

**There is no AI in it.** Every draft is written by hand in `data.js`. Everything in it is made up, and the page says so.

## How to open it

Double-click `index.html`. It opens in your browser. `server.py` is optional and is not needed.

## What it does today

**13 made-up enquiries**, one tab each. Each tab shows the enquiry's topic underneath:
- **6 have a draft.** Each claim has a citation with the policy page and its last-updated date. The page says "Draft only. An officer must review and send every reply."
- **7 have no draft:** low confidence (two of them), three hand-offs (a legal complaint, a request for an opinion on a policy and a minister, and a threat against staff), an unreadable attachment, and a question no source covers. Each shows why. A hand-off also names its trigger and says the human lead must take the case within 3 hours. The others show up to three closest policy pages.

**Abusive enquiry (decided 2026-11-20).** ENQ-2024-011 is rude but holds a valid question. It gets a draft, as for any resident, with an amber "Abusive enquiry" flag above it. The flag is not blue, so it does not mean "verify", and not red, so it does not mean "stop". Under the flag is a recommended paragraph about respectful service. It is not part of the draft. **Add to my reply** puts it in the edit box before the closing, and the officer can still change or remove it. The draft does not repeat the insult. The feedback log records "Abusive enquiry" once, and never the words used. The wording of the paragraph is for the learner to confirm.

**Opinion and threat (decided 2026-11-20).** A request for the agent's opinion on a policy or a minister (ENQ-2024-012) and a threat against staff (ENQ-2024-013, treated as law enforcement) are hand-offs with no draft.

**Topic filter:** a dropdown above the tabs filters the inbox by policy topic.
- There is a fixed list of 6 made-up topics: Passports and ID cards, Concessions and transport, Community centres, Parking, Housing (HDB), and Appeals and overseas.
- Each enquiry has one topic only, shown as a grey "Topic:" chip next to the time.
- An enquiry with no topic goes under **Other**. Today that is ENQ-2024-009 (the unreadable attachment) and ENQ-2024-013 (the threat).
- Each option shows its count, for example "Parking (2)". A line says "Showing 2 of 10 enquiries".
- A topic with 0 enquiries shows a plain message and no buttons. Picking All brings the inbox back.
- Picking a topic opens its first enquiry, unless the one you are on is still in the list.

**Policy lookup failure:** the prototype can simulate a failed policy lookup.
- A checkbox under the header, marked "Test control (made up)", makes the lookup return nothing for every enquiry about fees. Today that is ENQ-2024-001, 003, 004 and 011.
- When the lookup fails, no draft is shown, because every draft must cite a policy page. The screen says so, says nothing was sent, and offers **Retry lookup**.
- After a second failure it says "Still no result after 2 tries" and also offers **Escalate to senior officer**.
- Text the officer typed is kept through retries, switching enquiries and the failure starting mid-edit. Only the **Discard my edit** button removes it.
- Turning the checkbox off does not fix a failed enquiry by itself. The officer presses Retry lookup.
- Each failed attempt goes in the feedback log as "Lookup failed".

**On a draft:**
- Fees, deadlines and eligibility show in **blue**. This means the officer must verify them. It does not mean low confidence.
- **Approve** on a draft with blue items opens a "Verify before accepting" checklist. Every item must be ticked before approving.
- **Edit** opens a text box. The prototype measures how much changed. More than 50% of the words is a major edit. Text the officer typed is kept if they leave and come back.
- **Reject draft**, **Restore original** and **Flag a citation** are also there. Flag logs a wrong citation.
- After sending, editing or rejecting, the officer rates comfort from 1 to 5.

**Comfort test panel:** pick a made-up officer (O1 to O5) and rate drafts. The panel updates live with:

| Result | When |
|---|---|
| Kill switch | 3 of 5 officers reject or majorly edit most drafts, or fewer than 3 are comfortable, or over 50% of drafts are rejected |
| Success | At least 4 of 5 officers comfortable and at least 80% of drafts used (sent or minor edit) |
| Fail | Fewer than 70% of drafts used |
| In between | 70% to under 80% used |

Results show once 5 officers have each rated 3 or more drafts. The kill switch can trip earlier.

**Feedback log:** records flags, every no-draft case and every failed policy lookup, for knowledge base review.

## Files

| File | What it is for |
|---|---|
| `index.html` | The page layout only |
| `app.js` | The page logic, including the topic filter and the policy lookup failure handling |
| `tests.js` | Saved checks. See "How to run the checks" below |
| `data.js` | The made-up enquiries, drafts, citations, policy sources and the list of 6 topics |
| `log.js` | The feedback log, the comfort test rules and `escapeHtml`, which makes text safe to show in the page |
| `style.css` | Colours and layout. Colour meanings are in `../context-skill.md` |
| `server.py` | Optional local server |

## How to run the checks

On a Mac, from this folder:

`/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc tests.js`

It prints "113 passed, 0 failed" when all is well. The checks run on a stand-in page, not a real browser. They cover the escaping of text, every enquiry screen, the abusive flag and the recommended paragraph, the three hand-offs and their 3-hour note, the forced lookup failure, edit size and the comfort test verdicts. They do not check how the page looks.

## Limits

- The prototype does not detect abuse, opinions or threats. Each of these three enquiries is marked by hand in `data.js`.
- The Day 3 rules for other languages, the check on the officer's own text, the rubber-stamp reminder, the stop conditions and the flag routes are not in the prototype.
- The 3-hour limit is only shown as text. Nothing times it.
- Widths and fit on a laptop were estimated from the code, not measured in a browser.
- Fixed drafts, not a model. It tests comfort with a mock-up, not with a real AI.
- Ratings and logs are kept in the page only. A reload clears them.
- All ratings are made-up test inputs. They are not evidence.
- The topic is set by hand in `data.js`. Nothing works it out from the enquiry text.
- Picking a topic that opens an enquiry with no draft adds another entry to the feedback log.
- The lookup failure is simulated by the checkbox. There is no real policy lookup. While the checkbox is on, every retry fails.
- After a failed lookup recovers, the edit box shows the officer's typed text, not the cited draft. They press Discard my edit to see the cited draft.
- The prototype cannot run the six test questions in `../context-skill.md`. It only has screens for them.
