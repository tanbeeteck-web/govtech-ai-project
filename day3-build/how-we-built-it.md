# How we built this agent: an AI-native approach

This one-pager explains how the ServiceSG enquiry drafting agent was built, using the AI-native principles from *Becoming AI-native: what good looks like, and what it takes*.

All data is made up. No real residents, officers or records are used.

## The key shift: from tool to outcome

The article distinguishes three states:
- **AI-assisted:** people get tools, work stays the same
- **AI-enabled:** AI sits inside a workflow, some metrics improve
- **AI-native:** work is redesigned as a human-agent system

This agent aims for AI-native. The unit of design is the outcome (a correct first reply within one working day), not the task (searching policy pages). The agent carries context that used to require handoffs. Decision rights state what the agent may decide, spend and escalate.

**The subtraction test:** If the agent were switched off tomorrow, officers would have to search policy pages themselves again, losing the one-day SLA. The operating model depends on it, not just the tooling.

## How the five markers show up

### 1. Value is concentrated in one end-to-end workflow

We picked one workflow: the shared enquiry inbox. It has a named owner (the project owner), a baseline (70% within SLA), and a target (90%). We did not build for every ServiceSG process. The kill list is explicit: we stop if fewer than 7 in 10 drafts are sent with a light edit.

### 2. Work is re-architected around decisions, not tasks

The old process:
1. Officer opens enquiry
2. Officer searches policy pages (12 minutes)
3. Officer drafts reply
4. Officer sends

The new process:
1. Agent reads enquiry and searches policy pages
2. Agent drafts reply with citations
3. **Officer reviews, edits and sends** (human decision)

The handoff between search and draft is gone. The officer's role has shifted from searching to reviewing. But the consequential decision (sending the reply) stays human.

### 3. Context and evaluation are treated as durable assets

**Context:** The agent has 15 policy pages it may use (`context-skill.md`). Each page has a last-updated date. The agent retrieves the right passage without a person assembling it first. This is the asset that compounds.

**Evaluation:** Six test questions check the agent against the rules. A weekly 5% audit compares sent replies to cited passages. Wrong citations are flagged and counted. More than 2 wrong citations in a week stops the agent. Evaluation is the currency of approval, not faith.

### 4. Governance has throughput, not just rigour

The agent has risk tiers with pre-approved patterns:
- **Decides alone:** read the enquiry, search policy, give no draft when unsure
- **Proposes and waits:** every draft waits for the officer
- **Requires human lead:** complaints, legal action, vulnerable residents, judgment calls

This lets the agent work without a committee for routine cases. The officer confirms every blue item (fees, deadlines, eligibility). Governance says yes quickly to safe actions.

Auto-disable on 2 wrong citations is a guardrail, not a gate. The agent stops itself before a person has to intervene.

### 5. The workforce has been redesigned, not merely trained

The officer's job changed from searching to reviewing. The rubber-stamp watch catches officers who accept without checking: 5 flagged drafts in a row triggers a reminder; 2 reminders disables auto-draft for that officer. This inverts the obvious arrangement: the agent drafts, the human reviews, and the system catches when review is skipped.

Middle managers (supervisors) have a genuine role: 5% weekly audits, reinstatement decisions, and being informed at each reminder. They own quality, not just coordination.

## Economics we planned for

The article warns that savings are banked only when the old step is retired. We designed for this:
- The agent does not add a check; it replaces the search step
- The officer confirms only high-risk items, not every line
- If 8 in 10 drafts are sent with a light edit, time is saved in the accounts, not just at the desk

## What stays human

The article says decision rights must state explicitly what a machine may decide. Ours do:
- **Agent decides:** whether to draft, what to cite, when to hand off
- **Human decides:** sending, closing a case, confirming fees and eligibility, handling complaints, changing the rules

The officer sends every reply. The supervisor reinstates officers. The project owner approves rule changes. The agent never restarts itself.

## The constraint we addressed

The article lists four constraints: value ambiguity, context debt, assurance throughput, and absorption capacity.

Our binding constraint was **context debt**. Demos worked; production would not without the context layer. We built:
- 15 policy pages with last-updated dates
- 12 rules the agent follows
- 6 test questions as a harness
- Colour meanings so officers know what needs checking

## The design choices that made it native

| Choice | Why it is native |
|---|---|
| One workflow, not many pilots | Value concentration |
| Officer reviews, agent drafts | Handoff removed |
| 15 policy pages, not the whole knowledge base | Context layer scoped to the outcome |
| 6 test questions, weekly audit | Evaluation as an asset |
| Auto-disable at 2 wrong citations | Guardrail, not gate |
| Rubber-stamp watch with supervisor informed | Role redesign with genuine oversight |
| Explicit decision rights in the skill file | Human accountability in the audit trail |

## What we would measure

Three levels, as the article recommends:
- **Activity:** drafts generated, officer actions logged
- **Outcome:** share sent with light edit, wrong citations per week, time to first reply
- **Capability:** median time from rule change to production, evaluation coverage, share of officers comfortable

## Open issues

- The prototype has no AI yet. It shows fixed drafts. A real test with a model is next.
- Consistency across officers is not measured. The Head of Product asked for this.
- The human lead takes every no-draft case within 3 hours. Workload is not sized.

## Summary

This agent is not a chatbot bolted onto the inbox. It is a redesign of how enquiries are answered. The outcome is the unit of design. The officer's role changed. Decision rights are explicit. Evaluation is the currency of approval. If the agent were switched off, the service would have to rehire and re-sequence.

That is what AI-native looks like for a public agency.
