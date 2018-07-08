import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import NoMatchPage from "./NoMatchPage";
import MainPage from "./MainPage";
import ProductsPage from "./ProductsPage";
import ProductViewPage from "./ProductViewPage";
import TestPage from "./TestPage";

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
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/test" component={TestPage} />

      <Route path="/product/:id" component={ProductViewPage} />
      <Route path="/:category/:subcategory" component={ProductsPage} />
      <Route path="/:category/:subcategory/:node" component={ProductsPage} />
      <Route component={NoMatchPage} />
    </Switch>
  </MainLayout>
);

export default App;
