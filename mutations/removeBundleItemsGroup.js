import gql from "graphql-tag";
import ProductBundle from "../fragments/productBundle";

export default gql`
  mutation removeBundleItemsGroup($input: RemoveBundleItemsGroupInput!) {
  removeBundleItemsGroup(input: $input) {
    productBundle{
      ...ProductBundle
    }
  }
}
${ProductBundle}
`;