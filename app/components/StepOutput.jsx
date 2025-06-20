import OutputDesc from "./outputDesc";
import Image from "next/image";

const StepOutput = ({ output, stepOutputDesc }) => {
  return (
    <>
      <div className="step_output">
        <span className="outputIcon">
          <Image src="/assets/output.svg" width={20} height={20} alt="Output_img"/>
        </span>
        <div>{output}</div>
        {stepOutputDesc !== '' && <OutputDesc stepOutputDesc={stepOutputDesc} />}
      </div>

    </>
  );
};

export default StepOutput;
