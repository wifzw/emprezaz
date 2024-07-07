'use client';

import classes from './switch.module.css';

export interface ISwitchProps {
  value: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}

export default function Switch(props: ISwitchProps) {
  const { value, register } = props;

  return (
    <label className={classes.switch}>
      <input
        type="checkbox"
        defaultChecked={value}
        className={classes.checkbox}
        title="status"
        {...register}
      />
      <span className={`${classes.slider} ${classes.round}`}></span>
    </label>
  );
}
