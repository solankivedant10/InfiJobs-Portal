🚀 InfiJobs Portal

AI-Powered Interview Preparation & Role-Based Learning Platform

InfiJobs Portal is a production-ready, full-stack web application designed to simulate how modern candidates learn, practice, and get evaluated for technical roles.

This project is not a UI demo. It showcases real-world frontend engineering, secure backend integration, and practical AI usage in a scalable architecture.

> Built to reflect how real products are engineered — not just how features look.

✨ Key Highlights

 🎯 Role-based learning across 9 technical career paths
 💻 In-browser coding environment with AI-assisted feedback
 🔐 Secure authentication & persistent user profiles
 🧠 Feature-based architecture designed for scalability
 ⚛️ Modern React + TypeScript production stack

🎓 Role-Based Learning Paths

Each career track is implemented as an isolated feature module with its own learning flow, quizzes, and progress tracking.

 🧠 Machine Learning Engineer — pipelines, models, visualisation
 🔬 Data Scientist — ML, statistics, deep learning
 ⚙️ Data Engineer — ETL, big data, cloud workflows
 📊 Data Analyst — Python, SQL, visualisation
 📈 Business Analyst — SQL, process modelling
 💼 Business Intelligence — Power BI, Tableau
 🚚 Supply Chain Analyst — forecasting, logistics
 ⚛️ Frontend Developer — React & modern web practices
 ☕ Java Full-Stack Developer — Spring Boot, microservices

Each role is designed to be added or evolved independently without affecting the rest of the system.

💻 Interactive Coding & AI Feedback

 🧩 In-browser IDE for hands-on problem solving
 🤖 AI-powered code evaluation using Google Gemini 2.0 Flash
 🌐 Multi-language support:

   Python
   SQL
   Java
   JavaScript

AI is used as a learning assistant, not a solution generator — preserving interview realism.

 📚 Learning & Assessment Features

 📍 Interactive career roadmaps with progress tracking
 📝 Role-specific quizzes with instant evaluation
 🔖 Bookmarking system for saved content & projects
 👤 Persistent user profiles storing:

   Quiz scores
   Completed roadmap steps
   Saved resources

🔐 Authentication & User Management

 Secure authentication via Supabase Auth
 Session handling & protected routes
 User profile management backed by PostgreSQL
 Custom animated authentication overlay (Galaxy UI) showcasing advanced UI/UX execution

🛠️ Tech Stack

Frontend

 React 19 ⚛️
 TypeScript 5
 Vite 6

Styling & UI

 Tailwind CSS
 Framer Motion

Backend & Services

 Supabase (PostgreSQL, Auth, Realtime)

AI

 Google Gemini 2.0 Flash

State & Routing

 React Context API
 React Router DOM v6

Visualisation

 Recharts
 Spline (3D)

> All technologies were chosen for production relevance, not novelty.

🏗️ Architecture Overview

The project follows a Feature-Based Architecture for clarity and scalability.

```text
src/
├── config/        # Environment & API configuration
├── features/      # Domain-specific feature modules
│   ├── auth/
│   ├── coding/
│   ├── ml-portal/
│   └── other role portals
├── services/      # Data & AI integration layer
├── shared/        # Reusable UI components & hooks
├── assets/        # Static assets
└── App.tsx        # Application entry point
```

This structure allows new roles or features to be added with minimal impact on existing code.

🗄️ Backend & Data Model

 PostgreSQL database hosted on Supabase
 11 relational tables supporting:

   Users & profiles
   Roles & learning paths
   Quizzes & submissions
   Bookmarks & progress tracking

All database access is abstracted through a service layer to keep UI logic clean and maintainable.

⚙️ Local Setup (Optional)

```bash
git clone https://github.com/yourusername/infijobs-portal.git
cd infijobs-portal
npm install
npm run dev
```

Environment variables are required for Supabase and Google AI credentials.

☁️ Deployment

 Deployed via Netlify
 SPA routing handled with `netlify.toml`
 Environment variables securely configured
 Fully client-side rendered production build

 🎯 What This Project Demonstrates

✅ Strong React + TypeScript fundamentals
✅ Scalable frontend architecture
✅ Secure authentication & backend integration
✅ Practical AI integration in developer tooling
✅ Clean separation of concerns
✅ Product-level engineering thinking

 ⚖️ Engineering Tradeoffs & Design Decisions

This project intentionally mirrors real-world constraints:

 Client-heavy architecture
  Supabase handles auth and persistence to reduce backend complexity while maintaining security.

 Feature-based modularity
  Chosen over monorepo complexity to prioritise maintainability and onboarding speed.

 AI as an assistant, not a solver
  Preserves learning integrity and interview realism.

 Context API over heavier state managers
  Keeps state predictable without unnecessary complexity.

 Relational PostgreSQL schema
  Preferred for clear relationships between users, roles, quizzes, and progress.

These decisions prioritise clarity, scalability, and developer experience.

📜 License

MIT License


<p align="center">
Built with ❤️ by <strong>Vedant</strong>
</p>

Just tell me.
