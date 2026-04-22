# Implementation Plan (Phased)

## Status

- **State:** To Be Built
- **Planning mode:** Execution-ready draft

## Phase 0: Discovery and constraints (1-2 weeks)

### Outcomes

- confirm pilot institution personas and CRA officer reviewers
- finalize v1 scope boundaries and legal disclaimer placement
- lock role model and approval workflow

### Deliverables

- approved scope/non-goal statement
- field dictionary draft
- data retention baseline decision

## Phase 1: Foundations (2-4 weeks)

### Build

- activity + location capture extensions
- geocode service abstraction
- year-aware tract context schema
- RBAC and separation of duties
- immutable audit event logging

### Exit criteria

- users can create activity records with geocode context
- reviewer roles are enforced
- all record edits are logged immutably

## Phase 2: Evidence and readiness (2-4 weeks)

### Build

- evidence upload/version metadata
- completeness engine
- review states and approval controls
- "responses needed" operational queue support for follow-up workflows

### Exit criteria

- records receive completeness status automatically
- only permitted roles can approve records as exam-ready

## Phase 3: Exports and synthesis (2-4 weeks)

### Build

- CRA-support activity register export (CSV)
- summary packet export (PDF)
- narrative helper v1 (structured synthesis fields)

### Exit criteria

- CRA officer can produce review package without manual spreadsheet rebuild

## Phase 4: Hardening and pilot rollout (2-3 weeks)

### Build

- validation and exception queues
- override reason guardrails
- performance tuning for batch record operations
- pilot feedback loop and UI refinements

### Exit criteria

- pilot institutions complete one end-to-end reporting cycle on module

## Definition of done (module level)

- clear in-scope/out-of-scope messaging in product UI
- stable role-based workflows
- auditable, exportable evidence lifecycle
- documented operational playbook for support and onboarding
