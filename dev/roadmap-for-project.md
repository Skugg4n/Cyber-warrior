### **AEGIS: Master Implementation Roadmap & Technical Specification**

This document provides a granular, step-by-step implementation plan. It is designed to be the definitive project roadmap. Each step represents a distinct task with a clear "Definition of Done."

#### **Core Architecture Reminder**

* **State:** Use a global state management solution (e.g., Zustand, React Context) for all operator and session data.  
* **Persistence:** Use a custom hook (usePersistence.js) to handle all saving/loading. This will target Local Storage initially, then Firebase.  
* **Styling:** Use Tailwind CSS for all layout and styling to maintain consistency.

### **Phase 0: The Foundation (The "Sleeper" App)**

**Goal:** Create a rock-solid, non-gamified workout logger. This is the Minimum Viable Product (MVP).

* **Step 1.1: Project Setup & File Structure**  
  * **Task:** Initialize a new React project and create the core file structure as defined in the architecture plan (/components, /features, /data, /state, /hooks, /systems).  
  * **Checkpoint:** A blank React app compiles successfully with the correct folders in place.  
* **Step 1.2: Data & State Foundation**  
  * **Task:** Create database.js and populate it with the mission and exercise data. Create the global state store (/state/store.js) and define the initial "sleeper" user object (without XP, C-Creds, etc.).  
  * **Checkpoint:** The main App.js can import and display a mission title from the database.js file.  
* **Step 1.3: Core UI & Navigation (Sleeper Mode)**  
  * **Task:** Build the main App.js component with a simple, modern dark-theme UI. Implement basic navigation between a "My Routines" screen and a "Workout History" screen.  
  * **Checkpoint:** The user can switch between two placeholder screens.  
* **Step 1.4: Implement the "Lyfta-Style" Workout Logger**  
  * **Task:** This is the largest step in Phase 0\. Build the WorkoutLogger.js feature.  
    * Create the main accordion list view (DirectiveOverview).  
    * Create the dropdown component (SetLoggerDropdown).  
    * Implement the pre-populated set list based on targetSets.  
    * Implement the checkbox-style \[✔\] logging for each set row.  
  * **Checkpoint:** A user can select a workout, see a list of exercises, expand one, see the pre-populated sets, and log them by checking them off.  
* **Step 1.5: Local Storage Persistence**  
  * **Task:** Create the usePersistence.js hook. This hook will save the user's workout history to Local Storage after every session and load it when the app starts.  
  * **Checkpoint:** A user can complete a workout, close the app, reopen it, and see that workout in their history.  
* **Step 1.6: Implement the RESONANCE\_SYNC bar**  
  * **Task:** Add the unexplained progress bar to the main UI. Its value should be calculated based on the total number of sets logged by the user across all sessions.  
  * **Checkpoint:** The bar is visible and slowly progresses as the user completes workouts.

### **Phase 1: The Awakening**

**Goal:** Introduce the core gamification loop and the narrative reveal.

* **Step 2.1: The "Glitch" Event & Theme Switching**  
  * **Task:** Create a ThemeContext that can provide either the "Sleeper" (modern) or "AEGIS" (retro) theme (CSS variables). Implement logic in App.js that, upon reaching a RESONANCE\_SYNC threshold, permanently switches the theme to "AEGIS" and displays the "Welcome Back" message sequence.  
  * **Checkpoint:** Completing a workout can trigger the UI and theme transformation.  
* **Step 2.2: XP & Leveling System**  
  * **Task:** Create /systems/LevelingSystem.js. This utility will contain the logic for calculateXpForSet() and checkForLevelUp(). Update the global state to include xp and level. Call these functions whenever a set is logged.  
  * **Checkpoint:** Logging a set increases the user's XP, and they can level up.  
* **Step 2.3: C-Creds & Basic Rewards**  
  * **Task:** Create /systems/RewardSystem.js. Implement functions for awarding C-Creds for FLAWLESS\_EXECUTION and random DATA\_SPIKE events. Add cCreds to the global state.  
  * **Checkpoint:** Completing a workout flawlessly awards C-Creds. Logging a set has a chance to award bonus C-Creds.  
* **Step 2.4: Implement //MSG\_BOARD**  
  * **Task:** Build the MissionBoard.js feature. It should read the missionsData from database.js and display them. Clicking a mission should launch the WorkoutLogger.  
  * **Checkpoint:** The user can see a list of available missions and start one.  
* **Step 2.5: Implement //BLACK\_MARKET**  
  * **Task:** Build the BlackMarket.js feature. It should display items from database.js and allow the user to purchase them, which will decrease their cCreds and add items to their inventory in the global state.  
  * **Checkpoint:** A user can buy an interface theme, which successfully changes the app's colors.

### **Phase 2: Deepening the Loop**

**Goal:** Add variety and long-term goals to keep players engaged.

* **Step 3.1: The //WARDING\_FIELD System**  
  * **Task:** Create a new feature screen for the Warding Field. Add logic to the global state that slowly degrades the wardingFieldHealth over time. Create a new \[DEFENSE\] mission type in database.js that, when completed, restores health.  
  * **Checkpoint:** The Warding Field's health depletes and can be restored by completing specific missions.  
* **Step 3.2: Streak System**  
  * **Task:** Add lastLoginDate and currentStreak to the user's persistent state. Implement logic that checks the date on app load to update the streak. Create a function in RewardSystem.js to award bonuses at 7, 30, and 100-day milestones.  
  * **Checkpoint:** The \[UPLINK\_STREAK: Xd\] is visible and updates correctly. Milestone bonuses are awarded.  
* **Step 3.3: SYSTEM ANOMALY Event**  
  * **Task:** In RewardSystem.js, create a function that has a small chance to trigger after a set is logged. This function should temporarily inject a "bonus objective" exercise into the current workout's state.  
  * **Checkpoint:** While working out, the user is sometimes prompted to perform an extra exercise for bonus rewards.

### **Phase 3: The Endgame & Multiplayer**

**Goal:** Introduce large-scale systems and social features.

* **Step 4.1: Firebase Setup & Authentication**  
  * **Task:** Create a new Firebase project. Implement Firebase Authentication (e.g., Email/Password or Google Sign-In). The app should now have a login screen.  
  * **Checkpoint:** A user can create an account and log in. Their unique user ID is available in the app.  
* **Step 4.2: Firestore Database Migration**  
  * **Task:** Modify the usePersistence.js hook. It should now read/write the user's state to a document in the Firestore database, using their user ID as the document key.  
  * **Checkpoint:** A user's progress is saved to their online account, not just Local Storage. They can log in on a different device and see their progress.  
* **Step 4.3: Implement //AUTONOMOUS\_HARVESTING**  
  * **Task:** Create the UI for the harvesting system. Use a server-side Firebase Function triggered on a schedule to calculate and add passive C-Cred gains to all user accounts. This ensures fair, cheat-proof idle progression.  
  * **Checkpoint:** The user can assign threads and see their C-Creds increase over time, even when the app is closed.

This detailed roadmap provides a clear, sequential path from a simple MVP to a complex, feature-rich application, ensuring focus and clarity at every stage.