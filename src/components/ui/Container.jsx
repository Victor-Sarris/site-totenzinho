import React from "react";

const widths = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
};

/**
 * Wrapper de largura/centralização consistente para o conteúdo das páginas.
 */
const Container = ({ size = "2xl", className = "", children }) => (
  <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${widths[size]} ${className}`}>
    {children}
  </div>
);

export default Container;
