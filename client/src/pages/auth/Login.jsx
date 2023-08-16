import { Formik, Form, Field } from 'formik';
import {Link,useNavigate } from 'react-router-dom';
import { Input,Button,AuthLayout } from '../../components';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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
    

    return (
    <AuthLayout>
        <Formik initialValues={initialValues} onSubmit={handleLogin}>
        {() => (
            <Form>
            <div className='flex flex-col '>
            <h5 className='font-heading text-4xl mt-20 mb-5 '>Welcome <br/> Back</h5>
                <Field name="email" label="E-mail" component={Input} placeholder="E-mail"/>
                <Field name="password" type="password" label="Password" component={Input} placeholder="Password"/>
                <Link to="/" className='text-primary self-end'>
                    <small >Forgot password?</small>
                </Link>
                <Button text="Login"  className='m-1 mt-3 w-full'/>
            </div>
            </Form>)}
        </Formik>
    </AuthLayout>
    )
}
