import { useState, useEffect } from 'react';
import { Formik, Form, Field} from 'formik';
import axios from 'axios'
import Input from '../../../components/user/register/Input';
import Image from '../../../components/products/ProductImage/Image';
import ImageUploader from '../../../components/products/ProductImage/ImageUploader'

const NewProduct = () => {
  
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  
   const addProduct = (data) => {

    console.log(data);
   
    axios.post("http://localhost:3001/products", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      setProductID(data.productID); // Set the productID state
      setProductName(data.productName); // Set the productName state
  };
      
      const initialValues = {
        productID: '',
        productName: '',
        brandName:'',
        regularPrice:'',
        sellingPrice:'',
        sizes: {
          size: '',
          colors: {
            color: '',
          },
        },
        productDesc: '',
        category:'',
        image: '', // Add image field to the initial values
      };

      
    
  
  
      return (
      <div className="bg-gray-200 min-h-screen  flex items-center justify-center p-8">
      <div className="bg-white shadow-md p-8 rounded-md ">
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <Formik initialValues={initialValues} onSubmit={addProduct}>
        <Form className="w-full w-100%  flex flex-col">
          <div className="flex items-center justify-between mb-4">
            {/* Left side (fields) */}
            <div className="flex flex-col">
              <Field name="productID" label="Product ID" component={Input} />
              <Field name="productName" label="Product Name" component={Input} />
              <Field
                  name="productCollection"
                  type="select"
                  label="Product Collection"
                  component={Input}
            
              />
              <Field name="category" type="select" label="Category" component={Input} />
              <Field name="brandName" type="select" label="Brand Name" component={Input} />
              </div>
              <div className="flex flex-col mx-4 ">
              <Field name="sizes.size" type="select" label="Size" component={Input} />
              <Field
                name="sizes.colors.color"
                type="select"
                label="Color"
                component={Input}
              />
              <Field name="productDesc" label="Product Description" component={Input} />
              <Field name="regularPrice" label="Regular Price" component={Input} />
              <Field name="sellingPrice" label="Sale Price" component={Input} />
            </div>

            {/* Right side (image and buttons) */}
            <div className="flex flex-col items-end  my-4">
             
              <ImageUploader productID={productID} productName={productName}  />
              <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white rounded px-4 py-2 my-3"
                  >
                    Create Product
                  </button>
                  <button
                    type="reset"
                    className="bg-red-500 text-white rounded px-4 py-2 my-3"
                  >
                    Clear
                  </button>
                </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
    </div>
   
      );
    };

export default NewProduct








 
 
