import { ErrorMessage } from 'formik';
import React from 'react';
import s from './validatedInput.module.css';

export const ValidatedInput: React.FC<{
  field: any;
  form: { errors: any; touched: any };
}> = React.memo(({ field, form: { errors, touched }, ...props }) => {
  return (
    <div className={s.validatedInput}>
      <input
        {...field}
        {...props}
        style={
          errors[`${field.name}`] &&
          touched[`${field.name}`] && {
            borderBottom: '2px solid rgb(246, 54, 54)',
          }
        }
      />
      <ErrorMessage
        name={field.name}
        render={(message) => <div className={s.errorMessage}>{message}</div>}
      />
    </div>
  );
});

ValidatedInput.displayName = 'ValidatedInput';
