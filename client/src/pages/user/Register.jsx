import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'
import Input from '../../components/user/register/Input';


export default function Register() {
  const [isConfirmed,setIsConfirmed]=useState(false)

  const reqOtp=(data)=>{
    console.log(data)
    axios.post("http://localhost:3001/users/signup/verify",data).then((res)=>{
      console.log(res.data);
      setIsConfirmed(true)
    }).catch((err)=>{
      console.log(err.message)
    })
  }

  const registerUser = (data) =>{
    console.log(data)
    axios.post("http://localhost:3001/users/signup",data).then((res)=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err)
    })
  }

  const initialValues = {
    email: '',
    userAccount: {
      username: '',
      password: '',
    },
    confirmPassword: '',
    otp: '',
  };

 

  return (
    <>
    <Formik initialValues={initialValues} onSubmit={registerUser}>
        {({values}) => (
          <Form>
          {!isConfirmed?
          <>
            <Field name="userAccount.username" label="User Name" component={Input} />
            <Field name="email" label="E-mail" component={Input} />
            <Field name="userAccount.password" type="password" label="Password" component={Input} />
            <Field name="confirmPassword" type="password" label="Confirm Password" component={Input} />
            <button type="button" className='outline outline-1 m-2' 
            onClick={()=>reqOtp({email:values.email,username:values.userAccount.username})} >register</button>
          </>
          :
          <>
            Otp sent to {values.email}
            <Field name="otp" label="enter OTP" component={Input} />
            <button className='outline outline-1 m-2'>confirm</button>
          </>}
          </Form> 
        )}
    </Formik> 
      
    </>
  )
}
