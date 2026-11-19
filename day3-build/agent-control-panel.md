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
- Alert the ServiceSG team, the Product Ops member on duty and the business owner the moment the agent stops. Tell officers it stopped. Show the rubber-stamp reminder after 5 flagged drafts in a row accepted with no change, tell the officer the supervisor has been informed, and inform the supervisor.
- Stop drafting for one officer who has ignored the reminder twice. Show a clear notice on their screen with advice on what they can do.
- Reuse the same core passage and wording for the same policy point.

### Proposes and waits

The agent prepares something and stops. Nothing happens until a person acts.

- **A draft reply.** Saved to the review queue. It waits for an officer to verify each blue item, edit if needed, and send.
- **A no-draft result.** Saved with the reason and the closest pages. It waits for the officer to write the reply or escalate.
- **A hand-off.** Saved for a human lead. It waits for them to take the case.
- **A flag on a wrong citation** (raised by an officer). It waits for the knowledge base lead.
- **Restarting the agent.** After any stop of the whole agent, the officer may request a restart. The agent stays off until one member of the ServiceSG team approves. One is enough, and it cannot be the member who asked. It never restarts itself.
- **Reinstating an officer** whose drafting was stopped. The officer asks the supervisor. Only the supervisor can turn it back on.
- **A change to a rule, source, colour or threshold.** The agent may suggest one in a log or a note. It waits for a person and does not make the change. The project owner approves changes to rules, sources, colours and the success, fail and kill thresholds. Any member of the ServiceSG team adjusts the rubber-stamp streak threshold and the 28 days, alone.

### A person reviews

A person checks these, whatever the agent says.

- **Every draft, before it is sent.** The officer.
- **Every fee, deadline, date and eligibility claim.** The officer ticks each blue item against the cited passage before approving.
- **5% of sent replies, every week.** The supervisor checks them against the cited passages.
- **Every hand-off.** The human lead.
- **Wrong-citation flags.** The knowledge base lead reviews the flag and the policy page.
- **Every stop of the whole agent.** The ServiceSG team gets an alert, reviews why, and may approve a restart. One approval is enough, and not from the member who asked. A wrong-citation stop also alerts the knowledge base lead.
- **The logged data.** Any member of the ServiceSG team may review it at any time, and the team must review it at least once a week.
- **Each officer's pattern of accepting flagged drafts.** The agent counts flagged drafts accepted in a row with no change and reminds the officer at 5 and informs the supervisor each time. The supervisor reviews the log, and reinstates an officer whose drafting was stopped.

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

Stop all drafting. Then, in this order:
1. **Alert the ServiceSG team, the Product Ops member on duty and the business owner.** Product Ops is on duty in and out of hours. The business owner is the sponsor in `build-log.md`. All are told as soon as it happens. The project owner, the supervisor and the knowledge base lead. Say which stop it was, the time and the enquiry IDs.
2. **Tell the officers.** Everyone signed in sees that the agent stopped and why. Drafts in the queue stay there. Nothing was sent.
3. **Ask the officer** whether they want to request a restart. If yes, the request goes to the ServiceSG team. The agent stays off until one member of the team approves. One approval is enough.
4. **Do not restart on your own.** Log the alert, the notice, the request and the approval or refusal.

The ServiceSG team is the project owner, the supervisor and the knowledge base lead.

### Stop drafting for one officer

Other officers keep their drafts. This happens when the officer has ignored the rubber-stamp reminder twice.

1. **Show a clear notice on the officer's screen** that auto-draft is off for them. It stays on screen while drafting is off. It says drafts are off for them only, why, that the supervisor has been informed, and what they can do.
2. Log it, and inform the supervisor at once.
3. The officer works without drafts, as before the agent.
4. The officer asks the supervisor to reinstate them. Only the supervisor can.

**What the notice advises** (draft wording for the learner to confirm):
- Keep working your enquiries. Read each one and search the policy pages yourself.
- Check every fee, deadline, date and eligibility claim against the cited passage.
- Ask the supervisor to turn drafts back on. The agent passes the request on once you confirm it.

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
- **Changing the rules, sources, colours and the success, fail and kill thresholds.** The project owner approves.
- **Adjusting the rubber-stamp streak threshold and the 28 days.** Any member of the ServiceSG team, alone, after reviewing the logged data.
- **The weekly audit.** The supervisor checks real sent replies.
- **Approving a restart** of the whole agent. The ServiceSG team decides.
- **Reinstating an officer** whose drafting was stopped. The supervisor decides.
- **Deciding to continue, pivot or stop.** This follows the rule in `one-pager.md`. A person decides.

### Decided on 2026-11-19

- **Who is on duty and who is told (2026-11-19).** The Product Ops team is on duty in and out of hours. The business owner is the sponsor in `day2-validate/build-log.md`. The member on duty and the business owner are notified as soon as an incident happened.
- **Auto-disable alert.** The ServiceSG team is alerted when the agent is auto-disabled or stopped. The ServiceSG team is the project owner, the supervisor and the knowledge base lead.
- **Restart needs approval from one member of the ServiceSG team.** One approval is enough. **A team member cannot approve their own restart request.** Another member must.
- **A wrong-citation stop alerts the knowledge base lead.** Any of the three ServiceSG team members can take that role for the review. *My reading, to confirm: see Open questions.*
- **The ServiceSG team is told, not only the project owner,** when the whole agent stops.
- **Rubber-stamping.** Officer actions are logged. The reminder fires only on flagged drafts, meaning drafts with a blue item that needs the officer's attention. **Straightforward drafts that meet the high-confidence definition do not count in the streak.** After 5 flagged drafts in a row accepted with no change, the officer gets a reminder about the risk and about reviewing with due diligence.
- **The officer is told the supervisor has been informed.** The supervisor is informed each time a reminder is shown and when drafting stops for an officer.
- **Reset.** An edit (minor or major), a rejection or a wrong-citation flag resets the streak to 0. A minor edit resets it even though it counts as used in the 8-in-10 success measure.
- **A second ignored reminder disables auto-draft for that officer.** It is clearly indicated on their screen, with advice on what they can do. The officer asks the supervisor to reinstate them.
- **Good practice clears the reminder count after 28 days.** The learner confirmed 28 days. **Any ServiceSG team member may adjust it, alone.**
- **The threshold of 5 is a starting value.** **Any ServiceSG team member may adjust it, alone.** The agent never changes it.
- **The team reviews the logged data at any time, and at least once a week.**
- **The supervisor is informed at every reminder.** More data visibility is wanted.

### Open questions

- **My reading of "any three of the team members".** I read it as: a wrong-citation stop alerts the knowledge base lead, and any of the three team members can take that role. If you meant that all three are alerted and must act, or that the knowledge base lead is a separate fourth person, tell me.
- **How the high-confidence definition is measured.** I wrote "at or above 90%". In the prototype the percentage is topic match, not claim correctness. Engineering has to define it.
- **The screen notice.** The content is decided (clear, stays on screen, says why, says the supervisor was informed, advises what to do). The advice list and its wording are my draft. The colour is not chosen. In `context-skill.md` red means no draft or a failed test. Using it here is a new meaning, which is a review trigger for that file.
- **What happens if the team does not review weekly.** The rule says at least once a week. Nothing says what follows if it is missed.
- **Who checks that an approver is not the requester,** and how, in a real system.
- **Not built.** The alert, the stop notice, the restart request, the approval, the streak count, the reminder, the screen notice and the per-officer stop do not exist in the prototype or in any tool yet.
