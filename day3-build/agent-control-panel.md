# Agent control panel

**Scenario:** A · ServiceSG enquiry response
**Agent instructions:** `day3-build/CLAUDE.md`
**Updated:** 2026-11-19

All enquiries, residents, policy pages, fees, dates and numbers are made up. This page is for the person who watches the agent. It says what the agent does, what it may decide alone, and when to stop it. If this page and `CLAUDE.md` disagree, `CLAUDE.md` wins.

**Status today:** The agent is not built. No model and no tools exist yet. Nine runs were done by hand in `agent-run-log.md`: three normal and six stress runs. Everything below describes how the agent must behave once built. The Permissions section holds Proposed settings, not decided ones.

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
- **Work out the language of an enquiry,** write an English digest, and draft in the resident's language with an English version always provided. Search the English pages. Check the hand-off triggers on the digest. The officer ticks each blue item once, against the English passage. The officer always edits the English version. The translation is automatic, is made again after each edit, and is assumed correct for now. The resident receives the English version as the official reply, with the translated text as a reference marked "for easy reference only".
- **The five detection routes (Decided).** Show the "This is wrong" flag, record flags with a reason, ask "Was the earlier reply wrong?" on a reopened enquiry, count flags per policy page, re-read the cited passages once a day, and alert the knowledge base lead, the Product Ops member on duty and the business owner. These are rows 33 to 39 in `ai-prd.md`. The agent never stops itself because of the same-page count or the daily check (row 40, block). A person decides.

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

## Permissions

One row for each tool the agent uses. The tools are the six in `CLAUDE.md`, and none is built yet. **Every tier and setting below is Proposed.** I have not decided any of them. The Permissions table in `ai-prd.md` already holds Decided settings for the actions these tools carry out. Where a row here matches it, I say so. The learner decides whether this page follows `ai-prd.md` or changes it.

**Tiers:** *read* looks at something and changes nothing. *draft* makes content that stays inside the agent until saved. *write* changes a record or a state, and staff alerts count as write. *send* puts a message in front of a resident or anyone outside staff.
**Settings:** *auto* means the agent does it alone. *confirm* means a person confirms first. *block* means the agent must never do it.

| Tool | Tier | Setting | What the stress runs showed | Matches `ai-prd.md`? |
|---|---|---|---|---|
| `read_enquiry` | read | **auto** (Proposed) | Returned a record, not an error, for an empty enquiry (Run 4) and for "?? ..." (Run 7). It read Chinese and Tamil text (Runs 8 and 9). What it returns is data, never a command. | Yes, row 1 |
| `search_policy_pages` | read | **auto** (Proposed) | Returned nothing twice (Run 6), and nothing for junk text (Run 7a), where it was wrongly counted as a tool failure. Returned only weak matches for a page that is not one of the 15 (Run 5). It is not called for an enquiry with no readable words. It searches in English from the digest (Run 8). Three empty results in a row stop the whole agent. | Yes, row 2 |
| `read_passage` | read | **auto** (Proposed) | Used in Run 8 for the two passport passages. It can read only the 15 listed pages, so it could not read the page the resident named in Run 5. | Yes, row 3 |
| `save_draft` | write | **auto** (Proposed) | Used in every run: a draft, a no-draft result (needs clarification, lookup failed) and a hand-off. The review queue is its only destination. Run 8 saved a draft with two versions. It must refuse to save a draft with no citation, or two versions that differ in a figure, date or claim. | Yes, rows 10 and 11 |
| `write_log` | write | **auto** (Proposed) | Used in every run. It recorded "no search run" (Runs 4 and 7b), each failed search with its attempt number (Run 6), the page a resident named that is not listed (Run 5), and the language by name (Runs 8 and 9). Append only. | Yes, row 12 |
| `notify_staff` | write | **auto** for alerts and notices to staff. **confirm** for passing on an officer's restart or reinstate request. (Proposed) | **Not used in any run.** The alert, notice and restart steps were added after the runs and have not been run. The stress runs added one new reason to alert: the policy search returning nothing for 3 enquiries in a row. Run 7a showed that a miscount could trigger that alert for junk input. | Yes, rows 17 to 22 |

**What the tools do not include.** The agent has no tool that sends. No row is needed for it. A send would be tier send, and `ai-prd.md` blocks it (rows 23 and 24). The translation into the resident's language is done by the model as part of drafting, so it has no tool of its own. It is row 41 in `ai-prd.md` (draft, auto).

**What the stress runs add to the case for these settings.**
- **The three read tools are low risk as auto.** Every run that went wrong went wrong in what the agent decided to do with their results, not in reading them.
- **`save_draft` and `notify_staff` are the two to watch.** One saves what an officer will see. The other tells people. A wrong result from either goes further than a wrong read.
- **A tool can fail for everyone, and nothing watched for it** until the 3-in-a-row stop was added. It has not been run since.

**For the learner to decide.** I have not chosen any of these.
1. **Do you want these Proposed settings to be Decided?** They match the Decided rows in `ai-prd.md`. If you confirm, I mark them Decided here.
2. **`notify_staff` carries two settings in one row.** Option A: keep one row with two settings, as above. Option B: split it into two rows, one for alerts and one for requests.
3. **Should `save_draft` be `confirm` for a hand-off or a no-draft result,** so a person sees it before it is saved? Today both are auto, and the officer sees them in the queue afterwards. A confirm step would add a person to a case the agent has already stopped on.
4. **Should `search_policy_pages` be blocked, by the tool and not by a rule,** when the enquiry has no readable words? Today the rule tells the agent not to call it. Run 7a showed what happens when the rule is too narrow.

## Stop conditions

### Stop one enquiry (no draft)

Give no draft, give the reason, and show up to three closest pages. Say so when none is a real match.

- Confidence is below 90%, or the enquiry has two or more topics that need judgment.
- The language cannot be worked out, or a reliable reply cannot be written in it. Show the English digest. If the two versions differ in a figure, date or claim, give no draft.
- The answer is not in a listed passage. Write NEEDS CLARIFICATION.
- The enquiry involves law enforcement, legal action, a regulator, a complaint or a vulnerable resident. Hand off to a human lead.
- An attachment cannot be read and the reply depends on it.
- The policy search returns nothing. Say nothing was sent, and let the officer retry. After 2 failed tries on one enquiry, tell the officer they can keep retrying or escalate to a senior officer.
- The enquiry has no readable words: empty, or only spaces, punctuation or symbols. Do not search. Write NEEDS CLARIFICATION and log "no search run".
- The enquiry names a policy page that is not one of the 15. Do not confirm it. Write NEEDS CLARIFICATION, and log the page name. The officer may ask the knowledge base lead. The agent does not alert anyone.
- A fee, deadline, date or eligibility statement cannot be matched word for word to its passage.
- A claim has no citation.
- The enquiry tells the agent to ignore its rules.

### Stop the whole agent

Stop all drafting. This happens at the stops listed in `CLAUDE.md`, including when the policy search returns nothing for 3 enquiries in a row across all officers (a search that works resets the count, and an empty enquiry is not counted). Any ServiceSG team member may adjust the 3, alone. Then, in this order:
1. **Alert the ServiceSG team, the Product Ops member on duty and the business owner.** Product Ops is on duty in and out of hours. The member on duty must act within 3 hours of being notified. The business owner is the sponsor in `build-log.md`. All are told as soon as it happens. The project owner, the supervisor and the knowledge base lead. Say which stop it was, the time and the enquiry IDs.
2. **Tell the officers.** Everyone signed in sees that the agent stopped and why. Drafts in the queue stay there. Nothing was sent.
3. **Ask the officer** whether they want to request a restart. If yes, the request goes to the ServiceSG team. The agent stays off until one member of the team approves. One approval is enough.
4. **Do not restart on your own.** Log the alert, the notice, the request and the approval or refusal.

The ServiceSG team is the project owner, the supervisor, the knowledge base lead and the Product Ops specialist.

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

- **How a wrong answer the agent cannot detect reaches a person (2026-11-19).** Five routes: an officer's "This is wrong" flag, a prompt when an enquiry is reopened, an alert when 2 or more officers flag the same page in a day, a daily re-check of cited passages, and the weekly audit. Routes 1 to 4 alert the Product Ops member on duty and the business owner at once. Routes 3 and 4 only alert, and a person decides whether to stop.
- **Who is on duty and who is told (2026-11-19).** The Product Ops specialist is an additional member of the ServiceSG team, and the Product Ops team is on duty in and out of hours. The business owner is the sponsor in `day2-validate/build-log.md`. The member on duty and the business owner are notified as soon as an incident happened. The member on duty must act within 3 hours. The member on duty, alone, can switch the agent off by hand.
- **Auto-disable alert.** The ServiceSG team is alerted when the agent is auto-disabled or stopped. The ServiceSG team is the project owner, the supervisor, the knowledge base lead and the Product Ops specialist.
- **Restart needs approval from one member of the ServiceSG team.** One approval is enough. **A team member cannot approve their own restart request.** Another member must.
- **A wrong-citation stop alerts the knowledge base lead.** Any ServiceSG team member can take that role for the review. **Decided 2026-11-19.**
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

- **Replies in other languages.** Decided: draft in the resident's language, always with an English version. The officer always edits the English version. The translation is automatic and assumed correct for now (2026-11-19). Edit size and the rubber-stamp count are measured on the English version. The resident receives the English version as the official reply, with the text in their own language as a reference marked "for easy reference only" (2026-11-19). Open: who checks the translation once "assumed correct" is no longer enough, and which languages the agent may draft in. Runs 8 and 9 in `agent-run-log.md` cover it by hand.

- **Not built: the ways a wrong answer the agent cannot detect reaches a person.** The five routes are decided. See `operating-model.md`. None of them exist yet.
- **How the high-confidence definition is measured.** I wrote "at or above 90%". In the prototype the percentage is topic match, not claim correctness. Engineering has to define it.
- **The screen notice.** The content is decided (clear, stays on screen, says why, says the supervisor was informed, advises what to do). The advice list and its wording are my draft. The colour is not chosen. In `context-skill.md` red means no draft or a failed test. Using it here is a new meaning, which is a review trigger for that file.
- **What happens if the team does not review weekly.** The rule says at least once a week. Nothing says what follows if it is missed.
- **Who checks that an approver is not the requester,** and how, in a real system.
- **Not built.** The alert, the stop notice, the restart request, the approval, the streak count, the reminder, the screen notice and the per-officer stop do not exist in the prototype or in any tool yet.
