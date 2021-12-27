import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { productBundleQuery } from "../../queries";
import {
    updateProductBundleMutation,
    addBundleItemsMutation,
    removeBundleItemsMutation,
    createBundleItemsGroupMutation,
    removeBundleItemsGroupMutation,
    updateBundleItemsGroupMutation
} from "../../mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";

/**
 * @method useBundle
 * @summary useBundle hook
 * @param {Object} args input arguments
 * @param {String} args.bundleId Bundle Id to load bundle data for
 * @param {String} args.shopId  Shop Id to load bundle data for
 * @returns {Object} Result containing the bundle and other helpers for managing that product
 */
function useBundle(args = {}) {
    const { enqueueSnackbar } = useSnackbar();

    const {
        bundleId: bundleIdProp,
        shopId: shopIdProp
    } = args;

    const routeParams = useParams();
    const bundleId = routeParams.bundleId || bundleIdProp;
    const shopId = routeParams.shopId || shopIdProp;
    const [updateProductBundle] = useMutation(updateProductBundleMutation);
    const [addBundleItems] = useMutation(addBundleItemsMutation);
    const [removeBundleItems] = useMutation(removeBundleItemsMutation);
    const [createBundleItemsGroup] = useMutation(createBundleItemsGroupMutation);
    const [removeBundleItemsGroup] = useMutation(removeBundleItemsGroupMutation);
    const [updateBundleItemsGroup] = useMutation(updateBundleItemsGroupMutation);
    const { data: bundleQueryResult, isLoading, refetch: refetchBundle } = useQuery(productBundleQuery, {
        variables: {
            shopId,
            bundleId
        },
        skip: !shopId
    });

    const { productBundle } = bundleQueryResult || {};

    const onUpdateBundle = useCallback(async ({
        productBundle: bundleLocal,
        bundleId: bundleIdLocal = productBundle._id,
        shopId: shopIdLocal = shopId
    }) => {
        let bundleInput = bundleLocal;
        if (!Number.isNaN(Number(bundleLocal.limit))) {
            bundleInput = {
                ...bundleLocal,
                limit: Number(bundleLocal.limit)
            }
        }
        try {
            await updateProductBundle({
                variables: {
                    input: {
                        bundleId: bundleIdLocal,
                        shopId: shopIdLocal,
                        productBundle: bundleInput
                    }
                }
            });
            refetchBundle();
            enqueueSnackbar("Bundle actualizado correctamente", { variant: "success" });
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar("Error al actualizar el bundle", { variant: "error" });
        }
    }, [productBundle, enqueueSnackbar]);

    const onAddBundleItems = useCallback(async ({
        itemIds,
        bundleId: bundleIdLocal = productBundle._id,
        shopId: shopIdLocal = shopId,
        groupId
    }) => {
        try {
            await addBundleItems({
                variables: {
                    input: {
                        itemIds,
                        bundleId: bundleIdLocal,
                        shopId: shopIdLocal,
                        groupId
                    }
                }
            });

            refetchBundle();

            enqueueSnackbar("Productos agregados correctamente", { variant: "success" });
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar("Error al agregar productos al bundle", { variant: "error" });
        }
    }, [productBundle, refetchBundle]);

    const onRemoveBundleItems = useCallback(async ({
        itemIds,
        bundleId: bundleIdLocal = productBundle._id,
        shopId: shopIdLocal = shopId
    }) => {
        try {
            await removeBundleItems({
                variables: {
                    input: {
                        itemIds,
                        bundleId: bundleIdLocal,
                        shopId: shopIdLocal
                    }
                }
            });

            refetchBundle();

            enqueueSnackbar("Producto eliminado de la lista correctamente", { variant: "success" });
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar("Error al eliminar producto del bundle", { variant: "error" });
        }
    }, [productBundle, refetchBundle]);

    const handleCreateBundleItemsGroup = async ({ title, limit }) => {
        try {
            if (Number.isNaN(Number(limit))) throw new Error("el campo límite debe ser de tipo texto");

            await createBundleItemsGroup({
                variables: {
                    input: {
                        bundleId: productBundle._id,
                        title,
                        limit: Number(limit)
                    }
                }
            });

            refetchBundle();

            enqueueSnackbar("Grupo creado correctamente", { variant: "success" });
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar(`${error.message}`, { variant: "error" });
        }
    }

    const handleUpdateBundleItemsGroup = async ({ groupId, title, limit }) => {
        try {
            if (limit && Number.isNaN(Number(limit))) throw new Error("el campo límite debe ser de tipo texto");
            const groupInput = {
                title,
                limit: Number(limit)
            }

            await updateBundleItemsGroup({
                variables: {
                    input: {
                        groupId,
                        bundleId,
                        shopId,
                        group: groupInput
                    }
                }
            });

            refetchBundle();

            enqueueSnackbar("Grupo actualizado correctamente", { variant: "success" });
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar(`${error.message}`, { variant: "error" });
        }
    }

    const handleRemoveBundleItemsGroup = async (groupId) => {
        try {
            await removeBundleItemsGroup({
                variables: {
                    input: {
                        groupId,
                        bundleId,
                        shopId
                    }
                }
            });

            refetchBundle();

            enqueueSnackbar("Grupo eliminado correctamente", { variant: "success" });
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar(`${error.message}`, { variant: "error" });
        }
    }

    return {
        isLoading,
        productBundle: bundleQueryResult && bundleQueryResult.productBundle,
        refetchBundle,
        onUpdateBundle,
        onAddBundleItems,
        onRemoveBundleItems,
        shopId,
        createBundleItemsGroup: handleCreateBundleItemsGroup,
        handleUpdateBundleItemsGroup,
        handleRemoveBundleItemsGroup
    }

}

export default useBundle;
