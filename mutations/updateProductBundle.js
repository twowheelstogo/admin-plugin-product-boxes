import gql from "graphql-tag";

export default gql`
mutation updateProductBundle($input: UpdateProductBundleInput!){
	updateProductBundle(input: $input){
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