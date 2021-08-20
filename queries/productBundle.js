import gql from "graphql-tag";
import Product from "../../../included/product-admin/client/graphql/fragments/productWithVariants";


export default gql`
query productBundle($productId: ID, $shopId: ID!, $bundleId: ID){
	productBundle(productId: $productId, shopId: $shopId, bundleId: $bundleId){
    _id
    name
    limit
    subtitle
    description
    items{
      _id
      title
    }
    variantId
    product{
      ...Product
    }
      items{
        ...Product
      }
    shop{
      _id
      name
    }
  }
}
  ${Product}
`;