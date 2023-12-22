export const url = "http://localhost:5000/api";

export const setHeaders = () => {
  const headers = {
    headers: {
      // 'Content-Type': 'application/json',
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
