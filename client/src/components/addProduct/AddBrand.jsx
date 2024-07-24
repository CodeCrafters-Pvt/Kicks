import { useState } from "react";
import { Popup, Button, Input, showToast } from "..";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useCreateBrandMutation } from "../../redux/api/brandApiSlice";

export default function AddBrand() {
  const [createBrand] = useCreateBrandMutation();

  const initialValues = {
    name: "",
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async (values) => {
    setIsClicked(true);
    setIsLoading(true);
    await showToast(
      createBrand(values),
      () => {
        setIsLoading(false);
        setIsPopupOpen(false);
      },
      () => {
        setIsLoading(false);
        setIsPopupOpen(false);
      }
    );
  };

  return (
    <div className="absolute right-3  ">
      <Button
        type="button"
        variant="dark"
        text="+ Brand"
        className="!py-1 !px-2 text-sm"
        onClick={() => setIsPopupOpen(true)}
      />
      {isPopupOpen && (
        <Popup setIsPopupOpen={setIsPopupOpen}>
          <h3 className="text-xl font-semibold mb-2">Add New Brand</h3>
          <Formik initialValues={initialValues}>
            {({ errors, touched, values }) => (
              <Form>
                <Field
                  name="name"
                  label="Brand name"
                  component={Input}
                  placeholder="name"
                  errorId="name"
                  errorMsg={touched.name && errors.name}
                />

                <div className="flex gap-3 justify-center mt-4">
                  <Button
                    text="Cancel"
                    onClick={() => {
                      setIsClicked(true);
                      setIsPopupOpen(false);
                    }}
                    onMouseUp={() => setIsClicked(false)}
                    disabled={isLoading}
                  />
                  <Button
                    text="Add Brand"
                    variant="dark"
                    onClick={() => {
                      handleAdd(values);
                    }}
                    onMouseUp={() => setIsClicked(false)}
                    disabled={isLoading}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </Popup>
      )}
    </div>
  );
}
