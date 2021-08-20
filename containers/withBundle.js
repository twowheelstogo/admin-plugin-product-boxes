import React, { useState, useEffect } from "react";
import HoistNonReactStatics from "hoist-non-react-statics";
import productBundleQuery from "../queries/productBundle.js";
import { useParams } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

export default function withBundle(Component) {
    function WithBundle(props) {
        const [data, useData] = useState(null);
        const params = useParams();
        const apolloClient = useApolloClient();
        const bundleId = params.bundleId;
        const shopId = params.shopId;
        const variables = {
            bundleId,
            shopId
        }
        const fetchData = async () => {
            const { data: resultData } = await apolloClient.query({
                query: productBundleQuery,
                variables
            });
            console.log(resultData);
            if (resultData) {
                useData(resultData);
            }
        }
        useEffect(() => {
            fetchData();
        }, [bundleId, shopId]);
        return (
            <Component
                {...props}
                productBundle={(data && data.productBundle) || null}
                isLoadingProductBundle={false}
            />
        );
    }
    return HoistNonReactStatics(WithBundle, Component);
}
