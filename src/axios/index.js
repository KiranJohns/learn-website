import axios from "axios";

export const getToken = () => localStorage.getItem(`learnforcare_access`);
export const getUserType = () => localStorage.getItem("userType");
export default function fetchData() {
  let BASEURL = "";
  BASEURL = "https://www.testkiran.online/api/user";
  // BASEURL = "http://localhost:3002/api/user";

  // /www.learnforcare.co.uk

  async function makeRequest(method, url, data = {}) {
    let token = localStorage.getItem(`learnforcare_access`);

    return new Promise((resolve, reject) => {
      try {
        axios({
          method,
          url: `${BASEURL}${url}`,
          data: data,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            console.log(error.response);
            reject(error.response);
          });
      } catch (error) {
        reject(error?.message);
      }
    });
  }
  return makeRequest;
}
