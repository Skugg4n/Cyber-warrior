### **AEGIS: Game Systems Manual v1.0**

This document provides a detailed explanation of the core gamification systems within the AEGIS Protocol application. It is intended to be a reference for the development team.

### **System 1: The** //WARDING\_FIELD

* **Concept:** A defensive mini-game that rewards consistency and provides a global bonus. It represents the Anomaly's need to protect itself from hostile entities in cyberspace.  
* **Unlock Condition:** Unlocks at Operator Level 10\.

#### **Mechanics:**

1. **Field Integrity (Health):**  
   * The Warding Field has a health value from 0% to 100%, stored in the user's state.  
   * This value must be displayed prominently on the //WARDING\_FIELD screen, ideally with a large ASCII progress bar.  
2. **Integrity Decay (The Challenge):**  
   * The Field's Integrity constantly decays over time, even when the app is closed.  
   * **Implementation:** When the app loads, compare the current time to a last\_login\_timestamp stored in the user's data. Calculate the hours passed and apply the decay.  
   * **Suggested Rate:** \-0.25% per hour (equivalent to \-6% per day). This makes the decay noticeable but not punishingly fast.  
3. **C-Cred Multiplier (The Reward):**  
   * As long as Field Integrity is **above 50%**, a global **\+10% multiplier** is applied to all C-Creds the user earns from any source (set completions, bonuses, etc.).  
   * The UI must clearly indicate when this multiplier is \[ACTIVE\] or \[INACTIVE\].  
4. **Reinforcement (The Solution):**  
   * The //MSG\_BOARD will now feature special \[DEFENSE\] directives.  
   * Completing a \[DEFENSE\] directive restores a significant amount of Field Integrity (e.g., \+25% per directive). This creates a clear gameplay loop: notice decay \-\> perform a defense mission \-\> restore the bonus.


### **AEGIS: Resonance Engine \- Technical Blueprint**
This document provides the detailed, step-by-step technical plan for implementing the //RESONANCE\_ENGINE.

#### **Objective**

To build the core idle-game system where users charge an engine with their workouts to passively generate C-Creds.

### **Part 1: The Foundation (Data & State)**

* **Step 1.1: Update Global State**  
  * **File:** /state/store.js (or your global state management file)  
  * **Action:** Add the following new properties to the main user/operator state object:

```

{
  // ... existing properties like level, xp, cCreds
  baselineWorkCapacity: null, // Will be a number, e.g., 1500
  engine: {
    charge: 0, // Current charge level
    maxCharge: 200, // Starting max charge
    lastUpdated: null, // Timestamp to calculate decay
    components: {
      resonator: { level: 1, multiplier: 0.1 }, // Base output
      injectors: { level: 1, multiplier: 1.0 }, // Input efficiency
      field: { level: 1, decayRate: 1.0 } // Decay rate in Charge/hr
    }
  }
}

```

### **Part 2: The Logic (**/systems/EngineSystem.js**)**

* **Step 2.1: Create the System File**  
  * **Task:** Create a new file: /systems/EngineSystem.js. This file will contain all the pure logic for the engine.  
* **Step 2.2: Implement** calculateBaseline **function**  
  * **Task:** This function is called after a workout is finished during the "Sleeper" phase.  
  * **Pseudo-code:**

```

function calculateBaseline(workoutHistory) {
  // 1. Check if history has at least 5 workouts AND if baseline is already set. If so, do nothing.
  // 2. If not, loop through the last 5 workouts.
  // 3. For each workout, calculate `volume / durationInMinutes`.
  // 4. Average these values.
  // 5. Return the final average. This is the `baselineWorkCapacity`.
}

```

*   
  **Step 2.3: Implement** calculateChargeGained **function**  
  * **Task:** This function is called after a workout is finished during the "AEGIS" phase.  
  * **Pseudo-code:**

```

function calculateChargeGained(workoutStats, baseline, injectorMultiplier) {
  // 1. Calculate this workout's `volume / durationInMinutes`.
  // 2. Calculate `normalizedPerformance = (thisWorkoutPerformance / baseline)`.
  // 3. `chargeGained = normalizedPerformance * 100 * injectorMultiplier`.
  // 4. Return the final charge value.
}

```

*   
  **Step 2.4: Implement** calculateOfflineProgress **function**  
  * **Task:** This function must be called every time the app is loaded in the "AEGIS" phase.  
  * **Pseudo-code:**

```

function calculateOfflineProgress(engineState) {
  // 1. Get the `lastUpdated` timestamp from the engine state.
  // 2. Calculate `hoursPassed` since that timestamp.
  // 3. `chargeDecayed = hoursPassed * engineState.components.field.decayRate`.
  // 4. `cCredsGenerated = hoursPassed * (engineState.charge * engineState.components.resonator.multiplier)`.
  // 5. Return an object: { newCharge, cCredsGenerated }.
  // 6. This function must also update the `lastUpdated` timestamp to now.
}

```

### **Part 3: The Interface (**/features/ResonanceEngineScreen.js**)**

* **Step 3.1: Create the Main Screen**  
  * **Task:** Build the UI for the //RESONANCE\_ENGINE screen. It must be accessible from the main AEGIS menu.  
  * **Data Display:** The screen must display all the relevant data from the engine state object:  
    * A progress bar for charge / maxCharge.  
    * The current decayRate.  
    * The calculated C-Creds / hr output.  
  * **UI Mockup Reference:**

```

+----------------------------------------+
| > //RESONANCE_ENGINE                   |
+----------------------------------------+
|    CHARGE LEVEL:  185 / 200             |
|    [|||||||||||||||||||||||..]           |
|    DECAY RATE: -0.8/hr (Lvl 3 Field)   |
|                                        |
|    CURRENT OUTPUT: 37.0 C-Creds / hr     |
|    (Charge * 0.2 from Lvl 2 Resonator)   |
|                                        |
|    [VIEW COMPONENT UPGRADES]           |
+----------------------------------------+

```

*   
  **Step 3.2: Create the Upgrades Panel**  
  * **Task:** The \[VIEW COMPONENT UPGRADES\] button should open a modal or a new section on the screen.  
  * **Functionality:** This panel should display the three components (Resonator, Injectors, Field). Each component should show its current level and the cost (in C-Creds) for the next upgrade. Clicking \[UPGRADE\] should deduct the C-Creds and update the corresponding component's level and multiplier in the global state. Upgrade costs should increase with each level.

This detailed, step-by-step plan provides a clear and unambiguous path to building the //RESONANCE\_ENGINE.

* 
