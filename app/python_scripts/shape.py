import pandas as pd
import json
import sys
import os

if len(sys.argv) < 2:
    print(json.dumps({"error": "No file path provided"}))
    sys.exit(1)

file_path = sys.argv[1]

if not os.path.exists(file_path):
    print(json.dumps({"error": f"File not found: {file_path}"}))
    sys.exit(1)

df = pd.read_csv(file_path)
rows, cols = df.shape

print(json.dumps({"rows": rows, "columns": cols}))
