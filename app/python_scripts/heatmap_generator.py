import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import sys
import os

if len(sys.argv) < 2:
    print("Usage: python heatmap_generator.py <dataset_path>")
    sys.exit(1)

dataset_path = sys.argv[1]

if not os.path.exists(dataset_path):
    print(f"File not found: {dataset_path}")
    sys.exit(1)

dataset = pd.read_csv(dataset_path)

plt.figure(figsize=(10, 6))
sns.heatmap(dataset.corr(numeric_only=True), annot=True, cmap='coolwarm', fmt=".2f")
plt.title("Correlation Heatmap")
plt.tight_layout()
plt.savefig('images/heatmap.png')
plt.close()
