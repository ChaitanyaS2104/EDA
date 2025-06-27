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
    <div className="timeline max-w-3xl pl-2.5 ">
      {steps.map((step, index) => (
        <a key={index} href={`#step${index + 1}`}>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3 className="font-bold text-lg">{step.title}</h3>
              <p className="text-md">{step.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
