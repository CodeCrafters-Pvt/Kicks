import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input, Button, showToast } from "../components";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [login] = useLoginMutation();

  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = async (values) => {
    setIsLoading(true);
    await showToast(
      login(values),
      (response) => {
        setIsLoading(false);
        navigate(from, { replace: true });
        dispatch(
          setCredentials({
            user: response.user,
            token: response.token,
            persist: isChecked,
          })
        );
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid").required("required"),
    password: Yup.string().required("required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({ errors }) => (
          <Form>
            <div className="flex flex-col ">
              <h5 className="font-heading text-4xl mt-20 mb-5 ">
                Welcome <br /> Back
              </h5>
              <Field
                name="email"
                label="E-mail"
                component={Input}
                placeholder="E-mail"
                errorId="email"
                errorMsg={errors?.email}
                isBtnClicked={isClicked}
              />
              <Field
                name="password"
                type="password"
                label="Password"
                component={Input}
                placeholder="Password"
                errorId="password"
                errorMsg={errors?.password}
                isBtnClicked={isClicked}
              />
              <div className="flex justify-between">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setIsChecked((prev) => !prev);
                  }}
                >
                  <Input
                    type="checkbox"
                    field="select"
                    className="mt-1 "
                    isChecked={isChecked}
                  />
                  <small className="mt-2">Trust device</small>
                </div>
                <Link
                  to="/reset-password"
                  className="text-primary self-end mb-1 "
                >
                  <small>Forgot password?</small>
                </Link>
              </div>

              <Button
                text="Login"
                variant="dark"
                className="m-1 mt-1 mb-4 w-full"
                onClick={() => {
                  setIsClicked(true);
                }}
                onMouseUp={() => setIsClicked(false)}
                disabled={isLoading}
              />

              <small className="text-right">
                No account?{" "}
                <Link to="/register" className="text-primary self-end">
                  Create an account
                </Link>
              </small>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
