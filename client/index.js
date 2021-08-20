import React from "react";
import { withApollo } from "react-apollo";
import CodeBracesBox from "mdi-material-ui/Archive";
import { registerOperatorRoute } from "/imports/client/ui";
import { ProductBundlesTable } from "../components";
import ProductBundleDetailLayout from "../layout/ProductBundleDetailLayout";
import ContentViewExtraWideLayout from "/imports/client/ui/layouts/ContentViewExtraWideLayout";

registerOperatorRoute({
  MainComponent: ProductBundleDetailLayout,
  path: "/bundles/:bundleId/:handle?/:variantId?"
});

registerOperatorRoute({
  group: "navigation",
  LayoutComponent: ContentViewExtraWideLayout,
  MainComponent: ProductBundlesTable,
  hocs: [
    withApollo
  ],
  path: "/bundles",
  // eslint-disable-next-line react/display-name
  SidebarIconComponent: (props) => <CodeBracesBox {...props} />,
  sidebarI18nLabel: "admin.bundles"
});