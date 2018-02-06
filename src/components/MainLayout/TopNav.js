import React from "react";
import classNames from "classnames";

/* prettier-ignore */
const hrMenuConfig = [
  {
    title: "Products",
    menu: [
      {
        items: [
          {
            group: "Learning & Games",
            items: [
              { title: "Catch the Bullet" },
              { title: "Snoopydoo" },
              { title: "Fallen Angel" },
              { title: "Sui Maker" },
              { title: "Wave Master" },
              { title: "Golf Pro" }
            ]
          }
        ]
      },
      {
        items: [
          {
            group: "Utilities",
            items: [
              { title: "Gadget Finder" },
              { title: "Green Tree Express" },
              { title: "Green Tree Pro" },
              { title: "Wobbler 3.0" },
              { title: "Coolkid" }
            ]
          }
        ]
      },
      {
        items: [
          {
            group: "Education",
            items: [
              { title: "Learn Thai" },
              { title: "Math Genius" },
              { title: "Chemokid" }
            ]
          },
          {
            group: "Professionals",
            items: [
              { title: "Success 1.0" },
              { title: "Moneymaker" }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Downloads"
  },
  {
    title: "Applications"
  },
  {
    title: "Projects"
  },
  {
    title: "Freeware"
  }
];

class TopNav extends React.Component {
  state = {
    activeMenuIndex: null
  };

  handleMouseOver = index => ev => {
    this.setState({ activeMenuIndex: index });
  };

  handleMouseOut = index => ev => {
    this.setState({ activeMenuIndex: null });
  };

  renderMenu = menu =>
    menu.map(item => {
      const { title, menu: submenu } = item;
      const index = title.replace(/\s/, "-").toLowerCase();

      return (
        <li
          key={index}
          onMouseEnter={this.handleMouseOver(index)}
          onMouseLeave={this.handleMouseOut(index)}
          className={classNames({
            "hrmenu__item--active": index === this.state.activeMenuIndex
          })}
        >
          <a href="/">{item.title}</a>
          {this.renderSubmenu(submenu)}
        </li>
      );
    });

  renderSubmenu = submenu => {
    if (!submenu || submenu.length === 0) return null;

    return (
      <div className="hrmenu__submenu">
        {submenu.map((item, index) => {
          const { items } = item;

          return <div key={index}>Submenu {index}</div>;
        })}
      </div>
    );
  };

  render() {
    return (
      <nav className="main__hrmenu">
        <div className="resp-content">
          <ul>{this.renderMenu(hrMenuConfig)}</ul>
        </div>
      </nav>
    );
  }
}

export default TopNav;
