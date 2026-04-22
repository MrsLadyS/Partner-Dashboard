# CRA Support Module Charter (To Be Built)

## Status

- **State:** To Be Built
- **Product Surface:** Community Engagement Command Center
- **Module Name (working):** CRA Support Module / CRA Geocode Reference
- **Priority:** High (enterprise/compliance enablement)

## Purpose

Build a CRA-support evidence layer that helps financial institutions document community engagement activity in a way that is easier for CRA officers and compliance teams to review, synthesize, and export.

This module is intended to reduce exam-prep friction, not replace regulatory interpretation.

## Problem Statement

Financial institutions currently spread CRA-relevant outreach evidence across spreadsheets, emails, shared drives, and manual geocoding steps. This causes:

- inconsistent geography tagging (AA/LMI context)
- missing or late evidence attachments
- weak audit defensibility
- high manual effort to produce review packets and narratives

## Product Positioning

The CRA capability should remain under the **Command Center umbrella** as one module among broader engagement intelligence functions.

### Site/subdomain reasoning

Use a command-center umbrella approach (for example, `command.moneyling.com`) rather than a CRA-only identity:

- preserves broader enterprise story beyond compliance
- avoids narrowing perception to a single bank-specific use case
- keeps credit union and non-CRA audiences comfortable
- aligns with current Community Engagement Command Center framing

## Core Principles

1. **Support, don’t overclaim:** No legal interpretation or official CRA rating engine.
2. **Evidence-first:** Every trackable activity should be audit-defensible.
3. **Year-aware geography:** CRA context must match activity/report year.
4. **Separation of duties:** Marketing logs, CRA/compliance reviews, leadership consumes.
5. **Explainability:** Every classification and override should be traceable.

## Success Criteria (v1)

- Activity records can be geocoded and tract-classified with year context.
- CRA officers can verify/override and approve records with immutable audit trail.
- Evidence completeness can be measured and gated before exam-ready status.
- Teams can export review-ready packet data (CSV/PDF) without rebuilding manually.
