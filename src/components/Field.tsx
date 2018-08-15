import * as React from 'react';
import { BaseFieldProps, Field as ReduxFormField, WrappedFieldProps } from 'redux-form';
import { required as requiredValidator } from '../validators';

type Props = {
  label: string;
  required?: boolean;
};

const DecoratedInput: React.SFC<
  WrappedFieldProps &
    Props & {
      textarea: boolean;
    }
> = ({ label, required, input, meta: { touched, error }, textarea }) => (
  <p>
    <label
      style={
        touched && error
          ? {
              color: "red"
            }
          : undefined
      }
    >
      {label}
      {required && " *"}
      <br />
      {textarea ? (
        <textarea style={{ height: "6em" }} {...input} />
      ) : (
        <input {...input} />
      )}
    </label>
  </p>
);

const Field: React.SFC<BaseFieldProps<Props> & Props> = ({
  label,
  name,
  component,
  required
}) => (
  <ReduxFormField
    label={label}
    name={name}
    component={DecoratedInput}
    required={required}
    validate={required ? requiredValidator : undefined}
    textarea={component === "textarea"}
  />
);

export default Field;
