import React, { Component } from "react";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import { applyTheme } from "@reactioncommerce/components/utils";
import { Form } from "reacto-form";
import PropTypes from "prop-types";
import { CustomPropTypes } from "@reactioncommerce/components/utils";
import uniqueId from "lodash.uniqueid";
import { render } from "enzyme";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColFull = styled.div`
  flex: 1 1 100%;
`;

class BundleForm extends Component {
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
            name: PropTypes.string,
            description: PropTypes.string,
            subtitle: PropTypes.string,
            limit: PropTypes.string
        })
    }
    static defaultProps = {
        onChange() { },
        onSubmit() { },
        isSaving: false,
        value: {
            name: "",
            description: "",
            subtitle: "",
            limit: "0"
        }
    }
    _form = null;
    uniqueInstanceIdentifier = uniqueId("BundleForm_");

    render() {
        let nameInputId = `name_${this.uniqueInstanceIdentifier}`;
        let descriptionInputId = `description_${this.uniqueInstanceIdentifier}`;
        let subtitleInputId = `subtitle_${this.uniqueInstanceIdentifier}`;
        let limitInputId = `limit_${this.uniqueInstanceIdentifier}`;

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
                    <ColFull>
                        <Field name="name" label={"Título"} labelFor={nameInputId} isOptional>
                            <TextInput
                                id={nameInputId}
                                name="name"
                                placeholder="Ingrese un título"
                                isOnDarkBackground={false}
                                isReadOnly={isSaving}
                            />
                        </Field>
                    </ColFull>
                    <ColFull>
                        <Field name="subtitle" label={"Subtítulo"} labelFor={subtitleInputId} isOptional>
                            <TextInput
                                id={subtitleInputId}
                                name="subtitle"
                                placeholder="Ingrese un subtítulo"
                                isOnDarkBackground={false}
                                isReadOnly={isSaving}
                            />
                        </Field>
                    </ColFull>
                    <ColFull>
                        <Field name="description" label={"Descripción"} labelFor={descriptionInputId} isOptional>
                            <TextInput
                                id={descriptionInputId}
                                name="description"
                                placeholder="Ingrese una descripción"
                                isOnDarkBackground={false}
                                isReadOnly={isSaving}
                            />
                        </Field>
                    </ColFull>
                    <ColFull>
                        <Field name="limit" label={"Límite de productos"} labelFor={limitInputId} isOptional>
                            <TextInput
                                id={limitInputId}
                                name="limit"
                                type="number"
                                placeholder="Ingrese un límite de selección"
                                isOnDarkBackground={false}
                                isReadOnly={isSaving}
                            />
                        </Field>
                    </ColFull>
                </Grid>
            </Form>
        );
    }
}

export default withComponents(BundleForm);