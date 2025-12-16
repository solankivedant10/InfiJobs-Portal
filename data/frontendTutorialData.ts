// Frontend Developer Portal - Tutorial Data from GeeksforGeeks

export interface FeTopic {
    id: string;
    title: string;
    icon: string;
    iconBg: string;
    accentColor: string;
    description: string;
    subtopics: { title: string; description?: string }[];
    codeExample?: { title: string; code: string; language: string };
}

export const frontendTutorialData: FeTopic[] = [
    {
        id: "intro-frontend",
        title: "Introduction to Frontend Development",
        icon: "Layout",
        iconBg: "bg-pink-500/20 text-pink-400",
        accentColor: "pink",
        description: "Front-end Development is the creation of user interfaces using markup languages and tools. It focuses on the user-visible part of websites including buttons, texts, alignments, and interactive elements.",
        subtopics: [
            { title: "What is Frontend?", description: "Client-side development basics" },
            { title: "User Interface Design", description: "Creating visual experiences" },
            { title: "User Experience", description: "Making sites intuitive" },
            { title: "Browser Rendering", description: "How browsers display pages" }
        ],
        codeExample: {
            title: "Basic Web Page Structure",
            language: "html",
            code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>My First Website</title>\n    <link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n    <header>\n        <nav>Navigation</nav>\n    </header>\n    <main>\n        <h1>Welcome to Frontend Development</h1>\n        <p>Build beautiful, interactive websites.</p>\n    </main>\n    <script src=\"app.js\"></script>\n</body>\n</html>"
        }
    },
    {
        id: "html-fundamentals",
        title: "HTML Fundamentals",
        icon: "FileCode",
        iconBg: "bg-orange-500/20 text-orange-400",
        accentColor: "orange",
        description: "HTML (HyperText Markup Language) is the core language for creating structured web content. Now at HTML5, it supports forms, tables, semantic elements, and accessibility features.",
        subtopics: [
            { title: "HTML Structure", description: "Document hierarchy and elements" },
            { title: "Semantic HTML", description: "Meaningful element usage" },
            { title: "Forms and Inputs", description: "User data collection" },
            { title: "Tables", description: "Organizing tabular data" },
            { title: "Accessibility", description: "ARIA and screen readers" },
            { title: "SEO Best Practices", description: "Search engine optimization" }
        ],
        codeExample: {
            title: "Semantic HTML Example",
            language: "html",
            code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Semantic HTML</title>\n</head>\n<body>\n    <header>\n        <nav aria-label=\"Main navigation\">\n            <ul>\n                <li><a href=\"#home\">Home</a></li>\n                <li><a href=\"#about\">About</a></li>\n            </ul>\n        </nav>\n    </header>\n    \n    <main>\n        <article>\n            <h1>Article Title</h1>\n            <section>\n                <h2>Section Heading</h2>\n                <p>Content goes here...</p>\n            </section>\n        </article>\n        \n        <aside>\n            <h2>Related Links</h2>\n        </aside>\n    </main>\n    \n    <footer>\n        <p>&copy; 2024 My Website</p>\n    </footer>\n</body>\n</html>"
        }
    },
    {
        id: "css-styling",
        title: "CSS Styling",
        icon: "Palette",
        iconBg: "bg-blue-500/20 text-blue-400",
        accentColor: "blue",
        description: "CSS (Cascading Style Sheets) complements HTML by adding styling, managing colors, layouts, and enabling responsive designs. CSS3 brings animations, flexbox, and grid layouts.",
        subtopics: [
            { title: "Selectors", description: "Targeting elements" },
            { title: "Box Model", description: "Margins, padding, borders" },
            { title: "Flexbox", description: "Flexible layouts" },
            { title: "CSS Grid", description: "Two-dimensional layouts" },
            { title: "Animations", description: "Transitions and keyframes" },
            { title: "CSS Variables", description: "Custom properties" }
        ],
        codeExample: {
            title: "Modern CSS Layout",
            language: "css",
            code: "/* CSS Variables */\n:root {\n  --primary-color: #3498db;\n  --secondary-color: #2ecc71;\n  --spacing: 1rem;\n}\n\n/* Flexbox Navigation */\n.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--spacing);\n  background: var(--primary-color);\n}\n\n/* CSS Grid Layout */\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: var(--spacing);\n}\n\n/* Smooth Animations */\n.card {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n}"
        }
    },
    {
        id: "javascript-basics",
        title: "JavaScript Essentials",
        icon: "Terminal",
        iconBg: "bg-yellow-500/20 text-yellow-400",
        accentColor: "yellow",
        description: "JavaScript is a lightweight, cross-platform language that enables dynamic updates and event handling. It's essential for building interactive and responsive user interfaces.",
        subtopics: [
            { title: "Variables and Data Types", description: "let, const, var" },
            { title: "Functions", description: "Arrow functions, callbacks" },
            { title: "DOM Manipulation", description: "Interacting with HTML" },
            { title: "Event Handling", description: "User interaction responses" },
            { title: "Async Programming", description: "Promises, async/await" },
            { title: "ES6+ Features", description: "Modern JavaScript syntax" }
        ],
        codeExample: {
            title: "Modern JavaScript",
            language: "javascript",
            code: "// Modern JavaScript (ES6+)\n\n// Arrow Functions\nconst greet = (name) => `Hello, ${name}!`;\n\n// DOM Manipulation\nconst button = document.querySelector('#submit-btn');\nconst output = document.querySelector('#output');\n\n// Event Handling with Async/Await\nbutton.addEventListener('click', async (e) => {\n  e.preventDefault();\n  \n  try {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    \n    output.innerHTML = data.items\n      .map(item => `<div class=\"item\">${item.name}</div>`)\n      .join('');\n  } catch (error) {\n    console.error('Error:', error);\n  }\n});\n\n// Array Methods\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconst evens = numbers.filter(n => n % 2 === 0);\nconst sum = numbers.reduce((a, b) => a + b, 0);"
        }
    },
    {
        id: "frontend-frameworks",
        title: "Frontend Frameworks",
        icon: "Boxes",
        iconBg: "bg-cyan-500/20 text-cyan-400",
        accentColor: "cyan",
        description: "Frameworks add structure, fast reloading, and pre-defined components for building Single Page Applications (SPAs). Popular frameworks include React, Angular, Vue.js, and jQuery.",
        subtopics: [
            { title: "React", description: "Component-based UI library by Meta" },
            { title: "Angular", description: "Full MVC framework by Google" },
            { title: "Vue.js", description: "Progressive JavaScript framework" },
            { title: "jQuery", description: "DOM manipulation library" },
            { title: "Bootstrap", description: "CSS framework with components" }
        ],
        codeExample: {
            title: "React Component",
            language: "jsx",
            code: "import React, { useState, useEffect } from 'react';\n\n// Functional Component with Hooks\nconst UserCard = ({ userId }) => {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    const fetchUser = async () => {\n      const response = await fetch(`/api/users/${userId}`);\n      const data = await response.json();\n      setUser(data);\n      setLoading(false);\n    };\n    fetchUser();\n  }, [userId]);\n\n  if (loading) return <div>Loading...</div>;\n\n  return (\n    <div className=\"user-card\">\n      <img src={user.avatar} alt={user.name} />\n      <h2>{user.name}</h2>\n      <p>{user.email}</p>\n      <button onClick={() => alert(`Hello ${user.name}!`)}>\n        Greet\n      </button>\n    </div>\n  );\n};\n\nexport default UserCard;"
        }
    },
    {
        id: "responsive-design",
        title: "Responsive Web Design",
        icon: "Smartphone",
        iconBg: "bg-purple-500/20 text-purple-400",
        accentColor: "purple",
        description: "Web applications should be accessible on devices of various sizes. Responsive design uses breakpoints, flexible images, CSS grids, and media queries to adapt layouts.",
        subtopics: [
            { title: "Breakpoints", description: "Device-specific adjustments" },
            { title: "Flexible Images", description: "Responsive image sizing" },
            { title: "Flexible Grids", description: "Fluid layouts" },
            { title: "Media Queries", description: "CSS conditional rules" },
            { title: "Mobile-First Design", description: "Starting from mobile" }
        ],
        codeExample: {
            title: "Responsive CSS",
            language: "css",
            code: "/* Mobile-First Approach */\n\n/* Base styles (mobile) */\n.container {\n  width: 100%;\n  padding: 1rem;\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n\nimg {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Tablet (768px+) */\n@media (min-width: 768px) {\n  .container {\n    max-width: 750px;\n    margin: 0 auto;\n  }\n  \n  .grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n/* Desktop (1024px+) */\n@media (min-width: 1024px) {\n  .container {\n    max-width: 1200px;\n  }\n  \n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}"
        }
    },
    {
        id: "frontend-security",
        title: "Frontend Security",
        icon: "Shield",
        iconBg: "bg-red-500/20 text-red-400",
        accentColor: "red",
        description: "Web security protects user data and prevents attacks. Common threats include DoS attacks, CSRF (Cross-Site Request Forgery), and XSS (Cross-Site Scripting) attacks.",
        subtopics: [
            { title: "XSS Prevention", description: "Sanitizing user input" },
            { title: "CSRF Protection", description: "Token-based security" },
            { title: "DoS Mitigation", description: "Rate limiting, firewalls" },
            { title: "Content Security Policy", description: "Browser security headers" },
            { title: "HTTPS", description: "Encrypted connections" }
        ],
        codeExample: {
            title: "Security Best Practices",
            language: "javascript",
            code: "// Frontend Security Best Practices\n\n// 1. Sanitize user input to prevent XSS\nconst sanitizeHTML = (str) => {\n  const temp = document.createElement('div');\n  temp.textContent = str;\n  return temp.innerHTML;\n};\n\n// 2. Use textContent instead of innerHTML\nuserElement.textContent = userInput; // Safe\n// userElement.innerHTML = userInput; // Dangerous!\n\n// 3. CSRF Token implementation\nconst csrfToken = document.querySelector('meta[name=\"csrf-token\"]').content;\n\nfetch('/api/submit', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json',\n    'X-CSRF-Token': csrfToken\n  },\n  body: JSON.stringify(data)\n});\n\n// 4. Validate data on client AND server\nconst validateEmail = (email) => {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n};"
        }
    },
    {
        id: "frontend-projects",
        title: "Frontend Projects",
        icon: "FolderCode",
        iconBg: "bg-emerald-500/20 text-emerald-400",
        accentColor: "emerald",
        description: "Build a strong portfolio with hands-on projects. Start with simple pages and progress to complex SPAs with APIs, state management, and authentication.",
        subtopics: [
            { title: "Tribute Page", description: "Simple HTML/CSS project" },
            { title: "Survey Form", description: "Form validation practice" },
            { title: "Portfolio Website", description: "Personal branding" },
            { title: "Image Gallery", description: "JavaScript interactions" },
            { title: "Restaurant Website", description: "Multi-page design" },
            { title: "Todo App", description: "CRUD operations" }
        ],
        codeExample: {
            title: "Todo App Component",
            language: "jsx",
            code: "import React, { useState } from 'react';\n\nconst TodoApp = () => {\n  const [todos, setTodos] = useState([]);\n  const [input, setInput] = useState('');\n\n  const addTodo = () => {\n    if (input.trim()) {\n      setTodos([...todos, { id: Date.now(), text: input, done: false }]);\n      setInput('');\n    }\n  };\n\n  const toggleTodo = (id) => {\n    setTodos(todos.map(todo =>\n      todo.id === id ? { ...todo, done: !todo.done } : todo\n    ));\n  };\n\n  const deleteTodo = (id) => {\n    setTodos(todos.filter(todo => todo.id !== id));\n  };\n\n  return (\n    <div className=\"todo-app\">\n      <h1>My Todos</h1>\n      <div className=\"input-group\">\n        <input\n          value={input}\n          onChange={(e) => setInput(e.target.value)}\n          placeholder=\"Add a task...\"\n        />\n        <button onClick={addTodo}>Add</button>\n      </div>\n      <ul>\n        {todos.map(todo => (\n          <li key={todo.id}>\n            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>\n              {todo.text}\n            </span>\n            <button onClick={() => toggleTodo(todo.id)}>✓</button>\n            <button onClick={() => deleteTodo(todo.id)}>✕</button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n};"
        }
    },
    {
        id: "frontend-interview",
        title: "Interview Preparation",
        icon: "GraduationCap",
        iconBg: "bg-indigo-500/20 text-indigo-400",
        accentColor: "indigo",
        description: "Prepare for frontend developer interviews with common questions on HTML, CSS, JavaScript, frameworks, and data structures. Practice coding challenges and system design.",
        subtopics: [
            { title: "HTML/CSS Questions", description: "Box model, flexbox, positioning" },
            { title: "JavaScript Questions", description: "Closures, hoisting, this keyword" },
            { title: "React Questions", description: "Hooks, lifecycle, state management" },
            { title: "Coding Challenges", description: "Algorithms and data structures" },
            { title: "System Design", description: "Frontend architecture" }
        ],
        codeExample: {
            title: "Common Interview Questions",
            language: "javascript",
            code: "// Q1: What is closure?\nfunction outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}\nconst counter = outer();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\n\n// Q2: Explain 'this' keyword\nconst obj = {\n  name: 'John',\n  greet: function() { console.log(this.name); },\n  greetArrow: () => console.log(this.name) // 'this' is lexically bound\n};\n\n// Q3: Debounce function\nfunction debounce(fn, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\n// Q4: Deep clone an object\nconst deepClone = (obj) => JSON.parse(JSON.stringify(obj));"
        }
    }
];
