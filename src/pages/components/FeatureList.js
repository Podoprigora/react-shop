import React from "react";
import PropTypes from "prop-types";

import { SimpleList, SimpleListItem } from "./ui/SimpleList";
import FeatureText from "./FeatureText";

class FeatureList extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string)
  };

  render() {
    const { data } = this.props;

    if (data.length === 0) {
      return null;
    }

    return (
      <SimpleList className="feature-list">
        {data.map((feature, i) => (
          <SimpleListItem key={i} className="feature-list__item">
            {/^([\w\-\s]+:)/g.test(feature) ? <FeatureText>{feature}</FeatureText> : `- ${feature}`}
          </SimpleListItem>
        ))}
      </SimpleList>
    );
  }
}

export default FeatureList;
