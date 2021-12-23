import gql from "graphql-tag";
import ProductBundle from "../fragments/productBundle";
export default gql`
mutation addBundleItems($input: AddBundleItemsInput!){
	addBundleItems(input: $input){
	productBundle{
    ...ProductBundle
  }
  }
}
${ProductBundle}
`;