import React from "react";
import PropTypes from "prop-types";
import EventListener from "react-event-listener";
import classNames from "classnames";
import debounce from "lodash/debounce";
import delay from "lodash/delay";

import InputField from "./InputField";
import OptionsContainer from "./OptionsContainer";
import OptionsList from "./OptionsList";

class AutocompleteField extends React.Component {
  static propTypes = {
    minQueryLength: PropTypes.number,
    options: PropTypes.array,
    displayName: PropTypes.string,
    valueField: PropTypes.string,
    inputProps: PropTypes.shape({
      placeholder: PropTypes.string
    }),
    className: PropTypes.string,
    listHeight: PropTypes.string,
    onSelect: PropTypes.func,
    asyncRequest: PropTypes.func
  };

  static defaultProps = {
    displayName: "title",
    valueField: "id",
    minQueryLength: 3
  };

  state = {
    isFetching: false,
    isCollapsed: true,
    selectedOptionIndex: -1,
    query: "",
    inputValue: "",
    options: this.props.options || []
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.selectedOptionRef && this.enableScrollIntoView) {
      this.selectedOptionRef.scrollIntoView(false);
    }
  }

  inputRef = React.createRef();
  listContainerRef = React.createRef();
  listRef = React.createRef();
  selectedOptionRef = null;
  enableScrollIntoView = true;

  _getOption = index => {
    const { options } = this.state;
    const { displayName } = this.props;
    const optionsRow = options[index];

    if (optionsRow) {
      return optionsRow[this.props.displayName];
    }
    return null;
  };

  handleInputFocus = ev => {
    const { query, options } = this.state;
    const { minQueryLength } = this.props;

    if (query.length >= minQueryLength && options.length > 0) {
      this.setState({ isCollapsed: false });
    }
  };

  handleInputBlur = debounce(ev => {
    this.setState({ isCollapsed: true });
  }, 166);

  handleInputChange = debounce(value => {
    const { minQueryLength, asyncRequest } = this.props;

    if (value.length >= minQueryLength) {
      this.setState({
        isCollapsed: false,
        isFetching: true,
        options: [],
        selectedOptionIndex: -1,
        query: value,
        inputValue: value
      });

      asyncRequest(value).then(res => {
        this.setState({
          isFetching: false,
          isCollapsed: res.length === 0,
          options: res
        });
      });
    } else {
      this.setState({
        isCollapsed: true,
        query: "",
        inputValue: ""
      });
    }
  }, 300);

  handleInputKeyDown = (ev, data) => {
    const { keyCode } = ev;
    const { selectedOptionIndex, options } = this.state;
    const optionsLength = options.length;

    switch (keyCode) {
      // Enter
      case 13:
        this.props.onSelect(this._getOption(selectedOptionIndex));
        this.setState({
          isCollapsed: true
        });
        break;
      // Esc
      case 27:
        this.setState({ isCollapsed: true });
        break;
      // Arrow Up / Arrow Down
      case 38:
      case 40: {
        let newOptionIndex = selectedOptionIndex < optionsLength - 1 ? selectedOptionIndex + 1 : 0;

        if (keyCode === 38) {
          newOptionIndex = selectedOptionIndex > 0 ? selectedOptionIndex - 1 : optionsLength - 1;
        }

        this.enableScrollIntoView = true;

        this.setState(prevState => ({
          selectedOptionIndex: newOptionIndex,
          inputValue: this._getOption(newOptionIndex),
          isCollapsed: false
        }));

        break;
      }
      default:
        break;
    }
  };

  handleInputTriggerClick = (ev, value) => {
    ev.preventDefault();
    if (value) {
      this.props.onSelect(value);
    }
  };

  handleOptionSelect = (ev, index, row) => {
    this.enableScrollIntoView = false;
    this.setState(prevState => ({
      selectedOptionIndex: index,
      inputValue: row[this.props.displayName],
      isCollapsed: true
    }));
    this.props.onSelect(row[this.props.displayName]);
  };

  render() {
    const { inputProps, className, listHeight } = this.props;
    const { isCollapsed, isFetching, options, selectedOptionIndex, query, inputValue } = this.state;

    return (
      <div
        className={classNames("autocomplete", {
          [className]: className
        })}
      >
        <InputField
          {...inputProps}
          inputRef={this.inputRef}
          value={inputValue}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleInputKeyDown}
          onChange={this.handleInputChange}
          onTriggerClick={this.handleInputTriggerClick}
        />

        {!isCollapsed && (
          <OptionsContainer height={listHeight}>
            {isFetching ? (
              <div className="infinite-spinner size-26" />
            ) : (
              <OptionsList
                data={options}
                highlight={query}
                selectedRowIndex={selectedOptionIndex}
                selectedRowRef={el => {
                  this.selectedOptionRef = el;
                }}
                onSelect={this.handleOptionSelect}
              />
            )}
          </OptionsContainer>
        )}
      </div>
    );
  }
}

export default AutocompleteField;
