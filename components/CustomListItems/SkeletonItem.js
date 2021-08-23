import React from "react";
import styled from "styled-components";
import { Skeleton } from "@material-ui/core";

const CustomItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid #F1F1F1;
    padding: 10px;
`;

const ItemLeading = styled.div`
    width: 40px;
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

const SkeletonItem = (props) => {

    return(
        <CustomItem>
            <ItemLeading>
                <Skeleton variant="rect"/>
            </ItemLeading>
            <ItemContent>
                <Skeleton variant="text"/>
            </ItemContent>
            <ItemTrailing>
                <Skeleton variant="rect" width={20} height={20}/>
            </ItemTrailing>
        </CustomItem>
    );
};

export default SkeletonItem;
