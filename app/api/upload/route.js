
//POST request to FAST API
export const POST = async (req) => {
  const formData = await req.formData();
  try {
    const res = await fetch("https://eda-fast-api.onrender.com/analyze/", {
      method: "POST",
      body: formData,
    });

    //All the outputs
    const data = await res.json();
    console.log(data)
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
};
