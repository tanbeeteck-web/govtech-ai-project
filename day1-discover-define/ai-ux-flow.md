# AI user flow: An officer opens a ServiceSG enquiry and sees a drafted first reply.

**Scenario:** A · ServiceSG enquiry response

All data in this file is synthetic.

## The moment

An officer opens a ServiceSG enquiry and sees a drafted first reply.

## The iceberg

### Above the line: what the user sees

The draft reply, the policy passage it cites next to each line, and Approve, Edit and Restore original buttons.

### Below the line

- Data: Synthetic enquiries (made up) and the public policy pages.
- Model: A language model that drafts the reply and cites the passage it used.
- Rules: No fees, dates or deadlines unless the cited page states them. Never send without an officer.
- Handoffs: Enquiries below the confidence threshold go to an officer with no draft.

## The flow

1. **Trigger:** A resident sends an enquiry to the shared inbox.
   - Trust gap: none
2. **AI step:** Drafts a first reply and cites the policy page for each line.
   - Trust gap: Hallucination. The draft states a fee the policy page does not mention.
3. **Human check:** The officer reads the draft next to the cited passage, edits it, then approves.
   - Trust gap: Black box. The officer cannot see which passage a sentence came from.
4. **Outcome:** The resident gets the reply. The officer's edits are logged.
   - Trust gap: Control. The officer cannot undo an AI change to their own wording.

## Fallback when the AI is unsure (Advanced)

Below the confidence threshold, no draft. The enquiry goes to an officer with the three closest policy pages.

## How we measure trust (Expert)

Accept rate: the share of drafts officers send with no edit or only a light edit (50% or less of the text changed), checked weekly. Target: 8 in 10 by the end of the pilot (made up).

## AI-UX readiness

**Scenario:** A · ServiceSG enquiry response
**Moment:** An officer opens an enquiry and sees a drafted first reply, with the policy pages it used.
**Level reached:** 1 of 3
**What we ship:** You cannot pass Level 2 yet, so ship a Level-2 UI: a reliable validator the user can check in under three seconds. A reliable validator beats a magical liar.

### Levels

- Level 01 · Trigger Accuracy: Pass. Drafts start only when the enquiry matches a policy topic with at least 90% confidence. Anything else goes to the officer with no draft. (made up)
- Level 02 · System Transparency: Not yet. Each draft cites a policy page, but officers still open the full page to check it. Next: highlight the exact passage next to each line.
- Level 03 · Invisible Integration: Not yet. Track the share of drafts officers rewrite, every week. Until it drops, keep the validator UI.

### Trust gaps

- Black box: The officer cannot see which policy page a sentence came from. Move: An inline citation on every claim, linked to the passage.
- Hallucination: A draft states a fee or a deadline the policy page does not mention. Move: Dotted underline and a draft watermark on low-confidence lines.
- Control: The officer cannot undo an AI change to their own wording. Move: One-click restore original, and every draft editable in place.
