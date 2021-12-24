import React, { useState, useCallback } from "react";
import CustomListItems from "./CustomListItems";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import ProductsModal from "./ProductsModal";
import { useApolloClient } from "@apollo/react-hooks";
import productsQuery from "../queries/products";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import ItemsGroupModal from "./ItemsGroupModal";

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
    const { products: productItems, onAddBundleItems, bundleId, onRemoveBundleItems, handleCreateBundleItemsGroup } = props;
    const [open, setOpen] = useState(false);
    const [openGroup, setOpenGroup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSavingGroup, setIsSavingGroup] = useState(false);
    const [products, setProducts] = useState([]);
    const apolloClient = useApolloClient();
    const [shopId] = useCurrentShopId();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenGroup = () => setOpenGroup(true);
    const handleCloseGroup = () => setOpenGroup(false);

    const onFetchData = useCallback(async ({ globalFilter }) => {
        setIsLoading(true);
        if (!shopId) {
            return;
        }

        const { data } = await apolloClient.query({
            query: productsQuery,
            variables: {
                shopIds: [shopId],
                query: globalFilter,
                first: 100
            },
            fetchPolicy: "network-only"
        });

        if (data) {
            setProducts(data.products.nodes);
        }

        setIsLoading(false);
    }, [apolloClient, shopId]);

    const addBundleItems = useCallback(async ({ itemIds }) => {

        if (!shopId) {
            return;
        }

        await onAddBundleItems({
            itemIds,
            bundleId,
            shopId
        });

        handleClose();

    }, []);

    const removeBundleItem = useCallback(async ({ _id }) => {
        const itemIds = [_id];

        if (!shopId) return;

        await onRemoveBundleItems({
            itemIds,
            bundleId,
            shopId
        });

    }, []);

    const modalProps = {
        open,
        handleClose,
        onFetchData,
        isLoading,
        products,
        addBundleItems
    };

    const modalGroupProps = {
        open: openGroup,
        handleClose: handleCloseGroup,
        modalTitle: "Nuevo Grupo",
        buttonText: "Crear Grupo",
        onSubmit: async (value) => { 
            setIsSavingGroup(true);
            await handleCreateBundleItemsGroup(value);
            setIsSavingGroup(false);
            handleCloseGroup();
         }
    };

    return (
        <div>
            <CustomHeader>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenGroup}
                >{"Agregar Grupo"}</Button>
            </CustomHeader>
            <CustomTitle>{"Productos"}</CustomTitle>
            <CustomListItems products={productItems} onRemoveItem={removeBundleItem} />
            <ProductsModal
                {...modalProps}
            />
            <ItemsGroupModal
                {...modalGroupProps}
            />
        </div>
    );
}

BundleProducts.propTypes = {
    products: PropTypes.arrayOf(PropTypes.any),
    onAddBundleItems: PropTypes.func,
    bundleId: PropTypes.string.isRequired,
};

BundleProducts.defaultProps = {
    products: [],
    onAddBundleItems() { },
    bundleId: ""
};

export default BundleProducts;