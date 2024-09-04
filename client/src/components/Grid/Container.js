import React from "react";

// Not to be confused with container components in the React container-component pattern.
export const Container = ({fluid, className="", children, ...props}) => (
  <div className={`container${fluid ? "-fluid" : ""} ${className}`} {...props}>
    {children}
  </div>
);
