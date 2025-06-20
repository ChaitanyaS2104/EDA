import { useState, useEffect } from "react";
import StepBlock from "./StepBlock";
import Substep from "./Substep";
import Image from "next/image";

const CustomData = ({ file }) => {
  const [dtypesTable, setDtypesTable] = useState(null);
  // const fetchDtypes = async () => {
  //   try {
  //     const res = await fetch("/api/execute/dtypes");
  //     const data = await res.json();

  //     const table = (
  //       <table className="outputTable">
  //         <thead>
  //           <tr>
  //             <th>Column Name</th>
  //             <th>Data Type</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {Object.entries(data).map(([col, dtype]) => (
  //             <tr key={col}>
  //               <td>{col}</td>
  //               <td>{dtype}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     );

  //     setDtypesTable(table);
  //   } catch (err) {
  //     console.error("Error fetching dtypes:", err);
  //     setDtypesTable(<p>Failed to load data types.</p>);
  //   }
  // };

  const [shape, setShape] = useState({ rows: 0, columns: 0 });

  // const fetchShape = async () => {
  //   try {
  //     const res = await fetch("/api/execute/shape");
  //     const data = await res.json();

  //     // Now directly use rows and columns
  //     const { rows, columns } = data;

  //     setShape({ rows, columns });
  //   } catch (err) {
  //     console.error("Error fetching shape:", err);
  //     setShape({ rows: 0, columns: 0 }); // fallback value
  //   }
  // };

  const [countsTable, setcountsTable] = useState(null);
  const [countsData, setCountsData] = useState(null);
  // const fetchCountsTable = async () => {
  //   try {
  //     const res = await fetch("/api/execute/count");
  //     const data = await res.json();

  //     const countTable = (
  //       <table className="outputTable" id="countsTable">
  //         <thead>
  //           <tr>
  //             <th>Column Name</th>
  //             <th>Non-null count</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {Object.entries(data).map(([col, dtype]) => (
  //             <tr key={col}>
  //               <td>{col}</td>
  //               <td>{dtype}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     );
  //     setcountsTable(countTable);
  //     setCountsData(data);
  //   } catch (err) {
  //     console.error("Error fetching dtypes:", err);
  //     setcountsTable(<p>Failed to load data types.</p>);
  //   }
  // };

  const [missingCount, setMissingCount] = useState(0);
  const [missingCols, setMissingCols] = useState([]);
  const [missingColsBy, setMissingColsBy] = useState([]);

  // const checkMissingData = () => {
  //   let tempCount = 0;
  //   let tempCols = [];
  //   let tempBy = [];

  //   if (!shape || !countsData) return;
  //   Object.entries(countsData).forEach(([col, countStr]) => {
  //     const count = parseInt(countStr, 10);
  //     if (count < shape.rows) {
  //       tempCount++;
  //       tempCols.push(col);
  //       tempBy.push(shape.rows - count);
  //     }
  //   });
  //   setMissingCount(tempCount);
  //   setMissingCols(tempCols);
  //   setMissingColsBy(tempBy);
  // };

  const [updatedCountsTable, setUpdatedCountsTable] = useState(null);
  // const fetchUpdatedCountsTable = async () => {
  //   try {
  //     const res = await fetch("/api/execute/updated-count");
  //     const data = await res.json();

  //     const countTable = (
  //       <table className="outputTable" id="countsTable">
  //         <thead>
  //           <tr>
  //             <th>Column Name</th>
  //             <th>Non-null count</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {Object.entries(data).map(([col, dtype]) => (
  //             <tr key={col}>
  //               <td>{col}</td>
  //               <td>{dtype}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     );
  //     setUpdatedCountsTable(countTable);
  //   } catch (err) {
  //     console.error("Error fetching dtypes:", err);
  //     setUpdatedCountsTable(<p>Failed to load data types.</p>);
  //   }
  // };

  const [boxplot, setBoxplot] = useState(null);
  const [loadingBoxplot, setLoadingBoxplot] = useState(true);
  // const fetchBoxPlot = async () => {
  //   try {
  //     const res = await fetch("/api/output/boxplot");
  //     const data = await res.json();
  //     const imageUrl = `${data.imageUrl}?t=${Date.now()}`;
  //     setBoxplot(imageUrl);
  //     setLoadingBoxplot(false);
  //   } catch (err) {
  //     console.error("Error fetching dtypes:", err);
  //     setBoxplot(<p>Failed to load boxplot.</p>);
  //     setLoadingBoxplot(false);
  //   }
  // };

  const [boxplotData, setBoxplotData] = useState({});
  const [loadingBoxplotdata, setLoadingBoxplotdata] = useState(true);
  // const fetchBoxPlotData = async () => {
  //   try {
  //     const res = await fetch("/api/output/boxplot-data");
  //     const data = await res.json();
  //     setBoxplotData(data);
  //     setLoadingBoxplotdata(false);
  //   } catch (err) {
  //     console.error("Error fetching dtypes:", err);
  //     setBoxplotData(<p>Failed to load boxplot data.</p>);
  //     setLoadingBoxplotdata(false);
  //   }
  // };

  const [heatmap, setHeatmap] = useState(null);
  const [loadingHeatmap, setLoadingHeatmap] = useState(true);
  // const fetchHeatmap = async () => {
  //   try {
  //     const res = await fetch("/api/output/heatmap");
  //     const data = await res.json();
  //     setHeatmap(data.imageUrl);
  //     setLoadingHeatmap(false);
  //   } catch (err) {
  //     setLoadingHeatmap(false);
  //     console.error("Error fetching dtypes:", err);
  //     setHeatmap(<p>Failed to load heatmap.</p>);
  //   }
  // };

  const [correlation, setCorrelation] = useState({});
  const [loadingHeatmapData, setLoadingHeatmapData] = useState(true);
  // const fetchCorrelation = async () => {
  //   try {
  //     const res = await fetch("/api/output/heatmap-corr");
  //     const data = await res.json();
  //     setCorrelation(data);
  //     setLoadingHeatmapData(false);
  //   } catch (err) {
  //     console.error("Error fetching dtypes:", err);
  //     setLoadingHeatmapData(false);
  //     setCorrelation(<p>Failed to load correlation data.</p>);
  //   }
  // };

  const [correlationMatrix, setCorrelationMatrix] = useState({});
  const [loadingCorrelationMatrix, setLoadingCorrelationMatrix] =
    useState(true);
  // const fetchCorrelationMatrix = async () => {
  //   try {
  //     const res = await fetch("/api/output/corr2");
  //     const data = await res.json();
  //     setCorrelationMatrix(data);
  //     setLoadingCorrelationMatrix(false);
  //   } catch (err) {
  //     console.error("Error fetching dtypes:", err);
  //     setLoadingCorrelationMatrix(false);
  //     setCorrelationMatrix(<p>Failed to load correlation data.</p>);
  //   }
  // };

  // useEffect(() => {
  //   checkMissingData();
  // }, [shape, countsData]);

  // const [selectedColumns, setSelectedColumns] = useState("");
  // useEffect(() => {
  //   let temp = missingCols.map((col) => `"${col}"`).join(", ");
  //   setSelectedColumns(temp);
  // }, [missingCols]);

  useEffect(() => {
    // fetchDtypes();
    // fetchShape();
    // fetchCountsTable();
    // fetchUpdatedCountsTable();
    // fetchBoxPlot();
    // fetchBoxPlotData();
    // fetchHeatmap();
    // fetchCorrelation();
    // fetchCorrelationMatrix();
  }, [file]);
  return (
    <div className="stepContainerCustom">
      <StepBlock
        step_id="step1"
        stepName="Importing libraries & Understanding the dataset"
        stepDesc={
          <>
            <ul>
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
{/* 
      <Substep
        substepDesc={
          <>
            <>
              <ul>
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
      /> */}

      {/* <Substep
        substepDesc={
          <>
            <ul>
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
      /> */}
{/* 
      <Substep
        substepDesc={
          <>
            <ul>
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
            <ul>
              Dynamically render additional missing columns
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
                <ul>
                  <li>mean</li>
                  <li>median</li>
                  <li>Removing those tuples</li>
                </ul>
              </>
            ) : null}
          </>
        }
      />  */}

      {/* <StepBlock
        step_id="step2"
        stepName="Handling missing data"
        stepDesc={
          <>
            <ul>
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
      /> */}

      {/* <Substep
        substepDesc={
          <>
            <ul>
              <li>Check again</li>
            </ul>
          </>
        }
        substepCode={`dataset.count()`}
        substepOutput={updatedCountsTable}
        substepOutputDesc={<>Now no missing values present in the dataset</>}
      /> */}
{/* 
      <StepBlock
        step_id="step3"
        stepName="Exploring feature distributions"
        stepDesc={
          <>
            <ul>
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
              <Image src={boxplot} className="boxplotImage" width={20} height={20} alt="boxplot"/>
            )}
          </>
        }
        stepOutputDesc={
          <>
            <p>
              Removing outliers in many cases improves model performance by
              reducing noise.
            </p>
            <ul>
              <ul>
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
            </ul>
            <p>In our case we will not remove them</p>
          </>
        }
        stepNumber={3}
      /> */}

      {/* <StepBlock
        step_id="step4"
        stepName="Feature relationships"
        stepDesc={
          <>
            <ul>
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
              <Image src={heatmap} className="heatmapImage" width={20} height={20} alt="heatmap"/>
            )}
          </>
        }
        stepOutputDesc={
          <>
            <p>
              <strong>Key observations: Highest correlations</strong>
            </p>
            <ul>
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
      /> */}

      {/* <Substep
        substepDesc={
          <>
            <ul>
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
              <tbody>
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
      /> */}
    </div>
  );
};

export default CustomData;
