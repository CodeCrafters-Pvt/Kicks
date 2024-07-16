import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, showToast } from "../components";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../redux/api/productApiSlice";

export default function AddProduct() {
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();
  const initialValues = {
    productId: "",
    name: "",
    brand: "",
    markedPrice: "",
    sellingPrice: "",
    description: "",
    gender: "",
    type: "",
  };

  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    productId: Yup.string().required("Product ID is required"),
    name: Yup.string().required("Name is required"),
    brand: Yup.string().required("Brand is required"),
    markedPrice: Yup.number()
      .required("Marked Price is required")
      .positive("Marked Price must be positive"),
    sellingPrice: Yup.number()
      .required("Selling Price is required")
      .positive("Selling Price must be positive"),
    description: Yup.string().required("Description is required"),
    gender: Yup.string().required("Gender is required"),
    type: Yup.string().required("Type is required"),
  });

  const handleAdd = async (values) => {
    setIsLoading(true);
    await showToast(
      createProduct(values),
      () => {
        setIsLoading(false);
        navigate("/");
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleAdd}>
        {({ errors, touched }) => (
          <Form>
            <div>
              <Field
                name="productId"
                label="Product ID"
                component={Input}
                placeholder="Product ID"
                errorId="productId"
                errorMsg={touched.productId && errors.productId}
              />
              <Field
                name="name"
                label="Name"
                component={Input}
                placeholder="Name"
                errorId="name"
                errorMsg={touched.name && errors.name}
              />
              <Field
                name="brand"
                label="Brand"
                component={Input}
                placeholder="Brand"
                errorId="brand"
                errorMsg={touched.brand && errors.brand}
              />
              <Field
                name="markedPrice"
                label="Marked Price"
                component={Input}
                placeholder="Marked Price"
                errorId="markedPrice"
                errorMsg={touched.markedPrice && errors.markedPrice}
              />
              <Field
                name="sellingPrice"
                label="Selling Price"
                component={Input}
                placeholder="Selling Price"
                errorId="sellingPrice"
                errorMsg={touched.sellingPrice && errors.sellingPrice}
              />
              <Field
                name="description"
                label="Description"
                component={Input}
                placeholder="Description"
                errorId="description"
                errorMsg={touched.description && errors.description}
              />
              <Field
                name="gender"
                label="Gender"
                component={Input}
                placeholder="Gender"
                errorId="gender"
                errorMsg={touched.gender && errors.gender}
              />
              <Field
                name="type"
                label="Type"
                component={Input}
                placeholder="Type"
                errorId="type"
                errorMsg={touched.type && errors.type}
              />
              <Button
                text="Add"
                variant="dark"
                className="m-1 mt-1 mb-4"
                onClick={() => {
                  setIsClicked(true);
                }}
                onMouseUp={() => setIsClicked(false)}
                disabled={isLoading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
