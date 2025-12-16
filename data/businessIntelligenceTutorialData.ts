// Business Intelligence Analyst Portal - Tutorial Data from GeeksforGeeks

export interface BiTopic {
    id: string;
    title: string;
    icon: string;
    iconBg: string;
    accentColor: string;
    description: string;
    subtopics: { title: string; description?: string }[];
    codeExample?: { title: string; code: string; language: string };
}

export const businessIntelligenceTutorialData: BiTopic[] = [
    {
        id: "what-is-bi",
        title: "What is Business Intelligence?",
        icon: "PieChart",
        iconBg: "bg-blue-500/20 text-blue-400",
        accentColor: "blue",
        description: "Business Intelligence refers to a collection of mathematical models and analysis methods that utilize data to produce valuable information and insights for making important decisions.",
        subtopics: [
            { title: "Data-Driven Decision Making", description: "Using data for strategic decisions" },
            { title: "Mathematical Models", description: "Analytical frameworks for insights" },
            { title: "Analysis Methods", description: "Techniques for data interpretation" },
            { title: "Business Insights", description: "Actionable information from data" }
        ],
        codeExample: {
            title: "BI Query Example",
            language: "sql",
            code: "-- KPI Dashboard Query for BI\nSELECT \n  region,\n  DATE_TRUNC('month', order_date) as month,\n  COUNT(DISTINCT customer_id) as unique_customers,\n  COUNT(*) as total_orders,\n  SUM(revenue) as total_revenue,\n  SUM(revenue) / COUNT(*) as avg_order_value,\n  SUM(profit) / SUM(revenue) * 100 as profit_margin_pct\nFROM sales_data\nWHERE order_date >= DATE_ADD(CURRENT_DATE, INTERVAL -12 MONTH)\nGROUP BY region, month\nORDER BY month DESC, total_revenue DESC;"
        }
    },
    {
        id: "bi-components",
        title: "Components of Business Intelligence",
        icon: "Layers",
        iconBg: "bg-emerald-500/20 text-emerald-400",
        accentColor: "emerald",
        description: "Main components of a BI system: Data Source, Data Warehouse/Mart, Data Exploration, Data Mining, Optimization, and Decisions. Each layer builds upon the previous.",
        subtopics: [
            { title: "Data Source", description: "Gathering data from operational systems" },
            { title: "Data Warehouse/Mart", description: "Centralized storage using ETL" },
            { title: "Data Exploration", description: "Query and reporting tools" },
            { title: "Data Mining", description: "Pattern recognition and ML" },
            { title: "Optimization", description: "Choosing optimal courses of action" },
            { title: "Decisions", description: "Final decision-making and implementation" }
        ],
        codeExample: {
            title: "BI Architecture",
            language: "sql",
            code: "-- Data Warehouse Schema for BI\n\n-- Fact Table (measures)\nCREATE TABLE fact_sales (\n  sale_id INT PRIMARY KEY,\n  date_key INT,\n  product_key INT,\n  customer_key INT,\n  store_key INT,\n  quantity INT,\n  unit_price DECIMAL(10,2),\n  total_amount DECIMAL(10,2),\n  profit DECIMAL(10,2)\n);\n\n-- Dimension Tables\nCREATE TABLE dim_date (\n  date_key INT PRIMARY KEY,\n  full_date DATE,\n  day_of_week VARCHAR(10),\n  month_name VARCHAR(10),\n  quarter INT,\n  year INT\n);\n\nCREATE TABLE dim_product (\n  product_key INT PRIMARY KEY,\n  product_name VARCHAR(100),\n  category VARCHAR(50),\n  subcategory VARCHAR(50)\n);"
        }
    },
    {
        id: "data-warehousing",
        title: "Data Warehousing",
        icon: "Database",
        iconBg: "bg-purple-500/20 text-purple-400",
        accentColor: "purple",
        description: "Data warehouses store consolidated data from various sources using ETL (Extract, Transform, Load) tools. They serve as the centralized location for BI analysis.",
        subtopics: [
            { title: "ETL Process", description: "Extract, Transform, Load workflow" },
            { title: "Data Marts", description: "Subject-specific data subsets" },
            { title: "Star Schema", description: "Fact and dimension table design" },
            { title: "Snowflake Schema", description: "Normalized dimension tables" },
            { title: "OLAP Cubes", description: "Multi-dimensional analysis" }
        ],
        codeExample: {
            title: "ETL Pipeline for BI",
            language: "python",
            code: "import pandas as pd\nfrom sqlalchemy import create_engine\n\n# EXTRACT: Get data from source systems\nsource_engine = create_engine('postgresql://source_db')\ndf_orders = pd.read_sql('SELECT * FROM orders', source_engine)\ndf_products = pd.read_sql('SELECT * FROM products', source_engine)\n\n# TRANSFORM: Clean and prepare for analytics\ndf_orders['order_date'] = pd.to_datetime(df_orders['order_date'])\ndf_orders['year'] = df_orders['order_date'].dt.year\ndf_orders['month'] = df_orders['order_date'].dt.month\n\n# Join with dimension data\ndf_fact = df_orders.merge(df_products, on='product_id')\n\n# Calculate metrics\ndf_fact['profit'] = df_fact['revenue'] - df_fact['cost']\n\n# LOAD: Write to data warehouse\nwarehouse_engine = create_engine('postgresql://warehouse_db')\ndf_fact.to_sql('fact_sales', warehouse_engine, if_exists='replace')"
        }
    },
    {
        id: "data-exploration",
        title: "Data Exploration and Reporting",
        icon: "Search",
        iconBg: "bg-cyan-500/20 text-cyan-400",
        accentColor: "cyan",
        description: "Data exploration offers resources for passive analysis in BI. Includes query systems, reporting tools, and statistical methods. Decision makers use these to confirm hypotheses and validate findings.",
        subtopics: [
            { title: "Ad-hoc Queries", description: "Exploratory data analysis" },
            { title: "Standard Reports", description: "Scheduled business reports" },
            { title: "Statistical Testing", description: "Hypothesis validation" },
            { title: "Data Visualization", description: "Charts and dashboards" }
        ],
        codeExample: {
            title: "Ad-hoc Analysis",
            language: "sql",
            code: "-- Example: Sales decline investigation\n\n-- Step 1: Identify declining regions\nSELECT \n  region,\n  SUM(CASE WHEN month = 'current' THEN revenue END) as current_revenue,\n  SUM(CASE WHEN month = 'previous' THEN revenue END) as previous_revenue,\n  (SUM(CASE WHEN month = 'current' THEN revenue END) - \n   SUM(CASE WHEN month = 'previous' THEN revenue END)) / \n   SUM(CASE WHEN month = 'previous' THEN revenue END) * 100 as pct_change\nFROM sales_summary\nGROUP BY region\nHAVING pct_change < -10\nORDER BY pct_change;\n\n-- Step 2: Drill down into problem regions\nSELECT \n  product_category,\n  COUNT(DISTINCT customer_id) as customers,\n  SUM(revenue) as revenue\nFROM sales_detail\nWHERE region = 'North'\n  AND order_date >= CURRENT_DATE - INTERVAL '30 days'\nGROUP BY product_category\nORDER BY revenue DESC;"
        }
    },
    {
        id: "data-mining-bi",
        title: "Data Mining for BI",
        icon: "Pickaxe",
        iconBg: "bg-amber-500/20 text-amber-400",
        accentColor: "amber",
        description: "Data mining focuses on extracting valuable information and knowledge from data using pattern recognition, machine learning, and statistical techniques to enhance business understanding.",
        subtopics: [
            { title: "Pattern Recognition", description: "Finding trends in data" },
            { title: "Machine Learning", description: "Predictive analytics" },
            { title: "Clustering", description: "Customer segmentation" },
            { title: "Association Rules", description: "Market basket analysis" },
            { title: "Predictive Modeling", description: "Forecasting outcomes" }
        ],
        codeExample: {
            title: "Customer Segmentation",
            language: "python",
            code: "import pandas as pd\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\n\n# Load customer data\ndf = pd.read_sql('''\n    SELECT \n        customer_id,\n        COUNT(*) as order_count,\n        SUM(amount) as total_spent,\n        AVG(amount) as avg_order,\n        DATEDIFF(day, MAX(order_date), CURRENT_DATE) as recency\n    FROM orders\n    GROUP BY customer_id\n''', engine)\n\n# Prepare features\nfeatures = ['order_count', 'total_spent', 'avg_order', 'recency']\nX = StandardScaler().fit_transform(df[features])\n\n# K-Means clustering\nkmeans = KMeans(n_clusters=4, random_state=42)\ndf['segment'] = kmeans.fit_predict(X)\n\n# Analyze segments\nprint(df.groupby('segment')[features].mean())"
        }
    },
    {
        id: "bi-role",
        title: "Role of Business Intelligence",
        icon: "Target",
        iconBg: "bg-rose-500/20 text-rose-400",
        accentColor: "rose",
        description: "BI follows a systematic approach: identify objectives, choose performance indicators, create mathematical models, and explore what-if scenarios to understand the impact of variables on performance.",
        subtopics: [
            { title: "Define Objectives", description: "Clearly identify business goals" },
            { title: "Performance Indicators", description: "Choose KPIs to evaluate options" },
            { title: "Mathematical Models", description: "Build analytical frameworks" },
            { title: "What-if Analysis", description: "Scenario exploration" },
            { title: "Fact-based Decisions", description: "Data-driven strategy" }
        ],
        codeExample: {
            title: "KPI Dashboard",
            language: "sql",
            code: "-- Executive KPI Dashboard Query\nWITH current_period AS (\n  SELECT \n    SUM(revenue) as revenue,\n    COUNT(DISTINCT customer_id) as customers,\n    COUNT(*) as orders,\n    SUM(profit) as profit\n  FROM sales\n  WHERE order_date >= DATE_TRUNC('month', CURRENT_DATE)\n),\nprevious_period AS (\n  SELECT \n    SUM(revenue) as revenue,\n    COUNT(DISTINCT customer_id) as customers\n  FROM sales\n  WHERE order_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')\n    AND order_date < DATE_TRUNC('month', CURRENT_DATE)\n)\nSELECT\n  c.revenue as current_revenue,\n  p.revenue as previous_revenue,\n  (c.revenue - p.revenue) / p.revenue * 100 as revenue_growth_pct,\n  c.customers as active_customers,\n  c.revenue / c.orders as avg_order_value,\n  c.profit / c.revenue * 100 as profit_margin\nFROM current_period c, previous_period p;"
        }
    },
    {
        id: "bi-process",
        title: "BI Process and Features",
        icon: "Workflow",
        iconBg: "bg-indigo-500/20 text-indigo-400",
        accentColor: "indigo",
        description: "BI uses processes and tools to transform raw data into meaningful information, then into knowledge and insights. Key features include 360° business perspective, KPI measurement, and trend identification.",
        subtopics: [
            { title: "Fact-based Decision Making", description: "Data-driven approach" },
            { title: "360° Business View", description: "Complete perspective" },
            { title: "KPI Measurement", description: "Track performance indicators" },
            { title: "Benchmarking", description: "Set and track benchmarks" },
            { title: "Trend Identification", description: "Spot market trends" },
            { title: "Problem Detection", description: "Identify issues early" }
        ],
        codeExample: {
            title: "Trend Analysis",
            language: "sql",
            code: "-- Identify trends and patterns\nSELECT \n  DATE_TRUNC('week', order_date) as week,\n  product_category,\n  SUM(revenue) as revenue,\n  SUM(revenue) / LAG(SUM(revenue)) OVER (\n    PARTITION BY product_category ORDER BY DATE_TRUNC('week', order_date)\n  ) - 1 as wow_growth,\n  AVG(SUM(revenue)) OVER (\n    PARTITION BY product_category \n    ORDER BY DATE_TRUNC('week', order_date)\n    ROWS BETWEEN 3 PRECEDING AND CURRENT ROW\n  ) as rolling_4_week_avg\nFROM sales\nWHERE order_date >= CURRENT_DATE - INTERVAL '90 days'\nGROUP BY week, product_category\nORDER BY product_category, week;"
        }
    },
    {
        id: "bi-users",
        title: "Types of BI Users",
        icon: "Users",
        iconBg: "bg-teal-500/20 text-teal-400",
        accentColor: "teal",
        description: "Different users leverage BI: Analysts (statisticians using historical data), Company Heads (strategic decision-makers), Small Business Owners, and Government Officials.",
        subtopics: [
            { title: "Data/Business Analysts", description: "Statistical analysis on historical data" },
            { title: "Company Executives", description: "Strategic decision-making" },
            { title: "Department Managers", description: "Operational insights" },
            { title: "Small Business Owners", description: "Affordable business insights" },
            { title: "Government Officials", description: "Policy decision support" }
        ],
        codeExample: {
            title: "Role-Based Reports",
            language: "sql",
            code: "-- CEO Dashboard: High-level metrics\nSELECT \n  'Total Revenue' as metric, \n  CONCAT('$', FORMAT(SUM(revenue), 2)) as value\nFROM sales WHERE YEAR(order_date) = YEAR(CURRENT_DATE)\nUNION ALL\nSELECT 'Total Customers', FORMAT(COUNT(DISTINCT customer_id), 0)\nFROM customers WHERE status = 'active'\nUNION ALL\nSELECT 'Profit Margin', CONCAT(FORMAT(SUM(profit)/SUM(revenue)*100, 1), '%')\nFROM sales WHERE YEAR(order_date) = YEAR(CURRENT_DATE);\n\n-- Manager Dashboard: Departmental view\nSELECT \n  department,\n  COUNT(DISTINCT employee_id) as team_size,\n  SUM(sales_amount) as dept_revenue,\n  SUM(sales_amount) / COUNT(DISTINCT employee_id) as revenue_per_employee\nFROM employee_sales\nGROUP BY department\nORDER BY dept_revenue DESC;"
        }
    },
    {
        id: "bi-decisions",
        title: "Types of Decisions in BI",
        icon: "GitMerge",
        iconBg: "bg-violet-500/20 text-violet-400",
        accentColor: "violet",
        description: "BI supports three levels of decisions: Strategic (company-wide strategies by executives), Tactical (detailed planning and methodology), and Operational (day-to-day operations).",
        subtopics: [
            { title: "Strategic Level", description: "Long-term business strategies" },
            { title: "Tactical Level", description: "Methodology and technology planning" },
            { title: "Operational Level", description: "Day-to-day operations" }
        ],
        codeExample: {
            title: "Decision Support Queries",
            language: "sql",
            code: "-- STRATEGIC: Market expansion analysis\nSELECT \n  region,\n  SUM(revenue) as total_revenue,\n  COUNT(DISTINCT customer_id) as customer_base,\n  SUM(revenue) / COUNT(DISTINCT customer_id) as revenue_per_customer,\n  AVG(customer_lifetime_value) as avg_clv\nFROM sales_summary\nGROUP BY region\nORDER BY avg_clv DESC;\n\n-- TACTICAL: Resource allocation\nSELECT \n  product_line,\n  SUM(inventory_cost) as inventory_value,\n  SUM(sales_30d) as recent_sales,\n  SUM(inventory_cost) / NULLIF(SUM(sales_30d), 0) as months_of_inventory\nFROM inventory\nGROUP BY product_line;\n\n-- OPERATIONAL: Daily operations\nSELECT \n  order_id, customer_name, order_status,\n  DATEDIFF(day, order_date, CURRENT_DATE) as days_pending\nFROM orders\nWHERE order_status = 'pending'\nORDER BY days_pending DESC;"
        }
    },
    {
        id: "bi-applications",
        title: "Applications of Business Intelligence",
        icon: "AppWindow",
        iconBg: "bg-orange-500/20 text-orange-400",
        accentColor: "orange",
        description: "BI is applied in decision making, data mining, operational analytics, predictive analytics, prescriptive analytics, and Executive Information Systems (EIS).",
        subtopics: [
            { title: "Decision Making", description: "Data-informed choices" },
            { title: "Data Mining", description: "Knowledge extraction" },
            { title: "Operational Analytics", description: "Process optimization" },
            { title: "Predictive Analytics", description: "Forecasting future outcomes" },
            { title: "Prescriptive Analytics", description: "Recommending actions" },
            { title: "Executive Information System", description: "C-suite dashboards" }
        ],
        codeExample: {
            title: "Predictive Analytics",
            language: "python",
            code: "import pandas as pd\nfrom sklearn.ensemble import GradientBoostingRegressor\nfrom sklearn.model_selection import train_test_split\n\n# Load historical sales data\ndf = pd.read_sql('''\n    SELECT \n        product_id, month, year,\n        marketing_spend, seasonality_index,\n        competitor_price, sales_quantity\n    FROM sales_history\n''', engine)\n\n# Prepare features for prediction\nX = df[['marketing_spend', 'seasonality_index', 'competitor_price']]\ny = df['sales_quantity']\n\n# Train predictive model\nmodel = GradientBoostingRegressor(n_estimators=100)\nmodel.fit(X, y)\n\n# Predict next quarter sales\nnext_quarter = pd.DataFrame({\n    'marketing_spend': [50000],\n    'seasonality_index': [1.2],\n    'competitor_price': [29.99]\n})\npredicted_sales = model.predict(next_quarter)\nprint(f'Predicted sales: {predicted_sales[0]:.0f} units')"
        }
    },
    {
        id: "bi-tools",
        title: "Popular BI Tools",
        icon: "LayoutDashboard",
        iconBg: "bg-pink-500/20 text-pink-400",
        accentColor: "pink",
        description: "Popular BI tools include Power BI (Microsoft), Tableau (Salesforce), Looker (Google), QlikView, and Metabase. Each offers unique features for data visualization and analysis.",
        subtopics: [
            { title: "Power BI", description: "Microsoft's BI platform" },
            { title: "Tableau", description: "Industry-leading visualization" },
            { title: "Looker", description: "Google Cloud BI tool" },
            { title: "QlikView/Qlik Sense", description: "Associative analytics" },
            { title: "Metabase", description: "Open-source BI" },
            { title: "Sisense", description: "Embedded analytics" }
        ],
        codeExample: {
            title: "Power BI DAX Example",
            language: "dax",
            code: "// Key DAX Measures for BI Dashboard\n\n// Total Revenue\nTotal Revenue = SUM(Sales[Amount])\n\n// Year-over-Year Growth\nYoY Growth = \nVAR CurrentYear = [Total Revenue]\nVAR PreviousYear = CALCULATE(\n    [Total Revenue],\n    SAMEPERIODLASTYEAR('Date'[Date])\n)\nRETURN\nDIVIDE(CurrentYear - PreviousYear, PreviousYear, 0)\n\n// Running Total\nRunning Total = \nCALCULATE(\n    [Total Revenue],\n    FILTER(\n        ALL('Date'),\n        'Date'[Date] <= MAX('Date'[Date])\n    )\n)\n\n// Customer Lifetime Value\nCLV = \nDIVIDE(\n    [Total Revenue],\n    DISTINCTCOUNT(Sales[CustomerID])\n)"
        }
    }
];
