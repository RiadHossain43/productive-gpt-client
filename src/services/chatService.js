import http from "./httpServices";
const apiEndPoint = `/chats`;
export function createChat(data) {
  return http.post(`${apiEndPoint}/`, {
    chathead: data.chathead,
    prompt: data.prompt,
    response: data.response,
  });
}
export function updateChat(dataId, data) {
  return http.put(`${apiEndPoint}/${dataId}/`, {
    name: data.name,
    description: data.description,
  });
}
export function reactOnChat(dataId, data) {
  return http.put(`${apiEndPoint}/${dataId}/reactions`, {
    reaction: data.reaction,
  });
}
export function listChats(query) {
  return http.get(`${apiEndPoint}/?${query || ""}`);
}
export function getChat(dataId) {
  return http.get(`${apiEndPoint}/${dataId}`);
}
export function hardDeleteChat(dataId) {
  return http.delete(`${apiEndPoint}/${dataId}/hard`);
}
