'use client';

import MediumButton from '@/components/atoms/buttons/Medium/MediumButton';
import Filter from './Filter/Filter';

import classes from './toolbar.module.css';
import CreateUserModal from '../../molecules/Modal/CreateUserModal';
import { MouseEvent, useState } from 'react';

export interface IToolbarProps {
  search: string;
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Toolbar(props: IToolbarProps) {
  const { search, onChangeSearch } = props;

  const [isCreateUserModal, setIsCreateUserModal] = useState<boolean>(false);

  const handleUpdateUserModal = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    setIsCreateUserModal(!isCreateUserModal);
  };

  return (
    <header className={classes.header}>
      <Filter search={search} onChangeSearch={onChangeSearch} />

      <div className={classes.action}>
        <MediumButton onClick={handleUpdateUserModal}>
          Adicionar Usuário
        </MediumButton>
      </div>

      {isCreateUserModal && <CreateUserModal onClose={handleUpdateUserModal} />}
    </header>
  );
}
