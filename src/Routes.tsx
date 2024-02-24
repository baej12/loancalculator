import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Index";
import { AvalancheParentComponent } from "./components/AvalancheParentComponent";
import { InputParent } from "./components/InputParent";
import { SnowballParent } from "./components/SnowballParent";

export const Paths = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<InputParent />} />
        <Route
          path="/avalanche"
          element={<div>{<AvalancheParentComponent />}</div>}
        />
        <Route path="/snowball" element={<SnowballParent />} />
      </Routes>
    </BrowserRouter>
  );
};
