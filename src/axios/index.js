import React, { useState } from 'react'
import axios from 'axios'


export default function useFetch() {

    let token = null;

    let BASEURL = ""
    BASEURL = "http://3.86.46.94:80/api"

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return function makeRequest(method, url, data = {}) {
        console.log(method);
        setLoading(true)
        setData(null);
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
                setData(res?.data);
                setError(null);
                console.log(res);
            }).catch(error => {
                setLoading(false)
                setData(null);
                setError(error?.response?.data);
                console.log(error?.response?.data);
            })
        } catch (error) {

            setLoading(false)
            setData(null);
            setError(error?.message);
            console.log(error?.message)

        }
       
        
    }

}