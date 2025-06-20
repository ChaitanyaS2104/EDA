//File path to pass to python script
import { getUploadedFileName } from "@utils/fileStore.js";
import {exec} from "child_process";
import path from "path";

const pythonPath = process.env.PYTHON_PATH || 'python';

export const GET = async("/dtypes", (req, res) => {
  const fileForPython = getUploadedFileName();
  
  exec(`${pythonPath} "${path.join(process.cwd(), "python_scripts", "get_dtypes.py")}" "${fileForPython}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: "Internal Server Error", details: error.message});
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      // you can still try to send stdout or an error
    }

    try {
      // Parse stdout as JSON if your python script outputs JSON
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr);
      res.status(500).json({ error: "Failed to parse Python output" });
    }
  });
});