import gql from "graphql-tag";
import ProductBundle from "../fragments/productBundle";

export default gql`
   mutation createBundleItemsGroup($input: CreateBundleItemsGroupInput!) {
  createBundleItemsGroup(input: $input) {
    productBundle{
      ...ProductBundle
    }
  }
}
${ProductBundle}
`;