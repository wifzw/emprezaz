import MediumButton from '@/components/atoms/buttons/Medium/MediumButton';
import classes from './alert-confirmation.module.css';
import { MouseEvent } from 'react';

export interface IAlertConfirmationProps {
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
  onConfirm: (event: MouseEvent<HTMLButtonElement>) => void;
  title: string;
}

export default function AlertConfirmation(props: IAlertConfirmationProps) {
  const { title, onClose, onConfirm } = props;

  return (
    <div className={classes.backdrop}>
      <div className={classes['wrapper-modal']}>
        <p>{title}</p>

        <div className={classes.actions}>
          <MediumButton text onClick={onClose}>
            Cancelar
          </MediumButton>
          <MediumButton onClick={(event) => [onConfirm(event), onClose(event)]}>
            Confirmar
          </MediumButton>
        </div>
      </div>
    </div>
  );
}
