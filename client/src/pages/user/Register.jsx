import { useState } from 'react';
import { Formik, Form, Field } from 'formik';;
import * as Yup from 'yup';
import {Link,useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { Input,Button,AuthLayout } from '../../components';
import { useDispatch } from 'react-redux';
import { requestOtp,registerUser} from '../../reducers';



export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialValues,setInitialValues]=useState({
    email: '',
    userAccount: {
      username: '',
      password: '',
    },
    confirmPassword: '',
  })
  const [isClicked, setIsClicked] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid').required('Required'),
    userAccount: Yup.object().shape({
      username: Yup.string().required('Required'),
      password: Yup.string().min(6, 'must be at least 6 characters').required('Required'),
    }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('userAccount.password'), null], 'Passwords must match')
      .required('Required'),
  });

  const [otp, setOtp] = useState('');
  const [isConfirmed,setIsConfirmed]=useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const reqOtp = (values,isValid,dirty) => {
      setIsClicked(true)
      if(isValid && dirty){
        setIsLoading(true)
        dispatch(requestOtp(values))
        .unwrap()
        .then(() => {
          setIsConfirmed(true);
          setInitialValues(values);
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false)
        });
      }
      
  };

  const resendOtp = async (values)=>{
    const data={
      email:values.email,
      userAccount:{
        username:values.userAccount.username
      }};
    dispatch(requestOtp(data))
  }

  const handleRegister=(values)=>{
    const {confirmPassword ,...userData} =values
    const data = {...userData, otp:otp}
    dispatch(registerUser(data))
    .unwrap()
    .then(() =>{
      setTimeout(() => {
        navigate('/signin');
      }, 1500);
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  return (
    <AuthLayout>
      <h5 className='font-heading text-4xl mt-10'>Create An Account</h5>
      <Formik initialValues={initialValues} onSubmit={handleRegister} validationSchema={validationSchema}>
          {({values,errors,isValid,dirty,validateForm}) => (
            <Form>
            {!isConfirmed?
            <div className='flex flex-col'>
              <Field name="userAccount.username" label="User Name" component={Input} placeholder="User Name" 
               isBtnClicked={isClicked} errorId="userName" errorMsg={errors?.userAccount?.username}/>
              <Field name="email" label="E-mail" component={Input} placeholder="E-mail" type="text"
              isBtnClicked={isClicked} errorId="email"  errorMsg={errors?.email}/>
              <Field name="userAccount.password" type="password" label="Password" component={Input} placeholder="Password" 
              isBtnClicked={isClicked} errorId="password"  errorMsg={errors?.userAccount?.password}/>
              <Field name="confirmPassword" type="password" label="Confirm Password" component={Input} placeholder="Password" 
              isBtnClicked={isClicked} errorId="confirmPass"  errorMsg={errors?.confirmPassword}/>
              <small className='ml-2 mt-1'>Already have an account? <Link to="/" className='text-primary'>Sign-In</Link></small>
                <Button text="Register" type="button" className='m-1 mt-3 w-full' disabled={isLoading}
                  onClick={() => 
                  { 
                    validateForm()
                    reqOtp(values,isValid,dirty)
                    }} 
                  onMouseUp={()=>setIsClicked(false)}
                    />
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
              <Button text="Confirm"  className="w-1/2"/>
              <Button text="Back" className="w-1/2 text-primary bg-light" onClick={()=>{setIsConfirmed(false)}}/>
              </div>
              <p>Didn&apos;t receive OTP?&nbsp;
              <span className='text-primary underline cursor-pointer' onClick={()=>{resendOtp(initialValues)}}>
                Resend
              </span>
              </p>
            </div>}
            </Form> 
          )}
      </Formik> 
    </AuthLayout>
  )
}
