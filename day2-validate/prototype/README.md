# Prototype: ServiceSG Enquiry Draft Assistant

**Scenario:** A · ServiceSG enquiry response

A clickable mock-up. It tests one assumption: officers are comfortable with AI-drafted replies that cite the policy. See `../build-log.md`.

**There is no AI in it.** Every draft is written by hand in `data.js`. Everything in it is made up, and the page says so.

## How to open it

Double-click `index.html`. It opens in your browser. `server.py` is optional and is not needed.

## What it does today

**10 made-up enquiries**, one tab each:
- **5 have a draft.** Each claim has a citation with the policy page and its last-updated date. The page says "Draft only. An officer must review and send every reply."
- **5 have no draft:** low confidence (two of them), hand-off for a legal complaint, an unreadable attachment, and a question no source covers. Each shows why, and up to three closest policy pages.

**On a draft:**
- Fees, deadlines and eligibility show in **blue**. This means the officer must verify them. It does not mean low confidence.
- **Approve** on a draft with blue items opens a checklist. Every item must be ticked before approving.
- **Edit** opens a text box. The prototype measures how much changed. More than 50% of the words is a major edit.
- **Reject draft**, **Restore original** and **Flag** are also there. Flag logs a wrong citation.
- After sending, editing or rejecting, the officer rates comfort from 1 to 5.

**Comfort test panel:** pick a made-up officer (O1 to O5) and rate drafts. The panel updates live with:

| Result | When |
|---|---|
| Kill switch | 3 of 5 officers reject or majorly edit most drafts, or fewer than 3 are comfortable, or over 50% of drafts are rejected |
| Success | At least 4 of 5 officers comfortable and at least 80% of drafts used (sent or minor edit) |
| Fail | Fewer than 70% of drafts used |
| In between | 70% to under 80% used |

Results show once 5 officers have each rated 3 or more drafts. The kill switch can trip earlier.

**Feedback log:** records flags and every no-draft case, for knowledge base review.

## Files

| File | What it is for |
|---|---|
| `index.html` | The page and its logic |
| `data.js` | The made-up enquiries, drafts, citations and policy sources |
| `log.js` | The feedback log and the comfort test rules |
| `style.css` | Colours and layout. Colour meanings are in `../context-skill.md` |
| `server.py` | Optional local server |

## Limits

- Fixed drafts, not a model. It tests comfort with a mock-up, not with a real AI.
- Ratings and logs are kept in the page only. A reload clears them.
- All ratings are made-up test inputs. They are not evidence.
- The prototype cannot run the six test questions in `../context-skill.md`. It only has screens for them.
