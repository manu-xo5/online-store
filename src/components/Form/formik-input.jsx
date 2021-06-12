import { useField } from 'formik';
import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import FormInput from './form-input';

/** @type {Object.<string, React.CSSProperties>} */
const styles = {
  error: {
    display: 'flex',
    alignItems: 'center',
    color: 'red',
  },
};

const Input = (props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormInput {...field} {...props} />
      {meta.error && meta.touched ? (
        <span style={styles.error}>
          <RiErrorWarningFill size={15} /> {meta.error}
        </span>
      ) : null}
    </>
  );
};

const FileInput = (props) => {
  const [, meta, helper] = useField(props);

  return (
    <>
      <FormInput
        {...props}
        type="file"
        onChange={(ev) => {
          helper.setValue(ev.target.files[0]);
          props.onChange && props.onChange(ev);
        }}
      />
      {meta.error && meta.touched ? (
        <span style={styles.error}>
          <RiErrorWarningFill size={15} /> {meta.error}
        </span>
      ) : null}
    </>
  );
};

export default Input;
export { FileInput };
