import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import withPreventScrollingOfParentElement from "../../components/ui/helpers/withPreventScrollingOfParentElement";
import CollapsiblePanel from "../../components/ui/CollapsiblePanel";
import OptionsList, { CheckboxOption, OptionItem } from "../../components/ui/OptionsList";
import TreeList from "../../components/ui/TreeList";
import brandsData from "../../../../data/brands";
import categoriesData, { getPath as getCategoriesPath } from "../../../../data/categories";

const categoriesNodes = [categoriesData[0]];
const categoriesItems = categoriesData[0].items[0].items;

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
        <CollapsiblePanel header="categories">
          <TreeList
            data={categoriesNodes}
            onSelect={node => {
              console.log(node);
            }}
          />
        </CollapsiblePanel>
        <CollapsiblePanel header="Brands">
          <OptionsList selMode="multi" size={8}>
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
