import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Input,Button} from "../components"
import { useDispatch } from 'react-redux';
import { reqResetPassword } from '../reducers';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRequested, setIsRequested] = useState(false);
    const initialValues={
        email:''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid") .required("required"),
    });


    const handleRequestReset = (values) => {
        setIsLoading(true)
        dispatch(reqResetPassword(values))
        .unwrap()
        .then(() => {
            setIsRequested(true)
            setIsLoading(false)
          })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
          });
      };



  return (
    <>
        <h5 className='font-heading text-4xl mt-[20vh] '>Reset Password</h5>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRequestReset}>
            {({errors})=>(
                <Form>
                    <div className='flex flex-col  '>
                    <Field 
                    name="email"  
                    component={Input}
                    type="text" 
                    label="E-mail"
                    placeholder="E-mail"
                    errorId="email" 
                    errorMsg={errors?.email} 
                    isBtnClicked={isClicked}
                    />
                    <Button 
                    text="Confirm"
                    variant="dark"
                    className="mt-5"
                    onClick={()=>{setIsClicked(true)}}
                    onMouseUp={()=>setIsClicked(false)}
                    disabled={isLoading}
                    />
            </div>
                </Form>
            )}
        </Formik>
        
    </>
  )
}
