import pandas as pd
import json
import sys
import os

if len(sys.argv) < 2:
    print(json.dumps({"error": "No dataset filename provided"}))
    sys.exit(1)

dataset_path = sys.argv[1]

if not os.path.exists(dataset_path):
    print(json.dumps({"error": f"File not found: {dataset_path}"}))
    sys.exit(1)

# Load CSV
df = pd.read_csv(dataset_path)

# Get dtypes as strings
dtypes_dict = {col: str(dtype) for col, dtype in df.dtypes.items()}

# Print JSON for Node.js to capture
print(json.dumps(dtypes_dict))
sys.exit(0)
