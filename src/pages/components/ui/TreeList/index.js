import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class TreeList extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string
      })
    ).isRequired,
    selected: PropTypes.string,
    className: PropTypes.string,
    onSelect: PropTypes.func
  };
  static defaultProps = {
    onSelect: () => {}
  };

  state = {
    selected: null
  };

  handleNodeClick = (node, parent) => ev => {
    this.setState({ selected: node });
    this.props.onSelect(node, parent);
  };

  renderSubtree = node => {
    const { items } = node;

    if (!items || !items.length) {
      return null;
    }

    return <ul className="tree-list__subtree">{items.map((n, index) => this.renderNode(n, index, node))}</ul>;
  };

  renderNode = (node, index, parentNode = null) => {
    const { selected } = this.state;
    const { id, title, items } = node;

    if (!id) {
      return null;
    }

    return (
      <li key={id}>
        <a
          className={classNames("tree-list__node icon icon-keyboard_arrow_right", {
            "node--selected": selected && id === selected.id
          })}
          role="presentation"
          onClick={this.handleNodeClick(node, parentNode)}
        >
          {title}
        </a>
        {this.renderSubtree(node)}
      </li>
    );
  };

  render() {
    const { data } = this.props;

    if (!data.length) {
      return null;
    }

    return <ul className="tree-list">{data.map(this.renderNode)}</ul>;
  }
}

export default TreeList;
