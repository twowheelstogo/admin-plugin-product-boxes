import React from "react";
import styled from "styled-components";
import { applyTheme } from "@reactioncommerce/components/utils";
import BundleForm from "../components/BundleForm";
import ProductMedia from "./productMedia";
import BundlePricingForm from "./BundlePricingForm";
import { Button, Box } from "@material-ui/core";

const Section = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid #F1F1F1;
    padding-bottom: 20px;
`;

const SectionDetails = styled.div`
    flex: 1 1 100%;
    @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
        flex: 0 1 calc(30% - 9px);
    }
`;
const SectionActions = styled.div`
    flex: 1 1 100%;
    @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
        flex: 0 1 calc(70% - 9px);
    }
    display: flex;
    flex-direction: column;
`;

const SectionTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: black;
`;

const SectionDescription = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: #565656;
`;

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const buildFormvalue = (value) => {
    return {
        name: value.name,
        description: value.description,
        subtitle: value.subtitle,
        limit: value.limit && value.limit.toString()
    }
}

const buildPricing = (product, variantId) => {

    console.log(product, variantId)

    const variant = product.variants[0];

    console.log(variant);

    if (!variant) return null;

    return {
        price: variant.pricing.price.toString(),
        compareAtPrice: {
            amount: variant.pricing.compareAtPrice ? variant.pricing.compareAtPrice.amount.toString() : 0
        }
    }
}

const convertPricingToFloat = (pricing) => {
    if (!Number.isNaN(Number(pricing.price)) && !Number.isNaN(Number(pricing.compareAtPrice.amount))) {
        return {
            price: Number(pricing.price),
            compareAtPrice: {
                amount: Number(pricing.compareAtPrice.amount)
            }
        }
    }
    return pricing;
}

const BundleConfiguration = (props) => {
    const { productBundle, onUpdateProductVariantPrices, onUpdateBundle } = props;

    if (!productBundle) return <div>{"cargando..."}</div>
    const { product, shop, variantId } = productBundle;

    const updateProductPricing = async (value) => {
        console.log("prices", convertPricingToFloat(value));
        await onUpdateProductVariantPrices({
            variantId: productBundle.variantId,
            variantPrices: convertPricingToFloat(value)
        })
    };

    const updateBundle = async (value) => {
        await onUpdateBundle({
            productBundle: value,
            bundleId: productBundle._id,
            shopId: shop._id
        });
    }

    const handleSubmitDetails = (value) => {
        updateBundle(value);
    };

    const handleSubmitPricing = (value) => {
        updateProductPricing(value);
    };

    let bundleFormRef = null;
    let bundlePricingRef = null;

    return (
        <Grid>
            <Section>
                <SectionDetails>
                    <SectionTitle>{"Detalles"}</SectionTitle>
                    <SectionDescription>{"Nombra tu bundle, agrega una descripción acerca de tu producto"}</SectionDescription>
                </SectionDetails>
                <SectionActions>
                    <BundleForm
                        onSubmit={handleSubmitDetails}
                        value={buildFormvalue(productBundle)}
                        ref={(formEl) => {
                            bundleFormRef = formEl
                        }}
                    />
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => { bundleFormRef._form.submit() }}
                        >{"Guardar Cambios"}</Button>
                    </Box>
                </SectionActions>
            </Section>
            <Section>
                <SectionDetails>
                    <SectionTitle>{"Galería"}</SectionTitle>
                    <SectionDescription>{"Sube una foto en esta sección"}</SectionDescription>
                </SectionDetails>
                <SectionActions>
                    <ProductMedia
                        product={product}
                        shopId={shop?._id}
                    />
                </SectionActions>
            </Section>
            <Section>
                <SectionDetails>
                    <SectionTitle>{"Precio"}</SectionTitle>
                    <SectionDescription>{"Configura el precio de tu bundle"}</SectionDescription>
                </SectionDetails>
                <SectionActions>
                    <BundlePricingForm
                        value={buildPricing(product, variantId)}
                        ref={(formEl) => {
                            bundlePricingRef = formEl
                        }}
                        onSubmit={handleSubmitPricing}
                    />
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => { bundlePricingRef._form.submit() }}
                        >{"Guardar Cambios"}</Button>
                    </Box>
                </SectionActions>
            </Section>
        </Grid>
    );
}

export default BundleConfiguration;