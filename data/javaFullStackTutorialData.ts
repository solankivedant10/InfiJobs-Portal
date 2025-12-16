// Java Full Stack Developer Portal - Tutorial Data from GeeksforGeeks

export interface JavaTopic {
    id: string;
    title: string;
    icon: string;
    iconBg: string;
    accentColor: string;
    description: string;
    subtopics: { title: string; description?: string }[];
    codeExample?: { title: string; code: string; language: string };
}

export const javaFullStackTutorialData: JavaTopic[] = [
    {
        id: "intro-java-fullstack",
        title: "Who is a Java Full Stack Developer",
        icon: "Coffee",
        iconBg: "bg-red-500/20 text-red-400",
        accentColor: "red",
        description: "A Java Full Stack Developer is proficient in all application layers: Frontend (interfaces), Backend (business logic, APIs), and Database (data storage). They design, develop, and optimize complete applications.",
        subtopics: [
            { title: "Frontend Layer", description: "Building responsive interfaces" },
            { title: "Backend Layer", description: "Business logic and APIs" },
            { title: "Database Layer", description: "Data storage and retrieval" },
            { title: "Key Responsibilities", description: "Design, develop, optimize" },
            { title: "Salary Expectations", description: "₹3-14.5 LPA in India" }
        ],
        codeExample: {
            title: "Full Stack Architecture",
            language: "java",
            code: "// Full Stack Java Application Structure\n\n// Frontend: HTML/React calls REST API\n// ↓\n// Controller Layer (Spring MVC)\n@RestController\n@RequestMapping(\"/api/users\")\npublic class UserController {\n    @Autowired\n    private UserService userService;\n    \n    @GetMapping(\"/{id}\")\n    public User getUser(@PathVariable Long id) {\n        return userService.findById(id);\n    }\n}\n\n// ↓\n// Service Layer (Business Logic)\n@Service\npublic class UserService {\n    @Autowired\n    private UserRepository userRepository;\n    \n    public User findById(Long id) {\n        return userRepository.findById(id).orElse(null);\n    }\n}\n\n// ↓\n// Repository Layer (Database)\n@Repository\npublic interface UserRepository extends JpaRepository<User, Long> {}"
        }
    },
    {
        id: "java-core",
        title: "Java Core Concepts",
        icon: "Code",
        iconBg: "bg-orange-500/20 text-orange-400",
        accentColor: "orange",
        description: "A solid grasp of Java fundamentals is essential: decision-making, methods, OOP concepts (classes, objects, inheritance, polymorphism), arrays, collections framework, and generics.",
        subtopics: [
            { title: "Decision Making", description: "if/else, switch statements" },
            { title: "Methods", description: "Parameters, return types, exceptions" },
            { title: "OOP Concepts", description: "Classes, inheritance, polymorphism" },
            { title: "Arrays", description: "Initialization, traversal, sorting" },
            { title: "Collections Framework", description: "List, Set, Map, Queue" },
            { title: "Generics", description: "Type safety and reusability" }
        ],
        codeExample: {
            title: "Java OOP Example",
            language: "java",
            code: "// Object-Oriented Programming in Java\n\n// Abstraction\nabstract class Animal {\n    protected String name;\n    \n    public Animal(String name) {\n        this.name = name;\n    }\n    \n    public abstract void makeSound();\n}\n\n// Inheritance & Polymorphism\nclass Dog extends Animal {\n    public Dog(String name) {\n        super(name);\n    }\n    \n    @Override\n    public void makeSound() {\n        System.out.println(name + \" says: Woof!\");\n    }\n}\n\n// Encapsulation\nclass Person {\n    private String name;\n    private int age;\n    \n    public String getName() { return name; }\n    public void setName(String name) { this.name = name; }\n    \n    public int getAge() { return age; }\n    public void setAge(int age) {\n        if (age > 0) this.age = age;\n    }\n}"
        }
    },
    {
        id: "multithreading",
        title: "Multithreading",
        icon: "Layers",
        iconBg: "bg-blue-500/20 text-blue-400",
        accentColor: "blue",
        description: "Multithreading allows concurrent execution to maximize CPU utilization. Key concepts include Thread class, Runnable interface, synchronization, locks, thread pools, and deadlock prevention.",
        subtopics: [
            { title: "Thread Creation", description: "Thread class, Runnable interface" },
            { title: "Synchronization", description: "Thread safety mechanisms" },
            { title: "Locks", description: "ReentrantLock, ReadWriteLock" },
            { title: "Thread Pools", description: "ExecutorService" },
            { title: "Concurrent Collections", description: "BlockingQueue, ConcurrentHashMap" },
            { title: "Deadlock Prevention", description: "Avoiding thread deadlocks" }
        ],
        codeExample: {
            title: "Multithreading Example",
            language: "java",
            code: "import java.util.concurrent.*;\n\n// Thread Pool Example\npublic class ThreadPoolExample {\n    public static void main(String[] args) {\n        ExecutorService executor = Executors.newFixedThreadPool(3);\n        \n        for (int i = 0; i < 5; i++) {\n            final int taskId = i;\n            executor.submit(() -> {\n                System.out.println(\"Task \" + taskId + \n                    \" running on \" + Thread.currentThread().getName());\n                try {\n                    Thread.sleep(1000);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            });\n        }\n        \n        executor.shutdown();\n    }\n}\n\n// Synchronized Method\nclass Counter {\n    private int count = 0;\n    \n    public synchronized void increment() {\n        count++;\n    }\n    \n    public synchronized int getCount() {\n        return count;\n    }\n}"
        }
    },
    {
        id: "lambda-streams",
        title: "Lambda & Streams",
        icon: "ArrowRight",
        iconBg: "bg-emerald-500/20 text-emerald-400",
        accentColor: "emerald",
        description: "Lambda expressions (Java 8+) enable functional-style programming. Streams API provides powerful data processing with filter, map, reduce operations on collections.",
        subtopics: [
            { title: "Lambda Expressions", description: "Functional interfaces" },
            { title: "Method References", description: "Shorthand for lambdas" },
            { title: "Streams API", description: "Collection processing" },
            { title: "Filter & Map", description: "Transformation operations" },
            { title: "Reduce & Collect", description: "Aggregation operations" },
            { title: "Predicates", description: "Conditional logic" }
        ],
        codeExample: {
            title: "Lambda & Streams",
            language: "java",
            code: "import java.util.*;\nimport java.util.stream.*;\n\npublic class StreamExample {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\n            \"Alice\", \"Bob\", \"Charlie\", \"David\", \"Eve\"\n        );\n        \n        // Lambda with filter and map\n        List<String> result = names.stream()\n            .filter(name -> name.length() > 3)\n            .map(String::toUpperCase)\n            .sorted()\n            .collect(Collectors.toList());\n        \n        System.out.println(result); // [ALICE, CHARLIE, DAVID]\n        \n        // Reduce example\n        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);\n        int sum = numbers.stream()\n            .reduce(0, (a, b) -> a + b);\n        \n        System.out.println(\"Sum: \" + sum); // 15\n        \n        // Predicate example\n        Predicate<Integer> isEven = n -> n % 2 == 0;\n        long evenCount = numbers.stream()\n            .filter(isEven)\n            .count();\n    }\n}"
        }
    },
    {
        id: "git-version-control",
        title: "Git and Version Control",
        icon: "GitBranch",
        iconBg: "bg-gray-500/20 text-gray-400",
        accentColor: "gray",
        description: "Git enables collaboration and version tracking. Developers should learn repositories, cloning, committing, branching, rebasing, merging, and contributing to open-source projects.",
        subtopics: [
            { title: "Repository Basics", description: "Init, clone, remote" },
            { title: "Commits", description: "Add, commit, push" },
            { title: "Branching", description: "Create, switch, delete" },
            { title: "Merging", description: "Merge, rebase, resolve conflicts" },
            { title: "GitHub/GitLab", description: "Pull requests, code review" }
        ],
        codeExample: {
            title: "Git Workflow",
            language: "bash",
            code: "# Initialize repository\ngit init\n\n# Clone existing repository\ngit clone https://github.com/user/repo.git\n\n# Create and switch to new branch\ngit checkout -b feature/new-feature\n\n# Stage and commit changes\ngit add .\ngit commit -m \"Add new feature: user authentication\"\n\n# Push to remote\ngit push origin feature/new-feature\n\n# Merge feature branch to main\ngit checkout main\ngit merge feature/new-feature\n\n# Rebase for clean history\ngit checkout feature/new-feature\ngit rebase main\n\n# Resolve conflicts if any\ngit add .\ngit rebase --continue"
        }
    },
    {
        id: "jsp-servlets",
        title: "JSP and Servlets",
        icon: "FileCode",
        iconBg: "bg-purple-500/20 text-purple-400",
        accentColor: "purple",
        description: "Servlets are Java programs running on servers to handle client requests. JSP (Java Server Pages) simplifies creating dynamic web content by embedding Java in HTML.",
        subtopics: [
            { title: "Servlet Lifecycle", description: "init, service, destroy" },
            { title: "HTTP Methods", description: "doGet, doPost handling" },
            { title: "Request/Response", description: "HttpServletRequest/Response" },
            { title: "JSP Syntax", description: "Scriptlets, expressions, directives" },
            { title: "Session Management", description: "Cookies, URL rewriting" }
        ],
        codeExample: {
            title: "Servlet Example",
            language: "java",
            code: "import javax.servlet.*;\nimport javax.servlet.http.*;\nimport java.io.*;\n\n@WebServlet(\"/hello\")\npublic class HelloServlet extends HttpServlet {\n    \n    @Override\n    protected void doGet(HttpServletRequest request, \n                         HttpServletResponse response) \n            throws ServletException, IOException {\n        \n        String name = request.getParameter(\"name\");\n        \n        response.setContentType(\"text/html\");\n        PrintWriter out = response.getWriter();\n        \n        out.println(\"<html><body>\");\n        out.println(\"<h1>Hello, \" + name + \"!</h1>\");\n        out.println(\"</body></html>\");\n    }\n    \n    @Override\n    protected void doPost(HttpServletRequest request, \n                          HttpServletResponse response) \n            throws ServletException, IOException {\n        // Handle form submission\n        String username = request.getParameter(\"username\");\n        HttpSession session = request.getSession();\n        session.setAttribute(\"user\", username);\n        response.sendRedirect(\"dashboard\");\n    }\n}"
        }
    },
    {
        id: "hibernate",
        title: "Hibernate ORM",
        icon: "Database",
        iconBg: "bg-amber-500/20 text-amber-400",
        accentColor: "amber",
        description: "Hibernate is an ORM (Object Relational Mapping) tool that maps Java classes to database tables, simplifying database operations with automatic SQL generation.",
        subtopics: [
            { title: "Entity Mapping", description: "@Entity, @Table annotations" },
            { title: "Relationships", description: "@OneToMany, @ManyToOne" },
            { title: "Session Factory", description: "Configuration and sessions" },
            { title: "HQL", description: "Hibernate Query Language" },
            { title: "Criteria API", description: "Programmatic queries" },
            { title: "Caching", description: "First and second level cache" }
        ],
        codeExample: {
            title: "Hibernate Entity",
            language: "java",
            code: "import javax.persistence.*;\nimport java.util.*;\n\n@Entity\n@Table(name = \"users\")\npublic class User {\n    \n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    @Column(name = \"username\", nullable = false, unique = true)\n    private String username;\n    \n    @Column(name = \"email\")\n    private String email;\n    \n    @OneToMany(mappedBy = \"user\", cascade = CascadeType.ALL)\n    private List<Order> orders = new ArrayList<>();\n    \n    // Constructors\n    public User() {}\n    \n    public User(String username, String email) {\n        this.username = username;\n        this.email = email;\n    }\n    \n    // Getters and Setters\n    public Long getId() { return id; }\n    public String getUsername() { return username; }\n    public void setUsername(String username) { this.username = username; }\n    public String getEmail() { return email; }\n    public void setEmail(String email) { this.email = email; }\n}"
        }
    },
    {
        id: "spring-framework",
        title: "Spring Framework",
        icon: "Leaf",
        iconBg: "bg-green-500/20 text-green-400",
        accentColor: "green",
        description: "Spring is a comprehensive framework for building enterprise Java applications. Core areas include Dependency Injection, AOP, MVC, Data Access, and Security.",
        subtopics: [
            { title: "Dependency Injection", description: "IoC Container, @Autowired" },
            { title: "Spring AOP", description: "Aspect-Oriented Programming" },
            { title: "Spring MVC", description: "Web application framework" },
            { title: "Spring Data", description: "Database access abstraction" },
            { title: "Spring Security", description: "Authentication, authorization" }
        ],
        codeExample: {
            title: "Spring Dependency Injection",
            language: "java",
            code: "import org.springframework.beans.factory.annotation.*;\nimport org.springframework.stereotype.*;\n\n// Service Layer\n@Service\npublic class UserService {\n    \n    private final UserRepository userRepository;\n    private final EmailService emailService;\n    \n    // Constructor Injection (Recommended)\n    @Autowired\n    public UserService(UserRepository userRepository, \n                       EmailService emailService) {\n        this.userRepository = userRepository;\n        this.emailService = emailService;\n    }\n    \n    public User createUser(String username, String email) {\n        User user = new User(username, email);\n        userRepository.save(user);\n        emailService.sendWelcomeEmail(email);\n        return user;\n    }\n}\n\n// Controller Layer\n@Controller\n@RequestMapping(\"/users\")\npublic class UserController {\n    \n    @Autowired\n    private UserService userService;\n    \n    @GetMapping\n    public String listUsers(Model model) {\n        model.addAttribute(\"users\", userService.findAll());\n        return \"users/list\";\n    }\n}"
        }
    },
    {
        id: "rest-apis",
        title: "RESTful Web Services",
        icon: "Globe",
        iconBg: "bg-cyan-500/20 text-cyan-400",
        accentColor: "cyan",
        description: "REST (Representational State Transfer) allows communication between client and server using HTTP methods. Build scalable APIs with proper status codes and JSON responses.",
        subtopics: [
            { title: "HTTP Methods", description: "GET, POST, PUT, DELETE" },
            { title: "Status Codes", description: "200, 201, 400, 404, 500" },
            { title: "Request/Response", description: "JSON serialization" },
            { title: "Path Variables", description: "Dynamic URL parameters" },
            { title: "Request Body", description: "JSON payload handling" }
        ],
        codeExample: {
            title: "REST API Controller",
            language: "java",
            code: "import org.springframework.web.bind.annotation.*;\nimport org.springframework.http.*;\nimport java.util.*;\n\n@RestController\n@RequestMapping(\"/api/products\")\npublic class ProductController {\n    \n    @Autowired\n    private ProductService productService;\n    \n    // GET all products\n    @GetMapping\n    public List<Product> getAllProducts() {\n        return productService.findAll();\n    }\n    \n    // GET product by ID\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<Product> getProduct(@PathVariable Long id) {\n        Product product = productService.findById(id);\n        if (product == null) {\n            return ResponseEntity.notFound().build();\n        }\n        return ResponseEntity.ok(product);\n    }\n    \n    // POST - Create product\n    @PostMapping\n    public ResponseEntity<Product> createProduct(@RequestBody Product product) {\n        Product saved = productService.save(product);\n        return ResponseEntity.status(HttpStatus.CREATED).body(saved);\n    }\n    \n    // DELETE product\n    @DeleteMapping(\"/{id}\")\n    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {\n        productService.delete(id);\n        return ResponseEntity.noContent().build();\n    }\n}"
        }
    },
    {
        id: "spring-boot",
        title: "Spring Boot",
        icon: "Zap",
        iconBg: "bg-lime-500/20 text-lime-400",
        accentColor: "lime",
        description: "Spring Boot simplifies Spring application setup by eliminating XML configuration. Features include auto-configuration, embedded servers, and production-ready features.",
        subtopics: [
            { title: "Auto-Configuration", description: "Convention over configuration" },
            { title: "Starter Dependencies", description: "Pre-packaged dependencies" },
            { title: "Embedded Server", description: "Tomcat, Jetty, Undertow" },
            { title: "Properties", description: "application.properties/yml" },
            { title: "Actuator", description: "Production monitoring" }
        ],
        codeExample: {
            title: "Spring Boot Application",
            language: "java",
            code: "import org.springframework.boot.*;\nimport org.springframework.boot.autoconfigure.*;\nimport org.springframework.web.bind.annotation.*;\n\n@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}\n\n// application.properties\n/*\nserver.port=8080\nspring.datasource.url=jdbc:mysql://localhost:3306/mydb\nspring.datasource.username=root\nspring.datasource.password=password\nspring.jpa.hibernate.ddl-auto=update\n*/\n\n// Simple REST Controller\n@RestController\npublic class HelloController {\n    \n    @GetMapping(\"/hello\")\n    public String hello(@RequestParam(defaultValue = \"World\") String name) {\n        return \"Hello, \" + name + \"!\";\n    }\n    \n    @GetMapping(\"/health\")\n    public Map<String, String> health() {\n        return Map.of(\"status\", \"UP\", \"time\", LocalDateTime.now().toString());\n    }\n}"
        }
    },
    {
        id: "junit-testing",
        title: "JUnit Testing",
        icon: "CheckCircle",
        iconBg: "bg-indigo-500/20 text-indigo-400",
        accentColor: "indigo",
        description: "JUnit is a widely used framework for unit testing Java applications. Write tests to verify code correctness, ensure quality, and enable safe refactoring.",
        subtopics: [
            { title: "Test Annotations", description: "@Test, @BeforeEach, @AfterEach" },
            { title: "Assertions", description: "assertEquals, assertTrue, assertThrows" },
            { title: "Test Lifecycle", description: "Setup and teardown" },
            { title: "Parameterized Tests", description: "Testing with multiple inputs" },
            { title: "Mocking", description: "Mockito for dependencies" }
        ],
        codeExample: {
            title: "JUnit Test Example",
            language: "java",
            code: "import org.junit.jupiter.api.*;\nimport static org.junit.jupiter.api.Assertions.*;\nimport static org.mockito.Mockito.*;\n\nclass UserServiceTest {\n    \n    private UserService userService;\n    private UserRepository mockRepository;\n    \n    @BeforeEach\n    void setUp() {\n        mockRepository = mock(UserRepository.class);\n        userService = new UserService(mockRepository);\n    }\n    \n    @Test\n    void testFindById_ReturnsUser() {\n        // Arrange\n        User expectedUser = new User(\"john\", \"john@email.com\");\n        when(mockRepository.findById(1L)).thenReturn(Optional.of(expectedUser));\n        \n        // Act\n        User result = userService.findById(1L);\n        \n        // Assert\n        assertNotNull(result);\n        assertEquals(\"john\", result.getUsername());\n        verify(mockRepository, times(1)).findById(1L);\n    }\n    \n    @Test\n    void testFindById_ThrowsException_WhenNotFound() {\n        when(mockRepository.findById(99L)).thenReturn(Optional.empty());\n        \n        assertThrows(UserNotFoundException.class, () -> {\n            userService.findById(99L);\n        });\n    }\n}"
        }
    }
];
