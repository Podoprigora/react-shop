import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class TableView extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
      })
    ),
    className: PropTypes.string
  };

  render() {
    const { data, children, className, ...other } = this.props;

    if (!data.length) {
      return null;
    }

    return (
      <div className={classNames("table-view", className)} {...other}>
        {data.map(item => (
          <div key={item.id} className="table-view__row">
            {React.Children.map(children, (child, index) => React.cloneElement(child, { index, record: item }))}
          </div>
        ))}
      </div>
    );
  }
}

export default TableView;
