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

# Read CSV file
df = pd.read_csv(dataset_path)

# Get non-null count for each column
count_per_column = df.count().to_dict()

# Convert all counts to int (optional, since they usually are int)
count_per_column = {k: int(v) for k, v in count_per_column.items()}

# Print JSON for Node.js to capture
print(json.dumps(count_per_column))
sys.exit(0)
