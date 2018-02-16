import React from "react";
import { Route } from "react-router-dom";

import MainLayout from "../components/MainLayout";
import Home from "./Home";

import "../../stylesheet/components/components.scss";

const App = () => (
  <MainLayout>
    <Route path="/" component={Home} />
  </MainLayout>
);

export default App;
