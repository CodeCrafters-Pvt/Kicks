import { Form, Input, PricingSummary } from "../";
import { Formik, Form as FormComponent, Field } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdCash } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Step1({
  initialValues,
  isClicked,
  formRef,
  setOrderData,
  selectedDeliveryOption,
  setSelectedDeliveryOption,
  selectedPaymentOption,
  setSelectedPaymentOption,
  setCurrentStep,
}) {
  const DeliveryOption = ({ title, subtitle, price }) => (
    <div
      onClick={() => {
        setSelectedDeliveryOption(title);
      }}
      className={`w-1/2 bg-white ml-2 my-4 border-4  rounded-xl p-3 py-4 cursor-pointer
        ${selectedDeliveryOption === title ? " border-primary" : ""}`}
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-heading">{title}</span>
          <span className="text-sm ml-1">{subtitle}</span>
        </div>
        <span
          className={`${price === "Free" ? "text-black" : "text-blue-600"}`}
        >
          {" "}
          {price}
        </span>
      </div>
    </div>
  );

  const PaymentOption = ({ option, Image, className }) => (
    <div
      onClick={() => {
        setSelectedPaymentOption(option);
      }}
      className={`w-1/2 bg-white rounded-xl  cursor-pointer border-4 ${
        selectedPaymentOption === option ? " border-primary" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-1 my-2">
        <Image className={`text-3xl ${className}`} />
        <span>{option}</span>
      </div>
    </div>
  );

  const [useBillingAddress, setUseBillingAddress] = useState(false);

  return (
    <div className=" w-2/3 mx-auto my-6 flex flex-col">
      <div className="flex justify-between my-12">
        <Form
          initialValues={initialValues}
          setOrderData={setOrderData}
          isClicked={isClicked}
          formRef={formRef}
          setCurrentStep={setCurrentStep}
        />
        <div>
          <PricingSummary />
          <div className="flex gap-2 my-4">
            <PaymentOption
              option="Cash"
              Image={IoMdCash}
              className="text-green-700"
            />
            <PaymentOption
              option="Card"
              Image={FaCreditCard}
              className="text-blue-700"
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <span className="font-heading">Delivery Options</span>
          <DeliveryOption
            title="Standard Delivery"
            subtitle="Shipped within 2-5 days"
            price="$6.00"
          />
          <AnimatePresence>
            {selectedDeliveryOption === "Standard Delivery" && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0, transition: { delay: 0.0 } }}
                transition={{ duration: 0.5 }}
              >
                <Formik
                  initialValues={initialValues}
                  // onSubmit={handleLogin}
                  // validationSchema={validationSchema}
                >
                  {({ errors }) => (
                    <FormComponent>
                      {!useBillingAddress && (
                        <Field
                          component={Input}
                          bordered={false}
                          hasLabel={false}
                          placeholder="Shipping Address"
                          name="shippingAddress"
                          errorId={errors?.shippingAddress}
                          inputStyle="w-[40%]"
                        />
                      )}
                      <div className="flex gap-1 items-center">
                        <Input
                          type="checkbox"
                          field="select"
                          isChecked={useBillingAddress}
                          onChange={(event) =>
                            setUseBillingAddress(event.target.checked)
                          }
                        />
                        <span className="mt-1">Ship to billing address</span>
                      </div>
                    </FormComponent>
                  )}
                </Formik>
              </motion.div>
            )}
          </AnimatePresence>
          <DeliveryOption
            title="Collect in store"
            subtitle="Pay now to reserve"
            price="Free"
          />
        </div>
        <div className="flex gap-1 items-center">
          <Input type="checkbox" field="select" />
          <span className="mt-1">
            I’d like to receive emails about exclusive sales and more.
          </span>
        </div>
      </div>
    </div>
  );
}
