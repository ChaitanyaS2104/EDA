import React from "react";
import StepCode from "./StepCode"
import StepOutput from "./StepOutput"


const StepBlock = ({ stepName, stepDesc, stepCode, stepOutput, stepNumber, stepOutputDesc, step_id}) => {
  return (
    <div id={step_id}>
      <div className="step w-full">
      <span className="stepNum">{stepNumber}</span>
        <h1 className="font-bold text-2xl">{stepName}</h1>
        {stepDesc}
        <StepCode code={stepCode}/>
      </div>
      {stepOutput !== '' && <StepOutput output={stepOutput} stepOutputDesc={stepOutputDesc} />}
    </div>
  );
};

export default StepBlock;
