import IconButton from '@/components/atoms/buttons/IconButton/IconButton'
import classes from './general-user-modal.module.css'
import { MdOutlineClose } from 'react-icons/md'
import { MouseEvent } from 'react'

export interface IUpdateUserModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
}

export default function UpdateUserModal(props: IUpdateUserModalProps) {
  const { user, onClose } = props;

  const handleOnClose = (event: MouseEvent<HTMLButtonElement>) => {
    if(!onClose) return

    event.preventDefault();

    onClose(event)
  }

  return (
    <>
      <div className={classes.backdrop}>
        <div className={classes['wrapper-modal']}>
          <header className={classes.header}>
            <h3>Editar Usuário ({user?.name})</h3>
            <IconButton onClick={handleOnClose}>
              <MdOutlineClose size={24} />
            </IconButton>
          </header>
        </div>
      </div>
    </>
  )
}