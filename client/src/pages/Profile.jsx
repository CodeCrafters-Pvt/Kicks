import axios from 'axios'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
    const user = useSelector(state => state.auth.user);
    console.log(user)
    
  return (
    <>
        hi
    </>
  )
}
