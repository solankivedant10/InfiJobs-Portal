import React from 'react';

const projectData = [
    {
        id: 'ba-project-modal',
        title: 'Business Analyst Project Examples',
    },
    {
        id: 'da-project-modal',
        title: 'Data Analyst Project Examples',
    },
    {
        id: 'ds-project-modal',
        title: 'Data Scientist Project Examples',
    },
    {
        id: 'fa-project-modal',
        title: 'Financial Analyst Project Examples',
    },
    {
        id: 'bi-project-modal',
        title: 'Business Intelligence (BI) Project Examples',
    },
    {
        id: 'de-project-modal',
        title: 'Data Engineer Project Examples',
    },
    {
        id: 'sc-project-modal',
        title: 'Supply Chain Analyst Project Examples',
    },
    {
        id: 'jf-project-modal',
        title: 'Java Full Stack Developer Project Examples',
    },
    {
        id: 'fd-project-modal',
        title: 'Frontend Developer Project Examples',
    }
];

// --- Content for Modals ---

interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
}

// Generic Card Component for DRY principle
const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col border border-gray-700 hover:border-green-500 hover:shadow-green-500/20 transform hover:-translate-y-1 transition-all duration-300">
        <h4 className="text-md font-bold text-green-300 mb-2">{title}</h4>
        <p className="text-gray-400 flex-grow mb-4 text-sm">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="mt-auto text-center w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
            View Project Details
        </a>
    </div>
);

// Business Analyst Projects
const baProjects = [
    {
        title: "AI-Driven Business Process Optimization",
        description: "Analyze business processes using AI-based tools to identify inefficiencies and automate decision-making, improving overall business performance and reducing costs.",
        link: "https://youtu.be/-y4swMaeJeI?si=Qc4Xt4Kp8bCzbMd1"
    },
    {
        title: "Customer Journey Mapping",
        description: "Create a visual map of the customer journey, using analytics to identify pain points and opportunities for enhancing customer experiences across multiple touchpoints.",
        link: "https://youtu.be/taCTO9tW3zc?si=fOAiPsXckAWu3gS1"
    },
    {
        title: "Supply Chain Optimization",
        description: "Leverage data analytics to optimize the supply chain process, identifying areas of inefficiency, managing inventory, and improving supplier relationships through actionable insights.",
        link: "https://youtu.be/Z0k8NqV6e9E?si=wdyCPinPiRpnLxs6"
    },
    {
        title: "Sales Forecasting Dashboard",
        description: "Develop an interactive sales forecasting dashboard using historical data and predictive analytics to help business leaders make informed decisions about inventory and marketing efforts",
        link: "https://youtu.be/mmxVCFceQgU?si=fTyDQ89jEVmmtaE1"
    },
    {
        title: "Cost Optimization Analysis",
        description: "Analyze cost data to recommend strategies for cost reduction across departments, ensuring the organization maximizes profitability while maintaining quality.",
        link: "https://www.youtube.com/watch?v=OKYJCHHSWb4"
    },
    {
        title: "Operational Efficiency Dashboard",
        description: "Create a real-time dashboard that tracks operational KPIs (Key Performance Indicators) to highlight areas of inefficiency and provide actionable insights for improvement.",
        link: "https://www.youtube.com/watch?v=nygCkrmZOmQ"
    },
    {
        title: "Product Launch Strategy",
        description: "Develop a comprehensive product launch plan by analyzing market data, competitor positioning, and customer feedback to create a targeted go-to-market strategy.",
        link: "https://www.youtube.com/watch?v=GZt2Mz_JrvI"
    },
    {
        title: "Customer Feedback Analysis",
        description: "Leverage sentiment analysis to analyze customer feedback, identify trends in satisfaction or dissatisfaction, and recommend actions based on insights gathered from survey data.",
        link: "https://www.youtube.com/watch?v=-7mQPI6-8xw"
    },
    {
        title: "Risk Management Model",
        description: "Design a risk management framework that identifies and assesses potential business risks (financial, operational, strategic), providing mitigation strategies for each risk factor.",
        link: "https://www.youtube.com/watch?v=yqKVrOV-6Ss&t=88s"
    },
    {
        title: "Business Case Development",
        description: "Create a business case for a new product or service by analyzing market needs, financial projections, and competitive landscape, presenting recommendations to stakeholders for approval.",
        link: "https://www.youtube.com/watch?v=H18LVoRayns&t=23s"
    },
    {
        title: "Data-Driven Pricing Strategy",
        description: "Build a pricing model using data analytics to recommend optimal pricing strategies based on competitor pricing, market demand, and customer willingness to pay.",
        link: "https://www.youtube.com/watch?v=vCACTNA65zo"
    },
    {
        title: "Agile Project Management Dashboard",
        description: "Create a real-time dashboard to track agile project metrics (sprints, backlog items, team performance) and support project managers in making data-driven decisions to improve efficiency.",
        link: "https://www.youtube.com/watch?v=TXqqkStTHMA"
    },
];

const BusinessAnalystProjectContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {baProjects.map((project, index) => <ProjectCard key={index} title={project.title} description={project.description} link={project.link} />)}
    </div>
);

// Data Analyst Projects
const daProjects = [
    {
        title: "Sales Performance Dashboard",
        description: "Build a dashboard visualizing key sales metrics (revenue, orders, region) using sample transactional data and interactive filters.",
        link: "https://www.youtube.com/watch?v=CGgXHsD19Ek"
    },
    {
        title: "Customer Churn Analysis",
        description: "Analyze telecom or subscription data to identify factors driving churn, build a predictive model, and suggest retention strategies.",
        link: "https://youtu.be/HHu0FLM6Fp0?si=eRGlLPI222tYBDAl"
    },
    {
        title: "Web Traffic Trends",
        description: "Process web log files to extract usage patterns, visualize peak hours, source breakdown, and user journey flow.",
        link: "https://video.cisco.com/detail/video/6366064786112"
    },
    {
        title: "Marketing Campaign ROI",
        description: "Assess multiple marketing channels by calculating ROI, customer acquisition cost, and recommending budget reallocation.",
        link: "https://youtu.be/XHi3-AHnQKc?si=16sT5e8rlBLmxplU"
    },
    {
        title: "Sentiment Analysis Dashboard",
        description: "Ingest social media comments or reviews, perform sentiment analysis, and display trending keywords and overall sentiment.",
        link: "https://youtu.be/-7mQPI6-8xw?si=Ze-X-IG2ETz1aZ28"
    },
    {
        title: "Real-Time Data Analytics Dashboard",
        description: "Create a dashboard to track real-time metrics, such as website traffic or stock market data, providing live updates and interactive filtering.",
        link: "https://www.youtube.com/watch?v=WXABIUMYzM0"
    },
    {
        title: "Customer Segmentation Analysis",
        description: "Use demographic and transactional data to segment customers based on behaviors, visualizing clusters and providing actionable insights for targeted marketing.",
        link: "https://www.youtube.com/watch?v=QvxuR8uLPFs"
    },
    {
        title: "Product Performance Analysis",
        description: "Analyze the performance of different products across regions or demographics, visualizing sales, customer ratings, and inventory turnover rates.",
        link: "https://www.youtube.com/watch?v=1EbGPnTnOMw"
    },
    {
        title: "Forecasting Demand with Time Series",
        description: "Use historical sales data to predict future demand using time series models (ARIMA, Prophet) and display the forecasts with confidence intervals.",
        link: "https://www.youtube.com/watch?v=x6Ixq8lGTEY"
    },
    {
        title: "Supply Chain Optimization Analysis",
        description: "Use data analysis to optimize inventory management, track shipments, and forecast supply chain bottlenecks for improved operations.",
        link: "https://www.youtube.com/watch?v=lUm1e7-UyR8"
    },
    {
        title: "Data Quality Assurance Framework",
        description: "Develop a framework to monitor and clean datasets, checking for missing values, outliers, duplicates, and data inconsistencies across multiple sources.",
        link: "https://www.youtube.com/watch?v=JnjwR290XdY"
    },
    {
        title: "Geospatial Data Visualization",
        description: "Analyze geospatial data to create interactive maps displaying key business insights, such as sales density, customer locations, and service coverage.",
        link: "https://www.youtube.com/watch?v=cjfqCHHp-AE"
    },
];

const DataAnalystProjectContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {daProjects.map((project, index) => <ProjectCard key={index} title={project.title} description={project.description} link={project.link} />)}
    </div>
);

// Data Scientist Projects
const dsProjects = [
    {
        title: "AI-Powered Image Generation with GANs",
        description: "Build a Generative Adversarial Network (GAN) to generate high-quality images. Train the model on a dataset like MNIST or CelebA and experiment with StyleGAN for realistic image creation.",
        link: "https://youtu.be/5mYtKcc8ht4?si=y94EmaIKTmD9tkb5"
    },
    {
        title: "Text Generation with GPT-3",
        description: "Utilize GPT-3 or GPT-4 to generate human-like text. Fine-tune the model for a specific use case (e.g., product descriptions or creative writing) and integrate it into a chatbot or content generation system.",
        link: "https://youtu.be/7O5ZKtJ99lc?si=u25UrTyStUlzlrUQ"
    },
    {
        title: "AI-Powered Chatbot with NLP",
        description: "Create an intelligent chatbot using transformers like BERT, GPT, or T5. Implement natural language understanding (NLU) to engage users in dynamic conversations for customer service or content recommendations.",
        link: "https://youtu.be/2e5pQqBvGco?si=n8vYiAvN033z36Nr"
    },
    {
        title: "Image Captioning with Deep Learning",
        description: "Combine computer vision and NLP by creating an image captioning system. Use CNNs for image feature extraction and LSTMs for sequence generation to describe images in natural language.",
        link: "https://youtu.be/aaP7JJZuvGs?si=Wf-NlNFGN1drTg-y"
    },
    {
        title: "Speech Recognition and Text-to-Speech Model",
        description: "Build a speech-to-text and text-to-speech system using deep learning. Use datasets like LibriSpeech and apply recurrent neural networks (RNNs) for transcription and speech synthesis.",
        link: "https://youtu.be/mYUyaKmvu6Y?si=zz-pWQkHfc4SRqRl"
    },
    {
        title: "Reinforcement Learning for Autonomous Driving",
        description: "Develop an AI agent using reinforcement learning that learns how to drive autonomously in a simulated environment like OpenAI Gym or CARLA simulator. Implement Q-learning or Proximal Policy Optimization (PPO).",
        link: "https://youtu.be/f31Mu5Yxc60?si=-84F_Hiwy5Hf6FZn"
    },
    {
        title: "AI-Powered Fraud Detection",
        description: "Use machine learning to detect fraudulent transactions in real-time. Train models on financial transaction data to identify anomalies and prevent fraud using classification algorithms such as Random Forest and XGBoost.",
        link: "https://youtu.be/ve5xTvsvots?si=xKTHoB86EI8uTLhx"
    },
    {
        title: "Time Series Forecasting with LSTM Networks",
        description: "Implement a Long Short-Term Memory (LSTM) network to predict stock prices, weather forecasts, or other time-series data. Enhance the model with feature engineering and hyperparameter optimization.",
        link: "https://youtu.be/94PlBzgeq90?si=96j9zsI-otRli2uW"
    },
    {
        title: "Facial Emotion Recognition with CNN",
        description: "Create a model that recognizes emotions from facial expressions using convolutional neural networks (CNN). Use datasets like FER-2013 and train the model for applications in security and mental health.",
        link: "https://youtu.be/mj-3vzJ4ZVw?si=izQbDBZEqT5IhtRh"
    },
    {
        title: "AI-Driven Video Analytics",
        description: "Apply deep learning to video analytics. Detect objects, recognize activities, and track movements in videos using models like YOLO and OpenCV. This can be applied to security systems, retail analytics, and more.",
        link: "https://youtu.be/nWrZ_7ktZ20?si=asS5Octpm4HhP6hN"
    },
    {
        title: "Generative Art with Neural Networks<",
        description: "Generate artistic images using neural networks. Train a model on a dataset of paintings or artistic styles and use GANs to create unique, AI-generated artwork for use in digital media and entertainment.",
        link: "https://youtu.be/LDDKrQjGdYk?si=T0Eoeo8im_J9F5Le"
    },
    {
        title: "AI-Powered Predictive Analytics for Marketing",
        description: "Build models to predict customer behavior and sales trends. Optimize marketing strategies using machine learning to analyze customer data and improve conversion rates across marketing campaigns.",
        link: "https://youtu.be/0K1ESOC8CXg?si=Pm2K_rUkcAbtvfoD"
    }
];

const DataScientistProjectContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dsProjects.map((project, index) => <ProjectCard key={index} title={project.title} description={project.description} link={project.link} />)}
    </div>
);

// Financial Analyst Projects
const faProjects = [
    {
        title: "Dynamic Budgeting Dashboard",
        description: "Develop an interactive budgeting dashboard in Excel or Power BI that tracks actual vs. planned spend across departments, with scenario toggles and forecasting.",
        link: "https://youtu.be/9uFKAwIa3V0?si=iLRjC4etSOI8IFgo"
    },
    {
        title: "Valuation Model",
        description: "Create a DCF-based valuation model for a publicly traded company. Pull in financial statements, forecast free cash flows, calculate WACC, and perform sensitivity analysis.",
        link: "https://youtu.be/ZQ8wODESzhs?si=WmUGHkUFwcUrO3gX"
    },
    {
        title: "Portfolio Optimization",
        description: "Using historical price data, construct a mean-variance optimized portfolio. Implement Python or Excel solver to maximize Sharpe ratio and visualize efficient frontier.",
        link: "https://youtu.be/D44EDant0rs?si=Reo-lK7AVEEWOsr3"
    },
    {
        title: "Revenue Forecasting",
        description: "Build a time-series forecasting model (ARIMA or Prophet) to predict monthly revenues. Include seasonality decomposition and confidence intervals in an interactive report.",
        link: "https://youtu.be/JFQD928KnhU?si=YqhRA55_eo3pmN0J"
    },
    {
        title: "Risk Analysis Case Study",
        description: "Perform a Monte Carlo simulation on key financial metrics (e.g., EBITDA) to assess risk. Generate scenario distributions and probability heatmaps for stakeholders.",
        link: "https://youtu.be/5urqVPEaaSw?si=85Te_PqKQFOXAGmH"
    },
    {
        title: "Financial Statement Analysis",
        description: "Perform a comprehensive financial statement analysis on a publicly traded company. Calculate key ratios (ROA, ROE, current ratio, etc.) and analyze trends over multiple years.",
        link: "https://youtu.be/3W_LwpeG8c8?si=Ur0RkhPvIvfanDXw"
    },
    {
        title: "Financial Planning for Startups",
        description: "Create a financial model for a startup including projected P&L, cash flow, and balance sheet. Incorporate growth assumptions, funding rounds, and break-even analysis.",
        link: "https://youtu.be/_3pNF2S5kiE?si=sgetZT0pVCp2Io7N"
    },
    {
        title: "Debt Structuring Model",
        description: "Design a debt structuring model for a company looking to refinance debt. Calculate the optimal debt/equity ratio and assess the impact on cost of capital and profitability.",
        link: "https://youtu.be/BG09xanURCs?si=Q32o8aNla5zzS8eo"
    },
    {
        title: "Investment Portfolio Performance Tracker",
        description: "Create a dashboard to track the performance of an investment portfolio. Include key metrics like ROI, CAGR, alpha, and beta, and visualize portfolio performance over time.",
        link: "https://youtu.be/df0Rb3k0VSA?si=8cFITaN61J4Yv8vw"
    },
    {
        title: "Cash Flow Forecasting",
        description: "Build a cash flow forecasting model using historical financial data. Provide insights into liquidity and operational efficiency with dynamic charts and reports.",
        link: "https://youtu.be/0BGanYasxn8?si=WcZZA6aMLIE3wxiQ"
    },
    {
        title: "Equity Research Report",
        description: "Prepare an equity research report on a publicly listed company. Perform fundamental analysis, assess the company's growth prospects, and provide buy/sell recommendations.",
        link: "https://youtu.be/E7Wkz5vzc1A?si=r6uswWzHhrlogUik"
    },
    {
        title: "Financial Ratio Analysis Dashboard",
        description: "Develop a dashboard in Power BI that visualizes and analyzes key financial ratios (e.g., debt-to-equity, liquidity ratios) for multiple companies in an industry.",
        link: "https://youtu.be/h1wqUQE4gkM?si=sPHu5ZCRe3UIvzsa"
    }
];

const FinancialAnalystProjectContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faProjects.map((project, index) => <ProjectCard key={index} title={project.title} description={project.description} link={project.link} />)}
    </div>
);

// Business Intelligence Projects
const biProjects = [
    {
        title: "Executive KPI Dashboard",
        description: "Design a real-time dashboard in Power BI/Tableau tracking key performance indicators (revenue, margins, customer churn) across regions, with drill-through and alerting.",
        link: "https://www.youtube.com/watch?v=T_y9w_yilXU&list=PLj9PXoZSrCDe6UA4TUsT0HPwTGRabGkaI"
    },
    {
        title: "Sales Territory Optimization",
        description: "Analyze historical sales and geographic data to propose optimal territory assignments. Use clustering to define regions and visualize workload distribution.",
        link: "https://youtu.be/UQsM8dZ_Cm8?si=SKhB36luG3p9j-6q"
    },
    {
        title: "Supply Chain Analytics",
        description: "Build interactive reports on inventory levels, supplier lead times, and order fulfillment rates. Implement what-if parameter controls for scenario planning.",
        link: "https://youtu.be/PglKAYgRdJ4?si=jcycCR1ijN8z3-19"
    },
    {
        title: "Customer Lifetime Value Analysis",
        description: "Compute CLV using transaction history. Segment customers by value tiers and display cohort and waterfall charts to illustrate retention and spend patterns.",
        link: "https://youtu.be/s-32u6XdY7c?si=UWFXXoWwbWT_nCmF"
    },
    {
        title: "Financial Statement Reporting",
        description: "Create a consolidated P&L and balance sheet report. Use dynamic visuals for variance analysis against budget and prior periods, with custom date slicers.",
        link: "https://youtu.be/Fi1wkUczuyk?si=4iCmYbBAplEyjxDz"
    },
    {
        title: "Real-Time Stock Price Analytics",
        description: "Develop a dashboard to display live stock prices and key financial metrics using APIs. Implement time-series forecasting for stock price predictions and trends.",
        link: "https://youtu.be/n0rqiQSt8Gc?si=2iClhlWEx-ao0kL_"
    },
    {
        title: "Predictive Maintenance Analytics",
        description: "Utilize sensor data to predict equipment failures in manufacturing. Use machine learning models for anomaly detection and visualize maintenance schedules and cost analysis.",
        link: "https://youtu.be/n6lAPyp9gfA?si=QQzYL9JX8rJixDsQ"
    },
    {
        title: "Social Media Sentiment Analysis",
        description: "Extract data from social media platforms using APIs. Perform sentiment analysis on user comments or posts to track brand sentiment over time. Visualize sentiment trends on an interactive dashboard.",
        link: "https://youtu.be/2MsPvud4mkc?si=J6VxR953pk4SL234"
    },
    {
        title: "Customer Churn Prediction",
        description: "Build a predictive model to forecast customer churn using historical customer data. Include insights on retention strategies with visualizations and decision-support tools.",
        link: "https://youtu.be/NyNjJCpKIlE?si=kiAQijTz6V8LkBql"
    },
    {
        title: "Geospatial Data Analysis for Market Expansion",
        description: "Use geospatial analysis to identify potential new markets for business expansion. Combine location data with sales performance to create heatmaps and predictive models for location targeting.",
        link: "https://youtu.be/m3VmjbABlCo?si=nxMU-oDghAW31TsC"
    },
    {
        title: "Employee Performance Analytics",
        description: "Develop a dashboard that tracks employee performance across various metrics (e.g., productivity, attendance, and customer feedback). Use visualizations to highlight top performers, identify trends, and offer recommendations for employee development programs.",
        link: "https://youtu.be/uxDu8AhZLrE?si=6KUjTW5ALJ-YLRHV"
    },
    {
        title: "E-commerce Conversion Rate Optimization",
        description: "Create a dashboard that monitors and analyzes e-commerce conversion rates, from site visits to purchases. Use funnel analysis and A/B test results to provide actionable insights that improve user experience and increase sales conversion rates.",
        link: "https://youtu.be/qup8QaCjdDc?si=5DHiFr0qS8mbrFg1"
    }
];

const BusinessIntelligenceProjectContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {biProjects.map((project, index) => <ProjectCard key={index} title={project.title} description={project.description} link={project.link} />)}
    </div>
);

// Data Engineer Projects
const deProjects = [
    {
        title: "Data Pipeline ETL Workflow",
        description: "Design a scalable ETL pipeline using Apache Airflow to ingest raw CSV data from cloud storage, transform it with Spark, and load into a cloud data warehouse (e.g., Snowflake).",
        link: "https://youtu.be/pGjQJmX_IfM?si=rM8s4uPwc_u2SUZZ"
    },
    {
        title: "Real-time Streaming Architecture",
        description: "Implement a Kafka-based streaming system that consumes IoT sensor events, processes them in real time with Apache Flink or Spark Streaming, and writes results to a NoSQL store.",
        link: "https://youtu.be/RvsaosnEHWc?si=p-vo-C06NUXoFMde"
    },
    {
        title: "Data Lakehouse on Cloud",
        description: "Set up a Delta Lake on AWS S3 using Delta Lake or AWS Glue. Demonstrate ACID transactions, time travel queries, and performant reads for analytics workloads.",
        link: "https://youtu.be/BDRp0hczNyY?si=17mzzndm6Q7NnrXu"
    },
    {
        title: "Scalable Data Orchestration",
        description: "Use Kubernetes and Terraform to deploy a data processing microservice architecture. Automate provisioning, containerization with Docker, and CI/CD for data jobs.",
        link: "https://youtu.be/G8ayuFVGOH8?si=j_dJsTYzw8Y3_JdA"
    },
    {
        title: "Data Quality Monitoring Dashboard",
        description: "Create a monitoring solution using Great Expectations to validate data quality rules, log metrics to Prometheus, and visualize alerts in Grafana.",
        link: "https://youtu.be/aDBPoKyA0DQ?si=XH6eEsfiHBjKYur6"
    },
    {
        title: "Real-Time Data Warehouse",
        description: "Design a real-time data warehouse using AWS Redshift or Google BigQuery, where data is ingested, processed, and updated continuously in real-time.",
        link: "https://youtu.be/n55Vpaa6NKM?si=lRmvpfTso2IP4W1L"
    },
    {
        title: "Automated Data Cleanup Pipeline",
        description: "Create an automated data pipeline using Python and Pandas to clean, standardize, and format data coming from various sources before storing it in a cloud database.",
        link: "https://youtu.be/pS6rytmgZKQ?si=ge8BY3PHBDV34Eyg"
    },
    {
        title: "Cloud-based Data Engineering with Apache Beam",
        description: "Implement Apache Beam on Google Cloud to build an end-to-end data processing pipeline that handles batch and streaming data. Leverage Dataflow for scalability.",
        link: "https://youtu.be/PEf58tvl93s?si=lHcMMfsKgH5fTzQo"
    },
    {
        title: "Data Cataloging with Apache Atlas",
        description: "Set up Apache Atlas for metadata management. Create a data catalog for efficient data discovery, governance, and lineage tracking in a large-scale data environment.",
        link: "https://youtu.be/bzvLTqVMHf8?si=TLnrANDrqefcNhUh"
    },
    {
        title: "Data Replication and Synchronization",
        description: "Design a solution to replicate data between multiple cloud data sources, ensuring real-time synchronization using AWS DMS or Google Cloud Dataflow.",
        link: "https://youtu.be/uB8hXiCFBUM?si=Iewgp8axvp1Ty8WQ"
    },
    {
        title: "Distributed Data Processing with Hadoop",
        description: "Set up a Hadoop cluster to handle large-scale data processing tasks. Create batch jobs using MapReduce to process petabytes of structured and unstructured data.",
        link: "https://youtu.be/aReuLtY0YMI?si=lXavUu7VRHO85TPe"
    },
    {
        title: "Data Security with Encryption at Rest",
        description: "Implement encryption at rest for sensitive data stored in cloud storage solutions. Use AWS KMS or GCP Cloud Key Management for automated encryption and decryption.",
        link: "https://youtu.be/Hi9z45-CPs4?si=RBxuM1oBH_x00kY5"
    }
];

const DataEngineerProjectContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deProjects.map((project, index) => <ProjectCard key={index} title={project.title} description={project.description} link={project.link} />)}
    </div>
);

// Supply Chain Analyst
const scProjects = [
    {
        title: "Supply-Chain Analytics & Demand Forecasting",
        description: "Use time-series and ML models to forecast demand at SKU/store level and optimize inventory planning to minimize stockouts and overstock. Includes data cleaning, exploratory analysis, forecasting, evaluation and reporting. Based on a public GitHub repo.",
        link: "https://github.com/emirhansilsupur/supply-chain-analytics-forecasting"
    },
    {
        title: "Retail Sales Demand Forecasting & Inventory Optimization",
        description: "Predict weekly sales for retail stores using historical data (store type, promotions, seasonality etc.) with RandomForest; helps in inventory & supply-chain decision making.",
        link: "https://github.com/A1fred00-datascience/Supply-Chain-Optimization"
    },
    {
        title: "Comprehensive Supply-Chain Optimization (Forecasting, Inventory, Logistics, Supplier Selection)",
        description: "End-to-end ML-based supply-chain optimization covering demand forecasting, stock management, logistics routing and supplier evaluation; includes notebooks, scripts and datasets for real-world use cases.",
        link: "https://github.com/ankitrajsh/Supply-Chain-Optimization"
    },
    {
        title: "Linear–Programming Based Supply-Chain Network Optimization",
        description: "Formulate and solve supply-chain network design problem (production facility location, shipping costs, demand fulfilment) using linear programming to minimize total cost across production + transportation + demand constraints.",
        link: "https://github.com/samirsaci/supply-chain-optimization"
    },
    {
        title: "Supply-Chain Analytics & Dashboard (Shipment, Inventory, Fulfillment Insights)",
        description: "Analyze real-world supply-chain data (orders, shipments, inventory, fulfillment) to detect inefficiencies; build dashboards to highlight delays, overstock/understock, inventory flow and fulfillment metrics using Python + visualization tools.",
        link: "https://github.com/poojapatel26/Supply-Chain-Analytics"
    },
    {
        title: "Just-In-Time Company Supply-Chain Analysis",
        description: "Use real-world dataset to analyze order flows, shipments, inventory and fulfillment for a JIT company; perform EDA, inventory segmentation, shipment-delay analysis and create dashboards + reports.",
        link: "https://github.com/hoshigan/Supply-Chain-Analytic---Just-In-Time-Company"
    },
    {
        title: "Retail Analytics + Demand Forecasting (Power-BI / Prophet / Python)",
        description: "Perform demand forecasting for top-selling products in a retail dataset using time-series model (e.g. Prophet), combined with inventory management and insights dashboards.",
        link: "https://github.com/KrishnaKanjani/retail-analytics-and-demand-forecasting"
    },
    {
        title: "Store Inventory Demand Analysis & Optimization for Essential Supplies",
        description: "Optimize store-level inventory management (for e.g. healthcare supplies) by forecasting demand using ARIMA / Holt-Winters / Random Forest and integrating analytics with SQL / Power BI dashboards.",
        link: "https://github.com/mukul-bhele/inventoryoptimization"
    },
    {
        title: "Supply-Chain Forecasting with Deep Learning (CNN + LSTM)",
        description: "Use deep-learning (CNN + LSTM) to forecast demand and align supply according to changing demand patterns — useful for retailers or manufacturers facing highly variable demand. Good for time-series forecasting beyond classical methods.",
        link: "https://github.com/milonigada09/Supply-Chain-forecasting-deep-learning"
    },
    {
        title: "Parts-Level Demand Forecasting for Manufacturing Supply Chain",
        description: "Perform fine-grained (part-level) demand forecasting for manufacturing supply chains using statistical or ML models — helps in planning for procurement and production scheduling at component level.",
        link: "https://github.com/databricks-industry-solutions/parts-demand-forecasting"
    },
    {
        title: "Inventory Management & Demand Forecasting for E-commerce / Retail",
        description: "Build a system for e-commerce or retail inventory management using Random Forest–based demand forecasting and inventory stocking logic to minimize overstock or stockouts.",
        link: "https://github.com/manavisrani07/Inventory_demand_forecasting"
    },
    {
        title: "Time-Series Demand Forecasting (ARIMA / Exponential Smoothing)",
        description: "Apply classical time-series forecasting techniques (ARIMA, Exponential Smoothing) to historical sales data to forecast future demand — a simple, statistical baseline for supply-chain forecasting.",
        link: "https://github.com/dwoo-work/time-series-demand-forecasting"
    }
];

const SupplyChainAnalystProjectContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scProjects.map((project, index) => <ProjectCard key={index} title={project.title} description={project.description} link={project.link} />)}
    </div>
);

// Java Full Stack Developer
const jfProjects = [
    {
        title: "Java-React FullStack E-Commerce App",
        description: "A full-fledged e-commerce application built with Java Spring Boot (backend) and React (frontend); good reference for product catalog, cart, checkout, user sessions and full-stack integration.",
        link: "https://github.com/rahulsahay19/Java-React-FullStack"
    },
    {
        title: "Spring Boot + React CRUD Full-Stack App (Employee / Generic Data Management)",
        description: "Full-stack CRUD application using Spring Boot backend + React frontend — demonstrates REST APIs, CRUD operations, MySQL persistence, and React UI consuming those APIs.",
        link: "https://github.com/RameshMF/ReactJS-Spring-Boot-CRUD-Full-Stack-App"
    },
    {
        title: "Spring Boot + Vue.js Full-Stack Web App Example",
        description: "Example project showing how to build a web application with Spring Boot backend and Vue.js frontend — good if you want to explore alternatives to React for the front end with Java backend.",
        link: "https://github.com/jonashackt/spring-boot-vuejs"
    },
    {
        title: "Full-Stack Todo Management Application (Angular + Spring Boot)",
        description: "A basic full-stack Todo management system using Angular frontend and Spring Boot backend — good as starting project to understand full-stack structure, security (Auth), REST, UI styling.",
        link: "https://github.com/in28minutes/full-stack-with-angular-and-spring-boot"
    },
    {
        title: "ReactJS + Spring Boot Full-Stack Platform (Arts & Recreation Service Directory)",
        description: "Full-stack platform connecting consumers and small-business services (arts / entertainment / recreation) with Spring Boot REST API backend and ReactJS frontend, plus authentication using JWT.",
        link: "https://github.com/purshink/ReactJS-Spring-Boot-Full-Stack-App"
    },
    {
        title: "Spring Boot + React + Microservices Full-Stack Architecture Project",
        description: "Demonstrates microservices-based full-stack app using Spring Boot backend services, React frontend, useful for understanding distributed architecture, service-oriented design, and modern full-stack scale.",
        link: "https://github.com/VonHumbolt/CineVisionMicroserviceProject"
    },
    {
        title: "Full-Stack Employee Management System (Spring Boot + React JS / Vite)",
        description: "A full-stack Employee Management System with React JS frontend and Spring Boot backend + MySQL — supports add/update/delete/list employees; good for practice on CRUD, REST API, and front-back integration.",
        link: "https://github.com/Ajiththeerthiya/Full-stack-Employee-Management-System-using-SpringBoot-and-React-Js-"
    },
    {
        title: "Spring Boot + React Full-Stack Examples Collection",
        description: "Collection of multiple full-stack example apps combining Spring Boot (backend) and React (frontend) — useful for learning REST API design, authentication, CORS, database integration and front-end routing in Java ecosystem.",
        link: "https://github.com/in28minutes/spring-boot-react-fullstack-examples"
    },
    {
        title: "Spring Boot + Angular CRUD Full-Stack App (Multiple DB Options)",
        description: "CRUD applications built with Spring Boot and Angular frontend supporting various databases (H2, MySQL, PostgreSQL, MongoDB, and more) — useful to understand full-stack with flexible persistence options.",
        link: "https://github.com/topics/full-stack-application"  // generic search tag: see Spring Boot + Angular projects under this topic
    },
    {
        title: "Full-Stack Java Web App (Monolithic) with Spring Boot, Thymeleaf + MySQL",
        description: "Classic full-stack web application using Java Spring Boot, Thymeleaf templating (server-rendered UI), and MySQL — good for those preferring server-side rendered Java web apps over SPA front-ends.",
        link: "https://github.com/JCesar-Developer/springToYourHome"
    },
    {
        title: "Spring Boot + Vue / React Generic Full-Stack Template (REST + Frontend)",
        description: "Simple but clean full-stack template project combining Java backend (Spring Boot) with modern frontend (Vue or React) — good as a base template for your custom projects.",
        link: "https://github.com/kantega/react-and-spring"
    },
    {
        title: "Advanced Online Banking App (Spring Boot + React + Redux + JWT + MySQL)",
        description: "Demonstrates building a realistic online banking application with Spring Boot backend, React + Redux frontend, JWT-based authentication, error handling and full-stack features — good for advanced full-stack practice.",
        link: "https://github.com/Berko01/Advanced-Full-Stack-Project-With-Java-Spring-Boot-And-React-Redux-Online-Banking"
    }
];

const JavaFullStackDeveloperProjectContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jfProjects.map((project, index) => <ProjectCard key={index} title={project.title} description={project.description} link={project.link} />)}
    </div>
);

// Frontend Developer
const fdProjects = [
    {
        title: "50 Projects – HTML, CSS & JavaScript (mini-projects collection)",
        description: "A curated set of 50 small frontend projects (vanilla JS, HTML, CSS) that help sharpen core UI skills, learn DOM manipulation, layout, responsiveness, and basic frontend logic.",
        link: "https://github.com/bradtraversy/50projects50days"
    },
    {
        title: "The 50 Front-end Project (50-project collection)",
        description: "A repository containing 50 diverse frontend projects — good portfolio of small/medium-scale UI/UX experiments, animations, interactive UI components, web-app clones and more.",
        link: "https://github.com/SudeepAcharjee/The-50-Front-end-Project"
    },
    {
        title: "Frontend-Projects (Beginner to Intermediate HTML/CSS/JS)",
        description: "Collection of essential frontend web-projects using HTML, CSS, JS — ideal if you want to practice fundamentals or build a set of hands-on mini-apps to strengthen vanilla-frontend skills.",
        link: "https://github.com/devvsakib/Frontend-Projects"
    },
    {
        title: "Frontend-Projects Collection (general frontend projects list)",
        description: "A broad set of examples and sample projects around HTML/CSS/JS — a good sandbox of UI components, layouts, small apps and practice code for frontend learning.",
        link: "https://github.com/armanidrisi/frontend-projects"
    },
    {
        title: "Open-source Production Web Projects (Frontend & Web UI heavy)",
        description: "Collection of real-world web applications (many with rich frontends) that are open source and production-ready — useful to inspect well-structured, maintained frontend code in real apps.",
        link: "https://github.com/sdil/open-production-web-projects"
    },
    {
        title: "Awesome Front-End Resources (cheat sheets, best practices, tools)",
        description: "Not a single app — but a curated repository of frontend resources: guides, cheat-sheets, design practices, and tools that help frontend developers stay current and write better UI code.",
        link: "https://github.com/codingknite/frontend-development"
    },
    {
        title: "React & Modern Frontend Open Source Projects",
        description: "A list/collection aimed at modern frontend development with React (and allied tools) — good if you want to study how real React projects structure UI, state management, components and routing.",
        link: "https://github.com/topics/reactjs-projects"
    },
    {
        title: "React Project Ideas & Templates (starter & sample React projects)",
        description: "Collection of multiple React-based frontend projects — helpful to study, fork or build upon if you want to practise or build React-first UIs.",
        link: "https://github.com/topics/react-projects"
    },
    {
        title: "Front-end Web Development Projects (vanilla & framework mix)",
        description: "A broader topic-based grouping of web-projects covering HTML, CSS, JS — some projects use frameworks, some are vanilla — gives flexibility to explore different stacks and frontend techniques.",
        link: "https://github.com/topics/front-end-web-development"
    },
    {
        title: "Front-end Web Development Projects (vanilla & framework mix)",
        description: "A broader topic-based grouping of web-projects covering HTML, CSS, JS — some projects use frameworks, some are vanilla — gives flexibility to explore different stacks and frontend techniques.",
        link: "https://github.com/topics/front-end-web-development"
    },
    {
        title: "Front-end Projects (HTML/CSS/JS collection for UI practice)",
        description: "Another repository grouping basic and intermediate frontend projects — useful if you want to practice UI, layout, responsiveness, and basic scripting without backend complexity.",
        link: "https://github.com/topics/html-css-javascript-project"
    },
    {
        title: "Front-end Projects (general project collection for web-developers)",
        description: "Generic frontend projects collection — good for beginners or intermediate devs to explore simple to medium complexity frontend codebases and boost UI/UX skills.",
        link: "https://github.com/topics/frontend-projects"
    },
    {
        title: "Frontend Development Essentials & Learning Resources",
        description: "A curated list of learning resources, project ideas, guidelines and tools for frontend developers — helpful to guide your learning path as you grow from basics towards advanced front-end development.",
        link: "https://github.com/codingknite/frontend-development"
    }
];

const FrontendDeveloperProjectContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fdProjects.map((project, index) => <ProjectCard key={index} title={project.title} description={project.description} link={project.link} />)}
    </div>
);


const modalContents: { [key: string]: React.ReactNode } = {
    'ba-project-modal': <BusinessAnalystProjectContent />,
    'da-project-modal': <DataAnalystProjectContent />,
    'ds-project-modal': <DataScientistProjectContent />,
    'fa-project-modal': <FinancialAnalystProjectContent />,
    'bi-project-modal': <BusinessIntelligenceProjectContent />,
    'de-project-modal': <DataEngineerProjectContent />,
    'sc-project-modal': <SupplyChainAnalystProjectContent />,
    'jf-project-modal': <JavaFullStackDeveloperProjectContent />,
    'fd-project-modal': <FrontendDeveloperProjectContent />,
};

interface ProjectModalsProps {
    activeModalId: string | null;
    onClose: () => void;
}

const ProjectModals: React.FC<ProjectModalsProps> = ({ activeModalId, onClose }) => {
    return (
        <>
            <div
                id="modal-backdrop"
                onClick={onClose}
                className={`fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 transition-opacity duration-300 ${activeModalId ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                aria-hidden={!activeModalId}
            ></div>

            {projectData.map(modal => (
                <div
                    key={modal.id}
                    id={modal.id}
                    className={`project-modal fixed inset-0 z-[60] p-4 flex items-center justify-center transition-all duration-300 ${activeModalId === modal.id ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`${modal.id}-title`}
                    aria-hidden={activeModalId !== modal.id}
                >
                    <div className="relative w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl p-6 transform">
                        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                            <h3 id={`${modal.id}-title`} className="text-2xl font-semibold text-white">{modal.title}</h3>
                            <button onClick={onClose} aria-label="Close modal" data-modal-close={modal.id} className="text-gray-400 hover:text-white text-3xl">&times;</button>
                        </div>
                        <div id={`${modal.id.replace('-modal', '')}-modal-content`} className="mt-4 text-gray-300 max-h-[70vh] overflow-y-auto">
                            {modalContents[modal.id] || <p>Loading project details...</p>}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProjectModals;

