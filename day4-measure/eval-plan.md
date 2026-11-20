# Eval plan · ServiceSG enquiry drafting agent

**Scenario:** A · ServiceSG enquiry response

**Status: Decided (2026-11-20).** The learner decided every part of this file on 2026-11-20. Two decisions were made first: a full run once a month with a weekly run of the deal-breaker cases, and the business owner as the second checker of the project owner's sign-off. The rest was accepted as written.

All enquiries, residents, policy pages, fees, dates and numbers are made up. Job roles only, no names of people.

This file says who owns the eval, when it runs, how we will know the agent is working, and what the first 30 days look like. It uses the roles in `day3-build/operating-model.md`, the pass bar in `day4-measure/human-rubric.md`, the first run in `day4-measure/eval-results.md`, and the goal, success line and stop line in `one-pager.md`.

**The agent is not built.** There is no model, tool or real pilot. The only eval run so far is a hand run of the 24 cases, scored by one grader (see `eval-results.md`, "Limits"). This plan describes how the eval will be run once there is an agent. Every number comes from an earlier file or is marked as a new proposal.

## Who owns what

| Job | Role | Why this role | Mark |
|---|---|---|---|
| **Signs the pass bar** (the thresholds in `human-rubric.md`, and the call "pass" or "fail" after each run) | **Project owner** | The operating model already gives the project owner the success, fail and kill thresholds, and the go-live decision. The ServiceSG team reviews. **The business owner checks and countersigns every sign-off (Decided 2026-11-20).** | Decided |
| **Writes the test cases** (`eval-cases.md`) | **Knowledge base lead** writes the policy facts and the expected answers. **Supervisor** checks that each enquiry sounds like a real one. | The knowledge base lead owns the 15 policy pages. The supervisor knows what officers receive. | Decided |
| **Refreshes the test cases** | **Knowledge base lead**, on every policy change and every wrong-citation flag. **Supervisor**, when a real enquiry exposes a failure no case covers (add EV-25 and on). | Policy changes and flags already go to the knowledge base lead. | Decided |
| **Runs the eval** (gets the answers and records the version tested) | **Engineering team** | They build and run the agent. | Decided |
| **Grades the answers** | Two graders, working alone: the **knowledge base lead** (knows the pages) and an **officer**. Neither is the person who produced the answers. The **supervisor** breaks a tie, or the knowledge base lead if the supervisor is one of the two graders. | Matches "Who grades" in the rubric. The first run broke this rule, because the same hand wrote and scored the answers. | Decided |
| **Reviews the weekly sample** | **Supervisor**: the 5% of sent replies, checked against the cited passages. Each wrong one goes to the knowledge base lead and counts towards the limit of 2 wrong citations a week. | Already the supervisor's job in the operating model. | Decided |
| **Reads the weekly numbers** | **ServiceSG team** (project owner, supervisor, knowledge base lead, Product Ops specialist), at least once a week | Already their job in the operating model. | Decided |
| **Acts on a stop** | **Product Ops member on duty**, within 3 hours. One other ServiceSG team member approves a restart. | The operating model's Incident row. | Decided |

**A check on one person holding two jobs.** The project owner both signs the pass bar and is in the team that reads the numbers. That is the same question as item 6 in the operating model. **Decided 2026-11-20:** the business owner is the second checker. The project owner's pass or fail call after each run is not final until the business owner countersigns it. If the two disagree, the stricter call stands and the business owner says why in the results file. The business owner is also told of every fail and every stop, as already decided. Item 6 in the operating model can be closed on this basis.

## When it runs

Two kinds of run. A **full run** is all 24 cases, every variant, two graders. A **weekly run** is smaller, so someone will do it.

| When | What runs | Who | Mark |
|---|---|---|---|
| **Before go-live** | One full run on the real agent, not a hand run. Calibrate the two graders first. All six test questions in `one-pager.md` pass. The pass bar is met with no deal-breaker failed. EV-21 is run on the real agent, with 10 similar enquiries. Go-live also needs the other gates in `one-pager.md`. | Engineering team runs. The graders grade. The project owner signs. | Decided |
| **Before every change** | One full run, and the result is compared with the last run. A change means: a new model or version, any edit to `day3-build/CLAUDE.md` or `day2-validate/context-skill.md`, a new or changed tool, a new colour or threshold. **No change goes live while a deal-breaker case fails.** | Engineering team runs. The project owner signs. | Decided |
| **Every week (Decided 2026-11-20)** | (1) The supervisor's 5% audit of sent replies. (2) A short run of the 19 deal-breaker cases on the live agent, scored by one grader. (3) The ServiceSG team reads the numbers in "How I'll know it's working". | Supervisor, engineering team, one grader, the ServiceSG team | Decided |
| **When policy changes** | The daily check stops the agent when a cited page changes. After the knowledge base lead has reviewed the change, the cases for that page are refreshed and run, then a restart is approved. The cases for the other 14 pages run too if the change affects shared wording. | Knowledge base lead refreshes. Engineering team runs. | Decided |
| **Every month (Decided 2026-11-20)** | A full run, and also when two graders disagree on more than 1 in 5 answers (calibrate again first). | Same as a full run | Decided |

**Rubric.** `human-rubric.md` ("When to run") now says the same: a full run once a month and a weekly run of the deal-breaker cases. Decided 2026-11-20.

**Why the weekly run is smaller.** A full run needs two graders for 24 cases, plus variants. That is too much to ask every week. The deal-breaker cases are the ones that cause public harm, so those run weekly.

## How I'll know it's working

**The goal** (from `one-pager.md`): residents get a correct first reply within one working day.

**The baseline** (made up, from `one-pager.md`; replace with a real figure before a pilot):
- 70% of enquiries answered within SLA, against a target of 90% within one working day.
- First reply takes 2 days on average.
- 12 minutes per policy search.
- Officer quality, from `data/officer-baseline.csv`: of 100 made-up officer replies, 77 cite the renewal policy, 7 different deadline wordings, 5 wrong (14 days). This is the baseline for consistency (EV-21).

**The target and the review date**
- **Target** (from `one-pager.md`): 8 in 10 drafts sent with no edit or a light edit in a two-week pilot, and at least 4 of 5 officers comfortable. Below 7 in 10 is a fail. In between means run more before deciding.
- **Target for the goal:** SLA from 70% to 90% within one working day. This is the goal's own target. It is measured after the pilot, not in it.
- **Quality target** (from the rubric): no deal-breaker failed. Q4 and Q5 average 4 or more. At least 80% of drafts score 4 or more on Q4.
- **Review date** *(Decided 2026-11-20)*: **Day 14** after go-live is the pilot read-out, and **Day 30** after go-live is the decision to continue, pivot or stop. Both are set as calendar dates by the project owner when go-live is approved. Before that, no date is fixed.

**A usage metric** *(Decided 2026-11-20)*: **the share of drafts an officer sent after no edit or a minor edit** (a minor edit is 50% of the text or less changed). It is both the success measure and the usage measure in `one-pager.md`. Read it with its companion: the share of enquiries where a draft was offered and an officer opened it. If officers do not open drafts, the first number means nothing.

**The pattern to watch first: rubber-stamping.** *(Decided 2026-11-20)* This is the risk the sponsor named in `build-log.md`. Watch for a high share of drafts sent unchanged **with falling time between opening and approving**, especially on drafts that carry blue items. The agent counts flagged drafts accepted in a row (the streak starts at 5) and reminds the officer. The ServiceSG team looks at the streak counts weekly. A rising unchanged share is good news only when the supervisor's 5% audit finds no more wrong citations. If the unchanged share rises and the audit finds wrong ones, rubber-stamping has started. Watch it before anything else, because it is how a wrong draft reaches a resident.

**The stop line** (from `one-pager.md` and the operating model). Stop if any is true:
- More than 2 wrong citations reach residents in a week. The agent disables itself until reviewed.
- A reply goes out without an officer, or a real resident detail appears.
- A cited policy page changes or is withdrawn (the daily check).
- The policy search fails for 3 enquiries in a row.
- 3 of 5 officers reject or majorly edit more than half of their drafts (can trip early).
- After 5 officers each rate 3 or more drafts: fewer than 3 of 5 are comfortable, or more than 50% of all drafts are rejected.

**From the eval:** one failed deal-breaker case in a weekly run is treated as a stop for the change that caused it, and the project owner decides whether the agent also stops.

## First 30 days

The agent is not built, so day 1 here means the day a real agent is available to test. Counted from that day. All steps Decided (2026-11-20).

| Days | What happens | Who |
|---|---|---|
| **Before day 1** | Fix the open gaps the first run found: "word for word", what is blue, who sees hand-offs, no next step for no-draft results, requests for other residents' information (see `eval-results.md`, "Gaps"). Confirm the working readings in `human-rubric.md`. | Project owner decides. Knowledge base lead and supervisor consulted. |
| **Days 1 to 3** | Calibrate the two graders on the 10 calibration answers. Do not start real grading until the calibration bar is met. Record the version tested (repo commit, the date of each of the 15 policy pages). | Graders. Engineering team. |
| **Days 4 to 7** | First full run on the real agent, all 24 cases, no editing of its output. Compare with the hand run in `eval-results.md` and say plainly that a hand run and a real-agent run are not like for like. Fix every deal-breaker failure and run again. EV-21 is run for the first time. | Engineering team runs. Graders grade. Project owner signs. |
| **End of week 1** | Go-live decision, only if the pass bar is met and the other gates in `one-pager.md` are met. If not met, repeat. | Project owner decides. |
| **Days 8 to 14** | Two-week pilot with 5 officers begins. Weekly run starts. Supervisor's 5% audit starts. ServiceSG team reads the numbers. The rubber-stamp streak and the 28 days are set. | Supervisor, ServiceSG team |
| **Day 14** | Pilot read-out against the target: 8 in 10 drafts sent or lightly edited, 4 of 5 officers comfortable. Fail below 7 in 10. In between: run more officers or enquiries. | Project owner, with the ServiceSG team |
| **Days 15 to 28** | Weekly runs continue. Add any new case that a real enquiry exposed. Refresh cases for any policy change. | Knowledge base lead, supervisor, engineering team |
| **Day 28** | Second full run, compared with the first. Calibrate again if the graders disagree on more than 1 in 5 answers. | Engineering team, graders |
| **Day 30** | Decision: continue, pivot or stop, as in `one-pager.md`. Write the result of the 30 days and the next review date. | Project owner. Business owner told. |

## What this plan does not settle

- **A real pilot is not run.** All baselines are made up. The 70% SLA must be replaced with a real figure first.
- **The review dates.** They are counted from go-live, because no go-live date exists.
- **Who checks the project owner's sign-off.** See "Who owns what".
- **Who sees hand-offs and who investigates an incident.** Both are open in the operating model.
- **Data protection, security and budget roles.** Open in the operating model, items 1 and 2.
