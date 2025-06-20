// /pages/api/visuals/corr2.js
import { exec } from "child_process";
import path from "path";
import { getUploadedFileName } from "@utils/fileStore";

export const GET = (req, res) => {
  const filePath = getUploadedFileName();
  if (!filePath) return res.status(400).json({ error: "No file uploaded" });

  const pythonScript = path.join(process.cwd(), "python_scripts", "correlation_2.py");
  const pythonPath = process.env.PYTHON_PATH || "python";

  exec(`${pythonPath} "${pythonScript}" "${filePath}"`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: "Execution failed" });

    try {
      const data = JSON.parse(stdout);
      return res.json(data);
    } catch (err) {
      return res.status(500).json({ error: "Failed to parse Python output" });
    }
  });
}
