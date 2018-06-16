import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import withPreventScrollingOfParentElement from "../../components/ui/utils/withPreventScrollingOfParentElement";
import CollapsiblePanel from "../../components/ui/CollapsiblePanel";
import OptionsList, { CheckboxOption, ColorOption, OptionItem } from "../../components/ui/OptionsList";
import NumberRange from "../../components/ui/NumberRange";

import categoriesData from "../../../../data/categories";
import brandsData from "../../../../data/brands";
import sizesData from "../../../../data/sizes";
import colorsData from "../../../../data/colors";

const categoriesItems = categoriesData[0].items[1].items;

class ProductFilters extends React.PureComponent {
  static propTypes = {
    elRef: PropTypes.object.isRequired,
    onMouseWheel: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  render() {
    const { elRef, onMouseWheel } = this.props;

    return (
      <aside className="product-filters" ref={elRef} onWheel={onMouseWheel}>
        <CollapsiblePanel header="Categories" collapsed>
          <OptionsList selected="all" size={8}>
            <OptionItem value="all" iconCls="icon-folder_open">
              All Jumpers
            </OptionItem>
            {categoriesItems.map((item, index) => (
              <OptionItem key={index} value={index} iconCls="icon-subject">
                {item.title}
              </OptionItem>
            ))}
          </OptionsList>
        </CollapsiblePanel>
        <CollapsiblePanel header="Brands" collapsed>
          <OptionsList selMode="multi" size={5}>
            {brandsData.map((brand, index) => (
              <CheckboxOption key={index} value={brand.name}>
                {brand.title}
              </CheckboxOption>
            ))}
          </OptionsList>
        </CollapsiblePanel>
        <CollapsiblePanel header="Sizes">
          <OptionsList selMode="multi" size={5}>
            {sizesData.map((size, index) => (
              <CheckboxOption key={index} value={size.id}>
                {size.name}
              </CheckboxOption>
            ))}
          </OptionsList>
        </CollapsiblePanel>
        <CollapsiblePanel header="Colors">
          <OptionsList selMode="multi" className="colors-list">
            {colorsData.map((color, index) => (
              <ColorOption key={color.id} value={color.id}>
                {color.name}
              </ColorOption>
            ))}
          </OptionsList>
        </CollapsiblePanel>
        <CollapsiblePanel header="Price">
          <NumberRange
            min={17}
            max={195}
            onChange={values => {
              console.log(values);
            }}
          />
        </CollapsiblePanel>
      </aside>
    );
  }
}

export default withPreventScrollingOfParentElement(ProductFilters);
