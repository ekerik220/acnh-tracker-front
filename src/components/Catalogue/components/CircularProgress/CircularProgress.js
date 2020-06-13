import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import { AnimatedProgressProvider } from "./AnimatedProgressProvider";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function CircularProgress({
  percent,
  label,
  tooltip,
  overrideText,
}) {
  return (
    <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>}>
      <div
        style={{
          userSelect: false,
          cursor: "default",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AnimatedProgressProvider
          valueStart={0}
          valueEnd={percent}
          duration={1.4}
          easingFunction={easeQuadInOut}
        >
          {(value) => {
            const fixedValue = toFixed(value, 2);
            return (
              <CircularProgressbar
                value={value}
                text={overrideText || `${fixedValue}%`}
                styles={buildStyles({ pathTransition: "none" })}
              />
            );
          }}
        </AnimatedProgressProvider>
        <span>{label}</span>
      </div>
    </OverlayTrigger>
  );
}

function toFixed(num, fixed) {
  var re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(re)[0];
}
