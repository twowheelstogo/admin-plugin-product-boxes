import React from "react";
import { Card, Tab, Tabs, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import BundleConfiguration from "../components/BundleConfiguration";
import BundleProducts from "../components/BundleProducts";
import BundleActions from "../components/BundleActions";
import withBundle from "../containers/withBundle";

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#333f45',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const styles = (theme) => ({
    padding: {
        padding: theme.spacing(2),
    },
    main: {
        padding: theme.spacing(3)
    }
});

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#333f45',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

const ProductBundleDetailLayout = (props) => {
    const [value, setValue] = React.useState(0);
    const {productBundle} = props;

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };

    const actions = [
        {
            id: 0,
            label: "Configuración",
            component: BundleConfiguration,
            onSubmit: null,
            props: {
                productBundle
            }
        },
        {
            id: 1,
            label: "Productos",
            component: BundleProducts,
            onSubmit: null,
            props: {}
        }
    ];

    const renderTabs = () => {
        return (
            <div>
                <StyledTabs value={value} onChange={handleChange}>
                    {actions.map((action) => (
                        <StyledTab label={action?.label} />
                    ))}
                </StyledTabs>
                {/* <Typography className={classes.padding} /> */}
            </div>
        );
    }

    const renderMain = () => {
        return (
            <BundleActions
                actions={actions}
                active={value}
            />
        );
    }

    return (
        <Card>
            {renderTabs()}
            {renderMain()}
        </Card>
    );
}

export default withBundle(withStyles(styles)(ProductBundleDetailLayout));
