# Operating model · ServiceSG enquiry drafting agent

**Scenario:** A · ServiceSG enquiry response
**Written:** 2026-11-19

All roles, enquiries, policy pages and numbers are made up. Roles only. No names of people.

This file says who decides what about the agent. It takes its roles and rules from `one-pager.md`, `day3-build/agent-control-panel.md` and `day3-build/ai-prd.md`.

**How to read the marks.**
- **Decided:** the learner decided it, or accepted my proposal.
- **Earlier file:** an earlier file says it and the learner has not changed it.
- **Proposed:** I suggest it and the learner has not decided it. On 2026-11-19 the learner accepted every earlier proposal, including the incident walkthrough. The only Proposed items are the settings of Permissions rows 33 to 40 in `ai-prd.md`. The suggestion for how the agent learns of a wrong answer it cannot detect itself was accepted on 2026-11-19.

The agent is not built. There is no model and no tool yet. This file describes how the agent will be run.

## Roles

| Role | What they do for the agent | Source |
|---|---|---|
| **Officer** | Reviews, edits and sends every reply. Ticks every blue item before approving. May request a restart, or a reinstatement. Sees the reminder and the notice when drafting is off. | Earlier file |
| **Supervisor** | Checks 5% of sent replies each week against the cited passages. Is informed at each reminder and each per-officer stop. Is the only role that can reinstate an officer. Is a member of the ServiceSG team. | Earlier file, Decided |
| **Knowledge base lead** | Owns the policy pages and what goes in or out of the 15 sources. Reviews wrong-citation flags. Is alerted when a wrong-citation stop happens. Is a member of the ServiceSG team. | Earlier file, Decided |
| **Human lead** | Takes hand-offs, such as a complaint with legal risk. | Earlier file |
| **Project owner** | Keeps the context skill and prototype in line. Approves changes to the rules, sources, colours and the success, fail and kill thresholds. Is a member of the ServiceSG team. | Earlier file |
| **ServiceSG team** | The project owner, the supervisor, the knowledge base lead and the Product Ops specialist, an additional member added on 2026-11-19. Gets every stop alert. One member approves a restart, and it cannot be the member who asked. Any member may adjust the rubber-stamp streak threshold and the 28 days, alone. Must review the logged data at least once a week. | Decided |
| **Engineering team** | Builds and runs the agent. Decides the items listed under "What engineering decides" in `ai-prd.md`, such as how the policy search works and where logs are kept. It is named in `ai-prd.md` and not defined in `one-pager.md`. | Earlier file (named only) |
| **Resident** | Never uses the agent. Sees only a reply that an officer has sent. | Earlier file |
| **Product Ops team (on duty)** | On duty both in and out of hours. The member on duty takes the first report of an incident, acts first, and is told as soon as it happens. The member on duty must act within 3 hours of being notified. The Product Ops team sets its own rota. The team's specialist is a member of the ServiceSG team. See the ServiceSG team row. | Decided on 2026-11-19 |
| **Business owner** | The sponsor in `day2-validate/build-log.md` (the Chief Executive Sponsor). Is told directly, as soon as an incident happens. Is not told by the project owner. A role, not a name. | Decided on 2026-11-19 |

**Two roles are not in any earlier file, and I have not added them.** A role for data protection or security, and a role for the agent's own budget. Both may matter for the vendor and model row. See Open decisions.

**One person can hold more than one role.** The supervisor, the knowledge base lead and the project owner are all in the ServiceSG team. A person in the ServiceSG team cannot approve a restart they asked for themselves.

## Decision rights

One row for each decision. **Harness part** is the part of the agent this decision controls. "Told" means told after the decision, so that nobody is surprised.

| Decision | Harness part | Who decides | Who is consulted | Who is told |
|---|---|---|---|---|
| **Scope** | Instructions (`CLAUDE.md`, `context-skill.md`) and Business rules: what the agent does and what it never does, the 15 sources, the no-draft rules and the colours | Project owner (Earlier file) | Knowledge base lead (sources). Supervisor (what officers check). Human lead (which cases are hand-offs). Officers who use it. (Decided) | All officers. The ServiceSG team. Engineering team. (Decided) |
| **Permissions** | The Permissions table: 40 actions, each with a tier and a setting of auto, confirm or block. Rows 1 to 32 are Decided. Rows 33 to 40 (the detection routes) are Proposed | Project owner for a change to the table (Decided). The learner confirmed settings 1 to 32 (Decided). Settings 33 to 40 are Proposed. | ServiceSG team. Engineering team, on what is possible. (Decided) | All officers. The ServiceSG team. Engineering team. (Decided) |
| **Vendor and model** | Which model and which supplier the agent runs on, how it is called, and what data leaves ServiceSG | Project owner (Decided) | Engineering team. ServiceSG team. Any data protection or security role, once one exists. (Decided) | All officers. The ServiceSG team. (Decided) |
| **Go-live** | The launch gates in `one-pager.md` and the handoff conditions: six test questions pass, real run with 5 officers meets the success signal, weekly audit and auto-disable in place, consistency check done | Project owner, once every gate is met (Decided). The gates are Earlier file. | Supervisor (the weekly audit is ready). Knowledge base lead (the sources are current). Engineering team. The test officers. (Decided) | All officers. The ServiceSG team. Human lead. (Decided) |
| **Incident** | Stop conditions: stopping one enquiry, stopping the whole agent, stopping drafting for one officer, and restart. See the note below the table. | **The agent stops itself** at a stop condition (Decided). **One ServiceSG team member**, not the one who asked, approves a restart (Decided). **The supervisor** reinstates an officer (Decided). **The Product Ops member on duty, alone,** can switch the agent off by hand (Decided). **The member on duty must act within 3 hours** of being notified (Decided). | Knowledge base lead, for a wrong-citation stop (Decided). The officer who asked for the restart. (Decided) | The ServiceSG team, at once (Decided). Every signed-in officer (Decided). The supervisor, at each reminder and each per-officer stop (Decided). The Product Ops member on duty and the business owner, both as soon as the incident happened (Decided). |
| **Retire** | Switching the agent off for good, and what happens to its logs and the policy pages it used | Project owner (Decided). The rule for the decision to continue, pivot or stop is Earlier file: a person decides. | ServiceSG team. Supervisor. Knowledge base lead. Human lead. (Decided) | All officers. Engineering team. (Decided) |

**Note on the Incident row.** It covers three kinds of incident.
- **The whole agent stops.** The agent stops itself, alerts the ServiceSG team, the Product Ops member on duty and the business owner, and tells every officer. An officer may request a restart. One ServiceSG team member, who did not make the request, approves. A wrong-citation stop also alerts the knowledge base lead, and any ServiceSG team member can take that role. The learner accepted this reading on 2026-11-19.
- **Drafting stops for one officer** after two ignored reminders. The agent stops it, shows a notice on the officer's screen, and informs the supervisor. Only the supervisor reinstates the officer.
- **A reply goes out without an officer, or a real resident detail appears.** Both stop the whole agent. What happens after the stop, such as an investigation, has no owner yet.

**Decisions with their own owner outside this table.** These are already Decided and are not repeated above.
- **The rubber-stamp streak threshold (starting at 5) and the 28 days.** Any member of the ServiceSG team, alone. The team may review the data at any time and must review it at least once a week.
- **Confirming a fee, deadline, date or eligibility claim.** The officer, every time.
- **Sending a reply and closing a case.** Always the officer. The agent never does either.
- **The weekly audit.** The supervisor.

## Incident walkthrough: a wrong answer at 08:00 on Monday

A made-up incident. At 08:00 on Monday the agent gave a wrong answer to the person it serves. I read this file as the person on duty, to see whether it says what to do.

### The three answers

| Question | Answer | Mark |
|---|---|---|
| **Who acts first?** | The Product Ops member on duty, as soon as the incident happens. Product Ops is on duty in and out of hours. | Decided on 2026-11-19 |
| **Who switches the agent off?** | The Product Ops member on duty, alone. No second approval is needed to stop. Restart still needs one ServiceSG team member who did not ask. | Decided on 2026-11-19 |
| **Who tells the business owner?** | Nobody needs to. The business owner (the sponsor in `build-log.md`) is notified directly, together with the member on duty, as soon as the incident happened. | Decided on 2026-11-19 |

### First, which incident is it?

The agent never sends to a resident. So "sent a wrong answer to the person it serves" can mean three things. The first step is to find out which.

| What happened | How serious | What it means |
|---|---|---|
| **A.** The agent showed an officer a wrong draft. Nobody sent it. | Lower | The officer's check worked, or has not happened yet. Not a stop condition by itself. |
| **B.** An officer sent the wrong draft to a resident. | High | A wrong reply reached a resident. It counts towards the limit of more than 2 wrong citations in a week, if the fault is a wrong citation. Ask whether the officer rubber-stamped it. |
| **C.** A wrong reply reached a resident with no officer sending it. | Highest | A control failed. This is already a stop condition: the whole agent stops. |

### What the files said, and what was missing

I read the files in order, as the person on duty would. These are the gaps.

1. **Nothing said who is on duty.** Now settled: the Product Ops team, in and out of hours. The member on duty must act within 3 hours. The rota is the Product Ops team's own.
2. **The agent only stops itself at conditions it can check.** A wrong answer that passes its own checks triggers nothing. The first signal is a person: an officer's flag, a resident's complaint or the weekly audit. The file says "the agent stops itself", and that does not cover this case.
3. **The count of wrong citations is not built.** One wrong answer would not trip the limit of 2 even if it reached a resident.
4. **No human can switch the agent off.** The files say the agent stops itself and that a restart needs approval. Nothing says who may stop it by hand.
5. **There was no business owner.** Now settled: the sponsor in `build-log.md`, told directly and at once.
6. **Drafts already in the queue stay.** If they carry the same error, an officer could still send one.
7. **Nothing says who corrects the resident.** The agent will be off, and it never sends anyway.
8. **Nothing says who finds the cause.** This was open question 3.
9. **A restart does not ask why it failed.** One member who did not ask can approve, without saying what was fixed.

### What happens, step by step (Decided on 2026-11-19)

In order, for an incident of type B or C. For type A, steps 1 to 4 apply, and the member on duty decides whether to stop. If unsure, stop. Stopping is the safe direction.

| Step | Who | What they do |
|---|---|---|
| **1. Report** | Any officer or the supervisor | Flags the draft or the reply as wrong. The flag goes to the knowledge base lead, as today. They also tell the Product Ops member on duty at once. The agent, or the member on duty, notifies the business owner at the same moment. A flag alone does not stop the agent. |
| **2. Act first** | Product Ops member on duty | Takes the report. Decides which type it is (A, B or C). Writes it in the log. |
| **3. Switch off** | The Product Ops member on duty, alone | Switches the agent off by hand. One member is enough. The member writes the reason in the log. The usual stop steps then run: alert the ServiceSG team, tell every signed-in officer, and keep the queue. The off switch must work without the agent's help. |
| **4. Hold the queue** | Product Ops member on duty | Marks every draft already in the queue "held, do not send" until the knowledge base lead or the supervisor has checked it against the error. This changes today's rule that drafts simply stay. |
| **5. Tell the business owner** | The agent's alert and the Product Ops member on duty. Decided: the business owner is told as soon as the incident happened, at the same time as the member on duty. | The message says what happened, that the agent is off, and what happens next. The member on duty adds how many residents were reached once known. This applies to every type, A, B or C. |
| **6. Correct the resident** | Supervisor decides whether a correction is needed and what it says. An officer sends it. | The agent is off and does not draft it. A complaint or legal risk goes to the human lead. |
| **7. Find the cause** | Knowledge base lead for a source or citation fault. Engineering team for a model or tool fault. | The project owner owns the written report and the logs. |
| **8. Restart** | One ServiceSG team member who did not ask | As decided. The request must say what the cause was and what was changed. Decided on 2026-11-19. |
| **9. Count** | Supervisor | Adds the incident to the weekly count of wrong citations, if the fault was a wrong citation that reached a resident. |

**One more thing.** The Permissions table in `ai-prd.md` lists what the agent does. This hand switch is an action of a person, so it is not in that table.

## Open decisions

For the learner. I have not chosen for you.

**Settled on 2026-11-19.** The learner accepted all proposals in the Decision rights table and the incident walkthrough:
- The project owner decides scope, vendor and model, go-live and retire, and decides any change to the Permissions table.
- Every consulted and told cell is as written.
- A wrong-citation stop alerts the knowledge base lead, and any ServiceSG team member can take that role.

**Still open**

1. **Is there a data protection or security role?** No earlier file has one, and the vendor and model decision sends policy text and enquiry text to a model. Should one be added, and where? The table lists one as consulted "once one exists".
2. **Who owns the agent's budget,** if it has one?
3. **Who runs an investigation after an incident,** such as a reply sent without an officer or a real resident detail in a log? The agent stops and alerts. Nothing says who finds out why.
4. **What happens to the logs and the policy pages when the agent is retired?** The project owner decides to retire it. The table does not say what is kept, for how long, or who can read it.
5. **Is the engineering team its own role,** or part of the ServiceSG team? It is named in `ai-prd.md` and listed here as its own role.
6. **Can one person hold the decision and the review?** The project owner is also in the ServiceSG team that reviews restarts and the weekly data. Do you want a second person to check the project owner's own decisions?
7. **Go-live gates.** The six test questions, the real run with 5 officers and the four missing safeguards come from `handoff-note.md` and `one-pager.md`. Do you want any of them changed, or any added?

**Added by the incident walkthrough** (all settled on 2026-11-19 except the last item)

8. ~~Who is on duty?~~ **Settled on 2026-11-19:** the Product Ops team, in and out of hours. The Product Ops specialist is an additional ServiceSG team member. The rota is the Product Ops team's own.
9. ~~May one member switch the agent off alone?~~ **Settled on 2026-11-19:** the Product Ops member on duty, alone. Restart still needs one other ServiceSG team member.
10. ~~Is the business owner the sponsor?~~ **Settled on 2026-11-19:** yes, the Chief Executive Sponsor in `day2-validate/build-log.md`.
11. ~~How fast?~~ **Settled on 2026-11-19:** the member on duty and the business owner are notified **as soon as the incident happened**, and the member on duty must act **within 3 hours**. How the agent learns of an incident it cannot detect itself is settled in item 15.
12. ~~Hold drafts in the queue after an incident?~~ **Settled on 2026-11-19:** yes. Drafts already in the queue are marked "held, do not send" until checked. This changes the earlier rule that drafts stay.
13. ~~Who corrects a resident?~~ **Settled on 2026-11-19:** the supervisor decides whether a correction is needed and what it says. An officer sends it.
14. ~~Which go into other files?~~ **Settled on 2026-11-19:** on duty, the business owner, immediate notification, the 3 hours, the hand switch-off, the queue hold and the Product Ops specialist are in `CLAUDE.md`, `agent-control-panel.md`, `ai-prd.md` and `one-pager.md`.
15. ~~How does the agent learn of a wrong answer it cannot detect itself?~~ **Settled on 2026-11-19:** the five routes below, all accepted.

### How the agent learns of a wrong answer it cannot detect itself (Decided on 2026-11-19)

The agent only stops at conditions it can check. A wrong answer that passes its own checks needs a person or a signal from outside it. There are five routes, from fastest to slowest. Routes 1 to 4 send the Product Ops member on duty and the business owner an alert as soon as they fire. Routes 1, 3 and 4 also alert the knowledge base lead.

| Route | How it works | Speed |
|---|---|---|
| **1. One-click flag by an officer** | A "This is wrong" button on every draft and every sent reply, with a short reason. It goes to the knowledge base lead and the Product Ops member on duty at once. This is the main route. | Minutes |
| **2. A reopened or repeat enquiry** | If a resident writes back about the same case, or the same enquiry is reopened, the officer sees a prompt: "Was the earlier reply wrong?" One click makes it a flag. | Hours to days |
| **3. Several flags on the same policy page** | If 2 or more officers flag or reject drafts that cite the same page within a day, the agent alerts the knowledge base lead and the Product Ops member on duty. It does not stop itself. A person decides. | Same day |
| **4. A check of sent replies against the page** | Each day, the agent re-reads the passages cited in the replies sent that day and compares them with the current page text. A difference is flagged to the knowledge base lead. It reads only. | Next day |
| **5. The weekly audit** | The supervisor's 5% check of sent replies, as today. Any wrong answer found counts towards the limit of 2 wrong citations in a week. | Up to a week |

Notes:
- Routes 1 and 2 need officers to act. Route 3 and route 4 need the agent to count and compare, so they need new tools or logs.
- Route 4 is not a Permissions row yet. It would be a read of the policy pages and a write to a log, both auto.
- None of this is built. The flag, the prompt, the same-page count and the daily re-check do not exist in the prototype or in any tool.

**Not built.** None of this is in place. There is no agent, no alert and no team yet. The operating model is a plan.
