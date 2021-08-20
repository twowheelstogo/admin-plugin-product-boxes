import gql from "graphql-tag";

export default gql`
query productBundle($productId: ID, $shopId: ID!, $bundleId: ID){
	productBundle(productId: $productId, shopId: $shopId, bundleId: $bundleId){
    _id
    name
    limit
    items{
      _id
      title
    }
    product{
      _id
      title
      pageTitle
      description
      media{
        URLs{
          original
          thumbnail
          large
          medium
          small
        }
      }
      variants{
        _id
        title
        pricing{
          maxPrice
          compareAtPrice{
            amount
          }
          displayPrice
        }
      }
    }
      items{
        _id
        title
        media{
          URLs{
            original
          }
        }
        description
        pricing{
          displayPrice
        }
      }
    shop{
      _id
      name
    }
  }
}
`;