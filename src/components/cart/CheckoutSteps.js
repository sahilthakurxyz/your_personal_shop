import React, { Fragment } from "react";

import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { HiBuildingLibrary } from "react-icons/hi2";
const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <FaShippingFast />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <MdOutlineLibraryAddCheck />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <HiBuildingLibrary />,
    },
  ];
  const stepStyle = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              icon={item.icon}
              style={{
                color: activeStep >= index ? "#3f51b5" : "gray",
                fontSize: "25px",
              }}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
