import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { format as moneyFormat } from "money-formatter";

import { Section, SectionHeader, SectionContent } from "../components/ui/Section";
import Gallery from "../components/ui/Gallery";
import ProductShowcaseAside from "./ProductShowcaseAside";
import FeatureList from "../components/FeatureList";
import FeatureText from "../components/FeatureText";

import productData from "../../../data/product-view";

class ProductViewPage extends React.Component {
  state = {};

  render() {
    return (
      <div className="product-view">
        <div className="product-view__showcase">
          <Gallery images={productData.images} className="product-showcase__gallery" />
          <ProductShowcaseAside {...productData} />
        </div>

        <Section className="product-section">
          <SectionHeader title="Product information" />
          <SectionContent>
            <Section className="product-section__card">
              <SectionHeader title="Features" />
              <SectionContent>
                <FeatureList data={productData.features} />
              </SectionContent>
            </Section>

            <Section className="product-section__card">
              <SectionHeader title="Material" />
              <SectionContent>
                <FeatureText>{productData.material}</FeatureText>
              </SectionContent>
            </Section>

            <Section className="product-section__card">
              <SectionHeader title="Model Size" />
              <SectionContent>
                <FeatureText>{productData.modelSize}</FeatureText>
              </SectionContent>
            </Section>
          </SectionContent>
        </Section>

        <Section className="product-section">
          <SectionHeader title="Comments" />
          <SectionContent>Comments list</SectionContent>
        </Section>
      </div>
    );
  }
}

export default ProductViewPage;
