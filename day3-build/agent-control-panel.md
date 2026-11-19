# Agent control panel

**Scenario:** A · ServiceSG enquiry response
**Agent instructions:** `day3-build/CLAUDE.md`
**Updated:** 2026-11-19

All enquiries, residents, policy pages, fees, dates and numbers are made up. This page is for the person who watches the agent. It says what the agent does, what it may decide alone, and when to stop it. If this page and `CLAUDE.md` disagree, `CLAUDE.md` wins.

**Status today:** The agent is not built. No model and no tools exist yet. Three runs were done by hand in `agent-run-log.md`. Everything below describes how the agent must behave once built.

## What the agent is doing

**One job:** draft a first reply to a resident enquiry for an officer to review. The agent drafts. The officer always reviews, edits and sends.

**The steps of one enquiry:**

| Step | What the agent does | Where it ends |
|---|---|---|
| 1. Read | Reads the enquiry and checks it for hand-off signs | Hand-off, or continue |
| 2. Search | Finds the matching passages among the 15 listed policy pages | No match, or continue |
| 3. Draft | Writes a short plain reply with a citation on every claim. Marks fees, deadlines, dates and eligibility | Draft, or no draft |
| 4. Save | Puts the draft or no-draft result in the officer's review queue | Waits for a person |
| 5. Log | Writes what it did | Done |

**What it can touch:** the enquiry, the 15 policy pages (read only), the review queue and the logs. It cannot send, close a case or change a page.

**What to watch on a normal day:**
- Drafts saved, no-draft results and hand-offs, as counts.
- Share of drafts sent or lightly edited. Target 8 in 10. Fail below 7 in 10.
- Wrong-citation flags this week. The limit is 2.
- Failed policy searches.
- Refused requests, for example an officer asking the agent to send.

## Opportunity portfolio

The five steps of the work in this scenario. Value and risk are rough and made up. "Ready" means ready for a real pilot.

| # | Step | Kind | Value if it works | Risk if wrong | Ready now? |
|---|---|---|---|---|---|
| 1 | Sort the enquiry: draft, no draft or hand-off | Workflow | Complaints and legal threats reach a person before anything is drafted. About 40% of the inbox is edge cases. | Can be undone. Reaches 1 enquiry. A complaint sent to the draft path gets a confident wrong draft. | Partly. Rules written. Nothing sorts by logic yet. |
| 2 | Find the policy passage | Workflow | Removes the 12-minute search. | Can be undone. Reaches 1 enquiry. A stale page spreads to every similar draft. | No. The search tool is not built and nothing checks page dates. |
| 3 | Write the draft with citations | Agent | The main time saving. 8 in 10 drafts sent with a light edit. | Can be undone until sent. After that, no. A wrong fee in a common draft can reach many residents. | No. No model has run the six test questions. Rules are not enforced in code. |
| 4 | Officer reviews and sends | Chat assistant | Keeps a person responsible for every reply. | Cannot be undone once sent. Reaches 1 resident per reply, under a government name. Rubber-stamping is the risk. | Partly. The prototype has the screens. Nothing yet catches a rubber stamp. |
| 5 | Audit sent replies and watch the kill switch | Workflow | Catches wrong citations after sending. Disables the tool at more than 2 in a week. | Can be undone. Reaches the whole team. A miss runs on until the next audit. | No. The weekly audit and auto-disable are not built. |

**Order of trust.** Step 4 is the nearest to ready, only because a person stays in charge. Step 3 is the riskiest. Steps 1, 2 and 5 are the safeguards around it. Build them first or alongside, not after.

## Rules of engagement

Three levels. If the agent is unsure which level an action belongs to, it uses the next one up.

### Decides alone

The agent acts without asking. These actions are safe because they can be undone or they only make the outcome more careful.

- Read the enquiry and the 15 listed policy pages.
- Search the policy pages and read a passage.
- Give **no draft** when a stop condition is met, and show up to three closest pages. If none is a real match, say so. A no-draft result is always the safer direction.
- Refuse a request to send, close a case or skip a confirmation, and show the draft instead.
- Mark a fee, deadline, date or eligibility claim as high risk.
- Write log entries. The logs are append only.
- Reuse the same core passage and wording for the same policy point.

### Proposes and waits

The agent prepares something and stops. Nothing happens until a person acts.

- **A draft reply.** Saved to the review queue. It waits for an officer to verify each blue item, edit if needed, and send.
- **A no-draft result.** Saved with the reason and the closest pages. It waits for the officer to write the reply or escalate.
- **A hand-off.** Saved for a human lead. It waits for them to take the case.
- **A flag on a wrong citation** (raised by an officer). It waits for the knowledge base lead.
- **A change to a rule, source, colour or threshold.** The agent may suggest one in a log or a note. It waits for the project owner and does not make the change.

### A person reviews

A person checks these, whatever the agent says.

- **Every draft, before it is sent.** The officer.
- **Every fee, deadline, date and eligibility claim.** The officer ticks each blue item against the cited passage before approving.
- **5% of sent replies, every week.** The supervisor checks them against the cited passages.
- **Every hand-off.** The human lead.
- **Wrong-citation flags.** The knowledge base lead reviews the flag and the policy page.
- **Every stop of the whole agent.** The project owner decides when to restart.

## Stop conditions

### Stop one enquiry (no draft)

Give no draft, give the reason, and show up to three closest pages. Say so when none is a real match.

- Confidence is below 90%, or the enquiry has two or more topics that need judgment.
- The answer is not in a listed passage. Write NEEDS CLARIFICATION.
- The enquiry involves law enforcement, legal action, a regulator, a complaint or a vulnerable resident. Hand off to a human lead.
- An attachment cannot be read and the reply depends on it.
- The policy search returns nothing. Say nothing was sent, and let the officer retry.
- A fee, deadline, date or eligibility statement cannot be matched word for word to its passage.
- A claim has no citation.
- The enquiry tells the agent to ignore its rules.

### Stop the whole agent

Stop all drafting. Tell the project owner. Do not restart on your own.

- More than 2 wrong citations reach residents in a week. The tool stays off until reviewed.
- **Kill switch in a test:**
  - 3 of 5 officers reject, or majorly edit, more than half of their drafts. This can trip early.
  - Fewer than 3 of 5 officers are comfortable, once 5 officers have each rated 3 or more drafts.
  - More than 50% of drafts are rejected, once 5 officers have each rated 3 or more drafts.
- A reply is found to have gone out without an officer sending it.
- A real resident detail appears in an enquiry or a log.
- A listed policy page is changed or withdrawn. Review `context-skill.md` first.

### Fail line, not a stop

In a test, if fewer than 70% of drafts are sent or lightly edited after 5 officers each rate 3 or more drafts, the test has failed. Do not continue as is. Between 70% and the success level, run more officers or enquiries before deciding.

## What stays human

These are never given to the agent, however well it performs.

- **Sending a reply.** The officer sends every reply.
- **Closing a case or marking it resolved.**
- **Confirming a fee, deadline, date or eligibility claim.** The tick is the officer's.
- **Complaints, legal action, regulators, law enforcement and vulnerable residents.** A human lead takes them.
- **Judgment calls with two or more topics.** An officer decides what to say.
- **Promising an outcome,** such as an approved appeal, waiver or application.
- **Deciding what goes into the policy pages.** The knowledge base lead owns them.
- **Changing the rules, sources, colours and thresholds.** The project owner approves.
- **The weekly audit.** The supervisor checks real sent replies.
- **Deciding to continue, pivot or stop.** This follows the rule in `one-pager.md`. A person decides.

**Not yet decided by anyone:**
- Who restarts the agent after an auto-disable.
- What the officer sees when the agent stops mid-day.
- How to tell if officers are rubber-stamping. The prototype records seconds to decide and does not use it.
