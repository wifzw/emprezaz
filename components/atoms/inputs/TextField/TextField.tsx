/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLInputTypeAttribute } from 'react';

import classes from './text-field.module.css';

export interface ITextFieldProps {
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  required?: boolean;
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
}

export default function TextField(props: ITextFieldProps) {
  const { id, type, placeholder, required, defaultValue, register } = props;

  return (
    <div className={classes.wrapper}>
      <input
        id={id}
        type={type}
        className={classes.input}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        {...register}
      />
    </div>
  );
}
