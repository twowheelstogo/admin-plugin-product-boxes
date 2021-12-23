import gql from "graphql-tag";
import ProductBundle from "../fragments/productBundle";

export default gql`
mutation updateProductBundle($input: UpdateProductBundleInput!){
	updateProductBundle(input: $input){
	productBundle{
    ...ProductBundle
  }
  }
}
  ${ProductBundle}
`;