import { Stepper } from "../components";
import { useState } from "react";
export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0);
  const NUMBER_OF_STEPS = 2;

  const goToNextStep = () =>
    setCurrentStep((prev) => (prev === NUMBER_OF_STEPS - 1 ? prev : prev + 1));
  const goToPreviousStep = () =>
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1));
  return (
    <div>
      <div className="flex justify-center mt-10">
        <Stepper
          currentStep={currentStep}
          steps={NUMBER_OF_STEPS}
          connectorClass="w-72"
        />
      </div>
      <div className="flex mx-10">
        <div>
            <span className="">Billing Details</span>
        </div>
        <div></div>

      </div>
    </div>
  );
}
