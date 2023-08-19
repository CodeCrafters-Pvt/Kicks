import { useState } from "react";
import { useParams,useNavigate } from 'react-router-dom';
import AuthLayout from "../../components/layout/AuthLayout"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Input,Button} from "../../components"
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../reducers';

export default function ResetPassword() {
    let { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const initialValues={
        password: '',
        confirmPassword:''
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required("required")
            .min(8, "must be at least 8 characters"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match")
            .required("required"),
    });

    const handleResetPassword = (values) => {
        setIsLoading(true)
        const data={resetToken:token,newPassword:values.password}
        dispatch(resetPassword(data))
        .unwrap()
        .then(() => {
            navigate('/login')
            setIsLoading(false)
          })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
          });
      };

  return (
    <AuthLayout>
        <h5 className='font-heading text-4xl mt-[15vh] '>Reset Password</h5>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleResetPassword}>
            {({errors})=>(
                <Form>
                    <div className='flex flex-col '>
                    <Field 
                    name="password"  
                    component={Input}
                    type="password" 
                    label="Password"
                    placeholder="Password"
                    errorId="password" 
                    errorMsg={errors?.password} 
                    isBtnClicked={isClicked}
                    />
                    <Field 
                    name="confirmPassword"  
                    component={Input}
                    type="password" 
                    label="Confirm Password"
                    placeholder="Re-Enter Password"
                    errorId="confirmPassword" 
                    errorMsg={errors?.confirmPassword} 
                    isBtnClicked={isClicked}
                    />
                    <Button 
                    text="Reset"
                    variant="dark"
                    className="mt-3"
                    onClick={()=>{setIsClicked(true)}}
                    onMouseUp={()=>setIsClicked(false)}
                    disabled={isLoading}
                    />
            </div>
                </Form>
            )}
        </Formik>
        
    </AuthLayout>
  )
}
