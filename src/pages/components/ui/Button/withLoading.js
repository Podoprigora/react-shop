import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import LinearProgress from "../Progress/Linear";

const withLoading = ComposedComponent =>
  class extends React.PureComponent {
    static propTypes = {
      loading: PropTypes.bool,
      className: PropTypes.string,
      progressConfig: PropTypes.object
    };

    render() {
      const { loading, className, progressConfig, ...other } = this.props;

      if (!loading) {
        return <ComposedComponent className={className} {...other} />;
      }

      return (
        <div className={classNames("button-with-loading-container", className)}>
          <ComposedComponent disabled {...other} />
          <LinearProgress className="button" {...progressConfig} />
        </div>
      );
    }
  };

export default withLoading;
