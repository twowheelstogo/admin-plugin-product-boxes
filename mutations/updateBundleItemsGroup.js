import gql from "graphql-tag";
import ProductBundle from "../fragments/productBundle";

export default gql`
  mutation updateBundleItemsGroup($input: UpdateBundleItemsGroupInput!) {
  updateBundleItemsGroup(input: $input) {
    productBundle{
				...ProductBundle
    }
  }
}
${ProductBundle}
`;