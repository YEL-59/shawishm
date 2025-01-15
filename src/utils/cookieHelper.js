import Cookies from "js-cookie";

export const setTokens = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("accessToken", accessToken);

  const accessTokenExpiresIn = new Date(new Date().getTime() + 60 * 60 * 1000); 

  Cookies.set("accessToken", accessToken, {
    expires: accessTokenExpiresIn,
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

export const clearTokens = (navigate) => {
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessToken");
  Cookies.remove("accessToken");


  navigate("/login");
};
