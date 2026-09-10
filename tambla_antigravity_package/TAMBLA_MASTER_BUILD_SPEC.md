# TAMBLA — MASTER REACT NATIVE UI ENGINEERING SPECIFICATION

You are acting as a **Principal React Native Engineer, Senior Mobile Product Designer, Design Systems Engineer and UX Engineer**.

Build the complete mobile UI for a Ugandan ride-hailing application named **Tambla**.

Tambla supports:
- car rides
- boda/motorcycle rides
- deliveries
- passengers
- drivers
- mobile-money-based payments

For this phase, build the **mobile application UI only**. Use realistic mock data where backend integration is not yet available.

---

## 1. PRIMARY DESIGN RULE

The supplied file `reference/Tambla_reference_design.png` is the **visual source of truth**.

It is not loose inspiration. Reverse-engineer it carefully.

Match:
- screen proportions
- content density
- card dimensions
- spacing and margins
- corner radii
- typography hierarchy
- icon sizes and placement
- map placement
- yellow accent usage
- dark/navy surfaces
- white surfaces
- button geometry
- dividers
- avatars
- driver cards
- bottom navigation
- payment rows
- switches
- small labels
- badges
- shadows
- borders
- status indicators
- price hierarchy
- trip timeline presentation

If your personal preference conflicts with the supplied design, **the supplied design wins**.

---

## 2. HUMAN PRODUCT RULE

Tambla must feel like a real application designed by a strong product team.

Avoid unless directly visible in the reference:
- giant gradient cards
- glowing buttons
- glassmorphism
- excessive blur
- decorative blobs
- futuristic AI imagery
- robot mascots
- oversized headings
- excessive corner rounding
- meaningless charts
- random floating actions
- fake crypto-style wallet visuals
- plastic AI portraits
- random emojis
- web-SaaS layouts
- “Powered by AI” copy
- chatbot UI
- unnecessary animation

The product should feel **human, familiar, trustworthy, practical, Ugandan, polished and production-ready**.

---

## 3. TECHNOLOGY

Use:

```txt
React Native
JavaScript
JSX
React Navigation
react-native-safe-area-context
react-native-screens
react-native-svg
Lucide React Native or react-native-vector-icons
React Native Maps
AsyncStorage where local persistence is useful
```

Do not convert the codebase to TypeScript.

Android is the first-class target, while keeping iOS compatibility.

---

## 4. PROJECT STRUCTURE

Use a maintainable structure similar to:

```txt
src/
  assets/
    fonts/
    images/
    icons/
    markers/

  components/
    common/
    cards/
    buttons/
    forms/
    maps/
    ride/
    driver/
    wallet/
    safety/

  screens/
    auth/
    passenger/
    ride/
    driver/
    wallet/
    profile/
    safety/
    support/
    delivery/

  navigation/
    RootNavigator.jsx
    AuthNavigator.jsx
    PassengerNavigator.jsx
    DriverNavigator.jsx

  theme/
    colors.js
    typography.js
    spacing.js
    radius.js
    shadows.js

  data/
    mockDrivers.js
    mockTrips.js
    mockPayments.js
    mockPlaces.js

  hooks/
  utils/
```

Never build the project as one giant `App.jsx` file.

---

## 5. DESIGN SYSTEM

Derive exact values visually from the reference instead of inventing a new brand system.

Core language:
- warm taxi yellow as primary accent
- near-black / dark navy surfaces
- white / off-white backgrounds
- restrained grey borders and helper text
- restrained green for success
- restrained red for danger

Centralize all tokens.

Typography should be compact and mobile-native. Approximate hierarchy:
- hero / monetary amount: 28–34
- screen title: 20–24
- card heading: 15–18
- body: 13–15
- secondary: 12–13
- caption: 10–12

Do not make everything bold.

---

## 6. REUSABLE COMPONENTS

Create and reuse components such as:

```txt
TamblaButton
TamblaOutlinedButton
ScreenHeader
BackHeader
BottomNavigation
DestinationSearch
LocationRow
RideTypeCard
DriverMiniCard
DriverIdentityCard
PriceSummary
PaymentMethodRow
WalletCard
EarningsCard
StatusBadge
TripTimeline
TripHistoryCard
SettingRow
DocumentRow
SupportRow
ProfileAvatar
OfflineState
OnlineToggle
MapMarker
VehicleMarker
PickupMarker
DestinationMarker
SafetyAction
RatingStars
BottomSheet
ConfirmationModal
```

Do not create slightly different versions of the same component without a clear reason.

---

## 7. NAVIGATION MODEL

### Passenger
Bottom navigation:
- Home
- Trips / History
- Wallet
- Profile

### Driver
Provide access to:
- Home
- Earnings
- Trips
- Wallet
- Profile

Do not mix rider and driver actions randomly.

---

# REFERENCE SCREENS — BUILD FIRST

These 10 screens establish the visual truth of Tambla. They must be implemented before broad feature expansion.

## 8. Splash / Welcome

Replicate the supplied composition closely.

Include:
- Tambla branding
- transport visual
- Uganda-oriented positioning
- short ride message
- yellow primary CTA
- dark/outlined secondary Login CTA

## 9. Passenger Home

Include:
- greeting
- “Where are you going?”
- destination search
- Home shortcut
- Work shortcut
- Ride
- Moto
- Delivery
- Tambla promotional card
- popular destinations

Example locations:
- Entebbe International Airport
- Kampala City Centre
- Acacia Mall
- Makerere University
- Ntinda
- Bugolobi
- Muyenga
- Kololo
- Nakawa
- Kira

## 10. Request a Ride

Map on top with a compact lower selection area.

Ride options may include:
- Tambla Standard — 4 seats — Affordable
- Tambla XL — 6 seats
- Tambla Moto — 1 passenger — Fastest
- Tambla Premium — premium vehicles

Each option should show:
- vehicle image/icon
- ETA
- estimated fare
- capacity
- concise descriptor

Show payment method and primary CTA `Request Ride`.

## 11. Track Driver / Driver On The Way

Map-dominant layout.

Include:
- driver on the way
- ETA
- driver photo
- name
- rating
- vehicle
- plate
- Chat
- Call
- Cancel
- route from driver to pickup

## 12. Trip In Progress

Closely match supplied layout.

Include:
- trip status
- elapsed timer
- route map
- driver card
- current location
- destination
- fare
- payment method
- restrained Safety and Share Trip actions

## 13. Driver Home

Use the supplied dark interface as benchmark.

Include:
- Tambla logo
- avatar
- online toggle
- online state message
- today’s earnings
- trip count
- quick actions
- Earnings
- My Trips
- Wallet
- Support
- Settings

## 14. Driver Earnings

Match supplied design closely.

Include:
- this week
- UGX earnings
- trip count
- View details
- weekly subscription
- subscription status
- recent trips

Avoid giant analytics charts.

## 15. Wallet

Match supplied wallet page.

Include:
- balance
- withdraw
- MTN Mobile Money
- Airtel Money
- bank account
- card
- add funds
- top up

## 16. Profile

Follow supplied profile layout.

Include:
- avatar
- name
- rating where relevant
- documents
- vehicle details
- subscription
- support
- settings
- logout

## 17. Offline Mode

Match the supplied dark screen.

Keep it minimal with:
- centered offline/vehicle visual
- clear offline message
- Go Online
- Keep Offline

---

# PASSENGER FLOW EXTENSIONS

All missing screens must use the exact same visual grammar as the reference.

## 18. Destination Search
- pickup
- destination
- current location
- Home
- Work
- recent places
- saved places
- search results
- choose on map

## 19. Select Location on Map
- full-screen map
- draggable pin
- recenter
- address preview
- Confirm Pickup

## 20. Fare Breakdown
- base fare
- distance
- estimated duration
- booking/service fee
- discount if applicable
- total

Use UGX formatting such as `UGX 12,000`.

## 21. Choose Payment Method
Priority order:
- MTN Mobile Money
- Airtel Money
- Cash
- Tambla Wallet
- Debit/Credit Card

## 22. Searching for Driver
- map
- subtle search state
- selected ride
- fare
- pickup
- destination
- cancel request

Avoid futuristic radar effects.

## 23. Driver Found
- photo
- name
- rating
- ride count
- vehicle
- plate
- ETA
- pickup
- destination
- fare
- Message
- Call
- Cancel

## 24. Driver Arrived
- driver has arrived
- vehicle info
- plate
- driver photo
- pickup PIN
- Call
- Message

## 25. Safety Toolkit
Restrained bottom sheet:
- emergency assistance
- share trip
- trusted contacts
- report safety issue
- trip details

## 26. Share Trip
- driver
- vehicle
- plate
- pickup
- destination
- trip status
- ETA
- Share

## 27. Trip Completed
- arrival confirmation
- amount
- payment method
- distance
- duration
- pickup
- destination
- Rate your trip

## 28. Rate Driver
- driver photo
- 5-star rating
- feedback chips
- optional note
- optional tip
- Submit

Suggested chips:
- Great driving
- Clean car
- Friendly
- Safe driving
- Easy pickup

## 29. Trips
Tabs:
- Past
- Upcoming
- Cancelled

Cards show:
- date
- pickup
- destination
- driver
- vehicle
- fare
- status

## 30. Trip Details
- route preview
- receipt
- date/time
- pickup
- destination
- driver
- car
- payment method
- fare breakdown
- support
- report issue
- share/download receipt

## 31. Schedule Ride
- pickup
- destination
- date
- time
- ride type
- payment method
- estimated fare

## 32. Upcoming Ride
- booking details
- Modify
- Cancel

---

# WALLET AND PAYMENTS

## 33. Top Up Wallet
Preset amounts:
- UGX 5,000
- UGX 10,000
- UGX 20,000
- UGX 50,000
- Other

Sources:
- MTN MoMo
- Airtel Money
- Card

## 34. Transaction History
Types:
- Ride
- Wallet top-up
- Refund
- Withdrawal
- Promotion
- Tip

## 35. Transaction Details
Simple polished receipt layout.

---

# PASSENGER PROFILE / SETTINGS

## 36. Passenger Profile
- photo
- name
- phone
- email
- saved places
- payment methods
- safety
- notifications
- help & support
- settings
- legal
- logout

## 37. Edit Profile

## 38. Saved Places
- Home
- Work
- Add place

## 39. Settings
- language
- notifications
- privacy
- location permissions
- accessibility
- appearance
- account security

Keep the screen restrained.

---

# SUPPORT

## 40. Help Centre
Categories:
- Trips
- Payments
- Safety
- Account
- Driver issue
- Lost item
- Promotions
- Other

## 41. Support Conversation
Human customer support ticket/chat interface. Do not style it as an AI assistant.

## 42. Lost Item
- select trip
- describe item
- contact driver
- submit report

---

# DELIVERY

## 43. Delivery Home
## 44. Sender Details
## 45. Receiver Details
## 46. Parcel Details
- package type
- weight category
- notes
- fragile toggle

## 47. Delivery Quote
- pickup
- drop-off
- delivery type
- price
- ETA
- payment

## 48. Delivery Tracking
Use the same map/driver design grammar.

## 49. Delivery Completion / OTP
Recipient verification state.

---

# DRIVER CORE FLOW

## 50. Incoming Ride Request
Map + bottom card:
- pickup distance
- pickup location
- destination
- trip distance
- estimated time
- estimated earnings
- payment method
- Decline
- Accept

Use sensible countdown behavior.

## 51. Driver Navigating to Pickup

## 52. Driver Arrived at Pickup
- notify passenger
- call
- message
- start trip

## 53. Start Trip Confirmation

## 54. Driver Trip in Progress
- map
- destination
- navigation
- safety
- end trip

## 55. Driver End Trip
- fare summary
- payment confirmation
- passenger rating

---

# DRIVER EARNINGS / WALLET

## 56. Earnings Details
Tabs:
- Today
- Week
- Month

Show:
- gross fares
- Tambla fees
- tips
- bonuses
- net earnings
- trips
- online hours

Only use simple data visualization if it genuinely helps.

## 57. Driver Trip History
## 58. Driver Trip Detail
## 59. Driver Wallet
## 60. Withdraw Funds
Destinations:
- MTN Mobile Money
- Airtel Money
- Bank

## 61. Withdrawal Confirmation

---

# DRIVER PROFILE / OPERATIONS

## 62. Driver Profile
- photo
- name
- rating
- role
- documents status
- vehicle details
- subscription
- support
- settings
- logout

## 63. Driver Documents
- National ID
- Driving Permit
- Profile Photo
- Vehicle Logbook
- Insurance
- Inspection

Statuses:
- Verified
- Pending
- Expiring
- Rejected

## 64. Vehicle Details
## 65. Subscription
## 66. Demand / Busy Areas
Use restrained heat visualization, not neon analytics.

## 67. Scheduled Ride Requests

---

# AUTHENTICATION / ONBOARDING

## 68. Phone Number Login
Default country prefix `+256`.

## 69. OTP Verification

## 70. Passenger Registration
- first name
- last name
- email optional
- phone

## 71. Driver Application Intro
## 72. Driver Personal Information
## 73. Driver Vehicle Information
## 74. Driver Document Upload
## 75. Driver Application Review
## 76. Driver Application Approved

---

# PERMISSIONS

Use human explanation screens before native permission dialogs.

## 77. Location Permission
## 78. Notification Permission
## 79. Camera Permission

Do not fake operating-system permission dialogs.

---

# SYSTEM / EDGE STATES

## 80. Empty Trip History
## 81. No Drivers Available
## 82. Payment Failed
## 83. Ride Cancelled
## 84. Driver Cancelled
## 85. Weak GPS
## 86. No Internet
## 87. Server Error
## 88. Account Restricted
## 89. Outside Service Area
## 90. Mobile Money Pending
## 91. Mobile Money Successful

Keep these screens simple and consistent.

---

## 92. UGANDA-FIRST CONTEXT

Use realistic locations such as:
- Kampala
- Entebbe
- Wakiso
- Ntinda
- Kololo
- Muyenga
- Bugolobi
- Nakawa
- Kira
- Makindye
- Acacia Mall
- Makerere University
- Entebbe International Airport

Currency: `UGX`

Phone prefix: `+256`

Payment priority:
- MTN Mobile Money
- Airtel Money
- Cash
- Tambla Wallet
- Card

Ride categories:
- Car
- Moto/Boda
- Delivery

Do not add excessive flags, cultural motifs or stereotypes. Localization should feel natural and functional.

---

## 93. MAP SYSTEM

Create reusable map states for:
- current location
- pickup
- destination
- driver
- route
- searching
- approaching
- trip in progress
- courier

Markers should be compact and consistent with the reference.

Do not cover most of the map with decorative cards.

---

## 94. BOTTOM SHEETS

Use natural mobile sheets for ride flows:
- drag handle
- rounded top corners
- subtle shadow
- safe-area handling
- keyboard awareness
- sensible snap points

Do not make every sheet oversized.

---

## 95. MOTION

Acceptable:
- sheet transitions
- map marker movement
- button press feedback
- navigation transitions
- restrained status pulse
- online toggle
- skeleton loading

Avoid:
- constant bouncing
- glow
- particle effects
- cinematic transitions
- decorative spinning

Motion should communicate state, not decorate it.

---

## 96. ACCESSIBILITY

Implement:
- 44px+ touch targets
- strong text contrast
- dynamic text tolerance
- screen-reader labels
- disabled states
- validation/error states
- safe area support
- keyboard avoidance

---

## 97. RESPONSIVENESS

Test at least:
- 360×800
- 390×844
- 412×915
- 430×932

Do not hardcode entire screens to one screenshot size.

Preserve the reference proportions intelligently.

---

## 98. MOCK DATA QUALITY

Do not use:
- John Doe
- Jane Smith
- Lorem ipsum
- 123 Main Street
- dollar amounts

Use realistic examples such as:
- Musa Ssebufu
- rating 4.8
- Toyota Corolla
- plate UAX 123Z
- Ntinda → Kampala City Centre
- UGX 12,000

---

## 99. HUMAN IMAGE RULE

Use supplied photography or neutral placeholders.

Do not generate plastic-looking AI humans, 3D cartoon people or robot imagery.

---

## 100. ENGINEERING QUALITY

Code as though Tambla will eventually serve hundreds of thousands of users.

Expect:
- clear navigation architecture
- reusable components
- centralized design tokens
- no duplicated styles without reason
- predictable state handling
- loading / empty / error states
- performant lists
- performant maps
- accessible controls
- minimal unnecessary dependencies
- clean naming
- maintainable files

---

## 101. VISUAL QA LOOP

After every major screen, compare it against `reference/Tambla_reference_design.png`.

Ask:
- Does spacing match?
- Is card height correct?
- Are buttons the right height?
- Is typography too large?
- Are icons too prominent?
- Is the UI too rounded?
- Is the map proportion correct?
- Is yellow overused?
- Are dark surfaces correct?
- Does it look like a real consumer app?

Do not rely on memory after viewing the screenshot once. Keep checking it.

---

## 102. DO NOT HALLUCINATE INTO EXISTING SCREENS

If a new feature is not visible in the supplied screen, add it on a new screen or natural secondary action.

Do not destroy existing reference screens by squeezing extra functionality into them.

Do not turn Home into a super-app dashboard with 20 unrelated services.

---

## 103. DEFINITION OF DONE

A screen is finished only when:
1. it follows the supplied visual language
2. alignment is deliberate
3. typography hierarchy is correct
4. spacing feels handcrafted
5. interactions make sense
6. relevant loading/error/empty states exist
7. components are reusable
8. Android behavior is stable
9. no obvious AI-generated appearance exists
10. another senior engineer could maintain the implementation

---

## FINAL EXPECTATION

Do not approach this as “generate 90 screens.”

Approach it as:

**Engineer one coherent mobile transportation product with a complete, connected set of production-quality UI states.**

Every screen must feel like it came from the same Tambla design team.

The supplied design remains the permanent visual north star.

Do not redesign it.
Do not modernize it away from its identity.
Do not make it futuristic.
Do not make it generic.
Do not make it AI-looking.

**Engineer Tambla.**
