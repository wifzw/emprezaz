import DataTable from '@/components/molecules/DataTable/DataTable';

import { IHeader } from '@/components/molecules/DataTable/types';
import { ReactNode } from 'react';
import { MdAccountCircle } from 'react-icons/md';

import Avatar from '@mui/material/Avatar';

import classes from './user-data-table.module.css';
import Switch from '@/components/atoms/inputs/Switch/Switch';
import { IUserResponse } from '@/server/users/types';
import formatDate from '@/utils/functions/formatDate';
import formatPhone from '@/utils/functions/formatPhone';
import UserDataTableAction from './UserDataTableAction';

export interface IUserDataTableProps {
  users: IUserResponse[];
}

export default function UserDataTable(props: IUserDataTableProps) {
  const { users } = props;

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

  return (
    <div className={classes.wrapper}>
      <DataTable headers={headers}>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <div className={classes.name}>
                <Avatar
                  src={user.avatar ?? undefined}
                  alt="avatar"
                  sizes="140px"
                  className={classes.avatar}
                >
                  {!user.avatar && <MdAccountCircle size={140} />}
                </Avatar>

                <div className={classes['wrapper-name']}>
                  <p>{user.name}</p>
                  <time>{formatDate(user.birth_date)}</time>
                </div>
              </div>
            </td>
            <td>{formatPhone(user.phone)}</td>
            <td>{getSlotStatus(user)}</td>
            <td>
              <UserDataTableAction user={user} />
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
