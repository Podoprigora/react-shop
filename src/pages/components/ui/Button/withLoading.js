import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import LinearProgress from "../Progress/Linear";

const withLoading = ComposedComponent => {
  class WithLoading extends React.PureComponent {
    static propTypes = {
      loading: PropTypes.bool,
      className: PropTypes.string,
      progressConfig: PropTypes.object,
      forwardedRef: PropTypes.func
    };

    render() {
      const { loading, className, progressConfig, forwardedRef, ...other } = this.props;

      if (!loading) {
        return <ComposedComponent ref={forwardedRef} className={className} {...other} />;
      }

      return (
        <div className={classNames("button-with-loading-container", className)}>
          <ComposedComponent disabled {...other} />
          <LinearProgress className="button" {...progressConfig} />
        </div>
      );
    }
  }

  return React.forwardRef((props, ref) => <WithLoading {...props} forwardedRef={ref} />);
};

export default withLoading;
