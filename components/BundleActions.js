import React from "react";
import PropTypes from "prop-types";
import { CustomPropTypes } from "@reactioncommerce/components/utils";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => {
    return ({
        main: {
            padding: theme.spacing(3),
            background: "transparent",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        },
        buttons: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
        }
    })
}
const BundleActions = (props) => {
    const { actions, active, classes } = props;
    const currentAction = Array.isArray(actions) && actions.find((action) => action.id == active);

    if (!currentAction) return (
        <div>Option not found</div>
    );

    const { onSubmit } = currentAction;

    return (
        <React.Fragment>
            <main className={classes.main}>
                {currentAction && (
                    <currentAction.component
                        onSubmit={onSubmit}
                        {...currentAction.props}
                    />
                )}
                <div className={classes.buttons}>
                    {active > 0 && (
                        <Button>{"Volver"}</Button>
                    )}
                    {active < (actions.length - 1) && (
                        <Button style={{ margin: "auto 0 auto auto" }}>{"Siguiente"}</Button>
                    )}
                </div>
            </main>
        </React.Fragment>
    );
}

BundleActions.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
            component: CustomPropTypes.component.isRequired,
            onSubmit: PropTypes.func,
            props: PropTypes.any
        })
    ),
    active: PropTypes.number,
    classes: PropTypes.any,
};

BundleActions.defaultProps = {
    actions: []
}

export default withStyles(styles)(BundleActions);