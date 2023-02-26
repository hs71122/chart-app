import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const SingleLayout = () => {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <Outlet />
      </div>
    </div>
  );
};

export default SingleLayout;
