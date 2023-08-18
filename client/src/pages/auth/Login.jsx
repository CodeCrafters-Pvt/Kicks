import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Link,useNavigate } from 'react-router-dom';
import { Input,Button,AuthLayout } from '../../components';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers';


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    
    const handleLogin = (values) => {
        dispatch(login(values))
        .unwrap()
        .then(() => {
            navigate('/')
          })
        .catch((error) => {
            console.log(error)
          });
      };



    const initialValues={
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid')
          .required('required'),
        password: Yup.string()
          .required('required')
      });
    

    return (
    <AuthLayout>
        <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={validationSchema}>
        {({errors}) => (
            <Form>
            <div className='flex flex-col '>
            <h5 className='font-heading text-4xl mt-20 mb-5 '>Welcome <br/> Back</h5>
                <Field name="email" label="E-mail" component={Input} placeholder="E-mail"
                 errorId="email" errorMsg={errors?.email} isBtnClicked={isClicked}
                 />
                <Field name="password" type="password" label="Password" component={Input} placeholder="Password"
                 errorId="password" errorMsg={errors?.password} isBtnClicked={isClicked}
                />
                <Link to="/" className='text-primary self-end'>
                    <small >Forgot password?</small>
                </Link>
                <Button text="Login"  className='m-1 mt-3 w-full' 
                    onClick={()=>{setIsClicked(true)}}
                    onMouseUp={()=>setIsClicked(false)}
                />
            </div>
            </Form>)}
        </Formik>
    </AuthLayout>
    )
}
