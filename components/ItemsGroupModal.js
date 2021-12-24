import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@material-ui/core";
import { Form } from "reacto-form";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import uniqueId from "lodash.uniqueid";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColFull = styled.div`
  flex: 1 1 100%;
`;

/**
 * 
 * @param {Object} props
 * @param {String} [props.modalTitle]
 * @param {String} [props.buttonText]
 * @param {Function} [props.onSubmit]
 * @param {Object} [props.values]
 * @param {Boolean} [props.open]
 * @param {Function} [props.handleClose]
 * @returns {React.Component} a React component
 */
function ItemsGroupModal(props) {
    const {
        modalTitle,
        buttonText,
        onSubmit,
        values,
        open,
        handleClose,
        components: { Field, TextInput }
    } = props;
    let _form = null;
    let uniqueInstanceIdentifier = uniqueId("ItemGroupForm_");

    const titleInputId = `title_${uniqueInstanceIdentifier}`;
    const limitInputId = `limit_${uniqueInstanceIdentifier}`;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"sm"}
        >
            <DialogTitle>
                <Typography variant="h3" component="h3">{modalTitle}</Typography>
            </DialogTitle>
            <DialogContent>
                <Form
                    ref={(formEl) => _form = formEl}
                    name={"itemGroup"}
                    value={values}
                    onSubmit={onSubmit}
                >
                    <Grid>
                        <ColFull>
                            <Field name="title" label={"Título"} labelFor={titleInputId}>
                                <TextInput
                                    id={titleInputId}
                                    name="title"
                                    placeholder={"Escribe aquí..."}
                                    isOnDarkBackground={false}
                                />
                            </Field>
                        </ColFull>
                        <ColFull>
                            <Field name="limit" label={"Límite de selección"} labelFor={limitInputId}>
                                <TextInput
                                    id={limitInputId}
                                    name="limit"
                                    placeholder={"Escribe aquí..."}
                                    isOnDarkBackground={false}
                                />
                            </Field>
                        </ColFull>
                    </Grid>
                </Form>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => { _form.submit() }}
                >{buttonText}</Button>
            </DialogActions>
        </Dialog>
    );
}

ItemsGroupModal.propTypes = {
    modalTitle: PropTypes.string,
    onSubmit: PropTypes.func,
    buttonText: PropTypes.string,
    values: PropTypes.shape({
        title: PropTypes.string,
        limit: PropTypes.number
    }),
    open: PropTypes.bool,
    handleClose: PropTypes.func
};

ItemsGroupModal.defaultProps = {
    modalTitle: "",
    onSubmit() { },
    buttonText: "",
    values: {
        title: "",
        limit: "1"
    },
    open: false,
    handleClose() { }
};

export default withComponents(ItemsGroupModal);
