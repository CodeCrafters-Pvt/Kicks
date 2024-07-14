import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImages, clearImages } from "../redux/slices/imageUploaderSlice"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Button, ImageUploader,showToast } from '../components';
import { useAddProductMutation } from "../redux/api/productApiSlice"

const NewProduct = () => {
  const dispatch = useDispatch()
  const [addProduct] = useAddProductMutation()
  const [isClicked, setIsClicked] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);



  const handleAddProduct = async (data,_onSubmitProps_) => {
    if(selectedFiles.length>0){
    const folderName=`${data.productID} - ${data.productName}`
    await dispatch( uploadImages({ images: selectedFiles,folderName }))
    .unwrap()
    .then((res)=>{
      console.log("images:",res)
      data.images=res
      dispatch(clearImages())
    })}
    console.log(data)
    showToast(
      addProduct(data),
      ()=>{
          setIsClicked(false)
          _onSubmitProps_.resetForm()
      },
      (err)=>{console.log(err)}
    )}


  const initialValues = {
    productID: '',
    productName: '',
    brandName: '',
    regularPrice: '',
    sellingPrice: '',
    sizes: {
      size: '',
      colors: {
        color: '',
      },
    },
    productDesc: '',
    category: '',
    productCollection: '',
    images:null
  };

  const validationSchema = Yup.object().shape({
    productID: Yup.string()
      .required('required'),
    productName: Yup.string()
      .required('required'),
    brandName: Yup.string()
      .required('required'),
    regularPrice: Yup.string()
      .required('required'),
    sellingPrice: Yup.string()
      .required('required'),
    productDesc: Yup.string()
      .required('required'),
    category: Yup.string()
      .required('required'),
    productCollection: Yup.string()
      .required('required'),
    sizes: Yup.object().shape({
      size: Yup.string().required("Required"),
      colors: Yup.object().shape({
        color: Yup.string().required("Required"),
      })
    }),
  });





  return (
    <div className="bg-gray-200 min-h-screen  flex items-center justify-center p-8">
      <div className="bg-white shadow-md p-8 rounded-md ">
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
        <Formik initialValues={initialValues} onSubmit={handleAddProduct} validationSchema={validationSchema}>
          {({ errors, setFieldValue }) => (
            <Form className="w-full w-100%  flex flex-col">
              <div className="flex items-center justify-between mb-4">
                {/* Left side (fields) */}
                <div className="flex flex-col">
                  <Field
                    name="productID"
                    label="Product ID"
                    component={Input}
                    errorId="productID"
                    isBtnClicked={isClicked}
                    errorMsg={errors.productID}

                  />
                  <Field
                    name="productName"
                    label="Product Name"
                    component={Input}
                    errorId="productName"
                    isBtnClicked={isClicked}
                    errorMsg={errors.productName}
                  />
                  <Field
                    name="productCollection"
                    type="select"
                    label="Product Collection"
                    component={Input}
                    options={[{ label: "men", value: "men" }, { label: "women", value: "women" }, { label: "kids", value: "kids" }, { label: "Unisex", value: "Unisex" }]}
                    setFieldValue={setFieldValue}
                    errorId="productCollection"
                    isBtnClicked={isClicked}
                    showError
                    errorMsg={errors.productCollection}
                  />

                  <Field
                    name="category"
                    type="select"
                    label="Category"
                    component={Input}
                    options={[{ label: "Shoe", value: "Shoe" }, { label: "Sneaker", value: "Sneaker" }, { label: "Flip Flops", value: "Flip Flops" }, { label: "Heels", value: "Heels" }]}
                    setFieldValue={setFieldValue}
                    errorId="category"
                    isBtnClicked={isClicked}
                    showError
                    errorMsg={errors.category}
                  />

                  <Field
                    name="brandName"
                    type="select"
                    label="Brand Name"
                    component={Input}
                    options={[{ label: "Adidas", value: "Adidas" }, { label: "Nike", value: "Nike" }, { label: "Bata", value: "Bata" }, { label: "DSI", value: "DSI" }]}
                    setFieldValue={setFieldValue}
                    errorId="brandName"
                    isBtnClicked={isClicked}
                    showError
                    errorMsg={errors.brandName}
                  />
                </div>
                <div className="flex flex-col mx-4 ">
                  <Field
                    name="sizes.size"
                    type="select"
                    label="Size"
                    component={Input}
                    options={[{ label: "30", value: "30" }]}
                    setFieldValue={setFieldValue}
                    errorId="size"
                    isBtnClicked={isClicked}
                    showError
                    errorMsg={errors.sizes?.size}
                  />
                  <Field
                    name="sizes.colors.color"
                    type="color"
                    label="Color"
                    component={Input}
                    options={["#FF0000","#00FF00","#0000FF","#FEEFFF","#000080","#000000","#800080","#FFC0CB", "#A52A2A","#808080","#0047AB","#808000","#228B22","#800000","#FFD700","#C0C0C0","#B76E79"]}
                    errorMsg={errors.sizes?.colors?.color}
                    errorId="color"
                    isBtnClicked={isClicked}
                    setFieldValue={setFieldValue}
                  />
                  <Field
                    name="productDesc"
                    textArea
                    label="Product Description"
                    component={Input}
                    errorId="productDesc"
                    isBtnClicked={isClicked}
                    errorMsg={errors.productDesc}
                  />
                  <Field
                    name="regularPrice"
                    label="Regular Price"
                    component={Input}
                    errorId="regularPrice"
                    isBtnClicked={isClicked}
                    errorMsg={errors.regularPrice}
                  />
                  <Field
                    name="sellingPrice"
                    label="Sale Price"
                    component={Input}
                    errorId="sellingPrice"
                    isBtnClicked={isClicked}
                    errorMsg={errors.sellingPrice}
                  />
                </div>

                {/* Right side (image and buttons) */}
                <div className="flex flex-col items-end  my-4">
                  <ImageUploader setSelectedFiles={setSelectedFiles} />
                  <div className="flex gap-4">
                    <Button
                      className="bg-green-500 text-white rounded px-4 py-2 my-3"
                      text='Create'
                      onClick={() => { setIsClicked(true) }}
                      onMouseUp={() => setIsClicked(false)}
                    />

                    <Button
                      type="reset"
                      className="bg-red-500 text-white rounded px-4 py-2 my-3"
                      text="Clear"
                      onClick={() => dispatch(clearImages())}
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
};

export default NewProduct;










