import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import CollapsiblePanel from "../../components/ui/CollapsiblePanel";
import OptionsList, { CheckboxOption } from "../../components/ui/OptionsList";
import brandsData from "../../../../data/brands";

class ProductFilters extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <aside className="product-filters">
        <CollapsiblePanel header="Brands">
          {brandsData &&
            brandsData.length && (
              <OptionsList selMode="multi">
                {brandsData.map((brand, index) => (
                  <CheckboxOption key={index} value={brand.name}>
                    {brand.title}
                  </CheckboxOption>
                ))}
              </OptionsList>
            )}
        </CollapsiblePanel>
      </aside>
    );
  }
}

export default ProductFilters;
