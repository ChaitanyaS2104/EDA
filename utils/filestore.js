// /lib/fileStore.js
let uploadedFilePath = null;

export function setUploadedFileName(path) {
  uploadedFilePath = path;
}

export function getUploadedFileName() {
  return uploadedFilePath;
}

export function resetUploadedFileName() {
  uploadedFilePath = null;
}
