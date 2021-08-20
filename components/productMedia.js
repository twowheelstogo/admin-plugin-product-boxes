import React from "react";
import { i18next } from "/client/api";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ProductMediaGallery from "../../../included/product-admin/client/components/ProductMediaGallery";

/**
 * Product media form block component
 * @param {Object} props Component props
 * @returns {React.Component} React component
 */
function ProductMediaForm(props) {
  const { product, shopId } = props;
  
  if (!product) {
    return null;
  }

  return (
    <Card>
      <CardHeader title={i18next.t("admin.productAdmin.mediaGallery")} />
      <CardContent>
        <ProductMediaGallery
          editable={true}
          media={product.media}
          productId={product._id}
          shopId={shopId}
        />
      </CardContent>
    </Card>
  );
}

export default ProductMediaForm;
