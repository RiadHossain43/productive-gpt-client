import axios, { AxiosError } from "axios";
const HTTP_DEFAULT = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL + process.env.REACT_APP_API_VERSION,
});
function setJwt(accessToken, refreshToken) {
  HTTP_DEFAULT.defaults.headers.common["x-auth-accesstoken"] = `${accessToken}`;
  HTTP_DEFAULT.defaults.headers.common[
    "x-auth-refreshtoken"
  ] = `${refreshToken}`;
}
let http = {
  instance: HTTP_DEFAULT,
  get: HTTP_DEFAULT.get,
  post: HTTP_DEFAULT.post,
  put: HTTP_DEFAULT.put,
  patch: HTTP_DEFAULT.patch,
  delete: HTTP_DEFAULT.delete,
  setJwt,
  HTTPError: AxiosError,
};
export default http;
