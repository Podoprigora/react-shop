import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import AutocompleteField from "../ui/Form/Field/Autocomplete";
import Tooltip from "../ui/Popover/Tooltip";
import { IconButton } from "../ui/Button";
import Badge from "../ui/Badge";
import api from "../../../modules/api";

const Header = params => (
    <div className="main__header">
        <div className="resp-content">
            <Link to="/">
                <span className="main__logo" />
            </Link>
            <AutocompleteField
                asyncRequest={q => api.mainSearch(q)}
                onSelect={(value, el) => {
                    console.log(value);
                }}
                inputProps={{
                    placeholder: "What are you looking for? (jeans or shirt)"
                }}
                className="main__search-bar"
                listHeight="300px"
            />
            <div className="main__buttons">
                <Tooltip title="Person details">
                    <IconButton icon="icon-person_outline" />
                </Tooltip>
                <Tooltip title="Favorites">
                    <IconButton icon="icon-favorite_border">
                        <Badge content="10" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Cart">
                    <IconButton icon="icon-shopping_cart">
                        <Badge content="2" />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    </div>
);

Header.propTypes = {};

export default Header;
