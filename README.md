InfiJobs Portal

AI‑Powered Interview Preparation & Role‑Based Learning Platform

InfiJobs Portal is a production-ready, full-stack web application built to simulate how modern candidates learn, practice, and get evaluated for technical roles. The project demonstrates strong frontend engineering, clean architecture, real backend integration, and the application of AI — not just UI demos.

This repository is intended to showcase real‑world engineering skills, including scalable React architecture, secure authentication, database design, and AI‑assisted developer tooling.

Core Capabilities

Role‑Based Learning Platforms: The application supports 9 distinct career tracks, each implemented as an isolated feature module:

Machine Learning Engineer (pipelines, models, visualizers)
Data Scientist (ML, statistics, deep learning)
Data Engineer (ETL, big data, cloud)
Data Analyst (Python, SQL, visualization)
Business Analyst (SQL, process modeling)
Business Intelligence (Power BI, Tableau)
Supply Chain Analyst (forecasting, logistics)
Frontend Developer (React, modern web practices)
Java Full‑Stack Developer (Spring Boot, microservices)

Each role has its own learning flow, quizzes, and progress tracking.

Interactive Coding Environment

1. In‑Browser IDE for hands‑on problem solving
2. AI‑Powered Code Feedback using Google Gemini 2.0 Flash
3. Multi‑Language Support: Python, SQL, Java, JavaScript

Learning & Assessment Tools

Interactive career roadmaps with progress tracking
Role‑specific quizzes with instant evaluation
Bookmarking system for saving resources and projects
Persistent user profiles with learning history

Authentication & User Management

Secure authentication using Supabase Auth
Session handling and protected routes
User profiles tracking:

quiz scores
completed roadmap steps
saved content

A custom animated authentication overlay ("Galaxy UI") demonstrates advanced UI/UX execution.

Technical Stack

| Layer         | Technology                            |
| ------------- | ------------------------------------- |
| Frontend      | React 19, TypeScript 5, Vite 6        |
| Styling       | Tailwind CSS, Framer Motion           |
| Backend       | Supabase (PostgreSQL, Auth, Realtime) |
| AI            | Google Gemini 2.0 Flash               |
| State         | React Context API                     |
| Routing       | React Router DOM 6                    |
| Visualization | Recharts, Spline (3D)                 |

All technologies were chosen for production relevance, not novelty.

Architecture Overview

The project uses a Feature‑Based Architecture, enabling scalability and clear separation of concerns.

```
src/
├── config/           # Environment & API configuration
├── features/         # Domain‑specific feature modules
│   ├── auth/
│   ├── coding/
│   ├── ml-portal/
│   └── other role portals
├── services/         # Data & AI integration layer
├── shared/           # Reusable UI components & hooks
├── assets/           # Static assets
└── App.tsx           # Application entry point
```

This structure allows new career roles or features to be added with minimal impact on existing code.

---

Backend & Data Model

PostgreSQL database hosted on Supabase
11 relational tables supporting:

users & profiles
roles & learning paths
quizzes & submissions
bookmarks & progress tracking

All data access is abstracted through a service layer to keep UI logic clean.

 Local Setup (Optional)

```bash
git clone https://github.com/yourusername/infijobs-portal.git
cd infijobs-portal
npm install
npm run dev
```

Environment variables are used for Supabase and Google AI credentials.

---

Deployment

Deployed via **Netlify**
SPA routing handled with `netlify.toml`
Environment variables securely configured

The app runs as a fully client‑side rendered production build.

 What This Project Demonstrates

Strong React + TypeScript fundamentals
Scalable frontend architecture
Secure authentication and backend integration
Practical AI integration in developer tooling
Clean separation of concerns
Product‑level thinking, not just feature demos

Engineering Tradeoffs & Design Decisions

This project intentionally makes several tradeoffs to mirror real-world product constraints:

Client-heavy architecture: The app favors a rich frontend with Supabase handling auth and persistence, reducing backend complexity while maintaining production-grade security.
Feature-based modularity over monorepo complexity: Each career portal is isolated as a feature module, prioritizing maintainability and onboarding speed over premature abstraction.
AI as an assistant, not an oracle: Gemini is used for evaluation and guided hints instead of full solutions to preserve learning integrity and interview realism.
Context API over heavier state managers: React Context was chosen to avoid unnecessary complexity while keeping state predictable at current scale.
PostgreSQL relational model: A normalized schema was preferred over NoSQL flexibility to support clear relationships between users, roles, quizzes, and progress.

These decisions prioritize clarity, scalability, and developer experience over novelty.

License

MIT License

<p align="center">Built with ❤️ by Vedant</p>
