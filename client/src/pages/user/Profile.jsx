import axios from 'axios'
import { useState,useEffect } from 'react'

export default function Profile() {
    const [user,setUser]=useState(null)
    useEffect(()=>{
        axios.get('http://localhost:3001/users/getUser/iamshamly2@gmail.com',{
            headers:{
                'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNiZGI5ZWIwZjQ0NDVmZGY5MjUxZTYiLCJpYXQiOjE2OTEzMzk2OTYsImV4cCI6MTY5MTU5ODg5Nn0.kG7e8IuOTPugGsO9sYXfnkmWAcd6yx7HEvWf8-RCWD8`
        }
    })
        .then((res)=>{
            console.log(res.data)
            // setUser(res)
        })
        .catch((error)=>{
            console.log("Error", error);
        })
    },[])
    console.log(user)
  return (
    <>
        hi
    </>
  )
}
