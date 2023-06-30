import http from "./httpServices";
const apiEndPoint = `/payments/subscriptions`;
export async function subscribe(data) {
  return http.post(`${apiEndPoint}/`, {
    nameOnCard: data.nameOnCard,
    cardNumber: data.cardNumber,
    cardCvc: data.cardCvc,
    cardExpMonth: data.cardExpDate.split("/")[0],
    cardExpYear: data.cardExpDate.split("/")[1],
  });
}
export async function history() {
  return http.get(`${apiEndPoint}/history`);
}
export async function unsubscribe(dataId, data) {
  return http.delete(`${apiEndPoint}`);
}
export async function manageSubscription() {
  return http.get(`${apiEndPoint}/customer-portal`);
}
