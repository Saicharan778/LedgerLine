# PROMPTS.md

# LedgerLine – AI Prompt Log

This document records the AI-assisted prompts used during the planning,
architecture, and initial frontend development of LedgerLine.

The prompts are documented to maintain transparency, track development
decisions, and explain how AI assistance contributed to the project.

---

## 1. Project Architecture and Technology Selection

**Date:** 2026-11-06

**Prompt:**

"Review the LedgerLine project requirements and recommend a suitable
technology stack for developing a secure financial transaction
management application. Consider frontend, backend, database,
authentication, testing, documentation, and deployment."

**Purpose:**
To identify technologies suitable for building a reliable financial
application.

**Outcome:**
Established the initial application architecture and evaluated
technology choices.

**Selected technologies:**
- React.js
- Tailwind CSS
- Node.js
- Express.js
- MySQL
- mysql2
- JWT
- bcrypt
- Jest
- Supertest
- Swagger
- Docker
- Jenkins
- AWS
- Kubernetes
- Terraform

---

## 2. Database and ORM Selection

**Date:** 2026-11-06

**Prompt:**

"Compare PostgreSQL, MongoDB, and MySQL for the LedgerLine
financial transaction application. Explain the role of Prisma
and recommend whether to use an ORM or a direct database driver."

**Purpose:**
To select a database and understand the advantages and limitations
of using an ORM.

**Outcome:**
Selected MySQL with the mysql2 driver.

Prisma was not included because direct SQL provides explicit control
over database transactions, row locking, and financial operations.

---

## 3. Application Folder Structure

**Date:** 2026-11-06

**Prompt:**

"Suggest a professional and scalable folder structure for the
LedgerLine application using React, Tailwind CSS, Node.js,
Express.js, and MySQL."

**Purpose:**
To organize the application into maintainable frontend and backend
modules.

**Outcome:**
Established separate frontend and backend directories with
dedicated components, pages, services, routes, controllers,
middleware, and database modules.

---

## 4. Frontend Initialization

**Date:** 2026-11-06

**Prompt:**

"Let's start developing the frontend of LedgerLine using React
and Tailwind CSS. Guide me step by step through project
initialization and configuration."

**Purpose:**
To initialize the frontend and establish the development environment.

**Outcome:**
- Created a React application using Vite.
- Installed Tailwind CSS.
- Configured the Tailwind Vite plugin.
- Prepared the application for frontend development.

---

## 5. Dashboard and Navigation Development

**Date:** 2026-11-06

**Prompt:**

"Create a professional financial dashboard for LedgerLine
with a sidebar, navbar, balance cards, and recent transaction
section. Use React and Tailwind CSS."

**Purpose:**
To establish the primary application interface.

**Outcome:**
Created the initial dashboard layout, sidebar navigation,
navbar, and financial summary cards.

---

## 6. Financial Application Pages

**Date:** 2026-11-07

**Prompt:**

"Develop the Accounts, Transfers, Deposits, Withdrawals,
Statements, and Audit Logs pages for LedgerLine using
React and Tailwind CSS."

**Purpose:**
To build the frontend interfaces for the application's
main financial operations.

**Outcome:**
Created the initial layouts for all seven application pages,
including the Dashboard.

---

## 7. Reusable Component Development

**Date:** 2026-11-07

**Prompt:**

"Create reusable React components for buttons, input fields,
dropdowns, information cards, and page headings to avoid
repeating UI code across the LedgerLine application."

**Purpose:**
To improve frontend maintainability and component reusability.

**Outcome:**
Created reusable Button, Input, Select, Card, and PageHeader
components.

---

## 8. API Service Configuration

**Date:** 2026-11-07

**Prompt:**

"Configure Axios in the LedgerLine React application.
Create a centralized API service, configure the backend URL
using environment variables, and prepare the frontend
for Express API integration."

**Purpose:**
To establish a centralized communication layer between
the frontend and backend.

**Outcome:**
- Installed Axios.
- Created an Axios instance.
- Configured the API base URL using a Vite environment variable.
- Prepared the frontend for backend integration.

---