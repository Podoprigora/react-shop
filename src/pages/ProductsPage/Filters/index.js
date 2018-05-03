import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import withPreventScrollingOfParentElement from "../../components/ui/helpers/withPreventScrollingOfParentElement";
import CollapsiblePanel from "../../components/ui/CollapsiblePanel";
import OptionsList, { CheckboxOption, OptionItem } from "../../components/ui/OptionsList";
import brandsData from "../../../../data/brands";
import categoriesData from "../../../../data/categories";

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
        <CollapsiblePanel header="Categories">
          <OptionsList size={10}>
            {categoriesItems.map((item, index) => (
              <OptionItem key={index} value={index} iconCls="icon-keyboard_arrow_right">
                {item.title}
              </OptionItem>
            ))}
          </OptionsList>
        </CollapsiblePanel>
        <CollapsiblePanel header="Brands">
          <OptionsList selMode="multi" size={10}>
            {brandsData.map((brand, index) => (
              <CheckboxOption key={index} value={brand.name}>
                {brand.title}
              </CheckboxOption>
            ))}
          </OptionsList>
        </CollapsiblePanel>
      </aside>
    );
  }
}

export default withPreventScrollingOfParentElement(ProductFilters);
