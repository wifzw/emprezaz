'use client';

import Switch from '@/components/atoms/inputs/Switch/Switch';
import { updateStatusUser } from '@/server/users/actions';
import { IUserResponse } from '@/server/users/types';
import { useEffect, useState } from 'react';

export interface IUserDataTableSwitchProps {
  user: IUserResponse;
}

export default function UserDataTableSwitch(props: IUserDataTableSwitchProps) {
  const { user } = props;

  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    setStatus(user.status);
  }, [user.status]);

  const handleUpdateStatusUser = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    event?.preventDefault();

    await updateStatusUser({ id: user.id, status: !status });
  };

  return <Switch value={status} onChange={handleUpdateStatusUser} />;
}
