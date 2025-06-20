import Image from "next/image";

const FileUploader = ({ upload, refreshFunction, fileName, setFileName, setFilepath }) => {

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "No file chosen");

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const {path, url} = await res.json()
        setFilepath({path:path, url:url});
        refreshFunction();
      } catch (err) {
        console.error("Upload failed", err);
      }
    }
    event.target.value = null;
  };

  return (
    <div>
      <label htmlFor="file-upload" className="custom-file-upload">
        <Image src={upload} className="buttonIcon" alt="upload" width={20} height={20}/>Upload dataset
      </label>
      <span className="file-name">{fileName}</span>
      <input id="file-upload" type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
