import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import withPreventScrollingOfParentElement from "../../components/ui/helpers/withPreventScrollingOfParentElement";
import CollapsiblePanel from "../../components/ui/CollapsiblePanel";
import OptionsList, { CheckboxOption } from "../../components/ui/OptionsList";
import brandsData from "../../../../data/brands";

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

export default withPreventScrollingOfParentElement(ProductFilters);
