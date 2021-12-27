import React, { useState, useCallback } from "react";
import CustomListItems from "./CustomListItems";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "@reactioncommerce/catalyst";
import ProductsModal from "./ProductsModal";
import { useApolloClient } from "@apollo/react-hooks";
import productsQuery from "../queries/products";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import ItemsGroupModal from "./ItemsGroupModal";
import AddIcon from "mdi-material-ui/Plus";

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
const CustomSubtitle = styled.div`
    font-size: 14px;
    color: #333f45;
    font-weight: 500;
`;

const GroupItem = styled.div`
    padding-top: 15px;
    padding-bottom: 15px;
`;
const GroupItemHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const GroupItemActions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const type = {
    create: "create",
    update: "update"
};

const BundleProducts = (props) => {
    const { onAddBundleItems, bundleId, onRemoveBundleItems, handleCreateBundleItemsGroup, groups, handleUpdateBundleItemsGroup, handleRemoveBundleItemsGroup } = props;
    const [open, setOpen] = useState(false);
    const [groupId, setGroupId] = useState(null);
    const [openGroup, setOpenGroup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSavingGroup, setIsSavingGroup] = useState(false);
    const [savingItems, setIsSavingItems] = useState(false);
    const [removingItems, setIsRemovingItems] = useState(false);
    const [isRemovingGroup, setIsRemovingGroup] = useState(false);
    const [products, setProducts] = useState([]);
    const [submitType, setSubmitType] = useState(type.create);
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

    const addBundleItems = useCallback(async ({ itemIds, id }) => {

        if (!shopId) {
            return;
        }
        setIsSavingItems(true);

        await onAddBundleItems({
            itemIds,
            bundleId,
            shopId,
            groupId: id
        });
        setGroupId(null);
        setIsSavingItems(false);

        handleClose();

    }, []);

    const removeBundleItem = useCallback(async ({ _id }) => {
        const itemIds = [_id];

        if (!shopId) return;

        setIsRemovingItems(true);

        await onRemoveBundleItems({
            itemIds,
            bundleId,
            shopId
        });

        setIsRemovingItems(false);

    }, []);

    const onRemoveBundleItemsGroup = async (groupId) => {
        setIsRemovingGroup(true);
        await handleRemoveBundleItemsGroup(groupId);
        setIsRemovingGroup(false);
    }

    const onUpdateBundleItemsGroup = async (value) => {
        setIsSavingGroup(true);
        await handleUpdateBundleItemsGroup(value);
        setIsSavingGroup(false);
        handleCloseGroup();
    }

    const handleCreateGroup = async (value) => {
        setIsSavingGroup(true);
        await handleCreateBundleItemsGroup(value);
        setIsSavingGroup(false);
        handleCloseGroup();
    };

    const modalProps = {
        open,
        handleClose,
        onFetchData,
        isLoading,
        products,
        addBundleItems,
        groupId,
        isSaving: savingItems
    };

    const currentGroup = groups.find((group) => group._id == groupId);

    const modalGroupProps = {
        open: openGroup,
        handleClose: handleCloseGroup,
        modalTitle: submitType == type.create ? "Nuevo Grupo" : "Editar Grupo",
        buttonText: submitType == type.create ? "Crear Grupo" : "Editar Grupo",
        isSaving: isSavingGroup,
        onSubmit: submitType == type.create ? handleCreateGroup : onUpdateBundleItemsGroup,
        values: currentGroup && {
            title: currentGroup.title,
            limit: currentGroup.limit.toString(),
            groupId
        }
    };

    const handleAddItems = (id) => {
        setGroupId(id);
        handleOpen();
    }

    const handleUpdateGroup = (groupId) => {
        setGroupId(groupId)
        setSubmitType(type.update);
        handleOpenGroup();
    }

    const renderGroups = () => {
        return (
            <div>
                {groups.map((group) => (
                    <GroupItem>
                        <GroupItemHeader>
                            <div>
                            <CustomTitle>{group.title}</CustomTitle>
                            <CustomSubtitle>{`límite de selección: ${group.limit}`}</CustomSubtitle>
                            </div>
                            <GroupItemActions>
                                <Button
                                    color="secondary"
                                    size="small"
                                    onClick={() => handleUpdateGroup(group._id)}
                                >{"Editar"}</Button>
                                <Button
                                    color="error"
                                    size="small"
                                    disabled={isRemovingGroup}
                                    onClick={() => onRemoveBundleItemsGroup(group._id)}
                                >{"Eliminar"}</Button>
                            </GroupItemActions>
                        </GroupItemHeader>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={() => { handleAddItems(group._id) }}
                        >{"Agregar producto"}</Button>
                        <CustomListItems products={group.items || []} onRemoveItem={removeBundleItem} isRemoving={removingItems} />
                    </GroupItem>
                ))}
            </div>
        );
    }

    return (
        <div>
            <CustomHeader>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setGroupId(null);
                        setSubmitType(type.create);
                        handleOpenGroup();
                    }}
                >{"Agregar Grupo"}</Button>
            </CustomHeader>
            {/* <CustomTitle>{"Productos"}</CustomTitle> */}
            {/* <CustomListItems products={productItems} onRemoveItem={removeBundleItem} /> */}
            {renderGroups()}
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