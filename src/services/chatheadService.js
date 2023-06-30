import http from "./httpServices";
const apiEndPoint = `/chatheads`;
export function createChatead(data) {
  return http.post(`${apiEndPoint}/`, {
    name: data.name,
    description: data.description || "",
  });
}
export function updateChathead(dataId, data) {
  return http.put(`${apiEndPoint}/${dataId}/`, {
    name: data.name,
    description: data.description,
  });
}
export function listChateads(query) {
  return http.get(`${apiEndPoint}/?${query || ""}`);
}
export function getChatead(dataId) {
  return http.get(`${apiEndPoint}/${dataId}`);
}
export function hardDeleteChatead(dataId) {
  return http.delete(`${apiEndPoint}/${dataId}/hard`);
}
