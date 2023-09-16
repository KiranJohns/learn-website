import React, { useState } from 'react'
import axios from 'axios'


export default function useFetch() {


    let BASEURL = ""
    BASEURL = ""


  return function makeRequest(method, url, data = {}){

    const [response, setResponse] = useState({
        response: null,
        loading: true,
        error: null
    })

    try {
        axios({
            method,
            url,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setResponse(()=>{
                return{response: res?.data, loading : false, error:null}
            })
        }).catch(error => {
            setResponse(()=>{
                return{response: null, loading : false, error:error?.response}
            })
           
        })
    } catch (error) {

        setResponse(()=>{
            return{response: null, loading : false, error:error?.message}
        })
    }
    return[response.loading, response.response, response.error ]
    }
 
}