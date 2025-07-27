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

### **System 2: The** //RESONANCE\_ENGINE

* **Concept:** The core idle-game mechanic. It's a machine that the user "charges" with their workouts, which then passively generates C-Creds for them over time. It is the engine of long-term, exponential growth.  
* **Unlock Condition:** Unlocks immediately after the "Awakening" event.

#### **Mechanics:**

1. **Baseline Calibration (Sleeper Phase):**  
   * **Implementation:** During the initial "Sleeper" phase, the app must silently log the Total Volume (Weight x Reps x Sets) and Duration of every workout.  
   * After 5 completed workouts, the app calculates the user's Baseline Work Capacity by averaging their Volume / Minute. This single number is then saved permanently to their state. This is a critical, one-time calculation.  
2. **Resonance Charge (The Fuel):**  
   * After the Awakening, every completed workout generates Resonance Charge.  
   * **Calculation:** Charge Generated \= (This Workout's Volume/Minute / User's Baseline Work Capacity) \* 100.  
   * This formula normalizes the reward. A workout that is exactly average *for that specific user* generates 100 Charge. A personal best might generate 120\. This fairly rewards personal effort.  
   * The Engine has a maximum Charge capacity (e.g., starts at 200).  
3. **Charge Decay (The Incentive):**  
   * The Engine's Charge level constantly decays over time.  
   * **Suggested Rate:** \-1 Charge point per hour.  
4. **Engine Components & Upgrades (The "Paperclip" Loop):**  
   * The Engine's C-Cred output is determined by three upgradable components:  
     * **Core Resonator (Base Output):** Determines the base conversion rate of Charge to C-Creds. Output \= Charge \* Resonator\_Multiplier. Starts at x0.1. Upgrades increase this multiplier.  
     * **Charge Injectors (Input Efficiency):** Multiplies the Resonance Charge generated from each workout. Starts at x1.0. Upgrades increase this multiplier, making workouts more potent.  
     * **Containment Field (Decay Shielding):** Reduces the hourly Charge decay rate. Starts with no reduction. Upgrades decrease the decay rate (e.g., to \-0.9/hr, \-0.8/hr).  
   * **The Loop:** The user is incentivized to balance upgrades across these three components to create the most efficient C-Cred generation machine, leading to exponential growth. Upgrade costs should also increase exponentially to ensure a long-term challenge.
