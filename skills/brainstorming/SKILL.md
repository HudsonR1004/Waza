---
name: brainstorming
description: Explores user intent, requirements and design before implementation. Use before any creative work - creating features, building components, adding functionality, or modifying behavior.
when_to_use: brainstorm, let's think through this, help me plan, I want to build, design this, what should I make, how should I approach
metadata:
  version: 1.0.0
  source: obra/superpowers
---

# Brainstorming: Turn Ideas Into Designs

You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation.

Help turn ideas into fully formed designs and specs through natural collaborative dialogue. Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you are building, present the design and get user approval.

Do NOT write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it.

## Anti-Pattern: "This Is Too Simple To Need A Design"

Every project goes through this process. A todo list, a single-function utility, a config change - all of them. "Simple" projects are where unexamined assumptions cause the most wasted work. The design can be short, but you MUST present it and get approval.

## Checklist

Complete these in order:

1. Explore project context - check files, docs, recent commits
2. Offer visual companion (if topic will involve visual questions) - this is its own message
3. Ask clarifying questions - one at a time, understand purpose/constraints/success criteria
4. Propose 2-3 approaches - with trade-offs and your recommendation
5. Present design - in sections scaled to their complexity, get user approval after each section
6. Write design doc - save to docs/superpowers/specs/YYYY-MM-DD-topic-design.md and commit
7. Spec self-review - quick inline check for placeholders, contradictions, ambiguity, scope
8. User reviews written spec - ask user to review the spec file before proceeding
9. Transition to implementation - invoke writing-plans skill to create implementation plan

## The Process

### Understanding the idea

Check out the current project state first (files, docs, recent commits). Before asking detailed questions, assess scope: if the request describes multiple independent subsystems, flag this immediately. If the project is too large for a single spec, help the user decompose into sub-projects.

For appropriately-scoped projects, ask questions one at a time to refine the idea. Prefer multiple choice questions when possible. Only one question per message. Focus on understanding: purpose, constraints, success criteria.

### Exploring approaches

Propose 2-3 different approaches with trade-offs. Present options conversationally with your recommendation and reasoning. Lead with your recommended option and explain why.

### Presenting the design

Once you believe you understand what you are building, present the design. Scale each section to its complexity. Ask after each section whether it looks right so far. Cover: architecture, components, data flow, error handling, testing.

Design for isolation and clarity: break the system into smaller units with one clear purpose, communicate through well-defined interfaces, and can be understood and tested independently.

### Working in existing codebases

Explore the current structure before proposing changes. Follow existing patterns. Where existing code has problems that affect the work, include targeted improvements as part of the design. Do not propose unrelated refactoring.

## After the Design

### Documentation

Write the validated design spec to docs/superpowers/specs/YYYY-MM-DD-topic-design.md and commit the document to git.

### Spec Self-Review

After writing the spec document, look at it with fresh eyes:

- Placeholder scan: Any TBD, TODO, incomplete sections, or vague requirements? Fix them.
- Internal consistency: Do any sections contradict each other?
- Scope check: Is this focused enough for a single implementation plan?
- Ambiguity check: Could any requirement be interpreted two different ways? Pick one and make it explicit.

### User Review Gate

After the spec review loop passes, ask the user to review the written spec:

"Spec written and committed to PATH. Please review it and let me know if you want to make any changes before we start writing out the implementation plan."

Wait for the user's response. Only proceed once the user approves.

### Implementation

Invoke the writing-plans skill to create a detailed implementation plan.

## Key Principles

- One question at a time - Do not overwhelm with multiple questions
- Multiple choice preferred - Easier to answer than open-ended when possible
- YAGNI ruthlessly - Remove unnecessary features from all designs
- Explore alternatives - Always propose 2-3 approaches before settling
- Incremental validation - Present design, get approval before moving on
- Be flexible - Go back and clarify when something does not make sense

## Visual Companion

When you anticipate that upcoming questions will involve visual content (mockups, layouts, diagrams), offer it once for consent:

"Some of what we are working on might be easier to explain if I can show it to you in a web browser. I can put together mockups, diagrams, comparisons, and other visuals as we go. Want to try it?"

This offer MUST be its own message. Wait for the user's response before continuing.

Per-question decision: Even after the user accepts, decide for each question whether to use visual or text. Use visual for mockups, wireframes, layout comparisons, architecture diagrams. Use text for requirements questions, conceptual choices, tradeoff lists.

## Gotchas

| Situation | Rule |
|---|---|
| Project has multiple independent subsystems | Decompose first, brainstorm each sub-project separately |
| User says "just build it, it is simple" | Still present a short design and get approval |
| Design gets approved verbally | Write the spec doc and commit before invoking writing-plans |
| User asks for code during brainstorming | Redirect: finish the design first |
