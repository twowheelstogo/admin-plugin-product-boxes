import React from "react";
import styled from "styled-components";
import { applyTheme } from "@reactioncommerce/components/utils";
import BundleForm from "../components/BundleForm";
import ProductMedia from "./productMedia";

const Section = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid #F1F1F1;
    padding: 5px;
`;

const SectionDetails = styled.div`
    flex: 1 1 100%;
    @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
        flex: 0 1 calc(40% - 9px);
    }
`;
const SectionActions = styled.div`
    flex: 1 1 100%;
    @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
        flex: 0 1 calc(50% - 9px);
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

const BundleConfiguration = (props) => {
    const {productBundle} = props;

if(!productBundle) return <div>{"cargando..."}</div>
    const {product, shop} = productBundle;

    const handleSubmitDetails = (value) => {
        console.log("value", value);
    }

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
                        ref={(formEl) => {
                            ref = formEl
                        }}
                    />
                </SectionActions>
            </Section>
            <Section>
                <SectionDetails>
                    <SectionTitle>{"Galería"}</SectionTitle>
                    <SectionDescription>{"Sube una foto en esta sección"}</SectionDescription>
                </SectionDetails>
                <SectionActions>
                    <ProductMedia 
                        product = {product}
                        shopId = {shop?._id}
                    />
                </SectionActions>
            </Section>
            <Section>
                <SectionDetails>
                    <SectionTitle>{"Precio"}</SectionTitle>
                    <SectionDescription>{"Configura el precio de tu bundle"}</SectionDescription>
                </SectionDetails>
                <SectionActions>
                    pricing section
                </SectionActions>
            </Section>
        </Grid>
    );
}

export default BundleConfiguration;