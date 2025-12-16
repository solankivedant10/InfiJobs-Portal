// ML Portal Tutorial Data - Comprehensive educational content for multiple data roles

export interface RoleScenario {
  role: string;
  icon: string;
  scenario: string;
  benefit: string;
}

export interface MlTopic {
  id: string;
  title: string;
  icon: string;
  iconBg: string;
  description: string;
  highlightWords?: string[];
  alert?: { type: 'warning' | 'info'; message: string };
  table?: { title?: string; headers: string[]; rows: string[][] };
  codeExample?: { title: string; code: string; language: string };
  pipeline?: boolean;
  benefits?: { icon: string; iconColor: string; title: string; subtitle: string }[];
  examples?: { icon: string; text: string }[];
  infoBoxes?: { title: string; icon: string; items: string[] }[];
  roleScenarios?: RoleScenario[];
}

export const mlTutorialData: MlTopic[] = [
  {
    id: "what-is-ml",
    title: "What is Machine Learning?",
    icon: "Brain",
    iconBg: "bg-emerald-500/20 text-emerald-400",
    description: "Machine Learning is not magic. It is simply a system that learns patterns from data to make predictions or decisions without being explicitly programmed for every rule.",
    highlightWords: ["not magic", "learns patterns", "predictions"],
    roleScenarios: [
      {
        role: "Business Analyst",
        icon: "Briefcase",
        scenario: "Predicting Customer Churn",
        benefit: "Identify at-risk customers before they leave, enabling proactive retention strategies."
      },
      {
        role: "Financial Analyst",
        icon: "TrendingUp",
        scenario: "Stock Price Forecasting",
        benefit: "Automate technical analysis using historical price trends and market indicators."
      },
      {
        role: "Data Engineer",
        icon: "Server",
        scenario: "Automated Data Quality Checks",
        benefit: "Detect anomalies in data pipelines automatically without manual monitoring."
      },
      {
        role: "Data Analyst",
        icon: "BarChart2",
        scenario: "Pattern Discovery in Sales Data",
        benefit: "Uncover hidden trends and correlations that drive business decisions."
      }
    ]
  },
  {
    id: "ml-pipeline",
    title: "The ML Pipeline",
    icon: "Layers",
    iconBg: "bg-blue-500/20 text-blue-400",
    description: "Every ML system follows the same pipeline. Always. This infrastructure is critical for scalability and reproducibility.",
    highlightWords: ["same pipeline", "Always"],
    pipeline: true,
    infoBoxes: [
      {
        title: "Data Sources",
        icon: "Database",
        items: [
          "Excel / CSV files",
          "Databases (SQL, NoSQL)",
          "APIs & Web scraping",
          "IoT sensors & Logs",
          "Images & Documents"
        ]
      },
      {
        title: "Problem Types",
        icon: "Target",
        items: [
          "Regression – Predict numbers",
          "Classification – Yes/No categories",
          "Clustering – Group similar items",
          "Time Series – Sequential data"
        ]
      }
    ],
    roleScenarios: [
      {
        role: "Data Engineer",
        icon: "Database",
        scenario: "Building ETL Pipelines",
        benefit: "Ensure data flows reliably from raw sources to the model with proper transformations."
      },
      {
        role: "BI Analyst",
        icon: "PieChart",
        scenario: "Dashboard Integration",
        benefit: "Visualize model outputs directly in PowerBI/Tableau for stakeholder reporting."
      },
      {
        role: "MLOps Engineer",
        icon: "GitBranch",
        scenario: "CI/CD for Models",
        benefit: "Automate model training, testing, and deployment with version control."
      }
    ]
  },
  {
    id: "data-cleaning",
    title: "Data Cleaning (Most Important!)",
    icon: "Sparkles",
    iconBg: "bg-teal-500/20 text-teal-400",
    description: "Without clean data → your model becomes useless. This step often takes 80% of the work!",
    highlightWords: ["80% of the work"],
    alert: {
      type: "warning",
      message: "Without clean data → your model becomes useless. This step often takes 80% of the work!"
    },
    table: {
      title: "Common data problems and their solutions",
      headers: ["Problem", "Solution"],
      rows: [
        ["Missing values", "mean(), median(), dropna()"],
        ["Duplicates", "drop_duplicates()"],
        ["Outliers", "IQR / Z-score filtering"],
        ["Wrong data types", "astype()"],
        ["Inconsistent text", "lower(), strip()"],
        ["Different scales", "Normalization / Standardization"]
      ]
    },
    codeExample: {
      title: "Data Cleaning Example",
      language: "python",
      code: "import pandas as pd\n\n# Load financial records\ndf = pd.read_csv('revenue.csv')\n\n# Fill missing quarterly revenue with forward fill\ndf['revenue'] = df['revenue'].fillna(method='ffill')\n\n# Remove duplicate transactions\ndf.drop_duplicates(subset=['transaction_id'], inplace=True)\n\n# Standardize text columns\ndf['category'] = df['category'].str.lower().str.strip()\n\n# Handle outliers using IQR\nQ1 = df['amount'].quantile(0.25)\nQ3 = df['amount'].quantile(0.75)\nIQR = Q3 - Q1\ndf = df[(df['amount'] >= Q1 - 1.5*IQR) & (df['amount'] <= Q3 + 1.5*IQR)]"
    },
    roleScenarios: [
      {
        role: "Data Analyst",
        icon: "FileSearch",
        scenario: "Survey Data Cleanup",
        benefit: "Handle missing responses and standardize free-text answers for analysis."
      },
      {
        role: "Financial Analyst",
        icon: "DollarSign",
        scenario: "Financial Report Validation",
        benefit: "Detect and fix data entry errors that could skew quarterly reports."
      }
    ]
  },
  {
    id: "feature-engineering",
    title: "Feature Engineering",
    icon: "Wrench",
    iconBg: "bg-amber-500/20 text-amber-400",
    description: "Transform raw data into meaningful features that help the model learn better. This is where domain expertise shines.",
    highlightWords: ["meaningful features", "domain expertise"],
    table: {
      title: "Common Feature Engineering Techniques",
      headers: ["Technique", "Description", "Example"],
      rows: [
        ["One-Hot Encoding", "Convert categories to binary columns", "Color → is_red, is_blue, is_green"],
        ["Binning", "Group continuous values into ranges", "Age → Young, Middle, Senior"],
        ["Log Transform", "Reduce skewness in distributions", "log(income) for salary data"],
        ["Date Features", "Extract components from dates", "date → day_of_week, month, is_weekend"],
        ["Interaction Features", "Combine existing features", "price_per_sqft = price / area"],
        ["Aggregations", "Summarize grouped data", "customer_avg_purchase, total_orders"]
      ]
    },
    codeExample: {
      title: "Feature Engineering for Customer Data",
      language: "python",
      code: "import pandas as pd\nfrom sklearn.preprocessing import LabelEncoder\n\n# Create derived features\ndf['account_age_days'] = (pd.Timestamp.now() - df['signup_date']).dt.days\ndf['orders_per_month'] = df['total_orders'] / (df['account_age_days'] / 30)\n\n# Extract date components\ndf['signup_month'] = df['signup_date'].dt.month\ndf['signup_dayofweek'] = df['signup_date'].dt.dayofweek\ndf['is_weekend_signup'] = df['signup_dayofweek'].isin([5, 6]).astype(int)\n\n# One-hot encode categorical variables\ndf = pd.get_dummies(df, columns=['category', 'region'], drop_first=True)\n\n# Create interaction features\ndf['revenue_per_order'] = df['total_revenue'] / df['total_orders']"
    },
    roleScenarios: [
      {
        role: "Business Analyst",
        icon: "Calculator",
        scenario: "Customer Lifetime Value",
        benefit: "Create features that capture purchasing patterns and predict future value."
      },
      {
        role: "Financial Analyst",
        icon: "LineChart",
        scenario: "Technical Indicators",
        benefit: "Engineer features like RSI, MACD, and Bollinger Bands from price data."
      },
      {
        role: "Data Engineer",
        icon: "Layers",
        scenario: "Feature Store Management",
        benefit: "Build reusable feature pipelines that serve multiple ML models."
      }
    ]
  },
  {
    id: "train-test-split",
    title: "Train/Test Split",
    icon: "Scissors",
    iconBg: "bg-orange-500/20 text-orange-400",
    description: "Never test on data you trained on! Split your data to evaluate model performance honestly.",
    highlightWords: ["Never test on data you trained on"],
    alert: {
      type: "info",
      message: "Typical split: 80% training, 20% testing. For time series: always use chronological splits!"
    },
    table: {
      title: "Split Strategies",
      headers: ["Strategy", "Use Case", "Ratio"],
      rows: [
        ["Simple Split", "General ML tasks", "80/20 or 70/30"],
        ["K-Fold Cross Validation", "Small datasets", "5 or 10 folds"],
        ["Stratified Split", "Imbalanced classes", "Preserves class ratios"],
        ["Time Series Split", "Sequential data", "Train on past, test on future"],
        ["Group Split", "Grouped observations", "Keep groups together"]
      ]
    },
    codeExample: {
      title: "Proper Train/Test Split",
      language: "python",
      code: "from sklearn.model_selection import train_test_split, TimeSeriesSplit\n\n# Simple random split (80/20)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# Stratified split (for imbalanced data)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42\n)\n\n# Time series split (for financial/sequential data)\ntscv = TimeSeriesSplit(n_splits=5)\nfor train_idx, test_idx in tscv.split(X):\n    X_train, X_test = X[train_idx], X[test_idx]\n    y_train, y_test = y[train_idx], y[test_idx]"
    },
    roleScenarios: [
      {
        role: "Data Scientist",
        icon: "FlaskConical",
        scenario: "Experiment Design",
        benefit: "Ensure unbiased model evaluation with proper holdout sets."
      },
      {
        role: "Financial Analyst",
        icon: "Calendar",
        scenario: "Backtesting Strategies",
        benefit: "Validate trading models on out-of-sample historical periods."
      }
    ]
  },
  {
    id: "regression-models",
    title: "Regression Models",
    icon: "TrendingUp",
    iconBg: "bg-cyan-500/20 text-cyan-400",
    description: "Predicting continuous numbers like price, sales, temperature, or any numeric value.",
    highlightWords: ["continuous numbers"],
    table: {
      title: "Popular Regression Models",
      headers: ["Model", "Best For", "Complexity"],
      rows: [
        ["Linear Regression", "Simple relationships, interpretability", "Low"],
        ["Ridge / Lasso", "When features are correlated", "Low"],
        ["Decision Tree Regressor", "Non-linear patterns", "Medium"],
        ["Random Forest", "Complex data, feature importance", "Medium"],
        ["Gradient Boosting (XGBoost)", "Competition-winning accuracy", "High"],
        ["Neural Networks", "Very complex patterns, lots of data", "Very High"]
      ]
    },
    codeExample: {
      title: "Sales Forecasting with Random Forest",
      language: "python",
      code: "from sklearn.ensemble import RandomForestRegressor\nfrom sklearn.metrics import mean_absolute_error, r2_score\n\n# Train the model\nmodel = RandomForestRegressor(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\n\n# Make predictions\npredictions = model.predict(X_test)\n\n# Evaluate\nmae = mean_absolute_error(y_test, predictions)\nr2 = r2_score(y_test, predictions)\n\nprint(f'MAE: {mae:.2f}')\nprint(f'R2 Score: {r2:.3f}')\n\n# Feature importance\nfor feat, imp in zip(feature_names, model.feature_importances_):\n    print(f'{feat}: {imp:.3f}')"
    },
    roleScenarios: [
      {
        role: "Financial Analyst",
        icon: "DollarSign",
        scenario: "Portfolio Return Prediction",
        benefit: "Estimate future asset values based on market indicators and fundamentals."
      },
      {
        role: "Business Analyst",
        icon: "BarChart",
        scenario: "Revenue Forecasting",
        benefit: "Predict next quarter's revenue for budget planning and resource allocation."
      },
      {
        role: "Data Analyst",
        icon: "Home",
        scenario: "Real Estate Pricing",
        benefit: "Model property values based on location, size, and amenities."
      }
    ]
  },
  {
    id: "classification",
    title: "Classification",
    icon: "Target",
    iconBg: "bg-indigo-500/20 text-indigo-400",
    description: "Predicting categories: Yes/No, Spam/Not Spam, Fraud/Safe, High/Medium/Low.",
    highlightWords: ["categories"],
    table: {
      title: "Popular Classification Models",
      headers: ["Model", "Best For", "Pros"],
      rows: [
        ["Logistic Regression", "Binary outcomes, interpretability", "Fast, explainable"],
        ["Decision Tree", "Rule-based decisions", "Easy to visualize"],
        ["Random Forest", "Complex patterns", "Handles overfitting well"],
        ["XGBoost", "High accuracy needs", "State-of-the-art performance"],
        ["SVM", "High-dimensional data", "Works with small datasets"],
        ["Neural Networks", "Image/text classification", "Handles unstructured data"]
      ]
    },
    codeExample: {
      title: "Fraud Detection Classifier",
      language: "python",
      code: "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report, confusion_matrix\n\n# Handle class imbalance\nmodel = RandomForestClassifier(\n    n_estimators=100,\n    class_weight='balanced',  # Important for fraud detection!\n    random_state=42\n)\nmodel.fit(X_train, y_train)\n\n# Predictions\ny_pred = model.predict(X_test)\n\n# Detailed metrics\nprint(classification_report(y_test, y_pred))\nprint('Confusion Matrix:')\nprint(confusion_matrix(y_test, y_pred))"
    },
    roleScenarios: [
      {
        role: "Financial Analyst",
        icon: "ShieldAlert",
        scenario: "Fraud Detection",
        benefit: "Flag suspicious transactions in real-time before money is lost."
      },
      {
        role: "Marketing Analyst",
        icon: "Users",
        scenario: "Lead Scoring",
        benefit: "Classify leads as 'High Potential' or 'Low Potential' for sales prioritization."
      },
      {
        role: "HR Analyst",
        icon: "UserCheck",
        scenario: "Employee Attrition",
        benefit: "Predict which employees are likely to leave and intervene early."
      }
    ]
  },
  {
    id: "clustering",
    title: "Clustering",
    icon: "Circle",
    iconBg: "bg-rose-500/20 text-rose-400",
    description: "Grouping similar items together without predefined labels. The algorithm discovers the structure.",
    highlightWords: ["without predefined labels", "discovers"],
    table: {
      title: "Clustering Algorithms",
      headers: ["Algorithm", "Best For", "Key Parameter"],
      rows: [
        ["K-Means", "Spherical clusters, fast", "k = number of clusters"],
        ["DBSCAN", "Irregular shapes, outliers", "eps = neighborhood size"],
        ["Hierarchical", "Dendrograms, nested groups", "linkage method"],
        ["Gaussian Mixture", "Soft clustering, overlapping", "n_components"]
      ]
    },
    codeExample: {
      title: "Customer Segmentation with K-Means",
      language: "python",
      code: "from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\n\n# Scale features (important for K-Means!)\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(customer_features)\n\n# Find optimal k with elbow method\ninertias = []\nfor k in range(1, 11):\n    kmeans = KMeans(n_clusters=k, random_state=42)\n    kmeans.fit(X_scaled)\n    inertias.append(kmeans.inertia_)\n\n# Final model with chosen k\nkmeans = KMeans(n_clusters=4, random_state=42)\ncustomer_segments = kmeans.fit_predict(X_scaled)\n\n# Add segments back to dataframe\ndf['segment'] = customer_segments"
    },
    roleScenarios: [
      {
        role: "Business Analyst",
        icon: "Users",
        scenario: "Customer Segmentation",
        benefit: "Group customers by purchasing behavior for targeted marketing campaigns."
      },
      {
        role: "Data Scientist",
        icon: "Microscope",
        scenario: "Anomaly Discovery",
        benefit: "Identify unusual patterns that don't fit any known category."
      },
      {
        role: "Product Manager",
        icon: "Package",
        scenario: "Product Bundling",
        benefit: "Discover which products are frequently bought together."
      }
    ]
  },
  {
    id: "dimensionality",
    title: "Dimensionality Reduction (PCA)",
    icon: "Minimize2",
    iconBg: "bg-pink-500/20 text-pink-400",
    description: "When dataset has many columns, reduce to the most important ones while keeping the information.",
    highlightWords: ["many columns", "most important ones"],
    codeExample: {
      title: "PCA (Principal Component Analysis)",
      language: "python",
      code: "from sklearn.decomposition import PCA\n\npca = PCA(n_components=2)\nX_reduced = pca.fit_transform(X)\n\n# See how much info is kept\nprint(pca.explained_variance_ratio_)"
    },
    benefits: [
      { icon: "BarChart2", iconColor: "text-blue-400", title: "Visualization", subtitle: "Plot high-dim data" },
      { icon: "Zap", iconColor: "text-yellow-400", title: "Speed", subtitle: "Faster training" },
      { icon: "Filter", iconColor: "text-rose-400", title: "Noise Removal", subtitle: "Keep signal only" }
    ],
    roleScenarios: [
      {
        role: "Data Analyst",
        icon: "Eye",
        scenario: "Survey Analysis",
        benefit: "Reduce 50+ survey questions to 3-4 underlying factors for interpretation."
      },
      {
        role: "Financial Analyst",
        icon: "LineChart",
        scenario: "Factor Models",
        benefit: "Identify latent factors driving stock returns (Fama-French style)."
      }
    ]
  },
  {
    id: "time-series",
    title: "Time Series Models",
    icon: "Clock",
    iconBg: "bg-violet-500/20 text-violet-400",
    description: "Used when data depends on time — past values affect future predictions.",
    highlightWords: ["depends on time"],
    table: {
      title: "Time Series Models Comparison",
      headers: ["Model", "Best For"],
      rows: [
        ["ARIMA", "Classic time series, stationary data"],
        ["SARIMA", "Seasonal patterns (e.g., holiday sales)"],
        ["Prophet", "Business forecasting, missing data handling"],
        ["LSTM", "Complex patterns, deep learning approach"]
      ]
    },
    examples: [
      { icon: "📈", text: "Stock price prediction" },
      { icon: "🌤️", text: "Weather forecasting" },
      { icon: "🛒", text: "Sales demand prediction" },
      { icon: "🏭", text: "Equipment failure prediction" }
    ],
    codeExample: {
      title: "Sales Forecasting with Prophet",
      language: "python",
      code: "from prophet import Prophet\n\n# Prepare data (Prophet requires 'ds' and 'y' columns)\ndf_prophet = df.rename(columns={'date': 'ds', 'sales': 'y'})\n\n# Create and fit model\nmodel = Prophet(\n    yearly_seasonality=True,\n    weekly_seasonality=True\n)\nmodel.fit(df_prophet)\n\n# Forecast next 30 days\nfuture = model.make_future_dataframe(periods=30)\nforecast = model.predict(future)\n\n# Plot\nmodel.plot(forecast)"
    },
    roleScenarios: [
      {
        role: "Financial Analyst",
        icon: "TrendingUp",
        scenario: "Stock Price Forecasting",
        benefit: "Predict future price movements using historical patterns."
      },
      {
        role: "Supply Chain Analyst",
        icon: "Truck",
        scenario: "Demand Planning",
        benefit: "Forecast inventory needs to optimize stock levels."
      },
      {
        role: "Data Engineer",
        icon: "Activity",
        scenario: "Stream Processing",
        benefit: "Build real-time pipelines for live data forecasting."
      }
    ]
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    icon: "Network",
    iconBg: "bg-fuchsia-500/20 text-fuchsia-400",
    description: "Neural networks with many layers. Best for unstructured data like images, text, and audio.",
    highlightWords: ["many layers", "unstructured data"],
    table: {
      title: "Deep Learning Architectures",
      headers: ["Architecture", "Best For", "Example Use"],
      rows: [
        ["CNN", "Images, spatial patterns", "Image classification, object detection"],
        ["RNN/LSTM", "Sequences, time series", "Text generation, speech recognition"],
        ["Transformer", "NLP, attention-based", "ChatGPT, BERT, translation"],
        ["GAN", "Generative tasks", "Image synthesis, deepfakes"],
        ["Autoencoder", "Compression, anomaly detection", "Fraud detection, denoising"]
      ]
    },
    codeExample: {
      title: "Simple Neural Network with Keras",
      language: "python",
      code: "from tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import Dense, Dropout\n\nmodel = Sequential([\n    Dense(128, activation='relu', input_shape=(n_features,)),\n    Dropout(0.3),\n    Dense(64, activation='relu'),\n    Dropout(0.3),\n    Dense(1, activation='sigmoid')  # Binary classification\n])\n\nmodel.compile(\n    optimizer='adam',\n    loss='binary_crossentropy',\n    metrics=['accuracy']\n)\n\nmodel.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.2)"
    },
    roleScenarios: [
      {
        role: "Data Scientist",
        icon: "MessageSquare",
        scenario: "Sentiment Analysis",
        benefit: "Analyze customer reviews and social media at scale."
      },
      {
        role: "Financial Analyst",
        icon: "Zap",
        scenario: "High-Frequency Trading",
        benefit: "Process market data in milliseconds for trading signals."
      },
      {
        role: "Data Engineer",
        icon: "Cpu",
        scenario: "GPU Infrastructure",
        benefit: "Set up distributed training on cloud GPU clusters."
      }
    ]
  },
  {
    id: "choose-model",
    title: "How to Choose a Model",
    icon: "HelpCircle",
    iconBg: "bg-sky-500/20 text-sky-400",
    description: "Choosing the right model depends on your data, problem type, and business requirements.",
    highlightWords: ["right model"],
    table: {
      title: "Model Selection Guide",
      headers: ["If You Need...", "Consider...", "Why"],
      rows: [
        ["Interpretability", "Linear/Logistic Regression, Decision Tree", "Explainable to stakeholders"],
        ["High Accuracy", "XGBoost, Neural Networks", "State-of-the-art performance"],
        ["Small Dataset", "SVM, Naive Bayes", "Work well with limited data"],
        ["Fast Training", "Linear models, KNN", "Quick iteration"],
        ["Time Series", "ARIMA, Prophet, LSTM", "Handle temporal patterns"],
        ["Unstructured Data", "Deep Learning (CNN, RNN)", "Process images, text, audio"]
      ]
    },
    codeExample: {
      title: "Model Comparison Pipeline",
      language: "python",
      code: "from sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.ensemble import RandomForestClassifier\nfrom xgboost import XGBClassifier\n\nmodels = {\n    'Logistic Regression': LogisticRegression(),\n    'Random Forest': RandomForestClassifier(n_estimators=100),\n    'XGBoost': XGBClassifier(n_estimators=100)\n}\n\nfor name, model in models.items():\n    scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')\n    print(f'{name}: {scores.mean():.3f} (+/- {scores.std():.3f})')"
    },
    roleScenarios: [
      {
        role: "Business Analyst",
        icon: "Target",
        scenario: "KPI Alignment",
        benefit: "Choose models that directly optimize business metrics."
      },
      {
        role: "Data Scientist",
        icon: "FlaskConical",
        scenario: "Systematic Experimentation",
        benefit: "Run controlled experiments to find the best approach."
      }
    ]
  },
  {
    id: "production",
    title: "Production & MLOps",
    icon: "Rocket",
    iconBg: "bg-purple-500/20 text-purple-400",
    description: "Deploying models so they can provide value in the real world. This is where ML meets software engineering.",
    highlightWords: ["real world", "software engineering"],
    table: {
      title: "MLOps Stages",
      headers: ["Stage", "Tools", "Purpose"],
      rows: [
        ["Version Control", "Git, DVC", "Track code and data versions"],
        ["Experiment Tracking", "MLflow, Weights & Biases", "Log metrics, compare runs"],
        ["Model Registry", "MLflow, SageMaker", "Store and version models"],
        ["Serving", "FastAPI, TensorFlow Serving", "Deploy as API"],
        ["Monitoring", "Prometheus, Grafana", "Track model performance"],
        ["CI/CD", "GitHub Actions, Jenkins", "Automate deployments"]
      ]
    },
    codeExample: {
      title: "Deploying as an API (FastAPI)",
      language: "python",
      code: "from fastapi import FastAPI\nfrom pydantic import BaseModel\nimport joblib\n\napp = FastAPI()\nmodel = joblib.load('churn_model.pkl')\n\nclass CustomerData(BaseModel):\n    tenure: int\n    monthly_charges: float\n    total_charges: float\n\n@app.post('/predict')\ndef predict_churn(data: CustomerData):\n    features = [[data.tenure, data.monthly_charges, data.total_charges]]\n    prediction = model.predict(features)\n    probability = model.predict_proba(features)[0][1]\n    \n    return {\n        'churn_risk': bool(prediction[0]),\n        'probability': round(probability, 3)\n    }"
    },
    roleScenarios: [
      {
        role: "Data Engineer",
        icon: "Container",
        scenario: "Dockerizing Models",
        benefit: "Create consistent, reproducible environments for model execution."
      },
      {
        role: "Software Engineer",
        icon: "Globe",
        scenario: "API Development",
        benefit: "Build REST APIs that allow applications to query ML models."
      },
      {
        role: "DevOps Engineer",
        icon: "Cloud",
        scenario: "Cloud Deployment",
        benefit: "Deploy to AWS SageMaker, GCP AI Platform, or Azure ML."
      }
    ]
  }
];

// Pipeline stages for the visualizer
export const pipelineStages = [
  { id: 'collection', label: 'Data Collection', icon: 'Database', color: 'bg-blue-500' },
  { id: 'cleaning', label: 'Data Cleaning', icon: 'Sparkles', color: 'bg-teal-500' },
  { id: 'features', label: 'Feature Engineering', icon: 'Wrench', color: 'bg-amber-500' },
  { id: 'split', label: 'Train/Test Split', icon: 'Scissors', color: 'bg-orange-500' },
  { id: 'training', label: 'Model Training', icon: 'Cpu', color: 'bg-indigo-500' },
  { id: 'evaluation', label: 'Evaluation', icon: 'CheckCircle', color: 'bg-green-500' },
  { id: 'deploy', label: 'Deploy', icon: 'Rocket', color: 'bg-purple-500' }
];
