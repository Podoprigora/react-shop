import React from "react";
import { Route } from "react-router-dom";

import MainLayout from "./MainLayout";
import Home from "./routes/Home";

import "../../stylesheet/components/components.scss";

const App = () => (
  <MainLayout>
    <Route path="/" component={Home} />
  </MainLayout>
);

export default App;
