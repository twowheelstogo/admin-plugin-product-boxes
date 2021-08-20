import React from "react";
import CustomListItems from "./CustomListItems";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const CustomHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 20px;
`;

const CustomTitle = styled.div`
    font-size: 16px;
    color: #333f45;
    font-weight: 600;
`;

const BundleProducts = (props) => {
    const { products, onAddBundleItems } = props;

    return (
        <div>
            <CustomHeader>
                <Button
                    variant="contained"
                    color="primary"
                >{"Agregar producto"}</Button>
            </CustomHeader>
            <CustomTitle>{"Productos"}</CustomTitle>
            <CustomListItems products={products} />
        </div>
    );
}

BundleProducts.propTypes = {
    products: PropTypes.arrayOf(PropTypes.any),
    onAddBundleItems: PropTypes.func
};

BundleProducts.defaultProps = {
    products: [],
    onAddBundleItems() { }
};

export default BundleProducts;