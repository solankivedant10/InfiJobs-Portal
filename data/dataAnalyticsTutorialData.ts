// Data Analytics Portal Tutorial Data - Comprehensive curriculum from GeeksforGeeks

export interface DaTopic {
    id: string;
    title: string;
    icon: string;
    iconBg: string;
    accentColor: string;
    description: string;
    subtopics: { title: string; description?: string }[];
    codeExample?: { title: string; code: string; language: string };
}

export const dataAnalyticsTutorialData: DaTopic[] = [
    {
        id: "tools-skills",
        title: "Tools & Skills for Data Analytics",
        icon: "Wrench",
        iconBg: "bg-emerald-500/20 text-emerald-400",
        accentColor: "emerald",
        description: "Build strong foundations with essential data analysis tools. Master the key technologies that every data analyst needs to know.",
        subtopics: [
            { title: "Python For Data Analytics", description: "The most popular programming language for data analysis" },
            { title: "SQL For Data Analytics", description: "Query and manipulate databases efficiently" },
            { title: "Excel for Data Analytics", description: "Spreadsheet analysis and pivot tables" },
            { title: "Power BI / Tableau", description: "Business intelligence and dashboard creation" },
            { title: "Mathematics & Statistics for Data Analysis", description: "The mathematical foundation for insights" }
        ],
        codeExample: {
            title: "Python: Quick Data Analysis",
            language: "python",
            code: "import pandas as pd\nimport numpy as np\n\n# Load your data\ndf = pd.read_csv('sales_data.csv')\n\n# Quick overview\nprint(df.head())\nprint(df.describe())\nprint(df.info())\n\n# Basic statistics\nprint(f'Mean: {df[\"revenue\"].mean()}')\nprint(f'Median: {df[\"revenue\"].median()}')"
        }
    },
    {
        id: "libraries",
        title: "Data Analysis Libraries",
        icon: "Library",
        iconBg: "bg-cyan-500/20 text-cyan-400",
        accentColor: "cyan",
        description: "Gain hands-on experience with powerful Python libraries. These are the essential tools for data manipulation, analysis, and visualization.",
        subtopics: [
            { title: "Pandas", description: "Data manipulation and analysis" },
            { title: "NumPy", description: "Numerical operations and matrix handling" },
            { title: "Matplotlib / Seaborn", description: "Data visualization" },
            { title: "Scikit-learn", description: "Data preprocessing and statistical modeling" }
        ],
        codeExample: {
            title: "Essential Library Imports",
            language: "python",
            code: "import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nfrom sklearn.preprocessing import StandardScaler\n\n# Pandas - Data manipulation\ndf = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})\n\n# NumPy - Numerical operations\narr = np.array([1, 2, 3, 4, 5])\nprint(f'Mean: {np.mean(arr)}, Std: {np.std(arr)}')\n\n# Matplotlib - Visualization\nplt.plot(arr)\nplt.title('Simple Line Plot')\nplt.show()"
        }
    },
    {
        id: "understanding-data",
        title: "Understanding the Data",
        icon: "Database",
        iconBg: "bg-purple-500/20 text-purple-400",
        accentColor: "purple",
        description: "Learn to identify data types and structures before analysis. Understanding your data is crucial for choosing the right analysis methods.",
        subtopics: [
            { title: "What is Data?", description: "Raw facts and figures that need processing" },
            { title: "Sample vs Population", description: "Understanding statistical sampling" },
            { title: "Qualitative vs Quantitative Data", description: "Categorical vs numerical data" },
            { title: "Univariate vs Multivariate Data", description: "Single vs multiple variable analysis" },
            { title: "Nominal, Ordinal, Interval and Ratio Scales", description: "Levels of measurement" }
        ],
        codeExample: {
            title: "Exploring Data Types in Pandas",
            language: "python",
            code: "import pandas as pd\n\n# Load dataset\ndf = pd.read_csv('data.csv')\n\n# Check data types\nprint(df.dtypes)\n\n# Identify categorical vs numerical\ncategorical_cols = df.select_dtypes(include=['object']).columns\nnumerical_cols = df.select_dtypes(include=['int64', 'float64']).columns\n\nprint(f'Categorical: {list(categorical_cols)}')\nprint(f'Numerical: {list(numerical_cols)}')\n\n# Value counts for categorical\nfor col in categorical_cols:\n    print(f'{col}:\\n{df[col].value_counts()}')"
        }
    },
    {
        id: "loading-datasets",
        title: "Reading and Loading Datasets",
        icon: "FileInput",
        iconBg: "bg-orange-500/20 text-orange-400",
        accentColor: "orange",
        description: "Import data from various file formats into your environment. The first step in any data analysis project is getting your data loaded correctly.",
        subtopics: [
            { title: "Reading CSV, Excel and JSON files", description: "Load data from common file formats" },
            { title: "Exporting dataframes to CSV/JSON", description: "Save your processed data" },
            { title: "Slicing, Indexing, Manipulating DataFrames", description: "Navigate and modify your data" }
        ],
        codeExample: {
            title: "Loading Different File Formats",
            language: "python",
            code: "import pandas as pd\n\n# Read CSV\ndf_csv = pd.read_csv('data.csv')\n\n# Read Excel\ndf_excel = pd.read_excel('data.xlsx', sheet_name='Sheet1')\n\n# Read JSON\ndf_json = pd.read_json('data.json')\n\n# Slicing and Indexing\nprint(df_csv.head(10))        # First 10 rows\nprint(df_csv['column_name'])  # Single column\nprint(df_csv.iloc[0:5, 0:3])  # Rows 0-4, Cols 0-2\n\n# Export to CSV\ndf_csv.to_csv('output.csv', index=False)"
        }
    },
    {
        id: "preprocessing",
        title: "Data Preprocessing",
        icon: "Filter",
        iconBg: "bg-rose-500/20 text-rose-400",
        accentColor: "rose",
        description: "Clean and transform raw data into a usable format. This critical step ensures your analysis is based on quality data.",
        subtopics: [
            { title: "Data Preprocessing Fundamentals", description: "Core concepts and techniques" },
            { title: "What is Data Cleaning?", description: "Removing errors and inconsistencies" },
            { title: "Handling Missing Data", description: "Strategies for null values" },
            { title: "Handling Outliers", description: "Detect and manage extreme values" },
            { title: "Data Transformation", description: "Normalize and standardize data" },
            { title: "Feature Engineering", description: "Create meaningful features" },
            { title: "Data Sampling", description: "Select representative subsets" }
        ],
        codeExample: {
            title: "Complete Preprocessing Pipeline",
            language: "python",
            code: "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\n\ndf = pd.read_csv('raw_data.csv')\n\n# Handle missing values\ndf['numeric_col'].fillna(df['numeric_col'].mean(), inplace=True)\ndf['category_col'].fillna('Unknown', inplace=True)\n\n# Remove duplicates\ndf.drop_duplicates(inplace=True)\n\n# Handle outliers using IQR\nQ1 = df['value'].quantile(0.25)\nQ3 = df['value'].quantile(0.75)\nIQR = Q3 - Q1\ndf = df[(df['value'] >= Q1 - 1.5*IQR) & (df['value'] <= Q3 + 1.5*IQR)]\n\n# Standardize numerical features\nscaler = StandardScaler()\ndf[['col1', 'col2']] = scaler.fit_transform(df[['col1', 'col2']])"
        }
    },
    {
        id: "eda",
        title: "Exploratory Data Analysis (EDA)",
        icon: "Search",
        iconBg: "bg-indigo-500/20 text-indigo-400",
        accentColor: "indigo",
        description: "Analyze data through statistical summaries and visualizations. EDA helps you understand patterns, relationships, and anomalies in your data.",
        subtopics: [
            { title: "Exploratory Data Analysis in Python", description: "Systematic approach to understanding data" },
            { title: "Measures of Central Tendency", description: "Mean, median, mode" },
            { title: "Measures of Spread & IQR", description: "Variance, standard deviation, range" },
            { title: "Skewness & Kurtosis", description: "Distribution shape analysis" },
            { title: "Histograms, Boxplots, Q-Q plots", description: "Visual distribution analysis" },
            { title: "Correlation and Covariance", description: "Relationship between variables" },
            { title: "Cross-tabulation", description: "Categorical variable relationships" },
            { title: "Cluster Analysis", description: "Group similar data points" }
        ],
        codeExample: {
            title: "Complete EDA Workflow",
            language: "python",
            code: "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv('data.csv')\n\n# Summary statistics\nprint(df.describe())\n\n# Central tendency\nprint(f'Mean: {df[\"col\"].mean()}')\nprint(f'Median: {df[\"col\"].median()}')\nprint(f'Mode: {df[\"col\"].mode()[0]}')\n\n# Distribution visualization\nfig, axes = plt.subplots(1, 3, figsize=(15, 5))\nsns.histplot(df['col'], ax=axes[0], kde=True)\nsns.boxplot(x=df['col'], ax=axes[1])\nsns.violinplot(x=df['col'], ax=axes[2])\nplt.tight_layout()\nplt.show()\n\n# Correlation matrix\ncorr = df.corr()\nsns.heatmap(corr, annot=True, cmap='coolwarm')"
        }
    },
    {
        id: "visualization",
        title: "Data Visualization",
        icon: "BarChart3",
        iconBg: "bg-blue-500/20 text-blue-400",
        accentColor: "blue",
        description: "Use graphical representations to understand and interpret complex data. Good visualizations tell a story and drive insights.",
        subtopics: [
            { title: "What is Data Visualization?", description: "Importance of visual data representation" },
            { title: "Visualization with Matplotlib", description: "Python's foundational plotting library" },
            { title: "Visualization using Seaborn", description: "Statistical data visualization" },
            { title: "Visualization using Plotly", description: "Interactive charts and dashboards" },
            { title: "PowerBI and Tableau", description: "Business intelligence tools" }
        ],
        codeExample: {
            title: "Creating Impactful Visualizations",
            language: "python",
            code: "import matplotlib.pyplot as plt\nimport seaborn as sns\nimport plotly.express as px\n\n# Matplotlib - Basic plots\nfig, ax = plt.subplots(figsize=(10, 6))\nax.bar(['A', 'B', 'C'], [10, 20, 15], color='steelblue')\nax.set_title('Sales by Category')\nplt.show()\n\n# Seaborn - Statistical plots\nsns.set_theme(style='darkgrid')\nsns.scatterplot(data=df, x='revenue', y='profit', hue='category')\nplt.title('Revenue vs Profit')\nplt.show()\n\n# Plotly - Interactive\nfig = px.scatter(df, x='x', y='y', color='category',\n                 title='Interactive Scatter Plot')\nfig.show()"
        }
    },
    {
        id: "statistics",
        title: "Probability & Statistics",
        icon: "Calculator",
        iconBg: "bg-amber-500/20 text-amber-400",
        accentColor: "amber",
        description: "Understand data, find patterns and make smart decisions. Probability and statistics are the mathematical foundation of data analysis.",
        subtopics: [
            { title: "Probability Distributions", description: "Normal, binomial, Poisson distributions" },
            { title: "Central Limit Theorem", description: "Foundation of statistical inference" },
            { title: "PDF vs CDF", description: "Probability and cumulative functions" },
            { title: "Confidence Intervals", description: "Estimate population parameters" },
            { title: "Z-score & T-distribution", description: "Standardized measures" },
            { title: "P-Values & Hypothesis Testing", description: "Statistical significance" },
            { title: "One-Tailed vs Two-Tailed Tests", description: "Directional hypothesis testing" },
            { title: "Chi-Squared Tests", description: "Categorical data analysis" },
            { title: "Point Estimation", description: "Single value estimates" }
        ],
        codeExample: {
            title: "Statistical Analysis in Python",
            language: "python",
            code: "import numpy as np\nfrom scipy import stats\n\ndata = np.random.normal(100, 15, 1000)\n\n# Descriptive statistics\nprint(f'Mean: {np.mean(data):.2f}')\nprint(f'Std: {np.std(data):.2f}')\n\n# Z-score\nz_scores = stats.zscore(data)\n\n# Confidence interval (95%)\nci = stats.t.interval(0.95, len(data)-1, \n                      loc=np.mean(data), \n                      scale=stats.sem(data))\nprint(f'95% CI: {ci}')\n\n# Hypothesis test (t-test)\nt_stat, p_value = stats.ttest_1samp(data, 100)\nprint(f'T-statistic: {t_stat:.4f}, P-value: {p_value:.4f}')\nprint('Reject H0' if p_value < 0.05 else 'Fail to reject H0')"
        }
    },
    {
        id: "time-series",
        title: "Time Series Data Analysis",
        icon: "Clock",
        iconBg: "bg-violet-500/20 text-violet-400",
        accentColor: "violet",
        description: "Study data points collected over time to find patterns, trends, and seasonal changes. Essential for forecasting and decision-making.",
        subtopics: [
            { title: "Define Time Series Data", description: "Understanding temporal data" },
            { title: "Date and Time functions in Python", description: "Working with datetime objects" },
            { title: "Time Series Data Plotting", description: "Visualizing temporal patterns" },
            { title: "Deal with missing values in Time Series", description: "Interpolation and filling strategies" },
            { title: "Moving Averages", description: "Smoothing techniques" },
            { title: "Stationarity, Seasonality, Trend", description: "Time series components" },
            { title: "Augmented Dickey-Fuller Test", description: "Test for stationarity" },
            { title: "Autocorrelation", description: "Correlation with lagged values" }
        ],
        codeExample: {
            title: "Time Series Analysis Pipeline",
            language: "python",
            code: "import pandas as pd\nimport matplotlib.pyplot as plt\nfrom statsmodels.tsa.seasonal import seasonal_decompose\nfrom statsmodels.tsa.stattools import adfuller\n\n# Load time series data\ndf = pd.read_csv('timeseries.csv', parse_dates=['date'], index_col='date')\n\n# Moving average\ndf['MA_7'] = df['value'].rolling(window=7).mean()\ndf['MA_30'] = df['value'].rolling(window=30).mean()\n\n# Decomposition\nresult = seasonal_decompose(df['value'], model='additive', period=30)\nresult.plot()\nplt.show()\n\n# Stationarity test (ADF)\nadf_result = adfuller(df['value'].dropna())\nprint(f'ADF Statistic: {adf_result[0]:.4f}')\nprint(f'P-value: {adf_result[1]:.4f}')\nprint('Stationary' if adf_result[1] < 0.05 else 'Non-stationary')"
        }
    }
];
