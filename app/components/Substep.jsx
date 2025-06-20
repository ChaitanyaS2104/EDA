import React from "react";
import StepCode from "./StepCode"
import StepOutput from "./StepOutput"


const Substep = ({substepDesc, substepCode, substepOutput, substepOutputDesc}) => {
  return (
    <div>
      <div className="substep">        
        <div className="substepDesc">{substepDesc}</div>
        <StepCode code={substepCode}/>
      </div>
      {substepOutput !== '' && <StepOutput output={substepOutput} stepOutputDesc={substepOutputDesc} />}
    </div>
  );
};

export default Substep;
