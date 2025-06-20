import pandas as pd
import json
import sys
import os
from sklearn.impute import SimpleImputer

if len(sys.argv) < 2:
    print(json.dumps({"error": "No file path provided"}))
    sys.exit(1)

file_path = sys.argv[1]

if not os.path.exists(file_path):
    print(json.dumps({"error": f"File not found: {file_path}"}))
    sys.exit(1)

# Load dataset
df = pd.read_csv(file_path)

# Impute missing values with most frequent value in each column
imputer = SimpleImputer(strategy="most_frequent")
df_imputed = pd.DataFrame(imputer.fit_transform(df), columns=df.columns)

# Count non-null entries per column (should be equal to total rows after impute)
counts = {col: int(df_imputed[col].count()) for col in df_imputed.columns}

print(json.dumps(counts))
