import { useState, useEffect, use } from "react";
import StepBlock from "./StepBlock";
import Substep from "./Substep";
import Image from "next/image";

const CustomData = ({ file, outputData }) => {
  const [dtypesTable, setDtypesTable] = useState(null);
  const setDataTypes = (data) => {
    const table = (
      <table className="outputTable">
        <thead>
          <tr>
            <th>Column Name</th>
            <th>Data Type</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([col, dtype]) => (
            <tr key={col}>
              <td>{col}</td>
              <td>{dtype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    setDtypesTable(table);
  };

  const [shape, setShape] = useState({ rows: 0, columns: 0 });
  const getShapes = (data) => {
    const { rows, columns } = data;
    setShape({ rows, columns });
  };

  const [countsTable, setcountsTable] = useState(null);
  const [countsData, setCountsData] = useState(null);
  const getCountsTable = (data) => {
    const countTable = (
      <table className="outputTable" id="countsTable">
        <thead>
          <tr>
            <th>Column Name</th>
            <th>Non-null count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([col, dtype]) => (
            <tr key={col}>
              <td>{col}</td>
              <td>{dtype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    setcountsTable(countTable);
    setCountsData(data);
  };

  const [missingCount, setMissingCount] = useState(0);
  const [missingCols, setMissingCols] = useState([]);
  const [missingColsBy, setMissingColsBy] = useState([]);
  const checkMissingData = () => {
    let tempCount = 0;
    let tempCols = [];
    let tempBy = [];

    if (!shape || !countsData) return;
    Object.entries(countsData).forEach(([col, countStr]) => {
      const count = parseInt(countStr, 10);
      if (count < shape.rows) {
        tempCount++;
        tempCols.push(col);
        tempBy.push(shape.rows - count);
      }
    });
    setMissingCount(tempCount);
    setMissingCols(tempCols);
    setMissingColsBy(tempBy);
  };

  const [updatedCountsTable, setUpdatedCountsTable] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState("");
  const fetchUpdatedCountsTable = (data) => {
    const countTable = (
      <table className="outputTable" id="countsTable">
        <thead>
          <tr>
            <th>Column Name</th>
            <th>Non-null count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([col, dtype]) => (
            <tr key={col}>
              <td>{col}</td>
              <td>{dtype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    setUpdatedCountsTable(countTable);
  };

  const [boxplot, setBoxplot] = useState(null);
  const [loadingBoxplot, setLoadingBoxplot] = useState(true);
  const fetchBoxPlot = async (data) => {
    setBoxplot(data);
    setLoadingBoxplot(false);
  };

  const [boxplotData, setBoxplotData] = useState({});
  const [loadingBoxplotdata, setLoadingBoxplotdata] = useState(true);
  const fetchBoxPlotData = (data) => {
    setBoxplotData(data);
    setLoadingBoxplotdata(false);
  };

  const [heatmap, setHeatmap] = useState(null);
  const [loadingHeatmap, setLoadingHeatmap] = useState(true);
  const fetchHeatmap = (data) => {
    setHeatmap(data);
    setLoadingHeatmap(false);
  };

  const [correlation, setCorrelation] = useState({});
  const [loadingHeatmapData, setLoadingHeatmapData] = useState(true);
  const fetchCorrelation = (data) => {
    setCorrelation(data);
    setLoadingHeatmapData(false);
  };

  const [correlationMatrix, setCorrelationMatrix] = useState({});
  const [loadingCorrelationMatrix, setLoadingCorrelationMatrix] = useState(true);
  const fetchCorrelationMatrix = (data) => {
    setCorrelationMatrix(data);
    setLoadingCorrelationMatrix(false);
  };

  useEffect(() => {
    let temp = missingCols.map((col) => `"${col}"`).join(", ");
    setSelectedColumns(temp);
  }, [missingCols]);

  useEffect(()=>{
    checkMissingData();
  }, [countsData, shape])

  useEffect(() => {
    setDataTypes(outputData.dtypes);
    getShapes(outputData.shape);
    getCountsTable(outputData.non_null_counts);
    fetchUpdatedCountsTable(outputData.post_impute_counts);
    fetchBoxPlot(outputData.boxplot_url);
    fetchBoxPlotData(outputData.medians);
    fetchHeatmap(outputData.heatmap_url);
    fetchCorrelation(outputData.top_correlations);
    fetchCorrelationMatrix(outputData.correlation_matrix);
  }, [outputData]);

  return (
    <div className="stepContainerCustom w-full">
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
                  Import the dataset using{" "}
                  <span className="codespan">pd.read_csv()</span>. (Other
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
        substepCode={`dataset = pd.read_csv("${file}")
dataset.dtypes`}
        substepOutput={dtypesTable}
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
        substepOutput={`(${shape.rows}, ${shape.columns})`}
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
        substepOutput={countsTable}
        substepOutputDesc={
          <>
            {missingCount > 0 ? (
              <p>
                There are missing values in the dataset which need to be handled
                through appropriate data cleaning or imputation techniques.
              </p>
            ) : (
              <p>
                There are no missing values in the dataset, therefore no need
                for data cleaning or imputation techniques.
              </p>
            )}
            <ul className="list">
              {missingCols.map((element, index) => (
                <li key={element}>
                  <strong>{element}:</strong> {missingColsBy[index]} values
                  missing
                </li>
              ))}
            </ul>
            {missingCount > 0 ? (
              <>
                <p>
                  We will use the standard imputer from the Sklearn library and
                  replace missing values with <strong>most_frequent</strong>{" "}
                  values
                </p>
                <p>Other strategies:</p>
                <ul className="list">
                  <li>mean</li>
                  <li>median</li>
                  <li>Removing those tuples</li>
                </ul>
              </>
            ) : null}
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
                Missing values in the{" "}
                {missingCols.map((element, index) => (
                  <span key={element}>
                    {element}
                    {index !== missingCols.length - 1 && ", "}
                  </span>
                ))}{" "}
                columns are handled using the
                <span className="codespan">SimpleImputer</span>.
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
si.fit(dataset[[${selectedColumns}]])
dataset[[${selectedColumns}]] = si.transform(dataset[[${selectedColumns}]])`}
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
        substepOutput={updatedCountsTable}
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
        stepCode={
          loadingBoxplotdata
            ? `Loading...`
            : `# Box plots
features = [${Object.keys(boxplotData)
                .map((key) => `'${key}'`)
                .join(", ")}]
plt.figure(figsize=(6, 7))
for i, col in enumerate(features):
    plt.subplot(2, 2, i + 1)
    sns.boxplot(y=dataset[col])
    plt.title(f"Boxplot of {col}")
plt.tight_layout()
plt.show()`
        }
        stepOutput={
          <>
            {loadingBoxplot ? (
              <span>Loading...</span>
            ) : (
              <Image
                src={boxplot}
                className="boxplotImage"
                width={440}
                height={440}
                alt="boxplot"
              />
            )}
          </>
        }
        stepOutputDesc={
          <>
            <p>
              Removing outliers in many cases improves model performance by
              reducing noise.
            </p> 
              <ul className="list-disc list-inside">
                {loadingBoxplotdata ? (
                  <span>Loading...</span>
                ) : (
                  Object.entries(boxplotData).map(([key, value]) => (
                    <li key={key}>
                      Median of {key} : <strong>{value}</strong>
                    </li>
                  ))
                )}
              </ul>
            <p>In our case we will not remove them</p>
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
            {loadingHeatmap ? (
              <span>Loading...</span>
            ) : (
              <Image
                src={heatmap}
                className="heatmapImage"
                width={420}
                height={300}
                alt="heatmap"
              />
            )}
          </>
        }
        stepOutputDesc={
          <>
            <p>
              <strong>Key observations: Highest correlations</strong>
            </p>
            <ul className="list-disc list-inside">
              {loadingHeatmapData ? (
                <p>Loading correlation data...</p>
              ) : (
                correlation.map(
                  ({ feature1, feature2, correlation }, index) => (
                    <li key={index}>
                      {feature1} & {feature2} - <strong>{correlation}</strong>
                    </li>
                  )
                )
              )}
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
        substepCode={
          loadingCorrelationMatrix
            ? `Loading...`
            : `# Correlation analysis
correlation = dataset[[${Object.keys(correlationMatrix)
                .map((key) => `'${key}'`)
                .join(", ")}]].corr()
print(correlation)`
        }
        substepOutput={
          loadingCorrelationMatrix ? (
            <span>Loading...</span>
          ) : (
            <table style={{ border: "none" }}>
              <thead>
                <tr>
                  <th style={{ border: "none" }}></th>
                  {Object.keys(correlationMatrix).map((col) => (
                    <th key={col} style={{ border: "none" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm w-full">
                {Object.entries(correlationMatrix).map(([rowKey, row]) => (
                  <tr key={rowKey}>
                    <td style={{ border: "none" }}>
                      <strong>{rowKey}</strong>
                    </td>
                    {Object.keys(correlationMatrix).map((colKey) => (
                      <td key={colKey} style={{ border: "none" }}>
                        {row[colKey]?.toFixed(6)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
        substepOutputDesc={""}
      />
    </div>
  );
};

export default CustomData;
