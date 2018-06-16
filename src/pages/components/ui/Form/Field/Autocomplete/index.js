import React from "react";
import PropTypes from "prop-types";
import EventListener from "react-event-listener";
import classNames from "classnames";
import debounce from "lodash/debounce";

import { DOMHasParent } from "../../../utils/dom";
import Field from "./Field";
import OptionsContainer from "./OptionsContainer";
import OptionsList from "./OptionsList";
import CircularProgress from "../../../Progress/Circular";

class AutocompleteField extends React.Component {
  static propTypes = {
    minQueryLength: PropTypes.number,
    isPersistQueryToLocalStorage: PropTypes.bool,
    persistFieldName: PropTypes.string,
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
    isPersistQueryToLocalStorage: true,
    persistFieldName: "persistQueryOptions",
    displayName: "title",
    valueField: "id",
    minQueryLength: 3
  };

  constructor(props) {
    super(props);

    const persistQueryOptions = this._getPersistQueryOptions() || [];
    let options = [];

    if (persistQueryOptions.length > 0 && props.isPersistQueryToLocalStorage) {
      options = persistQueryOptions;
    }

    this.state = {
      isFetching: false,
      isCollapsed: true,
      selectedOptionIndex: -1,
      query: "",
      inputValue: "",
      options
    };

    this.componentRef = React.createRef();
    this.inputRef = React.createRef();
    this.listContainerRef = React.createRef();
    this.listRef = React.createRef();
    this.selectedOptionRef = null;
    this.enableScrollIntoView = true;
    this.preventFocusHandler = false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.selectedOptionRef && this.enableScrollIntoView) {
      this.selectedOptionRef.scrollIntoView({
        block: "nearest",
        inline: "nearest"
      });
    }
  }

  _getPersistQueryOptions = () => {
    const { persistFieldName } = this.props;

    return JSON.parse(localStorage.getItem(persistFieldName));
  };

  _addQueryToLocalStorage = query => {
    const { displayName, persistFieldName } = this.props;
    let persistQueryOptions = JSON.parse(localStorage.getItem(persistFieldName)) || [];

    if (persistQueryOptions.length) {
      persistQueryOptions = persistQueryOptions.filter(row => row[displayName] !== query.trim());
    } else {
      persistQueryOptions.push({ _local: true, title: "Clear All" });
    }
    const newPersistQueryOptions = [{ [displayName]: query.trim(), _local: true }, ...persistQueryOptions];
    localStorage.setItem(persistFieldName, JSON.stringify(newPersistQueryOptions));
  };

  _removePersistQueryOptions = () => {
    const { persistFieldName } = this.props;

    localStorage.removeItem(persistFieldName);
  };

  _doAsyncRequest = query => {
    const { asyncRequest, isPersistQueryToLocalStorage } = this.props;

    this.setState({
      isCollapsed: false,
      isFetching: true,
      options: [],
      selectedOptionIndex: -1,
      query,
      inputValue: query
    });

    asyncRequest(query).then(res => {
      this.setState({
        isFetching: false,
        isCollapsed: res.length === 0,
        options: res
      });

      if (isPersistQueryToLocalStorage) {
        this._addQueryToLocalStorage(query);
      }
    });
  };

  _doInputChange = value => {
    const { minQueryLength, isPersistQueryToLocalStorage } = this.props;

    if (value.toLowerCase() === "clear all" && isPersistQueryToLocalStorage) {
      this.setState({
        isCollapsed: true,
        query: "",
        inputValue: "",
        selectedOptionIndex: -1,
        options: []
      });
      this._removePersistQueryOptions();
    } else if (value.length >= minQueryLength) {
      this._doAsyncRequest(value);
    } else if (value.length === 0) {
      this.setState({
        isCollapsed: true,
        query: "",
        inputValue: "",
        selectedOptionIndex: -1,
        options: isPersistQueryToLocalStorage ? this._getPersistQueryOptions() : []
      });
    }
  };

  handleInputFocus = ev => {
    const { query, options } = this.state;
    const { minQueryLength } = this.props;

    if (!this.preventFocusHandler && (query.length >= minQueryLength || options.length > 0)) {
      this.setState({ isCollapsed: false });
    }
    this.preventFocusHandler = false;
  };

  handleDocumentBlur = ev => {
    const { isFetching, isCollapsed } = this.state;
    const clickedOnComponent = DOMHasParent(ev.target, this.componentRef.current);

    if (!isFetching && !clickedOnComponent && !isCollapsed) {
      this.setState({ isCollapsed: true });
    }
  };

  handleInputChange = debounce(value => {
    this._doInputChange(value);
  }, 1200);

  handleInputKeyDown = (ev, data) => {
    const { keyCode } = ev;
    const { displayName } = this.props;
    const { selectedOptionIndex, options } = this.state;
    const optionsLength = options.length;
    let optionRow = options[selectedOptionIndex];

    switch (keyCode) {
      // Enter
      case 13: {
        if (optionRow && optionRow._local) {
          this._doInputChange(optionRow[displayName]);
        } else {
          this.setState({ isCollapsed: true });
          if (optionRow[displayName]) {
            this.props.onSelect(optionRow[displayName]);
          }
        }
        break;
      }
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

        optionRow = options[newOptionIndex];

        if (optionRow) {
          this.enableScrollIntoView = true;
          this.setState(prevState => ({
            selectedOptionIndex: newOptionIndex,
            inputValue: optionRow[displayName].toLowerCase() !== "clear all" ? optionRow[displayName] : "",
            isCollapsed: false
          }));
        }
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
    const { displayName } = this.props;

    if (row._local) {
      this._doInputChange(row[displayName]);
      this.inputRef.current.focus();
    } else {
      this.enableScrollIntoView = false;

      this.setState(
        {
          selectedOptionIndex: index,
          inputValue: row[displayName],
          isCollapsed: true
        },
        () => {
          this.preventFocusHandler = true;
          this.inputRef.current.focus();
        }
      );

      this.props.onSelect(row[displayName]);
    }
  };

  render() {
    const { inputProps, className, listHeight } = this.props;
    const { isCollapsed, isFetching, options, selectedOptionIndex, query, inputValue } = this.state;

    return (
      <div
        className={classNames("autocomplete", {
          [className]: className
        })}
        ref={this.componentRef}
      >
        <EventListener target="document" onClick={this.handleDocumentBlur} />
        <Field
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
              <CircularProgress preset="small" />
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
