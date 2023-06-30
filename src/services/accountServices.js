import http from "./httpServices";
const apiEndPoint = `/accounts`;
let accessTokenKey = "a_t";
let refreshTokenKey = "r_t";
export async function login(data) {
  return http.post(apiEndPoint + "/auth/login", {
    email: data.email,
    password: data.password,
  });
}
// export function saveAccessTokens(accessToken, refreshToken) {
//   localStorage.setItem(accessTokenKey, accessToken);
//   localStorage.setItem(refreshTokenKey, refreshToken);
// }
// export function getAccessTokenData() {
//   try {
//     let accessTokenData = localStorage.getItem(accessTokenKey);
//     let data = jwtDecode(accessTokenData);
//     return data;
//   } catch (ex) {
//     return null;
//   }
// }
export function getTokenPair() {
  return {
    accessToken: localStorage.getItem(accessTokenKey),
    refreshToken: localStorage.getItem(refreshTokenKey),
  };
}
export async function registerAccount(data) {
  await http.post(apiEndPoint + "/registration", {
    name: data.name,
    email: data.email,
    password: data.password,
  });
  /** we are auto loging user in with same password for better UX */
  return login(data);
}
export async function verifyRegistration({ token }) {
  return http.post(
    apiEndPoint + "/registration/verification",
    {},
    {
      headers: { "x-register-token": token },
    }
  );
}
export async function resendVerification(data) {
  return http.post(apiEndPoint + "/registration/verification/emails", {
    userId: data.userId,
  });
}
export async function recoverAccount(data) {
  return http.post(apiEndPoint + "/recovery", {
    email: data.email,
  });
}
export async function verifyRecovery(data) {
  return http.post(
    apiEndPoint + "/recovery/verification",
    {
      password: data.password,
    },
    {
      headers: { "x-recovery-token": data.token },
    }
  );
}
export async function refreshToken(data) {
  return http.get(apiEndPoint + "/auth/refresh-token");
}
export async function logout() {
  try {
    await http.delete(apiEndPoint + "/auth/logout");
    return localStorage.clear();
  } catch (err) {}
}
