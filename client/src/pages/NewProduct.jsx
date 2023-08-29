import { useState } from 'react';
import { Formik, Form, Field} from 'formik';
import axios from 'axios'
import {Input} from '../../../components';



const NewProduct = () => {
   const [file,setFile] = useState()

   const handleUpload = () => {
    const formdata = new FormData()
    formdata.append('file', file)
    axios.post("http://localhost:3001/products/upload", formdata).then(res => console.log(res))
    .catch(err => console.log(err))
   }

    const addProduct = (data) =>{
        console.log(data)
        axios.post("http://localhost:3001/products",data).then((res)=>{
          console.log(res.data);
        }).catch((err)=>{
          console.log(err)
        })
      }


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
      <div className="bg-gray-200  flex items-center justify-center p-8">
      <div className="bg-white shadow-md p-8 rounded-md ">
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <Formik initialValues={initialValues} onSubmit={addProduct}>
        <Form className="w-full w-100%  flex flex-col">
          <div className="flex items-center justify-between mb-4">
            {/* Left side (fields) */}
            <div className="flex flex-col">
              <Field name="productID" label="Product ID" component={Input} 
              type="color" options={["black","blue","red","yellow","green","purple","orange"]}
              colorSize={30} paletteWidth="12vw" errorMsg="hi"
              />
              <Field name="productName" label="Product Name" component={Input} />
              {/* <Field
                name="productCollection"
                type="select"
                label="Product Collection"
                component={Input}
              /> */}
              {/* <Field name="category" type="select" label="Category" component={Input} /> */}
              {/* <Field name="brandName" type="select" label="Brand Name" component={Input} /> */}
              </div>
              <div className="flex flex-col">
              {/* <Field name="sizes.size" type="select" label="Size" component={Input} /> */}
              {/* <Field
                name="sizes.colors.color"
                type="select"
                label="Color"
                component={Input}
              /> */}
              <Field name="productDesc" label="Product Description" component={Input} />
              <Field name="regularPrice" label="Regular Price" component={Input} />
              <Field name="sellingPrice" label="Sale Price" component={Input} />
            </div>

            {/* Right side (image and buttons) */}
            <div className="flex flex-col items-end">
              <img src={file} alt="Product" className="w-24 h-auto rounded-md mb-4" />
              <Field
                name="image"
                type="file"
                label="Image"
                component={Input}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                type="submit"
                onClick={handleUpload}
                className="bg-blue-500 text-white rounded px-4 py-2 mb-2"
              >
                Upload Image
              </button>
              <button type="submit" className="bg-green-500 text-white rounded px-4 py-2">
                Create Product
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
    </div>
   
      );
    };

export default NewProduct








 
 
