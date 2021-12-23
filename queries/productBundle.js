import gql from "graphql-tag";
import ProductBundle from "../fragments/productBundle";

export default gql`
query productBundle($productId: ID, $shopId: ID!, $bundleId: ID){
	productBundle(productId: $productId, shopId: $shopId, bundleId: $bundleId){
    ...ProductBundle
  }
}
  ${ProductBundle}
`;