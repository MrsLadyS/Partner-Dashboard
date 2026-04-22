# Architecture and Data Model (Draft)

## Status

- **State:** To Be Built
- **Type:** Proposed architecture baseline

## System Overview

The CRA Support Module extends current dashboard functionality with compliance-support records and workflows.

High-level components:

1. **Activity Intake Layer**
   - captures event/program metadata and location
2. **Geocode + CRA Context Layer**
   - computes tract-level geography and year-aware context fields
3. **Evidence Layer**
   - stores supporting documents and completeness markers
4. **Review and Approval Layer**
   - role-based workflows and immutable audit history
5. **Reporting/Export Layer**
   - CRA-support operational outputs for officer review

## Integration posture for geocoding

- Use internal geocoding + curated reference data pipeline for reliability.
- Provide optional external validation link to FFIEC Geomap for human verification.
- Do not hard-depend on external interactive UI availability for core workflows.

## Proposed Entity Set

### `activities`

- base outreach record
- owner institution and program metadata
- activity date and reporting year
- canonical location fields

### `activity_geocodes`

- geocode outputs: state/county/MSA-MD/tract
- lat/lng and geocode quality state
- geocode source and report-year provenance

### `activity_cra_context`

- assessment area in/out flag
- tract income level and mfi percentage
- distressed/underserved flags where applicable
- CD category mapping
- responsiveness context fields

### `activity_evidence`

- per-record evidence documents
- document type and version metadata
- uploader and timestamp metadata

### `review_actions`

- reviewer assignments, statuses, notes
- approval gate and exam-ready state transitions

### `audit_log`

- immutable event trail for create/update/override/approve/export actions
- actor identity, timestamp, and reason fields

## Required role model (v1)

- **Marketing/Program User:** create and submit records
- **CRA Officer:** verify context, approve readiness
- **Compliance Reviewer:** final review and controls
- **Executive Viewer:** read-only dashboards and exports

## Completeness Rule Engine (v1)

A record cannot be marked exam-ready unless required fields exist:

- activity date/year
- address and geocode outputs
- CRA context classification fields
- minimum evidence artifacts
- reviewer assignment and approval trail

## Data governance requirements

- retention configuration (institution policy-based)
- soft-delete policy with recoverability
- explicit override reason requirements for tract changes
- export logs retained for audit traceability
