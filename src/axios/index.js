import React, { useState } from "react";
import axios from "axios";
import store from "../redux/store";

export default function useFetch() {
  let token = null;
  let BASEURL = "";
  BASEURL = "http://localhost:3001/api";

  function makeRequest(method, url, data = {}) {
    return new Promise((resolve, reject) => {
      try {
        axios({
          method,
          url: `${BASEURL}${url}`,
          data: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
          .then((res) => {
            resolve(res.data)
          })
          .catch((error) => {
            reject(error.response)
          });
      } catch (error) {
        reject(error?.message);
      }
    });
  }
  return makeRequest;
}
