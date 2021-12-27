import gql from "graphql-tag";
import ProductBundle from "../fragments/productBundle";

export default gql`
  mutation createProductBundle($input: CreateProductBundleInput!){
	createProductBundle(input: $input){
	productBundle{
    ...ProductBundle
  }
  }
}
  ${ProductBundle}
`;
