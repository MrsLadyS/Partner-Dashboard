# Open Questions and Risks

## Status

- **State:** To Be Built
- **Purpose:** Decision log starter before engineering kickoff

## Open questions

1. **Pilot governance**
   - who are the named CRA officer/compliance reviewers for first pilot institutions?

2. **Geocode pipeline**
   - what internal geocoder + reference data process is selected for production?
   - what is the fallback path when address matching is ambiguous?

3. **Year/version alignment**
   - how will reference-data vintage be pinned by activity/report year?

4. **Exam-ready threshold**
   - which required fields and evidence artifacts define exam-ready by default?
   - will thresholds be institution-configurable in v1 or v2?

5. **State framework coverage**
   - federal-only in v1, or include specific state-level framework overlays?

6. **Multi-institution attribution**
   - can one activity be credited across multiple sponsoring institutions in v1?

7. **Credit union mode**
   - what default terminology and reporting mode applies to CU prospects?

## Risks

### R1: Overclaim risk in sales or UI copy

- **Impact:** procurement/legal pushback
- **Mitigation:** fixed disclaimer text in header, exports, and onboarding

### R2: Geography mismatch risk

- **Impact:** weak examiner defensibility
- **Mitigation:** year-pinned context, override reason required, validation queue

### R3: Incomplete evidence capture

- **Impact:** low utility at exam-prep time
- **Mitigation:** completeness engine + workflow gates + nudges

### R4: Role-control gaps

- **Impact:** compliance rejection during security/procurement review
- **Mitigation:** separation-of-duties RBAC in Phase 1

### R5: Retention policy mismatch

- **Impact:** records unavailable for requested exam windows
- **Mitigation:** configurable retention policy with defaults and admin controls

## Decision log template

Use this format for each resolved item:

- **Decision ID:** `CRA-DEC-###`
- **Date:**
- **Owner:**
- **Decision:**
- **Alternatives considered:**
- **Reasoning:**
- **Impacted docs/files:**
