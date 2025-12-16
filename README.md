InfiJobs Portal

AI-Powered Interview Prep & Learning Platform

A modern React application for tech interview preparation featuring 9 role-based tutorial portals, AI-powered coding practice, interactive quizzes, and comprehensive learning paths.

🚀 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19.2 + TypeScript 5.8 |
| Build Tool | Vite 6.2 |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router DOM 6.22 |
| AI Integration | Google GenAI SDK (`@google/genai`) |
| Icons | Lucide React |
| Markdown | React Markdown |

📁 Project Architecture

infijob-frontend/
├── config/                    # App configuration
│   └── api.ts                 # API base URL & endpoints (backend-ready)
│
├── shared/                    # Reusable modules
│   ├── hooks/                 # Custom React hooks
│   │   ├── useTheme.ts        # Light/dark mode toggle
│   │   ├── useScrollAnimation.ts
│   │   └── useCyclingText.ts
│   └── components/            # Shared UI components
│       ├── UI.tsx             # Button, Card, inputClasses
│       ├── Section.tsx        # Layout wrapper
│       ├── BackToTop.tsx      # Scroll-to-top button
│       └── AnimatedBackground.tsx  # Galaxy starfield effect
│
├── features/                  # Feature-based modules
│   ├── auth/                  # Authentication module
│   │   ├── authService.ts     # Login/register with token pattern
│   │   ├── sessionService.ts  # Session persistence
│   │   ├── bookmarkService.ts # User bookmarks
│   │   └── types.ts           # User, AuthResponse types
│   │
│   ├── tutorial-portal/       # Tutorial hub landing page
│   ├── ml-portal/             # Machine Learning tutorials
│   ├── da-portal/             # Data Analytics tutorials
│   ├── ba-portal/             # Business Analyst tutorials
│   ├── ds-portal/             # Data Scientist tutorials
│   ├── de-portal/             # Data Engineering tutorials
│   ├── bi-portal/             # Business Intelligence tutorials
│   ├── sca-portal/            # Supply Chain Analyst tutorials
│   ├── fe-portal/             # Frontend Developer tutorials
│   ├── java-portal/           # Java Full Stack tutorials
│   └── coding/                # Coding practice components
│
├── services/                  # Business logic layer
│   ├── dataService.ts         # Async data fetching (backend-ready)
│   ├── geminiService.ts       # Google AI integration
│   ├── codingData.ts          # Static coding problems
│   ├── storageService.ts      # User stats persistence
│   └── types.ts               # Core type definitions
│
├── components/                # Legacy UI components
│   ├── layout/                # Navbar, Footer
│   ├── quiz/                  # Quiz modal components
│   └── ...                    # Section components
│
├── context/                   # React Context providers
│   ├── AuthContext.tsx        # Global auth state
│   └── CodingContext.tsx      # Coding environment state
│
├── data/                      # Static data files
│   ├── mockData.ts            # Learning cards, quizzes, roadmaps
│   ├── mlTutorialData.ts      # ML tutorial content
│   ├── dataAnalyticsTutorialData.ts
│   └── ...                    # Role-specific tutorial data
│
└── pages/                     # Route components
    ├── Home.tsx               # Main landing page
    └── CodingPage.tsx         # AI coding environment

📖 Code Dictionary

Features (`/features`)

| Module | Description |
|--------|-------------|
| `auth/authService.ts` | Token-based authentication (JWT-ready) |
| `auth/sessionService.ts` | User session management |
| `tutorial-portal/TutorialPortalHub.tsx` | Landing page for all 9 tutorial portals |
| `ml-portal/*` | Machine Learning tutorial with sidebar & topics |
| `da-portal/*` | Data Analytics tutorial with Python examples |
| `coding/*` | Code editor, output panel, problem display |

Services (`/services`)

| File | Purpose |
|------|---------|
| `dataService.ts` | Async data access with mock delays (replace with API) |
| `geminiService.ts` | Google Gemini AI for code generation & evaluation |
| `codingData.ts` | Static coding problems with test cases |
| `storageService.ts` | User stats & progress persistence |
| `reportService.ts` | PDF/CSV report generation |

Shared (`/shared`)

| File | Purpose |
|------|---------|
| `hooks/useTheme.ts` | Light/dark mode with localStorage persistence |
| `hooks/useScrollAnimation.ts` | Intersection Observer animation trigger |
| `components/UI.tsx` | Button, Card, inputClasses primitives |
| `components/AnimatedBackground.tsx` | 3-layer parallax starfield |

Config (`/config`)

| File | Purpose |
|------|---------|
| `api.ts` | `API_BASE_URL`, `API_ENDPOINTS`, `buildUrl()` helper |

✨ Features

🎓 Tutorial Portals (9 Roles)
- Machine Learning - 13 topics with pipeline visualizer
- Data Analytics - 9 topics with Python examples
- Business Analyst - 12 SQL topics
- Data Scientist - 9 topics covering ML & statistics
- Data Engineering - 9 topics on ETL & pipelines
- Business Intelligence - 11 topics on BI tools
- Supply Chain Analyst - 9 topics on logistics & forecasting
- Frontend Developer - 9 topics on HTML/CSS/JS/React
- Java Full Stack - 11 topics on Spring Boot & REST

💻 AI Coding Environment
- Real-time code evaluation with Gemini AI
- Multiple language support
- Instant feedback & scoring

📝 Interactive Quizzes
- Role-specific screening questions
- Score tracking & progress history

🗺️ Learning Roadmaps
- Step-by-step career paths
- Progress persistence

📋 Content Management Guide

Add a New Tutorial Portal

1. Create data file in `/data/`:
typescript
   // data/newRoleTutorialData.ts
   export const newRoleTutorialData = [
     { id: 'intro', title: 'Introduction', subtopics: [...] }
   ];
   

2. Create portal component in `/features/newrole-portal/`:
typescript
   // features/newrole-portal/NewRolePortalLayout.tsx
   export const NewRolePortalLayout = () => { ... };
   export const NewRoleTopicView = () => { ... };

3. Add route in `App.tsx`:
typescript
   <Route path="/newrole-portal" element={<NewRolePortalLayout />}>
     <Route index element={<NewRoleTopicView />} />
     <Route path=":topicId" element={<NewRoleTopicView />} />
   </Route>

4. Add to hub in `TutorialPortalHub.tsx`:
typescript
   { id: 'newrole-portal', title: 'New Role', icon: SomeIcon, ... }

Add a New Quiz

1. Open `/data/mockData.ts`
2. Add to `quizData` object:
typescript
   'newrole-quiz': {
     title: 'New Role Quiz',
     description: '...',
     questions: [{ q: '...', o: ['A','B','C','D'], a: 0 }]
   }
   

Add a New Coding Problem

1. Open `/services/codingData.ts`
2. Add to `codingProblems` array:
typescript
   {
     id: 'unique-id',
     title: 'Problem Title',
     difficulty: 'Easy',
     description: '...',
     starterCode: 'function solve() { }',
     testCases: [{ input: '...', expected: '...' }]
   }
   

⚙️ Setup & Deployment

Prerequisites
- Node.js v18+
- npm or yarn

Installation

bash
Clone repository
git clone <repo-url>
cd infijob-frontend

Install dependencies
npm install

Environment Variables

Create `.env.local`:
env
VITE_API_KEY=your_gemini_api_key
VITE_API_URL=http://localhost:3001/api  # For backend integration

Development

bash
npm run dev

Opens at http://localhost:5173

Production Build

bash
npm run build

Output: dist/ directory

Preview Production

bash
npm run preview

---

🔧 Backend Integration

The app is backend-ready with:

| Feature | Location | Status |
|---------|----------|--------|
| API Config | `config/api.ts` | ✅ Ready |
| Token Auth | `features/auth/authService.ts` | ✅ JWT-ready |
| Async Data | `services/dataService.ts` | ✅ Mock delays |

To connect backend:
1. Set `VITE_API_URL` in `.env.local`
2. Search for `// TODO: Replace with` comments
3. Replace mock implementations with `fetch()` calls

📄 License

MIT License - See LICENSE file for details.
