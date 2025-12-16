/**
 * Mock Data for InfiJobs Learning Portal
 * * API Migration Readiness:
 * These exports are structured to be easily replaced with API calls.
 */

// --- 1. Strong Type Definitions ---

export interface LearningCard {
    id: string;
    title: string;
    courseLink?: string;
    materialsLink?: string;
    VideoTutorialLink?: string;
    description?: string;
}

export interface QuizQuestion {
    q: string;     // Question text
    o: string[];   // Options
    a: number;     // Answer index (0-3)
}

export interface Quiz {
    title: string;
    description: string;
    questions: QuizQuestion[];
}

export interface RoadmapStep {
    id: string;
    step: string;
    desc: string;
}

// --- 2. Data Exports ---

export const learningCards: LearningCard[] = [
    {
        id: "ba",
        title: "Business Analyst",
        courseLink: "https://prezi.com/view/jY8YAG0TTIMizzmXHuk2/",
        materialsLink: "https://www.notion.so/Business-Analyst-2ae1f764279c80518dc7e6e19016074a?source=copy_link",
        VideoTutorialLink: "https://www.youtube.com/live/ABAL1nmORgk?si=YIxMBjls9xGdFX0p",
    },
    {
        id: "fa",
        title: "Financial Analyst",
        courseLink: "https://prezi.com/p/sygt3f0mignr/financial-analyst-course-structure/?present=1",
        materialsLink: "https://www.notion.so/Financial-Analyst-2ae1f764279c80c7a2dde1beeb4c667a?source=copy_link",
        VideoTutorialLink: "https://youtu.be/3hnIYbKUm8U?si=Jpma58qAJQnv8ulz",
    },
    {
        id: "da",
        title: "Data Analyst",
        courseLink: "https://prezi.com/view/v5Pn0FxFVqQBwNPNcezu/",
        materialsLink: "https://www.notion.so/Data-Analyst-2ae1f764279c807a9c31e64d75b59aae?source=copy_link",
        VideoTutorialLink: "https://youtu.be/GPVsHOlRBBI?si=w0zqA4ddhTnHiTrv",
    },
    {
        id: "ds",
        title: "Data Scientist",
        courseLink: "https://prezi.com/view/r2bCBg7wHfL52JZqoa0M/",
        materialsLink: "https://www.notion.so/Data-Scientist-2ae1f764279c807d8e22e0789d84c8bb?source=copy_link",
        VideoTutorialLink: "https://www.youtube.com/watch?v=1qz7qUM6yUI&list=PLVHgQku8Z936EUyyl9WKYkvbJ5lJqTHPx&pp=0gcJCbAEOCosWNin",
    },
    {
        id: "de",
        title: "Data Engineering",
        courseLink: "https://prezi.com/view/UsQpjKbpyUu4QlXk4rxY/",
        materialsLink: "https://www.notion.so/Data-Engineering-2ae1f764279c80fa8855df36fc0be079?source=copy_link",
        VideoTutorialLink: "https://www.youtube.com/live/OoHPhLV43gg?si=rQOj_khE_cSyRcCq",
    },
    {
        id: "bi",
        title: "Business Intelligence Analyst",
        courseLink: "https://prezi.com/view/VwrsNXPhSYjN29n3RqT8/",
        materialsLink: "https://www.notion.so/Business-Intelligence-Analyst-2ae1f764279c8040af0cf6f32ab535b3?source=copy_link",
        VideoTutorialLink: "https://www.youtube.com/live/Hg8zBJ1DhLQ?si=VA6OUqZd-JB0KX9V",
    },
    {
        id: "sc",
        title: "Supply Chain Analyst",
        courseLink: "https://prezi.com/p/edit/_t55i13ev0ux/",
        materialsLink: "https://www.notion.so/Supply-Chain-Analyst-2ae1f764279c8029b88af20fd1761057?source=copy_link",
        VideoTutorialLink: "https://youtu.be/j8cAlTW_FC8?si=SPH6E8877_BSUq8A",
    },
    {
        id: "jf",
        title: "Java Full Stack Developer",
        courseLink: "https://prezi.com/p/edit/eohh5mv_xcd0/",
        materialsLink: "https://www.notion.so/Java-Full-Stack-Developer-2ae1f764279c80de933ddc0463221994?source=copy_link",
        VideoTutorialLink: "https://youtu.be/fmX84zu-5gs?si=u5OA-qN2IDrUYesQ",
    },
    {
        id: "fd",
        title: "Frontend Developer",
        courseLink: "https://prezi.com/p/edit/demiajahnh1m/",
        materialsLink: "https://www.notion.so/Frontend-Developer-2ae1f764279c80d19b03e7cbc834652d?source=copy_link",
        VideoTutorialLink: "https://www.youtube.com/watch?v=4WjtQjPQGIs&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i",
    },
];

export const quizData: Record<string, Quiz> = {
    'ba-quiz': {
        title: 'Business Analyst Quiz',
        description: 'Test your knowledge on key Business Analyst screening questions.',
        questions: [
            {
                q: 'What is the main purpose of a "Use Case Diagram"?',
                o: [
                    "To show the system's database structure.",
                    'To model the interactions between users (actors) and the system.',
                    'To detail the flow of data between system components.',
                    'To plan the project timeline and milestones.'
                ],
                a: 1
            },
            {
                q: 'What does the acronym "SWOT" stand for in business analysis?',
                o: [
                    'Software, Hardware, Operations, Technology',
                    'System, Website, Optimization, Testing',
                    'Strengths, Weaknesses, Opportunities, Threats',
                    'Sales, Workflows, Outcomes, Targets'
                ],
                a: 2
            },
            {
                q: 'Which of these is a common requirement elicitation technique?',
                o: [
                    'Code Deployment',
                    'Database Normalization',
                    'Brainstorming and Interviews',
                    'Unit Testing'
                ],
                a: 2
            },
            {
                q: 'What is the difference between "Business Requirements" and "Functional Requirements"?',
                o: [
                    'They are the same thing.',
                    'Business reqs are high-level goals; Functional reqs describe *what* the system must do.',
                    'Functional reqs are high-level; Business reqs describe *how* the system does it.',
                    'Business reqs are for marketing; Functional reqs are for developers.'
                ],
                a: 1
            },
            {
                q: 'What is "Requirement Traceability"?',
                o: [
                    'A matrix that tracks the life of a requirement from its origin to its implementation.',
                    'A document that lists all project stakeholders.',
                    'A technique for drawing flowcharts.',
                    'A software for tracking bugs.'
                ],
                a: 0
            },
            {
                q: 'What is "Gap Analysis"?',
                o: [
                    'Identifying the space between two database tables.',
                    'The process of comparing the current state with the desired future state.',
                    'Calculating the budget deficit for a project.',
                    'Testing software for security holes.'
                ],
                a: 1
            },
            {
                q: 'What does the MoSCoW method help a Business Analyst do?',
                o: [
                    'Schedule meetings in different time zones.',
                    'Prioritize requirements (Must, Should, Could, Won\'t).',
                    'Design the user interface colors.',
                    'Calculate the project ROI.'
                ],
                a: 1
            },
            {
                q: 'Which document is typically created to define the high-level scope and business need of a project?',
                o: [
                    'Test Case Document',
                    'BRD (Business Requirements Document)',
                    'User Manual',
                    'API Documentation'
                ],
                a: 1
            },
            {
                q: 'In the RACI matrix, what does the "A" stand for?',
                o: [
                    'Advised',
                    'Accountable',
                    'Assistant',
                    'Authorized'
                ],
                a: 1
            },
            {
                q: 'What is "Scope Creep"?',
                o: [
                    'The slow pace of project development.',
                    'Uncontrolled changes or continuous growth in a project’s scope.',
                    'The detailed analysis of the project scope.',
                    'Moving a project from one team to another.'
                ],
                a: 1
            },
            {
                q: 'What is the primary goal of UAT (User Acceptance Testing)?',
                o: [
                    'To find syntax errors in the code.',
                    'To ensure the system works for the end-user in real-world scenarios.',
                    'To stress test the server infrastructure.',
                    'To check if the database is normalized.'
                ],
                a: 1
            },
            {
                q: 'In Agile methodology, what is a "User Story"?',
                o: [
                    'A bug report filed by a user.',
                    'A short description of a feature from the perspective of the user desiring the capability.',
                    'A long narrative about the history of the company.',
                    'The biography of the project manager.'
                ],
                a: 1
            },
            {
                q: 'What does BPMN stand for?',
                o: [
                    'Business Project Management Network',
                    'Basic Process Modeling Numbers',
                    'Business Process Model and Notation',
                    'Business Planning and Marketing Niche'
                ],
                a: 2
            },
            {
                q: 'What does the INVEST mnemonic stand for regarding User Stories?',
                o: [
                    'Independent, Negotiable, Valuable, Estimable, Small, Testable',
                    'Investigate, Navigate, Verify, Enter, Solve, Terminate',
                    'Immediate, Necessary, Valid, Easy, Secure, Timely',
                    'Input, Network, Variable, Enterprise, System, Technology'
                ],
                a: 0
            },
            {
                q: 'Which of the following is considered a "Non-Functional Requirement"?',
                o: [
                    'The system shall allow users to log in.',
                    'The system shall calculate sales tax.',
                    'The system page load time must be under 2 seconds.',
                    'The system shall generate a monthly PDF report.'
                ],
                a: 2
            },
            {
                q: 'What is the Pareto Principle (80/20 Rule) often applied to in analysis?',
                o: [
                    '80% of the work takes 20% of the time.',
                    '80% of effects come from 20% of the causes.',
                    '80% of the budget should be spent on 20% of the features.',
                    '80% of stakeholders agree on 20% of the requirements.'
                ],
                a: 1
            },
            {
                q: 'What is the main role of a "Product Owner" in Scrum?',
                o: [
                    'To manage the daily schedule of the developers.',
                    'To write the code for the most critical features.',
                    'To maximize the value of the product and manage the Product Backlog.',
                    'To organize team-building events.'
                ],
                a: 2
            },
            {
                q: 'What is an "Activity Diagram" primarily used for?',
                o: [
                    'To show the sequence of messages between objects.',
                    'To visualize the workflow or logic of a process.',
                    'To depict the physical hardware of a system.',
                    'To list the attributes of a class.'
                ],
                a: 1
            },
            {
                q: 'When defining SMART goals, what does the "M" stand for?',
                o: [
                    'Meaningful',
                    'Measurable',
                    'Manageable',
                    'Mandatory'
                ],
                a: 1
            },
            {
                q: 'What is the purpose of a "Feasibility Study"?',
                o: [
                    'To determine if a proposed project is practical and viable.',
                    'To train users on the new software.',
                    'To write the code for the prototype.',
                    'To create the marketing plan.'
                ],
                a: 0
            }
        ]
    },
    'da-quiz': {
        title: 'Data Analyst Quiz',
        description: 'Assess your understanding of data analysis concepts, SQL, and statistics.',
        questions: [
            // --- Original 2 Questions ---
            {
                q: 'Which SQL clause is used to filter records?',
                o: ['GROUP BY', 'ORDER BY', 'WHERE', 'JOIN'],
                a: 2
            },
            {
                q: 'What is the median of the dataset [2, 5, 9, 12, 15]?',
                o: ['5', '9', '12', '8.6'],
                a: 1
            },
            // --- New Added Questions (3-20) ---
            {
                q: 'Which type of SQL JOIN returns all records from the left table, and the matched records from the right table?',
                o: [
                    'INNER JOIN',
                    'RIGHT JOIN',
                    'LEFT JOIN',
                    'FULL OUTER JOIN'
                ],
                a: 2
            },
            {
                q: 'Which chart type is best suited for showing trends over a period of time?',
                o: [
                    'Pie Chart',
                    'Line Chart',
                    'Scatter Plot',
                    'Histogram'
                ],
                a: 1
            },
            {
                q: 'In statistics, what does "Standard Deviation" measure?',
                o: [
                    'The central value of the data.',
                    'The most frequent value.',
                    'The amount of variation or dispersion in a set of values.',
                    'The symmetry of the distribution.'
                ],
                a: 2
            },
            {
                q: 'What does the acronym ETL stand for?',
                o: [
                    'Extract, Transform, Load',
                    'Execute, Transmit, Load',
                    'Enter, Test, Log',
                    'Evaluate, Track, Learn'
                ],
                a: 0
            },
            {
                q: 'Which SQL keyword is used to remove duplicate records from a result set?',
                o: [
                    'UNIQUE',
                    'DISTINCT',
                    'DIFFERENT',
                    'SEPARATE'
                ],
                a: 1
            },
            {
                q: 'What is the purpose of "Imputation" in data cleaning?',
                o: [
                    'Removing all rows with errors.',
                    'Replacing missing data with substituted values (e.g., mean or median).',
                    'Converting text data to numbers.',
                    'Sorting data in ascending order.'
                ],
                a: 1
            },
            {
                q: 'Which visualization is most effective for identifying outliers and understanding data distribution?',
                o: [
                    'Box Plot',
                    'Donut Chart',
                    'Stacked Bar Chart',
                    'Gantt Chart'
                ],
                a: 0
            },
            {
                q: 'What is the difference between the "WHERE" and "HAVING" clauses in SQL?',
                o: [
                    'They are interchangeable.',
                    'WHERE filters groups; HAVING filters individual rows.',
                    'WHERE filters individual rows; HAVING filters groups after aggregation.',
                    'HAVING can only be used with the JOIN clause.'
                ],
                a: 2
            },
            {
                q: 'A correlation coefficient of +1.0 indicates:',
                o: [
                    'No relationship between variables.',
                    'A perfect negative relationship.',
                    'A perfect positive relationship.',
                    'A weak positive relationship.'
                ],
                a: 2
            },
            {
                q: 'Which Python library is most commonly used for data manipulation and analysis?',
                o: [
                    'Matplotlib',
                    'Pandas',
                    'Flask',
                    'Django'
                ],
                a: 1
            },
            {
                q: 'What does a "Primary Key" ensure in a database table?',
                o: [
                    'That the table has a connection to another table.',
                    'That the column can accept NULL values.',
                    'That each record in the table is unique and not NULL.',
                    'That the text is formatted correctly.'
                ],
                a: 2
            },
            {
                q: 'Which SQL aggregate function is used to calculate the total sum of a numeric column?',
                o: [
                    'COUNT()',
                    'AVG()',
                    'SUM()',
                    'MAX()'
                ],
                a: 2
            },
            {
                q: 'What is "Data Normalization"?',
                o: [
                    'The process of organizing data to reduce redundancy and improve integrity.',
                    'The process of creating backup copies of data.',
                    'The process of deleting old data.',
                    'The process of visualizing data on a map.'
                ],
                a: 0
            },
            {
                q: 'Which chart is best used to determine the relationship or correlation between two continuous variables?',
                o: [
                    'Bar Chart',
                    'Scatter Plot',
                    'Pie Chart',
                    'Treemap'
                ],
                a: 1
            },
            {
                q: 'In a dataset, the "Mode" refers to:',
                o: [
                    'The average value.',
                    'The middle value.',
                    'The difference between the highest and lowest value.',
                    'The value that appears most frequently.'
                ],
                a: 3
            },
            {
                q: 'Which SQL wildcard character represents zero, one, or multiple characters?',
                o: [
                    '_ (Underscore)',
                    '? (Question Mark)',
                    '% (Percent Sign)',
                    '# (Hash)'
                ],
                a: 2
            },
            {
                q: 'What describes "Qualitative Data"?',
                o: [
                    'Data that is numerical and can be measured (e.g., height, weight).',
                    'Data that is categorical and descriptive (e.g., color, name, feedback).',
                    'Data that changes over time.',
                    'Data generated by machines.'
                ],
                a: 1
            },
            {
                q: 'What is A/B Testing primarily used for?',
                o: [
                    'To test the speed of a database.',
                    'To compare two versions of a variable to determine which performs better.',
                    'To checking for bugs in Python code.',
                    'To visualize geographical data.'
                ],
                a: 1
            }
        ]
    },
    'ds-quiz': {
        title: 'Data Scientist Quiz',
        description: 'Test your knowledge on Data Science fundamentals, Machine Learning, and Statistics.',
        questions: [
            // --- Original 2 Questions ---
            {
                q: 'Which of these is a supervised learning algorithm?',
                o: ['K-Means', 'Linear Regression', 'PCA', 'Apriori'],
                a: 1
            },
            {
                q: 'What is overfitting?',
                o: ['Model performs well on training data but poor on test data', 'Model performs poor on both', 'Model performs well on both', 'None of the above'],
                a: 0
            },
            // --- New Added Questions (3-20) ---
            {
                q: 'What is the purpose of the "Bias-Variance Tradeoff"?',
                o: [
                    'To maximize bias and variance simultaneously.',
                    'To eliminate bias completely.',
                    'To find the optimal balance between underfitting and overfitting.',
                    'To increase the complexity of the model.'
                ],
                a: 2
            },
            {
                q: 'Which technique is used to handle imbalanced datasets?',
                o: [
                    'PCA (Principal Component Analysis)',
                    'SMOTE (Synthetic Minority Over-sampling Technique)',
                    'K-Means Clustering',
                    'Linear Regression'
                ],
                a: 1
            },
            {
                q: 'What does "Precision" measure in a classification matrix?',
                o: [
                    'The ratio of correctly predicted positive observations to the total predicted positives.',
                    'The ratio of correctly predicted positive observations to all observations in the actual class.',
                    'The overall accuracy of the model.',
                    'The number of true negatives.'
                ],
                a: 0
            },
            {
                q: 'Which of the following is an unsupervised learning algorithm?',
                o: [
                    'Decision Tree',
                    'Random Forest',
                    'K-Means Clustering',
                    'Logistic Regression'
                ],
                a: 2
            },
            {
                q: 'What is the function of an activation function in a Neural Network?',
                o: [
                    'To initialize weights.',
                    'To introduce non-linearity into the output of a neuron.',
                    'To calculate the error rate.',
                    'To split the data into training and testing sets.'
                ],
                a: 1
            },
            {
                q: 'What does "PCA" (Principal Component Analysis) primarily achieve?',
                o: [
                    'It increases the number of features in a dataset.',
                    'It reduces the dimensionality of a dataset while preserving variance.',
                    'It clusters data into k groups.',
                    'It predicts continuous values.'
                ],
                a: 1
            },
            {
                q: 'Which evaluation metric is best for a regression problem?',
                o: [
                    'Accuracy',
                    'F1-Score',
                    'RMSE (Root Mean Squared Error)',
                    'Recall'
                ],
                a: 2
            },
            {
                q: 'What is "Regularization" used for in Machine Learning?',
                o: [
                    'To speed up training.',
                    'To prevent overfitting by penalizing large weights.',
                    'To normalize the data.',
                    'To handle missing values.'
                ],
                a: 1
            },
            {
                q: 'In Deep Learning, what is a "CNN" primarily used for?',
                o: [
                    'Time-series forecasting',
                    'Image recognition and processing',
                    'Text sentiment analysis',
                    'Tabular data regression'
                ],
                a: 1
            },
            {
                q: 'What is the "Null Hypothesis" in statistical testing?',
                o: [
                    'The hypothesis that there is a significant difference.',
                    'The hypothesis that there is no significant difference or relationship.',
                    'The alternative conclusion to be proven.',
                    'The error rate of the test.'
                ],
                a: 1
            },
            {
                q: 'Which algorithm is an ensemble learning method?',
                o: [
                    'Decision Tree',
                    'SVM (Support Vector Machine)',
                    'Random Forest',
                    'Naive Bayes'
                ],
                a: 2
            },
            {
                q: 'What is "Data Leakage" in the context of model training?',
                o: [
                    'Losing data during file transfer.',
                    'When information from outside the training dataset is used to create the model.',
                    'When the model fails to learn patterns.',
                    'When the database is hacked.'
                ],
                a: 1
            },
            {
                q: 'What is the "p-value" in hypothesis testing?',
                o: [
                    'The probability of the model being correct.',
                    'The probability of obtaining results at least as extreme as the observed results, assuming the null hypothesis is true.',
                    'The error margin of the prediction.',
                    'The exact value of the correlation.'
                ],
                a: 1
            },
            {
                q: 'Which of the following is a hyperparameter in a Random Forest model?',
                o: [
                    'The weights of the connections.',
                    'The number of trees in the forest.',
                    'The final accuracy score.',
                    'The feature importance values.'
                ],
                a: 1
            },
            {
                q: 'What is "Gradient Descent"?',
                o: [
                    'A clustering algorithm.',
                    'An optimization algorithm used to minimize the loss function.',
                    'A method to visualize data distributions.',
                    'A type of neural network layer.'
                ],
                a: 1
            },
            {
                q: 'Which NLP technique converts text into numerical vectors?',
                o: [
                    'Tokenization',
                    'Stemming',
                    'TF-IDF (Term Frequency-Inverse Document Frequency)',
                    'Lemmatization'
                ],
                a: 2
            }
        ]
    },
    'de-quiz': {
        title: 'Data Engineer Quiz',
        description: 'Test your Data Engineering skills, including Big Data, ETL, and Cloud concepts.',
        questions: [
            // --- Original 2 Questions ---
            {
                q: 'Which is NOT a characteristic of Big Data (3 Vs)?',
                o: ['Volume', 'Velocity', 'Variety', 'Validation'],
                a: 3
            },
            {
                q: 'What does ETL stand for?',
                o: ['Extract Transform Load', 'Evaluate Test Learn', 'Export Transfer Load', 'Estimated Time Limit'],
                a: 0
            },
            // --- New Added Questions (3-20) ---
            {
                q: 'Which component of Hadoop is responsible for distributed storage?',
                o: [
                    'MapReduce',
                    'HDFS (Hadoop Distributed File System)',
                    'YARN',
                    'Hive'
                ],
                a: 1
            },
            {
                q: 'What is the primary difference between a Data Warehouse and a Data Lake?',
                o: [
                    'Data Warehouses store unstructured data; Data Lakes store structured data.',
                    'Data Warehouses store structured, processed data; Data Lakes store raw data in its native format.',
                    'Data Lakes are more expensive than Data Warehouses.',
                    'There is no difference.'
                ],
                a: 1
            },
            {
                q: 'Which tool is widely used for orchestrating complex data workflows and pipelines?',
                o: [
                    'Apache Kafka',
                    'Apache Spark',
                    'Apache Airflow',
                    'Docker'
                ],
                a: 2
            },
            {
                q: 'What is "Apache Kafka" primarily used for?',
                o: [
                    'Batch processing large datasets.',
                    'Real-time event streaming and data pipelining.',
                    'Visualizing data dashboards.',
                    'Storing relational data.'
                ],
                a: 1
            },
            {
                q: 'In the context of database transactions, what does ACID stand for?',
                o: [
                    'Atomicity, Consistency, Isolation, Durability',
                    'Accuracy, Completeness, Integrity, Data',
                    'Authorization, Certification, Identification, Defense',
                    'Access, Control, Information, Design'
                ],
                a: 0
            },
            {
                q: 'What is "Data Sharding"?',
                o: [
                    'Backing up data to a secure location.',
                    'Encrypting data for security.',
                    'Partitioning data across multiple machines or databases to improve scalability.',
                    'Deleting old and unused data.'
                ],
                a: 2
            },
            {
                q: 'Which file format is a columnar storage format optimized for analytics?',
                o: [
                    'CSV',
                    'JSON',
                    'Parquet',
                    'XML'
                ],
                a: 2
            },
            {
                q: 'What is the purpose of "Schema Evolution"?',
                o: [
                    'To prevent any changes to the database structure.',
                    'To allow the schema of data to change over time without breaking downstream applications.',
                    'To automatically generate SQL queries.',
                    'To compress data for storage.'
                ],
                a: 1
            },
            {
                q: 'Which statement best describes "ELT" (Extract, Load, Transform)?',
                o: [
                    'Transforming data before loading it into the destination.',
                    'Loading raw data into the destination first, then transforming it using the destination\'s compute power.',
                    'A process only used for small datasets.',
                    'Deleting data after loading.'
                ],
                a: 1
            },
            {
                q: 'What is a "Data Mart"?',
                o: [
                    'A subset of a data warehouse oriented to a specific business line or team.',
                    'A large unstructured data storage.',
                    'A tool for visualizing data.',
                    'The process of buying data from vendors.'
                ],
                a: 0
            },
            {
                q: 'Which SQL command is used to change the structure of an existing table (e.g., add a column)?',
                o: [
                    'UPDATE',
                    'MODIFY',
                    'ALTER',
                    'CHANGE'
                ],
                a: 2
            },
            {
                q: 'What is "Idempotency" in data pipelines?',
                o: [
                    'The ability of a pipeline to process data faster.',
                    'The property that an operation can be applied multiple times without changing the result beyond the initial application.',
                    'The process of identifying errors in data.',
                    'A security protocol for data transfer.'
                ],
                a: 1
            },
            {
                q: 'Which cloud service is a fully managed serverless data warehouse by Google?',
                o: [
                    'Amazon Redshift',
                    'Azure Synapse',
                    'Google BigQuery',
                    'Snowflake'
                ],
                a: 2
            },
            {
                q: 'What is the CAP Theorem in distributed systems?',
                o: [
                    'Consistency, Availability, Partition Tolerance',
                    'Capacity, Accuracy, Performance',
                    'Control, Access, Privacy',
                    'Compute, Analyze, Process'
                ],
                a: 0
            },
            {
                q: 'Which of the following is a NoSQL database?',
                o: [
                    'PostgreSQL',
                    'MySQL',
                    'MongoDB',
                    'Oracle Database'
                ],
                a: 2
            },
            {
                q: 'What is the function of "YARN" in Hadoop?',
                o: [
                    'Data storage',
                    'Resource management and job scheduling',
                    'Data processing',
                    'Query execution'
                ],
                a: 1
            }
        ]
    },
    'fa-quiz': {
        title: 'Financial Analyst Quiz',
        description: 'Test your Financial Analysis knowledge, including Ratios, Valuation, and Accounting principles.',
        questions: [
            // --- Original Question ---
            {
                q: 'What does EBITDA stand for?',
                o: [
                    'Earnings Before Interest, Taxes, Depreciation, and Amortization',
                    'Estimated Budget Interest Tax Depreciation Amortization',
                    'Earnings Below Interest Tax Debt Amortization',
                    'None'
                ],
                a: 0
            },
            // --- New Added Questions (2-20) ---
            {
                q: 'Which financial statement reports a company\'s financial position at a specific point in time?',
                o: [
                    'Income Statement',
                    'Cash Flow Statement',
                    'Balance Sheet',
                    'Statement of Retained Earnings'
                ],
                a: 2
            },
            {
                q: 'What is the formula for the "Current Ratio"?',
                o: [
                    'Current Assets / Current Liabilities',
                    'Total Assets / Total Liabilities',
                    'Current Liabilities / Current Assets',
                    '(Current Assets - Inventory) / Current Liabilities'
                ],
                a: 0
            },
            {
                q: 'What does "WACC" stand for in finance?',
                o: [
                    'Weighted Average Cost of Capital',
                    'Working Asset Capital Cost',
                    'Weekly Average Cash Currency',
                    'Weighted Asset Credit Calculation'
                ],
                a: 0
            },
            {
                q: 'Which valuation method relies on forecasting future free cash flows and discounting them back to the present?',
                o: [
                    'Comparable Company Analysis',
                    'Precedent Transactions',
                    'Discounted Cash Flow (DCF)',
                    'Asset-Based Valuation'
                ],
                a: 2
            },
            {
                q: 'What is the primary purpose of the Cash Flow Statement?',
                o: [
                    'To show the company\'s profitability.',
                    'To show the inflows and outflows of cash over a period.',
                    'To list all assets and liabilities.',
                    'To calculate the tax liability.'
                ],
                a: 1
            },
            {
                q: 'If a company has a high Debt-to-Equity ratio, it indicates:',
                o: [
                    'The company has zero debt.',
                    'The company is financing its growth aggressively with debt.',
                    'The company is highly profitable.',
                    'The company has more equity than debt.'
                ],
                a: 1
            },
            {
                q: 'Which of the following is considered a non-cash expense?',
                o: [
                    'Rent',
                    'Salaries',
                    'Depreciation',
                    'Interest Payments'
                ],
                a: 2
            },
            {
                q: 'What does "ROI" stand for?',
                o: [
                    'Return on Interest',
                    'Rate of Inflation',
                    'Return on Investment',
                    'Risk on Investment'
                ],
                a: 2
            },
            {
                q: 'Which ratio measures how efficiently a company uses its assets to generate revenue?',
                o: [
                    'Quick Ratio',
                    'Asset Turnover Ratio',
                    'Debt Ratio',
                    'P/E Ratio'
                ],
                a: 1
            },
            {
                q: 'What is the difference between Gross Profit and Net Profit?',
                o: [
                    'Gross Profit includes taxes; Net Profit does not.',
                    'Gross Profit is Revenue minus COGS; Net Profit is Revenue minus all expenses.',
                    'There is no difference.',
                    'Net Profit is calculated before interest payments.'
                ],
                a: 1
            },
            {
                q: 'What does the "P/E Ratio" measure?',
                o: [
                    'The relationship between a company\'s stock price and its earnings per share.',
                    'The percentage of earnings paid as dividends.',
                    'The profit margin of a product.',
                    'The total debt of a company relative to its equity.'
                ],
                a: 0
            },
            {
                q: 'Which of these is a "Leading Indicator" in economics?',
                o: [
                    'Unemployment Rate',
                    'Stock Market Returns',
                    'GDP Growth',
                    'Inflation Rate'
                ],
                a: 1
            },
            {
                q: 'What is "Working Capital"?',
                o: [
                    'Total Assets - Total Liabilities',
                    'Current Assets - Current Liabilities',
                    'Cash + Inventory',
                    'Revenue - Expenses'
                ],
                a: 1
            },
            {
                q: 'In a DCF model, what is the "Terminal Value"?',
                o: [
                    'The value of the company at the end of the projection period.',
                    'The initial investment cost.',
                    'The first year\'s cash flow.',
                    'The total debt remaining.'
                ],
                a: 0
            },
            {
                q: 'What is "Beta" used to measure in finance?',
                o: [
                    'The liquidity of a stock.',
                    'The volatility of a stock relative to the overall market.',
                    'The dividend yield.',
                    'The profitability of a company.'
                ],
                a: 1
            },
            {
                q: 'Which inventory costing method assumes that the last items placed in inventory are the first ones sold?',
                o: [
                    'FIFO (First-In, First-Out)',
                    'LIFO (Last-In, First-Out)',
                    'Weighted Average',
                    'Specific Identification'
                ],
                a: 1
            },
            {
                q: 'What is the concept of "Time Value of Money"?',
                o: [
                    'Money is worth more today than the same amount in the future.',
                    'Money loses value over time due to depreciation.',
                    'Interest rates do not affect the value of money.',
                    'Future money is always worth more than present money.'
                ],
                a: 0
            },
            {
                q: 'What is a "Bear Market"?',
                o: [
                    'A market where prices are rising.',
                    'A market where prices are falling.',
                    'A market with no volatility.',
                    'A market closed for trading.'
                ],
                a: 1
            },
            {
                q: 'Which term refers to the process of spreading the cost of an intangible asset over its useful life?',
                o: [
                    'Depreciation',
                    'Amortization',
                    'Depletion',
                    'Accrual'
                ],
                a: 1
            }
        ]
    },
    'bi-quiz': {
        title: 'Business Intelligence Quiz',
        description: 'Test your Business Intelligence skills, covering Data Warehousing, ETL, and Visualization.',
        questions: [
            // --- Original Question ---
            {
                q: 'What is a Star Schema?',
                o: [
                    'A type of network topology',
                    'A database schema with central fact table and dimension tables',
                    'A cloud computing model',
                    'A diagram shape'
                ],
                a: 1
            },
            // --- New Added Questions (2-20) ---
            {
                q: 'What does "KPI" stand for in Business Intelligence?',
                o: [
                    'Key Performance Index',
                    'Key Performance Indicator',
                    'Key Process Improvement',
                    'Knowledge Processing Interface'
                ],
                a: 1
            },
            {
                q: 'Which process involves extracting data from sources, transforming it, and loading it into a destination?',
                o: [
                    'SQL',
                    'ETL',
                    'API',
                    'ERP'
                ],
                a: 1
            },
            {
                q: 'What is a "Data Warehouse"?',
                o: [
                    'A place to store physical servers.',
                    'A transactional database used for daily operations.',
                    'A centralized repository of integrated data from one or more disparate sources, used for reporting and analysis.',
                    'A backup of the company\'s email system.'
                ],
                a: 2
            },
            {
                q: 'In a Star Schema, what does a "Fact Table" typically contain?',
                o: [
                    'Descriptive attributes like names and addresses.',
                    'Quantitative data (metrics) and foreign keys.',
                    'Only text data.',
                    'System configuration settings.'
                ],
                a: 1
            },
            {
                q: 'What is the primary difference between OLTP and OLAP?',
                o: [
                    'OLTP is for analysis; OLAP is for transactions.',
                    'OLTP is for day-to-day transactions; OLAP is for multidimensional analysis and reporting.',
                    'There is no difference.',
                    'OLAP databases are faster for inserting data.'
                ],
                a: 1
            },
            {
                q: 'Which tool is primarily used for Data Visualization?',
                o: [
                    'Apache Kafka',
                    'Tableau',
                    'Docker',
                    'PostgreSQL'
                ],
                a: 1
            },
            {
                q: 'What is a "Dashboard"?',
                o: [
                    'A tool to write SQL queries.',
                    'A visual display of the most important information needed to achieve one or more objectives.',
                    'A backend server management console.',
                    'A type of database index.'
                ],
                a: 1
            },
            {
                q: 'What is "Drill-Down" in the context of reporting?',
                o: [
                    'Deleting data to save space.',
                    'Navigating from high-level data to more detailed data.',
                    'Summarizing detailed data into a higher level.',
                    'Exporting data to Excel.'
                ],
                a: 1
            },
            {
                q: 'Which dimension type changes slowly over time (e.g., customer address)?',
                o: [
                    'Junk Dimension',
                    'Rapidly Changing Dimension',
                    'Slowly Changing Dimension (SCD)',
                    'Degenerate Dimension'
                ],
                a: 2
            },
            {
                q: 'What is "Data Cleansing"?',
                o: [
                    'The process of detecting and correcting (or removing) corrupt or inaccurate records from a record set.',
                    'Deleting old files from the computer.',
                    'Formatting the hard drive.',
                    'Compressing data to save space.'
                ],
                a: 0
            },
            {
                q: 'What is a "Snowflake Schema"?',
                o: [
                    'A schema where dimension tables are normalized into multiple related tables.',
                    'A schema with only one table.',
                    'A schema used only in winter.',
                    'A schema where the fact table is normalized.'
                ],
                a: 0
            },
            {
                q: 'What does "Self-Service BI" enable users to do?',
                o: [
                    'Repair their own computers.',
                    'Access and analyze data without heavy reliance on IT departments.',
                    'Write their own database software.',
                    'Manage the company\'s servers.'
                ],
                a: 1
            },
            {
                q: 'Which of the following is a "Lagging Indicator"?',
                o: [
                    'Website Traffic (Real-time)',
                    'Sales Revenue (Last Quarter)',
                    'New Customer Signups (Today)',
                    'Forecasted Demand'
                ],
                a: 1
            },
            {
                q: 'What is "Data Granularity"?',
                o: [
                    'The size of the database file.',
                    'The level of detail represented by the data.',
                    'The speed of data transfer.',
                    'The security level of the data.'
                ],
                a: 1
            },
            {
                q: 'What is the purpose of a "Semantic Layer" in BI?',
                o: [
                    'To encrypt the data.',
                    'To translate complex database structures into business-friendly terms.',
                    'To delete unused data.',
                    'To speed up the internet connection.'
                ],
                a: 1
            },
            {
                q: 'Which type of chart is best for showing the composition of a whole (parts of a whole)?',
                o: [
                    'Line Chart',
                    'Pie Chart',
                    'Scatter Plot',
                    'Box Plot'
                ],
                a: 1
            },
            {
                q: 'What is "Master Data Management" (MDM)?',
                o: [
                    'Managing the CEO\'s schedule.',
                    'A comprehensive method of enabling an enterprise to link all of its critical data to one file, called a master file.',
                    'Backing up the master hard drive.',
                    'Managing data only for the marketing department.'
                ],
                a: 1
            },
            {
                q: 'What is "Predictive Analytics"?',
                o: [
                    'Reporting on what happened in the past.',
                    'Using historical data to predict future outcomes.',
                    'Analyzing why something happened.',
                    'Visualizing current data.'
                ],
                a: 1
            },
            {
                q: 'What does "Ad Hoc Reporting" mean?',
                o: [
                    'Scheduled monthly reports.',
                    'Reports generated on an as-needed basis to answer specific questions.',
                    'Reports that are automatically emailed.',
                    'Reports that cannot be changed.'
                ],
                a: 1
            }
        ]
    },
    'sc-quiz': {
        title: 'Supply Chain Quiz',
        description: 'Test your Supply Chain knowledge, including Inventory Management, Logistics, and Procurement.',
        questions: [
            // --- Original Question ---
            {
                q: 'What is JIT?',
                o: [
                    'Just In Time',
                    'Joint Inventory Tracking',
                    'Job In Transit',
                    'Joint Integrated Technology'
                ],
                a: 0
            },
            // --- New Added Questions (2-20) ---
            {
                q: 'What is the "Bullwhip Effect" in supply chain?',
                o: [
                    'A method to speed up delivery trucks.',
                    'The distortion of demand information as it travels up the supply chain.',
                    'A technique for packaging fragile items.',
                    'The process of physically moving inventory.'
                ],
                a: 1
            },
            {
                q: 'What does "EOQ" stand for?',
                o: [
                    'Estimated Order Quality',
                    'Economic Order Quantity',
                    'Essential Operational Quota',
                    'External Output Query'
                ],
                a: 1
            },
            {
                q: 'What is "Safety Stock"?',
                o: [
                    'Stock kept in a secure vault.',
                    'Extra inventory held to guard against uncertainty in demand or supply.',
                    'Inventory that is about to expire.',
                    'Stock reserved for VIP customers only.'
                ],
                a: 1
            },
            {
                q: 'Which incoterm places the maximum obligation on the buyer?',
                o: [
                    'DDP (Delivered Duty Paid)',
                    'EXW (Ex Works)',
                    'FOB (Free on Board)',
                    'CIF (Cost, Insurance, and Freight)'
                ],
                a: 1
            },
            {
                q: 'What is "Cross-Docking"?',
                o: [
                    'Storing goods for long periods in a warehouse.',
                    'Unloading materials from an incoming truck and loading them directly onto outbound trucks with little to no storage.',
                    'Shipping goods across the ocean.',
                    'Checking goods for quality defects.'
                ],
                a: 1
            },
            {
                q: 'What does "3PL" stand for?',
                o: [
                    'Three-Point Logistics',
                    'Third-Party Logistics',
                    'Total Production Lead-time',
                    'Third-Phase Loading'
                ],
                a: 1
            },
            {
                q: 'Which of the following is a quantitative forecasting method?',
                o: [
                    'Delphi Method',
                    'Market Research',
                    'Moving Average',
                    'Sales Force Composite'
                ],
                a: 2
            },
            {
                q: 'What is "Reverse Logistics"?',
                o: [
                    'Driving trucks backwards.',
                    'The process of moving goods from their typical final destination for the purpose of capturing value, or proper disposal (e.g., returns).',
                    'Logistics planning done in reverse order.',
                    'Shipping goods from the factory to the warehouse.'
                ],
                a: 1
            },
            {
                q: 'What is the "Reorder Point" (ROP)?',
                o: [
                    'The maximum inventory level allowed.',
                    'The inventory level at which a new order should be placed.',
                    'The point where inventory becomes obsolete.',
                    'The time it takes to receive an order.'
                ],
                a: 1
            },
            {
                q: 'In ABC Analysis, "A" items typically represent:',
                o: [
                    'Low value, high quantity items.',
                    'Items that are obsolete.',
                    'High value, low quantity items (80% of value, 20% of items).',
                    'Items with no value.'
                ],
                a: 2
            },
            {
                q: 'What is "Lead Time"?',
                o: [
                    'The time it takes to manufacture a product.',
                    'The latency between the initiation and execution of a process (e.g., order placement to receipt).',
                    'The time a manager leads a team.',
                    'The time goods spend on a shelf.'
                ],
                a: 1
            },
            {
                q: 'What does "BOM" stand for?',
                o: [
                    'Bill of Materials',
                    'Base of Manufacturing',
                    'Beginning of Month',
                    'Build or Make'
                ],
                a: 0
            },
            {
                q: 'What is "Vendor Managed Inventory" (VMI)?',
                o: [
                    'Inventory managed by the customer.',
                    'Inventory managed by a third-party consultant.',
                    'A business model where the buyer of a product provides information to a vendor of that product and the vendor takes full responsibility for maintaining an agreed inventory of the material.',
                    'Inventory that is never counted.'
                ],
                a: 2
            },
            {
                q: 'What is "KPI" in the context of Supply Chain?',
                o: [
                    'Key Performance Indicator',
                    'Key Process Input',
                    'Knowledge Processing Interface',
                    'Known Product Issue'
                ],
                a: 0
            },
            {
                q: 'Which of the following is a "Downstream" activity?',
                o: [
                    'Sourcing raw materials.',
                    'Manufacturing the product.',
                    'Distributing the product to retailers/customers.',
                    'Designing the product.'
                ],
                a: 2
            },
            {
                q: 'What is "Supply Chain Visibility"?',
                o: [
                    'Seeing the trucks on the road.',
                    'The ability to track parts, components, or products in transit from the manufacturer to the final destination.',
                    'Using transparent packaging.',
                    'Knowing the names of all suppliers.'
                ],
                a: 1
            },
            {
                q: 'What is "RFID" technology used for?',
                o: [
                    'Radio Frequency Identification for tracking tags attached to objects.',
                    'Forecasting demand.',
                    'Negotiating contracts.',
                    'Designing warehouse layouts.'
                ],
                a: 0
            },
            {
                q: 'What is "S&OP"?',
                o: [
                    'Sales and Operations Planning',
                    'Supply and Order Processing',
                    'Shipping and Outbound Procedures',
                    'Standard Operating Protocol'
                ],
                a: 0
            },
            {
                q: 'Which transportation mode is generally the most cost-effective for international shipping of large volumes?',
                o: [
                    'Air Freight',
                    'Ocean Freight',
                    'Rail Freight',
                    'Trucking'
                ],
                a: 1
            }
        ]
    },
    'jf-quiz': {
        title: 'Java Full Stack Quiz',
        description: 'Test your Java, Spring Boot, Frontend, and Database skills.',
        questions: [
            // --- Original Question ---
            {
                q: 'Which of these is not a Java keyword?',
                o: [
                    'static',
                    'void',
                    'integer',
                    'boolean'
                ],
                a: 2
            },
            // --- New Added Questions (2-20) ---
            {
                q: 'Which Java 8 feature enables functional programming style processing of collections?',
                o: [
                    'Annotations',
                    'Stream API',
                    'Reflection',
                    'Serialization'
                ],
                a: 1
            },
            {
                q: 'In Spring Boot, which annotation is used to mark a class as a RESTful Controller?',
                o: [
                    '@Controller',
                    '@RestController',
                    '@Service',
                    '@Component'
                ],
                a: 1
            },
            {
                q: 'What is the purpose of the "pom.xml" file in a Maven project?',
                o: [
                    'To configure the database connection.',
                    'To manage project dependencies and build configuration.',
                    'To write Java source code.',
                    'To define HTML layouts.'
                ],
                a: 1
            },
            {
                q: 'What does "JPA" stand for in the context of Java databases?',
                o: [
                    'Java Programming Adapter',
                    'Java Persistence API',
                    'Java Processing Agent',
                    'JSON Parsing Application'
                ],
                a: 1
            },
            {
                q: 'Which HTTP method is typically used to update an existing resource?',
                o: [
                    'GET',
                    'POST',
                    'PUT',
                    'DELETE'
                ],
                a: 2
            },
            {
                q: 'In Java, what is the difference between "==" and ".equals()"?',
                o: [
                    '"==" compares values; ".equals()" compares references.',
                    '"==" compares object references; ".equals()" compares content/values.',
                    'They are identical.',
                    '"==" is used only for strings.'
                ],
                a: 1
            },
            {
                q: 'Which CSS property is used to change the background color of an element?',
                o: [
                    'color',
                    'background-color',
                    'bgcolor',
                    'border-color'
                ],
                a: 1
            },
            {
                q: 'What is the "Virtual DOM" primarily associated with?',
                o: [
                    'Angular',
                    'React',
                    'jQuery',
                    'Spring MVC'
                ],
                a: 1
            },
            {
                q: 'Which annotation is used in Spring to inject dependencies?',
                o: [
                    '@InjectBean',
                    '@Autowired',
                    '@Import',
                    '@Include'
                ],
                a: 1
            },
            {
                q: 'What does the SQL command "TRUNCATE" do?',
                o: [
                    'Deletes the table structure.',
                    'Deletes all rows from a table but keeps the structure.',
                    'Deletes specific rows based on a condition.',
                    'Adds a new column to the table.'
                ],
                a: 1
            },
            {
                q: 'Which JavaScript keyword declares a block-scoped variable?',
                o: [
                    'var',
                    'let',
                    'global',
                    'int'
                ],
                a: 1
            },
            {
                q: 'In a Microservices architecture, how do services typically communicate?',
                o: [
                    'Direct memory access',
                    'REST APIs or Message Queues (e.g., Kafka)',
                    'Shared text files',
                    'Through the database triggers'
                ],
                a: 1
            },
            {
                q: 'What is "Docker" used for in full stack development?',
                o: [
                    'Writing Java code.',
                    'Containerizing applications to ensure consistency across environments.',
                    'Managing database schemas.',
                    'Testing frontend UI.'
                ],
                a: 1
            },
            {
                q: 'Which interface represents a collection that does not allow duplicate elements?',
                o: [
                    'List',
                    'Map',
                    'Set',
                    'Queue'
                ],
                a: 2
            },
            {
                q: 'What is the default scope of a Spring Bean?',
                o: [
                    'Prototype',
                    'Request',
                    'Singleton',
                    'Session'
                ],
                a: 2
            },
            {
                q: 'Which HTML tag is used to create a hyperlink?',
                o: [
                    '<link>',
                    '<a>',
                    '<href>',
                    '<url>'
                ],
                a: 1
            },
            {
                q: 'What does ACID stand for in database transactions?',
                o: [
                    'Atomicity, Consistency, Isolation, Durability',
                    'Access, Control, Interface, Data',
                    'Accuracy, Completeness, Integrity, Design',
                    'Authorization, Coding, Input, Debugging'
                ],
                a: 0
            },
            {
                q: 'Which Git command downloads code from a remote repository?',
                o: [
                    'git push',
                    'git commit',
                    'git pull',
                    'git add'
                ],
                a: 2
            },
            {
                q: 'What is "JWT" commonly used for?',
                o: [
                    'Java Web Tools',
                    'JSON Web Token (Stateless Authentication)',
                    'Java Window Toolkit',
                    'JavaScript Web Template'
                ],
                a: 1
            }
        ]
    },
    'fd-quiz': {
        title: 'Frontend Developer Quiz',
        description: 'Test your Frontend skills, including HTML, CSS, JavaScript, and React.',
        questions: [
            // --- Original Question ---
            {
                q: 'What does CSS stand for?',
                o: [
                    'Creative Style Sheets',
                    'Cascading Style Sheets',
                    'Computer Style Sheets',
                    'Colorful Style Sheets'
                ],
                a: 1
            },
            // --- New Added Questions (2-20) ---
            {
                q: 'Which HTML tag is used to define an unordered list?',
                o: [
                    '<ol>',
                    '<li>',
                    '<ul>',
                    '<list>'
                ],
                a: 2
            },
            {
                q: 'Which CSS property controls the text size?',
                o: [
                    'font-style',
                    'text-size',
                    'font-size',
                    'text-style'
                ],
                a: 2
            },
            {
                q: 'In JavaScript, which keyword is used to declare a variable that cannot be reassigned?',
                o: [
                    'var',
                    'let',
                    'const',
                    'static'
                ],
                a: 2
            },
            {
                q: 'What is the purpose of the "z-index" property in CSS?',
                o: [
                    'To control the transparency of an element.',
                    'To control the stacking order of elements.',
                    'To zoom into an element.',
                    'To set the width of an element.'
                ],
                a: 1
            },
            {
                q: 'Which React hook is used to handle side effects like data fetching?',
                o: [
                    'useState',
                    'useEffect',
                    'useContext',
                    'useReducer'
                ],
                a: 1
            },
            {
                q: 'What does the "Box Model" in CSS consist of?',
                o: [
                    'Content, Padding, Border, Margin',
                    'Header, Footer, Main, Aside',
                    'Content, Image, Text, Link',
                    'Width, Height, Color, Background'
                ],
                a: 0
            },
            {
                q: 'Which method transforms a JavaScript object into a JSON string?',
                o: [
                    'JSON.parse()',
                    'JSON.stringify()',
                    'JSON.object()',
                    'JSON.convert()'
                ],
                a: 1
            },
            {
                q: 'What is "Flexbox" used for?',
                o: [
                    '3D animations',
                    'Database management',
                    'One-dimensional layout (row or column)',
                    'Server-side rendering'
                ],
                a: 2
            },
            {
                q: 'Which HTML5 semantic tag represents the main content of a document?',
                o: [
                    '<section>',
                    '<article>',
                    '<main>',
                    '<div>'
                ],
                a: 2
            },
            {
                q: 'What is the default value of the "position" property in CSS?',
                o: [
                    'relative',
                    'absolute',
                    'fixed',
                    'static'
                ],
                a: 3
            },
            {
                q: 'In React, what is "State"?',
                o: [
                    'External data passed to a component.',
                    'Internal data managed by a component that can change over time.',
                    'A permanent database storage.',
                    'The styling of a component.'
                ],
                a: 1
            },
            {
                q: 'What does "DOM" stand for?',
                o: [
                    'Data Object Model',
                    'Document Object Model',
                    'Digital Ordinance Model',
                    'Desktop Orientation Module'
                ],
                a: 1
            },
            {
                q: 'Which event occurs when a user clicks on an HTML element?',
                o: [
                    'onchange',
                    'onmouseover',
                    'onclick',
                    'onload'
                ],
                a: 2
            },
            {
                q: 'What is the purpose of "Media Queries" in CSS?',
                o: [
                    'To play video files.',
                    'To create responsive designs based on screen size.',
                    'To query the database.',
                    'To add sound effects.'
                ],
                a: 1
            },
            {
                q: 'Which JavaScript array method creates a new array by applying a function to every element?',
                o: [
                    'filter()',
                    'forEach()',
                    'map()',
                    'reduce()'
                ],
                a: 2
            },
            {
                q: 'What is "Local Storage" in the browser?',
                o: [
                    'Storage that expires when the browser closes.',
                    'Storage that persists even after the browser is closed.',
                    'Storage on the server.',
                    'Storage for cookies only.'
                ],
                a: 1
            },
            {
                q: 'Which CSS unit is relative to the font-size of the root element (html)?',
                o: [
                    'em',
                    'rem',
                    'px',
                    '%'
                ],
                a: 1
            },
            {
                q: 'What is the difference between "==" and "===" in JavaScript?',
                o: [
                    '"==" checks value and type; "===" checks only value.',
                    '"==" checks only value (loose equality); "===" checks value and type (strict equality).',
                    'They are identical.',
                    '"===" assigns a value.'
                ],
                a: 1
            },
            {
                q: 'What is a "Promise" in JavaScript?',
                o: [
                    'A guarantee that the code will never fail.',
                    'An object representing the eventual completion or failure of an asynchronous operation.',
                    'A function that runs immediately.',
                    'A variable that cannot be changed.'
                ],
                a: 1
            }
        ]
    },
};

export const roadmapData: Record<string, RoadmapStep[]> = {
    ba: [
        { id: 'ba-1', step: 'Excel Proficiency', desc: 'Advanced formulas, Pivot Tables, VBA macros.' },
        { id: 'ba-2', step: 'SQL Basics', desc: 'Select, Where, Group By, Joins for data extraction.' },
        { id: 'ba-3', step: 'Data Visualization', desc: 'Tableau or PowerBI basics for reporting.' },
        { id: 'ba-4', step: 'Business Process Modeling', desc: 'BPMN, flowcharts, and process mapping.' },
        { id: 'ba-5', step: 'Agile & Scrum', desc: 'Understanding SDLC, user stories, and sprint planning.' }
    ],
    da: [
        { id: 'da-1', step: 'Excel Basics & Formulas', desc: 'Master VLOOKUP, Pivot Tables, Power Query.' },
        { id: 'da-2', step: 'SQL Fundamentals', desc: 'Learn SELECT, JOINS, GROUP BY, Subqueries.' },
        { id: 'da-3', step: 'Data Visualization', desc: 'Create interactive dashboards in Tableau or PowerBI.' },
        { id: 'da-4', step: 'Python for Data', desc: 'Pandas, NumPy, Matplotlib for data manipulation.' },
        { id: 'da-5', step: 'Statistics Basics', desc: 'Mean, Median, Mode, Standard Deviation, Distributions.' }
    ],
    ds: [
        { id: 'ds-1', step: 'Python & SQL', desc: 'Advanced Pandas, complex SQL queries, window functions.' },
        { id: 'ds-2', step: 'Mathematics & Stats', desc: 'Linear Algebra, Calculus, Probability theory.' },
        { id: 'ds-3', step: 'Machine Learning', desc: 'Scikit-learn, Regression, Classification, Clustering.' },
        { id: 'ds-4', step: 'Deep Learning', desc: 'Neural Networks, TensorFlow or PyTorch basics.' },
        { id: 'ds-5', step: 'Model Deployment', desc: 'Flask/FastAPI, Docker, Cloud ML services.' }
    ],
    de: [
        { id: 'de-1', step: 'Programming (Python/Scala)', desc: 'Scripting, OOP, data structures.' },
        { id: 'de-2', step: 'SQL & NoSQL', desc: 'Advanced SQL, MongoDB, Cassandra.' },
        { id: 'de-3', step: 'Big Data Frameworks', desc: 'Hadoop, Spark, Kafka for streaming.' },
        { id: 'de-4', step: 'Cloud Platforms', desc: 'AWS/GCP/Azure data services (Redshift, BigQuery).' },
        { id: 'de-5', step: 'ETL Pipelines', desc: 'Airflow, data orchestration, and warehousing.' }
    ],
    fa: [
        { id: 'fa-1', step: 'Excel Modeling', desc: 'Financial modeling, sensitivity analysis, macros.' },
        { id: 'fa-2', step: 'Accounting Principles', desc: 'GAAP/IFRS, Balance Sheets, Income Statements.' },
        { id: 'fa-3', step: 'Financial Ratios', desc: 'Liquidity, solvency, profitability analysis.' },
        { id: 'fa-4', step: 'Forecasting', desc: 'Time series analysis, budget variance analysis.' },
        { id: 'fa-5', step: 'Valuation Methods', desc: 'DCF, Comparable Company Analysis.' }
    ],
    bi: [
        { id: 'bi-1', step: 'Data Warehousing', desc: 'Star schema, snowflake schema, dimensional modeling.' },
        { id: 'bi-2', step: 'ETL Processes', desc: 'Extract, Transform, Load tools and logic.' },
        { id: 'bi-3', step: 'Advanced SQL', desc: 'Stored procedures, triggers, performance tuning.' },
        { id: 'bi-4', step: 'Reporting Tools', desc: 'Deep dive into PowerBI/Tableau/Looker.' },
        { id: 'bi-5', step: 'Data Governance', desc: 'Data quality, security, and master data management.' }
    ],
    sc: [
        { id: 'sc-1', step: 'Supply Chain Basics', desc: 'Logistics, procurement, inventory management.' },
        { id: 'sc-2', step: 'Excel & ERP', desc: 'SAP, Oracle, advanced spreadsheet modeling.' },
        { id: 'sc-3', step: 'Data Analysis', desc: 'Forecasting demand, analyzing lead times.' },
        { id: 'sc-4', step: 'Optimization', desc: 'Linear programming, network optimization.' },
        { id: 'sc-5', step: 'Visualization', desc: 'Reporting on KPIs like fill rate, turnover.' }
    ],
    jf: [
        { id: 'jf-1', step: 'Java Core', desc: 'OOP, Collections, Streams, Multithreading.' },
        { id: 'jf-2', step: 'Frontend Basics', desc: 'HTML, CSS, JavaScript, DOM manipulation.' },
        { id: 'jf-3', step: 'Spring Boot', desc: 'REST APIs, Dependency Injection, Hibernate/JPA.' },
        { id: 'jf-4', step: 'Database', desc: 'Relational DBs (MySQL/Postgres), SQL.' },
        { id: 'jf-5', step: 'React/Angular', desc: 'Connecting frontend to Java backend.' }
    ],
    fd: [
        { id: 'fd-1', step: 'Web Fundamentals', desc: 'HTML5, CSS3, Semantic Web, Accessibility.' },
        { id: 'fd-2', step: 'JavaScript Deep Dive', desc: 'ES6+, Async/Await, Closures, Event Loop.' },
        { id: 'fd-3', step: 'CSS Frameworks', desc: 'Tailwind, Bootstrap, Sass/SCSS.' },
        { id: 'fd-4', step: 'Frontend Framework', desc: 'React.js ecosystem (Hooks, Redux/Context).' },
        { id: 'fd-5', step: 'Build Tools & Git', desc: 'Webpack, Vite, NPM, Version Control.' }
    ]
};