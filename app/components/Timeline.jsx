import React from "react";
const steps = [
  {
    title: "Data Loading & Understanding",
    description: "Import libraries, Load dataset, Check data types.",
  },
  {
    title: "Handling Missing Data",
    description: "Check for null / missing values, Impute or remove them.",
  },
  {
    title: "Exploring Distributions",
    description: "Check feature distributions, Detect outliers.",
  },
  {
    title: "Feature Relationships",
    description:
      "Use heatmaps, Correlation analysis, Bivariate & Multivariate analysis.",
  },
  { title: "Summarizing Insights", description: "List key trends & findings." },
];

export default function Timeline() {
  return (
    <div className="timeline">
      {steps.map((step, index) => (
        <a key={index} href={`#step${index + 1}`}>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
