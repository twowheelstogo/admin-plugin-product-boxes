import React, { useCallback, useState, useEffect, Fragment } from "react";
import { Modal, TextField, Divider, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { CustomPropTypes } from "@reactioncommerce/components/utils";
import SelectableItems from "./CustomListItems/SelectableItems";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    content: {
        minHeight: "70vh"
    },
    circular: {
        left: "50%",
        top: "50%",
        width: "50px",
        marginLeft: "-50px",
        marginTop: "-50px"
    }
}));

const ProductsModal = (props) => {
    const { open, handleClose, onFetchData, isLoading, products, addBundleItems } = props;
    const [globalFilter, setGlobalFilter] = useState(null);
    const classes = useStyles();
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (onFetchData) {
            onFetchData({
                globalFilter
            });
        }
    }, [
        globalFilter,
        onFetchData
    ]);

    const handleFilter = (event) => {
        setGlobalFilter(event.target.value);
    }

    const uploadProducts = () => {

        if (addBundleItems) {

            addBundleItems({
                itemIds: items,
            });
        }
    };

    useEffect(() => {
        //clear all selected items when modal is closed/open
        setItems([]);
    }, [open])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={"paper"}
        >
            <DialogTitle>
                <TextField
                    fullWidth
                    margin="dense"
                    placeholder="Buscar producto"
                    onChange={handleFilter}
                    variant="outlined"
                />
            </DialogTitle>
            <DialogContent>
                <div className={classes.content}>
                    {!isLoading && (
                        <SelectableItems
                            products={products}
                            checked={items}
                            setChecked={setItems}
                        />
                    )}
                    {isLoading && (
                        <CircularProgress />
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleClose}
                >
                    {"Cancelar"}
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={uploadProducts}
                >
                    {"Agregar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ProductsModal.propTypes = {
    open: PropTypes.bool,
    onFetchData: PropTypes.func,
    handleClose: PropTypes.func,
    components: PropTypes.shape({
        TextField: CustomPropTypes.component.isRequired
    }),
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool
};

ProductsModal.defaultProps = {
    open: false,
    handleClose() { },
    onFetchData() { },
    addBundleItems() { },
    isLoading: false,
    products: []
};

export default ProductsModal;
