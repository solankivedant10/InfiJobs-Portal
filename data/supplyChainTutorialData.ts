// Supply Chain Analyst Portal - Tutorial Data from GeeksforGeeks

export interface ScaTopic {
    id: string;
    title: string;
    icon: string;
    iconBg: string;
    accentColor: string;
    description: string;
    subtopics: { title: string; description?: string }[];
    codeExample?: { title: string; code: string; language: string };
}

export const supplyChainTutorialData: ScaTopic[] = [
    {
        id: "intro-supply-chain",
        title: "Introduction to Supply Chain Analysis",
        icon: "Truck",
        iconBg: "bg-teal-500/20 text-teal-400",
        accentColor: "teal",
        description: "A Supply Chain Analyst is responsible for ensuring the proper functioning and efficiency of the supply chain. They collect data, analyze patterns, and optimize processes to improve organizational performance.",
        subtopics: [
            { title: "Supply Chain Overview", description: "Understanding the end-to-end supply chain" },
            { title: "Role of an Analyst", description: "Key responsibilities and impact" },
            { title: "Industry Applications", description: "Manufacturing, retail, logistics" },
            { title: "Career Path", description: "Growth opportunities in supply chain" }
        ],
        codeExample: {
            title: "Supply Chain Data Analysis",
            language: "python",
            code: "import pandas as pd\nimport numpy as np\n\n# Load supply chain data\ndf = pd.read_csv('supply_chain_data.csv')\n\n# Analyze inventory levels\ninventory_summary = df.groupby('product_category').agg({\n    'stock_level': 'mean',\n    'reorder_point': 'mean',\n    'lead_time_days': 'mean'\n}).round(2)\n\n# Calculate inventory turnover\ndf['inventory_turnover'] = df['cost_of_goods_sold'] / df['avg_inventory']\n\nprint('Inventory Analysis:')\nprint(inventory_summary)"
        }
    },
    {
        id: "data-collection",
        title: "Data Collection and Analysis",
        icon: "Database",
        iconBg: "bg-blue-500/20 text-blue-400",
        accentColor: "blue",
        description: "Supply Chain Analysts collect data from external and internal sources like suppliers and logistics providers. They use this data to discover patterns, improve efficiency, and identify gaps in the supply chain.",
        subtopics: [
            { title: "Data Sources", description: "Suppliers, logistics, ERP systems" },
            { title: "Data Collection Methods", description: "APIs, databases, manual entry" },
            { title: "Pattern Discovery", description: "Identifying trends and anomalies" },
            { title: "Gap Analysis", description: "Finding improvement opportunities" },
            { title: "Reporting", description: "Visualizing insights for stakeholders" }
        ],
        codeExample: {
            title: "Supply Chain Data Pipeline",
            language: "python",
            code: "import pandas as pd\nfrom sqlalchemy import create_engine\n\n# Connect to multiple data sources\nerp_engine = create_engine('postgresql://erp_db')\nlogistics_engine = create_engine('postgresql://logistics_db')\n\n# Extract data from different sources\norders = pd.read_sql('SELECT * FROM orders', erp_engine)\nshipments = pd.read_sql('SELECT * FROM shipments', logistics_engine)\n\n# Merge and analyze\nmerged = orders.merge(shipments, on='order_id', how='left')\n\n# Calculate delivery performance\nmerged['delivery_delay'] = (merged['actual_delivery'] - merged['promised_delivery']).dt.days\non_time_rate = (merged['delivery_delay'] <= 0).mean() * 100\n\nprint(f'On-time delivery rate: {on_time_rate:.1f}%')"
        }
    },
    {
        id: "demand-forecasting",
        title: "Demand Forecasting",
        icon: "TrendingUp",
        iconBg: "bg-emerald-500/20 text-emerald-400",
        accentColor: "emerald",
        description: "Supply chain analysts predict future product demands through historical data analysis, market research, and statistical modeling. Good forecasting helps avoid stockouts and excess inventory.",
        subtopics: [
            { title: "Historical Data Analysis", description: "Analyzing past sales trends" },
            { title: "Market Research", description: "External factors affecting demand" },
            { title: "Statistical Modeling", description: "Time series, regression models" },
            { title: "Seasonal Adjustments", description: "Handling seasonal patterns" },
            { title: "Forecast Accuracy", description: "Measuring and improving predictions" }
        ],
        codeExample: {
            title: "Demand Forecasting Model",
            language: "python",
            code: "import pandas as pd\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error\n\n# Load historical sales data\ndf = pd.read_csv('sales_history.csv')\ndf['date'] = pd.to_datetime(df['date'])\n\n# Create features\ndf['month'] = df['date'].dt.month\ndf['year'] = df['date'].dt.year\ndf['day_of_week'] = df['date'].dt.dayofweek\n\n# Train forecasting model\nX = df[['month', 'year', 'day_of_week', 'promo_active']]\ny = df['sales_quantity']\n\nmodel = LinearRegression()\nmodel.fit(X, y)\n\n# Forecast next month\nforecast = model.predict([[1, 2025, 3, 0]])\nprint(f'Forecasted demand: {forecast[0]:.0f} units')"
        }
    },
    {
        id: "inventory-management",
        title: "Inventory Management",
        icon: "Package",
        iconBg: "bg-amber-500/20 text-amber-400",
        accentColor: "amber",
        description: "For precise stock management, analysts check available stock to maintain efficient replenishment. This includes setting reorder points, establishing safety stock, and controlling lead times.",
        subtopics: [
            { title: "Reorder Points", description: "When to trigger new orders" },
            { title: "Safety Stock", description: "Buffer against uncertainty" },
            { title: "Lead Time Management", description: "Supplier delivery times" },
            { title: "ABC Analysis", description: "Categorizing inventory by value" },
            { title: "Just-in-Time (JIT)", description: "Minimizing inventory holding" }
        ],
        codeExample: {
            title: "Inventory Optimization",
            language: "python",
            code: "import pandas as pd\nimport numpy as np\n\n# Calculate optimal inventory levels\ndef calculate_reorder_point(avg_daily_demand, lead_time, safety_stock):\n    return (avg_daily_demand * lead_time) + safety_stock\n\ndef calculate_safety_stock(std_daily_demand, lead_time, service_level_z=1.65):\n    return service_level_z * std_daily_demand * np.sqrt(lead_time)\n\n# Product data\nproducts = pd.DataFrame({\n    'product': ['A', 'B', 'C'],\n    'avg_daily_demand': [100, 50, 200],\n    'std_daily_demand': [20, 10, 40],\n    'lead_time_days': [5, 7, 3]\n})\n\n# Calculate optimal levels\nproducts['safety_stock'] = products.apply(\n    lambda x: calculate_safety_stock(x['std_daily_demand'], x['lead_time_days']), axis=1\n)\nproducts['reorder_point'] = products.apply(\n    lambda x: calculate_reorder_point(x['avg_daily_demand'], x['lead_time_days'], x['safety_stock']), axis=1\n)\n\nprint(products)"
        }
    },
    {
        id: "process-improvement",
        title: "Process Improvement",
        icon: "Settings",
        iconBg: "bg-purple-500/20 text-purple-400",
        accentColor: "purple",
        description: "Supply chain analysts map out the supply chain system, identify flaws, and suggest improvements. This includes overhauling operations, enhancing acquisition processes, and integrating technology solutions.",
        subtopics: [
            { title: "Process Mapping", description: "Documenting current workflows" },
            { title: "Bottleneck Identification", description: "Finding constraints" },
            { title: "Lean Principles", description: "Eliminating waste" },
            { title: "Six Sigma", description: "Reducing variation" },
            { title: "Technology Integration", description: "Automation and digitization" }
        ],
        codeExample: {
            title: "Process Analysis",
            language: "python",
            code: "import pandas as pd\nimport matplotlib.pyplot as plt\n\n# Analyze process cycle times\nprocess_data = pd.read_csv('process_times.csv')\n\n# Calculate statistics\nprocess_stats = process_data.groupby('process_step').agg({\n    'cycle_time_hours': ['mean', 'std', 'min', 'max'],\n    'defect_rate': 'mean'\n})\n\n# Identify bottlenecks (steps with highest avg time)\nbottlenecks = process_stats.nlargest(3, ('cycle_time_hours', 'mean'))\nprint('Top 3 Bottlenecks:')\nprint(bottlenecks)\n\n# Calculate potential savings\ncurrent_total = process_stats[('cycle_time_hours', 'mean')].sum()\ntarget_reduction = 0.15  # 15% reduction target\npotential_savings = current_total * target_reduction\nprint(f'Potential time savings: {potential_savings:.1f} hours')"
        }
    },
    {
        id: "supplier-management",
        title: "Supplier Relationship Management",
        icon: "Handshake",
        iconBg: "bg-rose-500/20 text-rose-400",
        accentColor: "rose",
        description: "Analysts engage suppliers to enhance the supply chain through developing targets, assigning responsibilities, and coordinating contracts. Strong supplier relationships ensure reliable material and service delivery.",
        subtopics: [
            { title: "Supplier Evaluation", description: "Scorecard and metrics" },
            { title: "Contract Management", description: "Terms and compliance" },
            { title: "Performance Monitoring", description: "KPIs and SLAs" },
            { title: "Strategic Partnerships", description: "Long-term relationships" },
            { title: "Risk Diversification", description: "Multiple supplier strategy" }
        ],
        codeExample: {
            title: "Supplier Scorecard",
            language: "python",
            code: "import pandas as pd\n\n# Supplier performance data\nsuppliers = pd.DataFrame({\n    'supplier': ['Supplier A', 'Supplier B', 'Supplier C'],\n    'on_time_delivery': [95, 88, 92],\n    'quality_rate': [98, 95, 97],\n    'price_competitiveness': [85, 92, 88],\n    'responsiveness': [90, 85, 95]\n})\n\n# Calculate weighted score\nweights = {\n    'on_time_delivery': 0.30,\n    'quality_rate': 0.30,\n    'price_competitiveness': 0.20,\n    'responsiveness': 0.20\n}\n\nsuppliers['total_score'] = (\n    suppliers['on_time_delivery'] * weights['on_time_delivery'] +\n    suppliers['quality_rate'] * weights['quality_rate'] +\n    suppliers['price_competitiveness'] * weights['price_competitiveness'] +\n    suppliers['responsiveness'] * weights['responsiveness']\n)\n\n# Rank suppliers\nsuppliers = suppliers.sort_values('total_score', ascending=False)\nprint(suppliers[['supplier', 'total_score']])"
        }
    },
    {
        id: "logistics-planning",
        title: "Logistics and Transportation Planning",
        icon: "MapPin",
        iconBg: "bg-indigo-500/20 text-indigo-400",
        accentColor: "indigo",
        description: "Analysts formulate transport strategies and organize systems for timely delivery. This includes choosing transportation means, optimizing routes, and managing shipping operations to minimize costs.",
        subtopics: [
            { title: "Route Optimization", description: "Shortest path algorithms" },
            { title: "Mode Selection", description: "Air, sea, road, rail" },
            { title: "Carrier Management", description: "Selecting logistics partners" },
            { title: "Cost Analysis", description: "Total logistics cost" },
            { title: "Last-Mile Delivery", description: "Final delivery optimization" }
        ],
        codeExample: {
            title: "Route Optimization",
            language: "python",
            code: "import pandas as pd\nimport numpy as np\n\n# Delivery locations\nlocations = pd.DataFrame({\n    'location': ['Warehouse', 'Customer A', 'Customer B', 'Customer C'],\n    'lat': [40.7128, 40.7580, 40.6892, 40.7282],\n    'lon': [-74.0060, -73.9855, -74.0445, -73.7949]\n})\n\n# Calculate distance matrix (simplified)\ndef haversine_distance(lat1, lon1, lat2, lon2):\n    R = 6371  # Earth's radius in km\n    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])\n    dlat = lat2 - lat1\n    dlon = lon2 - lon1\n    a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2\n    return 2 * R * np.arcsin(np.sqrt(a))\n\n# Calculate all distances\nfor i, loc1 in locations.iterrows():\n    for j, loc2 in locations.iterrows():\n        dist = haversine_distance(loc1['lat'], loc1['lon'], loc2['lat'], loc2['lon'])\n        print(f\"{loc1['location']} -> {loc2['location']}: {dist:.2f} km\")"
        }
    },
    {
        id: "risk-management",
        title: "Risk Management",
        icon: "Shield",
        iconBg: "bg-red-500/20 text-red-400",
        accentColor: "red",
        description: "Analysts assess issues regarding supply chain interruptions from natural calamities, political upheavals, or supplier bankruptcy. They implement contingency measures to enhance business sustainability.",
        subtopics: [
            { title: "Risk Identification", description: "Mapping potential disruptions" },
            { title: "Risk Assessment", description: "Probability and impact analysis" },
            { title: "Mitigation Strategies", description: "Preventive measures" },
            { title: "Contingency Planning", description: "Backup plans and alternatives" },
            { title: "Business Continuity", description: "Ensuring operations during crises" }
        ],
        codeExample: {
            title: "Risk Assessment Matrix",
            language: "python",
            code: "import pandas as pd\nimport numpy as np\n\n# Supply chain risks\nrisks = pd.DataFrame({\n    'risk': [\n        'Supplier bankruptcy',\n        'Natural disaster',\n        'Port congestion',\n        'Currency fluctuation',\n        'Quality issues'\n    ],\n    'probability': [2, 1, 3, 4, 3],  # 1-5 scale\n    'impact': [5, 5, 3, 2, 4]  # 1-5 scale\n})\n\n# Calculate risk score\nrisks['risk_score'] = risks['probability'] * risks['impact']\n\n# Categorize risks\ndef categorize_risk(score):\n    if score >= 15: return 'Critical'\n    elif score >= 8: return 'High'\n    elif score >= 4: return 'Medium'\n    else: return 'Low'\n\nrisks['category'] = risks['risk_score'].apply(categorize_risk)\nrisks = risks.sort_values('risk_score', ascending=False)\n\nprint('Risk Assessment:')\nprint(risks)"
        }
    },
    {
        id: "skills-required",
        title: "Skills Required",
        icon: "Award",
        iconBg: "bg-cyan-500/20 text-cyan-400",
        accentColor: "cyan",
        description: "The supply chain analyst role requires analytical skills, technical proficiency, mathematical knowledge, problem-solving abilities, attention to detail, project management, and communication skills.",
        subtopics: [
            { title: "Analytical Skills", description: "Data analysis and pattern recognition" },
            { title: "Technical Proficiency", description: "SAP, Oracle, Excel, SQL, Tableau" },
            { title: "Mathematical Knowledge", description: "Statistics and optimization" },
            { title: "Problem-Solving", description: "Critical thinking and innovation" },
            { title: "Attention to Detail", description: "Accuracy in analysis" },
            { title: "Project Management", description: "Planning and execution" },
            { title: "Communication", description: "Stakeholder engagement" }
        ],
        codeExample: {
            title: "Technical Skills Demo",
            language: "sql",
            code: "-- Supply Chain Analysis Queries\n\n-- Inventory turnover by category\nSELECT \n    category,\n    SUM(cost_of_goods_sold) / AVG(inventory_value) as turnover_ratio,\n    AVG(days_on_hand) as avg_days_on_hand\nFROM inventory_metrics\nGROUP BY category\nORDER BY turnover_ratio DESC;\n\n-- Supplier performance tracking\nSELECT \n    supplier_name,\n    COUNT(*) as total_orders,\n    AVG(CASE WHEN delivered_on_time = 1 THEN 100 ELSE 0 END) as otd_rate,\n    AVG(quality_score) as avg_quality\nFROM supplier_orders\nGROUP BY supplier_name\nHAVING COUNT(*) > 10\nORDER BY otd_rate DESC;"
        }
    }
];
