// Data Engineering Portal - Tutorial Data from GeeksforGeeks

export interface DeTopic {
    id: string;
    title: string;
    icon: string;
    iconBg: string;
    accentColor: string;
    description: string;
    subtopics: { title: string; description?: string }[];
    codeExample?: { title: string; code: string; language: string };
}

export const dataEngineeringTutorialData: DeTopic[] = [
    {
        id: "what-is-de",
        title: "What is Data Engineering?",
        icon: "Server",
        iconBg: "bg-orange-500/20 text-orange-400",
        accentColor: "orange",
        description: "Data Engineering is the field concerned with designing, constructing, and maintaining systems for data collection, storage, processing, and analysis. Data engineers manage huge datasets in real-time environments.",
        subtopics: [
            { title: "Data Infrastructure Design", description: "Building scalable data systems" },
            { title: "Real-time Data Processing", description: "Handling streaming data" },
            { title: "Data Quality Management", description: "Ensuring accurate, usable data" },
            { title: "Collaboration with Data Teams", description: "Working with scientists and analysts" }
        ],
        codeExample: {
            title: "Data Engineering Overview",
            language: "python",
            code: "# Data Engineering typically involves:\n\n# 1. Data Ingestion (Apache Kafka, AWS Kinesis)\nfrom kafka import KafkaConsumer\nconsumer = KafkaConsumer('data-stream', bootstrap_servers=['localhost:9092'])\n\n# 2. Data Processing (Apache Spark)\nfrom pyspark.sql import SparkSession\nspark = SparkSession.builder.appName('ETL').getOrCreate()\ndf = spark.read.parquet('s3://bucket/raw-data/')\n\n# 3. Data Transformation\ndf_clean = df.dropDuplicates().na.fill(0)\ndf_aggregated = df_clean.groupBy('category').agg({'revenue': 'sum'})\n\n# 4. Data Storage (Data Warehouse)\ndf_aggregated.write.mode('overwrite').parquet('s3://bucket/processed/')"
        }
    },
    {
        id: "data-collection",
        title: "Data Collection",
        icon: "Download",
        iconBg: "bg-blue-500/20 text-blue-400",
        accentColor: "blue",
        description: "Data engineering starts with data collection - gathering raw data from various sources such as databases, APIs, sensors, and logs. The quality of collected data directly impacts subsequent processes.",
        subtopics: [
            { title: "Database Extraction", description: "Pulling data from SQL/NoSQL databases" },
            { title: "API Integration", description: "Connecting to external data sources" },
            { title: "Log Collection", description: "Gathering application and system logs" },
            { title: "Sensor Data", description: "IoT and real-time data streams" },
            { title: "Web Scraping", description: "Extracting data from websites" }
        ],
        codeExample: {
            title: "Data Collection Examples",
            language: "python",
            code: "import requests\nimport pandas as pd\nfrom sqlalchemy import create_engine\n\n# 1. Extract from Database\nengine = create_engine('postgresql://user:pass@host:5432/db')\ndf_db = pd.read_sql('SELECT * FROM customers', engine)\n\n# 2. API Data Collection\nresponse = requests.get('https://api.example.com/data', \n                        headers={'Authorization': 'Bearer TOKEN'})\ndata_api = response.json()\n\n# 3. Log File Processing\nwith open('/var/log/app.log', 'r') as f:\n    logs = [line.strip() for line in f.readlines()]\n\n# 4. Real-time Streaming\nfrom kafka import KafkaConsumer\nconsumer = KafkaConsumer('events', bootstrap_servers=['localhost:9092'])\nfor message in consumer:\n    process_event(message.value)"
        }
    },
    {
        id: "data-storage",
        title: "Data Storage",
        icon: "Database",
        iconBg: "bg-emerald-500/20 text-emerald-400",
        accentColor: "emerald",
        description: "Once data is collected, it needs efficient storage solutions. Data engineers design and manage data warehouses, data lakes, and databases that balance performance, scalability, and cost-effectiveness.",
        subtopics: [
            { title: "Data Warehouses", description: "Snowflake, Redshift, BigQuery" },
            { title: "Data Lakes", description: "S3, HDFS, Azure Data Lake" },
            { title: "SQL Databases", description: "PostgreSQL, MySQL, SQL Server" },
            { title: "NoSQL Databases", description: "MongoDB, Cassandra, DynamoDB" },
            { title: "Data Modeling", description: "Star schema, snowflake schema" }
        ],
        codeExample: {
            title: "Data Storage Solutions",
            language: "python",
            code: "import boto3\nfrom snowflake.connector import connect\nimport pandas as pd\n\n# 1. Write to Data Lake (S3)\ns3 = boto3.client('s3')\ndf.to_parquet('/tmp/data.parquet')\ns3.upload_file('/tmp/data.parquet', 'my-bucket', 'data/data.parquet')\n\n# 2. Write to Data Warehouse (Snowflake)\nconn = connect(\n    user='user', password='pass',\n    account='account', warehouse='COMPUTE_WH',\n    database='ANALYTICS', schema='PUBLIC'\n)\ndf.to_sql('customers', conn, if_exists='replace', index=False)\n\n# 3. Create Star Schema Table\nCREATE_SQL = '''\nCREATE TABLE fact_sales (\n    sale_id INT PRIMARY KEY,\n    date_key INT REFERENCES dim_date(date_key),\n    product_key INT REFERENCES dim_product(product_key),\n    customer_key INT REFERENCES dim_customer(customer_key),\n    quantity INT,\n    amount DECIMAL(10,2)\n);\n'''"
        }
    },
    {
        id: "data-processing",
        title: "Data Processing",
        icon: "Cpu",
        iconBg: "bg-purple-500/20 text-purple-400",
        accentColor: "purple",
        description: "Data processing transforms raw data into structured, usable formats. This includes data cleaning, normalization, and integration using tools like Apache Spark, Hadoop, and ETL frameworks.",
        subtopics: [
            { title: "ETL (Extract, Transform, Load)", description: "Traditional batch processing" },
            { title: "ELT (Extract, Load, Transform)", description: "Modern cloud-based approach" },
            { title: "Data Cleaning", description: "Handling missing values, duplicates" },
            { title: "Data Normalization", description: "Standardizing data formats" },
            { title: "Apache Spark", description: "Distributed data processing" },
            { title: "Apache Hadoop", description: "Big data processing framework" }
        ],
        codeExample: {
            title: "Data Processing with Spark",
            language: "python",
            code: "from pyspark.sql import SparkSession\nfrom pyspark.sql.functions import col, when, trim, lower\n\n# Initialize Spark\nspark = SparkSession.builder \\\n    .appName('DataProcessing') \\\n    .config('spark.sql.warehouse.dir', '/user/hive/warehouse') \\\n    .getOrCreate()\n\n# Read raw data\ndf_raw = spark.read.json('s3://bucket/raw/events/')\n\n# Clean and transform\ndf_clean = df_raw \\\n    .dropDuplicates(['event_id']) \\\n    .filter(col('timestamp').isNotNull()) \\\n    .withColumn('email', lower(trim(col('email')))) \\\n    .withColumn('status', when(col('amount') > 0, 'valid').otherwise('invalid'))\n\n# Aggregate\ndf_summary = df_clean.groupBy('category').agg(\n    {'amount': 'sum', 'event_id': 'count'}\n)\n\n# Write to warehouse\ndf_summary.write.mode('overwrite').saveAsTable('analytics.event_summary')"
        }
    },
    {
        id: "data-pipelines",
        title: "Data Pipelines",
        icon: "GitBranch",
        iconBg: "bg-cyan-500/20 text-cyan-400",
        accentColor: "cyan",
        description: "Data pipelines are automated workflows that move data from source to destination, ensuring smooth and consistent data flow. They encompass ETL, real-time streaming, and data orchestration.",
        subtopics: [
            { title: "Batch Processing", description: "Scheduled data jobs" },
            { title: "Stream Processing", description: "Real-time data flows" },
            { title: "Apache Airflow", description: "Workflow orchestration" },
            { title: "Apache Kafka", description: "Event streaming platform" },
            { title: "Luigi/Prefect", description: "Pipeline management tools" }
        ],
        codeExample: {
            title: "Airflow DAG Example",
            language: "python",
            code: "from airflow import DAG\nfrom airflow.operators.python import PythonOperator\nfrom airflow.operators.bash import BashOperator\nfrom datetime import datetime, timedelta\n\ndefault_args = {\n    'owner': 'data-team',\n    'depends_on_past': False,\n    'retries': 3,\n    'retry_delay': timedelta(minutes=5)\n}\n\ndag = DAG(\n    'daily_etl_pipeline',\n    default_args=default_args,\n    schedule_interval='0 6 * * *',  # Daily at 6 AM\n    start_date=datetime(2024, 1, 1),\n    catchup=False\n)\n\nextract_task = PythonOperator(\n    task_id='extract_data',\n    python_callable=extract_from_source,\n    dag=dag\n)\n\ntransform_task = PythonOperator(\n    task_id='transform_data',\n    python_callable=clean_and_transform,\n    dag=dag\n)\n\nload_task = PythonOperator(\n    task_id='load_to_warehouse',\n    python_callable=load_to_snowflake,\n    dag=dag\n)\n\nextract_task >> transform_task >> load_task"
        }
    },
    {
        id: "data-quality",
        title: "Data Quality and Governance",
        icon: "Shield",
        iconBg: "bg-rose-500/20 text-rose-400",
        accentColor: "rose",
        description: "Ensuring data quality and governance involves implementing policies to maintain data accuracy, consistency, and security. Includes data validation, anomaly monitoring, and regulatory compliance.",
        subtopics: [
            { title: "Data Validation", description: "Schema validation and type checking" },
            { title: "Data Profiling", description: "Understanding data quality metrics" },
            { title: "Anomaly Detection", description: "Identifying data quality issues" },
            { title: "Data Lineage", description: "Tracking data origin and transformations" },
            { title: "GDPR/HIPAA Compliance", description: "Regulatory requirements" },
            { title: "Access Control", description: "Data security and permissions" }
        ],
        codeExample: {
            title: "Data Quality Checks",
            language: "python",
            code: "from great_expectations import expect\nimport pandas as pd\n\n# Load data\ndf = pd.read_parquet('s3://bucket/data/customers.parquet')\n\n# Data Quality Checks\ndef run_quality_checks(df):\n    checks = []\n    \n    # 1. Completeness check\n    null_pct = df.isnull().sum() / len(df) * 100\n    checks.append(('Null values < 5%', (null_pct < 5).all()))\n    \n    # 2. Uniqueness check\n    duplicate_pct = df.duplicated().sum() / len(df) * 100\n    checks.append(('Duplicates < 1%', duplicate_pct < 1))\n    \n    # 3. Validity check\n    valid_emails = df['email'].str.contains('@').all()\n    checks.append(('Valid email format', valid_emails))\n    \n    # 4. Freshness check\n    max_date = pd.to_datetime(df['updated_at']).max()\n    is_fresh = (pd.Timestamp.now() - max_date).days < 1\n    checks.append(('Data is fresh', is_fresh))\n    \n    return checks\n\nresults = run_quality_checks(df)\nfor check, passed in results:\n    print(f'{\"✓\" if passed else \"✗\"} {check}')"
        }
    },
    {
        id: "de-tools",
        title: "Tools and Technologies",
        icon: "Wrench",
        iconBg: "bg-amber-500/20 text-amber-400",
        accentColor: "amber",
        description: "Data engineers use various tools: Database Management Systems (MySQL, PostgreSQL), Data Warehouses (Redshift, BigQuery), Big Data tools (Hadoop, Spark), and orchestration tools (Airflow).",
        subtopics: [
            { title: "DBMS", description: "MySQL, PostgreSQL, MongoDB" },
            { title: "Data Warehousing", description: "Redshift, BigQuery, Snowflake" },
            { title: "Big Data", description: "Hadoop, Apache Spark" },
            { title: "ETL Tools", description: "Talend, Apache Nifi, dbt" },
            { title: "Orchestration", description: "Apache Airflow, Prefect, Luigi" },
            { title: "Cloud Platforms", description: "AWS, GCP, Azure" }
        ],
        codeExample: {
            title: "Modern Data Stack",
            language: "python",
            code: "# Modern Data Engineering Stack\n\n# 1. dbt for Transformations\n# models/staging/stg_customers.sql\n'''\nSELECT\n    id as customer_id,\n    LOWER(email) as email,\n    created_at,\n    DATEDIFF(day, created_at, CURRENT_DATE) as days_since_signup\nFROM {{ source('raw', 'customers') }}\nWHERE email IS NOT NULL\n'''\n\n# 2. Python for Orchestration\nfrom prefect import flow, task\n\n@task\ndef extract():\n    return pd.read_sql('SELECT * FROM raw.events', engine)\n\n@task\ndef transform(df):\n    return df.dropna().drop_duplicates()\n\n@task\ndef load(df):\n    df.to_sql('clean_events', warehouse_engine)\n\n@flow\ndef etl_pipeline():\n    data = extract()\n    clean_data = transform(data)\n    load(clean_data)\n\netl_pipeline()"
        }
    },
    {
        id: "de-challenges",
        title: "Challenges in Data Engineering",
        icon: "AlertTriangle",
        iconBg: "bg-red-500/20 text-red-400",
        accentColor: "red",
        description: "Common data engineering challenges: handling large data volumes, ensuring data quality, building scalable systems, data security, and keeping up with rapidly evolving technology.",
        subtopics: [
            { title: "Large Data Volumes", description: "Managing petabyte-scale datasets" },
            { title: "Data Quality", description: "Maintaining accuracy across sources" },
            { title: "Scalability", description: "Building systems that grow" },
            { title: "Data Security", description: "Protecting sensitive data" },
            { title: "Technology Evolution", description: "Staying current with tools" }
        ],
        codeExample: {
            title: "Handling Scale",
            language: "python",
            code: "from pyspark.sql import SparkSession\nfrom pyspark.sql.functions import *\n\n# Initialize Spark for large-scale processing\nspark = SparkSession.builder \\\n    .appName('LargeScaleETL') \\\n    .config('spark.executor.memory', '8g') \\\n    .config('spark.executor.cores', '4') \\\n    .config('spark.sql.shuffle.partitions', '200') \\\n    .getOrCreate()\n\n# Process large dataset with partitioning\ndf = spark.read.parquet('s3://bucket/data/') \\\n    .repartition(100, 'date')  # Optimize for partitioned writes\n\n# Use broadcast for small dimension tables\nfrom pyspark.sql.functions import broadcast\ndim_products = spark.table('dim_products')\n\ndf_enriched = df.join(\n    broadcast(dim_products),  # Broadcast small table\n    on='product_id'\n)\n\n# Write with partitioning for efficient queries\ndf_enriched.write \\\n    .partitionBy('date', 'region') \\\n    .mode('overwrite') \\\n    .parquet('s3://bucket/processed/')"
        }
    },
    {
        id: "de-vs-ds",
        title: "Data Engineering vs Data Science",
        icon: "GitCompare",
        iconBg: "bg-indigo-500/20 text-indigo-400",
        accentColor: "indigo",
        description: "Data Engineering and Data Science are distinct but related disciplines. Engineers build infrastructure and pipelines; Scientists analyze data and build models. Both are essential for data-driven organizations.",
        subtopics: [
            { title: "Data Engineer Focus", description: "Infrastructure, pipelines, data quality" },
            { title: "Data Scientist Focus", description: "Analysis, modeling, insights" },
            { title: "Overlap Areas", description: "Python, SQL, data understanding" },
            { title: "Collaboration", description: "DE enables DS with clean data" }
        ],
        codeExample: {
            title: "DE vs DS Workflow",
            language: "python",
            code: "# DATA ENGINEER: Build the pipeline\n# ================================\nfrom airflow import DAG\nfrom airflow.operators.python import PythonOperator\n\ndef extract_transform_load():\n    # Extract from source\n    df = pd.read_sql('SELECT * FROM raw_events', source_db)\n    \n    # Transform and clean\n    df_clean = df.dropna().drop_duplicates()\n    \n    # Load to warehouse\n    df_clean.to_sql('clean_events', warehouse_db)\n\n# DATA SCIENTIST: Use the clean data\n# ===================================\nimport pandas as pd\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Load clean data (prepared by DE)\ndf = pd.read_sql('SELECT * FROM clean_events', warehouse_db)\n\n# Build and train model\nX = df.drop('target', axis=1)\ny = df['target']\nmodel = RandomForestClassifier().fit(X, y)\n\n# Generate predictions\npredictions = model.predict(X_new)"
        }
    }
];
