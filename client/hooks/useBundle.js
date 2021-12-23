import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { productBundleQuery } from "../../queries";
import { updateProductBundleMutation, addBundleItemsMutation, removeBundleItemsMutation } from "../../mutations";
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
        shopId: shopIdLocal = shopId
    }) => {
        try {
            await addBundleItems({
                variables: {
                    input: {
                        itemIds,
                        bundleId: bundleIdLocal,
                        shopId: shopIdLocal
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

    return {
        isLoading,
        productBundle: bundleQueryResult && bundleQueryResult.productBundle,
        refetchBundle,
        onUpdateBundle,
        onAddBundleItems,
        onRemoveBundleItems,
        shopId
    }

}

export default useBundle;
