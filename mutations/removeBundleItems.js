import gql from "graphql-tag";
import ProductBundle from "../fragments/productBundle";

export default gql`
mutation removeBundleItems($input: RemoveBundleItemsInput!){
	removeBundleItems(input: $input){
	productBundle{
    ...ProductBundle
  }
  }
}
  ${ProductBundle}
`;