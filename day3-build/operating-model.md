# Operating model · ServiceSG enquiry drafting agent

**Scenario:** A · ServiceSG enquiry response
**Written:** 2026-11-19

All roles, enquiries, policy pages and numbers are made up. Roles only. No names of people.

This file says who decides what about the agent. It takes its roles and rules from `one-pager.md`, `day3-build/agent-control-panel.md` and `day3-build/ai-prd.md`.

**How to read the marks.**
- **Decided:** the learner decided it, or accepted my proposal.
- **Earlier file:** an earlier file says it and the learner has not changed it.
- **Proposed:** I filled it in. The learner accepted every proposal in the Decision rights table on 2026-11-19. The incident walkthrough below adds new proposals, and they are marked Proposed until the learner accepts them.

The agent is not built. There is no model and no tool yet. This file describes how the agent will be run.

## Roles

| Role | What they do for the agent | Source |
|---|---|---|
| **Officer** | Reviews, edits and sends every reply. Ticks every blue item before approving. May request a restart, or a reinstatement. Sees the reminder and the notice when drafting is off. | Earlier file |
| **Supervisor** | Checks 5% of sent replies each week against the cited passages. Is informed at each reminder and each per-officer stop. Is the only role that can reinstate an officer. Is a member of the ServiceSG team. | Earlier file, Decided |
| **Knowledge base lead** | Owns the policy pages and what goes in or out of the 15 sources. Reviews wrong-citation flags. Is alerted when a wrong-citation stop happens. Is a member of the ServiceSG team. | Earlier file, Decided |
| **Human lead** | Takes hand-offs, such as a complaint with legal risk. | Earlier file |
| **Project owner** | Keeps the context skill and prototype in line. Approves changes to the rules, sources, colours and the success, fail and kill thresholds. Is a member of the ServiceSG team. | Earlier file |
| **ServiceSG team** | The project owner, the supervisor and the knowledge base lead. Gets every stop alert. One member approves a restart, and it cannot be the member who asked. Any member may adjust the rubber-stamp streak threshold and the 28 days, alone. Must review the logged data at least once a week. | Decided |
| **Engineering team** | Builds and runs the agent. Decides the items listed under "What engineering decides" in `ai-prd.md`, such as how the policy search works and where logs are kept. It is named in `ai-prd.md` and not defined in `one-pager.md`. | Earlier file (named only) |
| **Resident** | Never uses the agent. Sees only a reply that an officer has sent. | Earlier file |
| **ServiceSG team member on duty** | One of the three ServiceSG team members, taking turns. Takes the first report of an incident and acts first. (Proposed. No earlier file has a rota or hours.) | Proposed |
| **Business owner** | The senior person accountable for the service. I read this as the sponsor in `day2-validate/build-log.md`. Is told by the project owner when a wrong answer reaches a resident. A role, not a name. | Proposed |

**Two roles are not in any earlier file, and I have not added them.** A role for data protection or security, and a role for the agent's own budget. Both may matter for the vendor and model row. See Open decisions.

**One person can hold more than one role.** The supervisor, the knowledge base lead and the project owner are all in the ServiceSG team. A person in the ServiceSG team cannot approve a restart they asked for themselves.

## Decision rights

One row for each decision. **Harness part** is the part of the agent this decision controls. "Told" means told after the decision, so that nobody is surprised.

| Decision | Harness part | Who decides | Who is consulted | Who is told |
|---|---|---|---|---|
| **Scope** | Instructions (`CLAUDE.md`, `context-skill.md`) and Business rules: what the agent does and what it never does, the 15 sources, the no-draft rules and the colours | Project owner (Earlier file) | Knowledge base lead (sources). Supervisor (what officers check). Human lead (which cases are hand-offs). Officers who use it. (Decided) | All officers. The ServiceSG team. Engineering team. (Decided) |
| **Permissions** | The Permissions table: 32 actions, each with a tier and a setting of auto, confirm or block | Project owner for a change to the table (Decided). The learner confirmed all 32 current settings (Decided). | ServiceSG team. Engineering team, on what is possible. (Decided) | All officers. The ServiceSG team. Engineering team. (Decided) |
| **Vendor and model** | Which model and which supplier the agent runs on, how it is called, and what data leaves ServiceSG | Project owner (Decided) | Engineering team. ServiceSG team. Any data protection or security role, once one exists. (Decided) | All officers. The ServiceSG team. (Decided) |
| **Go-live** | The launch gates in `one-pager.md` and the handoff conditions: six test questions pass, real run with 5 officers meets the success signal, weekly audit and auto-disable in place, consistency check done | Project owner, once every gate is met (Decided). The gates are Earlier file. | Supervisor (the weekly audit is ready). Knowledge base lead (the sources are current). Engineering team. The test officers. (Decided) | All officers. The ServiceSG team. Human lead. (Decided) |
| **Incident** | Stop conditions: stopping one enquiry, stopping the whole agent, stopping drafting for one officer, and restart. See the note below the table. | **The agent stops itself** at a stop condition (Decided). **One ServiceSG team member**, not the one who asked, approves a restart (Decided). **The supervisor** reinstates an officer (Decided). **Any ServiceSG team member, alone,** can switch the agent off by hand (Proposed). | Knowledge base lead, for a wrong-citation stop (Decided). The officer who asked for the restart. (Decided) | The ServiceSG team, at once (Decided). Every signed-in officer (Decided). The supervisor, at each reminder and each per-officer stop (Decided). The business owner, told by the project owner (Proposed). |
| **Retire** | Switching the agent off for good, and what happens to its logs and the policy pages it used | Project owner (Decided). The rule for the decision to continue, pivot or stop is Earlier file: a person decides. | ServiceSG team. Supervisor. Knowledge base lead. Human lead. (Decided) | All officers. Engineering team. (Decided) |

**Note on the Incident row.** It covers three kinds of incident.
- **The whole agent stops.** The agent stops itself, alerts the ServiceSG team and tells every officer. An officer may request a restart. One ServiceSG team member, who did not make the request, approves. A wrong-citation stop also alerts the knowledge base lead, and any of the three team members can take that role. The last part is my reading of "any three of the team members". The learner accepted it with the rest of the proposals.
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
| **Who acts first?** | The ServiceSG team member on duty, as soon as an officer or the supervisor reports it | Proposed. The files had no answer. |
| **Who switches the agent off?** | Any one ServiceSG team member, alone. No second approval is needed to stop. | Proposed. The files had no answer. |
| **Who tells the business owner?** | The project owner, once the agent is off and the wrong answer is known to have reached a resident | Proposed. The files had no business owner. |

### First, which incident is it?

The agent never sends to a resident. So "sent a wrong answer to the person it serves" can mean three things. The first step is to find out which.

| What happened | How serious | What it means |
|---|---|---|
| **A.** The agent showed an officer a wrong draft. Nobody sent it. | Lower | The officer's check worked, or has not happened yet. Not a stop condition by itself. |
| **B.** An officer sent the wrong draft to a resident. | High | A wrong reply reached a resident. It counts towards the limit of more than 2 wrong citations in a week, if the fault is a wrong citation. Ask whether the officer rubber-stamped it. |
| **C.** A wrong reply reached a resident with no officer sending it. | Highest | A control failed. This is already a stop condition: the whole agent stops. |

### What the files said, and what was missing

I read the files in order, as the person on duty would. These are the gaps.

1. **Nothing says who is on duty.** There is no rota and no hours. At 08:00 on a Monday it is not clear who picks up.
2. **The agent only stops itself at conditions it can check.** A wrong answer that passes its own checks triggers nothing. The first signal is a person: an officer's flag, a resident's complaint or the weekly audit. The file says "the agent stops itself", and that does not cover this case.
3. **The count of wrong citations is not built.** One wrong answer would not trip the limit of 2 even if it reached a resident.
4. **No human can switch the agent off.** The files say the agent stops itself and that a restart needs approval. Nothing says who may stop it by hand.
5. **There is no business owner.** Nobody is named to tell.
6. **Drafts already in the queue stay.** If they carry the same error, an officer could still send one.
7. **Nothing says who corrects the resident.** The agent will be off, and it never sends anyway.
8. **Nothing says who finds the cause.** This was open question 3.
9. **A restart does not ask why it failed.** One member who did not ask can approve, without saying what was fixed.

### What I filled in (Proposed)

In order, for an incident of type B or C. For type A, steps 1 to 4 apply, and the member on duty decides whether to stop. If unsure, stop. Stopping is the safe direction.

| Step | Who | What they do |
|---|---|---|
| **1. Report** | Any officer or the supervisor | Flags the draft or the reply as wrong. The flag goes to the knowledge base lead, as today. They also tell the ServiceSG team member on duty at once. A flag alone does not stop the agent. |
| **2. Act first** | ServiceSG team member on duty | Takes the report. Decides which type it is (A, B or C). Writes it in the log. |
| **3. Switch off** | Any ServiceSG team member, alone | Switches the agent off by hand. One member is enough. The member writes the reason in the log. The usual stop steps then run: alert the ServiceSG team, tell every signed-in officer, and keep the queue. The off switch must work without the agent's help. |
| **4. Hold the queue** | ServiceSG team member on duty | Marks every draft already in the queue "held, do not send" until the knowledge base lead or the supervisor has checked it against the error. This changes today's rule that drafts simply stay. |
| **5. Tell the business owner** | Project owner | Tells the business owner at once for type B or C. Says what happened, how many residents were reached, that the agent is off, and what happens next. For type A, tells them the same day. If the project owner is the one on duty, the same person does both. If the project owner cannot be reached, another team member tells them. |
| **6. Correct the resident** | Supervisor decides whether a correction is needed and what it says. An officer sends it. | The agent is off and does not draft it. A complaint or legal risk goes to the human lead. |
| **7. Find the cause** | Knowledge base lead for a source or citation fault. Engineering team for a model or tool fault. | The project owner owns the written report and the logs. |
| **8. Restart** | One ServiceSG team member who did not ask | As decided. Proposed addition: the request must say what the cause was and what was changed. |
| **9. Count** | Supervisor | Adds the incident to the weekly count of wrong citations, if the fault was a wrong citation that reached a resident. |

**One more thing.** The Permissions table in `ai-prd.md` lists what the agent does. This hand switch is an action of a person, so it is not in that table.

## Open decisions

For the learner. I have not chosen for you.

**Settled on 2026-11-19.** The learner accepted all proposals in the Decision rights table:
- The project owner decides scope, vendor and model, go-live and retire, and decides any change to the Permissions table.
- Every consulted and told cell is as written.
- A wrong-citation stop alerts the knowledge base lead, and any of the three team members can take that role.

**Still open**

1. **Is there a data protection or security role?** No earlier file has one, and the vendor and model decision sends policy text and enquiry text to a model. Should one be added, and where? The table lists one as consulted "once one exists".
2. **Who owns the agent's budget,** if it has one?
3. **Who runs an investigation after an incident,** such as a reply sent without an officer or a real resident detail in a log? The agent stops and alerts. Nothing says who finds out why.
4. **What happens to the logs and the policy pages when the agent is retired?** The project owner decides to retire it. The table does not say what is kept, for how long, or who can read it.
5. **Is the engineering team its own role,** or part of the ServiceSG team? It is named in `ai-prd.md` and listed here as its own role.
6. **Can one person hold the decision and the review?** The project owner is also in the ServiceSG team that reviews restarts and the weekly data. Do you want a second person to check the project owner's own decisions?
7. **Go-live gates.** The six test questions, the real run with 5 officers and the four missing safeguards come from `handoff-note.md` and `one-pager.md`. Do you want any of them changed, or any added?

**Added by the incident walkthrough** (all Proposed)

8. **Who is on duty, and when?** The files have no rota and no hours. How many of the three team members take turns, and what happens out of hours?
9. **May any team member switch the agent off alone?** I proposed one. The restart needs one other member. Is it right that stopping is easier than starting?
10. **Is the "business owner" the sponsor in `build-log.md`?** I assumed so. If it is someone else, say who.
11. **How fast?** The files give no time for any step. How quickly should the member on duty act, and how quickly should the business owner hear?
12. **Should drafts in the queue be held after an incident?** This changes the current rule that drafts stay. Held drafts cost the officers time. Is it worth it for a type A incident too?
13. **Who corrects a resident,** and who approves the wording? I proposed the supervisor decides and an officer sends.
14. **Which of these should go into `CLAUDE.md`, `agent-control-panel.md` and `ai-prd.md`?** I changed only this file.

**Not built.** None of this is in place. There is no agent, no alert and no team yet. The operating model is a plan.
