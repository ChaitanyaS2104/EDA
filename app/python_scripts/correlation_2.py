import pandas as pd
import json
import sys
import os

# Check if filename is provided as argument
if len(sys.argv) < 2:
    print("Error: No dataset filename provided")
    sys.exit(1)

# Get filename/path from Node.js
dataset_path = sys.argv[1]

# Verify file exists
if not os.path.exists(dataset_path):
    print(f"Error: File not found: {dataset_path}")
    sys.exit(1)

# Load dataset
dataset = pd.read_csv(dataset_path)

# Select numeric columns
numeric_cols = dataset.select_dtypes(include='number').columns.tolist()

# Take first two numeric columns
cols = numeric_cols[:2]

# Calculate correlation matrix
corr_matrix = dataset[cols].corr().round(6)

# Convert to dict and print as JSON
corr_dict = corr_matrix.to_dict()
print(json.dumps(corr_dict))
