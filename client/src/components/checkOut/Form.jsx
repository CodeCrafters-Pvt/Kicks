import { Formik, Form as FormComponent, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../";
import { useEffect } from "react";

export default function Form({
  initialValues,
  setOrderData,
  isClicked,
  formRef,
  setCurrentStep,
}) {
  const Row = ({ fields }) => (
    <div className="flex my-3 gap-8">
      {fields.map((field, index) => {
        return (
          <Field
            key={index}
            name={field.name}
            component={Input}
            bordered={false}
            hasLabel={false}
            placeholder={field.placeholder}
            errorId={field.name}
            errorMsg={field.error}
            isBtnClicked={isClicked}
          />
        );
      })}
    </div>
  );

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("required").min(2, "Too short"),
    lastName: Yup.string().required("required").min(2, "Too short"),
    email: Yup.string().required("required").email("Invalid format"),
    phone: Yup.string()
      .required("required")
      .matches(/^\d{10}$/, "Invalid"),
    address: Yup.string().required("required").min(5, "Too short"),
    city: Yup.string().required("required"),
    country: Yup.string().required("required").min(2, "Too short"),
    orderNotes: Yup.string().max(200, "Should not exceed 200 characters"),
  });

  return (
    <div>
      <span className="font-heading">Billing Details</span>
      <Formik
        initialValues={initialValues}
        innerRef={formRef}
        onSubmit={(values) => {
          setOrderData(values);
          setCurrentStep(1);
        }}
        validationSchema={validationSchema}
      >
        {({ errors }) => (
          <FormComponent>
            <Row
              fields={[
                {
                  name: "firstName",
                  placeholder: "First Name",
                  error: errors?.firstName,
                },
                {
                  name: "lastName",
                  placeholder: "Last Name",
                  error: errors?.lastName,
                },
              ]}
            />
            <Row
              fields={[
                {
                  name: "email",
                  placeholder: "Email",
                  error: errors?.email,
                },
                {
                  name: "phone",
                  placeholder: "Phone",
                  error: errors?.phone,
                },
              ]}
            />
            <Row
              fields={[
                {
                  name: "address",
                  placeholder: "Address",
                  error: errors?.address,
                },
                {
                  name: "city",
                  placeholder: "City",
                  error: errors?.city,
                },
              ]}
            />
            <Row
              fields={[
                {
                  name: "country",
                  placeholder: "Country",
                  error: errors?.country,
                },
              ]}
            />
            <div className="my-8 ">
              <Field
                name="orderNotes"
                component={Input}
                placeholder="Order Notes"
                bordered={false}
                textArea
                isBtnClicked={isClicked}
              />
            </div>
          </FormComponent>
        )}
      </Formik>
    </div>
  );
}
