 
import React from "react";
 import ReactDOM from "react-dom/client";

  //React.createElement => Object =>HTMLElement(render)
  //core or react
  const heading = React.createElement(
    "h1",
    {id: "heading"},
    "Namaste React 🚀"
  );

  console.log(heading);

  //JSX - HTML-like or XML-like syntax

  const jsxHeading = <h1 id="heading ">Namaste react using JSX 🚀</h1>;
  console.log(jsxHeading);

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(heading);