# Project Tasks: BMI Health Tracker

This document outlines the step-by-step implementation plan based on the SRS.

---

## Phase 1: Project Setup & Infrastructure
**Goal:** Initialize the environment and database foundation.

- [x] **1.1 Initialize Next.js Project**
  - Setup Next.js with TypeScript and Tailwind CSS.
  - Configure project structure (components, lib, app).
- [x] **1.2 Database Initialization (SQLite)**
  - Install SQLite driver (`better-sqlite3`).
  - Define Database Schema (`users`, `bmi_records`).
  - Create a script to initialize the database file and tables.
  - **Deliverable:** A running app that connects to a local SQLite file.

## Phase 2: User Authentication (Security)
**Goal:** Secure user access and data isolation (SRS Section 3.1).

- [x] **2.1 Backend Authentication Logic**
  - Implement password hashing (e.g., `bcrypt`).
  - Create Server Actions/API for **Registration**.
  - Create Server Actions/API for **Login** (Session/Cookie management).
  - Create Server Actions/API for **Logout**.
- [x] **2.2 Frontend Auth Pages**
  - Create **Login Page** UI.
  - Create **Register Page** UI.
  - Implement Middleware to protect dashboard routes (redirect if not logged in).
  - **Deliverable:** Users can sign up, log in, and are redirected to a secure dashboard.

## Phase 3: Core Feature - BMI Operations
**Goal:** Enable data entry and calculation (SRS Section 3.2).

- [x] **3.1 BMI Logic Module**
  - Create utility function to calculate BMI.
  - Create utility function to determine BMI Category (Underweight, Normal, etc.).
- [x] **3.2 Input Interface**
  - Design "Add Record" component (Height & Weight inputs).
  - Implement client-side validation (must be positive numbers).
- [x] **3.3 Data Persistence**
  - Implement Server Action to save record to `bmi_records` table linked to the current user.
  - **Deliverable:** User can add a record and see it saved in the database.

## Phase 4: Dashboard & Visualization
**Goal:** Display history and trends (SRS Section 3.3).

- [x] **4.1 History List**
  - Create a table/list view of past records.
  - Format timestamps and display BMI categories with color coding.
- [x] **4.2 Chart Implementation**
  - Install a charting library (e.g., `recharts` or `chart.js`).
  - Create a Line Chart component showing BMI trends.
  - Implement time range filtering (Weekly, Monthly, Yearly).
  - **Deliverable:** User can view their history in both list and chart formats.

## Phase 5: MIS Reporting
**Goal:** Generate statistical summaries (SRS Section 3.4).

- [x] **5.1 Aggregation Logic**
  - Write SQL queries/logic to calculate:
    - Average BMI
    - Minimum BMI
    - Maximum BMI
    - Total Count
- [x] **5.2 Reports Page**
  - Create a dedicated "Reports" page or section.
  - Display summary cards for the calculated metrics.
  - **Deliverable:** User can see a statistical summary of their health data.

## Phase 6: Polish & Quality Assurance
**Goal:** Ensure usability, performance, and compliance (SRS Section 5).

- [x] **6.1 UI/UX Polish**
  - Verify Mobile Responsiveness.
  - Add Loading states (skeletons/spinners) for better UX.
  - Implement Error handling (Toast notifications for success/failure).
  - **Added Custom Footer with Student Info.**
  - **Enhanced UI with Glassmorphism and Gradients.**
- [x] **6.2 Accessibility (WCAG)**
  - Ensure color contrast ratios.
  - Add proper `aria-labels` to inputs and buttons.
- [x] **6.3 Final Review**
  - Verify strict data isolation (User A cannot see User B's data).
  - Code cleanup and documentation.
