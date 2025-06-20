import { supabase } from "@utils/db";
import { resetUploadedFileName } from "@utils/fileStore";

export const POST = async (req) => {
  const bucket = "dataset";
  const data = await req.json();
  const filePath = await data.path; // get the stored path

  if (filePath) {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      console.error("Error deleting file from Supabase:", error);
      return new Response(JSON.stringify({ error: "File deletion failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  resetUploadedFileName();

  return new Response(JSON.stringify({ message: "Filename reset and file deleted" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
