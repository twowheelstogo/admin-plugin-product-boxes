import gql from "graphql-tag";

export default gql`
  mutation createProductBundle($input: CreateProductBundleInput!){
	createProductBundle(input: $input){
	productBundle{
    _id
    name
    limit
    subtitle
    description
    items{
      _id
      title
    }
    variantId
    product{
      _id
    }
    shop{
      _id
      name
    }
  }
  }
}
`;
