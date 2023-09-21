import React, { useState } from "react";
import axios from "axios";
import store from "../redux/store";

export default function useFetch() {
  let token = null;

  let BASEURL = "";
  BASEURL = "https://www.testkiran.online/api";

  function makeRequest(method, url, data = {}) {
    console.log(method);
    console.log(BASEURL, url);
    store.dispatch({
        type: 'SET_LOADING'
    })
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
            store.dispatch({
                type: "SET_RESPONSE",
                payload: res.data
            })
        })
        .catch((error) => {
            store.dispatch({
                type: "SET_ERROR",
                payload: error
            })
          console.log(error?.response?.data);
        });
    } catch (error) {
      console.log(error?.message);
    }
  }
  return makeRequest;
}
