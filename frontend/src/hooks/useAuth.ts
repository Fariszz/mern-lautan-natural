import { payloadType } from "@/types/BaseResponse";
import { jwtDecode } from "jwt-decode";

export const getPayload = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const payload: payloadType = jwtDecode(token);
    return payload;
  }
};

export const isExpiredToken = () => {
  const payload = getPayload();
  if (payload) {
    if (payload?.exp * 1000 < Date.now()) {
      return true;
    } else {
      return false;
    }
  }
  return true;
};

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const payload: payloadType = jwtDecode(token);
    return payload?.role;
  }
  return "";
};

// export const isValidateUser = () => {
//   if (getUserRole() === "") return false;
//   return true;
// };

export const isLogin = getUserRole() === "mahasiswa" || getUserRole() === "dosen" ? true : false;
