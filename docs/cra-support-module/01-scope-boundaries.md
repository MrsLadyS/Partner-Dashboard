# Scope Boundaries and Non-Goals

## Status

- **State:** To Be Built
- **Decision maturity:** Draft baseline for implementation kickoff

## In Scope (v1)

### 1) CRA-support activity tracking

- track workshops/events/outreach activities
- attach date/time/location and program metadata
- maintain institution and assessment-area context

### 2) Geocode and tract context

- address to tract workflow
- state/county/MSA-MD/tract capture
- tract income level and relevant CRA context flags
- year-specific classification rules

### 3) Evidence and review workflow

- evidence upload and record linking
- completeness status (`missing`, `partial`, `complete`, `approved`)
- role-based review and approval flow
- immutable change history for edits/overrides

### 4) CRA-support exports

- activity register export
- summary reporting rollups
- narrative-support inputs (draft-ready structured facts)

### 5) Responsiveness context fields

- community need addressed
- institution priority reference
- partner type/partner role metadata

## Out of Scope (v1)

- formal CRA rating determination
- legal/regulatory interpretation engine
- replacement of examiner judgment
- full lending/investment/service test computation from core banking systems
- direct filing into regulator systems as authoritative submission channel

## Guardrail language (must appear in UI/docs)

"This module supports CRA evidence preparation and reporting workflows. Final CRA interpretation, ratings, and regulatory determinations remain with the institution and its regulators."

## Buyer-risk avoidance

This boundary prevents common overclaim risks:

- claiming automated CRA outcomes
- claiming to replace compliance/legal decisioning
- claiming complete enterprise CRA system-of-record coverage on day one
