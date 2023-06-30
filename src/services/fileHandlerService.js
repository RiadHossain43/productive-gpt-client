import http from "./httpServices";
import moment from "moment";
const apiEndPoint = `/file-manager`;
moment().format();
export function downloader(fileName, data) {
  const downloadUrl = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export async function uploadFileToS3(file, config) {
  try {
    let { data } = await http.get(`${apiEndPoint}/upload-url`, {
      headers: {
        "x-file-name": file.name,
      },
    });
    let uploadResponse = await http.put(data?.details?.uploadUrl, file, config);
    uploadResponse.data = { ...data };
    return uploadResponse;
  } catch (err) {
    console.log(err);
  }
}
export async function downloadFile(attachment) {
  try {
    const fileName = attachment?.Name || attachment?.Key?.split("/")[1];
    const { data } = await http.get(`${apiEndPoint}/signed-url`, {
      headers: {
        "x-file-name": fileName,
        "x-file-key": attachment?.Key || attachment?.key,
        "x-file-version": null,
        "x-file-bucket": attachment?.Bucket,
      },
    });
    const link = document.createElement("a");
    link.href = data.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (ex) {}
}
