// Business Analyst Portal - SQL Tutorial Data from GeeksforGeeks

export interface BaTopic {
    id: string;
    title: string;
    icon: string;
    iconBg: string;
    accentColor: string;
    description: string;
    subtopics: { title: string; description?: string }[];
    codeExample?: { title: string; code: string; language: string };
}

export const businessAnalystTutorialData: BaTopic[] = [
    {
        id: "intro-sql-ba",
        title: "Introduction to SQL for Business Analyst",
        icon: "Database",
        iconBg: "bg-blue-500/20 text-blue-400",
        accentColor: "blue",
        description: "SQL is an essential tool for accessing and working with data. It allows analysts to query relational databases, extract specific information, and generate reports that drive business decisions.",
        subtopics: [
            { title: "Data Manipulation: Definition, Examples, and Uses" },
            { title: "What is Data Visualization and Why is It Important?" },
            { title: "Techniques for Data Visualization and Reporting" }
        ],
        codeExample: {
            title: "Basic SQL Query",
            language: "sql",
            code: "-- Retrieve customer data\nSELECT customer_id, name, email, total_purchases\nFROM customers\nWHERE total_purchases > 1000\nORDER BY total_purchases DESC\nLIMIT 10;"
        }
    },
    {
        id: "getting-started-sql",
        title: "Getting Started with SQL",
        icon: "Play",
        iconBg: "bg-emerald-500/20 text-emerald-400",
        accentColor: "emerald",
        description: "Learn the basics of setting up SQL, including how to install database management systems like MySQL or PostgreSQL. Covers essential SQL commands like SELECT, INSERT, UPDATE, and DELETE.",
        subtopics: [
            { title: "Installing MySQL/PostgreSQL" },
            { title: "Understanding SQL Commands (DDL, DQL, DML, DCL, TCL)" },
            { title: "SQL CREATE DATABASE" },
            { title: "SELECT Statement" },
            { title: "SQL INSERT INTO" },
            { title: "SQL UPDATE Statement" },
            { title: "SQL DELETE Statement" },
            { title: "SQL ALTER TABLE" },
            { title: "DROP and TRUNCATE" }
        ],
        codeExample: {
            title: "CRUD Operations",
            language: "sql",
            code: "-- Create\nINSERT INTO products (name, price, category)\nVALUES ('Laptop', 999.99, 'Electronics');\n\n-- Read\nSELECT * FROM products WHERE category = 'Electronics';\n\n-- Update\nUPDATE products SET price = 899.99 WHERE name = 'Laptop';\n\n-- Delete\nDELETE FROM products WHERE stock = 0;"
        }
    },
    {
        id: "basic-queries-ba",
        title: "Basic SQL Queries for Business Analyst",
        icon: "FileSearch",
        iconBg: "bg-cyan-500/20 text-cyan-400",
        accentColor: "cyan",
        description: "Learn to write basic SQL queries to extract data from tables. Topics include selecting specific columns, using WHERE clause for filtering, sorting with ORDER BY, and limiting rows with LIMIT.",
        subtopics: [
            { title: "Select Distinct" },
            { title: "Select Individual Columns" },
            { title: "WHERE Clause" },
            { title: "SQL HAVING Clause" },
            { title: "BETWEEN & IN Operator" },
            { title: "Comparison Operators" },
            { title: "Logical Operators" },
            { title: "SQL LIKE Operator" },
            { title: "Wildcard Pattern Matching" },
            { title: "NULL values in SQL" },
            { title: "SQL ORDER BY" },
            { title: "SQL LIMIT Clause" },
            { title: "SQL Aliases" }
        ],
        codeExample: {
            title: "Filtering and Sorting",
            language: "sql",
            code: "-- Find high-value customers in specific regions\nSELECT customer_name, region, revenue\nFROM customers\nWHERE region IN ('North', 'West')\n  AND revenue BETWEEN 50000 AND 200000\n  AND status IS NOT NULL\nORDER BY revenue DESC\nLIMIT 20;"
        }
    },
    {
        id: "aggregate-functions",
        title: "Aggregate Functions and Grouping Data",
        icon: "Calculator",
        iconBg: "bg-purple-500/20 text-purple-400",
        accentColor: "purple",
        description: "SQL aggregate functions like COUNT(), SUM(), AVG(), and MAX() are essential for summarizing data. Learn GROUP BY clause for data aggregation and HAVING clause for conditions on aggregated data.",
        subtopics: [
            { title: "SQL Aggregate Functions" },
            { title: "COUNT(), AVG() and SUM() Functions" },
            { title: "SQL GROUP BY" },
            { title: "How to Group and Aggregate Data" },
            { title: "HAVING With Aggregate Functions" },
            { title: "Difference Between WHERE and HAVING" }
        ],
        codeExample: {
            title: "Sales Summary by Region",
            language: "sql",
            code: "-- Calculate sales metrics by region\nSELECT \n  region,\n  COUNT(*) as total_orders,\n  SUM(order_amount) as total_revenue,\n  AVG(order_amount) as avg_order_value,\n  MAX(order_amount) as largest_order\nFROM orders\nWHERE order_date >= '2024-01-01'\nGROUP BY region\nHAVING SUM(order_amount) > 100000\nORDER BY total_revenue DESC;"
        }
    },
    {
        id: "sql-joins-ba",
        title: "Joining Data for Business Analyst",
        icon: "Link",
        iconBg: "bg-orange-500/20 text-orange-400",
        accentColor: "orange",
        description: "Business analysts often need to combine data from multiple tables. Learn SQL joins including INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN to link data and answer complex business questions.",
        subtopics: [
            { title: "What is a JOIN?" },
            { title: "SQL Inner Join" },
            { title: "SQL Self Join" },
            { title: "SQL LEFT JOIN" },
            { title: "SQL RIGHT JOIN" },
            { title: "SQL FULL JOIN" },
            { title: "SQL CROSS JOIN" },
            { title: "Multiple Joins" }
        ],
        codeExample: {
            title: "Customer Order Analysis",
            language: "sql",
            code: "-- Get customer orders with product details\nSELECT \n  c.customer_name,\n  o.order_date,\n  p.product_name,\n  oi.quantity,\n  oi.unit_price * oi.quantity as line_total\nFROM customers c\nINNER JOIN orders o ON c.customer_id = o.customer_id\nINNER JOIN order_items oi ON o.order_id = oi.order_id\nLEFT JOIN products p ON oi.product_id = p.product_id\nWHERE o.order_date >= '2024-01-01';"
        }
    },
    {
        id: "data-cleaning-sql",
        title: "Data Cleaning and Transformation",
        icon: "Sparkles",
        iconBg: "bg-rose-500/20 text-rose-400",
        accentColor: "rose",
        description: "Data cleaning is critical for analysis. Learn SQL functions to handle NULL values (COALESCE), remove duplicates (DISTINCT), transform data (CONCAT), and manipulate dates for clean datasets.",
        subtopics: [
            { title: "Delete Duplicate Rows" },
            { title: "Remove Duplicates without Distinct" },
            { title: "SQL NULL Functions" },
            { title: "IFNULL VS COALESCE" },
            { title: "Conversion Functions" },
            { title: "SQL Data Types" },
            { title: "Date and Time Functions" },
            { title: "String Functions" },
            { title: "Concatenation Operator" }
        ],
        codeExample: {
            title: "Data Cleaning Example",
            language: "sql",
            code: "-- Clean and transform customer data\nSELECT \n  customer_id,\n  COALESCE(first_name, 'Unknown') as first_name,\n  UPPER(TRIM(email)) as clean_email,\n  CONCAT(first_name, ' ', last_name) as full_name,\n  CASE \n    WHEN revenue IS NULL THEN 0\n    ELSE revenue \n  END as clean_revenue\nFROM customers\nWHERE email IS NOT NULL\n  AND email LIKE '%@%';"
        }
    },
    {
        id: "time-based-sql",
        title: "Working with Time-Based Data",
        icon: "Clock",
        iconBg: "bg-indigo-500/20 text-indigo-400",
        accentColor: "indigo",
        description: "Time-based data analysis is essential for business reporting. Learn date functions, extracting parts of dates, calculating time intervals, and aggregating data over time periods.",
        subtopics: [
            { title: "SQL Date Functions" },
            { title: "Calculate Months Between Dates" },
            { title: "Aggregate and Scalar Functions" },
            { title: "Conditional Expressions" },
            { title: "Conditional Summation" }
        ],
        codeExample: {
            title: "Monthly Sales Trend",
            language: "sql",
            code: "-- Analyze monthly sales trends\nSELECT \n  EXTRACT(YEAR FROM order_date) as year,\n  EXTRACT(MONTH FROM order_date) as month,\n  COUNT(*) as orders,\n  SUM(amount) as revenue,\n  SUM(CASE WHEN status = 'returned' THEN 1 ELSE 0 END) as returns\nFROM orders\nWHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)\nGROUP BY year, month\nORDER BY year DESC, month DESC;"
        }
    },
    {
        id: "advanced-sql-ba",
        title: "Advanced SQL Queries",
        icon: "Layers",
        iconBg: "bg-violet-500/20 text-violet-400",
        accentColor: "violet",
        description: "Dive deeper into advanced SQL techniques: subqueries, nested queries, window functions, and CTEs. These enable solving complex problems like running totals and conditional aggregations.",
        subtopics: [
            { title: "SQL Subquery" },
            { title: "Nested Queries" },
            { title: "Subquery in SELECT Statement" },
            { title: "Correlated Subqueries" },
            { title: "Window Functions" },
            { title: "Temporary Tables" },
            { title: "SQL Views" }
        ],
        codeExample: {
            title: "Running Total with Window Function",
            language: "sql",
            code: "-- Calculate running total and rank\nSELECT \n  order_date,\n  customer_id,\n  amount,\n  SUM(amount) OVER (ORDER BY order_date) as running_total,\n  RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC) as rank_by_customer,\n  LAG(amount, 1) OVER (ORDER BY order_date) as previous_amount\nFROM orders\nWHERE order_date >= '2024-01-01';"
        }
    },
    {
        id: "reporting-sql",
        title: "Data Reporting and Visualization",
        icon: "BarChart",
        iconBg: "bg-amber-500/20 text-amber-400",
        accentColor: "amber",
        description: "SQL can prepare data for reporting and visualization. Learn to generate reports, export data, and prepare datasets for tools like Tableau or Power BI for actionable business reports.",
        subtopics: [
            { title: "Database Design for BI Reporting" },
            { title: "Month Wise Report" },
            { title: "SQL SELECT DATE" },
            { title: "Data Visualization for Business" },
            { title: "SQL Visualization Tools" },
            { title: "Top BI Tools for Data Visualization" }
        ],
        codeExample: {
            title: "Executive Dashboard Query",
            language: "sql",
            code: "-- KPI Dashboard Query\nSELECT \n  DATE_FORMAT(order_date, '%Y-%m') as period,\n  COUNT(DISTINCT customer_id) as unique_customers,\n  COUNT(*) as total_orders,\n  SUM(amount) as revenue,\n  SUM(amount) / COUNT(*) as avg_order_value,\n  SUM(CASE WHEN is_new_customer = 1 THEN 1 ELSE 0 END) as new_customers\nFROM orders\nGROUP BY period\nORDER BY period;"
        }
    },
    {
        id: "performance-tuning",
        title: "Performance Tuning for Data Analysis",
        icon: "Zap",
        iconBg: "bg-yellow-500/20 text-yellow-400",
        accentColor: "yellow",
        description: "When working with large datasets, performance is crucial. Learn SQL optimization: indexing, EXPLAIN command, and writing efficient queries to handle large data volumes.",
        subtopics: [
            { title: "Writing Efficient SQL Queries" },
            { title: "Limit Query Results" },
            { title: "CREATE and DROP INDEX" },
            { title: "Clustered and Non-Clustered Indexes" },
            { title: "EXPLAIN in SQL" },
            { title: "SQL Stored Procedures" }
        ],
        codeExample: {
            title: "Query Optimization",
            language: "sql",
            code: "-- Create index for better performance\nCREATE INDEX idx_orders_date ON orders(order_date);\nCREATE INDEX idx_orders_customer ON orders(customer_id);\n\n-- Use EXPLAIN to analyze query\nEXPLAIN SELECT customer_id, SUM(amount)\nFROM orders\nWHERE order_date >= '2024-01-01'\nGROUP BY customer_id;"
        }
    },
    {
        id: "real-world-sql",
        title: "SQL for Business Analysis in Real World",
        icon: "Briefcase",
        iconBg: "bg-teal-500/20 text-teal-400",
        accentColor: "teal",
        description: "Explore how SQL is used in real-world business analysis: analyzing sales performance, calculating customer lifetime value, and building financial models for decision-making.",
        subtopics: [
            { title: "Uses of SQL in Business" },
            { title: "Compare Product Sales By Month" },
            { title: "Get Financial Year from Date" },
            { title: "Database Design for Financial Applications" },
            { title: "Database for Marketing Analytics" },
            { title: "Customer Behavior Analysis" }
        ],
        codeExample: {
            title: "Customer Lifetime Value",
            language: "sql",
            code: "-- Calculate Customer Lifetime Value (CLV)\nSELECT \n  c.customer_id,\n  c.customer_name,\n  MIN(o.order_date) as first_purchase,\n  MAX(o.order_date) as last_purchase,\n  DATEDIFF(MAX(o.order_date), MIN(o.order_date)) as customer_tenure_days,\n  COUNT(o.order_id) as total_orders,\n  SUM(o.amount) as lifetime_value,\n  SUM(o.amount) / COUNT(o.order_id) as avg_order_value\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.customer_name\nORDER BY lifetime_value DESC;"
        }
    },
    {
        id: "exercises-projects",
        title: "SQL Exercises, Projects & Interview Questions",
        icon: "GraduationCap",
        iconBg: "bg-pink-500/20 text-pink-400",
        accentColor: "pink",
        description: "Practice SQL with exercises, projects, and commonly asked interview questions. Includes hands-on challenges and real-world case studies to prepare for SQL-related job interviews.",
        subtopics: [
            { title: "Customer Segmentation Model in SQL" },
            { title: "30 SQL Interview Questions For Business Analyst" },
            { title: "10 Great Business Analyst Projects" },
            { title: "SQL Practice Exercises" }
        ],
        codeExample: {
            title: "RFM Customer Segmentation",
            language: "sql",
            code: "-- RFM Analysis for Customer Segmentation\nSELECT \n  customer_id,\n  DATEDIFF(CURDATE(), MAX(order_date)) as recency,\n  COUNT(*) as frequency,\n  SUM(amount) as monetary,\n  CASE \n    WHEN DATEDIFF(CURDATE(), MAX(order_date)) <= 30 THEN 'Active'\n    WHEN DATEDIFF(CURDATE(), MAX(order_date)) <= 90 THEN 'At Risk'\n    ELSE 'Churned'\n  END as customer_segment\nFROM orders\nGROUP BY customer_id\nORDER BY monetary DESC;"
        }
    }
];
