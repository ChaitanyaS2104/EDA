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

# Load dataset dynamically
df = pd.read_csv(dataset_path)

# Calculate correlations (only numeric columns by default)
corr = df.corr(numeric_only=True)

# Remove self-correlation and duplicate pairs
corr_pairs = corr.unstack()
corr_pairs = corr_pairs[corr_pairs.index.get_level_values(0) != corr_pairs.index.get_level_values(1)]
corr_pairs = corr_pairs.drop_duplicates().sort_values(key=abs, ascending=False).head(5)

# Prepare data for JSON
top_corr_list = [
    {"feature1": i, "feature2": j, "correlation": round(corr_pairs[(i, j)], 4)}
    for i, j in corr_pairs.index
]

# Output as JSON string for Node.js to consume
print(json.dumps(top_corr_list))
sys.exit(0)
