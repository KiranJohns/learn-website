import React, { useState } from 'react'
import axios from 'axios'


export default function useFetch() {

    let token = null;

    let BASEURL = ""
    BASEURL = "https://www.testkiran.online/api"

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function makeRequest(method, url, data = {}) {
        console.log(method);
        setLoading(true)
        setResponse(null);
        setError(null);
        console.log(BASEURL, url)
        try {
            axios({
                method,
                url: `${BASEURL}${url}`,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true

            }).then(res => {
                setLoading(false)
                setResponse(res?.data);
                setError(null);
                console.log(res);
            }).catch(error => {
                setLoading(false)
                setResponse(null);
                setError(error?.response?.data);
                console.log(error?.response?.data);
            })
        } catch (error) {

            setLoading(false)
            setResponse(null);
            setError(error?.message);
            console.log(error?.message)

        }
       
        
    }
    return[response, error, loading, makeRequest]
}