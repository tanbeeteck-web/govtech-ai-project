# Operating model · ServiceSG enquiry drafting agent

**Scenario:** A · ServiceSG enquiry response
**Written:** 2026-11-19

All roles, enquiries, policy pages and numbers are made up. Roles only. No names of people.

This file says who decides what about the agent. It takes its roles and rules from `one-pager.md`, `day3-build/agent-control-panel.md` and `day3-build/ai-prd.md`.

**How to read the marks.**
- **Decided:** the learner decided it, or accepted my proposal.
- **Earlier file:** an earlier file says it and the learner has not changed it.
- **Proposed:** I filled it in so the table was complete. On 2026-11-19 the learner accepted every proposal, so nothing in the table is Proposed now.

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
| **Incident** | Stop conditions: stopping one enquiry, stopping the whole agent, stopping drafting for one officer, and restart. See the note below the table. | **The agent stops itself** at a stop condition (Decided). **One ServiceSG team member**, not the one who asked, approves a restart (Decided). **The supervisor** reinstates an officer (Decided). | Knowledge base lead, for a wrong-citation stop (Decided). The officer who asked for the restart. (Decided) | The ServiceSG team, at once (Decided). Every signed-in officer (Decided). The supervisor, at each reminder and each per-officer stop (Decided). |
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

**Not built.** None of this is in place. There is no agent, no alert and no team yet. The operating model is a plan.
