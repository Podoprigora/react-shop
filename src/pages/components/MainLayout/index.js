import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import Header from "./Header";
import TopNav from "./TopNav";
import Footer from "./Footer";

import categoriesData from "../../../../data/categories";

const MainLayout = ({ children, history, match }) => {
    const handleSelect = ({ path }) => {
        history.push(path);
    };

    return (
        <div className="main">
            <Header />
            <TopNav data={categoriesData} maxVisibleListItems={5} onSelect={handleSelect} />
            <div className="main__content">
                <div className="resp-content">{children}</div>
            </div>
            <Footer />
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export default withRouter(MainLayout);
