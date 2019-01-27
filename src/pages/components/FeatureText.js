import React from "react";
import PropTypes from "prop-types";

class FeatureText extends React.PureComponent {
    static propTypes = {
        children: PropTypes.string
    };

    render() {
        const { children } = this.props;

        if (!children) {
            return null;
        }

        return (
            <div
                className="feature-text"
                dangerouslySetInnerHTML={{ __html: children.replace(/([\w\d\-\s]+:)/g, "<strong>$1</strong>") }}
            />
        );
    }
}

export default FeatureText;
