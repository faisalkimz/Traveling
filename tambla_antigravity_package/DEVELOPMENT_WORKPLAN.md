# TAMBLA — DEVELOPMENT WORKPLAN

## Goal
Build the Tambla mobile UI in React Native + JavaScript/JSX with the supplied reference image as the permanent visual benchmark.

## Phase 0 — Repository Inspection
Before editing code:
- inspect current repository
- inspect package.json
- identify existing navigation and components
- do not delete working code unnecessarily
- identify whether React Native CLI or Expo is being used
- document major implementation constraints

Deliverable: short implementation note and build plan.

## Phase 1 — Visual Reverse Engineering
Inspect `reference/Tambla_reference_design.png` in detail.

Extract:
- palette
- typography hierarchy
- spacing rhythm
- card radius
- border behavior
- button dimensions
- navigation layout
- map/card proportions
- icon language
- dark vs light screen behavior

Deliverable: centralized theme and UI primitives.

### Acceptance gate
Do not continue until the design tokens visually represent the screenshot.

## Phase 2 — Foundation
Build:
- navigation architecture
- safe area handling
- typography
- spacing
- colors
- shadows
- buttons
- cards
- headers
- bottom navigation
- bottom sheets
- map markers
- reusable list rows
- mock-data layer

Deliverable: reusable Tambla design system.

## Phase 3 — Golden Reference Screens
Implement first:
1. Splash / Welcome
2. Passenger Home
3. Request Ride
4. Track Driver
5. Trip In Progress
6. Driver Home
7. Driver Earnings
8. Wallet
9. Profile
10. Offline Mode

### Acceptance gate
Before proceeding:
- visually compare every screen against the reference
- correct spacing before adding features
- correct typography before adding features
- correct card proportions before adding features
- correct yellow/dark color balance
- correct bottom navigation proportions

These screens become the style authority for all later screens.

## Phase 4 — Passenger Journey
Build the complete connected flow:
- login / OTP
- home
- destination search
- choose location on map
- select ride
- fare breakdown
- payment method
- searching
- driver found
- driver arriving
- arrived
- verification
- trip in progress
- safety
- share trip
- completion
- rating
- trip history
- trip detail

Deliverable: passenger flow that can be navigated end-to-end using mock data.

## Phase 5 — Driver Journey
Build:
- driver auth/onboarding
- driver home
- online/offline state
- incoming request
- accept/decline
- navigation to pickup
- arrival
- start trip
- active trip
- end trip
- earnings
- trip history
- wallet
- withdrawal
- profile
- documents
- vehicle details
- subscription

Deliverable: driver flow navigable end-to-end using mock data.

## Phase 6 — Supporting Product Modules
Build:
- scheduled rides
- delivery flow
- wallet top-up
- transaction history
- saved places
- settings
- notifications settings
- help center
- support ticket/chat
- lost item
- safety toolkit
- trusted contacts/share trip

Deliverable: full UI product coverage.

## Phase 7 — Edge States
Build and connect:
- no drivers
- weak GPS
- offline
- payment failed
- payment pending
- mobile money success
- rider cancellation
- driver cancellation
- outside service area
- server error
- empty lists
- account restricted

Deliverable: realistic non-happy-path UX.

## Phase 8 — Device / Accessibility QA
Test at minimum:
- 360×800
- 390×844
- 412×915
- 430×932

Check:
- safe areas
- scroll behavior
- keyboard overlap
- touch sizes
- font scaling
- long names
- large monetary values
- low-content states
- loading states
- Android back behavior

## Phase 9 — Performance / Cleanup
Review:
- FlatList usage
- memoization only where useful
- map redraws
- image sizing
- navigation duplication
- dead code
- unused dependencies
- duplicated styles
- console warnings

## Phase 10 — Final Visual Audit
Compare every major module to the visual grammar of the golden reference screens.

Reject any screen that:
- looks like a different app
- contains random gradients
- uses oversized text
- uses inconsistent cards
- feels web-like
- looks like AI-generated concept art
- introduces unnecessary colors
- uses unrealistic Ugandan data

## Completion Criteria
The UI phase is complete when:
- all core screens work in navigation
- rider and driver journeys are coherent
- design tokens are centralized
- screen patterns are consistent
- supplied reference screens are reproduced closely
- missing screens feel like they were designed at the same time as the originals
- Android runs without major warnings/errors
- code is clean enough for a senior engineer to continue backend integration later
