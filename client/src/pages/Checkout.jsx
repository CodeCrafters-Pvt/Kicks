import {
  Stepper,
  CheckoutStep1,
  Button,
  PaymentGateway,
  CheckOutStep2,
} from "../components";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export default function Checkout() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const NUMBER_OF_STEPS = 2;
  const [orderData, setOrderData] = useState({
    id: "12345",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    shippingAddress: "",
    items: "Door bell wireless",
    amount: "1000",
  });

  const [selectedDeliveryOption, setSelectedDeliveryOption] =
    useState("Standard Delivery");

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("Cash");

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleNext = async () => {
    setIsButtonClicked(true);
    if (currentStep === 0) {
      if (formRef.current) {
        await formRef.current.submitForm();
      } else if (currentStep < NUMBER_OF_STEPS - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate("/cart");
    }
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <Stepper
          currentStep={currentStep}
          steps={NUMBER_OF_STEPS}
          connectorClass="w-72"
        />
      </div>
      {currentStep === 0 && (
        <CheckoutStep1
          initialValues={orderData}
          isClicked={isButtonClicked}
          formRef={formRef}
          setOrderData={setOrderData}
          selectedDeliveryOption={selectedDeliveryOption}
          setSelectedDeliveryOption={setSelectedDeliveryOption}
          selectedPaymentOption={selectedPaymentOption}
          setSelectedPaymentOption={setSelectedPaymentOption}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep > 0 && (
        <CheckOutStep2
          details={orderData}
          paymentOption={selectedPaymentOption}
        />
      )}
      <div className="flex gap-2 bg-red-100 float-right mr-10">
        <Button
          text={currentStep === 0 ? "Cart" : "Back"}
          variant="transparent"
          onClick={handleBack}
          className="w-40"
        />
        {currentStep === 0 ? (
          <Button
            text="Confirm"
            variant="primary"
            onClick={handleNext}
            onMouseUp={() => setIsButtonClicked(false)}
            className="w-60"
          />
        ) : (
          <PaymentGateway data={orderData} />
        )}
      </div>
    </>
  );
}
