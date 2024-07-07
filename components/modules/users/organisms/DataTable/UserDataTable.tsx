'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import DataTable from "@/components/molecules/DataTable/DataTable";

import { IHeader } from "@/components/molecules/DataTable/types";
import { MouseEvent, ReactNode, useState } from "react";
import IconButton from "@/components/atoms/buttons/IconButton/IconButton";

import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

import classes from './user-data-table.module.css'
import Switch from "@/components/atoms/inputs/Switch/Switch";
import UpdateUserModal from "../../molecules/Modal/UpdateUserModal";

export interface IUserDataTableProps {
  users: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: (prevData: any, dataForm: any) => void;
}

export default function UserDataTable(props: IUserDataTableProps) {
  const { users } = props;

  const [isUpdateUserModal, setisUpdateUserModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleUpdateUserModal = (item: any, event?: MouseEvent<HTMLButtonElement>) => { 
    event?.preventDefault();

    setSelectedItem(null);

    setisUpdateUserModal(!isUpdateUserModal)

    if(item) {
      setSelectedItem(item);
    }
  }

  const headers: IHeader[] =  [
    { name: 'Nome do usuário', value: 'name', align: 'start' },
    { name: 'Telefone', value: 'phone', align: 'start' },
    { name: 'Status', value: 'status', align: 'start' },
    { name: '', value: 'action', align: 'end', width: '100px' }
  ]

  const getSlotStatus = (item: any): ReactNode => {
    
    return (
      <>
        <Switch value={item.status} />
      </>
    );
  };

  const getSlotAction = (item: any): ReactNode => {
    return (
      <div style={{ 
        display: 'flex', 
        gap: '.6rem', 
        width: '100%', 
        justifyContent: 'flex-end' 
      }}
      >
        <IconButton onClick={handleUpdateUserModal.bind(null, item)}>
          <MdOutlineModeEditOutline size={20} />
        </IconButton>

        <IconButton>
          <MdOutlineDelete size={20} />
        </IconButton>
      </div>
    )
  }  

  return (
    <div className={classes.wrapper}>
      <DataTable 
        headers={headers} 
        items={users} 
        slotAction={getSlotAction}
        slotStatus={getSlotStatus}
      />

      {isUpdateUserModal && <UpdateUserModal user={selectedItem} onClose={handleUpdateUserModal} />}
    </div>
  )
}