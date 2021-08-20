import gql from "graphql-tag";
import Product from "../../../included/product-admin/client/graphql/fragments/productWithVariants";

export default gql`
    query ProductBundles(
  $after: ConnectionCursor
  $before: ConnectionCursor
  $first: ConnectionLimitInt
  $last:  ConnectionLimitInt
  $metafieldKey: String
  $metafieldValue: String
  $offset: Int
  $productIds: [ID]
  $query: String
  $shopIds: [ID]!
  $sortOrder: SortOrder
  $bundleIds: [ID]
) {
  productBundles(
    after: $after
    before: $before
    first: $first
    last: $last
    metafieldKey: $metafieldKey
    metafieldValue: $metafieldValue
    offset: $offset
    productIds: $productIds
    query: $query
    shopIds: $shopIds
    sortOrder: $sortOrder
    bundleIds: $bundleIds
  ) {
    nodes {
      _id
      name
      subtitle
      description
      items{
				...Product
      }
      variantId
      product{
        ...Product
      }
      shop{
        _id
      }
    }
      pageInfo {
        hasNextPage
      }
      totalCount
  }
}
  ${Product}
`;