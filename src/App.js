import { React, useState } from "react";
import "./App.css";
import HomePage from "./components/home/HomePage";
import { Route, Routes } from "react-router-dom";
import ChartPage from "./components/chart/ChartPage";
import PageNotFound from "./components/common/PageNotFound";
import SingleLayout from "./components/common/layout/SingleLayout";

function App() {
  const [csvArray, setCsvArray] = useState([]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<SingleLayout />}>
          <Route index element={<HomePage uploadHandler={setCsvArray} />} />
          <Route path="reports" element={<ChartPage data={csvArray} />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
