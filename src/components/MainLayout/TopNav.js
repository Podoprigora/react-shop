import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import classNames from "classnames";
import isMobile from "ismobilejs";

const titleToNavPath = title => {
  if (!title || title.length === 0) return null;

  let navPath = title.toLowerCase();

  navPath = navPath.replace(/&/g, "and");
  navPath = navPath.replace(/\s/g, "-");

  return navPath;
};

class TopNav extends React.Component {
  state = {
    activeMenuIndex: null
  };

  showTimeoutID = null;
  hideTimeoutID = null;

  _toggleMenu = (index = null) => {
    this.setState({ activeMenuIndex: index });
  };

  handleTouchStart = index => ev => {
    this._toggleMenu(index);
  };

  handleMouseOver = index => ev => {
    clearTimeout(this.hideTimeoutID);
    this.showTimeoutID = setTimeout(() => {
      this._toggleMenu(index);
    }, isMobile.any ? 0 : 166);
  };

  handleMouseOut = index => ev => {
    clearTimeout(this.showTimeoutID);
    this.hideTimeoutID = setTimeout(() => {
      this._toggleMenu();
    }, 166);
  };

  handleSelect = node => ev => {
    ev.preventDefault();
    this._toggleMenu();
    this.props.onSelect(node);
  };

  renderSubmenuItems = (links, parentNode) => {
    if (!links || links.length === 0) return null;

    const { maxVisibleListItems } = this.props;
    const visibleLinks = links.slice(0, maxVisibleListItems);
    const showAllCategories = maxVisibleListItems < links.length;

    return (
      <ul>
        {visibleLinks.map((link, index) => {
          const { title } = link;
          const path = `${parentNode.path}/${titleToNavPath(title)}`;
          const node = { ...link, path };

          return (
            <li key={index}>
              <button onClick={this.handleSelect(node)}>{title}</button>
            </li>
          );
        })}
        {showAllCategories && (
          <li>
            <button className="show-all" onClick={this.handleSelect(parentNode)}>
              all categories
            </button>
          </li>
        )}
      </ul>
    );
  };

  renderSubmenu = (submenu, parentNode) => {
    if (!submenu || submenu.length === 0) return null;

    return (
      <div className="hrmenu__submenu">
        {submenu.map((item, index) => {
          const { title, picture, items } = item;
          const path = `${parentNode.path}/${titleToNavPath(title)}`;
          const node = { ...item, path };

          return (
            <div key={index} className="submenu__col">
              <h4>
                {picture && (
                  <div className="img-mask">
                    <img src={picture} alt={title} />
                  </div>
                )}
                <button onClick={this.handleSelect(node)}>{title}</button>
              </h4>
              {this.renderSubmenuItems(items, node)}
            </div>
          );
        })}
      </div>
    );
  };

  renderMenu = menu => {
    const { activeMenuIndex } = this.state;

    return menu.map(item => {
      const { title, items: submenu } = item;
      const index = title.replace(/\s/, "-").toLowerCase();
      const path = `/${titleToNavPath(title)}`;
      const node = { ...item, path };

      return (
        <li
          key={index}
          onMouseEnter={this.handleMouseOver(index)}
          onMouseLeave={this.handleMouseOut(index)}
          className={classNames("hrmenu__item", {
            "hrmenu__item--active": index === activeMenuIndex
          })}
        >
          <button>{title}</button>
          <CSSTransition in={index === activeMenuIndex} classNames="anim-fade" timeout={300}>
            {this.renderSubmenu(submenu, node)}
          </CSSTransition>
        </li>
      );
    });
  };

  render() {
    const { data } = this.props;

    return (
      <nav className="main__hrmenu">
        <div className="resp-content">
          <ul>{this.renderMenu(data)}</ul>
        </div>
      </nav>
    );
  }
}

TopNav.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  maxVisibleListItems: PropTypes.number
};

TopNav.defaultProps = {
  maxVisibleListItems: 25
};

export default TopNav;
