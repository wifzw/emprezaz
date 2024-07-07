import { MouseEvent, ReactNode } from 'react';
import classes from './medium-button.module.css';

export interface IMediumButtonProps {
  children: ReactNode;
  text?: boolean;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function MediumButton(props: IMediumButtonProps) {
  const { children, text, type, disabled, onClick } = props;

  const getClass = (): string => {
    if (text) return `${classes.button} ${classes.text}`;

    return `${classes.button}`;
  };

  return (
    <button
      className={`${getClass()} ${disabled ? classes.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
