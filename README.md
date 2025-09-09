# ExpensePilot – Full Stack Expense Management

ExpensePilot is a modern full-stack application for managing and tracking personal and business expenses. The backend is built with Spring Boot (Java & Maven), providing a REST API for all expense operations. The frontend dashboard is powered by Next.js (TypeScript), automatically generated and styled via [v0.app](https://v0.app) and deployed on Vercel, offering a beautiful, responsive UI.

---

## 🗂 Project Structure

```
ExpensePilot/
├── backend/                  # Spring Boot Maven API
│   ├── src/
│   └── pom.xml
├── expense-pilot-dashboard/  # Next.js (v0) frontend
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── styles/
│   └── package.json
└── README.md                 # This file
```

---

## ✨ Features

### Backend (Spring Boot)
- **Expense Management**: Add, edit, delete, and view expenses via REST API
- **Category Tracking**: Organize expenses under custom categories
- **Database Agnostic**: Default MySQL

### Frontend (Next.js by v0)
- **Dashboard Overview**: Total income, expenses, net savings
- **Transaction Management**: Add/view/manage transactions
- **Category Breakdown**: Charts show spending by category
- **Real-Time Data**: Fetches live data from backend API, with offline fallback

---

## 🚀 Tech Stack

### Backend
- Spring Boot, Java 17+
- Maven
- Spring Data JPA
- RESTful API (`/api/expense`, `/api/expenses`)
- H2 (default), MySQL/PostgreSQL (optional)

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Radix UI primitives, Lucide React icons
- Recharts for charts
- React Hook Form + Zod for validation
- next-themes for theming
- v0.app for UI generation
- Deployed on Vercel

---

## ⚡️ Getting Started

### Backend

#### Prerequisites
- Java 17+
- Maven

#### Setup
```bash
cd backend
mvn spring-boot:run
```
- API available at `http://localhost:8080/api`

### Frontend

#### Prerequisites
- Node.js 18+
- npm or pnpm
- Git

#### Setup
```bash
git clone https://github.com/chetanb-11/expense-pilot-dashboard.git
cd expense-pilot-dashboard
npm install
npm run dev
```
- UI available at `http://localhost:3000`

---

## 🔗 API Integration

The Next.js dashboard integrates with the backend via:

- `GET /api/expenses` – fetch all transactions
- `POST /api/expense` – create new transaction
- `PUT /api/expense/{id}` – update transaction
- `DELETE /api/expense/{id}` – delete transaction

Set your backend API URL in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```
Fallback demo data included for offline/local development.

---

## 🔧 Customization

- **Database**: To use MySQL/PostgreSQL, update `backend/src/main/resources/application.properties`
- **Environment Variables**: Use `.env.local` for frontend and backend secrets
- **Deployment**: Backend can run on any cloud/server; frontend deploys to Vercel (auto-sync with v0.app)

---

## 🧑‍💻 Contributing

Pull requests, issues, and feature suggestions are welcome!
- Fork, clone, and submit PRs for either backend or frontend

---

**Enjoy tracking your expenses with ExpensePilot!**
