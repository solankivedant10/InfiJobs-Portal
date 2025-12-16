// Data Scientist Portal - Tutorial Data from GeeksforGeeks

export interface DsTopic {
    id: string;
    title: string;
    icon: string;
    iconBg: string;
    accentColor: string;
    description: string;
    subtopics: { title: string; description?: string }[];
    codeExample?: { title: string; code: string; language: string };
}

export const dataScienceTutorialData: DsTopic[] = [
    {
        id: "what-is-ds",
        title: "What is Data Science?",
        icon: "Microscope",
        iconBg: "bg-purple-500/20 text-purple-400",
        accentColor: "purple",
        description: "Data Science is an interdisciplinary field that uses scientific methods, algorithms, and systems to extract insights from structured and unstructured data to inform decision-making.",
        subtopics: [
            { title: "Data Collection", description: "Gathering raw data from various sources" },
            { title: "Data Cleaning", description: "Ensuring data is accurate and complete" },
            { title: "Data Analysis", description: "Applying statistical methods to identify patterns" },
            { title: "Data Visualization", description: "Creating charts and dashboards" },
            { title: "Decision-Making", description: "Using insights to inform strategies" }
        ],
        codeExample: {
            title: "Data Science Workflow",
            language: "python",
            code: "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\n# 1. Data Collection\ndf = pd.read_csv('customer_data.csv')\n\n# 2. Data Cleaning\ndf = df.dropna()\ndf = df.drop_duplicates()\n\n# 3. Feature Engineering\nX = df.drop('target', axis=1)\ny = df['target']\n\n# 4. Model Training\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = RandomForestClassifier()\nmodel.fit(X_train, y_train)\n\n# 5. Prediction\naccuracy = model.score(X_test, y_test)\nprint(f'Model Accuracy: {accuracy:.2%}')"
        }
    },
    {
        id: "ds-importance",
        title: "Why Data Science is Important",
        icon: "TrendingUp",
        iconBg: "bg-emerald-500/20 text-emerald-400",
        accentColor: "emerald",
        description: "Data Science helps businesses make informed decisions, improve efficiency, personalize experiences, predict future trends, and drive innovation across industries.",
        subtopics: [
            { title: "Helps Business in Decision-Making", description: "Analyze trends and make informed choices" },
            { title: "Improves Efficiency", description: "Identify areas to save time and resources" },
            { title: "Personalizes Experiences", description: "Create customized recommendations" },
            { title: "Predicts the Future", description: "Forecast trends and demand" },
            { title: "Drives Innovation", description: "New ideas from data insights" },
            { title: "Benefits Society", description: "Improve healthcare, education, transportation" }
        ],
        codeExample: {
            title: "Business Impact Analysis",
            language: "python",
            code: "import pandas as pd\nimport matplotlib.pyplot as plt\n\n# Analyze business impact of data-driven decisions\ndf = pd.read_csv('business_metrics.csv')\n\n# Before vs After Data Science implementation\nbefore = df[df['period'] == 'before']['revenue'].mean()\nafter = df[df['period'] == 'after']['revenue'].mean()\n\nimprovement = ((after - before) / before) * 100\nprint(f'Revenue improved by {improvement:.1f}%')\n\n# Visualize\nplt.bar(['Before DS', 'After DS'], [before, after])\nplt.title('Business Impact of Data Science')\nplt.ylabel('Revenue')\nplt.show()"
        }
    },
    {
        id: "ds-applications",
        title: "Real-Life Applications of Data Science",
        icon: "Globe",
        iconBg: "bg-cyan-500/20 text-cyan-400",
        accentColor: "cyan",
        description: "Data Science is applied across industries: E-Commerce recommendations, streaming platforms, banking fraud detection, healthcare diagnostics, ride-sharing, and social media analytics.",
        subtopics: [
            { title: "E-Commerce", description: "Recommender systems for product suggestions" },
            { title: "Streaming Platforms", description: "ML models for content recommendations" },
            { title: "Banking and Finance", description: "Fraud detection using anomaly detection" },
            { title: "Healthcare Diagnostics", description: "Predictive models for disease detection" },
            { title: "Ride-Sharing", description: "Fare estimation and route optimization" },
            { title: "Social Media", description: "Sentiment analysis for brand monitoring" }
        ],
        codeExample: {
            title: "Fraud Detection Example",
            language: "python",
            code: "from sklearn.ensemble import IsolationForest\nimport pandas as pd\n\n# Load transaction data\ntransactions = pd.read_csv('transactions.csv')\n\n# Features for fraud detection\nfeatures = ['amount', 'hour', 'day_of_week', 'location_score']\nX = transactions[features]\n\n# Train Isolation Forest for anomaly detection\nmodel = IsolationForest(contamination=0.01, random_state=42)\ntransactions['is_fraud'] = model.fit_predict(X)\n\n# Flag suspicious transactions (-1 = anomaly)\nfraud_cases = transactions[transactions['is_fraud'] == -1]\nprint(f'Flagged {len(fraud_cases)} suspicious transactions')"
        }
    },
    {
        id: "ds-skills",
        title: "Essential Data Science Skills",
        icon: "Wrench",
        iconBg: "bg-amber-500/20 text-amber-400",
        accentColor: "amber",
        description: "Key skills for data science: Programming (Python, R, SQL), Statistics & Mathematics, Machine Learning, Data Visualization, Data Wrangling, Big Data Tools, and Critical Thinking.",
        subtopics: [
            { title: "Programming", description: "Python, R, SQL proficiency" },
            { title: "Statistics and Mathematics", description: "Linear algebra, probability, statistics" },
            { title: "Machine Learning", description: "Algorithms and frameworks" },
            { title: "Data Visualization", description: "Tableau, Power BI, Matplotlib" },
            { title: "Data Wrangling", description: "Cleaning and transforming data" },
            { title: "Big Data Tools", description: "Hadoop, Spark, cloud platforms" },
            { title: "Critical Thinking", description: "Problem-solving and analysis" },
            { title: "Communication", description: "Explaining findings to stakeholders" }
        ],
        codeExample: {
            title: "Complete Data Science Pipeline",
            language: "python",
            code: "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.ensemble import GradientBoostingClassifier\n\n# Programming: Load and explore data\ndf = pd.read_csv('data.csv')\nprint(df.describe())\n\n# Statistics: Check distributions\nprint(df.skew())\n\n# Data Wrangling: Clean and prepare\ndf = df.fillna(df.mean())\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(df.drop('target', axis=1))\n\n# Machine Learning: Train and validate\nmodel = GradientBoostingClassifier()\nscores = cross_val_score(model, X_scaled, df['target'], cv=5)\nprint(f'CV Score: {scores.mean():.3f} (+/- {scores.std():.3f})')"
        }
    },
    {
        id: "ds-career",
        title: "Excel in Data Science Career",
        icon: "Rocket",
        iconBg: "bg-rose-500/20 text-rose-400",
        accentColor: "rose",
        description: "Build a successful data science career: Learn programming, build strong foundations, start with ML, develop visualization skills, gain practical experience, and stay updated with trends.",
        subtopics: [
            { title: "Learn Programming Skills", description: "Master Python and R" },
            { title: "Build a Strong Foundation", description: "Study statistics and data structures" },
            { title: "Start Machine Learning", description: "Learn algorithms and frameworks" },
            { title: "Data Visualization Skills", description: "Use Tableau or Power BI" },
            { title: "Gain Practical Experience", description: "Work on projects and internships" },
            { title: "NLP and Deep Learning", description: "Advanced techniques" },
            { title: "Learn Big Data Tools", description: "Hadoop, Spark, cloud computing" },
            { title: "Network and Collaborate", description: "Join communities and meetups" }
        ],
        codeExample: {
            title: "Portfolio Project Example",
            language: "python",
            code: "# Customer Churn Prediction Project\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report\nimport joblib\n\n# Load and prepare data\ndf = pd.read_csv('customer_churn.csv')\nX = pd.get_dummies(df.drop(['customer_id', 'churned'], axis=1))\ny = df['churned']\n\n# Train model\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\n\n# Evaluate\nprint(classification_report(y_test, model.predict(X_test)))\n\n# Save model for deployment\njoblib.dump(model, 'churn_model.pkl')"
        }
    },
    {
        id: "ds-jobs",
        title: "Jobs and Career in Data Science",
        icon: "Briefcase",
        iconBg: "bg-blue-500/20 text-blue-400",
        accentColor: "blue",
        description: "Key data science roles: Data Scientist, Data Analyst, Machine Learning Engineer, Data Engineer, Business Intelligence Analyst, and Data Architect.",
        subtopics: [
            { title: "Data Scientist", description: "Analyze datasets, develop ML models, provide insights" },
            { title: "Data Analyst", description: "Collect, clean, analyze data, create reports" },
            { title: "Machine Learning Engineer", description: "Build and deploy ML models at scale" },
            { title: "Data Engineer", description: "Design data pipelines, ensure data quality" },
            { title: "Business Intelligence Analyst", description: "Design BI reports and dashboards" },
            { title: "Data Architect", description: "Design data systems and governance policies" }
        ],
        codeExample: {
            title: "Data Scientist Daily Tasks",
            language: "python",
            code: "# Typical Data Scientist workflow\nimport pandas as pd\nimport seaborn as sns\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.ensemble import RandomForestRegressor\n\n# Morning: Exploratory Data Analysis\ndf = pd.read_csv('sales_data.csv')\nprint(df.info())\nprint(df.describe())\n\n# Visualize relationships\nsns.pairplot(df[['price', 'quantity', 'revenue']])\n\n# Afternoon: Model Development\nparam_grid = {'n_estimators': [50, 100], 'max_depth': [5, 10]}\nmodel = GridSearchCV(RandomForestRegressor(), param_grid, cv=5)\nmodel.fit(X_train, y_train)\n\nprint(f'Best params: {model.best_params_}')\nprint(f'Best score: {model.best_score_:.3f}')"
        }
    },
    {
        id: "python-for-ds",
        title: "Python for Data Science",
        icon: "Code",
        iconBg: "bg-indigo-500/20 text-indigo-400",
        accentColor: "indigo",
        description: "Python is the most popular language for data science. Learn essential libraries: NumPy for numerical computing, Pandas for data manipulation, and Scikit-learn for machine learning.",
        subtopics: [
            { title: "NumPy", description: "Numerical computing and arrays" },
            { title: "Pandas", description: "Data manipulation and analysis" },
            { title: "Matplotlib/Seaborn", description: "Data visualization" },
            { title: "Scikit-learn", description: "Machine learning library" },
            { title: "TensorFlow/PyTorch", description: "Deep learning frameworks" },
            { title: "Jupyter Notebooks", description: "Interactive development" }
        ],
        codeExample: {
            title: "Python Data Science Stack",
            language: "python",
            code: "import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nfrom sklearn.linear_model import LinearRegression\n\n# NumPy: Fast numerical operations\narr = np.random.randn(1000)\nprint(f'Mean: {np.mean(arr):.4f}')\n\n# Pandas: Data manipulation\ndf = pd.DataFrame({'x': range(100), 'y': np.random.randn(100)})\ndf['y_cumsum'] = df['y'].cumsum()\n\n# Matplotlib: Visualization\nfig, axes = plt.subplots(1, 2, figsize=(12, 4))\naxes[0].hist(arr, bins=30, edgecolor='black')\naxes[1].plot(df['y_cumsum'])\nplt.tight_layout()\n\n# Scikit-learn: Machine Learning\nmodel = LinearRegression().fit(df[['x']], df['y'])\nprint(f'Coefficient: {model.coef_[0]:.4f}')"
        }
    },
    {
        id: "statistics-ds",
        title: "Statistics for Data Science",
        icon: "Calculator",
        iconBg: "bg-teal-500/20 text-teal-400",
        accentColor: "teal",
        description: "Statistics is the foundation of data science. Learn descriptive statistics, probability distributions, hypothesis testing, and statistical inference for data analysis.",
        subtopics: [
            { title: "Descriptive Statistics", description: "Mean, median, mode, variance" },
            { title: "Probability Distributions", description: "Normal, binomial, Poisson" },
            { title: "Hypothesis Testing", description: "T-tests, chi-square tests" },
            { title: "Correlation and Regression", description: "Relationship analysis" },
            { title: "Confidence Intervals", description: "Parameter estimation" },
            { title: "Bayesian Statistics", description: "Probabilistic inference" }
        ],
        codeExample: {
            title: "Statistical Analysis",
            language: "python",
            code: "import numpy as np\nfrom scipy import stats\nimport pandas as pd\n\n# Generate sample data\nnp.random.seed(42)\ngroup_a = np.random.normal(100, 15, 50)\ngroup_b = np.random.normal(105, 15, 50)\n\n# Descriptive statistics\nprint(f'Group A: mean={np.mean(group_a):.2f}, std={np.std(group_a):.2f}')\nprint(f'Group B: mean={np.mean(group_b):.2f}, std={np.std(group_b):.2f}')\n\n# Hypothesis test (t-test)\nt_stat, p_value = stats.ttest_ind(group_a, group_b)\nprint(f'T-statistic: {t_stat:.4f}')\nprint(f'P-value: {p_value:.4f}')\nprint('Significant difference' if p_value < 0.05 else 'No significant difference')\n\n# Correlation\ncorr, _ = stats.pearsonr(group_a, group_b[:50])\nprint(f'Correlation: {corr:.4f}')"
        }
    },
    {
        id: "ml-for-ds",
        title: "Machine Learning Fundamentals",
        icon: "Brain",
        iconBg: "bg-orange-500/20 text-orange-400",
        accentColor: "orange",
        description: "Machine Learning is core to data science. Learn supervised learning (classification, regression), unsupervised learning (clustering), and model evaluation techniques.",
        subtopics: [
            { title: "Supervised Learning", description: "Classification and regression" },
            { title: "Unsupervised Learning", description: "Clustering and dimensionality reduction" },
            { title: "Model Selection", description: "Cross-validation and hyperparameter tuning" },
            { title: "Feature Engineering", description: "Creating meaningful features" },
            { title: "Model Evaluation", description: "Accuracy, precision, recall, F1" },
            { title: "Ensemble Methods", description: "Random Forest, Gradient Boosting" }
        ],
        codeExample: {
            title: "Complete ML Pipeline",
            language: "python",
            code: "from sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report, confusion_matrix\nimport pandas as pd\n\n# Load data\ndf = pd.read_csv('data.csv')\nX = df.drop('target', axis=1)\ny = df['target']\n\n# Create pipeline\npipeline = Pipeline([\n    ('scaler', StandardScaler()),\n    ('classifier', RandomForestClassifier(n_estimators=100))\n])\n\n# Cross-validation\nscores = cross_val_score(pipeline, X, y, cv=5, scoring='accuracy')\nprint(f'CV Accuracy: {scores.mean():.3f} (+/- {scores.std():.3f})')\n\n# Train and evaluate\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\npipeline.fit(X_train, y_train)\nprint(classification_report(y_test, pipeline.predict(X_test)))"
        }
    }
];
