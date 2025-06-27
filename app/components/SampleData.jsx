import React from "react";
import StepBlock from "./StepBlock";
import Substep from "./Substep";
import Image from "next/image";

const SampleData = () => {
  return (
    <div className="stepContainer w-full">
      <StepBlock
        step_id="step1"
        stepName="Importing libraries & Understanding the dataset"
        stepDesc={
          <>
            <ul className="list">
              <li>
                The first step is to import essential Python libraries for data
                analysis and visualization:
              </li>
              <li>
                <span className="codespan">pandas</span> for handling data
                structures and operations.
              </li>
              <li>
                <span className="codespan">numpy</span> for numerical
                computations.
              </li>
              <li>
                <span className="codespan">matplotlib.pyplot</span> and{" "}
                <span className="codespan">seaborn</span> for creating
                visualizations and plots
              </li>
            </ul>
          </>
        }
        stepCode={`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns`}
        stepOutput={``}
        stepNumber={1}
      />

      <Substep
        substepDesc={
          <>
            <>
              <ul className="list">
                <li>
                  Import the{" "}
                  <a href="https://www.kaggle.com/datasets/brendan45774/test-file">
                    Titanic dataset
                  </a>{" "}
                  using <span className="codespan">pd.read_csv()</span>. (Other
                  options: <span className="codespan">pd.read_excel()</span>,{" "}
                  <span className="codespan">pd.read_json()</span>)
                </li>
                <li>
                  Check the data types of each column to understand how the data
                  is represented (e.g., numeric, object, datetime).
                </li>
              </ul>
            </>
          </>
        }
        substepCode={`dataset = pd.read_csv("tested.csv")
dataset.dtypes`}
        substepOutput={
          <>
            <table className="outputTable">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Data Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PassengerId</td>
                  <td>int64</td>
                </tr>
                <tr>
                  <td>Survived</td>
                  <td>int64</td>
                </tr>
                <tr>
                  <td>Pclass</td>
                  <td>int64</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>object</td>
                </tr>
                <tr>
                  <td>Sex</td>
                  <td>object</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>float64</td>
                </tr>
                <tr>
                  <td>SibSp</td>
                  <td>int64</td>
                </tr>
                <tr>
                  <td>Parch</td>
                  <td>int64</td>
                </tr>
                <tr>
                  <td>Ticket</td>
                  <td>object</td>
                </tr>
                <tr>
                  <td>Fare</td>
                  <td>float64</td>
                </tr>
                <tr>
                  <td>Cabin</td>
                  <td>object</td>
                </tr>
                <tr>
                  <td>Embarked</td>
                  <td>object</td>
                </tr>
              </tbody>
            </table>
          </>
        }
        substepOutputDesc={""}
      />

      <Substep
        substepDesc={
          <>
            <ul className="list">
              <li>
                <span className="codespan">dataset.shape</span> returns number
                of rows and columns in the dataset.
              </li>
            </ul>
          </>
        }
        substepCode={`dataset.shape`}
        substepOutput={`(418, 12)`}
        substepOutputDesc={""}
      />

      <Substep
        substepDesc={
          <>
            <ul className="list">
              <li>
                <span className="codespan">dataset.count()</span> function
                returns the number of non-null values in each column. Which
                helps to identify <strong>missing data</strong>
              </li>
            </ul>
          </>
        }
        substepCode={`dataset.count()`}
        substepOutput={
          <>
            <table className="outputTable">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Non-null Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PassengerId</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Survived</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Pclass</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Sex</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>332</td>
                </tr>
                <tr>
                  <td>SibSp</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Parch</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Ticket</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Fare</td>
                  <td>417</td>
                </tr>
                <tr>
                  <td>Cabin</td>
                  <td>91</td>
                </tr>
                <tr>
                  <td>Embarked</td>
                  <td>418</td>
                </tr>
              </tbody>
            </table>
          </>
        }
        substepOutputDesc={
          <>
            <p>
              There are missing values in the dataset which needs to be handled
              through appropriate data cleaning or imputation techniques
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>Age:</strong> 332 values → 86 missing
              </li>
              <li>
                <strong>Fare:</strong> 417 values → 1 missing
              </li>
              <li>
                <strong>Cabin:</strong> 91 values → 327 missing
              </li>
            </ul>
            <p>
              We will use the standard imputer from the Sklearn library and
              replace missing values with <strong>most_frequent</strong> values
            </p>
            <p>Other strategies</p>
            <ul className="list-disc list-inside">
              <li>mean</li>
              <li>median</li>
              <li>Removing those tuples</li>
            </ul>
          </>
        }
      />

      <StepBlock
        step_id="step2"
        stepName="Handling missing data"
        stepDesc={
          <>
            <ul className="list">
              <li>
                Missing values in the Age, Cabin, and Fare columns are handled
                using the <span className="codespan">SimpleImputer</span>.
              </li>
              <li>
                The imputer fills missing values with the most frequent (mode)
                value in each column
              </li>
            </ul>
          </>
        }
        stepCode={`from sklearn.impute import SimpleImputer
si = SimpleImputer(missing_values=np.nan, strategy='most_frequent')
si.fit(dataset[['Age', 'Cabin', 'Fare']])
dataset[['Age', 'Cabin', 'Fare']] = si.transform(dataset[['Age', 'Cabin', 'Fare']])`}
        stepOutput={""}
        stepOutputDesc={""}
        stepNumber={2}
      />

      <Substep
        substepDesc={
          <>
            <ul className="list">
              <li>Check again</li>
            </ul>
          </>
        }
        substepCode={`dataset.count()`}
        substepOutput={
          <>
            <table className="outputTable">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Non-null Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PassengerId</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Survived</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Pclass</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Sex</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>SibSp</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Parch</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Ticket</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Fare</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Cabin</td>
                  <td>418</td>
                </tr>
                <tr>
                  <td>Embarked</td>
                  <td>418</td>
                </tr>
              </tbody>
            </table>
          </>
        }
        substepOutputDesc={<>Now no missing values present in the dataset</>}
      />

      <StepBlock
        step_id="step3"
        stepName="Exploring feature distributions"
        stepDesc={
          <>
            <ul className="list">
              <li>
                We will generate box plots for selected numerical features to
                help detect <strong>outliers</strong> and understand their
                distributions.
              </li>
            </ul>
          </>
        }
        stepCode={`# Box plots
features = ['Age', 'Fare', 'SibSp', 'Parch']
plt.figure(figsize=(6, 7))
for i, col in enumerate(features):
    plt.subplot(2, 2, i + 1)
    sns.boxplot(y=dataset[col])
    plt.title(f"Boxplot of {col}")
plt.tight_layout()
plt.show()`}
        stepOutput={
          <>
            <Image
              src="/assets/output/boxplot.png"
              className="boxplotImage"
              width={440}
              height={440}
              alt="boxplot"
            />
          </>
        }
        stepOutputDesc={
          <>
            <p>
              Removing outliers in many cases improves model performance by
              reducing noise.
            </p>
            <ul className="list"> 
              <li>Median age is ~20, several outliers above ~60 years</li>
              <li>Majority of passengers paid low fares, below ~50.</li>
              <li>
                Many outliers, including fares above 100, 200, and even over
                500, indicate luxury tickets or 1st class passengers.
              </li>
              <li>
                Most passengers had no siblings/spouses aboard. Some outliers
                with upto 8 siblings/spouses
              </li>
              <li>
                Again, most had no parents/children aboard. Outliers had up to 9
                family members.
              </li>
            </ul>
            <p>
              In our case outliers are genuine and meaningful, therefore we will
              not remove them
            </p>
          </>
        }
        stepNumber={3}
      />

      <StepBlock
        step_id="step4"
        stepName="Feature relationships"
        stepDesc={
          <>
            <ul className="list">
              <li>
                The heatmap is a visual representation of the correlation matrix
                for all numeric features in the dataset.
              </li>
              <li>Used to find strong predictors for the target variable </li>
              <li>
                Used to detect multicollinearity, which can affect models like
                linear regression.
              </li>
            </ul>
          </>
        }
        stepCode={`# Correlation heatmap
plt.figure(figsize=(10, 6))
sns.heatmap(dataset.corr(numeric_only=True), annot=True)
plt.title("Correlation Heatmap")
plt.show()`}
        stepOutput={
          <>
            <Image
              src="/assets/output/heatmap.png"
              className="heatmapImage"
              width={420}
              height={300}
              alt="boxplot"
            />
          </>
        }
        stepOutputDesc={
          <>
            <p>
              <strong>Key observations:</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>SibSp vs Parch - 0.31</strong>, Moderate positive
                correlation — passengers with siblings often had
                parents/children too{" "}
              </li>
              <li>
                <strong>Parch vs Survived - 0.16</strong>, Weak positive
                correlation — having parents/children on board slightly
                increased survival chances.
              </li>
              <li>
                <strong>SibSp vs Survived - 0.10</strong>, Weak positive
                correlation — similar to above, but weaker.
              </li>
              <li>
                <strong>Pclass vs Survived - -0.11</strong>, Weak negative
                correlation — lower class (3rd class) had lower survival rates.
              </li>
              <li>
                <strong>PassengerId correlations - ~0</strong>, No meaningful
                correlation with any other variable — as expected.
              </li>
            </ul>
          </>
        }
        stepNumber={4}
      />

      <Substep
        substepDesc={
          <>
            <ul className="list">
              <li>
                There is also a direct way to perform correlation analysis
                between selected numerical features
              </li>
              <li>
                <span className="codespan">.corr()</span> by default computes
                the Pearson correlation coefficient between the columns.
              </li>
            </ul>
          </>
        }
        substepCode={`# Correlation analysis
correlation = dataset[['Age', 'Fare']].corr()
print(correlation)`}
        substepOutput={`          Age      Fare
Age   1.000000  0.363797
Fare  0.363797  1.000000`}
        substepOutputDesc={""}
      />
    </div>
  );
};

export default SampleData;
