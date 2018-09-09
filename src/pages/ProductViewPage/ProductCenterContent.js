import React from "react";
import PropTypes from "prop-types";

import {
  Section,
  SectionHeader,
  SectionContent
} from "../components/ui/Section";
import Button from "../components/ui/Button";
import { RadioOption } from "../components/ui/OptionsList";
import Dropdown from "../components/ui/Dropdown";
import Gallery from "../components/ui/Gallery";
import FeatureList from "../components/FeatureList";
import FeatureText from "../components/FeatureText";
import CommentsList from "../components/CommentsList";

import commentsData from "../../../data/product-comments";

class ProductCenterContent extends React.PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    features: PropTypes.arrayOf(PropTypes.string),
    modelSize: PropTypes.string,
    material: PropTypes.string
  };

  commentsSectionRef = React.createRef();

  render() {
    const { images, features, material, modelSize } = this.props;

    return (
      <React.Fragment>
        <Gallery images={images} className="product-showcase__gallery" />

        <Section className="product-section">
          <SectionHeader title="Product information" />
          <SectionContent>
            <Section className="product-section__card">
              <SectionHeader title="Features" />
              <SectionContent>
                <FeatureList data={features} />
              </SectionContent>
            </Section>

            <Section className="product-section__card">
              <SectionHeader title="Material" />
              <SectionContent>
                <FeatureText>{material}</FeatureText>
              </SectionContent>
            </Section>

            <Section className="product-section__card">
              <SectionHeader title="Model Size" />
              <SectionContent>
                <FeatureText>{modelSize}</FeatureText>
              </SectionContent>
            </Section>
          </SectionContent>
        </Section>

        <Section className="product-section" ref={this.commentsSectionRef}>
          <SectionHeader title="Comments">
            <span className="header__counter">(10)</span>
          </SectionHeader>
          <SectionContent>
            <div className="tbar section__tbar">
              <Dropdown
                value="top-rated"
                displayText="Top rated"
                iconCls="icon-sort"
                className="tbar__item"
              >
                <RadioOption value="top-rated">Top rated</RadioOption>
                <RadioOption value="most-recent">Most recent</RadioOption>
              </Dropdown>
              <Button
                primary
                className="tbar__item"
                style={{ marginLeft: "auto" }}
              >
                Add comment
              </Button>
            </div>

            <CommentsList data={commentsData} />
          </SectionContent>
        </Section>
      </React.Fragment>
    );
  }
}

export default ProductCenterContent;
