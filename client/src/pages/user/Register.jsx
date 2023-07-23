import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios'
import {Link} from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { Input,Button } from '../../components/general';
import toast, {Toaster} from 'react-hot-toast';
import circle from "../../assets/Ellipse.webp"
import shoePic from "../../assets/register-bg.webp"



export default function Register() {
  const [initialValues,setInitialValues]=useState({
    email: '',
    userAccount: {
      username: '',
      password: '',
    },
    confirmPassword: '',
  })
  const [isConfirmed,setIsConfirmed]=useState(false)
  const [otp, setOtp] = useState('');
  


  const reqOtp= async (values)=>{
    toast.dismiss()
    const toastId=toast.loading('Loading...')
    const data={email:values.email,userName:values.userAccount.username};
    return await axios.post("http://localhost:3001/users/signup/verify",data).then((res)=>{
      setInitialValues(values)
      toast.success(res.data.message,{id: toastId})
      setIsConfirmed(true)
    }).catch((err)=>{
      toast.error(err.response.data.error,{id: toastId})
    })
  }

  const resendOtp= async (values)=>{
    toast.dismiss()
    const toastId=toast.loading('Loading...')
    const data={email:values.email,userName:values.userAccount.username};
    await axios.post("http://localhost:3001/users/signup/verify",data).then((res)=>{
      toast.success(res.data.message,{id: toastId})
    }).catch((err)=>{
      toast.error(err.response.data.error,{id: toastId})
    })
  }

  

  const registerUser = async (data) =>{
    toast.dismiss()
    const toastId=toast.loading('Loading...')
    const {confirmPassword ,...userData} =data
    const reqData = {...userData, otp:otp}
    await axios.post("http://localhost:3001/users/signup",reqData).then((res)=>{
      toast.success(res.data.message,{id: toastId})
    }).catch((err)=>{
      toast.error(err.response.data.error,{id: toastId})
    })
  }
 

  return (
    <div className='flex justify-center items-center h-screen relative bg-userMgtBg'>
    <Toaster/>
    <img src={circle} alt="circle" className='absolute top-5 left-[12%] w-[20%] '/>
    <div className=' bg-light w-[60%] mt-10 h-[75%] z-10 flex'>
    <img src={shoePic} alt="shoe" className=''/>
    <div className='w-1/2 flex flex-col items-center gap-10'>
    <h5 className='font-heading text-4xl mt-10'>Create An Account</h5>
      <Formik initialValues={initialValues} onSubmit={registerUser}>
          {({values}) => (
            <Form>
            
            {!isConfirmed?
            <div className='flex flex-col'>
              <Field name="userAccount.username" label="User Name" component={Input} placeholder="User Name"/>
              <Field name="email" label="E-mail" component={Input} placeholder="E-mail"/>
              <Field name="userAccount.password" type="password" label="Password" component={Input} placeholder="Password"/>
              <Field name="confirmPassword" type="password" label="Confirm Password" component={Input} placeholder="Password"/>
              <small className='ml-2 mt-1'>Already have an account? <Link to="/" className='text-primary'>Sign-In</Link></small>
                <Button text="Register" type="button" onClick={()=>reqOtp(values)} className='m-1 mt-3 w-full'/>
            </div>
            :
            <div className=' flex flex-col justify-between'>
              <p className='mt-3 mb-5'>OTP sent to {values.email}</p>
              <div>
                <p className='mt-3'>Enter Otp</p>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  shouldAutoFocus
                  renderSeparator={<span>-</span>}
                  inputType="tel"
                  renderInput={(props) => <input {...props} />}
                  containerStyle=" flex justify-between"
                  inputStyle="outline outline-1 mx-2 my-10 rounded-sm text-3xl"
                />
              </div>
              <div className='flex gap-2 my-5'>
              <Button text="Confirm" className="w-1/2"/>
              <Button text="Back" className="w-1/2 text-primary bg-light" onClick={()=>{setIsConfirmed(false)}}/>
              </div>
              <p>Didn&apos;t receive OTP?&nbsp;
              <text className='text-primary underline cursor-pointer' onClick={()=>{resendOtp(initialValues)}}>
                Resend
              </text>
              </p>
            </div>}
            </Form> 
          )}
      </Formik> 
    </div>
    </div>     
    </div>
  )
}
