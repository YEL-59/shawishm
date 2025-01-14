import Cookies from "js-cookie";


export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  sessionStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("refreshToken", refreshToken);

  const accessTokenExpiresIn = new Date(new Date().getTime() + 60 * 60 * 1000);
  const refreshTokenExpiresIn = new Date(new Date().getTime() +  24 * 60 * 60 * 1000); 

  Cookies.set("accessToken", accessToken, {
    expires: accessTokenExpiresIn,
    sameSite: "Lax",
    secure: true,
  });

  Cookies.set("refreshToken", refreshToken, {
    expires: refreshTokenExpiresIn,
    sameSite: "Lax",
    secure: true,
  });
};

export const getAccessToken = () => {
  return (
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    Cookies.get("accessToken")
  );
};

export const getRefreshToken = () => {
  return (
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken") ||
    Cookies.get("refreshToken")
  );
};

export const clearTokens = (navigate) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  navigate("/login");
};
