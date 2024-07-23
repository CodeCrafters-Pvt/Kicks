import { useEffect, useState } from "react";
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

  const brands = [
    { value: "nike", label: "Nike" },
    { value: "adidas", label: "Adidas" },
    { value: "puma", label: "Puma" },
    { value: "reebok", label: "Reebok" },
    { value: "new_balance", label: "New Balance" },
    { value: "asics", label: "ASICS" },
    { value: "under_armour", label: "Under Armour" },
    { value: "converse", label: "Converse" },
    { value: "skechers", label: "Skechers" },
    { value: "vans", label: "Vans" },
    { value: "brooks", label: "Brooks" },
    { value: "saucony", label: "Saucony" },
    { value: "fila", label: "Fila" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "unisex", label: "Unisex" },
    { value: "kids", label: "Kids" },
  ];

  const shoeTypes = [
    { value: "running", label: "Running" },
    { value: "casual", label: "Casual" },
    { value: "formal", label: "Formal" },
    { value: "sports", label: "Sports" },
    { value: "boots", label: "Boots" },
    { value: "sandals", label: "Sandals" },
    { value: "slippers", label: "Slippers" },
    { value: "sneakers", label: "Sneakers" },
    { value: "heels", label: "Heels" },
  ];

  return (
    <div className="mt-6 bg-white w-2/3 mx-auto rounded-lg">
      <Formik initialValues={initialValues} onSubmit={handleAdd}>
        {({ errors, touched, setFieldValue }) => (
          <Form>
            {/* <span className=" font-heading">Product Details</span> */}
            <div className="flex justify-between mx-12 ">
              <div className="mt-6 w-flex flex-col">
                <div className="flex">
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
                    label="Product Name"
                    component={Input}
                    placeholder="Name"
                    errorId="name"
                    errorMsg={touched.name && errors.name}
                  />
                </div>
                <Field
                  name="description"
                  label="Description"
                  component={Input}
                  placeholder="Description"
                  errorId="description"
                  errorMsg={touched.description && errors.description}
                  rows="5"
                  textArea
                />
                <Field
                  name="brand"
                  label="Brand"
                  component={Input}
                  placeholder="Brand"
                  errorId="brand"
                  errorMsg={touched.brand && errors.brand}
                  type="select"
                  options={brands}
                  setFieldValue={setFieldValue}
                />
                <div className="flex">
                  <div className="w-1/2">
                    <Field
                      name="gender"
                      label="Gender"
                      component={Input}
                      placeholder="Gender"
                      errorId="gender"
                      errorMsg={touched.gender && errors.gender}
                      type="select"
                      options={genderOptions}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className="w-1/2">
                    <Field
                      name="type"
                      label="Type"
                      component={Input}
                      placeholder="Type"
                      errorId="type"
                      errorMsg={touched.type && errors.type}
                      type="select"
                      options={shoeTypes}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                </div>
                <div className="flex">
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
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  <Button
                    text="Cancel"
                    onClick={() => {
                      setIsClicked(true);
                    }}
                    onMouseUp={() => setIsClicked(false)}
                    disabled={isLoading}
                  />
                  <Button
                    text="Add Product"
                    variant="dark"
                    onClick={() => {
                      setIsClicked(true);
                    }}
                    onMouseUp={() => setIsClicked(false)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
