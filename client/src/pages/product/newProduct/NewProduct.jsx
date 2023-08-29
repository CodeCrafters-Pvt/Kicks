import { useState, useEffect } from 'react';
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import {Input, Button} from '../../../components';
import ImageUploader from '../../../components/products/ProductImage/ImageUploader'

const NewProduct = () => {
  
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
    
   const addProduct = (data) => {

    console.log("bye",data);
   
    axios.post("http://localhost:3001/products", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("hi",err);
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
        productCollection:'',
        image: '', // Add image field to the initial values
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

          
  
      });
    
      
    
  
  
      return (
      <div className="bg-gray-200 min-h-screen  flex items-center justify-center p-8">
      <div className="bg-white shadow-md p-8 rounded-md ">
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <Formik initialValues={initialValues} onSubmit={addProduct} validationSchema={validationSchema}>
      {({errors,setFieldValue})=>(
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
                  options= {[{label:"men",value:"men"}, {label:"women",value:"women"}, {label:"kids",value:"kids"}, {label:"Unisex",value:"Unisex"}]}
                  setFieldValue={setFieldValue}
                  errorId="productCollection"
              isBtnClicked={isClicked}
                  errorMsg={errors.productCollection}
              />
              
              <Field 
              name="category"
               type="select"
                label="Category" 
                component={Input} 
                 options= {[{label:"Shoe",value:"Shoe"},{label:"Sneaker",value:"Sneaker"}, {label:"Flip Flops",value:"Flip Flops"},{label:"Heels",value:"Heels"}]}
                  setFieldValue={setFieldValue}
                  errorId="category"
              isBtnClicked={isClicked}
                  errorMsg={errors.category} 
                  />

              <Field 
              name="brandName"
               type="select" 
               label="Brand Name" 
               component={Input}  
               options= {[{label:"Adidas",value:"Adidas"},{label:"Nike",value:"Nike"}, {label:"Bata",value:"Bata"},{label:"DSI",value:"DSI"}]}
               setFieldValue={setFieldValue}
               errorId="brandName"
              isBtnClicked={isClicked}
               errorMsg={errors.brandName} 
                />
              </div>
              <div className="flex flex-col mx-4 ">
              <Field 
              name="sizes.size"
               type="select"
                label="Size"
                 component={Input} 
                 options= {[{label:"30",value:"30"}]}
                  setFieldValue={setFieldValue}
                  errorId="sizes.size"
              isBtnClicked={isClicked}
                  errorMsg={errors.sizes?.size} 
                 /> 
              {/* <Field
                name="sizes.colors.color"
                type="select"
                label="Color"
                component={Input}
                options= {[{label:"blue",value:"blue"}]}
                  setFieldValue={setFieldValue}
                  errorMsg={errors.sizes.colors.color} 
              /> */}
              <Field
                name="sizes.colors.color"
                type="select"
                label="Color"
                component={Input}
                options= {[{label:"30",value:"30"}]}
                  setFieldValue={setFieldValue}
                  errorId="sizes.colors.color"
              isBtnClicked={isClicked}
                  errorMsg={errors.sizes?.colors?.color}

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
             
              <ImageUploader productID={productID} productName={productName}  />
              <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-green-500 text-white rounded px-4 py-2 my-3"
                    text='Create'
                    onClick={()=>{setIsClicked(true)}}
                    onMouseUp={()=>setIsClicked(false)}

                 />
                   
                  <Button
                    type="reset"
                    className="bg-red-500 text-white rounded px-4 py-2 my-3"
                    text="Clear"

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

export default NewProduct








 
 
