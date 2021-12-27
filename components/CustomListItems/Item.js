import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import RenderMedia from "./RenderMedia";
import { Button } from "@reactioncommerce/catalyst";

const CustomItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-height: 80px;
    border-bottom: 1px solid #F1F1F1;
    padding: 10px;
`;

const ItemLeading = styled.div`
    width: 80px;
    margin: auto
`;

const ItemContent = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
    padding: 10px;
`;

const ItemTrailing = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100px;
    margin: auto;
    align-items: center;
`;

const CustomTitle = styled.div`
    font-size: 16px;
    color: #333f45;
    font-weight: 600;
`;

const CustomDescription = styled.div`
    font-size: 12px;
    color: #565656;
    font-weight: 400;
`;

const Item = (props) => {
    const { product, handleClick, isRemoving } = props;
    const { media, title, description, _id } = product;

    return (
        <CustomItem key={_id}>
            <ItemLeading>
                <RenderMedia
                    media={media}
                />
            </ItemLeading>
            <ItemContent>
                <CustomTitle>{title}</CustomTitle>
                <CustomDescription>{description}</CustomDescription>
            </ItemContent>
            <ItemTrailing>
                <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    disabled={isRemoving}
                    onClick = {()=>handleClick({product})}
                >
                    {"Remover"}
                </Button>
            </ItemTrailing>
        </CustomItem>
    );
};

Item.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string,
        pageTitle: PropTypes.string,
        description: PropTypes.string,
        media: PropTypes.arrayOf(PropTypes.shape({
            URLs: PropTypes.shape({
                small: PropTypes.string,
                thumbnail: PropTypes.string,
                large: PropTypes.string,
                medium: PropTypes.string,
                original: PropTypes.string
            })
        }))
    }),
    handleClick: PropTypes.func
};

Item.defaultProps = {
    product: {

    },
    handleClick() { }
};

export default Item;