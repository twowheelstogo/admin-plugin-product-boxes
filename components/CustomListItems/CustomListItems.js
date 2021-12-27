import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "./Item";

class CustomListItems extends Component {

    handleClick = ({ product }) => {
        const { onRemoveItem } = this.props;

        onRemoveItem({ _id: product._id });
    }

    render() {
        const { products, isRemoving } = this.props;
        return (
            <div>
                {products.map((product) => <Item product={product} handleClick={this.handleClick} isRemoving={isRemoving} />)}
            </div>
        );
    }
};

CustomListItems.propTypes = {
    products: PropTypes.arrayOf(PropTypes.any),
    onRemoveItems: PropTypes.func
};

CustomListItems.defaultProps = {
    products: [],
    onRemoveItem() { }
};

export default CustomListItems;
