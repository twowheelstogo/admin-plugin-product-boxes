import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "./Item";

class CustomListItems extends Component {

    render() {
        const { products } = this.props;
        return (
            <div>
                {products.map((product) => <Item product={product} />)}
            </div>
        );
    }
};

CustomListItems.propTypes = {
    products: PropTypes.arrayOf(PropTypes.any)
};

CustomListItems.defaultProps = {
    products: []
};

export default CustomListItems;
