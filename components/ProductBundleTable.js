import React, { Fragment, useState, useMemo, useCallback } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import i18next from "i18next";
import { useHistory } from "react-router-dom";
import DataTable, { useDataTable } from "@reactioncommerce/catalyst/DataTable";
import Button from "@reactioncommerce/catalyst/Button";
import decodeOpaqueId from "@reactioncommerce/api-utils/decodeOpaqueId.js";
import encodeOpaqueId from "@reactioncommerce/api-utils/encodeOpaqueId.js";
import { useSnackbar } from "notistack";
import { useDropzone } from "react-dropzone";
import { Card, CardHeader, CardContent, Grid, makeStyles } from "@material-ui/core";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import productsQuery from "../queries/productBundles";
import createProductMutation from "../mutations/createProductBundle";
import getPDPUrl from "../utils/getPDPUrl";
import StatusIconCell from "./DataTable/StatusIconCell";
import MediaCell from "./DataTable/MediaCell";
import PublishedStatusCell from "./DataTable/PublishedStatusCell";

const useStyles = makeStyles((theme) => ({
  card: {
    overflow: "visible"
  },
  cardHeader: {
    paddingBottom: 0
  },
  selectedProducts: {
    fontWeight: 400,
    marginLeft: theme.spacing(1)
  }
}));

const CSV_FILE_TYPES = [
  "text/csv",
  "text/plain",
  "text/x-csv",
  "application/vnd.ms-excel",
  "application/csv",
  "application/x-csv",
  "text/comma-separated-values",
  "text/x-comma-separated-values",
  "text/tab-separated-values"
];

/**
 * @summary Main products view
 * @name ProductBundlesTable
 * @returns {React.Component} A React component
 */
function ProductBundlesTable() {
  const apolloClient = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [shopId] = useCurrentShopId();
  const [createProduct, { error: createProductError }] = useMutation(createProductMutation);

  // React-Table state
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableData, setTableData] = useState([]);

  // Filter by file state
  const [files, setFiles] = useState([]);
  const [isFilterByFileVisible, setFilterByFileVisible] = useState(false);
  const [isFiltered, setFiltered] = useState(false);

  // Tag selector state
  const [isTagSelectorVisible, setTagSelectorVisibility] = useState(false);

  // Create and memoize the column data
  const columns = useMemo(() => [
    {
      Header: "",
      accessor: "product.original.media[0].URLs.thumbnail",
      cellProps: () => ({
        style: {
          paddingLeft: 0,
          paddingRight: 0
        }
      }),
      // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
      Cell: ({ row }) => <MediaCell row={row} />
    },
    {
      Header: i18next.t("admin.productBundleTable.header.product"),
      accessor: "name"
    },
    {
      Header: i18next.t("admin.productBundleTable.header.id"),
      accessor: (row) => {
        const { id: productId } = decodeOpaqueId(row._id);
        return productId;
      },
      id: "_id"
    },
    {
      Header: i18next.t("admin.productBundleTable.header.price"),
      accessor: "product.pricing.displayPrice"
    },
    {
      Header: i18next.t("admin.productBundleTable.header.published"),
      // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
      Cell: ({ row }) => <PublishedStatusCell row={row} />
    },
    {
      Header: i18next.t("admin.productBundleTable.header.visible"),
      // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
      Cell: ({ row }) => <StatusIconCell row={row} />,
      id: "product.isVisible"
    }
  ], []);


  const onFetchData = useCallback(async ({ globalFilter, manualFilters, pageIndex, pageSize }) => {
    // Wait for shop id to be available before fetching products.
    setIsLoading(true);
    if (!shopId) {
      return;
    }

    const filterByProductIds = {};
    if (manualFilters.length) {
      filterByProductIds.productIds = manualFilters[0].value.map((id) => encodeOpaqueId("reaction/product", id));
      // Reset uploaded files
      setFiles([]);
    }

    const { data } = await apolloClient.query({
      query: productsQuery,
      variables: {
        shopIds: [shopId],
        ...filterByProductIds,
        query: globalFilter,
        first: pageSize,
        limit: (pageIndex + 1) * pageSize,
        offset: pageIndex * pageSize
      },
      fetchPolicy: "network-only"
    });

    // Update the state with the fetched data as an array of objects and the calculated page count
    setTableData(data.productBundles.nodes);
    setPageCount(Math.ceil(data.productBundles.totalCount / pageSize));

    setIsLoading(false);
  }, [apolloClient, shopId]);

  // Row click callback
  const onRowClick = useCallback(async ({ row }) => {
    const href = getPDPUrl({ bundleId: row.original._id, shopId: row.original.shop._id });
    history.push(href);
  }, [history]);

  const onRowSelect = useCallback(async ({ selectedRows: rows }) => {
    setSelectedRows(rows || []);
  }, []);

  const labels = useMemo(() => ({
    globalFilterPlaceholder: i18next.t("admin.productBundleTable.filters.placeholder")
  }), []);

  const dataTableProps = useDataTable({
    columns,
    data: tableData,
    labels,
    pageCount,
    onFetchData,
    onRowClick,
    onRowSelect,
    getRowId: (row) => row._id
  });

  const { refetch, setManualFilters } = dataTableProps;

  const onDrop = (accepted) => {
    if (accepted.length === 0) return;
    setFiles(accepted);
  };

  const handleCreateProduct = async () => {
    const { data } = await createProduct({ variables: { input: { shopId } } });

    if (data) {
      console.log("data", data);
      const { createProductBundle: { productBundle } } = data;
      history.push(`/${shopId}/bundles/${productBundle._id}`);
    }

    if (createProductError) {
      enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", { variant: "error" }));
    }
  };

  // Filter by file event handlers
  const { getRootProps, getInputProps } = useDropzone({
    accept: CSV_FILE_TYPES,
    disableClick: true,
    disablePreview: true,
    multiple: false,
    onDrop
  });

  const importFiles = (newFiles) => {
    let productIds = [];

    newFiles.map((file) => {
      const output = [];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onloadend = () => {
        const parse = require("csv-parse");

        parse(reader.result, {
          trim: true,
          // eslint-disable-next-line camelcase
          skip_empty_lines: true
        })
          .on("readable", function () {
            let record;
            // eslint-disable-next-line no-cond-assign
            while (record = this.read()) {
              output.push(record);
            }
          })
          .on("end", () => {
            output.map((outputarray) => {
              productIds = productIds.concat(outputarray);
              return;
            });

            setManualFilters(file.name, productIds);
            setFilterByFileVisible(false);
            setFiltered(true);
          });
      };
      return;
    });
  };

  const handleDeleteUploadedFile = (deletedFilename) => {
    const newFiles = files.filter((file) => file.name !== deletedFilename);
    setFiles(newFiles);
    if (newFiles.length === 0) {
      setFiltered(false);
    } else if (isFiltered) {
      importFiles(newFiles);
    }
  };


  const classes = useStyles();
  const selectedProducts = selectedRows.length ? `${selectedRows.length} selected` : "";
  const cardTitle = (
    <Fragment>
      {i18next.t("admin.bundles")}<span className={classes.selectedProducts}>{selectedProducts}</span>
    </Fragment>
  );

  return (
    <Grid container spacing={3}>
      {(!isTagSelectorVisible && !isFilterByFileVisible) &&
        <Grid item sm={12}>
          <Button color="primary" variant="contained" onClick={handleCreateProduct}>
            {i18next.t("admin.createProductBundle") || "Create Bundle"}
          </Button>
        </Grid>
      }
      <Grid item sm={12}>
        <Card className={classes.card}>
          <CardHeader classes={{ root: classes.cardHeader }} title={cardTitle} />
          <CardContent>
            <DataTable
              {...dataTableProps}
              //   actionMenuProps={{ options }}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </Grid >
    </Grid >
  );
}

export default ProductBundlesTable;
