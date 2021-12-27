import gql from "graphql-tag";
import Product from "../../../included/product-admin/client/graphql/fragments/productWithVariants";

export default gql`
    fragment ProductBundle on ProductBundle {
        _id
        name
        limit
        subtitle
        description
        variantId
        product{
        ...Product
        }
        groups{
            _id
            title
            limit
            items{
              ...Product
        }
        }
        shop{
        _id
        name
        }
  }
  ${Product}
`;