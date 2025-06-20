//File path to pass to python script
import { getUploadedFileName } from "@utils/fileStore.js";
import {exec} from "child_process";
import path from "path";

export default GET = ("/updated-count", (req, res) => {
  const fileForPython = getUploadedFileName();
  exec(`${pythonPath} "${path.join(process.cwd(), "python_scripts", "updatedCount.py")}" "${fileForPython}"`, (error, stdout, stderr) => {
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