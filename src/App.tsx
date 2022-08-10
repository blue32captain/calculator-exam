import React, { useState } from "react";
import Display from "./components/Display/Display";
import ButtonPanel from "./components/ButtonPanel/ButtonPanel";
import calculate, { Values } from "./logic/calculate";
import "./App.css";

function App() {
  const [val, setVal] = useState<Values>({
    total: null,
    next: null,
    operation: null,
  });

  const handleClick = (buttonName: string) => {
    const updatedVal: Values = calculate(val, buttonName);
    setVal(updatedVal);
  };

  return (
    <div className="component-app">
      <Display value={val.next || val.total || "0"} />
      <ButtonPanel clickHandler={handleClick} />
    </div>
  );
}

export default App;
