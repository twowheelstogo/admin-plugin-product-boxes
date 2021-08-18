import gql from "graphql-tag";

export default gql`
  mutation createProductBundle($input: CreateProductBundleInput!){
	createProductBundle(input: $input){
	productBundle{
    _id
    name
    limit
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
