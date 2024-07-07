'use client';

import { IUserResponse } from '@/server/users/types';
import UserDataTable from '../organisms/DataTable/UserDataTable';
import Toolbar from '../organisms/Toolbar/Toolbar';
import { useState } from 'react';
import NoData from '@/components/organisms/NoData/NoData';

export interface IWrapperProps {
  users: IUserResponse[];
}

export default function Wrapper(props: IWrapperProps) {
  const { users } = props;

  const [search, setSearch] = useState<string>('');

  const getUsers = (): IUserResponse[] => {
    return users.filter((user) => {
      const searchLowerCase = search.toLowerCase();

      return (
        user.name.toLowerCase().includes(searchLowerCase) ||
        user.phone.includes(searchLowerCase) ||
        user.email.includes(searchLowerCase)
      );
    });
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Toolbar search={search} onChangeSearch={handleChangeSearch} />
      <UserDataTable users={getUsers()} />
      {!getUsers().length && (
        <NoData title="Nenhum resultado corresponde a sua busca." />
      )}
    </>
  );
}
