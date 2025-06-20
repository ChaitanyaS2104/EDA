import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import sys
import os

# Get the file path from the command line arguments
if len(sys.argv) < 2:
    print("Usage: python boxplot_generator.py <dataset_path>")
    sys.exit(1)

dataset_path = sys.argv[1]

# Validate file exists
if not os.path.exists(dataset_path):
    print(f"File not found: {dataset_path}")
    sys.exit(1)

# Load dataset
dataset = pd.read_csv(dataset_path)

# Select all numeric columns
numeric_columns = dataset.select_dtypes(include='number').columns.tolist()

# Calculate medians
medians = dataset[numeric_columns].median()

# Print medians
for col in numeric_columns:
    print(f"{col}: {medians[col]}")

# Plot boxplots
plt.figure(figsize=(8, 6))
for i, col in enumerate(numeric_columns):
    plt.subplot((len(numeric_columns) + 1) // 2, 2, i + 1)
    sns.boxplot(y=dataset[col])
    plt.title(f"Boxplot of {col.capitalize()}")

plt.tight_layout()
plt.savefig('images/boxplots.png')
plt.close()
