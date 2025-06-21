import { supabase } from "@utils/db";

export const DELETE = async (req) => {
  const bucket = "plot";
  const data = await req.json();

  const extractFilePath = (url) => {
    const prefix = `/storage/v1/object/public/${bucket}/`;
    const index = url.indexOf(prefix);
    return index !== -1 ? url.substring(index + prefix.length) : null;
  };

  const boxplotPath = extractFilePath(data.boxplot_url);
  const heatmapPath = extractFilePath(data.heatmap_url);

  const filesToDelete = [boxplotPath, heatmapPath].filter(Boolean);

  if (filesToDelete.length > 0) {
    const { error } = await supabase.storage.from(bucket).remove(filesToDelete);

    if (error) {
      console.error("Error deleting files from Supabase:", error);
      return new Response(JSON.stringify({ error: "File deletion failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify({ message: "Files deleted and output reset" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
