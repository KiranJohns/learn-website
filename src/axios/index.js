import React, { useState } from 'react'
import axios from 'axios'


export default function useFetch() {

  let token = null;

    let BASEURL = ""
    BASEURL = "http://13.42.152.69:80/api"

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  return function makeRequest(method, url, data = {}){
   console.log(method);
    setLoading(true)
    setData(null);
    setError(null);
    console.log(BASEURL,url)
    try {
        axios({
            method,
            url:`${BASEURL}${url}`,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setLoading(false)
            setData(res?.data);
            setError(null);
        }).catch(error => {
            setLoading(false)
            setData(null);
            setError(error?.message);
           
        })
    } catch (error) {

        setLoading(false)
        setData(null);
        setError(error?.message);

    }
    return[loading, response, error ]
    }
 
}