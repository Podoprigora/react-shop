import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AnimateHeight from "react-animate-height";

class CollapsiblePanel extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    header: PropTypes.string,
    collapsed: PropTypes.bool
  };
  static defaultProps = {
    header: "",
    collapsed: false
  };
  static getDerivedStateFromProps(nextProps, nextState) {
    const { collapsed } = nextProps;
    return {
      height: collapsed ? 0 : "auto"
    };
  }

  state = {
    height: "auto"
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.height !== this.state.height;
  }

  handleHeaderClick = ev => {
    ev.preventDefault();

    this.setState(prevState => ({
      height: prevState.height === 0 ? "auto" : 0
    }));
  };

  render() {
    const { height } = this.state;
    const { children, header } = this.props;

    return (
      <div
        className={classNames("panel panel-collapsible", {
          "panel-collapsible--collapsed": height === 0
        })}
      >
        <header className="panel__header" role="presentation" onClick={this.handleHeaderClick}>
          <h4 className="header__title">{header}</h4>
        </header>
        <section className="panel__body">
          <AnimateHeight height={height}>{children}</AnimateHeight>
        </section>
      </div>
    );
  }
}

export default CollapsiblePanel;
