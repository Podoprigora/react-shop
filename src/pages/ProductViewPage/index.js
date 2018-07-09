import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { format as moneyFormat } from "money-formatter";

import DocumentScroll from "../components/ui/DocumentScroll";
import Layout from "../components/ui/Layout";

import { Section, SectionHeader, SectionContent } from "../components/ui/Section";
import Gallery from "../components/ui/Gallery";
import ProductShowcase from "./ProductShowcase";
import FeatureList from "../components/FeatureList";
import FeatureText from "../components/FeatureText";

import productData from "../../../data/product-view";

class ProductViewPage extends React.Component {
  state = {};

  stickyContainerRef = React.createRef();

  render() {
    return (
      <DocumentScroll>
        {({ top, bottom }) => {
          let stickyContainerStyle = {};

          if (this.stickyContainerRef.current) {
            const {
              width: containerWidth,
              height: containerHeight
            } = this.stickyContainerRef.current.getBoundingClientRect();

            if (top < 0 && containerHeight < bottom) {
              stickyContainerStyle = {
                position: "fixed",
                top: 0,
                width: containerWidth
              };
            }
          }

          return (
            <div className="product-view">
              <div className="product-view__center">
                <Gallery images={productData.images} className="product-showcase__gallery" />

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

              <div className="product-view__aside">
                <div
                  ref={this.stickyContainerRef}
                  className="product-view__sticky-container"
                  style={stickyContainerStyle}
                >
                  <ProductShowcase {...productData} />
                </div>
              </div>
            </div>
          );
        }}
      </DocumentScroll>
    );
  }
}

export default ProductViewPage;
