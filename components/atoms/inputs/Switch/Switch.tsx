'use client';

import classes from './switch.module.css';

export interface ISwitchProps {
  value: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Switch(props: ISwitchProps) {
  const { value, onChange } = props;

  return (
    <label className={classes.switch}>
      <input
        type="checkbox"
        checked={value}
        className={classes.checkbox}
        title="status"
        onChange={onChange}
      />
      <span className={`${classes.slider} ${classes.round}`}></span>
    </label>
  );
}
