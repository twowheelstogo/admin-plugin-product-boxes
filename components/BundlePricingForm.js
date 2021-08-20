import React, { Component } from "react";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import { Form } from "reacto-form";
import PropTypes from "prop-types";
import { CustomPropTypes, applyTheme } from "@reactioncommerce/components/utils";
import uniqueId from "lodash.uniqueid";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColHalf = styled.div`
  flex: 1 1 100%;
  @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
    flex: 0 1 calc(50% - 9px);
  }
`;

class BundlePricingForm extends Component {
    static propTypes = {
        components: PropTypes.shape({
            Field: CustomPropTypes.component.isRequired,
            TextInput: CustomPropTypes.component.isRequired,
            ErrorsBlock: CustomPropTypes.component.isRequired
        }),
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
        isSaving: PropTypes.bool,
        value: PropTypes.shape({
            price: PropTypes.number,
            compareAtPrice: PropTypes.shape({
                amount: PropTypes.number
            })
        })
    }
    static defaultProps = {
        onChange() { },
        onSubmit() { },
        isSaving: false,
        value: {
            price: "0",
            compareAtPrice: {
                amount: "0"
            }
        }
    }
    _form = null;
    uniqueInstanceIdentifier = uniqueId("BundlePricingForm_");

    render() {
        let priceInputId = `price_${this.uniqueInstanceIdentifier}`;
        let compareAtPriceInputId = `compareAtPrice_${this.uniqueInstanceIdentifier}`;

        const {
            components: { Field, TextInput },
            value, onChange, onSubmit, isSaving
        } = this.props;
        return (
            <Form
                ref={(formEl) => this._form = formEl}
                name={"bundle"}
                value={value}
                onChange={onChange}
                onSubmit={onSubmit}
            >
                <Grid>
                    <ColHalf>
                        <Field name="price" label={"Precio"} labelFor={priceInputId}>
                            <TextInput
                                id={priceInputId}
                                name="price"
                                placeholder="0.00"
                                isOnDarkBackground={false}
                                isReadOnly={isSaving}
                            />
                        </Field>
                    </ColHalf>
                    <ColHalf>
                        <Field name="compareAtPrice.amount" label={"Precio de comparación"} labelFor={compareAtPriceInputId}>
                            <TextInput
                                id={compareAtPriceInputId}
                                name="compareAtPrice.amount"
                                placeholder="0.00"
                                isOnDarkBackground={false}
                                isReadOnly={isSaving}
                            />
                        </Field>
                    </ColHalf>
                </Grid>
            </Form>
        );
    }
}

export default withComponents(BundlePricingForm);