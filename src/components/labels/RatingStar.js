import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
export const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
const getLabelColor = (label) => {
  switch (label) {
    case "Useless":
    case "Useless+":
      return "#c70e1a";
    case "Poor":
    case "Poor+":
      return "#94282f";
    case "Ok":
    case "Ok+":
      return "#2997b3";
    case "Good":
    case "Good+":
      return "#2512b5";
    case "Excellent":
      return "#b51297";
    case "Excellent+":
      return "#28b512";
    default:
      return "black";
  }
};
const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};
const RatingStar = ({
  rating,
  size,
  width,
  display,
  alignItems,
  position,
  flexDirection,
}) => {
  const [hover, setHover] = useState(-1);

  const currentLabel = labels[hover !== -1 ? hover : rating];
  const color = getLabelColor(currentLabel);
  return (
    <Box
      sx={{
        width: width,
        display: "flex" || display,
        flexDirection: "row" || flexDirection,
        alignItems: "center" || alignItems,

        color: color,
      }}
    >
      <Rating
        name="hover-feedback"
        value={rating}
        precision={0.5}
        getLabelText={getLabelText}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        icon={<StarIcon style={{ fontSize: size }} />}
        emptyIcon={<StarIcon style={{ opacity: 0.55, fontSize: size }} />}
      />
      {rating !== null && (
        <Box sx={{ ml: 2, fontSize: size }}>{currentLabel}</Box>
      )}
    </Box>
  );
};

export default RatingStar;
