import React, { useState } from "react";
import axios from "axios";
import store from "../redux/store";

export default function useFetch() {
  let BASEURL = "";
  BASEURL = "https://www.testkiran.online/api";
  
  // /www.learnforcare.co.uk

 async function makeRequest(method, url, data = {}) {
    let token = await localStorage.getItem(`learnforcare`);
    
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
            console.log('care')
            resolve(res.data)
          })
          .catch((error) => {
            console.log('learn')
            reject(error.response.data)
          });
      } catch (error) {
        
        reject(error?.message);
      }
    });
  }
  return makeRequest;
}
