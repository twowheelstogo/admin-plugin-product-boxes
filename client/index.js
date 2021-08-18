import React from "react";
import { withApollo } from "react-apollo";
import CodeBracesBox from "mdi-material-ui/CodeBracesBox";
import { registerOperatorRoute } from "/imports/client/ui";
import { ProductBundlesTable } from "../components";

registerOperatorRoute({
  group: "navigation",
  mainComponent: ProductBundlesTable,
  hocs: [
    withApollo
  ],
  path: "/bundles",
  // eslint-disable-next-line react/display-name
  SidebarIconComponent: (props) => <CodeBracesBox {...props} />,
  sidebarI18nLabel: "admin.bundles"
});
