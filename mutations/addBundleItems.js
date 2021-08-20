import gql from "graphql-tag";

export default gql`
mutation addBundleItems($input: AddBundleItemsInput!){
	addBundleItems(input: $input){
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