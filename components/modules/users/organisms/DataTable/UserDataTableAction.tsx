'use client';

import IconButton from '@/components/atoms/buttons/IconButton/IconButton';
import { removeUser } from '@/server/users/actions';
import { IUserResponse } from '@/server/users/types';
import { MouseEvent, useState } from 'react';
import { MdOutlineDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import UpdateUserModal from '../../molecules/Modal/UpdateUserModal';
import AlertConfirmation from '@/components/molecules/AlertConfirmation/AlertConfirmation';

export interface IUserDataTableActionProps {
  user: IUserResponse;
}

export default function UserDataTableAction(props: IUserDataTableActionProps) {
  const { user } = props;

  const [isUpdateUserModal, setIsUpdateUserModal] = useState<boolean>(false);
  const [isAlertConfirmation, setIsAlertConfirmation] =
    useState<boolean>(false);

  const handleOnClose = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    setIsUpdateUserModal(false);
    setIsAlertConfirmation(false);
  };

  const handleRemoveUser = (
    event: MouseEvent<HTMLButtonElement>,
    user: IUserResponse
  ) => {
    event?.preventDefault();

    removeUser(user);
  };

  const handleUpdateUserModal = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    setIsUpdateUserModal(!isUpdateUserModal);
  };

  const handleUpdateAlertConfirmation = (
    event?: MouseEvent<HTMLButtonElement>
  ) => {
    event?.preventDefault();

    setIsAlertConfirmation(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '.6rem',
        width: '100%',
        justifyContent: 'flex-end',
      }}
      key={user.id}
    >
      <IconButton onClick={handleUpdateUserModal}>
        <MdOutlineModeEditOutline size={20} />
      </IconButton>

      <IconButton onClick={handleUpdateAlertConfirmation}>
        <MdOutlineDelete size={20} />
      </IconButton>

      {isUpdateUserModal && (
        <UpdateUserModal user={user} onClose={handleOnClose} />
      )}

      {isAlertConfirmation && (
        <AlertConfirmation
          title="Você tem certeza que deseja remover o usuário?"
          onClose={handleOnClose}
          onConfirm={(event) => handleRemoveUser(event, user)}
        />
      )}
    </div>
  );
}
