import React from "react";
import PropTypes from "prop-types";

class TestPage extends React.Component {
    state = {};

    handleTest = ev => {};

    render() {
        return (
            <div>
                The page for test reasons
                <button onClick={this.handleTest}>Test</button>
            </div>
        );
    }
}

TestPage.propTypes = {};

export default TestPage;
