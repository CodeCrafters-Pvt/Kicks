import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function Stepper({
  steps,
  currentStep,
  className,
  circleClass,
  innerCircleClass,
  connectorClass,
}) {
  const activeStep = (index) => currentStep >= index;
  const activeConnector = (index) => currentStep > index;
  const isFinalStep = (index) => index === steps - 1;

  const connectorWidth = `${100 / (steps - 1)}%`;

  const InnerCircle = (
    <motion.div
      className={`w-[60%] h-[60%] rounded-full bg-primary absolute top-[22%] left-[18%] ${innerCircleClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    ></motion.div>
  );

  return (
    <div className={`flex items-center mx-6 ${className}`}>
      {Array.from({ length: steps }).map((_, index) => (
        <React.Fragment key={index}>
          <motion.div
            className={`w-8 h-8 rounded-full border-2 relative ${
              activeStep(index) ? "border-primary" : "border-gray-400"
            } ${circleClass}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeStep(index) && InnerCircle}
          </motion.div>
          {isFinalStep(index) ? null : (
            <motion.div
              className={`mx-0.5 w-24 h-0.5 ${
                activeConnector(index) ? "bg-primary" : "bg-gray-400"
              } ${connectorClass}`}
              // style={{ width: connectorWidth }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

Stepper.propTypes = {
  steps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  circleClass: PropTypes.string,
  innerCircleClass: PropTypes.string,
  connectorClass: PropTypes.string,
  className: PropTypes.string,
};
