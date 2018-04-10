import React from "react";
import { Route, Redirect } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import MainPage from "./MainPage";
import ProductsPage from "./ProductsPage";

import "../stylesheet/styles.scss";

import api from "../modules/api";

async function loadData() {
  const result = await Promise.all([api.catalog(), api.brands(), api.brandnew(), api.topseller()]);

  return {
    categories: result[0],
    brands: result[1],
    brandnew: result[2],
    topseller: result[3]
  };
}

const App = () => (
  <MainLayout>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/products" component={ProductsPage} />
  </MainLayout>
);

export default App;
