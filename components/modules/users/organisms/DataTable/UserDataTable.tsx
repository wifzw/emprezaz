'use client';

import DataTable from '@/components/molecules/DataTable/DataTable';

import { IHeader } from '@/components/molecules/DataTable/types';
import { MouseEvent, ReactNode, useState } from 'react';
import IconButton from '@/components/atoms/buttons/IconButton/IconButton';

import { MdOutlineDelete } from 'react-icons/md';
import { MdOutlineModeEditOutline } from 'react-icons/md';

import classes from './user-data-table.module.css';
import Switch from '@/components/atoms/inputs/Switch/Switch';
import UpdateUserModal from '../../molecules/Modal/UpdateUserModal';
import { IUserResponse } from '@/server/users/types';
import Image from 'next/image';

export interface IUserDataTableProps {
  users: IUserResponse[];
}

export default function UserDataTable(props: IUserDataTableProps) {
  const { users } = props;

  const [isUpdateUserModal, setisUpdateUserModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IUserResponse | null>(null);

  const handleUpdateUserModal = (
    item: IUserResponse,
    event?: MouseEvent<HTMLButtonElement>
  ) => {
    event?.preventDefault();

    setSelectedItem(null);

    setisUpdateUserModal(!isUpdateUserModal);

    if (item) {
      setSelectedItem(item);
    }
  };

  const handleOnClose = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    setSelectedItem(null);
    setisUpdateUserModal(false);
  };

  const headers: IHeader[] = [
    { name: 'Nome do usuário', value: 'name', align: 'start' },
    { name: 'Telefone', value: 'phone', align: 'start' },
    { name: 'Status', value: 'status', align: 'start' },
    { name: '', value: 'action', align: 'end', width: '100px' },
  ];

  const getSlotStatus = (item: IUserResponse): ReactNode => {
    return (
      <>
        <Switch value={item.status} />
      </>
    );
  };

  const getSlotAction = (item: IUserResponse): ReactNode => {
    return (
      <div
        style={{
          display: 'flex',
          gap: '.6rem',
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={handleUpdateUserModal.bind(null, item)}>
          <MdOutlineModeEditOutline size={20} />
        </IconButton>

        <IconButton>
          <MdOutlineDelete size={20} />
        </IconButton>
      </div>
    );
  };

  return (
    <div className={classes.wrapper}>
      <DataTable headers={headers}>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <div className={classes.name}>
                {user.avatar && (
                  <div className={classes['wrapper-avatar']}>
                    <div className={classes.avatar}>
                      <Image
                        src={user.avatar}
                        fill
                        alt="avatar"
                        quality={100}
                        priority
                      />
                    </div>
                  </div>
                )}
                {user.name}
              </div>
            </td>
            <td>{user.phone}</td>
            <td>{getSlotStatus(user)}</td>
            <td>{getSlotAction(user)}</td>
          </tr>
        ))}
      </DataTable>

      {isUpdateUserModal && selectedItem && (
        <UpdateUserModal user={selectedItem} onClose={handleOnClose} />
      )}
    </div>
  );
}
