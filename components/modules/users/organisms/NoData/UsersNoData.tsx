'use client';

import NoData from '@/components/organisms/NoData/NoData';
import { MouseEvent, useState } from 'react';
import CreateUserModal from '../../molecules/Modal/CreateUserModal';
import MediumButton from '@/components/atoms/buttons/Medium/MediumButton';

export default function UsersNoData() {
  const [isCreateUserModal, setIsCreateUserModal] = useState<boolean>(false);

  const handleUpdateUserModal = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    setIsCreateUserModal(!isCreateUserModal);
  };

  return (
    <>
      <NoData
        title="Nenhum usuário foi encontrado."
        subtitle={`
          Você pode clicar no botão "Adicionar Usuário" para cadastrar novos
          usuários`}
      >
        <MediumButton onClick={handleUpdateUserModal}>
          Adicionar Usuário
        </MediumButton>
      </NoData>

      {isCreateUserModal && <CreateUserModal onClose={handleUpdateUserModal} />}
    </>
  );
}
