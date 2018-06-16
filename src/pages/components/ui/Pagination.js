import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Pagination extends React.Component {
  static propTypes = {
    totalItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    initialPage: PropTypes.number,
    siblingPagesRange: PropTypes.number,
    onChange: PropTypes.func
  };

  static defaultProps = {
    pageSize: 24,
    initialPage: 1,
    siblingPagesRange: 2,
    onChange: () => {}
  };

  constructor(props) {
    super(props);

    this.state = Pagination.getState({ currentPage: props.initialPage, ...props });

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.currentPage !== this.state.currentPage;
  }

  static getState = ({ currentPage, totalItems, pageSize }) => ({
    currentPage,
    totalPages: Math.ceil(totalItems / pageSize),
    start: currentPage * pageSize,
    offset: pageSize
  });

  handlePageChange = page => ev => {
    const { onChange } = this.props;

    this.setState(Pagination.getState({ currentPage: page, ...this.props }));
    onChange(this.state);
  };

  renderPages() {
    const { pageSize, siblingPagesRange } = this.props;
    const { currentPage, totalPages } = this.state;
    const pagesItems = [];

    if (1 + 2 + 2 + 2 * siblingPagesRange >= totalPages) {
      return [...Array(totalPages).keys()].map(item => this.renderItem(item + 1));
    }

    const firstPageStart = 1;
    const firstPage = this.renderItem(firstPageStart);

    const lastPageStart = totalPages;
    const lastPage = this.renderItem(lastPageStart);

    const mainPageStart = Math.min(
      Math.max(currentPage - siblingPagesRange, firstPageStart + 2),
      lastPageStart - 2 - 2 * siblingPagesRange
    );
    const mainPageEnd = mainPageStart + 2 * siblingPagesRange;
    const mainPages = [...Array(totalPages).keys()]
      .slice(mainPageStart, mainPageEnd + 1)
      .map(item => this.renderItem(item));

    const firstEllipsisPageNumber = mainPageStart - 1;
    const firstEllipsisPage = this.renderItem(
      firstEllipsisPageNumber,
      firstEllipsisPageNumber === firstPageStart + 1 ? firstEllipsisPageNumber : "..."
    );

    const secondEllipsisPageNumber = mainPageEnd + 1;
    const secondEllipsisPage = this.renderItem(
      secondEllipsisPageNumber,
      secondEllipsisPageNumber === lastPageStart - 1 ? secondEllipsisPageNumber : "..."
    );

    return [firstPage, firstEllipsisPage, ...mainPages, secondEllipsisPage, lastPage];
  }

  renderItem = (index, value = index) => {
    const { currentPage } = this.state;

    return (
      <li key={index} className="paginator__item">
        <a
          className={classNames("paginator__link", { "paginator__link--selected": currentPage === index })}
          role="presentation"
          onClick={this.handlePageChange(index)}
        >
          {value}
        </a>
      </li>
    );
  };

  render() {
    const { currentPage, totalPages } = this.state;

    if (!totalPages) {
      return null;
    }

    return (
      <div className="paginator">
        <button
          className={classNames("paginator__control icon icon-navigate_before", {
            "paginator__control--disabled": currentPage === 1
          })}
          disabled={currentPage === 1}
          onClick={this.handlePageChange(currentPage - 1)}
        />
        <ul className="paginator__list">{this.renderPages()}</ul>
        <button
          className={classNames("paginator__control icon icon-navigate_next", {
            "paginator__control--disabled": currentPage === totalPages
          })}
          disabled={currentPage === totalPages}
          onClick={this.handlePageChange(currentPage + 1)}
        />
      </div>
    );
  }
}

export default Pagination;
