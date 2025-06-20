import React, { useEffect, useRef } from "react";
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/atom-one-dark.css'; 

hljs.registerLanguage('python', python);

const StepCode = ({ code }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = hljs.highlight(code, { language: 'python' }).value;
    }
  }, [code]);

  return (
    <div className="step_code">
      <pre>
        <code ref={codeRef} className="hljs">{code}</code>
      </pre>
    </div>
  );
};

export default StepCode;
