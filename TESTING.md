# Testing Plan for BMI Health Tracker

This document outlines the testing strategy, scope, and instructions for the BMI Health Tracker application.

## 1. Testing Strategy
We utilize **End-to-End (E2E) Testing** using [Playwright](https://playwright.dev/) to ensure the critical user flows work as expected from a user's perspective. This approach verifies the integration of the frontend (Next.js), backend (Server Actions), and database (SQLite).

## 2. Test Scope
The following core functionalities are covered by the automated tests:

### 2.1 User Authentication
- **Registration**: Verify new user account creation and automatic login/redirection.
- **Login**: Verify access for existing users.
- **Logout**: Verify secure session termination and redirection to the login page.

### 2.2 Core BMI Features
- **Add Record**: Verify the ability to input height (cm) and weight (kg), calculate BMI, and save the record.
- **Validation**: Ensure inputs are processed correctly (implicit in successful submission).
- **Visualization**: Verify that the calculated BMI and category (e.g., "Normal weight") are displayed on the dashboard.

### 2.3 Dashboard & Reports
- **Dashboard Access**: Ensure protected routes are accessible only after login.
- **Reports Page**: Verify navigation to the MIS Reports section and visibility of summary statistics.

## 3. Test Cases (Automated)
The E2E tests are located in `tests/bmi-tracker.spec.ts` and run sequentially to simulate a real user journey.

| Case ID | Name | Description | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-01** | User Registration | Register with valid unique credentials. | Redirect to Dashboard; User name visible. |
| **TC-02** | User Logout | Click logout button from dashboard. | Redirect to Login page. |
| **TC-03** | User Login | Login with valid credentials. | Redirect to Dashboard. |
| **TC-04** | Add BMI Record | Submit Height (175cm) and Weight (70kg). | New record appears; BMI 22.9 displayed. |
| **TC-05** | Check Reports | Navigate to "Reports" via navbar. | Reports page loads with "Health Summary". |

## 4. How to Run Tests

### Prerequisites
- Node.js installed.
- Dependencies installed (`npm install`).
- Playwright browsers installed (`npx playwright install`).

### Commands
1. **Run all tests (Headless mode):**
   ```bash
   npx playwright test
   ```

2. **Run tests with UI mode (Interactive):**
   ```bash
   npx playwright test --ui
   ```

3. **View Test Report:**
   ```bash
   npx playwright show-report
   ```

## 5. Continuous Integration (CI)
These tests are designed to be run in a CI/CD pipeline (e.g., GitHub Actions) on every pull request to `master` to prevent regression.
