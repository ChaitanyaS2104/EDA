// app/api/upload/route.js
import { supabase } from "@utils/db";
import { setUploadedFileName, getUploadedFileName } from "@utils/fileStore";
import path from "path";

export const runtime = "nodejs"; // 👈 use Node.js runtime for compatibility

export const POST = async(req) =>  {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
  }
  const bucket = "dataset";
  const filePath = `${Date.now()}_${file.name}`;
  // Upload file buffer to Supabase storage
  const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
    contentType: file.type,
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }

  setUploadedFileName(filePath);

  const publicUrl = supabase.storage.from(bucket).getPublicUrl(filePath).data.publicUrl;

  return new Response(
    JSON.stringify({ success: true, path: filePath, url: publicUrl }),
    { status: 200 }
  );
}

export const GET = (req) => {
  const fullPath = getUploadedFileName();
  if (!fullPath) {
    return new Response(JSON.stringify({ error: "No file uploaded yet" }), { status: 404 });
  }

  return new Response(JSON.stringify({ filename: path.basename(fullPath) }), { status: 200 });
}
