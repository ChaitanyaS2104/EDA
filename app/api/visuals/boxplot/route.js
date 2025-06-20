// /pages/api/visuals/boxplot.js
import { exec } from "child_process";
import path from "path";
import { getUploadedFileName } from "@utils/fileStore";

export const GET =  (req, res)=>  {
  const filePath = getUploadedFileName();
  if (!filePath) return res.status(400).json({ error: "No file uploaded" });

  const pythonScript = path.join(process.cwd(), "python_scripts", "boxplot_generator.py");
  const pythonPath = process.env.PYTHON_PATH || "python";

  exec(`${pythonPath} "${pythonScript}" "${filePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("Boxplot error:", error.message);
      return res.status(500).json({ error: "Failed to generate boxplot" });
    }

    return res.json({ imageUrl: "/images/boxplots.png" }); // You may need to store this remotely later
  });
}
