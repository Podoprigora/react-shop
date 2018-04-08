import React from "react";
import PropTypes from "prop-types";
import match from "autosuggest-highlight/match";

const OptionsList = props => {
  const { data, selectedRowIndex = 0, listRef, selectedRowRef, onSelect, highlight } = props;

  return (
    <ul className="autocomplete__options-list" ref={listRef}>
      {data &&
        data.map((row, index) => {
          const { title } = row;
          const matches = match(title, highlight);
          let highlightText = title;

          if (matches && matches.length > 0) {
            highlightText = `${title.slice(0, matches[0][0])}
              <span>${title.slice(matches[0][0], matches[0][1])}</span>
              ${title.slice(matches[0][1])}`;
          }

          return (
            <li key={index}>
              <a
                role="presentation"
                className={index === selectedRowIndex ? "list__row--selected" : null}
                ref={el => (index === selectedRowIndex ? selectedRowRef(el) : null)}
                onClick={ev => onSelect(ev, index, row)}
                /* eslint-disable */
                dangerouslySetInnerHTML={{ __html: highlightText }}
              />
            </li>
          );
        })}
    </ul>
  );
};

OptionsList.propTypes = {
  data: PropTypes.array,
  selectedRowIndex: PropTypes.number,
  listRef: PropTypes.object,
  highlight: PropTypes.string,
  selectedRowRef: PropTypes.func,
  onSelect: PropTypes.func
};

export default OptionsList;
