import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Button,
  showToast,
  ImageUploader,
  AddBrand,
  Loader,
} from "../components";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useFetchEnumsQuery,
  useGenerateIDQuery,
} from "../redux/api/productApiSlice";

export default function AddProduct() {
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();
  const { data: enums, isLoading: enumsLoading } = useFetchEnumsQuery();
  const { data: ID, isLoading: IDloading } = useGenerateIDQuery();

  const initialValues = {
    productId: ID,
    name: "",
    brand: "",
    markedPrice: "",
    sellingPrice: "",
    description: "",
    gender: "",
    type: "",
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const validationSchema = Yup.object().shape({
    productId: Yup.string().required("required"),
    name: Yup.string().required("required"),
    brand: Yup.string().required("required"),
    markedPrice: Yup.number().required("required").positive("must be positive"),
    sellingPrice: Yup.number()
      .required("required")
      .positive("must be positive"),
    gender: Yup.string().required("required"),
    type: Yup.string().required("required"),
  });

  const handleAdd = async (values) => {
    setIsLoading(true);
    await showToast(
      createProduct(values),
      () => {
        setIsLoading(false);
        if (isChecked) {
          navigate("/restock");
        } else {
          navigate("/admin");
        }
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  const brands =
    enums?.brandEnum.map((brand) => ({
      value: brand.id,
      label: brand.name,
    })) || [];

  const genderOptions =
    enums?.genderEnum.map((gender) => ({
      value: gender,
      label: gender.charAt(0).toUpperCase() + gender.slice(1),
    })) || [];

  const shoeTypes =
    enums?.typeEnum.map((type) => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
    })) || [];

  return enumsLoading || IDloading ? (
    <Loader />
  ) : (
    <div>
      <span className="font-heading text-2xl  block w-2/3 mx-auto my-2">
        Add Product
      </span>
      <div className="bg-white w-2/3 mx-auto rounded-lg shadow-md">
        <Formik
          initialValues={initialValues}
          onSubmit={handleAdd}
          validationSchema={validationSchema}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <div className="flex justify-between p-4 pb-10 gap-3">
                <div className="flex flex-col">
                  <div className="flex">
                    <Field
                      name="productId"
                      label="Product ID"
                      component={Input}
                      placeholder="Product ID"
                      errorId="productId"
                      errorMsg={touched.productId && errors.productId}
                      disabled={true}
                    />
                    <Field
                      name="name"
                      label="Product Name"
                      component={Input}
                      placeholder="Name"
                      errorId="name"
                      errorMsg={touched.name && errors.name}
                      isBtnClicked={isClicked}
                    />
                  </div>
                  <Field
                    name="description"
                    label="Description"
                    component={Input}
                    placeholder="Description"
                    errorId="description"
                    errorMsg={touched.description && errors.description}
                    rows={5}
                    textArea
                  />
                  <div className="relative">
                    <AddBrand />
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
                      isBtnClicked={isClicked}
                    />
                  </div>
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
                        isBtnClicked={isClicked}
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
                        isBtnClicked={isClicked}
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
                      isBtnClicked={isClicked}
                      type="number"
                    />
                    <Field
                      name="sellingPrice"
                      label="Selling Price"
                      component={Input}
                      placeholder="Selling Price"
                      errorId="sellingPrice"
                      errorMsg={touched.sellingPrice && errors.sellingPrice}
                      isBtnClicked={isClicked}
                      type="number"
                    />
                  </div>
                </div>
                <div className="w-1/2  flex flex-col justify-between">
                  <ImageUploader setSelectedFiles={setSelectedFiles} />
                  <div className="flex gap-3 relative self-end top-6">
                    <div
                      onClick={() => {
                        setIsChecked((prev) => !prev);
                      }}
                      className={`flex items-center mr-2 border-2  pr-2 rounded-md cursor-pointer
                    ${isChecked && "border-primary"}
                    `}
                    >
                      <Input
                        type="checkbox"
                        field="select"
                        className=""
                        isChecked={isChecked}
                      />
                      <span className="mt-1">Stock-Up</span>
                    </div>

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
    </div>
  );
}
