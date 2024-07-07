import { HTMLInputTypeAttribute } from 'react';

import classes from './text-field.module.css';
import phoneMask from '@/utils/functions/phoneMask';
import cpfMask from '@/utils/functions/cpfMask';

export interface ITextFieldProps {
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  required?: boolean;
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  maxLength?: string;
  isCpfMask?: boolean;
}

export default function TextField(props: ITextFieldProps) {
  const {
    id,
    type,
    placeholder,
    required,
    defaultValue,
    register,
    maxLength,
    isCpfMask = false,
  } = props;

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === 'tel') {
      const currentValue = event.currentTarget.value;
      const maskedValue = phoneMask(currentValue);
      event.currentTarget.value = maskedValue;
    } else if (isCpfMask) {
      const currentValue = event.currentTarget.value;
      const maskedValue = cpfMask(currentValue);
      event.currentTarget.value = maskedValue;
    }
  };

  return (
    <div className={classes.wrapper}>
      <input
        id={id}
        type={type}
        className={classes.input}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onKeyUp={handleKeyUp}
        {...register}
      />
    </div>
  );
}
