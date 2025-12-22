🚀 InfiJobs Portal
🤖 AI‑Powered Interview Preparation & Role‑Based Learning Platform InfiJobs Portal is a production-ready, full-stack web application built to simulate how modern candidates learn, practice, and get evaluated for technical roles.

The project demonstrates strong frontend engineering, clean architecture, real backend integration, and the application of AI — not just UI demos.
This repository is intended to showcase real‑world engineering skills, including scalable React architecture, secure authentication, database design, and AI‑assisted developer tooling.

✨ Core Capabilities
🎓 Role‑Based Learning The application supports 9 distinct career tracks, each implemented as an isolated feature module:

🧠 Machine Learning Engineer (pipelines, models, visualizers)
🔬 Data Scientist (ML, statistics, deep learning)
⚙️ Data Engineer (ETL, big data, cloud)
📊 Data Analyst (Python, SQL, visualisation)
📈 Business Analyst (SQL, process modelling)
💼 Business Intelligence (Power BI, Tableau)
🚚 Supply Chain Analyst (forecasting, logistics)
⚛️ Frontend Developer (React, modern web practices)
☕ Java Full‑Stack Developer (Spring Boot, microservices)

Each role has its own learning flow, quizzes, and progress tracking.

💻 Interactive Coding Environment In‑Browser IDE for hands‑on problem solving.
AI‑Powered Code Feedback using Google Gemini 2.0 Flash.
Multi‑Language Support: Python, SQL, Java, JavaScript.

📚 Learning & Assessment Tools: Interactive career roadmaps with progress tracking.
Role‑specific quizzes with instant evaluation.
A bookmarking system for saving resources and projects.
Persistent user profiles with learning history.

🔐 Authentication & User Management Secure authentication using Supabase Auth.
Session handling and protected routes.
User profiles tracking:
Quiz scores
Completed roadmap steps
Saved content

A custom animated authentication overlay ("Galaxy UI") demonstrates advanced UI/UX execution.

🛠️ Technical Stack Frontend: React 19, TypeScript 5, Vite 6 ⚛️
Styling: Tailwind CSS, Framer Motion 🎨
Backend: Supabase (PostgreSQL, Auth, Realtime) 🔥
AI: Google Gemini 2.0 Flash 🤖
State: React Context API 📦
Routing: React Router DOM 6 🛣️
Visualisation: Recharts, Spline (3D) 📊

All technologies were chosen for production relevance, not novelty.

🏗️ Architecture The project uses a Feature‑Based Architecture, enabling scalability and clear separation of concerns.

```text
src/
├── ⚙️ config/        # Environment & API configuration
├── 📦 features/      # Domain‑specific feature modules
│   ├── 🔐 auth/
│   ├── 💻 coding/
│   ├── 🧠 ml-portal/
│   └── ... other role portals
├── 🔌 services/      # Data & AI integration layer
├── 🧩 shared/        # Reusable UI components & hooks
├── 📁 assets/        # Static assets
└── 🚀 App.tsx        # Application entry point

```

This structure allows new career roles or features to be added with minimal impact on existing code.

---

🗄️ Backend & Data Model PostgreSQL database hosted on Supabase.
11 relational tables supporting:
Users & profiles
Roles & learning paths
Quizzes & submissions
Bookmarks & progress tracking

All data access is abstracted through a service layer to keep UI logic clean.

---

⚙️ Local Setup (Optional) bash
git clone https://github.com/yourusername/infijobs-portal.git
cd infijobs-portal
npm install
npm run dev

Environment variables are used for Supabase and Google AI credentials.

☁️ Deployment* Deployed via Netlify.
SPA routing handled with `netlify.toml`.
Environment variables are securely configured.
The app runs as a fully client‑side rendered production build.

🎯 What This Project Demonstrates \
✅ Strong React + TypeScript fundamentals.
✅ Scalable frontend architecture.
✅ Secure authentication and backend integration.
✅ Practical AI integration in developer tooling.
✅ Clean separation of concerns.
✅ Product‑level thinking, not just feature demos.

⚖️ The Engineering Tradeoffs & Design Decisions project intentionally makes several tradeoffs to mirror real-world product constraints:

Client-heavy architecture: The app favours a rich frontend with Supabase handling auth and persistence, reducing backend complexity while maintaining production-grade security.
Feature-based modularity over monorepo complexity: Each career portal is isolated as a feature module, prioritising maintainability and onboarding speed over premature abstraction.
AI as an assistant: Gemini is used for evaluation and guided hints instead of full solutions to preserve learning integrity and interview realism.
Context API over heavier state managers: React Context was chosen to avoid unnecessary complexity while keeping state predictable at the current scale.
PostgreSQL relational model: A normalised schema was preferred over NoSQL flexibility to support clear relationships between users, roles, quizzes, and progress.

These decisions prioritise clarity, scalability, and developer experience over novelty.

📜 License MIT License

<p align="center">Built with ❤️ by Vedant</p>
